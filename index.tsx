import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, X, Calendar, MessageCircle, FileText, Image as ImageIcon, 
  Shield, Heart, Clock, MapPin, User, CheckCircle, ArrowRight,
  Baby, BookOpen, Utensils, Lock, Bell, Download, Upload, LogOut,
  ChevronRight, Star, Mail, Phone, Instagram, Smile, Sun, Cloud, Sparkles
} from 'lucide-react';

// --- Types ---

type ViewState = 'HOME' | 'ABOUT' | 'SETTING' | 'LEARNING' | 'FEES' | 'AVAILABILITY' | 'CONTACT' | 'PORTAL_LOGIN' | 'PORTAL_DASHBOARD' | 'ADMIN';

// --- Assets ---

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1596464716127-f9a0859b4bce?auto=format&fit=crop&q=80", 
  emma: "https://raw.githubusercontent.com/capitanutgv-coder/little-people-test1/55ac742bd12b954bd9b0d162db85e7d4d7c5940f/WhatsApp%20Image%202025-12-26%20at%2022.01.10_d18e6ebc.jpg",
  toys: "https://images.unsplash.com/photo-1566004200955-e0e38f719337?auto=format&fit=crop&q=80",
  marketTown: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80", 
  riverWalk: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80", 
  messyPlay: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80", 
};

// --- Components ---

const WaveSeparator = ({ color = "text-white", flip = false }) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} -mb-1`}>
    <svg className={`relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px] ${color} fill-current`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
    </svg>
  </div>
);

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }: any) => {
  const baseStyle = "px-6 py-3 rounded-full font-display font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 justify-center";
  
  const variants = {
    primary: "bg-teal-500 text-white shadow-comic-strong hover:shadow-comic-hover active:shadow-none active:translate-y-1 border-2 border-teal-600",
    secondary: "bg-white text-teal-600 shadow-comic border-2 border-teal-100 hover:border-teal-300",
    cta: "bg-coral-500 text-white shadow-comic hover:shadow-comic-hover active:shadow-none active:translate-y-1 border-2 border-coral-600",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10",
    ghost: "text-teal-700 hover:bg-teal-50 hover:text-teal-900 shadow-none"
  };
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Section = ({ title, subtitle, bg = 'white', children, id, decor = 'none' }: any) => (
  <section id={id} className={`py-16 md:py-24 relative ${bg === 'teal' ? 'bg-teal-50' : bg === 'cream' ? 'bg-cream' : bg === 'white' ? 'bg-white' : 'bg-lilac-50'}`}>
    {decor === 'clouds' && (
      <>
        <div className="absolute top-10 left-10 text-white/60 animate-float hidden md:block"><Cloud size={80} fill="currentColor"/></div>
        <div className="absolute top-40 right-20 text-white/60 animate-float" style={{animationDelay: '1.5s'}}><Cloud size={60} fill="currentColor"/></div>
      </>
    )}
    {decor === 'sparkles' && (
      <>
         <div className="absolute top-20 left-20 text-sun-400 animate-pulse hidden md:block"><Sparkles size={40}/></div>
         <div className="absolute bottom-20 right-20 text-lilac-400 animate-pulse hidden md:block" style={{animationDelay: '1s'}}><Sparkles size={32}/></div>
      </>
    )}
    
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-teal-900 mb-4">{title}</h2>
        {subtitle && <p className="text-xl text-teal-700/80 max-w-2xl mx-auto font-medium">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

const FeatureCard = ({ title, icon: Icon, children, color = 'teal' }: any) => {
  const styles = {
    teal: 'bg-teal-100 text-teal-700',
    coral: 'bg-coral-100 text-coral-600',
    sun: 'bg-sun-100 text-sun-600',
    lilac: 'bg-lilac-100 text-lilac-600',
    mint: 'bg-mint-100 text-mint-600'
  };
  const theme = styles[color as keyof typeof styles];

  return (
    <div className="group bg-white p-8 rounded-[2rem] border-b-8 border-r-4 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-2">
      <div className={`w-16 h-16 ${theme} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
        <Icon size={32} strokeWidth={2.5} />
      </div>
      <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">{title}</h3>
      <div className="text-gray-600 leading-relaxed font-medium text-lg">
        {children}
      </div>
    </div>
  );
};

