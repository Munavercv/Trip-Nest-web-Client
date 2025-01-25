import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PackageCard from '../../Common/PackageCard/PackageCard';

const PackageSearchResult = () => {
    const [searchParams] = useSearchParams()

    const [packages, setPackages] = useState(null)

    useEffect(() => {
        const fetchSearchResults = async () => {
            const query = searchParams.toString()
            try {
                const response = await axios.get('/api/user/search-packages', { params: { query } });
                setPackages(response.data.packages)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (searchParams.size !== 0)
            fetchSearchResults();

    }, [searchParams]);

    if (packages) {
        return (
            <section>
                <h4 className='section-title text-center'>{packages.length} packages found</h4>

                <div className="row">
                    {
                        packages.map((packageDetails, index) => (
                            <div key={index} className="px-2 d-flex justify-content-center col-xl-3 col-lg-4 col-sm-6 ">
                                <PackageCard
                                    {...packageDetails}
                                />
                            </div>))
                    }
                </div>
            </section>
        )
    }
}

export default PackageSearchResult
