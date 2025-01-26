import React, { useState } from 'react'
import styles from './CreateUser.module.css'
import { useNavigate } from 'react-router'
import axios from 'axios'

const CreateUser = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPass: '',
    });

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

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPass) {
            newErrors.confirmPass = "Passwords do not match";
        }

        setValidationErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)

        if (!validateForm()) {
            return
        }
        setLoading(true);

        try {
            await axios.post('/api/auth/signup', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            })
            setLoading(false)
            navigate('/admin/users')
        } catch (error) {
            console.error(error)
            setError(error.response?.data?.message || "An error occured");
            setLoading(false)
        }
    }

    return (
        <section className={`${styles.signupSec} container-fluid px-md-5 px-2 py-3`} >

            <div className={`${styles.formSignin} w-100 m-auto shadow mt-5`} >
                <h1 className={`${styles.title} h3 fw-medium text-center`}>Create User Account</h1>
                <hr className='border-2 mt-0' />

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="mb-2 text-start col-sm-6">
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

                        <div className="mb-2 text-start col-sm-6">
                            <label htmlFor="password" className="ms-2">Password</label>
                            <input type="password"
                                name='password'
                                className="form-input"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {validationErrors.password && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.password}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-2 text-start col-sm-6">
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

                        <div className="mb-2 text-start col-sm-6">
                            <label htmlFor="confirmPass" className="ms-2">Confirm Password</label>
                            <input type="password"
                                name='confirmPass'
                                className="form-input"
                                id="confirmPass"
                                value={formData.confirmPass}
                                onChange={handleChange}
                            />
                            {validationErrors.confirmPass && <p className="text-danger" style={{ fontSize: '12px' }}>{validationErrors.confirmPass}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-2 text-start col-sm-6">
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
                                'Create'
                            )}
                        </button>
                        <button
                            className='outline-btn w-100'
                            type='button'
                            onClick={() => navigate('/admin/users')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>


        </section>

    )
}

export default CreateUser