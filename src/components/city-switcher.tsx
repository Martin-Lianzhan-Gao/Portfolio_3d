import { memo} from 'react';
import { cn } from '@/utils/cn';
import { Dispatch, SetStateAction } from 'react';
import { zhengzhou, brisbane } from '@/data/cities';
import { motion } from 'framer-motion';

interface CitySwitcherProps {
    onSelectCity: ({ longitude, latitude }: { longitude: number, latitude: number }) => void;
    isCurrentLocation: boolean,
    setIsCurrentLocation: Dispatch<SetStateAction<boolean>>,
}

const CitySwitcher = ({ onSelectCity, isCurrentLocation, setIsCurrentLocation }: CitySwitcherProps) => {

    return (

        <motion.div
            className='mt-4 text-sm text-gray-400 flex flex-row 2xl:text-xl'
        >
            <motion.div
                onClick={() => {
                    setIsCurrentLocation(true);
                    onSelectCity({ longitude: brisbane.longitude, latitude: brisbane.latitude });
                }}
                className={cn(isCurrentLocation ? "text-gray-200 bg-gray-700/40 border border-white/20" : "cursor-pointer hover:text-gray-200 hover:bg-gray-700/40 active:bg-gray-700/40 active:text-gray-200 ", "px-4 py-2 rounded-2xl  backdrop-blur-2xl mr-1 transition-colors duration-200")}
            >
                Location
            </motion.div>
            <motion.div
                onClick={() => {
                    setIsCurrentLocation(false);
                    onSelectCity({ longitude: zhengzhou.longitude, latitude: zhengzhou.latitude });
                }}
                className={cn(!isCurrentLocation ? "text-gray-200 bg-gray-700/40 border border-white/20" : "cursor-pointer hover:text-gray-200 hover:bg-gray-700/40 active:bg-gray-700/40 active:text-gray-200", "px-4 py-2 rounded-2xl backdrop-blur-2xl ml-1 transition-colors duration-200")}
            >
                Hometown
            </motion.div>
        </motion.div>

    )
};

export default memo(CitySwitcher);