// --- Page Content Components ---

const Navigation = ({ currentView, setView, isMobileMenuOpen, setIsMobileMenuOpen }: any) => {
  const navItems = [
    { label: 'Home', view: 'HOME' },
    { label: 'About', view: 'ABOUT' },
    { label: 'Setting', view: 'SETTING' },
    { label: 'Learning', view: 'LEARNING' },
    { label: 'Fees', view: 'FEES' },
    { label: 'Contact', view: 'CONTACT' },
  ];

  return (
    <nav className="fixed w-full z-50 top-4 px-4">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-teal-100 px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('HOME')}
        >
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-display font-bold text-xl shadow-md">
            LP
          </div>
          <span className="font-display font-bold text-xl text-teal-800 hidden sm:block tracking-tight">
            Little People
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                currentView === item.view 
                ? 'bg-teal-100 text-teal-700' 
                : 'text-gray-500 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button 
            className="hidden md:flex bg-coral-500 hover:bg-coral-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md transition-transform hover:scale-105 items-center gap-2"
            onClick={() => setView('PORTAL_LOGIN')}
          >
            <Lock size={14} /> Portal
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-teal-600 bg-teal-50 rounded-full hover:bg-teal-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-teal-100 p-4 md:hidden animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setView(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-lg font-bold ${
                  currentView === item.view ? 'bg-teal-50 text-teal-700' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button
                onClick={() => {
                  setView('PORTAL_LOGIN');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-lg font-bold text-coral-600 bg-coral-50 mt-2"
              >
                Parent Portal Login
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- View: Home ---
const HomeView = ({ setView }: any) => (
  <>
    {/* Hero Section */}
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-cream overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-50/50 rounded-bl-[10rem] -z-10 hidden md:block"></div>
      <div className="absolute bottom-10 left-10 text-coral-300 animate-wiggle"><Star size={64} fill="currentColor" /></div>
      <div className="absolute top-32 right-20 text-sun-300 animate-bounce-slow"><Sun size={80} fill="currentColor" /></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-teal-600 font-bold mb-6 border border-teal-100 animate-in slide-in-from-left">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            Spaces available for Sept 2024
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-teal-900 mb-6 leading-[1.1]">
            Where little people <br/>
            <span className="text-coral-500 relative inline-block">
              grow & play
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-sun-400 fill-current -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z"></path></svg>
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto md:mx-0 font-medium leading-relaxed">
            A safe, nurturing home-from-home in Biggleswade offering funded hours, where curiosity leads the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button variant="cta" onClick={() => setView('AVAILABILITY')}>Check Availability</Button>
            <Button variant="secondary" onClick={() => setView('CONTACT')}>Book a Visit</Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-sun-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
             <img 
               src={IMAGES.hero} 
               alt="Happy children" 
               className="w-full rounded-[3rem] border-8 border-white shadow-xl"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce-slow">
               <div className="bg-teal-100 p-3 rounded-xl text-teal-600"><Shield size={24}/></div>
               <div>
                 <p className="font-bold text-gray-800 text-sm">Ofsted Rated</p>
                 <p className="text-teal-600 font-bold text-lg">Good</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    
    <WaveSeparator color="text-teal-500" />

    {/* Quick Info Strip */}
    <div className="bg-teal-500 py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        <div>
          <h3 className="text-4xl font-display font-bold mb-1">0-5</h3>
          <p className="text-teal-100 font-bold uppercase text-sm tracking-wider">Years Old</p>
        </div>
        <div>
          <h3 className="text-4xl font-display font-bold mb-1">08:30</h3>
          <p className="text-teal-100 font-bold uppercase text-sm tracking-wider">Opens Mon-Fri</p>
        </div>
        <div>
          <h3 className="text-4xl font-display font-bold mb-1">Funded</h3>
          <p className="text-teal-100 font-bold uppercase text-sm tracking-wider">Hours Accepted</p>
        </div>
        <div>
          <h3 className="text-4xl font-display font-bold mb-1">SG18</h3>
          <p className="text-teal-100 font-bold uppercase text-sm tracking-wider">Biggleswade</p>
        </div>
      </div>
    </div>

    <WaveSeparator color="text-teal-500" flip />

    {/* Features */}
    <Section title="Why Little People?" subtitle="We provide a world of wonder in a safe, homely setting." decor="sparkles">
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard title="Safety First" icon={Shield} color="coral">
          Fully Ofsted registered, pediatric first-aid trained, and DBS checked. A secure home setting where you can relax knowing they are safe.
        </FeatureCard>
        <FeatureCard title="Learning Through Play" icon={Smile} color="sun">
          We follow the EYFS framework but keep it wild and fun! Open-ended play, messy days, and garden adventures every single day.
        </FeatureCard>
        <FeatureCard title="Daily Updates" icon={MessageCircle} color="teal">
          Miss them while you work? Get real-time photo updates, meal logs, and nap times straight to your phone via our secure Parent Portal.
        </FeatureCard>
      </div>
    </Section>

    {/* Location Showcase */}
    <Section bg="teal" title="Our Lovely Local Area" subtitle="We make the most of Biggleswade's parks, library, and river walks.">
       <div className="grid md:grid-cols-3 gap-6">
         <div className="bg-white p-4 rounded-3xl shadow-lg transform rotate-2 hover:rotate-0 transition-all duration-300">
           <div className="h-64 rounded-2xl overflow-hidden mb-4">
             <img src={IMAGES.riverWalk} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="River" />
           </div>
           <h3 className="font-display font-bold text-xl text-center text-teal-800">River Ivel Walks</h3>
         </div>
         <div className="bg-white p-4 rounded-3xl shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-300 md:-translate-y-10">
           <div className="h-64 rounded-2xl overflow-hidden mb-4">
             <img src={IMAGES.marketTown} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Town" />
           </div>
           <h3 className="font-display font-bold text-xl text-center text-teal-800">Library Visits</h3>
         </div>
         <div className="bg-white p-4 rounded-3xl shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300">
           <div className="h-64 rounded-2xl overflow-hidden mb-4">
             <img src={IMAGES.toys} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Playroom" />
           </div>
           <h3 className="font-display font-bold text-xl text-center text-teal-800">Our Playroom</h3>
         </div>
       </div>
    </Section>

    {/* Testimonial */}
    <Section bg="white">
      <div className="bg-sun-50 p-10 md:p-16 rounded-[4rem] text-center border-4 border-sun-100 max-w-4xl mx-auto relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg border-4 border-sun-100">
           <Heart className="text-coral-500 fill-current animate-pulse" size={40} />
        </div>
        <p className="text-2xl md:text-3xl font-display text-teal-900 mb-8 leading-relaxed">
          "Finding Little People was the best thing for our family. Our son runs in every morning with a huge smile!"
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center text-teal-700 font-bold">S</div>
          <div className="text-left">
            <p className="font-bold text-gray-800">Sarah & Tom</p>
            <p className="text-sm text-gray-500">Parents in Biggleswade</p>
          </div>
        </div>
      </div>
    </Section>
  </>
);

// --- View: About ---
const AboutView = () => (
  <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-display font-bold text-teal-900 mb-6">Hello, I'm Emma! 👋</h1>
      <p className="text-xl text-gray-600">The face behind Little People Childminding.</p>
    </div>
    
    <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-teal-50 flex flex-col md:flex-row gap-12 items-center mb-16">
      <div className="w-full md:w-1/2 relative">
         <div className="absolute top-4 -left-4 w-full h-full bg-lilac-200 rounded-[2.5rem] -z-10"></div>
         <img 
            src={IMAGES.emma} 
            alt="Emma - Childminder" 
            className="w-full rounded-[2.5rem] shadow-sm object-cover aspect-square"
         />
      </div>
      <div className="flex-1 space-y-6 text-lg text-gray-700 font-medium">
        <p>
          I am an <span className="text-coral-500 font-bold">experienced</span> registered childminder in Biggleswade. My passion is creating a warm, nurturing environment where children feel safe to explore.
        </p>
        <p>
          I worked in nurseries before setting up my own home setting, so I bring that professional EYFS knowledge into a cozy home environment.
        </p>
        
        <div className="flex flex-wrap gap-3 mt-4">
          {['Ofsted Registered', 'Paediatric First Aid', 'Level 3 Qualified', 'DBS Checked', 'Food Hygiene L2'].map(tag => (
             <span key={tag} className="px-4 py-2 bg-mint-100 text-mint-700 rounded-full text-sm font-bold border border-mint-200">
               {tag}
             </span>
          ))}
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-coral-50 p-8 rounded-[2.5rem] border-2 border-coral-100">
        <h3 className="text-2xl font-display font-bold text-coral-600 mb-4 flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm text-coral-500"><Shield size={24}/></div>
          Safeguarding
        </h3>
        <p className="text-gray-600">
          The welfare of every child is paramount. I adhere to strict safeguarding policies and all household members are DBS checked.
        </p>
      </div>
      <div className="bg-lilac-50 p-8 rounded-[2.5rem] border-2 border-lilac-100">
        <h3 className="text-2xl font-display font-bold text-lilac-600 mb-4 flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm text-lilac-500"><Heart size={24}/></div>
          Our Values
        </h3>
        <p className="text-gray-600">
          Kindness, patience, and emotional regulation are at the core of my practice. We teach children to be kind to themselves and others.
        </p>
      </div>
    </div>
  </div>
);

// --- View: Setting ---
const SettingView = () => (
  <div className="pt-32 pb-20">
    <div className="max-w-4xl mx-auto px-4 text-center mb-16">
      <h1 className="text-5xl font-display font-bold text-teal-900 mb-6">Our Daily Rhythm</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Routine helps children feel secure. We follow a rhythm, but always leave room for spontaneity!
      </p>
    </div>

    {/* Timeline */}
    <div className="max-w-3xl mx-auto px-4 mb-20 relative">
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dashed transform md:-translate-x-1/2"></div>
      
      {[
        { time: '08:30', title: 'Arrival & Brekkie', desc: 'Welcome, free play, and healthy breakfast choices.', icon: Sun, color: 'sun' },
        { time: '09:30', title: 'Morning Adventure', desc: 'Planned activity, messy play, or a trip to the park.', icon: Smile, color: 'coral' },
        { time: '10:30', title: 'Snack & Story', desc: 'Fruit, milk/water, and a good book.', icon: BookOpen, color: 'lilac' },
        { time: '11:00', title: 'Garden Time', desc: 'Fresh air, sandpit, and running around.', icon: Cloud, color: 'mint' },
        { time: '12:00', title: 'Lunch Bunch', desc: 'Home-cooked nutritious meal eaten together.', icon: Utensils, color: 'sun' },
        { time: '13:00', title: 'Nap / Quiet Time', desc: 'Recharging batteries for the afternoon.', icon: Clock, color: 'teal' },
        { time: '14:30', title: 'Creative Play', desc: 'Child-led play, music, and crafts.', icon: Smile, color: 'coral' },
        { time: '16:00', title: 'High Tea', desc: 'Light meal before home time.', icon: Utensils, color: 'lilac' },
        { time: '17:30', title: 'Home Time', desc: 'Handover chats and farewells.', icon: User, color: 'mint' },
      ].map((item, i) => (
        <div key={i} className={`relative pl-24 md:pl-0 pb-12 flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Timeline Dot */}
          <div className={`absolute left-2 md:left-1/2 md:-translate-x-1/2 top-0 bg-white border-4 border-${item.color}-400 w-14 h-14 rounded-full flex items-center justify-center text-${item.color}-500 z-10 shadow-sm`}>
            <item.icon size={24} />
          </div>

          <div className="hidden md:block w-1/2"></div>
          
          <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
             <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border-b-4 border-gray-100">
               <span className={`inline-block px-3 py-1 bg-${item.color}-100 text-${item.color}-600 rounded-full text-xs font-bold mb-2`}>{item.time}</span>
               <h3 className="font-display font-bold text-xl text-gray-800 mb-1">{item.title}</h3>
               <p className="text-gray-600 text-sm font-medium">{item.desc}</p>
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- View: Learning ---
const LearningView = () => (
  <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-display font-bold text-teal-900 mb-6">Learning & Play</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        We follow the <span className="font-bold text-coral-500">EYFS</span> framework, ensuring your child learns through what they do best: play!
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-20">
      {[
        { title: 'Communication', desc: 'Storytelling, singing, and constant chatter.', color: 'coral' },
        { title: 'Physical', desc: 'Climbing, dancing, and fine motor skills.', color: 'mint' },
        { title: 'PSED', desc: 'Making friends, sharing, and managing feelings.', color: 'lilac' },
        { title: 'Literacy', desc: 'A love for books and mark-making.', color: 'sun' },
        { title: 'Maths', desc: 'Counting steps, sorting colours, measuring.', color: 'teal' },
        { title: 'The World', desc: 'Exploring nature, bugs, and seasons.', color: 'mint' },
      ].map((area, i) => (
        <div key={i} className={`bg-white border-l-8 border-${area.color}-400 p-8 rounded-r-3xl shadow-sm hover:shadow-md transition-all hover:translate-x-1`}>
          <h3 className={`font-display font-bold text-${area.color}-500 text-xl mb-2`}>{area.title}</h3>
          <p className="text-gray-600 font-medium">{area.desc}</p>
        </div>
      ))}
    </div>

    <div className="bg-sun-50 rounded-[4rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border-4 border-white shadow-xl">
      <div className="flex-1">
        <h2 className="text-3xl font-display font-bold text-sun-600 mb-4">Documenting their Journey</h2>
        <p className="text-gray-700 mb-6 text-lg">
          Every child has a digital 'Learning Journey' on our portal. We snap "wow" moments, track milestones, and keep your artwork safe (digitally!).
        </p>
        <Button variant="secondary">Parent Portal Demo</Button>
      </div>
      <div className="w-full md:w-1/3 bg-white p-4 rounded-3xl shadow-lg rotate-3">
         <div className="w-full aspect-[4/5] bg-gray-100 rounded-2xl mb-4 overflow-hidden">
           <img src={IMAGES.messyPlay} alt="Messy play" className="w-full h-full object-cover"/>
         </div>
         <p className="font-display font-bold text-gray-800 text-center text-lg">"My Masterpiece!"</p>
         <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-wide mt-1">Jack, 3 Years Old</p>
      </div>
    </div>
  </div>
);

// --- View: Fees ---
const FeesView = ({ setView }: any) => (
  <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-display font-bold text-teal-900 mb-6">Fees & Funding</h1>
      <p className="text-xl text-gray-600">Simple, transparent pricing.</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-10 mb-20">
      {/* Standard Rates */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-t-8 border-teal-400 relative">
        <div className="absolute top-6 right-8 bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">2024</div>
        <h2 className="text-3xl font-display font-bold text-teal-800 mb-8">Standard Rates</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="text-gray-600 font-bold text-lg">Hourly Rate</span>
            <span className="text-3xl font-display font-bold text-teal-600">£8.00</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="text-gray-600 font-bold text-lg">Full Day <span className="text-sm font-normal text-gray-400 block">08:30 - 17:30</span></span>
            <span className="text-3xl font-display font-bold text-teal-600">£72.00</span>
          </div>
        </div>
        <div className="mt-8 bg-teal-50 p-6 rounded-2xl text-sm text-teal-800">
          <p className="mb-2 flex items-center gap-2"><CheckCircle size={16} className="text-teal-500"/> Includes meals, snacks, playgroups.</p>
          <p className="flex items-center gap-2"><X size={16} className="text-coral-500"/> Excludes nappies & formula.</p>
        </div>
      </div>

      {/* Funding */}
      <div className="bg-lilac-50 p-10 rounded-[3rem] border-t-8 border-lilac-400">
        <h2 className="text-3xl font-display font-bold text-lilac-700 mb-6">Funded Hours</h2>
        <p className="text-gray-600 mb-8 font-medium leading-relaxed">
          We accept government funding! This can significantly reduce your monthly bill.
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm text-gray-700 font-bold"><span className="w-8 h-8 rounded-full bg-lilac-200 flex items-center justify-center text-lilac-700">15</span> For 2 year olds</li>
          <li className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm text-gray-700 font-bold"><span className="w-8 h-8 rounded-full bg-lilac-200 flex items-center justify-center text-lilac-700">15</span> For 3 & 4 year olds</li>
          <li className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm text-gray-700 font-bold"><span className="w-8 h-8 rounded-full bg-lilac-200 flex items-center justify-center text-lilac-700">30</span> For working parents</li>
        </ul>
      </div>
    </div>

    {/* Quote Form */}
    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto text-center">
      <h3 className="text-3xl font-display font-bold text-gray-800 mb-6">Need a quote?</h3>
      <p className="text-gray-500 mb-8">Send us your details and we'll calculate your monthly fees.</p>
      <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Your Name" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-teal-400 focus:bg-white outline-none transition-colors" />
          <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-teal-400 focus:bg-white outline-none transition-colors" />
        </div>
        <textarea placeholder="Child's age and days required..." rows={3} className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-teal-400 focus:bg-white outline-none transition-colors"></textarea>
        <Button className="w-full" variant="primary">Request Quote</Button>
      </form>
    </div>
  </div>
);

// --- View: Contact ---
const ContactView = () => (
  <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
     <div className="text-center mb-16">
      <h1 className="text-5xl font-display font-bold text-teal-900 mb-6">Get in Touch</h1>
      <p className="text-xl text-gray-600">
        Come say hello! We'd love to show you around.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="bg-mint-50 p-10 rounded-[3rem] border border-mint-100">
           <h3 className="text-2xl font-display font-bold text-mint-800 mb-8">Contact Info</h3>
           <div className="space-y-6">
             <div className="flex items-center gap-4 text-gray-700 font-bold text-lg">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-mint-500 shadow-sm"><Phone size={24}/></div>
               0010
             </div>
             <div className="flex items-center gap-4 text-gray-700 font-bold text-lg">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-mint-500 shadow-sm"><Mail size={24}/></div>
               hello@littlepeople.co.uk
             </div>
             <div className="flex items-center gap-4 text-gray-700 font-bold text-lg">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-mint-500 shadow-sm"><Instagram size={24}/></div>
               @LittlePeopleBiggleswade
             </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-t-8 border-coral-400">
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-6">Send a Message</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Name" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-coral-300 focus:bg-white outline-none transition-colors" />
          <input type="email" placeholder="Email" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-coral-300 focus:bg-white outline-none transition-colors" />
          <textarea rows={4} placeholder="How can we help?" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-coral-300 focus:bg-white outline-none transition-colors"></textarea>
          <Button variant="cta" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  </div>
);

// --- Portal Views ---

const PortalView = ({ userType = 'PARENT', setView }: any) => {
  const [activeTab, setActiveTab] = useState('FEED');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-20">
      {/* Portal Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 w-full z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold">LP</div>
             <h1 className="font-display font-bold text-gray-800">
               {userType === 'ADMIN' ? 'Admin' : 'Parent Portal'}
             </h1>
           </div>
           <button onClick={() => setView('HOME')} className="text-xs font-bold text-gray-500 hover:text-coral-500 flex items-center gap-1 uppercase tracking-wide">
             Sign Out <LogOut size={14}/>
           </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6">
        {/* Mobile Tabs */}
        <div className="flex p-1 bg-white rounded-2xl shadow-sm mb-6 border border-gray-100">
          {['FEED', 'CHAT', 'DOCS'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab 
                ? 'bg-teal-500 text-white shadow-md' 
                : 'text-gray-400 hover:text-teal-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'FEED' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-2">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-coral-100 text-coral-600 rounded-2xl flex items-center justify-center">
                  <ImageIcon size={24}/>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Messy Play</h4>
                  <p className="text-xs text-gray-400 font-bold">10:30 AM</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Leo loved the autumn leaves today! We did lots of crunching and sticking.</p>
              <div className="rounded-2xl overflow-hidden h-64 w-full">
                <img src={IMAGES.messyPlay} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-sun-100 text-sun-600 rounded-2xl flex items-center justify-center">
                  <Utensils size={20}/>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Lunch</h4>
                  <p className="text-xs text-gray-400 font-bold">12:00 PM</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">Pasta Bake + Peas. Ate it all!</p>
            </div>
          </div>
        )}

        {/* Keeping other tabs simple for this vibrant update */}
        {activeTab === 'CHAT' && (
           <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
             <MessageCircle size={48} className="mx-auto text-teal-200 mb-4"/>
             <p className="text-gray-500 font-bold">Chat feature...</p>
           </div>
        )}
      </div>
    </div>
  );
}

const LoginView = ({ setView }: any) => (
  <div className="min-h-screen flex items-center justify-center bg-cream px-4 relative overflow-hidden">
    <div className="bg-white w-full max-w-sm p-10 rounded-[3rem] shadow-2xl border-4 border-white text-center relative z-10">
      <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg rotate-3">
        <Lock size={32} />
      </div>
      <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">Welcome!</h2>
      <p className="text-gray-400 mb-8 font-bold text-sm uppercase tracking-wide">Parent Portal</p>
      
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setView('PORTAL_DASHBOARD'); }}>
        <input type="email" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-teal-400 outline-none text-center font-bold text-gray-700" placeholder="Email" />
        <input type="password" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-teal-400 outline-none text-center font-bold text-gray-700" placeholder="Password" />
        <Button className="w-full justify-center shadow-lg" variant="primary">Log In</Button>
      </form>
      <button onClick={() => setView('HOME')} className="mt-8 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wide">Back to Site</button>
    </div>
  </div>
);

// --- Footer ---

const Footer = ({ setView }: any) => (
  <footer className="bg-teal-900 text-teal-50 pt-20 pb-8 rounded-t-[3rem] mt-20">
    <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h3 className="font-display font-bold text-3xl text-white mb-4">Little People</h3>
        <p className="text-teal-200/80 max-w-sm leading-relaxed">
          Creating happy memories in Biggleswade. A safe place for little imaginations to run wild.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Explore</h4>
        <ul className="space-y-3 font-medium text-teal-200">
          <li className="hover:text-white cursor-pointer" onClick={() => setView('HOME')}>Home</li>
          <li className="hover:text-white cursor-pointer" onClick={() => setView('ABOUT')}>About</li>
          <li className="hover:text-white cursor-pointer" onClick={() => setView('FEES')}>Fees</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
        <p className="text-teal-200 mb-2">0010</p>
        <p className="text-teal-200">SG18 Biggleswade</p>
      </div>
    </div>
    <div className="text-center mt-16 pt-8 border-t border-teal-800 text-teal-400 text-xs font-bold uppercase tracking-widest">
      &copy; 2024 Little People Childminding
    </div>
  </footer>
);

// --- Main App ---

const App = () => {
  const [currentView, setView] = useState<ViewState>('HOME');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [currentView]);

  if (currentView === 'PORTAL_LOGIN') return <LoginView setView={setView} />;
  if (currentView === 'PORTAL_DASHBOARD' || currentView === 'ADMIN') return <PortalView userType={currentView === 'ADMIN' ? 'ADMIN' : 'PARENT'} setView={setView} />;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation currentView={currentView} setView={setView} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main className="flex-grow">
        {currentView === 'HOME' && <HomeView setView={setView} />}
        {currentView === 'ABOUT' && <AboutView />}
        {currentView === 'SETTING' && <SettingView />}
        {currentView === 'LEARNING' && <LearningView />}
        {currentView === 'FEES' && <FeesView setView={setView} />}
        {currentView === 'CONTACT' && <ContactView />}
        {currentView === 'AVAILABILITY' && (
          <div className="pt-40 pb-40 text-center px-4 bg-teal-50">
             <div className="inline-block p-8 rounded-[3rem] bg-white text-teal-500 mb-8 shadow-xl animate-bounce-slow">
               <Calendar size={64} />
             </div>
             <h1 className="text-4xl md:text-6xl font-display font-bold text-teal-900 mb-6">Availability</h1>
             <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
               We have limited spaces for <strong className="text-coral-500">Sept 2024</strong>.
             </p>
             <Button onClick={() => setView('CONTACT')} className="px-10 py-4 text-xl">Enquire Now</Button>
          </div>
        )}
      </main>
      <Footer setView={setView} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);