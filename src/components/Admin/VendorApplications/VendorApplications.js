import axios from 'axios'
import config from '../../../config/api'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const VendorApplications = ({ filter }) => {
    const [loading, setLoading] = useState(false)
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [applications, setApplications] = useState([])
    const [keyword, setKeyword] = useState('')
    const [searchError, setSearchError] = useState('')

    const navigate = useNavigate()

    const fetchApplications = async (filter) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-${filter}-applications`)
            setApplications(response.data.applications)
        } catch (error) {
            setDataStatus(error.response?.data?.message || 'Error while fetching applications')
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSearchError('')

        if (!keyword)
            return setSearchError('Please enter a keyword!')
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/admin/search-applications`, {
                params: {
                    keyword,
                    status: filter,
                }
            })
            const results = response.data.results

            if (results.length === 0) {
                setApplications([])
                setDataStatus('No applications found for "' + keyword + '"')
                return
            }

            setApplications(results)
        } catch (error) {
            setSearchError(error.response?.data?.message || 'Error while searching applications')
        } finally {
            setKeyword('')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchApplications(filter)
    }, [filter])

    return (
        <section className='container-fluid py-5 px-lg-5'>
            <h2 className='section-title text-center mb-3'>{filter} Vendors</h2>

            <div className="mb-3 row">
                <form
                    className="d-flex me-auto col-lg-5 col-md-7 col-12"
                    role="search"
                    onSubmit={handleSearch}
                >
                    <input
                        className="form-input me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        name="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />

                    <button
                        className="primary-btn me-2"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                    <button
                        className='outline-btn'
                        type='button'
                        onClick={() => fetchApplications(filter)}
                    >
                        clear
                    </button>
                </form>
                <p className="text-danger">{searchError}</p>
            </div>

            <div>
                {applications.length > 0 ?
                    <table className={`tableDefault table table-bordered`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company name</th>
                                <th>Email</th>
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
                                    <td>{application.contact.email}</td>
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
