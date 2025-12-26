import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, X, Calendar, MessageCircle, FileText, Image as ImageIcon, 
  Shield, Heart, Clock, MapPin, User, CheckCircle, ArrowRight,
  Baby, BookOpen, Utensils, Lock, Bell, Download, Upload, LogOut,
  ChevronRight, Star, Mail, Phone, Instagram
} from 'lucide-react';

// --- Types ---

type ViewState = 'HOME' | 'ABOUT' | 'SETTING' | 'LEARNING' | 'FEES' | 'AVAILABILITY' | 'CONTACT' | 'PORTAL_LOGIN' | 'PORTAL_DASHBOARD' | 'ADMIN';

// --- Components ---

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }: any) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-sage-500 text-white hover:bg-sage-600 shadow-md hover:shadow-lg",
    secondary: "bg-white text-sage-600 border-2 border-sage-500 hover:bg-sage-50",
    outline: "border-2 border-white text-white hover:bg-white hover:text-sage-600",
    ghost: "text-sage-600 hover:bg-sage-50"
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

const Section = ({ title, subtitle, bg = 'white', children, id }: any) => (
  <section id={id} className={`py-16 md:py-24 px-4 md:px-8 ${bg === 'sage' ? 'bg-sage-50' : 'bg-white'}`}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-sage-800 mb-4">{title}</h2>
        {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

const Card = ({ title, icon: Icon, children, className = '' }: any) => (
  <div className={`bg-white p-8 rounded-2xl shadow-sm border border-sage-100 hover:shadow-md transition-shadow ${className}`}>
    <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center text-sage-600 mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3 font-display">{title}</h3>
    <div className="text-gray-600 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

// --- Page Content Components ---

const Navigation = ({ currentView, setView, isMobileMenuOpen, setIsMobileMenuOpen }: any) => {
  const navItems = [
    { label: 'Home', view: 'HOME' },
    { label: 'About', view: 'ABOUT' },
    { label: 'Setting & Routine', view: 'SETTING' },
    { label: 'Learning', view: 'LEARNING' },
    { label: 'Fees', view: 'FEES' },
    { label: 'Contact', view: 'CONTACT' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sage-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('HOME')}
          >
            <div className="w-10 h-10 bg-sage-500 rounded-full flex items-center justify-center text-white font-display font-bold text-xl">
              LP
            </div>
            <span className="font-display font-bold text-xl text-sage-800 hidden sm:block">
              Little People <span className="text-sage-500">Childminding</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setView(item.view)}
                className={`text-sm font-medium transition-colors ${
                  currentView === item.view ? 'text-sage-600 font-bold' : 'text-gray-500 hover:text-sage-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="primary" 
              className="px-4 py-2 text-sm"
              onClick={() => setView('PORTAL_LOGIN')}
            >
              <Lock size={14} /> Parent Portal
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-sage-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-sage-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setView(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
                  currentView === item.view ? 'bg-sage-50 text-sage-700' : 'text-gray-600 hover:bg-gray-50'
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
                className="block w-full text-left px-3 py-4 rounded-md text-base font-medium text-sage-600 hover:bg-sage-50 font-bold"
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
    {/* Hero */}
    <div className="relative bg-sage-600 text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1596464716127-f9a0859b4bce?auto=format&fit=crop&q=80" 
          alt="Children playing outdoors" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
          Safe, nurturing, play-based<br/> learning in Biggleswade
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-sage-50">
          A professional home-from-home setting where little people grow, learn, and thrive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => setView('AVAILABILITY')}>Check Availability</Button>
          <Button variant="outline" onClick={() => setView('CONTACT')}>Book a Visit</Button>
        </div>
      </div>
    </div>

    {/* Why Choose Us */}
    <Section title="Why Little People?" subtitle="We provide a warm, inclusive environment focused on your child's happiness.">
      <div className="grid md:grid-cols-3 gap-8">
        <Card title="Safety First" icon={Shield}>
          <p>Fully Ofsted registered, pediatric first-aid trained, and DBS checked. Your child’s safety is our absolute priority in our secure home setting.</p>
        </Card>
        <Card title="Learning Through Play" icon={Baby}>
          <p>We follow the EYFS framework, using open-ended play to spark curiosity. Every day brings new adventures in our garden and playroom.</p>
        </Card>
        <Card title="Daily Updates" icon={MessageCircle}>
          <p>Miss them while you work? Get real-time photo updates, meal logs, and nap times straight to your phone via our secure Parent Portal.</p>
        </Card>
      </div>
    </Section>

    {/* Quick Facts Strip */}
    <div className="bg-sage-100 py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-3xl font-bold text-sage-700 font-display mb-1">0-5</div>
          <div className="text-sm text-sage-900 uppercase tracking-wide">Years Old</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-sage-700 font-display mb-1">Mon-Fri</div>
          <div className="text-sm text-sage-900 uppercase tracking-wide">07:30 - 18:00</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-sage-700 font-display mb-1">Funded</div>
          <div className="text-sm text-sage-900 uppercase tracking-wide">Hours Accepted</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-sage-700 font-display mb-1">Biggleswade</div>
          <div className="text-sm text-sage-900 uppercase tracking-wide">Town Centre</div>
        </div>
      </div>
    </div>

    {/* Testimonial */}
    <Section bg="white">
      <div className="bg-cream p-8 md:p-12 rounded-3xl text-center border border-sage-100">
        <div className="flex justify-center mb-6">
          {[1,2,3,4,5].map(i => <Star key={i} className="text-yellow-400 fill-current" size={24} />)}
        </div>
        <p className="text-xl md:text-2xl font-display text-gray-700 italic mb-6">
          "Finding Little People Childminding was the best thing for our family. Our son runs in every morning with a huge smile. The daily photos give us such peace of mind!"
        </p>
        <p className="font-bold text-sage-800">– Sarah & Tom, Biggleswade</p>
      </div>
    </Section>
  </>
);

// --- View: About ---
const AboutView = () => (
  <div className="pt-10 pb-20 max-w-4xl mx-auto px-4">
    <h1 className="text-4xl font-display font-bold text-sage-800 mb-8 text-center">About Us</h1>
    
    <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
      <img 
        src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80" 
        alt="Childminder reading" 
        className="w-full md:w-1/3 rounded-2xl shadow-lg object-cover aspect-[3/4]"
      />
      <div className="flex-1 space-y-4 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-display font-bold text-sage-700">Hello, I'm Sarah!</h2>
        <p>
          I have been a registered childminder in Biggleswade for over 8 years. My passion is creating a warm, nurturing environment where children feel safe to explore and express themselves.
        </p>
        <p>
          Before childminding, I worked in local nurseries, gaining my Level 3 Early Years Educator qualification. I believe that every child is unique and learns best when they are happy, secure, and having fun.
        </p>
        <div className="bg-sage-50 p-6 rounded-xl border border-sage-100 mt-6">
          <h3 className="font-bold text-sage-800 mb-2 flex items-center gap-2"><CheckCircle size={20}/> Qualifications & Training</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Ofsted Registered (Grade: Good)</li>
            <li>• Paediatric First Aid (Updated annually)</li>
            <li>• Level 3 Diploma in Early Years Workforce</li>
            <li>• Advanced Safeguarding Lead</li>
            <li>• Food Hygiene Level 2</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-sage-100">
        <h3 className="text-xl font-bold text-sage-800 mb-4 flex items-center gap-2"><Shield className="text-sage-500"/> Safeguarding</h3>
        <p className="text-gray-600">
          The welfare of every child is paramount. I adhere to strict safeguarding policies and procedures to ensure a safe environment. All household members over 16 are DBS checked.
        </p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-sage-100">
        <h3 className="text-xl font-bold text-sage-800 mb-4 flex items-center gap-2"><Heart className="text-sage-500"/> Our Values</h3>
        <p className="text-gray-600">
          Kindness, patience, and emotional regulation are at the core of my practice. We teach children to be kind to themselves and others through modeling and gentle guidance.
        </p>
      </div>
    </div>
  </div>
);

// --- View: Setting ---
const SettingView = () => (
  <div className="pt-10 pb-20">
    <div className="max-w-4xl mx-auto px-4 text-center mb-12">
      <h1 className="text-4xl font-display font-bold text-sage-800 mb-4">Setting & Routine</h1>
      <p className="text-lg text-gray-600">
        Children thrive on routine. While we remain flexible to follow the children's interests, our day follows a reassuring rhythm.
      </p>
    </div>

    {/* Timeline */}
    <div className="max-w-3xl mx-auto px-4 mb-20 relative">
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-sage-200"></div>
      
      {[
        { time: '07:30', title: 'Arrival & Breakfast', desc: 'Welcome, free play, and healthy breakfast choices.' },
        { time: '09:00', title: 'Morning Activity', desc: 'Planned EYFS activity, messy play, or outing to Biggleswade parks.' },
        { time: '10:30', title: 'Snack Time', desc: 'Fruit, milk/water, and story time.' },
        { time: '11:00', title: 'Garden Play', desc: 'Outdoor exploration, sandpit, and physical play.' },
        { time: '12:00', title: 'Lunch', desc: 'Home-cooked nutritious meal eaten together.' },
        { time: '13:00', title: 'Quiet Time / Nap', desc: 'Sleep for younger ones, reading/puzzles for older children.' },
        { time: '14:30', title: 'Afternoon Play', desc: 'Child-led play, music, and creative arts.' },
        { time: '16:00', title: 'Tea Time', desc: 'Light meal before home time.' },
        { time: '17:30', title: 'Home Time', desc: 'Handover chats and farewells.' },
      ].map((item, i) => (
        <div key={i} className="relative pl-24 pb-12 last:pb-0 group">
          <div className="absolute left-2 top-0 bg-white border-4 border-sage-400 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs text-sage-700 z-10">
            {item.time}
          </div>
          <div className="bg-white p-6 rounded-xl border border-sage-100 shadow-sm group-hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-sage-800 mb-1">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Info Cards */}
    <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
      <div className="bg-sage-50 p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Utensils className="text-sage-600" />
          <h3 className="text-xl font-bold text-sage-800">Meals & Nutrition</h3>
        </div>
        <p className="text-gray-700 mb-4">
          We provide healthy, balanced home-cooked meals. I cater to all dietary requirements and allergies. Fresh water is available all day.
        </p>
        <p className="text-sm text-gray-500 italic">Sample menu: Shepherd's pie with veggies, Fruit salad, Oatcakes.</p>
      </div>

       <div className="bg-sky-50 p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="text-sky-600" />
          <h3 className="text-xl font-bold text-sky-800">Out & About</h3>
        </div>
        <p className="text-gray-700">
          We love Biggleswade! We regularly visit the Library, Franklin's Recreation Ground, and take nature walks along the River Ivel. Fresh air is a daily non-negotiable!
        </p>
      </div>
    </div>
  </div>
);

// --- View: Learning ---
const LearningView = () => (
  <div className="pt-10 pb-20 max-w-5xl mx-auto px-4">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-display font-bold text-sage-800 mb-4">Learning & Development</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        We follow the Early Years Foundation Stage (EYFS) framework, ensuring your child learns through what they do best: play!
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[
        { title: 'Communication', desc: 'Storytelling, singing, and constant chatter to build vocabulary.' },
        { title: 'Physical', desc: 'Climbing, dancing, threading beads - building gross and fine motor skills.' },
        { title: 'PSED', desc: 'Personal, Social, and Emotional Development. Learning to share, take turns, and manage feelings.' },
        { title: 'Literacy', desc: 'A love for books, mark-making, and recognizing sounds.' },
        { title: 'Maths', desc: 'Counting steps, sorting colours, measuring baking ingredients.' },
        { title: 'Understanding the World', desc: 'Exploring nature, seasons, and our local community.' },
      ].map((area, i) => (
        <div key={i} className="bg-white border border-sage-100 p-6 rounded-xl hover:border-sage-300 transition-colors">
          <h3 className="font-bold text-sage-700 mb-2">{area.title}</h3>
          <p className="text-sm text-gray-600">{area.desc}</p>
        </div>
      ))}
    </div>

    <div className="bg-cream rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-sage-800 mb-4">Learning Journeys</h2>
        <p className="text-gray-700 mb-4">
          Every child has a digital 'Learning Journey' which you can access via the Parent Portal. We document "wow" moments, developmental milestones, and creative artwork.
        </p>
        <p className="text-gray-700">
          We hold termly reviews to discuss progress, but our door is always open for a chat about how your little one is doing.
        </p>
      </div>
      <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow-md rotate-2">
         <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
           <ImageIcon size={40} />
         </div>
         <p className="font-handwriting text-gray-600 text-center">"Look, I made a tower!" - Jack, 3y</p>
      </div>
    </div>
  </div>
);

// --- View: Fees ---
const FeesView = ({ setView }: any) => (
  <div className="pt-10 pb-20 max-w-4xl mx-auto px-4">
    <h1 className="text-4xl font-display font-bold text-sage-800 mb-8 text-center">Fees & Funding</h1>
    
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Standard Rates */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-sage-100">
        <h2 className="text-2xl font-bold text-sage-700 mb-6">Standard Rates</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-700 font-medium">Hourly Rate</span>
            <span className="text-xl font-bold text-sage-800">£6.50</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-700 font-medium">Full Day (08:00 - 18:00)</span>
            <span className="text-xl font-bold text-sage-800">£60.00</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-700 font-medium">Before School (from 07:30)</span>
            <span className="text-xl font-bold text-sage-800">£8.00</span>
          </div>
        </div>
        <div className="mt-8 bg-sage-50 p-4 rounded-lg text-sm text-sage-800">
          <strong>Includes:</strong> All meals, snacks, wipes, and playgroup fees. <br/>
          <strong>Excludes:</strong> Nappies, formula milk.
        </div>
      </div>

      {/* Funding */}
      <div className="bg-sky-50 p-8 rounded-2xl border-2 border-sky-100">
        <h2 className="text-2xl font-bold text-sky-700 mb-6">Funded Hours</h2>
        <p className="text-gray-700 mb-4">
          We are pleased to accept government funding for eligible families.
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-sky-600"/> 15 Hours (2 year olds)</li>
          <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-sky-600"/> 15 Hours (3 & 4 year olds)</li>
          <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-sky-600"/> 30 Hours (Working parents)</li>
        </ul>
        <p className="text-sm text-gray-600">
          Consumables charge may apply for funded hours. Please contact us for a personalized quote.
        </p>
      </div>
    </div>

    {/* Quote Form */}
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-sage-800 mb-6 text-center">Request a Quote</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Parent Name" className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none" />
          <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none" />
        </div>
        <select className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none text-gray-600">
          <option>Number of days needed?</option>
          <option>1 Day</option>
          <option>2 Days</option>
          <option>3 Days</option>
          <option>Full Time</option>
        </select>
        <textarea placeholder="Tell us about your child (Age, specific needs...)" rows={3} className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none"></textarea>
        <Button className="w-full justify-center">Get Quote</Button>
      </form>
    </div>
  </div>
);

// --- View: Contact ---
const ContactView = () => (
  <div className="pt-10 pb-20 max-w-6xl mx-auto px-4">
     <div className="text-center mb-16">
      <h1 className="text-4xl font-display font-bold text-sage-800 mb-4">Get in Touch</h1>
      <p className="text-lg text-gray-600">
        We'd love to welcome you for a visit.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-sage-100 shadow-sm">
           <h3 className="text-xl font-bold text-sage-800 mb-4">Contact Details</h3>
           <div className="space-y-4">
             <div className="flex items-center gap-3 text-gray-600">
               <div className="w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center text-sage-600"><Phone size={20}/></div>
               <span>07123 456 789</span>
             </div>
             <div className="flex items-center gap-3 text-gray-600">
               <div className="w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center text-sage-600"><Mail size={20}/></div>
               <span>hello@littlepeoplebiggleswade.co.uk</span>
             </div>
             <div className="flex items-center gap-3 text-gray-600">
               <div className="w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center text-sage-600"><Instagram size={20}/></div>
               <span>@LittlePeopleBiggleswade</span>
             </div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sage-100 shadow-sm h-64 flex items-center justify-center bg-gray-100 relative overflow-hidden">
            {/* Map Placeholder */}
            <div className="text-center">
              <MapPin size={48} className="text-sage-400 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">Located near Biggleswade Town Centre</p>
              <p className="text-xs text-gray-400">(Exact address provided upon booking)</p>
            </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-sage-50">
        <h3 className="text-2xl font-bold text-sage-800 mb-6">Send an Enquiry</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2 sm:col-span-1">
               <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
               <input type="text" className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none" />
             </div>
             <div className="col-span-2 sm:col-span-1">
               <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
               <input type="tel" className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none" />
             </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Child's Age</label>
            <input type="text" className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none"></textarea>
          </div>
          <Button className="w-full justify-center">Send Message</Button>
        </form>
      </div>
    </div>
  </div>
);

// --- Parent Portal Components ---

const FeedItem = ({ type, time, content, image, author }: any) => {
  const icons = {
    meal: { icon: Utensils, bg: 'bg-orange-100', text: 'text-orange-600' },
    sleep: { icon: Clock, bg: 'bg-blue-100', text: 'text-blue-600' },
    nappy: { icon: User, bg: 'bg-purple-100', text: 'text-purple-600' },
    activity: { icon: ImageIcon, bg: 'bg-green-100', text: 'text-green-600' },
    update: { icon: MessageCircle, bg: 'bg-gray-100', text: 'text-gray-600' }
  };
  
  const theme = icons[type as keyof typeof icons] || icons.update;
  const Icon = theme.icon;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
       <div className="flex items-start gap-3">
         <div className={`w-10 h-10 rounded-full ${theme.bg} flex items-center justify-center ${theme.text} shrink-0`}>
           <Icon size={18} />
         </div>
         <div className="flex-1">
           <div className="flex justify-between items-start">
             <h4 className="font-bold text-gray-800 text-sm">{author} <span className="font-normal text-gray-500">• {time}</span></h4>
           </div>
           <p className="text-gray-700 mt-1 text-sm">{content}</p>
           {image && (
             <div className="mt-3 rounded-lg overflow-hidden h-48 w-full bg-gray-100 relative">
               <img src={image} alt="Activity" className="w-full h-full object-cover" />
             </div>
           )}
           <div className="mt-3 flex gap-4">
             <button className="text-xs font-medium text-gray-500 hover:text-sage-600 flex items-center gap-1"><Heart size={14}/> Like</button>
             <button className="text-xs font-medium text-gray-500 hover:text-sage-600 flex items-center gap-1"><MessageCircle size={14}/> Comment</button>
           </div>
         </div>
       </div>
    </div>
  );
};

const PortalView = ({ userType = 'PARENT', setView }: any) => {
  const [activeTab, setActiveTab] = useState('FEED'); // FEED, CHAT, DOCS
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Portal Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
           <h1 className="font-bold text-sage-800 flex items-center gap-2">
             <Lock size={16} className="text-sage-500"/>
             {userType === 'ADMIN' ? 'Admin Dashboard' : 'Parent Portal'}
           </h1>
           <button onClick={() => setView('HOME')} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
             <LogOut size={16}/> Sign Out
           </button>
        </div>
        {/* Tabs */}
        <div className="max-w-3xl mx-auto px-4 flex gap-6 overflow-x-auto scrollbar-hide">
          {['FEED', 'CHAT', 'DOCUMENTS', userType === 'ADMIN' ? 'INVOICES' : ''].filter(Boolean).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                ? 'border-sage-500 text-sage-800' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6">
        {activeTab === 'FEED' && (
          <div className="space-y-6">
            {userType === 'ADMIN' && (
              <div className="bg-white p-4 rounded-xl border border-sage-200 shadow-sm mb-6">
                <div className="flex gap-2 mb-3">
                   <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sage-600"><Baby size={16}/></div>
                   <input className="flex-1 bg-gray-50 rounded-lg px-3 text-sm outline-none focus:ring-1 focus:ring-sage-300" placeholder="Post an update for Leo..." />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"><ImageIcon size={18}/></button>
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"><Utensils size={18}/></button>
                  </div>
                  <Button className="py-1 px-4 text-xs">Post</Button>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-end mb-2">
               <h2 className="text-lg font-bold text-gray-800">Today</h2>
               <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-100">Leo (2y 4m)</span>
            </div>

            <FeedItem 
              type="activity" 
              time="14:30" 
              author="Sarah (Childminder)" 
              content="We had so much fun painting autumn leaves today! Leo loved mixing the red and yellow paints."
              image="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80"
            />
            <FeedItem 
              type="meal" 
              time="12:15" 
              author="Sarah (Childminder)" 
              content="Lunch: Tuna pasta bake with sweetcorn. Leo ate it all! 🌟"
            />
            <FeedItem 
              type="sleep" 
              time="13:00" 
              author="System" 
              content="Leo went down for a nap."
            />
          </div>
        )}

        {activeTab === 'CHAT' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 font-bold">S</div>
                 <div>
                   <h3 className="font-bold text-gray-800 text-sm">Sarah (Childminder)</h3>
                   <span className="text-xs text-green-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Online</span>
                 </div>
              </div>
            </div>
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
              <div className="flex justify-end">
                <div className="bg-sage-500 text-white p-3 rounded-l-xl rounded-tr-xl max-w-[80%] text-sm">
                  Hi Sarah, just to let you know Leo's Grandma will be picking him up today at 5pm.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-r-xl rounded-tl-xl max-w-[80%] text-sm shadow-sm">
                  No problem, thanks for letting me know! I've added it to the diary.
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-gray-100">
               <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-sage-600"><ImageIcon size={20}/></button>
                 <input className="flex-1 bg-gray-100 rounded-full px-4 text-sm outline-none focus:ring-1 focus:ring-sage-300" placeholder="Type a message..." />
                 <button className="p-2 bg-sage-500 text-white rounded-full"><ChevronRight size={20}/></button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'DOCUMENTS' && (
          <div className="grid gap-4">
             <h2 className="text-lg font-bold text-gray-800 mb-2">Important Documents</h2>
             <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-red-50 text-red-500 rounded-lg"><FileText size={20}/></div>
                   <div>
                     <h4 className="font-bold text-gray-700 text-sm">Sick Child Policy</h4>
                     <p className="text-xs text-gray-400">PDF • 2.4 MB • Updated Oct 2023</p>
                   </div>
                </div>
                <button className="text-gray-400 hover:text-sage-600"><Download size={20}/></button>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><FileText size={20}/></div>
                   <div>
                     <h4 className="font-bold text-gray-700 text-sm">October Invoice</h4>
                     <p className="text-xs text-gray-400">PDF • Paid</p>
                   </div>
                </div>
                <button className="text-gray-400 hover:text-sage-600"><Download size={20}/></button>
             </div>
             <Button variant="outline" className="mt-4 border-dashed text-gray-500 border-gray-300">
               <Upload size={16} /> Upload Signed Form
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- View: Login ---
const LoginView = ({ setView }: any) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-sage-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-sage-100 text-center">
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mx-auto mb-6">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Secure login for Little People parents</p>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setView(isAdmin ? 'ADMIN' : 'PORTAL_DASHBOARD'); }}>
          <div className="text-left">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email</label>
            <input type="email" className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none transition-all" placeholder="you@example.com" />
          </div>
          <div className="text-left">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Password</label>
            <input type="password" className="w-full p-3 rounded-lg border border-gray-200 focus:border-sage-500 outline-none transition-all" placeholder="••••••••" />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 my-4 justify-center">
            <input type="checkbox" id="admin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            <label htmlFor="admin">Simulate Admin Mode</label>
          </div>

          <Button className="w-full justify-center">Sign In</Button>
        </form>
        
        <button onClick={() => setView('HOME')} className="mt-6 text-sm text-sage-600 hover:text-sage-800 font-medium">
          ← Back to website
        </button>
      </div>
    </div>
  );
};

// --- View: Policies ---
// Kept simple for this demo, usually would be a list of downloadable PDFs.

const Footer = ({ setView }: any) => (
  <footer className="bg-sage-900 text-white pt-16 pb-8">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12">
      <div className="col-span-1 md:col-span-2">
        <h3 className="font-display font-bold text-2xl mb-4">Little People</h3>
        <p className="text-sage-200 max-w-xs mb-6">
          Professional, loving home-based childcare in Biggleswade, Bedfordshire. 
        </p>
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-sage-800 rounded-full flex items-center justify-center hover:bg-sage-700 cursor-pointer"><Instagram size={18}/></div>
          <div className="w-8 h-8 bg-sage-800 rounded-full flex items-center justify-center hover:bg-sage-700 cursor-pointer"><Mail size={18}/></div>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4 text-sage-100">Quick Links</h4>
        <ul className="space-y-2 text-sage-300 text-sm">
          <li className="hover:text-white cursor-pointer" onClick={() => setView('HOME')}>Home</li>
          <li className="hover:text-white cursor-pointer" onClick={() => setView('ABOUT')}>About Me</li>
          <li className="hover:text-white cursor-pointer" onClick={() => setView('FEES')}>Fees & Funding</li>
          <li className="hover:text-white cursor-pointer" onClick={() => setView('PORTAL_LOGIN')}>Parent Portal</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-4 text-sage-100">Legal</h4>
        <ul className="space-y-2 text-sage-300 text-sm">
          <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          <li className="hover:text-white cursor-pointer">Safeguarding</li>
          <li className="hover:text-white cursor-pointer">Terms of Service</li>
          <li className="hover:text-white cursor-pointer">Cookie Policy</li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-sage-800 text-center text-sage-400 text-xs">
      &copy; {new Date().getFullYear()} Little People Childminding. All rights reserved. Biggleswade, UK.
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  const [currentView, setView] = useState<ViewState>('HOME');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  if (currentView === 'PORTAL_LOGIN') {
    return <LoginView setView={setView} />;
  }

  if (currentView === 'PORTAL_DASHBOARD' || currentView === 'ADMIN') {
    return <PortalView userType={currentView === 'ADMIN' ? 'ADMIN' : 'PARENT'} setView={setView} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation 
        currentView={currentView} 
        setView={setView} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <main className="flex-grow">
        {currentView === 'HOME' && <HomeView setView={setView} />}
        {currentView === 'ABOUT' && <AboutView />}
        {currentView === 'SETTING' && <SettingView />}
        {currentView === 'LEARNING' && <LearningView />}
        {currentView === 'FEES' && <FeesView setView={setView} />}
        {currentView === 'CONTACT' && <ContactView />}
        {currentView === 'AVAILABILITY' && (
          <div className="pt-20 pb-40 text-center px-4">
             <Calendar size={64} className="text-sage-400 mx-auto mb-6"/>
             <h1 className="text-3xl font-bold text-gray-800 mb-4">Availability Check</h1>
             <p className="text-gray-600 mb-8 max-w-md mx-auto">
               We currently have limited spaces for <strong className="text-sage-600">September 2024</strong>. 
               Please use the contact form to enquire about specific days.
             </p>
             <Button onClick={() => setView('CONTACT')}>Contact Us</Button>
          </div>
        )}
      </main>

      <Footer setView={setView} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
