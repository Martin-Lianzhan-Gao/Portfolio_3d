import { ArrowUp, ArrowDown } from "lucide-react"

type NavigationButtonProps = {
    text: string;
    isLastPart?: boolean;
    setIsLastPart?: (value: boolean) => void;
 }

const NavigationButton = ({ text, isLastPart}: NavigationButtonProps) => {
    return (
        <button
            className="flex flex-row items-center justify-center px-4 py-2 mt-4 border border-white/20 bg-[#4285F4]/80 rounded-2xl backdrop-blur-2xl hover:bg-[#4285F4]/60 active:bg-[#4285F4]/60 transition-colors duration-200 text-md text-gray-200 text-sm 2xl:text-xl"
        >
            {isLastPart ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            <span className="ml-2">{text}</span>
        </button>
    )
}

export default NavigationButton;