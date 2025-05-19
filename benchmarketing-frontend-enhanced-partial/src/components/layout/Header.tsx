
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AuthStatus from '@/components/auth/AuthStatus';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Benchmarks', href: '/benchmarks' },
    { name: 'Industries', href: '/industries' },
    { name: 'Use Cases', href: '/use-cases' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Resources', href: '/resources' },
    { name: 'Toolbox', href: '/toolbox' },
    { name: 'About', href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-navy-900">Bench<span className="text-lilac">marketing</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-navy-700 hover:text-navy-900 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons - Replaced with AuthStatus */}
        <div className="hidden lg:block">
          <AuthStatus />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-navy-900 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 right-0 p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-navy-700 hover:text-navy-900 font-medium py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <AuthStatus />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
