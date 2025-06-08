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
        }, 3000);
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
            <AnimatePresence>
                {!isChangingCity && <motion.div
                    className="absolute backdrop-blur-sm z-2 border border-white/20 rounded-3xl w-full p-2 top-1/10 md:p-8 md:top-1/5 md:left-22 md:w-[768px]"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <motion.h1
                        className="text-7xl font-bold"
                    >
                        HI, I&apos;M LIANZHAN GAO (MARTIN)
                    </motion.h1>
                    <motion.h2
                        className="text-2xl font-medium pt-4"
                    >
                        - 1/1 Developer<br />
                        - 1/2 Designer
                    </motion.h2>
                    <motion.p
                        className="text-xl pt-4"
                    >
                        A motivated and results-driven Computer Science graduate with over a year of hands-on experience in full-stack development and cloud development. And also a fast learner with a practical and exploratory spirit.
                    </motion.p>
                    <CitySelector
                        onSelectCity={onChangeCity}
                        isCurrentLocation={isCurrentLocation}
                        setIsCurrentLocation={setIsCurrentLocation}
                    />
                    <motion.button
                        className="flex flex-row items-center justify-center px-3 py-2 mt-8 border border-white/20 bg-gray-800/30 rounded-3xl backdrop-blur-xl hover:bg-gray-700/40 transition-colors duration-200"
                    >
                        <Compass />
                        <span className="ml-2">Explore More</span>
                    </motion.button>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default Intro;