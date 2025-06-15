import { ArrowUp, ArrowDown } from "lucide-react"

type NavigationButtonProps = {
    text: string;
    isLastPart?: boolean;
    setIsLastPart?: (value: boolean) => void;
 }

const NavigationButton = ({ text, isLastPart}: NavigationButtonProps) => {
    return (
        <button
            className="flex flex-row items-center justify-center px-4 py-2 mt-4 border border-white/20 bg-gray-800/30 rounded-3xl backdrop-blur-2xl hover:bg-gray-700/40 active:bg-gray-700/40 transition-colors duration-200 text-md font-roboto-mono"
        >
            {isLastPart ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            <span className="ml-2">{text}</span>
        </button>
    )
}

export default NavigationButton;