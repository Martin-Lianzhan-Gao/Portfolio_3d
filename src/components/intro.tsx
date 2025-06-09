'use client';
import WorldMap from "./world-map";
import { Compass } from "lucide-react";
import CitySelector from "./city-selector";
import { MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const Intro = () => {

    const mapRef = useRef<MapRef>(null);

    const [isChangingCity, setIsChangingCity] = useState(false);

    const [isCurrentLocation, setIsCurrentLocation] = useState(true);

    const onChangeCity = ({ longitude, latitude }: { longitude: number, latitude: number }) => {
        mapRef.current?.flyTo({
            center: [longitude, latitude],
            duration: 3000,
            curve: 1.42
        });

        setIsChangingCity(true);

        setTimeout(() => {
            setIsChangingCity(false);
        }, 3500);
    }

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
        <div className="relative w-full h-screen font-roboto-mono text-gray-200 flex flex-col">
            <div className="w-full h-full">
                <WorldMap ref={mapRef} />
            </div>
            <div className="w-full flex flex-row justify-start absolute z-2 ">
                <AnimatePresence>
                    {!isChangingCity && <motion.div
                        className="backdrop-blur-sm border border-white/20 rounded-3xl w-auto p-4 mt-28 ml-4 mr-4 md:p-8 md:max-w-[768px] lg:ml-16 lg:mt-32 2xl:ml-40 2xl:mt-42"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <motion.h1
                            className="font-bold text-3xl md:text-7xl 2xl:text-8xl"
                        >
                            HI, I&apos;M LIANZHAN GAO (MARTIN)
                        </motion.h1>
                        <motion.h2
                            className="font-medium pt-4 text-xl md:text-2xl 2xl:text-3xl"
                        >
                            - 1/1 Developer<br />
                            - 1/2 Designer
                        </motion.h2>
                        <motion.p
                            className="pt-4 text-sm md:text-xl 2xl:text-2xl"
                        >
                            A motivated and results-driven Computer Science graduate with over a year of hands-on experience in full-stack development and cloud development. And also a fast learner with a practical and exploratory spirit.
                        </motion.p>
                        <CitySelector
                            onSelectCity={onChangeCity}
                            isCurrentLocation={isCurrentLocation}
                            setIsCurrentLocation={setIsCurrentLocation}
                        />
                        <motion.button
                            className="flex flex-row items-center justify-center px-3 py-2 mt-8 border border-white/20 bg-gray-800/30 rounded-3xl backdrop-blur-xl hover:bg-gray-700/40 active:bg-gray-700/40 transition-colors duration-200 text-sm md:text-xl 2xl:text-2xl"
                        >
                            <Compass />
                            <span className="ml-2">Explore More</span>
                        </motion.button>
                    </motion.div>}
                </AnimatePresence>
            </div>
            
        </div>
    )
}

export default Intro;