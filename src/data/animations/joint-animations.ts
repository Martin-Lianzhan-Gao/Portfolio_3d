import { Variants } from "framer-motion";

// define the animations for each item in the intro card
export const introCardItemVariants: Variants = {
    initial: { x: -100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        }
    },
    exit: {
        x: -100,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 20,
        }
    }
}

// define the animations for the container of the intro card
export const introCardContainerVariants: Variants = {
    // initial state
    initial: {
        x: -100,
        opacity: 0,
    },
    // enter animation
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 90,
            damping: 15,
            mass: 0.6,
            staggerChildren: 0.15, // stagger children animations by 0.15 seconds
        },
    },
    // exit animation
    exit: {
        x: -100,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 90,
            damping: 15,
            mass: 0.6,
            staggerChildren: 0.1, // stagger children animations by 0.1 seconds
        },
    }
}

