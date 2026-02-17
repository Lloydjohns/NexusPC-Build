import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, X } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';
import heroImage from '@/assets/gaming-pc-hero.jpg';

const HeroSection = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage}
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">
                Premium PC Components
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block">Build Your</span>
              <span className="block gradient-text glow-text">
                Perfect Machine
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl">
              Power. Precision. Performance.
              <span className="block mt-2 text-base md:text-lg">
                Premium components and custom-built systems for gamers, creators,
                and professionals.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Direct scroll to builder with animation */}
              <Button
                variant="hero"
                size="xl"
                onClick={() => {
                  const builderSection = document.getElementById('builder');
                  if (builderSection) {
                    builderSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Building →
              </Button>

              <Button
                variant="glass"
                size="xl"
                onClick={() => setShowDemo(true)}
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* WATCH DEMO MODAL */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4 bg-background rounded-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
            >
              <X className="w-6 h-6" />
            </button>

            <video
              controls
              autoPlay
              className="w-full rounded-xl mb-6"
              poster={heroImage}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>

            <div>
              <h2 className="text-center text-3xl font-bold mb-4">
                Our Work in Action
              </h2>

              <p className="text-justify text-muted-foreground">
                See how we build high-performance PCs with precision, premium parts, and expert craftsmanship. Our process begins with careful component selection, ensuring every part — from the CPU and GPU down to the thermal solution and cable routing — contributes to maximum performance and long-term reliability.
              </p>

              <p className="text-justify text-muted-foreground mt-3">
                Each build goes through multiple quality checks, including stress testing, benchmarking, and thermal optimization to guarantee stable operation under heavy workloads such as AAA gaming, video editing, 3D rendering, simulation, and streaming. We pay close attention to airflow, acoustics, and cable management to deliver systems that are not only powerful but clean, efficient, and visually striking.
              </p>

              <p className="text-justify text-muted-foreground mt-3">
                Whether you’re an enthusiast, a competitive gamer, or a professional creator, our custom rigs are engineered to meet your exact needs. From RGB customization to boutique case designs and advanced cooling solutions, every detail reflects our commitment to performance, durability, and aesthetic excellence.
              </p>

              <p className="text-justify text-muted-foreground mt-3 mb-2">
                Our builds are tested, tuned, and ready to perform the moment they reach your desk — because a great PC isn’t just about specs, it’s about how everything works together.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
