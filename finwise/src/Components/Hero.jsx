import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-10 ">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-white">Your Money
            <br />
            <span className="text-green-500 leading-2">Managed </span>Your Way</span>
          </h1>
          
          <p className="text-gray-400 text-lg">
            Experience seamless financial management with our all-in-one platform. From
            budgeting and expense tracking to detailed financial insights.
          </p>
          
          <button className="bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-green-600">
            Get Started Now
            <ArrowRight size={20} />
          </button>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl max-w-sm">
            <div className="text-4xl font-bold text-white mb-2">20M+</div>
            <p className="text-gray-400">
              Our platform is trusted by more than 1,200,000 active users, reflecting our commitment
            </p>
          </div>
        </div>
        
        <div className="relative flex flex-col items-center md:items-end space-y-4">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl w-full sm:w-3/4 md:w-2/3 flex justify-between items-end">
            <div>
              <div className="text-3xl font-bold text-white mb-2">175%</div>
              <div className="text-gray-400">Finance</div>
              <div className="text-green-500 text-sm">Projected Saving</div>
            </div>
            <div className="flex space-x-2 h-20 items-end">
              {[40, 60, 90, 120, 160, 250].map((height, i) => (
                <div
                  key={i}
                  className="bg-red-400/80 rounded-full w-6"
                  style={{ height: `${height / 2}%` }} // Adjusted for better mobile view
                />
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl w-full sm:w-auto text-center">
            <span className="text-green-500 font-semibold">200+</span>
            <span className="text-gray-400 text-sm ml-2">comrades trust us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
