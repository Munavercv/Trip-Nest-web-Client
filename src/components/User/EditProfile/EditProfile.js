import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from './EditProfile.module.css'
import { updateJwt } from '../../../redux/slices/authSlice'
import axios from 'axios'
import config from '../../../config/api'
import SuccessPopup from '../../Common/Popups/SuccessPopup'

const EditProfile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [editSuccess, setEditSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        setValidationErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('phone', formData.phone);

        if (selectedFile) {
            formDataObj.append('file', selectedFile);
        }

        setLoading(true);

        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/user/edit-profile/${user.userId}`, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(updateJwt({ token: response.data.token }));
            setEditSuccess(true)
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className={`${styles.editUserSec} container-fluid px-md-5 px-2 py-3`} >

            <div className={`${styles.formEditUser} w-100 m-auto shadow mt-5`} >
                <h1 className={`${styles.title} h3 fw-medium text-center`}>Edit User Account</h1>
                <hr className='border-2 mt-0' />

                {user ?
                    <form onSubmit={handleSubmit}>

                        <div className='mb-2 text-center'>
                            <div className={`${styles.imgPreview}`}>
                                <img
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : user.dpUrl}
                                    alt="Profile picture" />
                            </div>

                            <label htmlFor="">Profile picture</label>
                            <div className="input-group mb-3">
                                <input
                                    type="file"
                                    className='form-control'
                                    id="inputGroupFile04"
                                    onChange={handleFileChange}
                                />

                                <button
                                    className="outline-btn"
                                    type="button"
                                    id="inputGroupFileAddon04"
                                    onClick={() => setSelectedFile(null)}
                                >Remove</button>
                            </div>
                        </div>

                        <div className="mb-2 text-start">
                            <label htmlFor="name" className="ms-2">Name</label>
                            <input type="text"
                                name='name'
                                className="form-input"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {validationErrors.name && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.name}</p>}
                        </div>

                        <div className="mb-2 text-start">
                            <label htmlFor="email" className="ms-2">Email</label>
                            <input type="email"
                                name='email'
                                className="form-input"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {validationErrors.email && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.email}</p>}

                        </div>

                        <div className="mb-2 text-start">
                            <label htmlFor="phone" className="ms-2">Phone Number</label>
                            <input type="number"
                                name='phone'
                                className="form-input"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {validationErrors.phone && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.phone}</p>}
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
                    </form>
                    :
                    <h4 className='text-secondary text-center'>An error occured</h4>
                }
            </div>


            {editSuccess &&
                <SuccessPopup
                    title='Successfully Updated Your account'
                    onClose={() => {
                        navigate(-1)
                    }}
                />
            }


        </section>

    )
}

export default EditProfile
