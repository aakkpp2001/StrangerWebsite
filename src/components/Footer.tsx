import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-void-950 border-t border-dusk-900/40 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="group">
            <span className="font-pixel text-[10px] text-cream-300 tracking-nostalgic transition-colors duration-500 group-hover:text-ember-400">
              STRANGER
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/" className="font-body text-sm text-cream-400 hover:text-cream-200 transition-colors duration-300">
              Home
            </Link>
            <Link to="/about" className="font-body text-sm text-cream-400 hover:text-cream-200 transition-colors duration-300">
              About Us
            </Link>
            <Link to="/contact" className="font-body text-sm text-cream-400 hover:text-cream-200 transition-colors duration-300">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-5">
            {[
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Github, label: 'GitHub' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-cream-400 hover:text-ember-400 transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="divider-warm my-8" />

        <p className="text-center font-body text-xs text-cream-400/60 font-light">
          © {new Date().getFullYear()} Stranger. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
