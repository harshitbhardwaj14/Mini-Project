import React from 'react';
import { Links } from './Links';

const Footer: React.FC = () => {
  return (

    <footer className="w-full border-t border-neutral-700">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between space-y-4">
          <Links/>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        
      </div>
    </footer>

  );
};

export default Footer;