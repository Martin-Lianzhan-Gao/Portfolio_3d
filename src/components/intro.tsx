'use client';
import WorldMap from "./world-map";
import { MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CitySwitcher from "./city-switcher";
import { useAtom, useAtomValue } from "jotai";
import { isTransitioningAtom, currentCityAtom } from "@/atoms/atoms-store";
import useIsMobile from "@/hooks/use-is-mobile";

const Intro = () => {

    const mapRef = useRef<MapRef>(null);

    const cardRef = useRef<HTMLDivElement>(null);

    const sectionRef = useRef<HTMLDivElement>(null);

    const [isTransitioning, setIsTransitioning] = useAtom(isTransitioningAtom);

    const [isCurrentLocation, setIsCurrentLocation] = useState(true);

    const currentCity = useAtomValue(currentCityAtom);

    const isMobile = useIsMobile();

    const [mapLoaded, setMapLoaded] = useState(false);

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

    const resizeSection = () => {
        if (!sectionRef.current || !cardRef.current) return;

        const sectionHeight = sectionRef.current.offsetHeight;
        const cardHeight = cardRef.current.offsetHeight;

        if (cardHeight > sectionHeight) {
            sectionRef.current.style.height = `${cardHeight + 200}px`;
        }
    }

    useEffect(() => {

        // resize the section when the size of scene changes
        resizeSection();

        // change the map padding based on the screen type
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;

        if (isMobile) {
            const paddingBottom = screenHeight * 0.25 + 20;
            mapRef.current?.flyTo({
                center: [currentCity.longitude, currentCity.latitude],
                duration: 3000,
                curve: 1.42,
                padding: {
                    bottom: paddingBottom,
                    left: 0,
                    right: 0,
                    top: 0
                }
            });
        } else {
            const paddingLeft = screenWidth * 0.25;
            mapRef.current?.flyTo({
                center: [currentCity.longitude, currentCity.latitude],
                duration: 3000,
                curve: 1.42,
                padding: {
                    left: paddingLeft,
                    bottom: 0,
                    right: 0,
                    top: 0
                }
            });
        }

    }, [isMobile, currentCity, mapLoaded]);

    const itemVariants: Variants = {
        initial: { x: -100, opacity: 0 },
        animate: { 
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            }
        },
        exit: {
            x: -100,
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 20,
                mass: 0.6,
            }
         }
    }

    // define the animations for the container
    const containerVariants: Variants = {
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
                stiffness: 70,
                damping: 20,
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
                stiffness: 70,
                damping: 20,
                mass: 0.6,
                staggerChildren: 0.15, // stagger children animations by 0.15 seconds
            },
        }
    }

    return (
        <div
            className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[200dvh] font-roboto-mono text-gray-200 flex flex-col"
            ref={sectionRef}
        >
            <div className="w-full h-full">
                <WorldMap ref={mapRef} setMapLoaded={setMapLoaded} />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-auto flex flex-col justify-end items-center z-2 md:w-1/2 md:justify-center">
                <AnimatePresence>
                    {!isTransitioning && (<motion.div
                        className="backdrop-blur-sm border bg-black-800/30 border-white/20 rounded-3xl p-4 ml-4 mr-4  h-auto w-auto mb-30 md:ml-10 md:mr-10 md:max-w-[728px] md:mb-0"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        ref={cardRef}
                    >
                        <AnimatePresence>
                            <motion.h1
                                key={1}
                                className="font-bold text-3xl md:text-4xl 2xl:text-5xl"
                                variants={itemVariants}
                            >
                                HI, I&apos;M LIANZHAN GAO (MARTIN)
                            </motion.h1>
                            <motion.h2
                                key={2}
                                className="font-medium mt-1 text-xl md:text-2xl md:mt-2 2xl:text-3xl 2xl:mt-3"
                                variants={itemVariants}
                            >
                                <motion.span
                                    key={3}
                                    variants={itemVariants}
                                >
                                    - 1/1 Developer 🧑🏻‍💻
                                </motion.span><br />
                                <motion.span
                                    key={4}
                                    variants={itemVariants}
                                >
                                    - 1/2 Designer 🎨
                                </motion.span>
                            </motion.h2>
                            <motion.p
                                key={5}
                                className="mt-2 text-sm md:text-xl md:mt-4 2xl:text-2xl 2xl:mt-5"
                                variants={itemVariants}
                            >
                                A motivated and results-driven Computer Science graduate with over a year of hands-on experience in full-stack development and cloud development. And also a fast learner with a practical and exploratory spirit 🚀.
                            </motion.p>
                            <motion.div
                                key={6}
                                variants={itemVariants}
                            >
                                <CitySwitcher
                                    onSelectCity={onChangeCity}
                                    isCurrentLocation={isCurrentLocation}
                                    setIsCurrentLocation={setIsCurrentLocation}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>)}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Intro;