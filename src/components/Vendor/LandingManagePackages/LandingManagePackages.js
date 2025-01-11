import React from 'react'

const LandingManagePackages = () => {
  return (
    <section className='container py-3 text-center'>
      <h4 className='section-title'>Manage Packages</h4>
      <p className='section-subtitle'>Upload, edit, delete, disable packages</p>
      <button className='primary-btn me-2'>Active packages</button>
      <button className='primary-btn me-2'>Pending packages</button>
      <button className='primary-btn me-2'>Create package</button>
    </section>
  )
}

export default LandingManagePackages
