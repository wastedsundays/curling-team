const getResponsiveValue = (mobile, desktop) => {
  return window.innerWidth < 768 ? mobile : desktop;
};

export const fadeInUp = {
  hidden: { opacity: 0, y: getResponsiveValue(20, 30) },
  visible: { opacity: 1, y: 0 }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: getResponsiveValue(-20, -30) },
  visible: { opacity: 1, y: 0 }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: getResponsiveValue(-20, -30) },
  visible: { opacity: 1, x: 0 }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: getResponsiveValue(20, 30) },
  visible: { opacity: 1, x: 0 }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInScale = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: getResponsiveValue(0.1, 0.2)
    }
  }
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: getResponsiveValue(0.05, 0.1)
    }
  }
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: getResponsiveValue(0.3, 0.4)
    }
  }
};

// Common transition presets
export const transitions = {
  smooth: { duration: getResponsiveValue(0.4, 0.6), ease: "easeOut" },
  fast: { duration: getResponsiveValue(0.2, 0.4), ease: "easeOut" },
  slow: { duration: getResponsiveValue(0.8, 1), ease: "easeOut" },
  bouncy: { duration: getResponsiveValue(0.6, 0.8), ease: "easeOut", type: "spring", stiffness: 100 }
};

export const mobileOnly = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  
  slideUpMinimal: {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  }
};

export const conditionalAnimation = (mobileVariant, desktopVariant) => {
  return window.innerWidth < 768 ? mobileVariant : desktopVariant;
};


// Common viewport settings
export const viewportSettings = {
  once: true,
  amount: getResponsiveValue(0.8, 0.7)
};

export const viewportSettingsHalf = {
  once: true,
  amount: getResponsiveValue(0.6, 0.5)
};

export const viewportSettingsThird = {
  once: true,
  amount: getResponsiveValue(0.3, 0.2)
};