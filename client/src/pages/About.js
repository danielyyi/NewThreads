import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Headerbar from "../components/Headerbar";
import "./About.css";
function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Headerbar />
      <div id="about-section">
        <h1>About Us</h1>
        <div>
          NewThreads strive to connect you with small, unique clothing brands.
          Our goal is to help startup brands get noticed while making it easy
          for you to find stylish, affordable clothing you can trust.
        </div>

        <div>
          <h2>Empowering Small Brands</h2>
          When you shop with NewThreads, you're not just getting great clothes -
          you're also supporting small businesses. We're dedicated to helping
          these brands grow and succeed, and your support makes a real
          difference.
        </div>

        <div>
          <h2>Enhance Your Wardrobe</h2>
          With NewThreads, you can explore unique and fresh styles that will
          elevate your wardrobe. We bring you a diverse range of designs from
          emerging brands, ensuring that your fashion choices are always
          on-trend and distinctive.
        </div>

        <div>
          <h2>Give Feedback</h2>
          Noticed a bug? Want to suggest a new feature? NewThreads is always
          evolving to help users and brands alike, so any feedback on the site
          would be appreciated. Please fill out this Google Form to communicate
          to our devs.
          <div id="form">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdEgNQ0aKmTeFVDmPHXEMhAZJeQgOLeDEMZSERgwj32WeXsNw/viewform?embedded=true"
            width="640"
            height="629"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
