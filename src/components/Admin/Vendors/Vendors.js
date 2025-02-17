import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config/api';
import { Link, useNavigate } from 'react-router-dom';

const Vendors = ({filter}) => {

  const navigate = useNavigate()
  const [dataStatus, setDataStatus] = useState('Loading...');
  const [searchError, setSearchError] = useState('')
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [vendors, setVendors] = useState([])

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/admin/all-${filter}-vendors`)
      if (response.data.vendors.length === 0) {
        setDataStatus('No vendors found!')
        return;
      }
      setVendors(response.data.vendors)
      setDataStatus('')
    } catch (error) {
      setDataStatus('Internal server error')
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!keyword)
      return setSearchError('Please enter a keyword')

    setLoading(true)
    setSearchError('')
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/admin/search-vendors`,
        { params: { keyword, status: filter } }
      )

      setVendors(response.data.result)
    } catch (error) {
      setSearchError(error.response?.data?.message || 'Error searching vendors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVendors()
  }, [])

  return (
    <section className='container py-5'>
      <h2 className='section-title text-center'>Vendors</h2>

      <div class="dropdown mb-3 text-center">
        <button class="primary-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {filter}
        </button>
        <ul class="dropdown-menu">
          <li><Link to='/admin/active-vendors' className="dropdown-item">Active</Link></li>
          <li><Link to='/admin/disabled-vendors' className="dropdown-item">Inactive</Link></li>
        </ul>
      </div>

      <div className="mb-3 row">
        <form
          className="d-flex me-auto col-md-5"
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
            className="outline-btn"
            type="button"
            onClick={() => {
              setKeyword('')
              fetchVendors()
            }}
          >
            Clear
          </button>
        </form>
        <p className="text-danger">{searchError}</p>
      </div>

      <div>
        {vendors.length > 0 ?
          <table className={`tableDefault table table-bordered`}>
            <thead>
              <tr>
                <th>#</th>
                <th>Company name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/admin/view-vendor/${vendor._id}`)}
                >
                  <td>{index + 1}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.contact.email}</td>
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

export default Vendors