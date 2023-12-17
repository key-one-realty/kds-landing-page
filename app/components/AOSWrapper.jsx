// components/AosWrapper.js

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const AosWrapper = () => {
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768; // Adjust the screen size threshold as needed

      if (isSmallScreen) {
        AOS.init({
          // AOS options for small screens
          // You can customize the AOS initialization options here
        });
      } else {
        // Destroy AOS instance for larger screens
        AOS.init({
          disable: true,
        });
      }
    };

    // Initial check on component mount
    handleResize();

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // AosWrapper doesn't render any additional DOM elements
};

export default AosWrapper;
