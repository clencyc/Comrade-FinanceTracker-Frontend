const Services = () => {
  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 transition-all md:ml-64 sm:ml-0">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h1>
      <p className="text-gray-600 mb-6 text-lg">
        Explore our financial services designed to help you manage and grow your money efficiently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Service Card */}
        {[
          { title: "Money Transfers", desc: "Send and receive money securely with low transaction fees." },
          { title: "Bill Payments", desc: "Pay your bills, including electricity, water, and internet, quickly." },
          { title: "Investment Plans", desc: "Grow your wealth with flexible and high-yield investment options." },
          { title: "Loan Services", desc: "Access quick loans with low interest rates for personal or business use." },
          { title: "Savings Accounts", desc: "Open a secure savings account and earn competitive interest rates." },
          { title: "Fraud Protection", desc: "Advanced security measures to protect your transactions and accounts." },
        ].map((service, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{service.title}</h2>
            <p className="text-gray-500">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
