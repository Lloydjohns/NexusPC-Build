import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import gamingPcImage from '@/assets/gaming-pc-hero.jpg';
import miniPcImage from '@/assets/mini-pc.jpg';
import workstationImage from '@/assets/workstation-pc.jpg';

const testimonials = [
  {
    quote: "This GPU runs everything on ultra settings. I couldn't be happier with my purchase! The performance boost was exactly what I needed for my gaming setup.",
    author: 'Marcus Chen',
    role: 'Professional Gamer',
    image: gamingPcImage,
    rating: 5,
  },
  {
    quote: "The custom PC I ordered was delivered quickly and runs like a dream. Perfect for video editing! Their team helped me pick the right components.",
    author: 'Sarah Williams',
    role: 'Content Creator',
    image: workstationImage,
    rating: 5,
  },
  {
    quote: "Best customer service I've ever experienced. The team helped me build the perfect workstation for my 3D rendering projects. Highly recommend!",
    author: 'David Park',
    role: '3D Artist',
    image: miniPcImage,
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            What Our Customers <span className="gradient-text">Are Saying</span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Quote Icon */}
              <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/20" />

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                    "{testimonials[current].quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      {testimonials[current].author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display font-bold text-foreground">{testimonials[current].author}</div>
                      <div className="text-muted-foreground text-sm">{testimonials[current].role}</div>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative hidden md:block">
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={testimonials[current].image}
                      alt={`${testimonials[current].author}'s build`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 px-4 py-2 glass rounded-lg text-sm font-medium text-primary">
                    Their Build
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-primary' : 'bg-muted hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
