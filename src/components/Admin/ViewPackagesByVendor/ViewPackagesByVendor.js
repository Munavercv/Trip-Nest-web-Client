import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import config from '../../../config/api';

const ViewPackagesByVendor = () => {
    const { vendorId } = useParams()
    const limit = 50;
    const navigate = useNavigate()

    const [packages, setPackages] = useState([])
    const [dataStatus, setDataStatus] = useState('Loading...')
    const [loading, setLoading] = useState(false)
    const [searching, setSearching] = useState(false)
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [searchError, setSearchError] = useState('')

    const fetchPackages = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/common/get-packages-by-vendor/${vendorId}`, { params: { page, limit } })
            if (response.data.packages.length > 0) {
                setPackages(response.data.packages);
                setDataStatus('');
            } else {
                setPackages(null);
                setDataStatus('No packages available');
            }
        } catch (error) {
            setDataStatus('Packages not found')
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()

        if (!keyword)
            return setSearchError('Please enter a keyword!')

        setSearching(true)
        setSearchError('')
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/common/search-packages`, {
                params: {
                    keyword,
                    vendorId
                }
            })
            const results = response.data.results

            if (results.length === 0) {
                setPackages([])
                setDataStatus('No packages found for "' + keyword + '"')
                return
            }

            setPackages(results)
        } catch (error) {
            setSearchError(error.response?.data?.message || 'Error while searching packages')
        } finally {
            setKeyword('')
            setSearching(false)
        }
    }


    useEffect(() => {
        fetchPackages()
    }, [page])

    return (
        <section className={`container-fluid py-4 px-md-5`}>

            <div className="mb-3 row">
                <form
                    className="d-flex me-auto col-lg-5 col-md-7 col-12"
                    role="search"
                    onSubmit={handleSearch}
                >
                    <input
                        className="form-input me-md-2 me-1"
                        type="search"
                        placeholder="Enter title"
                        aria-label="Search"
                        name="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />

                    <button
                        className="primary-btn me-md-2 me-1"
                        type="submit"
                        disabled={searching}
                    >
                        {searching ? 'Searching...' : 'Search'}
                    </button>
                    <button
                        className='outline-btn'
                        type='button'
                        onClick={() => {
                            setPage(1)
                            fetchPackages()
                            setKeyword('')
                        }}
                    >Clear</button>
                </form>
                <p className="text-danger">{searchError}</p>
            </div>



            <div className="row table-responsive px-2">
                {packages.length > 0 ?
                    <table
                        className="tableDefault table-hover table table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Destination</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((packageData, index) => (
                                <tr
                                    key={index}
                                    onClick={() => navigate(`/admin/view-package/${packageData._id}`)}
                                >
                                    <td>{index + 1}</td>
                                    <td>{packageData.title}</td>
                                    <td>{packageData.destination}</td>
                                    <td
                                        className={`
                                            fw-bold ${packageData.status === 'pending'
                                                ? 'text-primary'
                                                : packageData.status === 'approved'
                                                    ? 'text-success'
                                                    : packageData.status === 'inactive'
                                                        ? 'text-secondary'
                                                        : packageData.status === 'active'
                                                            ? 'text-info'
                                                            : 'text-danger'
                                            }
                                            `}
                                    >{packageData.status}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    :
                    <h4 className='text-center text-danger'>{dataStatus}</h4>
                }
            </div>
            <div className="text-center">
                <button
                    className='primary-btn'
                    disabled={page === 1 || loading}
                    onClick={() => {
                        setLoading(true)
                        setPage(page - 1)
                    }}
                ><i className="fa-solid fa-angles-left"></i> Prev</button>
                <button
                    disabled={!packages || packages.length < limit || loading}
                    className='primary-btn'
                    onClick={() => {
                        setLoading(true)
                        setPage(page + 1)
                    }}
                >Next <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </section>
    )
}

export default ViewPackagesByVendor