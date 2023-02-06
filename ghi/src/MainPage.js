// Dependencies
import React from "react";
import Animal from "./Animal/Animal.js";

// CSS
import { motion } from "framer-motion";
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
  }

  return (
    <>
      <div className="landingpage section_padding" id="home">
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
          className="maintext_name"
        >
          <div className="uptext">
            <h5>
              Chewier <span>Eats</span>
            </h5>
          </div>
          <div className="middletext">
            <h2>Chewier Section</h2>
          </div>
          <div className="lowtext">
            <h6>Your favorite pet store online</h6>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default MainPage;
