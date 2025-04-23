import React from 'react';
import { Links } from './Links';

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-800 text-white py-4">
            <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow us on</h3>
                    </div>

                    <div><Links/></div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="p-2 rounded-l-lg text-gray-800"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-lg"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;