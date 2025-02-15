import React from 'react'
import { Link } from 'react-router-dom'

const LandingManagePackages = () => {
  return (
    <section className='container py-3 text-center'>
      <h4 className='section-title'>Manage Packages</h4>
      <p className='section-subtitle'>Upload, edit, delete, disable packages</p>
      <Link to='/vendor/active-packages'>
        <button className='primary-btn me-2'>Active packages</button>
      </Link>
      <Link to='/vendor/pending-packages'>
        <button className='primary-btn me-2'>Pending packages</button>
      </Link>
      <Link to='/vendor/create-package'
      ><button className='primary-btn mt-sm-0 mt-2'>Create package</button></Link>
    </section>
  )
}

export default LandingManagePackages
