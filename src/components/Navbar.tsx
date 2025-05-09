import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, User, Heart, Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-slate-900 shadow-md'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md'
      }`}
    >
      <div className="container py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Film className="h-7 w-7 mr-2 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              MovieExplorer
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <>
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/' 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  Discover
                </Link>
                <Link 
                  to="/favorites" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/favorites' 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    Favorites
                  </span>
                </Link>
              </>
            )}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* User Menu (Desktop) */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center ml-4">
                <div className="flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                  <User className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {user?.username}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="ml-4 p-1 md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X size={24} className="text-slate-800 dark:text-slate-200" />
              ) : (
                <Menu size={24} className="text-slate-800 dark:text-slate-200" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white dark:bg-slate-900 pt-16 animate-fade-in">
          <div className="container py-8">
            <nav className="flex flex-col space-y-6">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <User className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                    <span className="text-lg font-medium">{user?.username}</span>
                  </div>
                
                  <Link 
                    to="/" 
                    className="flex items-center justify-center py-3 text-lg font-medium text-slate-900 dark:text-white"
                  >
                    Discover Movies
                  </Link>
                  
                  <Link 
                    to="/favorites" 
                    className="flex items-center justify-center py-3 text-lg font-medium text-slate-900 dark:text-white"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    My Favorites
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center py-3 text-lg font-medium text-accent-600 dark:text-accent-400"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center justify-center py-3 text-lg font-medium text-primary-600 dark:text-primary-400"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;