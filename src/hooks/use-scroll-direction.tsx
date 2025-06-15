import { useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";


/**
 * Returns the direction of the scroll.
 * 
 * @returns `"up"` if the user is scrolling up, `"down"` if the user is scrolling down.
 */

const useScrollDirection = () => {
    const { scrollY } = useScroll();
    const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
    // store the last scroll position
    const lastY = useRef(0);

    useEffect(() => {
        return scrollY.on("change", (currentY) => {

            if (currentY > lastY.current) {
                setScrollDirection("down");
            } else {
                setScrollDirection("up");
            }
            lastY.current = currentY;
        });
    }, [scrollY]);

    return scrollDirection;
}

export default useScrollDirection;