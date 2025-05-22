import { Menu, X } from "lucide-react";

const Header = () => { 
    return (
        <div className="fixed w-full">
            <div>
                <Menu className="md:hidden" />
                <X className="hidden" />
                <ul className="flex py-4 px-4 flex-col items-center h-1/2 md:flex-row md:justify-between">
                    <li className="py-2 md:py-0">HOME</li>
                    <li className="py-2 md:py-0">EXPERIENCE</li>
                    <li className="py-2 md:py-0">PROJECT</li>
                    <li className="py-2 md:py-0">EDUCATION</li>
                    <li className="py-2 md:py-0">SKILLS</li>
                    <li className="py-2 md:py-0">CONTACT</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;

