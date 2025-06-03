import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { speakText } from '../utils/voiceUtils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/library', label: 'Library', icon: '📚' },
    { path: '/tests', label: 'Tests', icon: '📝' },
  ];

  const handleNavClick = (label) => {
    speakText(`Navigating to ${label}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 z-50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold text-primary-500"
              >
                Garur
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => handleNavClick(item.label)}
                  className={`nav-link ${
                    location.pathname === item.path ? 'nav-link-active' : ''
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Login/Register Button - Desktop */}
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  Login / Register
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Voice Control Status - Desktop */}
              <div className="hidden md:flex">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-primary-50 text-primary-500"
                >
                  <span>🎤</span>
                  <span className="text-sm font-medium">Voice Active</span>
                </motion.div>
              </div>

              {/* Profile Section - Desktop */}
              <div className="hidden md:flex relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    <span>👤</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Your Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            setIsProfileOpen(false);
                            // Add logout logic here
                          }}
                        >
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span 
                    className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                    }`}
                  />
                  <span 
                    className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span 
                    className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                {/* Voice Control Status - Mobile */}
                <div className="py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-2 text-primary-500">
                    <span>🎤</span>
                    <span className="text-sm font-medium">Voice Control Active</span>
                  </div>
                </div>

                {/* Navigation Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => handleNavClick(item.label)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}

                {/* Login/Register Button - Mobile */}
                {!isLoggedIn && (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-primary-500 hover:bg-primary-50 mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}

                {/* Mobile Profile Section */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                      <span>👤</span>
                    </div>
                    <span className="ml-3 text-base font-medium text-gray-700">John Doe</span>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-primary-50"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-500 hover:bg-primary-50"
                  >
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                    onClick={() => {
                      // Add logout logic here
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 