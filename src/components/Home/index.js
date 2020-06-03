import React from "react";
import img1 from "../../images-local/carousel1.jpg";
import img2 from "../../images-local/massage.jpg";
import img3 from "../../images-local/nightlife.jpg";
import img4 from "../../images-local/hiking.jpg";
import img5 from "../../images-local/beach.jpg";

export default function HomePage() {
  return (
    <>
      <div className="header-container">
        <HeaderBanner />
        <img src={img1} className="header" alt="header" />
      </div>
      <About />
      <Images/>
    </>
  );
}

const HeaderBanner = () => (
  <div className="header-banner">
    <h4>WELCOME TO</h4>
    <h1>HOTEL RIXOS</h1>
    <h1>DUBROVNIK</h1>
    <h4>DREAM COLLECTION</h4>
  </div>
);

const About = () => (
  <div className="about">
    <div className="about-title">
      <h2>A Hotel of distinction, glamour, style and tradition </h2>
    </div>
    <p>
      Experience the true essence of luxury. Discover the iconic Hotel Rixos Dubrovnik.
    </p>
    <p>
      Beautifully designed rooms blended with the delicate combination of Art
      Deco heritage and contemporary touches. A long history of first-class
      service, spectacular facilities and simply amazing food at a price you can
      afford.{" "}
    </p>
    <p>
      Dating back to 1925, Hotel Rixos Dubrovnih is one of the most famous
      and gracious buildings in Dubrovnik.{" "}
    </p>
    <p>
      The Hotel, renowned for its highly personalized and impeccable service,
      has been the centre of Dubrovnik's social life since it opened, welcoming
      presidents, politicians, film stars and musicians among its many
      distinguished visitors.
    </p>
    <p>
     Hotel Rixos Dubrovnik offers supreme luxury for the spirit and all the
      senses in the heart of this historic city, close to all its major sights
      and delights. The hotel, with its long and distinguished history of
      world-class hospitality, re-opened in 2004 after a complete renovation
      designed to flawlessly merge the best of 21st century comforts with the
      alluring appeal of Art Noveau architecture.{" "}
    </p>
  </div>
);

const Images = () => (
  <div className="home-images-container">
    <img src={img2} alt="massage"></img>
    <img src={img3} alt="nightlife"></img>
    <img src={img4} alt="hiking"></img>
    <img src={img5} alt="beach"></img>
  </div>
);
