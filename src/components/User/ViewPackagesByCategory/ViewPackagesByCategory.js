import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PackageCard from "../../Common/PackageCard/PackageCard";
import axios from "axios";
import config from "../../../config/api";

const ViewPackagesByCategory = () => {
  const { category: urlCategory } = useParams();
  const navigate = useNavigate()
  const [category, setCategory] = useState(urlCategory || "All");
  const [dataStatus, setDataStatus] = useState("Loading...");
  const [packages, setPackages] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Beach", "Adventure", "Honeymoon", "Family", "Road Trip", "Luxury", "Cultural"];
  const limit = 16;

  const fetchPackages = async (selectedCategory) => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/user/get-packages-by-category`, {
        params: { category: selectedCategory, page, limit },
      });
      if (response.data.packages.length > 0) {
        setPackages(response.data.packages);
        setDataStatus("");
      } else {
        setPackages(null);
        setDataStatus("No packages available");
      }
    } catch (error) {
      setDataStatus("Packages not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, page]);

  return (
    <section className="container-fluid py-4 mx-0">
      <div>
        <ul className="nav nav-underline mb-md-3 d-flex align-items-center justify-content-center">
          {categories.map((cat, index) => (
            <li
              key={index}
              onClick={() => {
                setPage(1);
                navigate(`/packages-by-category/${cat}`);
                setCategory(cat)
              }}
              className={`nav-item nav-link cursor-pointer ${category === cat ? "active" : ""}`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

<hr className="border-2" />

      <div className="py-4">
        <h4 className="section-title text-center">{category} Packages</h4>

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
            disabled={!packages || packages.length < limit || loading}
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
  );
};

export default ViewPackagesByCategory;
