import { memo } from 'react';
import { cn } from '@/utils/cn';
import { Dispatch, SetStateAction } from 'react';
import { zhengzhou, brisbane } from '@/data/cities';
import { motion } from 'framer-motion';

interface CitySelectorProps {
    onSelectCity: ({ longitude, latitude }: { longitude: number, latitude: number }) => void;
    isCurrentLocation: boolean,
    setIsCurrentLocation: Dispatch<SetStateAction<boolean>>,
}

const CitySelector = ({ onSelectCity, isCurrentLocation, setIsCurrentLocation }: CitySelectorProps) => {

    return (

        <motion.div className='pt-4'>
            <motion.ul className="text-sm text-gray-400 md:text-xl ">
                <motion.li
                    onClick={() => {
                        setIsCurrentLocation(true);
                        onSelectCity({ longitude: brisbane.longitude, latitude: brisbane.latitude });
                    }}
                    className={cn(isCurrentLocation ? "text-gray-200" : "cursor-pointer hover:text-gray-200 transition-colors duration-300")}
                >
                    - I currently located in...
                </motion.li>
                <motion.li
                    onClick={() => {
                        setIsCurrentLocation(false);
                        onSelectCity({ longitude: zhengzhou.longitude, latitude: zhengzhou.latitude });
                    }}
                    className={cn(!isCurrentLocation ? "text-gray-200" : "cursor-pointer hover:text-gray-200 transition-colors duration-300")}
                >
                    - My home town is...
                </motion.li>
            </motion.ul>
        </motion.div>

    )
}

export default memo(CitySelector);