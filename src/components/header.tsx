'use client'
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimateListItem = ({ text, index} : {text: string, index: number}) => { 
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
            { text }
        </motion.li>
    )
} 

const Header = () => { 
    
    const [isOpen, setIsOpen] = useState(false);

    const itemTexts = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];

    return (
        <div className="fixed w-full">
            <div>
                <button className="ml-4 my-2 flex flex-row px-3 py-2 rounded-3xl md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    { isOpen ? <X /> : <Menu /> }
                    Menu
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul className={cn("flex my-2 mx-4 flex-col items-center h-1/2", "md:flex md:flex-row md:justify-between md:my-4")}>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <AnimateListItem key={index} index={index} text={itemTexts[index]} />
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Header;

