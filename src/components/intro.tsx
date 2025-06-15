'use client';
import WorldMap from "./world-map";
import { MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CitySwitcher from "./city-switcher";
import { useAtom } from "jotai";
import { isTransitioningAtom } from "@/atoms/atoms-store";

const Intro = () => {

    const mapRef = useRef<MapRef>(null);

    const cardRef = useRef<HTMLDivElement>(null);

    const sectionRef = useRef<HTMLDivElement>(null);

    const [isTransitioning, setIsTransitioning] = useAtom(isTransitioningAtom);

    const [isCurrentLocation, setIsCurrentLocation] = useState(true);

    const onChangeCity = ({ longitude, latitude }: { longitude: number, latitude: number }) => {
        mapRef.current?.flyTo({
            center: [longitude, latitude],
            duration: 3000,
            curve: 1.42
        });

        setIsTransitioning(true);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 3500);
    }

    useEffect(() => { 
        if (!sectionRef.current || !cardRef.current) return;

        const sectionHeight = sectionRef.current.offsetHeight;
        const cardHeight = cardRef.current.offsetHeight;

        if (cardHeight > sectionHeight) {
            sectionRef.current.style.height = `${cardHeight + 200}px`;
        }
    }, [])

    // define the animations for the container
    const containerVariants: Variants = {
        // exit animation
        exit: {
            x: -100,
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        },
        // enter animation
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeInOut",
            },
        },
        // initial state
        initial: {
            x: -100,
            opacity: 0,
        }
    }

    return (
        <div
            className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[200dvh] font-roboto-mono text-gray-200 flex flex-col"
            ref={sectionRef}
        >
            <div className="w-full h-full">
                <WorldMap ref={mapRef} />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-auto flex flex-col justify-end items-center border border-white/20 z-2 md:w-1/2 md:justify-center">
                <AnimatePresence>
                    {!isTransitioning && <motion.div
                        className="backdrop-blur-xl border bg-black-800/30 border-white/20 rounded-3xl p-4 ml-4 mr-4  h-auto w-auto mb-30 md:ml-10 md:mr-10 md:max-w-[728px] md:mb-0"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        ref={cardRef}
                    >
                        <motion.h1
                            className="font-bold text-3xl md:text-4xl 2xl:text-5xl"
                        >
                            HI, I&apos;M LIANZHAN GAO (MARTIN)
                        </motion.h1>
                        <motion.h2
                            className="font-medium mt-1 text-xl md:text-2xl 2xl:text-3xl"
                        >
                            - 1/1 Developer<br />
                            - 1/2 Designer
                        </motion.h2>
                        <motion.p
                            className="mt-2 text-sm md:text-xl 2xl:text-2xl"
                        >
                            A motivated and results-driven Computer Science graduate with over a year of hands-on experience in full-stack development and cloud development. And also a fast learner with a practical and exploratory spirit.
                        </motion.p>
                        <CitySwitcher 
                            onSelectCity={onChangeCity}
                            isCurrentLocation={isCurrentLocation}
                            setIsCurrentLocation={setIsCurrentLocation} 
                        />
                    </motion.div>}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Intro;