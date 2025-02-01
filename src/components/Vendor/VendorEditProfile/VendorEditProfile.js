import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './VendorEditProfile.module.css';
import { useNavigate } from 'react-router';
import axios from 'axios'
import config from '../../../config/api';
import { updateJwt } from '../../../redux/slices/authSlice'

const VendorEditProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [dataStatus, setDataStatus] = useState('Loading...');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [updationError, setUpdationError] = useState('')

    const validateForm = () => {
        const newErrors = {};

        if (!/^\d{10}$/.test(formData.contact.phone)) {
            newErrors.contact = { ...newErrors.contact, phone: 'Phone number must be 10 digits' };
        }
        if (!/^\d{10}$/.test(formData.supportContact.phone)) {
            newErrors.supportContact = { ...newErrors.supportContact, phone: 'Phone number must be 10 digits' };
        }

        setValidationErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            const keys = name.split('.');
            if (keys.length === 1) {
                return { ...prevData, [name]: value };
            } else {
                const [parentKey, childKey] = keys;
                return {
                    ...prevData,
                    [parentKey]: {
                        ...prevData[parentKey],
                        [childKey]: value,
                    },
                };
            }
        });
    };

    const fetchVendorDetails = async (vendorId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/common/get-vendor-details/${vendorId}`);
            setFormData(response.data.vendorDetails);
            setDataStatus('');
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error fetching vendor details');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdationError('')
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/vendor/edit-profile/${user.userId}`, formData);            
            dispatch(updateJwt({ token: response.data.token }));
            alert('Vendor details updated successfully');
            navigate(-1);
        } catch (error) {
            setUpdationError(error.response?.data?.message || 'Error updating vendor details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchVendorDetails(user.userId);
        } else {
            setDataStatus('User not found');
        }
    }, [user]);

    return (
        <section className={`${styles.editUserSec} container-fluid px-md-5 px-2 py-3`}>
            <div className={`${styles.formEditUser} w-100 m-auto shadow mt-5`}>
                <h1 className={`${styles.title} h3 fw-medium text-center`}>Edit Account</h1>
                <hr className="border-2 mt-0" />

                {formData ? (
                    <form onSubmit={handleSubmit}>
                        <div className="row row-cols-md-2 row-cols-1">
                            <div className="mb-2 text-start col">
                                <label htmlFor="name" className="ms-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    id="name"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-2 text-start col">
                                <label htmlFor="contact.email" className="ms-2">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contact.email"
                                    className="form-input"
                                    id="contact.email"
                                    value={formData.contact.email || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-2 text-start">
                                <label htmlFor="contact.phone" className="ms-2">
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    name="contact.phone"
                                    className="form-input"
                                    id="contact.phone"
                                    value={formData.contact.phone || ''}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.contact?.phone && (
                                    <p className="text-danger" style={{ fontSize: '12px' }}>
                                        {validationErrors.contact.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <hr className="border-2 mt-0 mb-3" />

                        <h5 className="text-start">Customer Support Contact</h5>
                        <div className="row row-cols-md-2 row-cols-1">
                            <div className="mb-2 text-start col">
                                <label htmlFor="supportContact.email" className="ms-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="supportContact.email"
                                    className="form-input"
                                    id="supportContact.email"
                                    value={formData.supportContact.email || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-2 text-start col">
                                <label htmlFor="supportContact.phone" className="ms-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="supportContact.phone"
                                    className="form-input"
                                    id="supportContact.phone"
                                    value={formData.supportContact.phone || ''}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.supportContact?.phone && (
                                    <p className="text-danger" style={{ fontSize: '12px' }}>
                                        {validationErrors.supportContact.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <p className='text-danger mb-2 text-center' style={{ fontSize: '15px' }}> {updationError}</p>

                        <div className={`${styles.formButtons} text-center mt-3`}>
                            <button className="primary-btn mb-2 me-sm-3" type="submit" disabled={loading}>
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'Update'
                                )}
                            </button>
                            <button className="outline-btn" type="button" onClick={() => navigate(-1)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <h4 className="text-secondary text-center">{dataStatus}</h4>
                )}
            </div>
        </section>
    );
};

export default VendorEditProfile;
