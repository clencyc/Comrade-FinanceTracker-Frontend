import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 bg-black/90 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-xl">$</span>
          </div>
          <span className="text-white text-xl font-semibold">FinWise</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="process"
            smooth={true}
            duration={500}
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Process
          </ScrollLink>
          <ScrollLink
            to="testimonials"
            smooth={true}
            duration={500}
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Testimonials
          </ScrollLink>
          <ScrollLink
            to="cta"
            smooth={true}
            duration={500}
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Get Started
          </ScrollLink>
        </div>

        <Link
          to="/get-started"
          className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
        >
          Get Started
          <ArrowRight size={16} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
