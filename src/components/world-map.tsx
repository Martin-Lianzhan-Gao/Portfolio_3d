'use client';
import { Map, Marker, MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Dispatch, forwardRef, memo, SetStateAction } from "react";
import { brisbane, zhengzhou } from "@/data/cities";

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
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            
            
        >
        </Map>


    )
})

WorldMap.displayName = "WorldMap";

export default memo(WorldMap);