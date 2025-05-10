import React from 'react';
import { Heart, Film } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Film className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
            <span className="font-medium text-slate-800 dark:text-slate-200">
              MovieExplorer
            </span>
          </div>
          
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Data provided by{' '}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              The Movie Database (TMDb)
            </a>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 text-sm text-slate-600 dark:text-slate-400">
            <span>Made with Sachini</span>
            <Heart className="h-4 w-4 mx-1 text-accent-500" fill="currentColor" />
            <span>in 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;