import React, { useEffect, useState } from 'react'
import styles from './VendorEditPackageForm.module.css'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import config from '../../../config/api'
import SuccessPopup from '../../Common/Popups/SuccessPopup'

const VendorEditPackageForm = () => {
    const { packageId } = useParams()
    const navigate = useNavigate()

    const [dataSatatus, setDataStatus] = useState()
    const [formData, setFormData] = useState(null)
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith('image/')) {
                setFileError('Please upload a valid image file.');
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                setFileError('File size must be less than 5MB.');
                return;
            }
            setFile(selectedFile);
            setFileError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        if (file) {
            formDataToSend.append('packageImage', file);
        }

        try {
            await axios.put(
                `${config.API_BASE_URL}/api/vendor/update-package/${packageId}`,
                formDataToSend,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setSubmitSuccess(true);
            setSubmitError('');
        } catch (error) {
            setSubmitError(error.response?.data?.message || 'Error updating package.');
        } finally {
            setSubmitLoading(false);
        }
    };

    useEffect(() => {
        const fetchPackage = async (id) => {
            setDataStatus('Loading...')
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/common/get-package/${id}`)
                setFormData(response.data.package);
            } catch (error) {
                setDataStatus(error.response?.data?.message || 'Error fetching package details')
            }
        }

        fetchPackage(packageId)
    }, [packageId])

    const successPopupAction = (confirm) => {
        if(confirm){
            navigate(-1)
        }
    } 

    return (
        <section className={`${styles.editUserSec} container-fluid px-md-5 px-2 py-5`} >
            <h1 className={`${styles.title} h-3 fw-bold text-center`}>Edit Package</h1>

            {formData ? <div className={`${styles.formCreatePackage} w-100 m-auto mt-3`} >

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
                            <label htmlFor="price" className="ms-2">Pricing per person</label>
                            <input type="number"
                                name='price'
                                className="form-input"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="days" className="ms-2">Duration in Days</label>
                            <input type="number"
                                name='days'
                                className="form-input"
                                id="days"
                                value={formData.days}
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
                            <label htmlFor="startDate" className="ms-2">Starting Date</label>
                            <input type="date"
                                name='startDate'
                                className="form-input"
                                id="startDate"
                                value={new Date(formData.startDate).toISOString().split('T')[0]}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <label htmlFor="totalSlots" className="ms-2">Available seats</label>
                            <input type="number"
                                name='totalSlots'
                                className="form-input"
                                id="totalSlots"
                                value={formData.totalSlots}
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

                        <div className="mb-2 text-start col-lg-6 form-required">
                            <div className="mb-2 text-start">
                                <label htmlFor="packageImage" className="ms-2">Image</label>
                                <input
                                    type="file"
                                    className="form-input"
                                    id="packageImage"
                                    name="packageImage"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                {fileError && <p className="text-danger" style={{ fontSize: '14px' }}>{fileError}</p>}
                            </div>
                        </div>

                        <p className="text-danger mb-2 text-center" style={{ fontSize: '15px' }}>{submitError}</p>

                        <div className="text-center mt-2">
                            <button
                                className="primary-btn me-2"
                                type="submit"
                                disabled={
                                    !formData.title ||
                                    !formData.category ||
                                    !formData.destination ||
                                    !formData.startDate ||
                                    !formData.description ||
                                    !formData.days ||
                                    !formData.price ||
                                    !formData.totalSlots ||
                                    !formData.transportationMode ||
                                    fileError
                                }
                            >
                                {submitLoading ? 'Updating...' : 'Update'}
                            </button>

                            <button
                                className="outline-btn"
                                type="button"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>

                :
                <h4 className='text-center'>{dataSatatus}</h4>
            }
            {submitSuccess &&
                <SuccessPopup
                    title='Package updated successfully'
                    description='Your package will be reviewed and published soon'
                    onClose={successPopupAction}
                />
            }

        </section>
    )
}

export default VendorEditPackageForm
