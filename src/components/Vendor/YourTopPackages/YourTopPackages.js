import React from 'react'
import styles from './YourTopPackages.module.css'
import PackageCard from '../../Common/PackageCard/PackageCard'
import CustomSlider from '../../../Slider/CustomSlider';
import { sliderSettings } from '../../../Slider/settings/packageSliderSettings';

const YourTopPackages = () => {

    const packages = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcmlzfGVufDB8MXwwfHx8MA%3D%3D',
            price: 19999,
            title: 'A trip to paris',
            category: 'HoneyMoon',
            discription: 'A honeymoon trip to paris',
            destination: 'Paris',
            rating: {
                avgRating: 4.0
            }
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcmlzfGVufDB8MXwwfHx8MA%3D%3D',
            price: 19999,
            title: 'A trip to paris',
            category: 'HoneyMoon',
            discription: 'A honeymoon trip to paris',
            destination: 'Paris',
            rating: {
                avgRating: 4.0
            }
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcmlzfGVufDB8MXwwfHx8MA%3D%3D',
            price: 19999,
            title: 'A trip to paris',
            category: 'HoneyMoon',
            discription: 'A honeymoon trip to paris',
            destination: 'Paris',
            rating: {
                avgRating: 4.0
            }
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcmlzfGVufDB8MXwwfHx8MA%3D%3D',
            price: 19999,
            title: 'A trip to paris',
            category: 'HoneyMoon',
            discription: 'A honeymoon trip to paris',
            destination: 'Paris',
            rating: {
                avgRating: 4.0
            }
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1562060726-e47264af32bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsYXlzaWF8ZW58MHwxfDB8fHww',
            price: 19999,
            title: 'A road trip to Malaysia',
            category: 'Adventure',
            discription: 'An adventure road trip',
            destination: 'Malaysia',
            rating: {
                avgRating: 4.0
            }
        }
    ]

    return (
        <section className={`${styles.yourTopPackagesSec} container-fluid py-4`}>
            <h4 className='section-title text-center'>My Top Packages</h4>

            <CustomSlider settings={sliderSettings}>
                {packages.length > 0 &&
                    packages.map((packageDetails, index) => (
                        <div key={index} className="px-2 d-flex justify-content-center">
                            <PackageCard
                                {...packageDetails}
                            />
                        </div>
                    ))}
            </CustomSlider>
        </section>

    )
}

export default YourTopPackages
