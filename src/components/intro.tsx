'use client';
import WorldMap from "./world-map";
import { MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { isTransitioningAtom, currentCityAtom, isInfoCardZoomedAtom } from "@/atoms/atoms-store";
import useIsMobile from "@/hooks/use-is-mobile";
import { introCardContainerVariants, introCardItemVariants } from "@/data/animations/joint-animations";
import { MoveRight, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/utils/cn";

const Intro = () => {

    const mapRef = useRef<MapRef>(null);

    const cardRef = useRef<HTMLDivElement>(null);

    const sectionRef = useRef<HTMLDivElement>(null);

    const [isTransitioning, setIsTransitioning] = useAtom(isTransitioningAtom);

    const [isInfoCardZoomed, setIsInfoCardZoomed] = useAtom(isInfoCardZoomedAtom);

    const currentCity = useAtomValue(currentCityAtom);

    const isMobile = useIsMobile();

    const [mapLoaded, setMapLoaded] = useState(false);

    // Change the city on the map when the user selects a different city
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

    // Resize the section based on the size of the card
    const resizeSection = () => {
        if (!sectionRef.current || !cardRef.current) return;

        const sectionHeight = sectionRef.current.offsetHeight;
        const cardHeight = cardRef.current.offsetHeight;

        if (cardHeight > sectionHeight) {
            sectionRef.current.style.height = `${cardHeight + 500}px`;
        } else {
            sectionRef.current.style.height = `${sectionHeight}px`;
        }
    }

    // Monitor the size of the screen and resize the section when necessary
    useEffect(() => {

        // resize the section when the size of scene changes
        resizeSection();

        // change the map padding based on the screen type
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;

        if (isMobile) {
            setIsInfoCardZoomed(false);
            const paddingBottom = screenHeight * 0.5;
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
            setIsInfoCardZoomed(true);
            const paddingLeft = screenWidth * 0.5;
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

    return (
        <div
            className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[200dvh] text-black flex flex-col"
            ref={sectionRef}
        >
            <div className="w-full h-full">
                <WorldMap ref={mapRef} setMapLoaded={setMapLoaded} />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-auto flex flex-col justify-end items-center z-2 md:w-1/2 md:justify-center">
                <AnimatePresence>
                    {!isTransitioning && (<motion.div
                        className="shadow-sm backdrop-blur-xl border bg-black-800/30 border-white/20 rounded-3xl p-4 ml-4 mr-4 h-auto w-auto mb-5 md:ml-10 md:mr-10 md:mb-0 lg:max-w-[528px] "
                        variants={introCardContainerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        ref={cardRef}
                    >
                        <AnimatePresence>
                            <motion.div
                                key={0}
                                className={cn("w-full flex flex-row items-center justify-between font-roboto-mono text-xl", isInfoCardZoomed ? "mb-2": "mb-4")}
                                variants={introCardItemVariants}
                            >
                                <span className="flex flex-row justify-start items-center text-neutral-500">AVAILABLE FROM</span>
                                <span className="text-black font-bold">JUL&#39;15</span>
                                <button
                                    className="p-3 rounded-xl transition-colors duratoion-200 hover:bg-gray-300 active:bg-gray-300"
                                    onClick={() => setIsInfoCardZoomed(!isInfoCardZoomed)}
                                >
                                    {isInfoCardZoomed
                                        ? <Maximize2 size={20} color="gray" />
                                        : <Minimize2 size={20} color="gray" />
                                    }
                                </button>
                            </motion.div>
                            <motion.h1
                                key={1}
                                className="font-bold text-3xl md:text-4xl 2xl:text-5xl"
                                variants={introCardItemVariants}
                            >
                                <motion.span className="mr-2">LIANZHAN GAO</motion.span> &quot;Martin&quot;
                            </motion.h1>
                            <motion.h2
                                key={2}
                                className="font-medium font-roboto-mono mt-1 text-lg md:text-xl md:mt-2 2xl:text-2xl 2xl:mt-3"
                                variants={introCardItemVariants}
                            >
                                <motion.span
                                    key={3}
                                    variants={introCardItemVariants}
                                >
                                    - 1/1 Developer 🧑🏻‍💻
                                </motion.span><br />
                                <motion.span
                                    key={4}
                                    variants={introCardItemVariants}
                                >
                                    - 1/2 Designer 🥤
                                </motion.span>
                            </motion.h2>
                            {isInfoCardZoomed && <motion.p
                                key={5}
                                className="my-5 text-xl text-neutral-600 2xl:text-2xl"
                                variants={introCardItemVariants}
                            >
                                A motivated and results-driven Computer Science graduate with over a year of hands-on experience in full-stack development. And also a fast learner with a practical and exploratory spirit 🚀.
                            </motion.p>}
                            <motion.div
                                className="w-full flex flex-row justify-center"
                                key={6}
                                variants={introCardItemVariants}
                            >
                                <button className={cn("bg-black text-gray-200 py-2 px-4 rounded-3xl font-bold flex flex-row items-center text-md hover:bg-neutral-800 active:bg-neutral-800 transition-colors duration-200", isInfoCardZoomed ? "mt-4" : "mt-6")}>
                                    <span className="mr-2">
                                        About Me
                                    </span>
                                    <MoveRight size={16} strokeWidth={3} />
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>)}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Intro;