/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onOpenInbox?: () => void;
  unreadCount?: number;
}

export default function Header({ onOpenInbox, unreadCount = 0 }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link tracker on scroll
      const sections = ['inicio', 'quienes-somos', 'servicios', 'infraestructura', 'ubicacion', 'contacto', 'acceso-clientes'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio', id: 'inicio' },
    { label: 'Quiénes Somos', href: '#quienes-somos', id: 'quienes-somos' },
    { label: 'Servicios', href: '#servicios', id: 'servicios' },
    { label: 'Infraestructura', href: '#infraestructura', id: 'infraestructura' },
    { label: 'Ubicación', href: '#ubicacion', id: 'ubicacion' },
    { label: 'Contacto', href: '#contacto', id: 'contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 shadow-md py-3 border-b border-gray-100 backdrop-blur-md'
          : 'bg-white/90 shadow-sm py-4 border-b border-gray-100/50 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo ADG */}
          <a
            id="logo-link"
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center space-x-2 group"
          >
            <Logo lightBg={true} height={40} />
            <div className="hidden sm:flex flex-col border-l border-gray-200 pl-3">
              <span className="text-[10px] font-bold text-[#044524] uppercase tracking-widest leading-none">
                Almacén
              </span>
              <span className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mt-0.5">
                de Granos S.A.
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                id={`nav-${item.id}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isScrolled || window.innerWidth < 1024
                    ? activeSection === item.id
                      ? 'text-brand-green font-semibold'
                      : 'text-gray-600 hover:text-brand-green'
                    : activeSection === item.id
                    ? 'text-brand-green md:text-brand-green-dark font-semibold'
                    : 'text-gray-700 hover:text-brand-green'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green rounded-full" />
                )}
              </a>
            ))}

            {/* Simulated Mailbox Panel Trigger (Only if inbox trigger exists) */}
            {onOpenInbox && (
              <button
                id="btn-admin-inbox"
                onClick={onOpenInbox}
                className="relative p-1.5 text-gray-500 hover:text-brand-green transition-colors hover:bg-gray-100 rounded-full"
                title="Ver Mensajes Recibidos (Demo)"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[9px] font-bold text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}

            {/* Clients access action button */}
            <a
              id="header-client-access-btn"
              href="#acceso-clientes"
              onClick={(e) => handleNavClick(e, '#acceso-clientes')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                activeSection === 'acceso-clientes'
                  ? 'bg-brand-green text-white border-brand-green shadow-sm'
                  : 'bg-white text-brand-green border-brand-green/30 hover:border-brand-green hover:bg-brand-green/5'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso Clientes</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            {onOpenInbox && (
              <button
                id="btn-admin-inbox-mobile"
                onClick={onOpenInbox}
                className="relative p-2 text-gray-500 hover:text-brand-green rounded-full bg-gray-100"
                title="Mensajes Recibidos"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-brand-gold text-[8px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-brand-green focus:outline-none"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-drawer" className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                id={`mobile-nav-${item.id}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-base font-medium py-1.5 transition-colors ${
                  activeSection === item.id ? 'text-brand-green font-bold pl-2 border-l-2 border-brand-green' : 'text-gray-600'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              id="mobile-nav-acceso-clientes"
              href="#acceso-clientes"
              onClick={(e) => handleNavClick(e, '#acceso-clientes')}
              className={`flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all border ${
                activeSection === 'acceso-clientes'
                  ? 'bg-brand-green text-white border-brand-green'
                  : 'bg-brand-green-pale text-brand-green border-brand-green/20'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Acceso Clientes</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
