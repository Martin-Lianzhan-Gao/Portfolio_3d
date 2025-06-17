'use client';
import { Map, Marker, MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Dispatch, forwardRef, memo, SetStateAction } from "react";
import { brisbane, zhengzhou } from "@/data/cities";

const DynamicMapPin = () => {
    return (
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.1
            }}
        >
            <MapPin className="mb-4" fill="#DB3739" size={24} />
        </motion.div>
    )
}

const WorldMap = forwardRef<MapRef, { setMapLoaded: Dispatch<SetStateAction<boolean>> }>(({ setMapLoaded }, ref) => {

    const viewState = {
        latitude: brisbane.latitude,
        longitude: brisbane.longitude,
        zoom: 12,
        bearing: 0,
        pitch: 60
    }

    const mapControl = {
        scrollZoom: false, // disable zooming map with mouse wheel
        boxZoom: false, // disable zooming map with box selection
        dragRotate: false, // disable rotating map with mouse drag
        dragPan: false, // enable dragging map with mouse
        keyboard: true, // enable keyboard navigation
        doubleClickZoom: false, // disable zooming map with double click
        touchZoomRotate: false, // enable zooming and rotating map with touch gestures
        touchPitch: false, // disable tilting map with touch gestures
        minZoom: 5,
        maxZoom: 15,
        minPitch: 0,
        maxPitch: 85
    }

    return (

        <Map
            onLoad={() => {
                setMapLoaded(true);
            }}
            ref={ref}
            attributionControl={false}
            style={{ width: '100%', height: '100%' }}
            initialViewState={viewState}
            {...mapControl}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            
        >
            <Marker
                longitude={brisbane.longitude}
                latitude={brisbane.latitude}
                anchor="bottom"
            >
                <DynamicMapPin />
            </Marker>
            <Marker
                longitude={zhengzhou.longitude}
                latitude={zhengzhou.latitude}
                anchor="bottom"
            >
                <DynamicMapPin />
            </Marker>
        </Map>


    )
})

WorldMap.displayName = "WorldMap";

export default memo(WorldMap);