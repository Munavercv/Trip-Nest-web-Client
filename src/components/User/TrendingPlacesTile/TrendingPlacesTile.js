import React, { useEffect, useState } from 'react';
import styles from './TrendingPlacesTile.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config/api';

const TrendingPlacesTile = () => {
    const [trendingPlaces, setTrendingPlaces] = useState(null);
    const [images, setImages] = useState({});

    const fetchTrendingPackages = async () => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/user/get-trending-places`, {
                params: { limit: 5 }
            });
            if (!data || data.data.length === 0) return;

            setTrendingPlaces(data.data);
            fetchImagesForPlaces(data.data);
        } catch (error) {
            setTrendingPlaces(null);
        }
    };

    const fetchImagesForPlaces = async (places) => {
        const imageRequests = places.map(async (place) => {
            try {
                const response = await axios.get(`https://api.pexels.com/v1/search`, {
                    headers: { Authorization: config.PEXELS_API_KEY },
                    params: { query: place.destination, per_page: 10 }
                });

                const imageUrl = response.data.photos[Math.floor(Math.random() * 10)]?.src.landscape || place.imageUrl;
                return { destination: place.destination, imageUrl };
            } catch (error) {
                console.error(`Error fetching image for ${place.destination}:`, error);
                return { destination: place.destination, imageUrl: place.imageUrl };
            }
        });

        const imageResults = await Promise.all(imageRequests);
        const imagesMap = imageResults.reduce((acc, img) => {
            acc[img.destination] = img.imageUrl;
            return acc;
        }, {});

        setImages(imagesMap);
    };

    useEffect(() => {
        fetchTrendingPackages();
}, []);

    if (!trendingPlaces) return null;

    return (
        <section id='trendingPlaces' style={{ backgroundColor: 'var(--section-grey)' }} className="container-fluid py-2">
            <h4 className="section-title text-center mb-2 mt-3">Trending Places</h4>

            <div className="row g-3 mt-2">
                {trendingPlaces.map((place, index) => (
                    <div className={`col-${index < 3 ? 'md-4' : 'sm-6'} col-12`} key={index}>
                        <Link to={`/find-packages?destination=${place.destination}`}>
                            <div className={`${styles.tileCard} position-relative overflow-hidden rounded-4 shadow-lg`}>
                                <img src={images[place.destination] || place.imageUrl} alt={place.destination} className="img-fluid" />
                                <div className={`${styles.tileOverlay} d-flex justify-content-center p-3`}>
                                    <p className="text-white fw-bold mb-0 fs-2 shadow-sm">{place.destination}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrendingPlacesTile;
