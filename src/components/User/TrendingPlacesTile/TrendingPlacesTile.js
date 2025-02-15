import React, { useEffect, useState } from 'react'
import styles from './TrendingPlacesTile.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config/api'

const TrendingPlacesTile = () => {
    const [trendingPlaces, setTrendingPlaces] = useState(null)

    const fetchTrendingPackages = async () => {
        try {
            const { data } = await axios.get(`${config.API_BASE_URL}/api/user/get-trending-places`, {
                params: { limit: 5 }
            })
            if (!data || data.data.length === 0) return

            setTrendingPlaces(data.data)
        } catch (error) {
            setTrendingPlaces(null)
        }
    }

    useEffect(() => {
        fetchTrendingPackages()
    }, [])

    if (!trendingPlaces) return null

    return (
        <section
            style={{ backgroundColor: 'var(--section-grey)' }}
            className="container-fluid py-2"
        >
            <h4 className="section-title text-center mb-2 mt-3">Trending Places</h4>

            <div
                className="row g-3 mt-2"
            >
                {trendingPlaces.slice(0, 3).map((place, index) => (
                    <div className="col-md-4 col-sm-6 col-12" key={index}>
                        <Link
                            to={`/find-packages?destination=${place.destination}`}
                        >
                            <div className={`${styles.tileCard} position-relative overflow-hidden rounded-4 shadow-lg`}>
                                <img src={place.imageUrl} alt={place.destination} className="img-fluid" />
                                <div className={`${styles.tileOverlay} d-flex justify-content-center p-3`}>
                                    <p className="text-white fw-bold mb-0 fs-2 shadow-sm">{place.destination}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

                {trendingPlaces.slice(3, 5).map((place, index) => (
                    <div className="col-sm-6 col-12" key={index}>
                        <Link
                            to={`/find-packages?destination=${place.destination}`}
                        >
                            <div className={`${styles.tileCard} position-relative overflow-hidden rounded-4 shadow-lg`}>
                                <img src={place.imageUrl} alt={place.destination} className="img-fluid" />
                                <div className={`${styles.tileOverlay} d-flex justify-content-center p-3`}>
                                    <p className="text-white fw-bold mb-0 fs-2 shadow-sm">{place.destination}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TrendingPlacesTile