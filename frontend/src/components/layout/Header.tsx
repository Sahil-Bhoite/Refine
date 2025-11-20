import React, { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface HeaderProps {
  onStart?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-neutral-charcoal/80 backdrop-blur-md border-white/10 py-4" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl shadow-lg shadow-primary-500/20">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-display font-bold text-white tracking-tight">
              Refine
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-neutral-silver/70 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">Log In</a>
            <Button size="sm" glow onClick={onStart}>Get Started</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-charcoal border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-base font-medium text-neutral-silver/80 hover:text-white py-2 border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button variant="outline" fullWidth>Log In</Button>
                <Button fullWidth glow onClick={() => {
                  setMobileMenuOpen(false);
                  if (onStart) onStart();
                }}>Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
