import { ArrowRight } from "lucide-react";
const Navbar = () => {
    return (
        <nav className="w-full py-4 px-6 bg-black/90">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xl">$</span>
                    </div>
                    <span className="text-white text-xl font-semibold">FinWise</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-gray-300 hover:text-white">
                        Home
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Features
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Solutions
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Rankings
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Pricing
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Blogs
                    </a>
                </div>

                <button className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600">
                    Get Started
                    <ArrowRight size={16} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
