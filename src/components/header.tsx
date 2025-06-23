'use client'
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef, Dispatch, SetStateAction} from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "@/hooks/use-is-mobile";
import useScrollDirection from "@/hooks/use-scroll-direction";
import { cn } from "@/utils/cn";

const AnimateListItem = ({ text, isSelected, textSetter, index }: { text: string, index: number, isSelected: boolean, textSetter: Dispatch<SetStateAction<string>> }) => {

    return (
        <motion.div
            key={index}
            className={cn("text-gray-300 hover:text-gray-100 py-6 md:py-0", isSelected ? "text-gray-100" : "text-gray-300", "cursor-pointer ")}
            onClick={() => {
                textSetter(text);
            }}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
            }}
        >
            {text}
            <motion.div className="w-full flex justify-center h-[2px]">
                {isSelected && (<motion.div
                    className="w-[12px] h-[2px] rounded-2xl bg-gray-200"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '12px', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                        delay: 0.03 + 0.01,
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                />)}
            </motion.div>
        </motion.div>
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
    const itemTexts = ['Home', 'Experience', 'Project', 'Skills', 'Contact'];
    // determine control state of the header based on the screen type
    const showHeader = isMobile ? isOpen : isScrollUp;

    const [selectedText, setSelectedText] = useState(itemTexts[0]);

    const menuRef = useRef<HTMLDivElement>(null);

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
        <div className={cn("fixed w-full z-50 font-roboto-mono flex flex-col items-center", isOpen && isMobile ? "h-screen" : "h-auto")}>
            <div className="py-2 backdrop-blur-sm w-full md:hidden">
                <button
                    className=" ml-4 flex flex-row px-3 py-2 text-gray-100 md:hidden"
                    onClick={() => {
                        if (isOpen === false) {
                            setIsOpen(true);
                        } else {
                            setIsOpen(false);
                        }
                    }}>
                    {isOpen ? <X /> : <Menu />}
                    Menu
                </button>
            </div>
            { 
                isMobile && isOpen && (
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0 z-20"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )
            }

            <AnimatePresence>
                {showHeader && (
                    <motion.div
                        ref={menuRef}
                        className="z-60 border border-white/20 rounded-2xl backdrop-blur-sm w-[calc(100%-16px)] h-[50dvh] my-4 ml-4 mr-4 flex flex-col justify-center items-center md:flex-row md:justify-around md:h-auto md:w-full md:mr-0 md:ml-0 md:my-0 md:py-4 md:rounded-none md:border-0 md:backdrop-blur-sm"
                        layout='position'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        {Array.from({ length: 5 }).map((_, index) => (
                            <AnimateListItem
                                key={index}
                                index={index}
                                text={itemTexts[index]}
                                isSelected={selectedText === itemTexts[index]}
                                textSetter={setSelectedText}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Header;
