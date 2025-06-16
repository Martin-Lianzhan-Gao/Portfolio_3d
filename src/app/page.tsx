'use client'
import Intro from "@/components/intro";
import NavigationButton from "@/components/navigation-button";
import { useAtomValue } from "jotai";
import { isTransitioningAtom } from "@/atoms/atoms-store";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const isTransitioning = useAtomValue(isTransitioningAtom);

    return (
        <div className="overflow-x-hidden">
            <Intro />
            <div className="flex w-full h-screen flex-col items-center justify-center p-24">
                First Page
            </div>
            <div className="flex h-screen flex-col items-center justify-center p-24">
                Second Page
            </div>
            <AnimatePresence>
                {!isTransitioning && (
                    <motion.div
                        className="flex w-full flex-row justify-center fixed z-12 bottom-8 text-black"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <NavigationButton text="Explore" isLastPart={false} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
