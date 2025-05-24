import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center shadow-inner">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} EventBooker. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-purple-400 transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-purple-400 transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;