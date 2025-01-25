import React, { useEffect, useState } from 'react'
import PackageCard from '../../Common/PackageCard/PackageCard'
import axios from 'axios'

const ViewPackagesByCategory = () => {

    const [dataStatus, setDataStatus] = useState('Loading...')
    const [packages, setPackages] = useState(null)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('All')

    const categories = ['All', 'Beach', 'Adventure', 'HoneyMoon', 'Family', 'Road Trip', 'Luxury', 'Cultural']

    const limit = 16;

    const fetchPackages = async (category) => {
        setLoading(true)
        try {
            const response = await axios.get('/api/user/get-packages-by-category', { params: { category, page, limit } })
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

    useEffect(() => {
        fetchPackages(category)
    }, [page, category])

    return (
        <section className={`container-fluid py-4 px-0`}>
            <div>
                <ul
                    className="nav nav-underline mb-md-3 d-flex align-items-center justify-content-center">
                    {categories.map((cat, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setPage(1)
                                setCategory(cat)
                            }}
                            className={`nav-item nav-link cursor-pointer ${category === cat ? 'active' : ''}`}>
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            <div
                style={{ backgroundColor: 'var(--section-grey)' }}
                className='py-4'
            >
                <h4 className='section-title text-center'>{category} Packages</h4>

                <div className="row">
                    {packages ?
                        packages.map((packageDetails, index) => (
                            <div key={index} className="px-2 d-flex justify-content-center col-xl-3 col-lg-4 col-sm-6 ">
                                <PackageCard
                                    {...packageDetails}
                                />
                            </div>))
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
            </div>
        </section>
    )
}

export default ViewPackagesByCategory
