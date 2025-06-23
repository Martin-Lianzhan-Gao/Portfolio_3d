import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useAtomValue, useAtom } from "jotai";
import { isAlertCardVisibleAtom, isCurrentCityAtom } from "@/atoms/atoms-store";
import { AnimatePresence } from "framer-motion";

const AlertCard = () => { 
    
    const [isAlertCardVisible, setIsAlertCardVisible] = useAtom(isAlertCardVisibleAtom);
    const isCurrentCitySelected = useAtomValue(isCurrentCityAtom);

    return (
        <AnimatePresence>
            {isAlertCardVisible && <motion.div
                layout
                initial={{ opacity: 0, y: -50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 15,
                    mass: 1
                }}
                className="text-gray-200 font-roboto-mono flex flex-col w-[calc(100%-16px)] ml-4 mr-4 border border-white/20 rounded-2xl backdrop-blur-sm md:w-auto md:max-w-[calc(50%-16px)]">
                <div className="w-full flex justify-end ">
                    <button
                        className="mt-4 mr-4 p-1 rounded-2xl hover:bg-gray-400/40 active:bg-gray-400/40"
                        onClick={() => setIsAlertCardVisible(false)}
                    >
                        <X />
                    </button>
                </div>
                <div className="w-full p-4">
                    <p>{isCurrentCitySelected ? "Your already selected Brisbane, pick another city to switch map." : "You already selected Zhengzhou, pick another city to switch map."}</p>
                </div>
            
            </motion.div>}
        </AnimatePresence>
    )
}

export default AlertCard;