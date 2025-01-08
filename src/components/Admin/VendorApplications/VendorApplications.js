import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const VendorApplications = ({ filter }) => {
    const [loading, setLoading] = useState(false)
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [applications, setApplications] = useState([])
    
    const navigate = useNavigate()

    const fetchApplications = async (filter) => {
        try {
            const response = await axios.get(`/api/admin/get-${filter}-applications`)
            setApplications(response.data.applications)
        } catch (error) {
            console.error(error);
            setDataStatus(error.response?.data?.message || 'Error while fetching applications')
        }
    }

    useEffect(() => {
        fetchApplications(filter)
    })

    return (
        <section className='container py-5'>
            <h2 className='section-title text-center mb-3'>{filter} Vendors</h2>

            <div className="mb-3 row">
                <form
                    className="d-flex me-auto col-lg-4 col-md-5"
                    role="search"
                    // onSubmit={handleSearch}
                    method="get"
                >
                    <input
                        className="form-input me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        name="keyword"
                    // value={keyword}
                    // onChange={(e) => e.target.value}
                    />

                    <button
                        className="primary-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            'Search'
                        )}
                    </button>
                </form>
                {/* <p className="text-danger">{searchError}</p> */}
            </div>

            <div>
                {applications.length > 0 ?
                    <table className={`tableDefault table table-bordered`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application, index) => (
                                <tr
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/admin/view-application/${application._id}`)}
                                >
                                    <td>{index + 1}</td>
                                    <td>{application.businessName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    :
                    <p className='text-center fs-5'>{dataStatus}</p>
                }
            </div>
        </section>
    )
}

export default VendorApplications
