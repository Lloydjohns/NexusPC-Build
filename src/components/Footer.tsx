import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const footerLinks = {
  'Quick Links': ['Home', 'Products', 'Shop', 'About Us', 'Blog', 'Contact Us'],
  'Categories': ['Graphics Cards', 'Processors', 'Memory', 'Storage', 'Pre-built PCs'],
  'Customer Service': ['Help Center', 'FAQ', 'Returns & Exchanges', 'Shipping & Delivery', 'Warranty'],
  'Legal': ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'],
};

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-lg">NX</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                NEXUS<span className="text-primary">PC</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Your trusted partner in PC building. Premium components and custom-built systems 
              for gamers, creators, and professionals.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <MapPin className="w-4 h-4" />
                123 Tech Street, Silicon Valley, CA 94025
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
              <a href="mailto:support@nexuspc.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                support@nexuspc.com
              </a>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                Mon - Fri: 9AM - 6PM PST
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm underline-animate"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-muted-foreground text-sm">
              <span>Secure Payment:</span>
              <div className="flex items-center gap-4">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                  <div key={method} className="px-3 py-1 rounded glass text-xs font-medium">
                    {method}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              SSL Secured
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 NEXUS PC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
