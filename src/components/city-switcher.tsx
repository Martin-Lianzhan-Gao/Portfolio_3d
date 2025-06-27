import { memo, useState} from 'react';
import { cn } from '@/utils/cn';
import { zhengzhou, brisbane } from '@/data/cities';
import { motion } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { currentCityAtom, isCurrentCityAtom, isCurrentCitySelectedAtom, isAlertCardVisibleAtom } from '@/atoms/atoms-store';

interface CitySwitcherProps {
    onSelectCity: ({ longitude, latitude }: { longitude: number, latitude: number }) => void;
}

const CitySwitcher = ({ onSelectCity}: CitySwitcherProps) => {

    const [currentCity, setCurrentCity] = useAtom(currentCityAtom);

    const [isCurrentCity, setIsCurrentCity] = useAtom(isCurrentCityAtom);

    const setIsCurrentCitySelected = useSetAtom(isCurrentCitySelectedAtom);
    const setIsAlertCardVisible = useSetAtom(isAlertCardVisibleAtom);

    return (

        <motion.div
            className='mt-4 text-sm flex flex-row md:mt-6 2xl:text-xl'
        >
            <motion.div
                onClick={() => {
                    if (isCurrentCity === true) {
                        setIsCurrentCitySelected(true);
                        setIsAlertCardVisible(true);
                    } else { 
                        setIsCurrentCitySelected(false);
                        setIsAlertCardVisible(false);
                        setIsCurrentCity(true);
                        setCurrentCity(brisbane);
                        onSelectCity({ longitude: currentCity.longitude, latitude: currentCity.latitude });
                    }
                }}
                className={cn(isCurrentCity ? "text-gray-200 bg-gray-700/40 border border-white/20" : "cursor-pointer hover:text-gray-200 hover:bg-gray-400/40 active:bg-gray-400/40 active:text-gray-200 ", "px-4 py-2 rounded-2xl backdrop-blur-2xl mr-1 transition-colors duration-200")}
            >
                Current {isCurrentCity && (<span>- Brisbane, AU 🇦🇺</span>)}
            </motion.div>
            <motion.div
                onClick={() => {
                    if (isCurrentCity === false) {
                        setIsCurrentCitySelected(true);
                        setIsAlertCardVisible(true);
                    } else {
                        setIsCurrentCitySelected(false);
                        setIsAlertCardVisible(false);
                        setIsCurrentCity(false);
                        setCurrentCity(zhengzhou);
                        onSelectCity({ longitude: currentCity.longitude, latitude: currentCity.latitude });
                    }
                }}
                className={cn(!isCurrentCity ? "text-gray-200 bg-gray-700/40 border border-white/20" : "cursor-pointer hover:text-gray-200 hover:bg-gray-400/40 active:bg-gray-400/40 active:text-gray-200", "px-4 py-2 rounded-2xl backdrop-blur-2xl ml-1 transition-colors duration-200")}
            >
                Hometown {!isCurrentCity&& (<span>- Zhengzhou, CN 🇨🇳</span>)}
            </motion.div>
        </motion.div>
    )
};

export default memo(CitySwitcher);