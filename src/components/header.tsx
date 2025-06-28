'use client'
import { useState, useEffect, useRef, Dispatch, SetStateAction} from "react";
import { motion, AnimatePresence, SVGMotionProps } from "framer-motion";
import useIsMobile from "@/hooks/use-is-mobile";
import useScrollDirection from "@/hooks/use-scroll-direction";
import { cn } from "@/utils/cn";

const AnimateListItem = ({ text, isSelected, textSetter, index }: { text: string, index: number, isSelected: boolean, textSetter: Dispatch<SetStateAction<string>> }) => {

    return (
        <motion.div
            key={index}
            className={cn("text-gray-300 hover:text-neutral-800 py-6 md:py-0", isSelected ? "text-neutal-800" : "text-neutral-500", "cursor-pointer ")}
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
                    className="w-[12px] h-[2px] rounded-2xl bg-gray-800"
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

const Path = (props: SVGMotionProps<SVGPathElement>) => (
    <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        {...props}
    />
  )

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
        <div className={cn("font-roboto text-black font-medium fixed w-full z-50 flex flex-col items-center", isOpen && isMobile ? "h-screen" : "h-auto")}>
            <div className="py-2 w-full md:hidden">
                <button
                    className="shadow-sm ml-4 flex flex-row px-3 py-3 rounded-3xl backdrop-blur-xl md:hidden"
                    onClick={() => {
                        if (isOpen === false) {
                            setIsOpen(true);
                        } else {
                            setIsOpen(false);
                        }
                    }}>
                    <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        initial={false}
                        animate={isOpen ? 'open' : 'closed'}
                    >
                        <Path
                            variants={{
                                closed: { d: 'M 3 6 L 21 6' },
                                open: { d: 'M 4.5 4.5 L 19.5 19.5' },
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <Path
                            variants={{
                                closed: { d: 'M 3 12 L 21 12', opacity: 1 },
                                open: { opacity: 0 },
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <Path
                            variants={{
                                closed: { d: 'M 3 18 L 21 18' },
                                open: { d: 'M 4.5 19.5 L 19.5 4.5' },
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.svg>
                </button>
            </div>
            { 
                // layer
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
                        className="z-60 border shadow-sm rounded-3xl backdrop-blur-xl w-[calc(100%-32px)] h-[50dvh] my-4 ml-4 mr-4 flex flex-col justify-center items-center md:flex-row md:justify-around md:h-auto md:w-full md:mr-0 md:ml-0 md:my-0 md:py-4 md:rounded-none md:border-0 md:backdrop-blur-xl md:shadow-none"
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
