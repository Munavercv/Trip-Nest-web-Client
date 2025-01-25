import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const FindPackagesForm = () => {
    const themes = ['Beach', 'Adventure', 'HoneyMoon', 'Family', 'Road Trip', 'Luxury', 'Cultural', 'Holiday']
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        destination: '',
        month: '',
        category: '',
    });
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        if (!formData.destination && !formData.month && !formData.category)
            return setError('Please enter anything')

        const queryParams = new URLSearchParams(formData).toString()

        navigate(`/find-packages?${queryParams}`)
    };

    return (
        <section className="container text-center py-4">
            <h1 className="section-title mb-3">Find packages</h1>
            <form onSubmit={handleSubmit}>
                <div className="row text-center">
                    <div className="col-md-3 mb-3">
                        <input
                            type="text"
                            name="destination"
                            id="destination"
                            placeholder="Destination"
                            className="form-input w-100"
                            value={formData.destination}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <input
                            type="month"
                            name="month"
                            id="month"
                            className="form-input w-100"
                            value={formData.month}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <select
                            name="category"
                            className="form-input w-100"
                            value={formData.theme}
                            onChange={handleChange}
                        >
                            <option value="">
                                Choose a Theme
                            </option>
                            {themes.map((theme, index) => (
                                <option key={index} value={theme}>
                                    {theme}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 mb-3">
                        <button type="submit" className="form-btn w-100">
                            Find
                        </button>
                    </div>
                </div>
            </form>
            <p className='text-center text-danger'>{error}</p>
        </section>
    );
};

export default FindPackagesForm;