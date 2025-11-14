import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import movieimage1 from "./assets/showmovie0.avif";
import movieimage2 from "./assets/showmovie1.avif";
import movieimage3 from "./assets/showmovie2.avif";
import movieimage4 from "./assets/showmovie3.avif";
import movieimage5 from "./assets/showmovie4.avif";
import movieimage6 from "./assets/showmovie5.avif";
import movieimage7 from "./assets/showmovie6.avif";
import movieimage8 from "./assets/showmovie7.avif";
import movieimage9 from "./assets/showmovie8.avif";
import movieimage10 from "./assets/showmovie9.avif";
import movieimage11 from "./assets/showmovie10.avif";
import movieimage12 from "./assets/showmovie11.avif";
import postermovie1 from "./assets/hinanna.jpg";
import postermovie2 from "./assets/8vasanthalu.jpg";
import postermovie3 from "./assets/vijay.jpg";
import postermovie4 from "./assets/sitharaman.jpg";

function Movies() {
  const navigate = useNavigate();

  // ✅ Movie data array (easier to manage)
  const movies = [
    { title: "Kantara", image: movieimage1 },
    { title: "AanPaavamPollathathu", image: movieimage2 },
    { title: "Aaromaley", image: movieimage3 },
    { title: "The Girl Friend", image: movieimage4 },
    { title: "Bison", image: movieimage5 },
    { title: "Aaryan", image: movieimage6 },
    { title: "Badlands", image: movieimage7 },
    { title: "Dude", image: movieimage8 },
    { title: "Kaantha", image: movieimage9 },
    { title: "Vinnaithaandi Varuvaaya", image: movieimage10 },
    { title: "Jatadhara", image: movieimage11 },
    { title: "Kumki 2", image: movieimage12 },
  ];
   
    const carss = [
      {
        id: 1,
        img: postermovie1,
        
        details: "NEXA",
        notes: "Nexa showrooms focus on luxury experience and customer service.",
      },
      {
        id: 2,
        img: postermovie2,
       
  
        details: "Vitara",
        notes:
          "Grand Vitara is Maruti Suzuki’s premium SUV sold via Nexa showrooms",
      },
      {
        id: 3,
        img: postermovie3,
        
        details: "swift",
        notes: "Maruti Suzuki Victoris and e-Vitara (latest models)",
      },
      {
        id: 4,
        img: postermovie4,
        details: "Breeze",
        
  
        notes:
          "The first generation (2016) was diesel-powered; later models (from ~2020) were switched to petrol",
      },
    ];
  const handleBookNow = (movie) => {
    // ✅ Send movie details to seat booking page
    navigate("/theatremain", { state: { movie } });
  };

  return (
    <Fragment>
      <div className='movielist' style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {movies.map((movie, index) => (
          <div className="card" key={index} style={{ width: "18rem", margin: "5px" }}>
            <img src={movie.image} className="card-img-top" alt={movie.title} />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <button onClick={() => handleBookNow(movie)} className="btn btn-dark">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="Models">
              <h1 className="text-dark">Block Buster Movies</h1>
              <div className="grid">
                {carss.map((car) => (
                  <div key={car.id} className="card-wrapper">
                    <img src={car.img} alt={car.details} className="card-img" />
                    
                  </div>
                ))}
              </div>
            </div>
    </Fragment>
  );
}

export default Movies;
