import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-void-950/85 backdrop-blur-md border-b border-dusk-900/60'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="group">
          <span className="font-pixel text-[10px] md:text-xs text-cream-200 tracking-nostalgic transition-colors duration-500 group-hover:text-ember-400">
            STRANGER
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-sm tracking-wide-sm transition-colors duration-400 relative ${
                location.pathname === link.path
                  ? 'text-ember-400'
                  : 'text-cream-400 hover:text-cream-200'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-ember-400 transition-all duration-500 ${
                  location.pathname === link.path ? 'w-full' : 'w-0'
                }`}
              />
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-cream-300 z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="bg-void-900/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5 border-t border-dusk-900/50">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-base tracking-wide-sm transition-colors ${
                location.pathname === link.path
                  ? 'text-ember-400'
                  : 'text-cream-300 hover:text-cream-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
