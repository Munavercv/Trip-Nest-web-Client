import React, { useEffect, useState } from 'react'
import styles from './VendorApplication.module.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatus } from '../../../redux/slices/authSlice'
import { setTrue } from '../../../redux/slices/vendorApplictionSlice'
import ApplicationSuccessfull from './ApplicationSuccessfull'

const VendorApplication = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [selectedState, setSelectedState] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [stateData, setStateData] = useState([])
    const [validationErrors, setValidationErrors] = useState({})
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState({
        sendUser: user.userId,
        companyName: '',
        email: '',
        phone: '',
        state: '',
        district: '',
        address: '',
        pincode: '',
        websiteUrl: '',
        logo: null,
        certificate: null,
        yearEst: '',
        ownerId: null,
        regions: [],
        supportEmail: '',
        supportPhone: '',
    });

    const fetchStatesData = async () => {
        try {
            const response = await axios.get('/api/common/get-all-states-data')
            setStateData(response.data.states)
        } catch (error) {
            console.log('Error while fetching states');
        }
    }

    const regions = ['North India', 'South India', 'East India', 'West India', 'International']

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleStateChange = (e) => {
        const stateName = e.target.value;
        setSelectedState(stateName);
        const state = stateData.find((s) => s.state === stateName);
        setDistricts(state ? state.districts : []);
        setFormData({ ...formData, state: stateName, district: '' });        
    };

    const handleRegionChange = (region) => {
        setFormData((prev) => ({
            ...prev,
            regions: prev.regions.includes(region)
                ? prev.regions.filter((r) => r !== region)
                : [...prev.regions, region],
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.state) {
            newErrors.state = "Please select a state";
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }
        if (!/^\d{10}$/.test(formData.supportPhone)) {
            newErrors.supportPhone = "Phone number must be 10 digits";
        }
        if (!formData.district) {
            newErrors.district = "Please select a district";
        }

        if (formData.logo && formData.logo.size > 2 * 1024 * 1024) {
            newErrors.logo = "Logo file size must be less than 2MB";
        }
        if (formData.ownerId && formData.ownerId.size > 2 * 1024 * 1024) {
            newErrors.ownerId = "ID Proof file size must be less than 2MB";
        }

        if (formData.regions.length === 0) {
            newErrors.regions = "Please select atlease one region"
        }

        setValidationErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')

        if (!validateForm()) {
            setError('Please fill required fields as required');
            return;
        }

        setLoading(true);

        try {
            const payload = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    if (key === 'logo' || key === 'certificate') {
                        payload.append(key, formData[key]);
                    } else if (key === 'regions') {
                        formData[key].forEach(region => payload.append(key, region));
                    } else {
                        payload.append(key, formData[key]);
                    }
                }
            });

            await axios.post('/api/user/vendor-application', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            dispatch(setTrue());
            setSubmitSuccess(true)
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'An error occurred');
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(checkAuthStatus())
        fetchStatesData()
    }, [dispatch])

    return (
        <section className={`${styles.applicationSec} container-fluid px-md-5 px-3 py-5`}>
            <h1 className={`${styles.title} h3 fw-medium text-center`}>Vendor Application</h1>
            <hr className='border-2 mt-0' />

            <form onSubmit={handleSubmit}>

                <div className="row">
                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="companyName" className="ms-2">Company Name</label>
                        <input type="text"
                            name='companyName'
                            className="form-input"
                            id="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="email" className="ms-2">Company Email</label>
                        <input type="email"
                            name='email'
                            className="form-input"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="phone" className="ms-2">Phone</label>
                        <input type="number"
                            name='phone'
                            className="form-input"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.phone && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.phone}</p>}
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="state" className="ms-2">
                            State
                        </label>
                        <select
                            name="state"
                            className="form-input"
                            id="state"
                            value={formData.state}
                            onChange={handleStateChange}
                        >
                            <option value="">Select State</option>
                            {stateData.length !==0 && stateData.map((state, index) => (
                                <option key={index} value={state.state}>
                                    {state.state}
                                </option>
                            ))}
                        </select>
                        {validationErrors.state && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.state}</p>}
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="district" className="ms-2">
                            District
                        </label>
                        <select
                            name="district"
                            className="form-input"
                            id="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            disabled={!districts.length}
                        >
                            <option value="">Select District</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                        {validationErrors.district && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.district}</p>}
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="address" className="ms-2">Address</label>
                        <input type="text"
                            name='address'
                            className="form-input"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="pincode" className="ms-2">Pincode</label>
                        <input type="number"
                            name='pincode'
                            className="form-input"
                            id="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="logo" className="ms-2">Logo (max:2MB)</label>
                        <input type="file"
                            name='logo'
                            className="form-input"
                            id="logo"
                            onChange={handleFileChange}
                            required
                        />
                        {validationErrors.logo && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.logo}</p>}
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="websiteUrl" className="ms-2">Website Url</label>
                        <input type="url"
                            name='websiteUrl'
                            className="form-input"
                            id="websiteUrl"
                            placeholder='https://abcd.com'
                            value={formData.websiteUrl}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="certificate" className="ms-2">Registration certificate</label>
                        <input type="file"
                            name='certificate'
                            className="form-input"
                            id="certificate"
                            onChange={handleFileChange}
                            required
                        />
                        {validationErrors.certificate && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.certificate}</p>}
                    </div>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="yearEst" className="ms-2">Year established</label>
                        <input type="date"
                            name='yearEst'
                            className="form-input"
                            id="yearEst"
                            value={formData.yearEst}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="ownerId" className="ms-2">Owner/director id proof</label>
                        <input type="file"
                            name='ownerId'
                            className="form-input"
                            id="ownerId"
                            onChange={handleFileChange}
                            required
                        />
                        {validationErrors.ownerId && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.ownerId}</p>}
                    </div>

                </div>

                <hr className='border-2 mt-0 mb-3' />

                <div className="row">
                    <h5 className="text-start">Operating Regions</h5>
                    <div className="mb-3">
                        <div className="form-check">
                            <div className="row">
                                {regions.map((region, index) => (
                                    <div
                                        key={index}
                                        className="col-lg-4 col-md-6 col-sm-12 mb-3 d-flex align-items-center"
                                    >
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value={region}
                                            id={`flexCheckDefault-${index}`}
                                            name="regions"
                                            onChange={() => handleRegionChange(region)}
                                            checked={formData.regions.includes(region)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`flexCheckDefault-${index}`}
                                        >
                                            {region}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {validationErrors.regions && (
                                <p className="text-danger mt-2" style={{ fontSize: '14px' }}>
                                    {validationErrors.regions}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <hr className='border-2 mt-0 mb-3' />

                <div className="row text-center">
                    <h5 className="text-start">Customer support contact details</h5>

                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="supportEmail" className="ms-2">Email</label>
                        <input type="email"
                            name='supportEmail'
                            className="form-input"
                            id="supportEmail"
                            value={formData.supportEmail}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start col-lg-4 col-sm-6">
                        <label htmlFor="supportPhone" className="ms-2">Phone</label>
                        <input type="number"
                            name='supportPhone'
                            className="form-input"
                            id="supportPhone"
                            value={formData.supportPhone}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.supportPhone && (
                            <p className="text-danger mt-2" style={{ fontSize: '14px' }}>
                                {validationErrors.supportPhone}
                            </p>
                        )}</div>
                </div>

                <p className='text-danger mb-2 text-center' style={{ fontSize: '15px' }}> {error}</p>

                <div className="text-center mt-3">
                    <button
                        className='primary-btn me-2'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            'Send'
                        )}
                    </button>
                    <button
                        className='outline-btn'
                        onClick={() => navigate(-1)}
                    >Cancel</button>
                </div>
            </form>

            {submitSuccess && <ApplicationSuccessfull />}

        </section>
    )
}

export default VendorApplication
