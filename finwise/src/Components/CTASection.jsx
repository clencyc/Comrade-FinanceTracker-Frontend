import { ArrowRight } from "lucide-react";
import { Element } from "react-scroll";

const CTASection = () => {
  return (
    <Element name="cta">
    <div className="w-full bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 bg-[#4AFF52] rounded-full flex items-center justify-center mx-auto mb-10">
          <span className="text-white text-5xl font-bold">$</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-300">
          Are you ready to get
          <br />
          started?
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Embark on Your Journey to Financial Excellence Our Comprehensive
          Solutions — Get Started Today and Transform
        </p>
        <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-8 py-4 rounded-full flex items-center gap-2 mx-auto transition-colors">
          <span>Get Our Tracker For Free </span>
          <div className="bg-[#4AFF52] rounded-full p-1">
            <ArrowRight className="w-4 h-4 text-black" />
          </div>
        </button>
      </div>
    </div>
    </Element>
  );
};

export default CTASection;
