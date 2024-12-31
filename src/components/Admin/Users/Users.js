import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Users = () => {
    const [loading, setLoading] = useState(false)
    const [dataStatus, setDataStatus] = useState('Loading...');
    const [keyword, setKeyword] = useState('')
    const [searchError, setSearchError] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get('/api/admin/get-all-users')
            if (response.data.users.length === 0) {
                setDataStatus('No users found!')
                return;
            }
            setUsers(response.data.users)
            setDataStatus('')
        } catch (error) {
            console.error(error)
            setDataStatus('Error fetching users')
        }
    }

    const searchUsers = async (keyword) => {
        setLoading(true)
        setSearchError('')
        if (!keyword) {
            setSearchError('Please enter something!')
            return;
        }
        try {
            const response = await axios.get(`/api/admin/search-users`, { params: { keyword } })
            if (response.data.users.length === 0) {
                setDataStatus('No users found!')
                setLoading(false)
                return;
            }
            setUsers(response.data.users)
            setDataStatus('')
        } catch (error) {
            console.error('Error fetching search results: ', error)
            setDataStatus('Error fetching users')
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <section className="container py-5">
            <h2 className="section-title text-center mb-3">Users</h2>

            <div className="mb-3 row">
                <form
                    className="d-flex me-auto col-lg-4 col-md-5"
                    role="search"
                    onSubmit={(e) => {
                        e.preventDefault()
                        searchUsers(keyword)
                    }}
                >
                    <input
                        className="form-input me-2"
                        type="search"
                        placeholder="Search Name or email"
                        aria-label="Search"
                        name="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
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
                    <button
                        className='outline-btn ms-2'
                        type='button'
                        onClick={() => {
                            fetchAllUsers()
                            setKeyword('')
                        }}
                    >Clear</button>
                </form>
                <p className="text-danger">{searchError}</p>

                <div className="text-end">
                    <Link to='/admin/users/create-user' >
                        <button
                            className='primary-btn'
                        >Add +</button>
                    </Link>
                </div>
            </div>

            <div className='row px-sm-0 px-2'>
                <table className='tableDefault table table-bordered'>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataStatus ? <tr>
                            <td className='text-center fs-3' colSpan='2' >{dataStatus}</td>
                        </tr>
                            :
                            users.map((user, index) => (
                                <tr
                                    key={index}
                                    onClick={() => navigate(`/admin/users/user-account/${user._id}`)}
                                >
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>))
                        }
                    </tbody>
                </table>
            </div>


        </section >
    )
}

export default Users
