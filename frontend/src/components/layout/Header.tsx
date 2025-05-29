import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="glass-card sticky top-0 z-10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-primary-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Refine</h1>
            <span className="ml-2 text-xs bg-primary-100/80 backdrop-blur-sm text-primary-800 px-2 py-0.5 rounded-full">
              Beta
            </span>
          </div>
          
          <div className="text-sm text-gray-600">
            AI-Powered Resume Optimization
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;