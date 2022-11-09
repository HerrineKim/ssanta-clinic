import { motion } from 'framer-motion';
import React, { useState } from 'react';
export function Test1() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(true)}
    ></motion.div>
  );
}
