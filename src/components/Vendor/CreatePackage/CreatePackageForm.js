import React, { useState } from 'react'
import styles from './CreatePackageForm.module.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ConfirmPopup from '../../Common/Popups/ConfirmPopup'

const CreatePackageForm = () => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null)
    const [submitError, setSubmitError] = useState('')
    const [fileError, setFileError] = useState('')
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const categories = [
        "Adventure",
        "Honeymoon",
        "Family",
        "Solo Travel",
        "Cultural",
        "Wildlife",
        "Beach",
        "Mountain",
        "Road Trip",
        "Luxury"
    ];

    const transportationModes = ["Bus", "Bike", "Car", "Flight", "Train", "Cruise Ship", "Jeep"];

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        destination: "",
        pricing: "",
        duration: "",
        transportationMode: "",
        date: "",
        seats: "",
        inclusions: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!validImageTypes.includes(file.type)) {
                setFileError("Please upload a valid image file (JPEG, PNG, GIF).");
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError('')
        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key]);
        }

        if (selectedFile) {
            form.append("image", selectedFile);
        }

        try {
            const response = await axios.post(`/api/vendor/create-package/${user.userId}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setSubmitSuccess(true)
            }
        } catch (error) {
            setSubmitError("There was an error submitting the form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const clearFormData = () => {
        setFormData({
            title: "",
            category: "",
            description: "",
            destination: "",
            pricing: "",
            duration: "",
            transportationMode: "",
            date: "",
            seats: "",
            inclusions: "",
        })
        setSelectedFile(null)
    }

    const successPopupAction = (confirmed) => {
        if (confirmed) {
            navigate(-1)
        } else {
            setSubmitSuccess(false)
            clearFormData()
        }
    }

    return (
        <section className={`${styles.editUserSec} container-fluid px-md-5 px-2 py-5`} >
            <h1 className={`${styles.title} h-3 fw-bold text-center`}>Create Package</h1>

            <div className={`${styles.formCreatePackage} w-100 m-auto mt-3`} >

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="row">

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="title" className="ms-2">Title</label>
                            <input type="text"
                                name='title'
                                className="form-input"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="category" className="ms-2">
                                Category
                            </label>
                            <select
                                name="category"
                                className="form-input"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-2 text-start col-lg-12 form-required">
                            <label htmlFor="description" className="ms-2">Description</label>
                            <textarea
                                rows='5'
                                name='description'
                                className="form-input"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="destination" className="ms-2">Destination</label>
                            <input type="text"
                                name='destination'
                                className="form-input"
                                id="destination"
                                value={formData.destination}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="pricing" className="ms-2">Pricing per person</label>
                            <input type="number"
                                name='pricing'
                                className="form-input"
                                id="pricing"
                                value={formData.pricing}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="duration" className="ms-2">Duration in Days</label>
                            <input type="number"
                                name='duration'
                                className="form-input"
                                id="duration"
                                value={formData.duration}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="transportationMode" className="ms-2">
                                Transportation Mode
                            </label>
                            <select
                                name="transportationMode"
                                className="form-input"
                                id="transportationMode"
                                value={formData.transportationMode}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {transportationModes.map((mode, index) => (
                                    <option key={index} value={mode}>
                                        {mode}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="date" className="ms-2">Starting Date</label>
                            <input type="date"
                                name='date'
                                className="form-input"
                                id="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="seats" className="ms-2">Available seats</label>
                            <input type="number"
                                name='seats'
                                className="form-input"
                                id="seats"
                                value={formData.seats}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2 text-start col-lg-6">
                            <label htmlFor="inclusions" className="ms-2">
                                Inclusions
                                <span
                                    className="ms-1 text-info"
                                    data-bs-toggle="tooltip"
                                    title="Separate inclusions by commas (e.g., Breakfast, Airport Transfers)"
                                >
                                    ?
                                </span>
                            </label>

                            <input type="text"
                                name='inclusions'
                                className="form-input"
                                id="inclusions"
                                value={formData.inclusions}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='mb-2 text-start col-lg-6 form-required'>
                            <div className="mb-2 text-start">
                                <label htmlFor="packageImage" className='ms-2'>Image</label>
                                <input
                                    type="file"
                                    className='form-input'
                                    id="packageImage"
                                    name='packageImage'
                                    onChange={handleFileChange}
                                    accept='image/*'
                                />
                                {fileError && <p className="text-danger" style={{ fontSize: '14px' }}>{fileError}</p>}
                            </div>
                        </div>


                        <p className='text-danger mb-2 text-center' style={{ fontSize: '15px' }}> {submitError}</p>

                        <div className="text-center mt-2">
                            <button
                                className='primary-btn me-2'
                                type='submit'
                                disabled={loading
                                    || !formData.title
                                    || !formData.category
                                    || !formData.destination
                                    || !formData.date
                                    || !formData.description
                                    || !formData.duration
                                    || !formData.pricing
                                    || !formData.seats
                                    || !formData.transportationMode
                                    || !selectedFile
                                    || fileError
                                }
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'Create'
                                )}
                            </button>
                            <button
                                className='outline-btn me-2'
                                type='button'
                                onClick={() => clearFormData()}
                            >
                                Clear
                            </button>
                            <button
                                className='outline-btn'
                                type='button'
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </form>
            </div>

            {submitSuccess &&
                <ConfirmPopup
                    title='Package created successfully'
                    description='Your package will be reviewed and published soon'
                    allowText='Ok'
                    denyText='Create another'
                    onAction={successPopupAction}
                />
            }

        </section>


    )
}

export default CreatePackageForm
