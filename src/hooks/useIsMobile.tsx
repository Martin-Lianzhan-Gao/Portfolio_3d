import { use, useEffect, useState} from "react";

/**
 * Custom hook to determine if the screen size is mobile.
 * A custome hook semilar to the useMediaQuery hook.
 * @returns {boolean} - True if the screen size is mobile, false otherwise.
 */
const useIsMobile = (): boolean => {

    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {

        /**
         * Function to check if the screen size is mobile.
         * Sets the state of the isMobile variable based on the screen size.
         */
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        }

        checkScreen(); // Initial check

        window.addEventListener("resize", checkScreen); // Add event listener for resize with checkScreen function
        return () => { window.removeEventListener("resize", checkScreen) } // Cleanup event listener on unmount
    },[])

    return isMobile; // Return the isMobile state

}

export default useIsMobile;