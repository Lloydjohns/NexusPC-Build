import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Cpu,
  HardDrive,
  Monitor,
  ShieldCheck,
  Send,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CommunitySection = () => {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setShowModal(true);
  };

  const confirmSubscription = () => {
    toast({
      title: 'Welcome to NEXUS PC 👋',
      description: 'You are now part of our professional PC-building community.',
    });
    setName('');
    setShowModal(false);
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* BACKGROUND (NON-INTERACTIVE) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute top-24 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* HEADER */}
          <span className="uppercase text-primary tracking-widest text-sm font-medium">
            Community & Knowledge
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Built by Experts. <br />
            <span className="gradient-text">Guided for You.</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-16">
            At <strong>NEXUS PC</strong>, we don’t just sell computers — we guide you
            through every decision. From choosing the right CPU and GPU to building
            a system that fits your budget, performance goals, and future upgrades.
          </p>

          {/* VALUE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                icon: Cpu,
                title: 'Expert Component Guidance',
                desc: 'Understand which CPU, GPU, and motherboard actually fit your needs.',
              },
              {
                icon: HardDrive,
                title: 'Smart Storage & Memory Advice',
                desc: 'Learn how much RAM and storage you really need — no overspending.',
              },
              {
                icon: Monitor,
                title: 'Gaming & Productivity Builds',
                desc: 'Optimized builds for gaming, editing, streaming, and work.',
              },
              {
                icon: ShieldCheck,
                title: 'Trusted & Future-Proof',
                desc: 'We prioritize upgrade paths, thermals, and long-term reliability.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border/50 rounded-2xl p-6 text-left flex gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SUBSCRIBE FORM */}
          <div className="relative z-20 pointer-events-auto bg-background border border-border/60 rounded-3xl p-10 md:p-14 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Join Our Professional PC Guide
            </h3>

            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get exclusive guides, hardware recommendations, build tips,
              and early access to deals — written by real PC builders.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14"
              />

              <Button type="submit" size="lg" className="h-14">
                Subscribe
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              No spam. Only high-quality PC knowledge. Unsubscribe anytime.
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex justify-center gap-4 mt-14">
            {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-4 rounded-xl bg-card border border-border hover:bg-primary hover:text-primary-foreground transition"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-background rounded-2xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
            >
              <X />
            </button>

            <h2 className="text-3xl font-bold mb-4 text-center">
              Welcome, {name} 👋
            </h2>

            <p className="text-muted-foreground mb-6 text-center">
              You’ll receive:
            </p>

            <ul className="space-y-3 mb-8 text-muted-foreground text-sm">
              <li>• Step-by-step PC build guides</li>
              <li>• CPU & GPU pairing recommendations</li>
              <li>• Upgrade planning tips</li>
              <li>• Exclusive community-only offers</li>
            </ul>

            <Button className="w-full" size="lg" onClick={confirmSubscription}>
              Confirm & Join Community
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunitySection;
