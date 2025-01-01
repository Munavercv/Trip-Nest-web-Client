import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './EditVendor.module.css'
import axios from 'axios'

const EditVendor = () => {
    const { vendorId } = useParams()
    const navigate = useNavigate()
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        businessName: '',
        email: '',
        phone: '',
        state: '',
        district: '',
        address: '',
        pincode: '',
    })

    const validateForm = () => {
        const newErrors = {};

        if (formData.businessName.length < 2)
            newErrors.businessName = 'Please enter a valid name';

        if (!/^\d{10}$/.test(formData.phone))
            newErrors.phone = 'Please enter a valid Phone number';

        if (formData.pincode.length !== 6)
            newErrors.pincode = 'Please enter a valid pincode'

        setValidationErrors(newErrors)

        return Object.keys(newErrors).length === 0;
    }

    const fetchVendorDetails = async (vendorId) => {
        try {
            const response = await axios.get(`/api/admin/get-vendor-details/${vendorId}`)
            const vendorDetails = response.data.vendorDetails;
            setFormData({
                businessName: vendorDetails.businessName,
                email: vendorDetails.contact?.email,
                phone: vendorDetails.contact?.phone,
                state: vendorDetails.businessAddress?.state,
                district: vendorDetails.businessAddress?.district,
                address: vendorDetails.businessAddress?.address,
                pincode: vendorDetails.businessAddress?.pincode,
            })
            setDataStatus('')
        } catch (error) {
            console.error(error);
            setDataStatus('Error while fetching vendor details')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null)
        if (!validateForm()) return

        setLoading(true)

        try {
            await axios.post(`/api/admin/edit-vendor/${vendorId}`, {
                data: {
                    ...formData,
                }
            })
            setLoading(false)
            navigate(-1)
            window.alert('Updated successfully')
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || 'An error occured while updating vendor')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVendorDetails(vendorId)
    }, [])

    return (
        <section className={`${styles.editVendorSec} container-fluid px-md-5 px-2 py-3`} >

            <div className={`${styles.formEditVendor} w-100 m-auto shadow mt-5`} >
                <h1 className={`${styles.title} h3 fw-medium text-center`}>Edit Vendor Account</h1>
                <hr className='border-2 mt-0' />

                {dataStatus ?
                    <h4 className='text-secondary'>{dataStatus}</h4>
                    :
                    <form onSubmit={handleSubmit}>

                        <div className="row row-cols-md-2">
                            <div className="mb-2 text-start col">
                                <label htmlFor="businessName" className="ms-2">Company name</label>
                                <input type="text"
                                    name='businessName'
                                    className="form-input"
                                    id="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.businessName && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.businessName}</p>}
                            </div>

                            <div className="mb-2 text-start col">
                                <label htmlFor="state" className="ms-2">State</label>
                                <input type="text"
                                    name='state'
                                    className="form-input"
                                    id="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row row-cols-md-2">
                            <div className="mb-2 text-start">
                                <label htmlFor="email" className="ms-2">Email</label>
                                <input type="email"
                                    name='email'
                                    className="form-input"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-2 text-start">
                                <label htmlFor="district" className="ms-2">District</label>
                                <input type="text"
                                    name='district'
                                    className="form-input"
                                    id="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row row-cols-md-2">
                            <div className="mb-2 text-start">
                                <label htmlFor="phone" className="ms-2">Phone Number</label>
                                <input type="number"
                                    name='phone'
                                    className="form-input"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.phone && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.phone}</p>}
                            </div>
                            <div className="mb-2 text-start">
                                <label htmlFor="address" className="ms-2">Address</label>
                                <input type="text"
                                    name='address'
                                    className="form-input"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row row-cols-md-2">
                            <div className="mb-2 text-start ms-auto">
                                <label htmlFor="pincode" className="ms-2">Pincode</label>
                                <input type="number"
                                    name='pincode'
                                    className="form-input"
                                    id="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.pincode && <p className="text-danger" style={{ fontSize: '14px' }}>{validationErrors.pincode}</p>}
                            </div>
                        </div>

                        <p className='text-danger mb-2 text-center' style={{ fontSize: '15px' }}> {error}</p>

                        <div className="text-center mt-3">
                            <button
                                className='primary-btn w-100 mb-2'
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'Update'
                                )}
                            </button>
                            <button
                                className='outline-btn w-100'
                                type='button'
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>}
            </div>

        </section>
    )
}

export default EditVendor
