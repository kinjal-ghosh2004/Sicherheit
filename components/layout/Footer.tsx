import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
    {children}
  </Link>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Sicherheit</h3>
            <p className="text-gray-500 text-sm">Your trusted partner for modern appliances and smart home solutions.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Shop</h4>
            <ul className="mt-4 space-y-2">
              <li><FooterLink to="/products">All Products</FooterLink></li>
              <li><FooterLink to="/products?q=Kitchen">Kitchen</FooterLink></li>
              <li><FooterLink to="/products?q=Home">Home</FooterLink></li>
              <li><FooterLink to="/products?q=Entertainment">Entertainment</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Support</h4>
            <ul className="mt-4 space-y-2">
              <li><FooterLink to="/track-order">Track Order</FooterLink></li>
              <li><FooterLink to="#">Contact Us</FooterLink></li>
              <li><FooterLink to="#">FAQs</FooterLink></li>
              <li><FooterLink to="#">Returns</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><FooterLink to="#">Privacy Policy</FooterLink></li>
              <li><FooterLink to="#">Terms of Service</FooterLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Sicherheit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};