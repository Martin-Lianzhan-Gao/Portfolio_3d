'use client';
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const initalViewState = {
    latitude: -27.470125,
    longitude: 153.021072,
    zoom: 11,
    bearing: 0,
    pitch: 50
}

const DynamicMapPin = () => {
    return (
        <motion.div
            animate={{ y: [0, -15, 0]}}
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

const WorldMap = () => { 
    
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
            attributionControl={false}
            padding={{left:300, top: 100}}
            initialViewState={initalViewState}
            style={{ width: '100%', height: '100%' }}
            {...mapControl}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        >
            <Marker
                longitude={153.021072}
                latitude={-27.470125}
                anchor="bottom"
            >   
                <DynamicMapPin />
            </Marker>
        </Map>
    )
}

export default WorldMap;