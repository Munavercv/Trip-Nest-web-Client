import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import styles from './EditUser.module.css'
import axios from 'axios'
import config from '../../../config/api';

const EditUser = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });


    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-user-details/${userId}`)
            const userData = response.data.userDetails[0];
            if (userData.length === 0) {
                setDataStatus('Error fetching user details')
                return
            }
            setFormData({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
            })
            setDataStatus('')
        } catch (error) {
            console.log("Internal server error: ", error);
            setDataStatus('Error fetching user details!')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
        setError(null)

        if (!validateForm()) return

        setLoading(true);

        try {
            await axios.put(`${config.API_BASE_URL}/api/admin/edit-user/${userId}`, {
                data: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                },
            })
            setLoading(false)
            navigate(-1)
            window.alert('Updated successfully')
        } catch (error) {
            console.error(error)
            setError(error.response?.data?.message || "An error occured");
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserDetails(userId)
    }, [])

    return (
        <section className={`${styles.editUserSec} container-fluid px-md-5 px-2 py-3`} >

            <div className={`${styles.formEditUser} w-100 m-auto shadow mt-5`} >
                <h1 className={`${styles.title} h3 fw-medium text-center`}>Edit User Account</h1>
                <hr className='border-2 mt-0' />

                {dataStatus ?
                    <h4 className='text-secondary'>{dataStatus}</h4>
                    :
                    <form onSubmit={handleSubmit}>

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
                    </form>}
            </div>


        </section>

    )
}

export default EditUser
