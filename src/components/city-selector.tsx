import { memo } from 'react';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { zhengzhou, brisbane, sydney } from '@/data/cities';

interface CitySelectorProps {
    onSelectCity: ({ longitude, latitude }: { longitude: number, latitude: number }) => void;
}

const CitySelector = ({ onSelectCity }: CitySelectorProps) => {

    const [isCurrentLocation, setIsCurrentLocation] = useState(true);

    return (
        <div className='pt-4 font-roboto-mono'>
            <ul className="text-xl text-gray-400">
                <li
                    onClick={() => {
                        setIsCurrentLocation(true);
                        onSelectCity({ longitude: brisbane.longitude, latitude: brisbane.latitude });
                    }}
                    className={cn(isCurrentLocation ? "text-gray-200" : "cursor-pointer hover:text-gray-200 transition-colors duration-300")}
                >
                    I currently located in...
                </li>
                <li
                    onClick={() => {
                        setIsCurrentLocation(false);
                        onSelectCity({longitude: zhengzhou.longitude, latitude: zhengzhou.latitude });
                    }}
                    className={cn(!isCurrentLocation ? "text-gray-200" : "cursor-pointer hover:text-gray-200 transition-colors duration-300")}
                >
                    My home town is...
                </li>
            </ul>
        </div>
    )
}

export default CitySelector;