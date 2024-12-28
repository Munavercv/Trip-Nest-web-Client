import React, { useEffect, useState } from 'react'
import styles from './VendorAccount.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const VendorAccount = () => {

    const { vendorId } = useParams()
    const navigate = useNavigate()
    const [vendorDetails, setVendorDetails] = useState()
    const [logo, setLogo] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZWx8ZW58MHx8MHx8fDA%3D')

    const fetchVendorDetails = async (vendorId) => {
        try {
            const response = await axios.get(`/api/admin/get-package-details/${vendorId}`)
            setVendorDetails(response.data.vendorDetails)
        } catch (error) {
            console.error('failed to fetch vendor details', error);
        }
    }

    useEffect(() => {
        fetchVendorDetails(vendorId)
    }, [])

    return (
        <section className='container py-5'>
            <button className='btn btn-outline-secondary btn-sm'><i className="fa-solid fa-caret-left"></i> back</button>
            
            <h2 className='section-title text-center mb-5'>{vendorDetails ? vendorDetails.businessName : 'Loading...'}</h2>

            {vendorDetails &&
                <div className="row my-4">
                    <div className="col-md-6 text-center mb-2">
                        <div className={`d-flex justify-content-center ${styles.profilePic}`} >
                            {logo ? <img
                                src={logo}
                                alt="Model"
                            />
                                :
                                <div className={styles.circle} ></div>}
                        </div>
                        <div className={styles.details} >
                            <p className='mb-1'>{vendorDetails.contact?.email}</p>
                            <p className='mb-1'>Phone: {vendorDetails.contact?.phone}</p>
                            {vendorDetails.businessAddress && <p className='mb-1'>
                                {vendorDetails.businessAddress.state},
                                {vendorDetails.businessAddress.district},
                                {vendorDetails.businessAddress.address},
                                {vendorDetails.businessAddress.pin}
                            </p>}
                            <p>Status: <span>{vendorDetails.status}</span></p>
                        </div>
                    </div>

                    <div className="col-md-6 mt-5 d-flex justify-content-center">
                        <ul className={styles.quickLinks} style={{ listStyleType: 'none' }}>
                            <li>Quick Links</li>
                            <li>
                                <Link className={styles.links} >Edit</Link>
                            </li>
                            <li>
                                <Link className={styles.links} >Packages</Link>
                            </li>
                            <li>
                                <Link className={styles.links} >Remove account</Link>
                            </li>
                        </ul>
                    </div>
                </div>}

            {vendorDetails &&
                <div className="text-center">
                    {vendorDetails.status === 'pending' && <>
                        <button className='primary-btn me-2'>Approve</button>
                        <button className='primary-btn'>Reject</button>
                    </>}
                    {vendorDetails.status === 'rejected' && <>
                        <button className='primary-btn me-2'>Approve</button>
                        <button className='primary-btn'>Remove</button>
                    </>}
                    {vendorDetails.status === 'active' && <>
                        <button className='primary-btn me-2'>Disable</button>
                        <button className='primary-btn'>Remove</button>
                    </>}
                    {vendorDetails.status === 'disabled' && <>
                        <button className='primary-btn me-2'>Activate</button>
                        <button className='primary-btn'>Remove</button>
                    </>}
                </div>
            }

            <hr className='border-4 my-5 w-100' />

        </section>
    )
}

export default VendorAccount
