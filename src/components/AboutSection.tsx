import { useEffect, useRef } from 'react';
import { Cpu, Shield, Zap } from 'lucide-react';
import gamingPcImage from '@/assets/gaming-pc-hero.jpg';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="animate-on-scroll opacity-0 relative group">
            <div className="relative rounded-2xl overflow-hidden gradient-border">
              <img
                src={gamingPcImage}
                alt="Custom Built Gaming PC"
                className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 glow-primary">
              <div className="font-display text-2xl font-bold text-primary">10+ Years</div>
              <div className="text-muted-foreground text-sm">Industry Experience</div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.1s' }}>
              <span className="text-primary font-medium uppercase tracking-wider text-sm">About Us</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
                Your Trusted Partner in <span className="gradient-text">PC Building</span>
              </h2>
            </div>

            <p 
              className="animate-on-scroll opacity-0 text-muted-foreground text-lg mb-8 leading-relaxed"
              style={{ animationDelay: '0.2s' }}
            >
              At NEXUS PC, we're passionate about performance. Whether you're a gamer, content creator, 
              or professional, we offer high-quality computer components and pre-built systems tailored 
              to your needs. From the latest graphics cards to cutting-edge processors, we provide 
              everything you need to build or upgrade your dream PC.
            </p>

            {/* Features */}
            <div className="grid gap-6">
              {[
                { 
                  icon: Cpu, 
                  title: 'Premium Components', 
                  desc: 'Only the best parts from trusted manufacturers' 
                },
                { 
                  icon: Shield, 
                  title: 'Quality Assurance', 
                  desc: 'Every component tested for peak performance' 
                },
                { 
                  icon: Zap, 
                  title: 'Expert Assembly', 
                  desc: 'Professional builds with precision and care' 
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="animate-on-scroll opacity-0 flex items-start gap-4 p-4 rounded-xl glass hover:glow-primary transition-all duration-300 group"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
