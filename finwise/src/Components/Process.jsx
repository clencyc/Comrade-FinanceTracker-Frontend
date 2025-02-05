import { ArrowRight } from 'lucide-react';
const Process = () => {
    const steps = [
        {
          title: 'Create Free Account',
          description: 'We help you implement the plan and offer continuous support, adjustments'
        },
        {
          title: 'Initial Assessment',
          description: 'We start by evaluating your current financial situation, goals.'
        },
        {
          title: 'Customized Plan',
          description: 'Based on the assessment, we create a customized financial management plan .'
        }
      ];
  return (
    <div className='w-full bg-gradient-to-br from-black via-gray-900 to-black pt-10 py-10 px-6'>
    <div className=" bg-[#DFDFD8] rounded-[32px] mx-20 my-10 py-14 md:p-16">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <h2 className="text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A] max-w-3xl mx-auto leading-tight">
          Step-By-Step Effective Financial
          <br />
          Management Processes
        </h2>

        {/* Steps Container */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Box */}
              <div className="bg-transparent border border-[#00000020] rounded-2xl p-8">
                <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#404040] text-[15px] leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Arrow for steps except last */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="bg-[#FF4D4D] rounded-full p-2">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="space-y-8">
          <p className="text-[22px] text-center text-[#1A1A1A] max-w-2xl mx-auto leading-normal">
            Uncover the Methodical Processes Behind Our
            <br />
            Financial Management System Designed
          </p>
          
          <div className="flex justify-center">
            <button className="bg-[#1A1A1A] hover:bg-black/80 text-white px-7 py-3.5 rounded-full flex items-center gap-2 transition-colors">
              <span className="text-[15px]">Get Started Now</span>
              <div className="bg-[#00FF47] rounded-full p-1">
                <ArrowRight className="w-4 h-4 text-black" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Process