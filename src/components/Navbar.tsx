import { useState, useEffect } from 'react';
import { NavLink } from './NavLink';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { name: 'Home', to: '/#home' },
  { name: 'About', to: '/#about' },
  { name: 'Products', to: '/#products' },
  { name: 'PC Builder', to: '/#builder' },
  { name: 'Why Us', to: '/#why-us' },
  { name: 'Blog', to: '/#blog' },
  { name: 'Contact', to: '/#contact' },

];

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsCartOpen, totalItems } = useCart();
  const { user } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // loading state

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToShop = () => {
    setIsLoading(true); // show loading screen
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shop'); // navigate after loading
    }, 800); // 0.8s loading simulation
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="w-20 h-20 border-4 border-t-primary border-x-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* LOGO */}
          <NavLink to="/#home" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors" title="Go to Home">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">NX</span>
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">
              NEXUS<span className="text-primary">PC</span>
            </span>
          </NavLink>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.to} className="text-foreground hover:text-primary transition-colors font-medium text-sm uppercase tracking-wider">
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            {/* Shop Icon */}
            <button className="p-2 text-foreground hover:text-primary transition-colors" onClick={goToShop} title="Browse Shop">
              <Store className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <button className="p-2 text-foreground hover:text-primary relative transition-colors" onClick={() => setIsCartOpen(true)} title="View Cart">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Icon */}
            {user ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer" title={`Hello, ${user.name}`}>
                {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" /> : <span className="text-xs font-bold text-primary-foreground">{user.name.charAt(0).toUpperCase()}</span>}
              </div>
            ) : (
              <button className="p-2 text-foreground hover:text-primary transition-colors" onClick={() => navigate('/auth')} title="Login / Sign Up">
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Start Building Button */}
            <a href="#builder">
              <Button variant="hero" size="sm" className="hidden md:flex">
                Start Building
              </Button>
            </a>

            {/* MOBILE MENU TOGGLE */}
            <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} title="Toggle Menu">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden absolute top-full left-0 right-0 glass transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.to} className="text-foreground hover:text-primary transition-colors py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}

            {!user && (
              <Button variant="hero" className="mt-2" onClick={() => navigate('/auth')}>
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
