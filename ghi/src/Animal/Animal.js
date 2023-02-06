// Dependencies
import React from "react";

// CSS
import "../Styles/Animal.css";
import { motion } from "framer-motion";

function Animal({ className, imgurl }) {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.2 }}
        drag={true}
        dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
        className="animal_img"
      >
        <img className={className} src={imgurl} />
      </motion.div>
    </>
  );
}

export default Animal;
