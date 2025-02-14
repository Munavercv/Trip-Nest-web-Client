import React, { useEffect, useState } from 'react'
import styles from './UserViewVendorProfile.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'

const UserViewVendorProfile = () => {
    const { vendorId } = useParams()
    const navigate = useNavigate()
    const [vendorDetails, setVendorDetails] = useState()

    const goback = () => {
        navigate(-1)
    }

    const fetchVendorDetails = async (vendorId) => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/user/get-vendor-details/${vendorId}`)
            setVendorDetails(data.vendorDetails)
        } catch (error) {
            console.error('failed to fetch vendor details', error)
        }
    }

    useEffect(() => {
        fetchVendorDetails(vendorId)
    }, [vendorId])


    return (
        <section className='container py-5'>
            <button onClick={goback} className='btn btn-outline-secondary btn-sm'><i className="fa-solid fa-caret-left"></i> back</button>

            <h2 className='section-title text-center my-3'>{vendorDetails ? vendorDetails.name : 'Loading...'}</h2>

            {vendorDetails &&
                <div className="row my-4">
                    <div className="col-md-12 text-center mb-2 card py-md-5 py-3 border-2">
                        <div className={`d-flex justify-content-center ${styles.profilePic} mb-3`} >
                            {vendorDetails.dpUrl ? <img
                                src={vendorDetails.dpUrl}
                                alt="Profile pic"
                            />
                                :
                                <div className={styles.circle} ></div>}
                        </div>
                        <div className={styles.details} >
                            <p className='mb-1'>{vendorDetails.supportContact?.email}</p>
                            <p className='mb-1'>Phone: {vendorDetails.supportContact?.phone}</p>
                            {vendorDetails.address && <p className='mb-1'>
                                {vendorDetails.address.district}, &nbsp;
                                {vendorDetails.address.state}
                            </p>}
                            {vendorDetails.websiteUrl &&
                                <a href={vendorDetails.websiteUrl}
                                >
                                    <i
                                        className="fa-solid fa-globe"></i> {vendorDetails.websiteUrl.replace(/^https?:\/\//, '')}
                                </a>
                            }
                        </div>
                    </div>

                    <div className='text-center my-3'>
                        <Link
                            to={`/packages-by-vendor/${vendorId}`}
                            className='primary-btn py-3'
                        >
                            Packages <i className="fa-solid fa-suitcase"></i></Link>
                    </div>

                    <div className="mt-3 d-flex justify-content-center text-center">
                        <a
                            href={`https://wa.me/${vendorDetails.supportContact?.phone.replace(/\s+/g, '')}`}
                            target="_blank" rel="noopener noreferrer"
                            className='btn btn-success'
                        ><i className="fa-brands fa-whatsapp"></i> Whatsapp</a>
                        <a
                            href={`tel:${vendorDetails.supportContact?.phone}`}
                            className='btn btn-primary mx-2'
                        ><i className="fa-solid fa-headset"></i> Call</a>
                    </div>
                </div>}
        </section>

    )
}

export default UserViewVendorProfile
