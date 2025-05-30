
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import AuthStatus from '@/components/auth/AuthStatus';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const benchmarkDropdownItems = [
    { name: 'All Benchmarks', href: '/benchmarks' },
    { name: 'By Industry', href: '/benchmarks/industry' },
    { name: 'By Platform', href: '/benchmarks/platform' },
    { name: 'By Channel', href: '/benchmarks/channel' },
    { name: 'By Funnel Stage', href: '/benchmarks/funnel' },
  ];

  const resourceDropdownItems = [
    { name: 'All Resources', href: '/resources' },
    { name: 'Guides', href: '/guides' },
    { name: 'Definitions', href: '/definitions' },
    { name: 'Use Cases', href: '/use-cases' },
    { name: 'Toolbox', href: '/toolbox' },
  ];

  const navLinks = [
    { name: 'How It Works', href: '/how-it-works' },
    { 
      name: 'Benchmarks', 
      href: '/benchmarks',
      dropdown: benchmarkDropdownItems
    },
    { name: 'Industries', href: '/industries' },
    { 
      name: 'Resources', 
      href: '/resources',
      dropdown: resourceDropdownItems
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
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
            link.dropdown ? (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger className="flex items-center text-navy-700 hover:text-navy-900 font-medium transition-colors">
                  {link.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border shadow-lg">
                  {link.dropdown.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="w-full">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-navy-700 hover:text-navy-900 font-medium transition-colors"
              >
                {link.name}
              </Link>
            )
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
              <div key={link.name}>
                <Link
                  to={link.href}
                  className="text-navy-700 hover:text-navy-900 font-medium py-2 border-b border-gray-100 block"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-navy-600 hover:text-navy-800 text-sm block py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
