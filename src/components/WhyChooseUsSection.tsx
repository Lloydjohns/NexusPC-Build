import { Headphones, Shield, Truck, Clock } from 'lucide-react';

const features = [
  {
    icon: Headphones,
    title: 'Expert Guidance',
    description: 'Need help choosing parts? Our team of experts is ready to assist you in finding the right components.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every product we sell is tested for performance and durability to ensure it meets our strict standards.',
  },
  {
    icon: Truck,
    title: 'Free Shipping & Fast Delivery',
    description: 'Enjoy free shipping on all orders, with fast delivery times so you can get started on your build without delay.',
  },
  {
    icon: Clock,
    title: 'Lifetime Support',
    description: "Our commitment doesn't end when you purchase. We offer lifetime technical support to help you with your build anytime.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">Why Us</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Why Shop <span className="gradient-text">With Us?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're more than just a component store. Here's why you can trust us to power your build.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl glass card-hover text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 group-hover:from-primary group-hover:to-accent transition-all duration-500">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-primary pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 p-8 rounded-2xl glass gradient-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Products</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">5★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
