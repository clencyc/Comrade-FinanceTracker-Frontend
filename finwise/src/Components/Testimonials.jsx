import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            text: "The financial management platform has transformed how we handle our business finances. The team's dedication to excellence is remarkable.",
            author: "Sarah Johnson",
            position: "CEO, Tech Innovations",
            avatar: "/api/placeholder/48/48"
        },
        {
            text: "Outstanding service that exceeded our expectations. Their attention to detail and proactive support made all the difference.",
            author: "Michael Chen",
            position: "CFO, Global Solutions",
            avatar: "/api/placeholder/48/48"
        },
        {
            text: "Implementing their financial system was the best decision we made. The results have been exceptional and immediate.",
            author: "Emma Davis",
            position: "Director, Future Corp",
            avatar: "/api/placeholder/48/48"
        },
        {
            text: "Their platform streamlined our entire financial process. The support team is responsive and highly professional.",
            author: "James Wilson",
            position: "CEO, Smart Finance",
            avatar: "/api/placeholder/48/48"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [testimonials.length]);

    // Navigation functions
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="w-full bg-gradient-to-br from-black via-gray-900 to-black py-16 md:py-24 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl text-gray-400 font-semibold text-center mb-16">
                    Our clients knows the value
                    <br />
                    we provide
                </h2>
                <div className="relative">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                    <div className="overflow-hidden relative">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 px-4 md:px-12"
                                >
                                    <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 flex flex-col items-center text-center">
                                        {/* Stars */}
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-white text-lg md:text-xl mb-8">
                                            {testimonial.text}
                                        </p>

                                        {/* Author Info */}
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.author}
                                                className="w-12 h-12 rounded-full mb-3"
                                            />
                                            <h4 className="text-white font-medium">{testimonial.author}</h4>
                                            <p className="text-gray-400 text-sm">{testimonial.position}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-gray-600'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;