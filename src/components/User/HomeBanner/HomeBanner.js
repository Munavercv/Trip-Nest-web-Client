import React from 'react';
import styles from './HomeBanner.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeBanner = () => {
    const { loggedIn, user } = useSelector((state) => state.auth);

    return (
        <section className={styles.banner}>
            <div className={styles.bannerOverlay}>
                {loggedIn && !user.isAppliedForVendor && <div className={styles.question}>Need to sell your packages?
                    <Link to='/vendor-application'> Get vendor account.</Link>
                </div>}
                <h1>Explore Best Travel Packages</h1>
                <p>No. 1 packages from best travel agencies around the world.</p>
                <p>
                    {!loggedIn && (
                        <Link to='/auth/signup'>
                            <button className="outline-btn">
                                Sign Up Now
                            </button>
                        </Link>
                    )}
                </p>
            </div>
        </section>
    );
};

export default HomeBanner;
