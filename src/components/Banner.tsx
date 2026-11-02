'use client';

import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
    title: string;
    subtitle: string;
    image: string;
    badge: string;
}

const slides: Slide[] = [
    {
        title: 'Discover Your Next Literary Obsession',
        subtitle:
            'Explore thousands of curated novels, self-help guides, sci-fi epics, and timeless classics available instantly.',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600',
        badge: 'Featured Collection',
    },
    {
        title: 'Borrow Books with Absolute Ease',
        subtitle:
            'Seamless digital checkouts for a few days. Read at your own pace and return with a single click.',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1600',
        badge: 'Instant Borrowing',
    },
    {
        title: 'Contribute to Our Growing Community',
        subtitle:
            'Have a favorite book collecting dust? Add it to BookNook and share the joy of reading with fellow bibliophiles.',
        image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1600',
        badge: 'Community Library',
    },
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    // Auto slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    // Previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <section className="relative h-137.5 sm:h-187.5 w-full overflow-hidden bg-stone-900">
            {slides.map((slide, index) => (
                <div
                    key={slide.badge}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide
                            ? 'opacity-100 z-10'
                            : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                    {/* Background Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-stone-950 via-stone-950/70 to-transparent z-10" />

                    {/* Background Image */}
                    <Image
                        width={3600}
                        height={1250}
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transform scale-105 animate-pulse duration-10000"
                        loading="eager"
                    />

                    {/* Slide Content */}
                    <div className="absolute inset-0 z-20 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <div className="max-w-2xl space-y-6">
                                {/* Badge */}
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/90 text-emerald-100 text-xs font-bold uppercase tracking-widest shadow-lg backdrop-blur-md">
                                    <Sparkles size={14} />
                                    {slide.badge}
                                </span>

                                {/* Title */}
                                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                                    {slide.title}
                                </h1>

                                {/* Subtitle */}
                                <p className="text-lg text-stone-300 font-normal leading-relaxed">
                                    {slide.subtitle}
                                </p>

                                {/* Buttons */}
                                <div className="pt-4 flex flex-wrap gap-4">
                                    <Link
                                        href="/books"
                                        className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/40 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer"
                                    >
                                        Browse Books
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slider Controls */}
            <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3">
                <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-12 h-12 rounded-full bg-black/50 hover:bg-emerald-700 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                >
                    <ChevronLeft size={22} />
                </button>

                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-12 h-12 rounded-full bg-black/50 hover:bg-emerald-700 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                >
                    <ChevronRight size={22} />
                </button>
            </div>
        </section>
    );
};

export default HeroSlider;
