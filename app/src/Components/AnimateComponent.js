import React from "react";
import { motion } from "framer-motion";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const transition = {
  duration: 0.5,
  ease: "linear",
};
const AnimateComponent = ({ children }) => {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimateComponent;
