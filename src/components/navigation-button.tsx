import { motion } from "framer-motion"
import { Compass } from "lucide-react"

const NavigationButton = ({ text }: { text: string }) => {
    return (
        <motion.button
            className="flex flex-row items-center justify-center px-3 py-2 mt-4 border border-white/20 bg-gray-800/30 rounded-3xl backdrop-blur-2xl hover:bg-gray-700/40 active:bg-gray-700/40 transition-colors duration-200 text-sm"
        >
            <Compass />
            <span className="ml-2">{text}</span>
        </motion.button>
    )
}

export default NavigationButton;