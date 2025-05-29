import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-card mt-auto border-t border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Refine. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1">Powered by</span>
              <span className="text-sm font-medium text-gray-700">OpenAI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;