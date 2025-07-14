import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Rocket({ className = "", style = {}, ...props }) {
  const navigate = useNavigate();
  const [launch, setLaunch] = useState(false);

  const handleClick = () => setLaunch(true);

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ display: "inline-block", ...style }}
      onClick={handleClick}
      {...props}
    >
      <motion.svg
        className={`w-8 h-8 cursor-pointer ${className}`}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        animate={launch ? { rotate: 720, scale: 2, opacity: 0 } : {}}
        transition={{ duration: 0.8 }}
        onAnimationComplete={() => {
          if (launch) navigate("/founder");
        }}
      >
        <path
          d="M32 4 L40 12 V36 L32 52 L24 36 V12 Z"
          fill="#e2e8f0"
          stroke="#718096"
          strokeWidth="2"
        />
        <path
          d="M24 36 L16 44 L24 40 L32 46 L40 40 L48 44 L40 36 Z"
          fill="#f97316"
        />
        <circle cx="32" cy="24" r="8" fill="white" />
        <circle cx="32" cy="24" r="6" fill="#22c55e" />
        <circle cx="30" cy="22" r="1.5" fill="black" />
        <circle cx="34" cy="22" r="1.5" fill="black" />
        <path d="M30 26 Q32 28 34 26" stroke="black" strokeWidth="1" fill="none" />
      </motion.svg>
    </motion.div>
  );
}
