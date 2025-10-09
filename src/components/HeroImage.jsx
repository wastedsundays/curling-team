
//eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroImage = ({ src, alt, className = '' }) => {
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start start", "end start"], 
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8], [1, 1, 0]);

  return (
    <motion.img
      ref={imageRef}
      src={src}
      alt={alt}
      className={className}
      style={{ opacity: heroOpacity }}
    />
  );
};

export default HeroImage;