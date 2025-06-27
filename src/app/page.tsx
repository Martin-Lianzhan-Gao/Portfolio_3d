'use client'
import Intro from "@/components/intro";
import NavigationButton from "@/components/navigation-button";
import { useAtomValue } from "jotai";
import { isTransitioningAtom } from "@/atoms/atoms-store";
import { motion, AnimatePresence } from "framer-motion";
import AlertCard from "@/components/alert-card";

export default function Home() {

    const isTransitioning = useAtomValue(isTransitioningAtom);

    return (
        <div className="overflow-x-hidden font-roboto-mono">
            <Intro />
            <div className="flex w-full h-screen flex-col items-center justify-center p-24">
                First Page
            </div>
            <div className="flex h-screen flex-col items-center justify-center p-24">
                Second Page
            </div>
            {/* <AnimatePresence>
                {!isTransitioning && (
                    <motion.div
                        className="flex w-full flex-row justify-center fixed z-12 bottom-8 "
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 110,
                            damping: 16,
                            mass: 1.5
                        }}
                    >
                        <NavigationButton text="Explore" isLastPart={false} />
                    </motion.div>
                )}
            </AnimatePresence> */}
            <motion.div
                className="fixed z-12 top-18 w-full flex justify-center h-auto md:justify-end"
            >
                <AlertCard />
            </motion.div>)
        </div>
    );
}
