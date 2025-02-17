import React, { useEffect, useState } from 'react';
import styles from './HomeBanner.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../../config/api';
import axios from 'axios'
const HomeBanner = () => {
    const { loggedIn, user } = useSelector((state) => state.auth);

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get('https://api.pexels.com/v1/search?query=travel&per_page=10', {
                    headers: {
                        Authorization: config.PEXELS_API_KEY
                    }
                });

                const images = response.data.photos;
                if (images.length > 0) {
                    const randomImage = images[Math.floor(Math.random() * images.length)].src.landscape;
                    setImageUrl(randomImage);
                }
            } catch (error) {
                console.error('Error fetching image from Pexels:', error);
            }
        };

        fetchImage();
    }, []);

    return (
        <section
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '70vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                overflow: 'hidden'
            }}
            className={styles.banner}
        >
            <div className={styles.bannerOverlay}>
                {loggedIn && !user.isAppliedForVendor && <div className={styles.question}>Need to sell your packages?
                    <Link to='/vendor-application'> Get vendor account.</Link>
                </div>}
                <h1
                style={{textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)'}}
                >Explore Best Travel Packages</h1>
                <p
                style={{textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)'}}
                >Best packages from best travel agencies around India</p>
                <p>
                    {!loggedIn ? (
                        <Link to='/auth/signup'>
                            <button className="outline-btn">
                                Sign Up Now
                            </button>
                        </Link>)
                        :
                        (<a href='#trendingPlaces'>
                            <button className="outline-btn shadow">
                                Explore trending places
                            </button>
                        </a>
                    )}
                </p>
            </div>
        </section>
    );
};

export default HomeBanner;
