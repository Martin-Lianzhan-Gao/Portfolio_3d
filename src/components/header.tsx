'use client'
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useScrollDirection from "@/hooks/useScrollDirection";

const AnimateListItem = ({ text, index }: { text: string, index: number }) => {
    return (
        <motion.li
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
                delay: index * 0.03,
                duration: 0.3,
                ease: "easeInOut",
            }}
            className="py-2 md:py-0"
        >
            {text}
        </motion.li>
    )
}

const Header = () => {
    // get screen type
    const isMobile = useIsMobile();
    // get vertical scroll position
    const scrollDirection = useScrollDirection();
    // control the menu / header open state in mobile devices
    const [isOpen, setIsOpen] = useState(false);
    // control the header visibility in desktop devices
    const [isScrollUp, setIsScrollUp] = useState(true);
    // state represents whether scolling
    const [isScrolling, setIsScrolling] = useState(false);
    // header / menu items
    const itemTexts = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];
    // determine control state of the header based on the screen type
    const showHeader = isMobile ? isOpen : isScrollUp;

    // useEffect to handle the scroll direction and update the header visibility
    useEffect(() => {

        if (scrollDirection === null) {
            setIsScrolling(false);
        } else {
            setIsScrolling(true);
        }

        if (isScrolling) {
            if (scrollDirection === "up") {
                setIsScrollUp(true);
            }
            if (scrollDirection === "down") {
                setIsScrollUp(false);
            }
        }

    }, [scrollDirection, isScrolling]);

    return (
        <div className="fixed z-10 text-gray-300 w-full">
            <div className="backdrop-blur-xl py-2 md:hidden">
                <button className="ml-4 flex flex-row px-3 py-2 rounded-3xl md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                    Menu
                </button>
            </div>

            <AnimatePresence>
                {showHeader && (
                    <motion.div className="w-full backdrop-blur-xl flex flex-row justify-center"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            delay: 5 * 0.03,
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                        layout
                    >
                        <div className="w-full md:py-4 md:max-w-7xl md:min-w-3xl md:px-4">
                            <motion.ul
                                className="flex flex-col items-center md:flex md:flex-row md:justify-around"
                            >
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <AnimateListItem key={index} index={index} text={itemTexts[index]} />
                                ))}
                            </motion.ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Header;
