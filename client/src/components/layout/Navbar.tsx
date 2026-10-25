// DisasterOS Intelligent Role-Aware Navbar with Streamlined Architecture & Dropdowns
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Radio, 
  Menu, 
  X, 
  Users, 
  LogOut, 
  ChevronDown,
  Layers,
  Shield,
  Truck,
  HeartPulse,
  Boxes,
  Home,
  Activity,
  Compass,
  Navigation,
  Sliders,
  ClipboardList
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isCitizen, isOperator, logout, quickDemoLogin } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [opsDropdownOpen, setOpsDropdownOpen] = useState(false);
  const [intelDropdownOpen, setIntelDropdownOpen] = useState(false);

  const opsDropdownRef = useRef<HTMLDivElement>(null);
  const intelDropdownRef = useRef<HTMLDivElement>(null);

  const currentPath = location.pathname;

  // Close dropdowns on route change or click outside
  useEffect(() => {
    setOpsDropdownOpen(false);
    setIntelDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (opsDropdownRef.current && !opsDropdownRef.current.contains(event.target as Node)) {
        setOpsDropdownOpen(false);
      }
      if (intelDropdownRef.current && !intelDropdownRef.current.contains(event.target as Node)) {
        setIntelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dropdown Items for Operator
  const operationItems = [
    { path: '/operator/allocation', label: 'Resource Engine', desc: 'AI multi-factor triage allocation', icon: Layers },
    { path: '/operator/reallocation', label: 'Dynamic Reallocation', desc: 'Cross-depot deficit balancing', icon: Navigation },
    { path: '/operator/teams', label: 'Rescue Teams', desc: 'USAR & swiftwater squads', icon: Shield },
    { path: '/operator/fleet', label: 'Emergency Fleet', desc: 'Ambulances & high-water trucks', icon: Truck },
    { path: '/operator/hospitals', label: 'Hospitals & Trauma', desc: 'Live ICU & bed network', icon: HeartPulse },
    { path: '/operator/shelters', label: 'Shelters', desc: 'Safe evacuation sanctuaries', icon: Home },
    { path: '/operator/warehouses', label: 'Warehouses & Stock', desc: 'Trauma kits, water & rations', icon: Boxes },
  ];

  const intelligenceItems = [
    { path: '/operator/analytics', label: 'Operations Analytics', desc: 'Casualty & response KPIs', icon: Activity },
    { path: '/operator/risk', label: 'Risk & Early Warnings', desc: 'Continuous multi-hazard stream', icon: Compass },
    { path: '/operator/routes', label: 'Hazard-Free Routes', desc: 'Obstruction avoidance corridors', icon: Navigation },
    { path: '/operator/alerts', label: 'Broadcast Alerts', desc: 'Emergency sirens & push bulletins', icon: Radio },
    { path: '/operator/simulation', label: 'Twin Simulation', desc: 'Atmospheric flood stress-test', icon: Sliders },
    { path: '/operator/audit', label: 'Audit Logs', desc: 'Immutable operational ledger', icon: ClipboardList },
  ];

  const isOpsActive = operationItems.some(i => currentPath.startsWith(i.path));
  const isIntelActive = intelligenceItems.some(i => currentPath.startsWith(i.path));

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#05070d]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          
          {/* 1. Left: DisasterOS Logo */}
          <Link 
            to={isCitizen ? '/citizen/dashboard' : isOperator ? '/operator/dashboard' : '/'} 
            className="group flex items-center transition-transform duration-300 hover:scale-[1.02] shrink-0" 
            aria-label="DisasterOS home"
          >
            <span className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0 overflow-visible">
                <defs>
                  <linearGradient id="logoStroke-nav" x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5cc2ff" />
                    <stop offset="0.6" stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="12.6" stroke="url(#logoStroke-nav)" strokeWidth="1.7" />
                <ellipse cx="16" cy="16" rx="6.6" ry="12.6" stroke="url(#logoStroke-nav)" strokeWidth="1.5" />
                <path d="M16 3.4 V28.6" stroke="url(#logoStroke-nav)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3.4 16 H28.6" stroke="url(#logoStroke-nav)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="21" cy="11" r="2.2" fill="#fb923c" />
              </svg>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                Disaster<span className="text-[#38bdf8]">OS</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40 shrink-0">
                  AI
                </span>
              </span>
            </span>
          </Link>

          {/* 2. Center: Streamlined Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            
            {/* PUBLIC NAVIGATION (Logged out) */}
            {!isAuthenticated && (
              <>
                <Link
                  to="/"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath === '/' ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Overview
                </Link>
                <Link
                  to="/citizen/map"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath.startsWith('/citizen/map') ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Public Map
                </Link>
                <Link
                  to="/citizen/alerts"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath.startsWith('/citizen/alerts') ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Alerts
                </Link>
                <Link
                  to="/operator/shelters"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath.startsWith('/operator/shelters') ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Shelters
                </Link>
                <Link
                  to="/operator/analytics"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath.startsWith('/operator/analytics') ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Analytics
                </Link>
              </>
            )}

            {/* CITIZEN NAVIGATION */}
            {isCitizen && (
              <>
                <Link
                  to="/citizen/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath === '/citizen/dashboard' ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Citizen Home
                </Link>
                <Link
                  to="/citizen/sos"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    currentPath === '/citizen/sos' ? 'text-rose-400 font-bold bg-rose-500/10' : 'text-rose-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Report SOS</span>
                </Link>
                <Link
                  to="/citizen/track"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath.startsWith('/citizen/track') ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Track SOS
                </Link>
                <Link
                  to="/citizen/map"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath === '/citizen/map' ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Safe Map
                </Link>
                <Link
                  to="/citizen/alerts"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath === '/citizen/alerts' ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Public Alerts
                </Link>
                <Link
                  to="/citizen/assistant"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath === '/citizen/assistant' ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  AI Assistant
                </Link>
              </>
            )}

            {/* OPERATOR EOC NAVIGATION: CLEAN, STREAMLINED & GROUPED */}
            {isOperator && (
              <>
                {/* 1. Command Center */}
                <Link
                  to="/operator/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath === '/operator/dashboard' ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Command Center
                </Link>

                {/* 2. Incidents Queue */}
                <Link
                  to="/operator/incidents"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath === '/operator/incidents' ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Incidents Queue
                </Link>

                {/* 3. Tactical GIS Map */}
                <Link
                  to="/operator/map"
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                    currentPath === '/operator/map' ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Tactical GIS
                </Link>

                {/* 4. Operations & Resources Dropdown */}
                <div className="relative" ref={opsDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpsDropdownOpen(!opsDropdownOpen);
                      setIntelDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                      isOpsActive || opsDropdownOpen ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>Operations</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${opsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {opsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-[#0D162B] border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-3 py-1.5 font-bold">
                        Field Resources & Deployment
                      </div>
                      <div className="space-y-0.5">
                        {operationItems.map((item) => {
                          const ItemIcon = item.icon;
                          const active = currentPath.startsWith(item.path);
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setOpsDropdownOpen(false)}
                              className={`flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                                active ? 'bg-[#38bdf8]/15 text-[#38bdf8]' : 'text-white/80 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <ItemIcon className="w-4 h-4 mt-0.5 text-[#38bdf8] shrink-0" />
                              <div>
                                <div className="text-xs font-bold leading-tight">{item.label}</div>
                                <div className="text-[10.5px] text-white/50 leading-tight mt-0.5">{item.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Intelligence & Telemetry Dropdown */}
                <div className="relative" ref={intelDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIntelDropdownOpen(!intelDropdownOpen);
                      setOpsDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                      isIntelActive || intelDropdownOpen ? 'text-[#38bdf8] font-bold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>Intelligence</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${intelDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {intelDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-[#0D162B] border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-3 py-1.5 font-bold">
                        Analysis & Coordination
                      </div>
                      <div className="space-y-0.5">
                        {intelligenceItems.map((item) => {
                          const ItemIcon = item.icon;
                          const active = currentPath.startsWith(item.path);
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIntelDropdownOpen(false)}
                              className={`flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                                active ? 'bg-[#38bdf8]/15 text-[#38bdf8]' : 'text-white/80 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <ItemIcon className="w-4 h-4 mt-0.5 text-[#55D6A7] shrink-0" />
                              <div>
                                <div className="text-xs font-bold leading-tight">{item.label}</div>
                                <div className="text-[10.5px] text-white/50 leading-tight mt-0.5">{item.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

          </nav>

          {/* 3. Right: Evaluator Switcher, Profile & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Unauthenticated: Sign In CTA */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/citizen/sos"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF5D67] text-white text-xs font-bold shadow-md hover:bg-[#ff434e] transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>Report SOS</span>
                </Link>
                <Link
                  to="/login"
                  className="btn-primary text-xs py-1.5 sm:py-2 px-3 sm:px-4 font-semibold shrink-0"
                >
                  <span>Portal Sign In</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-2.5">
                
                {/* Evaluator Quick Role Switcher Pill (Optimized layout) */}
                <button
                  type="button"
                  onClick={() => {
                    if (isCitizen) {
                      quickDemoLogin('operator');
                      navigate('/operator/dashboard');
                    } else {
                      quickDemoLogin('citizen');
                      navigate('/citizen/dashboard');
                    }
                  }}
                  title={isCitizen ? 'Switch to Operator EOC Demo' : 'Switch to Citizen Civilian Demo'}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white/90 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                  <span>{isCitizen ? 'To EOC 🛡️' : 'To Citizen 👤'}</span>
                </button>

                {/* Active User Badge (Clean width, never overflows) */}
                <Link
                  to={isCitizen ? '/citizen/profile' : '/operator/settings'}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-[#0D162B] border border-white/15 hover:border-[#38bdf8]/50 text-white shrink-0 transition-colors"
                  title={`Logged in as ${user?.fullName || 'User'} (${user?.role})`}
                >
                  {isCitizen ? (
                    <Users className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  ) : (
                    <Radio className="w-3.5 h-3.5 text-[#55D6A7] shrink-0" />
                  )}
                  <span className="max-w-[100px] sm:max-w-[130px] truncate">{user?.fullName || 'User'}</span>
                  <span className="text-[10px] font-mono text-white/50 uppercase">
                    [{isCitizen ? 'Citizen' : 'EOC'}]
                  </span>
                </Link>

                {/* Sign Out Button */}
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="p-1.5 sm:p-2 rounded-full text-white/50 hover:text-[#FF5D67] hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
                  title="Sign out of DisasterOS"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 lg:hidden shrink-0 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#05070d]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          
          {/* Unauthenticated Mobile Links */}
          {!isAuthenticated && (
            <div className="flex flex-col space-y-1">
              <Link to="/" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Overview</Link>
              <Link to="/citizen/map" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Public Map</Link>
              <Link to="/citizen/alerts" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Public Alerts</Link>
              <Link to="/operator/shelters" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Shelters</Link>
              <Link to="/operator/analytics" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Analytics</Link>
              <div className="pt-2 flex flex-col gap-2">
                <Link to="/citizen/sos" className="p-2.5 rounded-xl bg-rose-600 text-white font-bold text-center text-xs">Report SOS</Link>
                <Link to="/login" className="btn-primary text-center text-xs py-2">Portal Sign In</Link>
              </div>
            </div>
          )}

          {/* Citizen Mobile Links */}
          {isCitizen && (
            <div className="flex flex-col space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#38bdf8] font-bold px-2 mb-1">Citizen Portal</div>
              <Link to="/citizen/dashboard" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Citizen Home</Link>
              <Link to="/citizen/sos" className="p-2 rounded text-sm text-rose-400 font-bold hover:bg-white/5">🚨 Report SOS</Link>
              <Link to="/citizen/track" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Track My SOS</Link>
              <Link to="/citizen/map" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Safe Map</Link>
              <Link to="/citizen/alerts" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Public Alerts</Link>
              <Link to="/citizen/assistant" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">AI Assistant</Link>
              <Link to="/citizen/profile" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Profile & Settings</Link>
            </div>
          )}

          {/* Operator Mobile Links */}
          {isOperator && (
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#38bdf8] font-bold px-2">EOC Command</div>
                <Link to="/operator/dashboard" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Command Center</Link>
                <Link to="/operator/incidents" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Incidents Queue</Link>
                <Link to="/operator/map" className="p-2 rounded text-sm text-white/80 hover:bg-white/5">Tactical GIS Map</Link>
              </div>

              <div className="flex flex-col space-y-1 pt-2 border-t border-white/5">
                <div className="text-[10px] font-mono uppercase text-[#38bdf8] font-bold px-2">Operations & Resources</div>
                {operationItems.map(item => (
                  <Link key={item.path} to={item.path} className="p-2 rounded text-xs text-white/80 hover:bg-white/5 flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-1 pt-2 border-t border-white/5">
                <div className="text-[10px] font-mono uppercase text-[#55D6A7] font-bold px-2">Intelligence & Audit</div>
                {intelligenceItems.map(item => (
                  <Link key={item.path} to={item.path} className="p-2 rounded text-xs text-white/80 hover:bg-white/5 flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-[#55D6A7]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </header>
  );
};
