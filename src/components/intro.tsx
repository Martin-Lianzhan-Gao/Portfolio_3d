'use client';
import WorldMap from "./world-map";
import { Compass } from "lucide-react";
import CitySelector from "./city-selector";
import { MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useCallback, useState } from "react";

const Intro = () => {

    const mapRef = useRef<MapRef>(null);

    const onChangeCity = ({ longitude, latitude }: { longitude: number, latitude: number }) => {
        mapRef.current?.flyTo({
            center: [longitude, latitude],
            duration: 3000,
            curve: 1.42
        });
    }

    return (
        <div className="relative w-full h-screen font-roboto-mono text-gray-200 flex flex-col">
            <div className="w-full h-full">
                <WorldMap ref={mapRef} />
            </div>
            <div className="absolute backdrop-blur-sm z-2 p-8 top-1/5 left-22 w-[768px] border border-white/20 rounded-3xl">
                <h1 className="text-7xl font-bold">
                    HI, I'M LIANZHAN GAO (MARTIN)
                </h1>
                <h2 className="text-2xl font-medium pt-4">
                    - 1/1 Developer<br />
                    - 1/2 Designer
                </h2>
                <p className="text-xl pt-4">
                    A motivated and results-driven Computer Science graduate with over a year of hands-on experience in full-stack development and cloud development. And also a fast learner with a practical and exploratory spirit.
                </p>
                <CitySelector onSelectCity={onChangeCity} />
                <button className="flex flex-row items-center justify-center px-3 py-2 mt-8 border border-white/20 bg-gray-800/30 rounded-3xl backdrop-blur-xl hover:bg-gray-700/40 transition-colors duration-200">
                    <Compass />
                    <span className="ml-2">Explore More</span>
                </button>
            </div>
        </div>

    )
}

export default Intro;