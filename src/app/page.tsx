import Intro from "@/components/intro";


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
        </div>
        
    );
}
