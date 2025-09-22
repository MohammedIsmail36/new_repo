"use client";

import { Search, Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      {/* Left Section: Mobile Menu Button */}
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md text-gray-600 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Center: Search Bar */}
      <div className="flex justify-center flex-1">
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-md mx-auto">
          <Search className="h-4 w-4 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="البحث..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* Right Section: Mobile Search Icon + User Menu */}
      <div className="flex items-center gap-4">
        {/* Search Icon (Mobile) */}
        <button className="md:hidden p-2 rounded-md text-gray-600">
          <Search className="h-5 w-5" />
        </button>

        {/* User Menu */}
        <div className="relative">
          {session ? (
            <div className="flex items-center">
              {/* User Info (Desktop) */}
              <div className="hidden md:block text-right ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {session.user?.name || 'المستخدم'}
                </p>
                <p className="text-xs text-gray-500">
                  {session.user?.email}
                </p>
              </div>

              {/* User Avatar & Dropdown */}
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-md text-gray-600"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute left-0 top-12 w-56 bg-white rounded-lg shadow-lg py-1 z-50">
                  <div className="md:hidden px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user?.name || 'المستخدم'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      signOut({ callbackUrl: '/signin' });
                    }}
                    className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              تسجيل الدخول
            </a>
          )}
        </div>
      </div>

      {/* Background overlay for dropdown */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}