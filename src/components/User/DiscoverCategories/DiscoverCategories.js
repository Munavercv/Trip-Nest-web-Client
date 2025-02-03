import React from 'react'
import styles from './DiscoverCategories.module.css'
import { Link } from 'react-router-dom'

const DiscoverCategories = () => {
  const tiles = [
    {
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Beach",
    },
    {
      image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Adventure",
    },
    {
      image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Luxury",
    },
    {
      image: "https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwdHJpcHxlbnwwfHwwfHx8MA%3D%3D",
      text: "Family",
    },
    {
      image: "https://images.unsplash.com/photo-1519307212971-dd9561667ffb?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Honeymoon",
    },
  ];

  return (
    <section className='container-fluid'>

      <div className={`${styles.head} d-flex justify-content-between`}>
        <h4 className="section-title ms-md-5">Discover Themes</h4>

      </div>

      <div className="row row-cols-md-5 row-cols-sm-3 row-cols-2 g-2 g-md-4 my-2 px-lg-3 justify-content-center">
        {tiles.map((tile, index) => (
          <div className="col" key={index}>
            <Link to={`/packages-by-category/${tile.text}`}>
              <div className={`${styles.tileCard} position-relative overflow-hidden rounded-4 shadow-lg`}>
                <img src={tile.image} alt={tile.text} className="img-fluid" />
                <div className={`${styles.tileOverlay} d-flex align-items-end p-3`}>
                  <p className="text-white fw-bold mb-0">{tile.text}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-end mt-4">
        <Link
          to='/packages-by-category/All'
          className="text-secondary fw-semibold me-md-5 text-center fs-5"
        >Explore more <i className="fa-solid fa-chevron-right"></i>
        </Link>
      </div>

    </section>
  )
}

export default DiscoverCategories
