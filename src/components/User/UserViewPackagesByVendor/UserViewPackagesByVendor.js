import React, { useEffect, useState } from 'react'
import PackageCard from '../../Common/PackageCard/PackageCard';
import { useParams } from 'react-router';
import axios from 'axios';
import config from '../../../config/api';

const UserViewPackagesByVendor = () => {
    const { vendorId } = useParams()
    const limit = 16

    const [dataStatus, setDataStatus] = useState("Loading...");
    const [packages, setPackages] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/user/get-packages-by-vendor/${vendorId}`, {
                params: { page, limit },
            });
            if (response.data.packages.length > 0) {
                setPackages(response.data.packages);
                setDataStatus("");
            } else {
                setPackages(null);
                setDataStatus("No packages left");
            }
        } catch (error) {
            setDataStatus("Packages not found");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <section className="container-fluid py-4 mx-0">

            <div className="py-4">
                <div className="row">
                    {packages ? (
                        packages.map((packageDetails, index) => (
                            <div key={index} className="px-2 d-flex justify-content-center col-xl-3 col-lg-4 col-sm-6">
                                <PackageCard {...packageDetails} />
                            </div>
                        ))
                    ) : (
                        <h4 className="text-center text-danger">{dataStatus}</h4>
                    )}
                </div>

                <div className="text-center">
                    <button
                        className="primary-btn"
                        disabled={page === 1 || loading}
                        onClick={() => {
                            setLoading(true);
                            setPage(page - 1);
                        }}
                    >
                        <i className="fa-solid fa-angles-left"></i> Prev
                    </button>
                    <button
                        disabled={!packages || loading}
                        className="primary-btn"
                        onClick={() => {
                            setLoading(true);
                            setPage(page + 1);
                        }}
                    >
                        Next <i className="fa-solid fa-angles-right"></i>
                    </button>
                </div>
            </div>
        </section>

    )
}

export default UserViewPackagesByVendor
