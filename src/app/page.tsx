import Intro from "@/components/intro";
import NavigationButton from "@/components/navigation-button";


export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Intro />
            <div className="flex w-full h-screen flex-col items-center justify-center p-24">
                First Page
            </div>
            <div className="flex h-screen flex-col items-center justify-center p-24">
                Second Page
            </div>
            <div className="flex w-full flex-row justify-center fixed z-12 bottom-8 text-black">
                <NavigationButton text="Next" isLastPart={false} />
            </div>
        </div>
        
    );
}
