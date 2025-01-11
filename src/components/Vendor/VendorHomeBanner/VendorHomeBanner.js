import React from 'react'

const VendorHomeBanner = () => {
    return (
        <section className='text-center container py-5'>
            <h1 className='banner-heading'>Welcome!</h1>
            <p className='banner-subtitle'>tripNest is a marketplace to sell your Travel packages. <br />
                we create a big opportunity to get and interact with your clients.
            </p>

            <button className='primary-btn'>
                Create package +
            </button>

            {/* <div className="row cols-md-4 mt-5 py-5">

            </div> */}
        </section>
    )
}

export default VendorHomeBanner
