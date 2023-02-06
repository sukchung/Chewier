import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Animal from "./Animal/Animal.js";

import "./Styles/MainPage.css";
import cat1 from "./Images/cat1.png";
import cat2 from "./Images/cat2.png";
import dog1 from "./Images/dog1.png";
import dog2 from "./Images/dog2.png";

function MainPage() {
  const fadeInUp = {
    initial: {
      x: 100,
      opacity: 0,
    },

    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className="mainpage section_padding" id="home">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="animal"
        >
          <Animal className="left" imgurl={dog1} />
          <Animal className="top" imgurl={cat1} />
          <Animal className="bottom" imgurl={dog2} />
          <Animal className="right" imgurl={cat2} />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="maintext"
        >
          <div className="uptext text-white">
            <h5>Chewier</h5>
          </div>
          <div className="lowtext pb-3 text-white">
            <h6>Your favorite online pet store that has</h6>
            <h6>all your shopping needs</h6>
          </div>
          <div className="container1 flex space-x-5 items-center flex-wrap">
            <button
              className="bg-violet-500 text-slate-100 px-4 py-1 rounded-lg"
              type="button"
            >
              <NavLink to="/products">Shop Now</NavLink>
            </button>
            <button
              className="bg-violet-500 text-slate-100 px-4 py-1 rounded-lg"
              type="button"
            >
              <NavLink to="/custom">Customize</NavLink>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default MainPage;
