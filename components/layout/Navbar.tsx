import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { UserIcon } from '../icons/UserIcon';
import { LogoutIcon } from '../icons/LogoutIcon';

export const Navbar: React.FC = () => {
  const { state } = useCart();
  const { user, login, logout } = useAuth();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      navigate(`/products?q=${encodeURIComponent(trimmedSearch)}`);
    } else {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  }

  const activeLinkStyle: React.CSSProperties = {
    color: '#4b5563' // accent color
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-primary flex-shrink-0">
              Sicher
            </Link>
            <div className="hidden md:flex items-baseline space-x-4">
              <NavLink 
                to="/" 
                className="text-gray-600 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={({ isActive }) => isActive ? activeLinkStyle : {}}
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                className="text-gray-600 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={({ isActive }) => isActive ? activeLinkStyle : {}}
              >
                All Products
              </NavLink>
              <NavLink 
                to="/track-order" 
                className="text-gray-600 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={({ isActive }) => isActive ? activeLinkStyle : {}}
              >
                Track Order
              </NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <form onSubmit={handleSearch} className="relative">
                <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-gray-600" aria-label="Search">
                  <SearchIcon />
                </button>
                <input
                  id="search"
                  className="block w-full bg-transparent py-2 pl-10 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                className="text-gray-600 hover:text-accent p-2 rounded-full transition-colors"
                aria-label="User menu"
              >
                <UserIcon />
              </button>
              {isProfileOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700">
                        <p className="font-medium">Hello, {user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role} View</p>
                      </div>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogoutIcon />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { login('Admin', 'admin'); setIsProfileOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login as Admin</button>
                      <button onClick={() => { login('Customer', 'customer'); setIsProfileOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login as Customer</button>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/cart" className="relative text-gray-600 hover:text-accent p-2 rounded-full transition-colors" aria-label={`Shopping cart with ${itemCount} items`}>
              <ShoppingCartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};