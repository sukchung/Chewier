import React from "react";
import { motion } from "framer-motion";

import "../Styles/Animal.css";

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
