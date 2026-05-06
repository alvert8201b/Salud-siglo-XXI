import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Map as MapIcon, 
  Users, 
  Heart, 
  Menu, 
  Search, 
  Filter, 
  Star, 
  Navigation, 
  Plus, 
  MoreHorizontal, 
  MessageSquare, 
  Bookmark, 
  Play, 
  Hospital, 
  Dumbbell, 
  Utensils, 
  Trees, 
  Brain, 
  Sparkles, 
  Wind, 
  Droplets, 
  Bolt, 
  MapPinPlus, 
  Navigation2 
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
type Tab = 'home' | 'map' | 'community' | 'health';
type AppState = 'splash' | 'main';

// --- Constants (Images from User Request) ---
const IMAGES = {
  yoga: "https://lh3.googleusercontent.com/aida-public/AB6AXuB--22DOzO8LeeAfpMHmzbSb1KvFFkuKMeNeuZ8GhENqHUhs2hVbbxhJkRndmoDbpMtg8rHm4DY_qXInWYh9XYaZxNXy6B06RVMIVZT_ci0oJkTcIbKDxPcrIUzKXSG0RZALEsnzFDbfsRXka0TMfxpd3ZUYCfyItBmNtdHebKfJsq0zYGxMqAwwb6H6VQZCieF4WSZfK7_Evd0EuRivqjsVQliNoPxrSNZkPu9I8DegEBiRMbEtZ00ICFxyHlM-lZJyOYO62JpQ_Cu",
  foodBowl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTGJ7tajXKXxp0s2QKEOA1MKPIPCWnG2bEyIKbtDpUjYfjjyTgQtsMMqCJSgxy5UagUNqeHuy4_XW4lC5OVFTJ2YhDNrlF8IPSoQ8Ah55uy9q6zSm4LuZnkNOp19juE82NSJ_jAtTqe6Sn0tKdQ_0sV7nWXiFFeYNhghfZjN7OkgE6TV-T-tUT5texad083o8KYnYKrlhglYllz3Ly8V8OdQsVjQ-lIoe3_TxxjcqIj1Jq5PyL4CkIGSCRzqWh9hBxePavGXT_3svD",
  avatar1: "https://lh3.googleusercontent.com/aida-public/AB6AXuACRH1euT2HdKvVkeoGwz6SwBVhH-4j1H6W96XCQ2ladcI_agc201GpgPDZbcxi67qI2ZkU7pu8P_vZ6QZyL9RA_qpje4HAEqz64RbxyAwymphHKDxUjEq-bm8Uw4vdXFSsgkJmziUboQCaJ4DNagnSpawQGSkYN7TrYRyN6ehz5qb8uroF2cEFcm5uTaSF0qxUh7_r7xYKdWh2ODA-DT0R5fsNZfBkosM0s5cLTqikMv0w2qMhiIS0ZxOBhCAD25KU3gZWBz6kgYSf",
  avatarChef: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcvug6y72QXJOvt_QSXqpiXHmldPb3kMln4vbTFrQyJSnqeO78ujWVd3D9Sj0rtpcr1U9QvSt_n9roS-xo1dVly8gBM0VdCG1Plht1ZE8UPBmI7S1dDzGY9u67G9AQ7-B3BU_LriwPUIKHQL9uIli97GJJ-KJLKNucpMeQ9DFoKh2UlWj3_pIJohQ44WeHRdUR2QI29bSNWzcCxiwlGBqX5nSEsuUfZOj5HXUmX2k1opihC1mpAosvo1n5TaFCOhxN_6dWLsnisLhx",
  avatarRunner: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-04k34awgtmdjoWbJLhOrFwlYpxelFH4bww4aW0a-OAFCT18zZ1Sb3cYGDx95OJArT0KYxbUmexALiuBKzHXBt27RecsAS4CgIckZ7oXhAYCS_TiBMLvaon9D_PoAlu8Jv5UPP3GJfC7z0arhfhpaHnsRkneL16MSSbCpqBi-y6_J71_qGZfk-6X-JoFWBVQOLDo9NpWDL-IBIw2mB4SEW2EArMwpQokTt62tnK9SLQ6hG5U5VsMmEIHaNLmHZxpILyioUdOPlAqw",
  gym: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Q4Ml3qZLSAZbQ-17kAeYSJScbzHyME6bKvGIVWQUMBqU3vkCPGWnpkcXWsR3hsOeQZqEMxbCNpASaimDxMz184QEZYDNpwV7ULYP8vtjL4zbwbk_K0KAWEplCTL40vZhs56ciUg6zbjohCwzaGhz4NABCPRmgudVEWTlLwWSZ1vUwY1FeUJWjQ2D2hdgXuFXWSp8LPCV4HKuiGyquw0Ld7C4k-VAIER3D9skBiPLNELitj5_SnHpc4z3xxP237ztsnJ-8leipxia",
  mapBg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpDpPFmyZwCjY_86u81HeddqVLZxKRrxEBbbOgZdMAcwVdHp5JnHqE2_hhBwxWl9HjMalcnm7QQZTTdTvm7i6DR_aJ8q_ACrLF6crFyHOJ792pRJaQSX2vzeGMtX8r0-32NQrsNXd0olDdOs-0RzHP1nLCak9FjUpgV3__v9VQnGi3WAqCZDJoqMuoS8XJ-vqu7fLQcuB_5MIKWC6ZqbnPzpwgv4v9IbyGZtN0zD3S47gQgN2ftamgU9n5LU8NRWYWhp07AboSU-WR",
  medBowl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4BQDlVI1qe9o3OvfbDsKztuppj12nUyd9j-bzWwvxssAnEDopUGqLGXjTS_qBrbu7e04ekFBOkVkAgrlKuDDabB7UrsQxyb8lKEPVzmSzcGozYlUNOOdzHG1llB_LcjdsNjMZC_irYVLTCmH2pRn6IlNlu-GHcCB2d8RoDTlHPl2YLTsGzpBiBwpnhW3N7H1Ky1xrmkRPoA6oFUXeN4EVVWnaESCPsL7NpxdA17Q1x2ZyFmg8IKohREVIi0IBvSQ3mODeY9GVUWpJ",
  yogaStudio: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-tJFW4QS13ucu7q3pLpbdxhkD8bOWzTBz1YmKAFXBxi1Z4QCQ4OmoM5I7UMcEGgWLjg2gQZyEeM7eYtZGkPOxwqYQGEygyjgT05PJgjy1AKX1v4u4AS1_fkJuYhxkBTwWQPb6JNZipgHv53Eca809FPfk99BisDF8GfE9Hl34YVTRQdNHP9mb2-s6UZc0OBUpSeMZJtb5j5Ajbs02jZ913U6woS7tTpFufkDHbaNby32roVgLWTqn3MQqSzeTbQ6cJyOCXHC9O2oI",
  elenaAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjrYvexZi0loImRiam1-nmv_2hXTKzfGV9r_czjTm8BIiZsGQeEglS4hOwy8WtT438kYd8xS2NXOn7kJUDKdhouEArz1Lf-7r28zOfDUKUIdZXuFF9ZE0OZxsru2hWW1FuhSM3iiNTPrzUcA-bWDMw_2ZGHjwQ-5i7nKl9_p3fQrm3TqBAp5Ls2BygrtM8LJ8DrILv_zXzZzroa9I_P5qO1sqLIvlaayXaPGVf1UL94f0l5FXY7fhv1dpwQW7iucMI8aIDscGV0dM8",
  doctorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuByDBD2Ocr2f_LglAB1CFOp8REcsPbHcBWV6NqKAqOMwhk1SjEdrnLLOwfWEZDYsSGshhWSdKREVYFJcKHtoMQTWiy7V0BzDD-Z28i8BwfG4Y2a5kD2l9wTr2Q9LHAR2OyBRf-iClHv-IbqqMJA_q_PlNIeskj4wnF-REZwnxsDnyRiIVWeiSUgjQ_8wOsNkXq4z2n1j-9-tdN5fFbOwO8dnP1rCUK3iziK4QOHJDndyd_XgmOVTEuaWkOFKJtF29mqBVDh8HP_5irb"
};

// --- Main App Component ---
export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const startJourney = () => setAppState('main');

  return (
    <div className="min-h-screen bg-background text-on-background font-body overflow-hidden flex flex-col items-center">
      <AnimatePresence mode="wait">
        {appState === 'splash' ? (
          <ScreenSplash key="splash" onStart={startJourney} />
        ) : (
          <div key="main" className="w-full max-w-lg h-screen flex flex-col relative overflow-hidden">
            <header className="flex justify-between items-center w-full px-5 py-4 border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl z-50">
              <div className="flex items-center gap-3">
                <Menu className="w-6 h-6 text-primary cursor-pointer active:scale-95 transition-transform" />
                <h1 className="text-xl font-bold text-primary font-sans tracking-tight">Salud Siglo XXI</h1>
              </div>
              <div className="relative cursor-pointer active:scale-95 transition-transform">
                <img 
                  src={IMAGES.avatar1} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" 
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary-container border-2 border-background rounded-full" />
              </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
              <AnimatePresence mode="wait">
                {activeTab === 'home' && <ScreenHome key="home" />}
                {activeTab === 'map' && <ScreenMap key="map" />}
                {activeTab === 'community' && <ScreenCommunity key="community" />}
                {activeTab === 'health' && <ScreenHealth key="health" />}
              </AnimatePresence>
            </main>

            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-Screens ---

function ScreenSplash({ onStart }: { onStart: () => void }) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full max-w-lg mx-auto px-5 h-screen flex flex-col items-center justify-between py-12 mesh-bg"
    >
      <div className="w-full flex flex-col items-center mt-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative mb-8"
        >
          <div className="absolute -inset-8 vitality-gradient rounded-full blur-3xl opacity-20" />
          <div className="relative bg-surface-variant/30 p-4 rounded-full border border-primary/20 backdrop-blur-md">
            <div className="w-24 h-24 vitality-gradient rounded-full flex items-center justify-center shadow-xl">
              <Heart className="w-12 h-12 text-on-primary fill-current" />
            </div>
          </div>
        </motion.div>
        
        <div className="text-center space-y-2">
          <h1 className="font-sans text-4xl font-bold text-primary tracking-tight">Salud Siglo XXI</h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-[280px] mx-auto opacity-80 italic">
            Tu bienestar, nuestra tecnología, una vida vital.
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-3 mb-8">
        {[
          { label: 'NUTRICIÓN', icon: Utensils, shape: 'organic-shape', color: 'bg-primary' },
          { label: 'EJERCICIO', icon: Dumbbell, shape: 'organic-shape-alt', color: 'bg-secondary' },
          { label: 'RELAX', icon: Sparkles, shape: 'organic-shape', color: 'bg-tertiary' },
          { label: 'MENTE', icon: Brain, shape: 'organic-shape-alt', color: 'bg-surface-variant border border-primary/30' },
        ].map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex flex-col items-center space-y-2"
          >
            <div className={cn("w-16 h-16 flex items-center justify-center shadow-lg", item.shape, item.color)}>
              <item.icon className="w-7 h-7 text-on-primary" />
            </div>
            <span className="font-serif text-[10px] font-bold tracking-widest text-on-surface opacity-70">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="w-full space-y-6">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full vitality-gradient text-on-primary py-5 rounded-2xl font-sans text-lg font-bold shadow-[0_12px_24px_-8px_rgba(161,181,7,0.4)] uppercase tracking-widest"
        >
          Comenzar mi viaje
        </motion.button>
        <div className="text-center">
          <span className="text-outline font-serif text-xs opacity-60 tracking-widest uppercase font-bold">VERSION 2.1 • COLOMBIA</span>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[15%] -right-10 opacity-10">
          <img src={IMAGES.yoga} className="w-48 h-48 rounded-full object-cover grayscale brightness-125" alt="" />
        </div>
        <div className="absolute bottom-[25%] -left-10 opacity-10">
          <img src={IMAGES.foodBowl} className="w-40 h-40 rounded-full object-cover grayscale brightness-125" alt="" />
        </div>
      </div>
    </motion.main>
  );
}

function ScreenHome() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 space-y-8"
    >
      <div className="space-y-2">
        <h2 className="font-sans text-2xl font-bold flex items-center gap-2">
          <span className="vitality-gradient p-1 rounded-md"><Star className="w-5 h-5 text-on-primary fill-current" /></span>
          Tips Diarios
        </h2>
        <p className="text-on-surface-variant font-body">Pequeñas acciones, grandes cambios.</p>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-5 px-5 pb-4">
        {[
          { title: 'Técnica 4-7-8: Inhala 4s, mantén 7s, exhala 8s para calmar tu mente.', category: 'RESPIRACIÓN', icon: Wind, color: 'text-tertiary', bgColor: 'bg-tertiary/10' },
          { title: 'Hidratación vital: Un vaso de agua al despertar activa tu metabolismo.', category: 'ALIMENTACIÓN', icon: Droplets, color: 'text-primary', bgColor: 'bg-primary/10' },
          { title: 'Movimiento matutino: Estira tu cuerpo durante 5 minutos cada mañana.', category: 'EJERCICIO', icon: Bolt, color: 'text-secondary', bgColor: 'bg-secondary/10' },
        ].map((tip, i) => (
          <div key={i} className="min-w-[280px] snap-center glass-card p-6 rounded-3xl space-y-4 shadow-xl border border-outline/10">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl", tip.bgColor)}>
                <tip.icon className={cn("w-5 h-5", tip.color)} />
              </div>
              <span className={cn("font-serif font-bold text-xs tracking-widest", tip.color)}>{tip.category}</span>
            </div>
            <p className="font-body text-lg leading-relaxed text-on-surface">{tip.title}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-serif text-sm font-bold tracking-widest text-outline uppercase">Tu Progreso Semanal</h3>
        <div className="glass-panel p-5 rounded-[2rem] flex flex-col gap-4">
          <div className="flex justify-between items-end h-32 gap-2">
            {[40, 65, 85, 55, 95, 70, 45].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="w-full bg-primary/20 rounded-t-lg relative group"
                >
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-40 transition-opacity rounded-t-lg" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-lg shadow-[0_0_8px_rgba(188,209,48,0.8)]" />
                </motion.div>
                <span className="text-[10px] text-outline font-bold">{"LMXJVSD"[i]}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-outline/10 flex justify-between items-center">
            <span className="text-xs font-body text-on-surface-variant">Metas cumplidas: <span className="text-primary font-bold">5/7</span></span>
            <span className="text-xs font-serif italic text-outline">Muy bien hecho, Juan!</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScreenMap() {
  const [activeFilter, setActiveFilter] = useState('Hospitales');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col relative"
    >
      <div className="absolute inset-0 z-0 h-full w-full">
        <img src={IMAGES.mapBg} className="w-full h-full object-cover opacity-80 grayscale" alt="Map" />
        {/* Mock Markers */}
        <div className="absolute top-1/4 left-1/3">
          <div className="p-2 bg-primary rounded-full shadow-lg border-2 border-white animate-bounce">
            <Hospital className="w-5 h-5 text-on-primary" />
          </div>
        </div>
        <div className="absolute top-1/2 right-1/4">
          <div className="p-2 bg-secondary rounded-full shadow-lg border-2 border-white">
            <Dumbbell className="w-5 h-5 text-on-primary" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/4">
          <div className="p-2 bg-tertiary rounded-full shadow-lg border-2 border-white">
            <Utensils className="w-5 h-5 text-on-primary" />
          </div>
        </div>
      </div>

      <div className="relative z-10 p-5 space-y-4 pointer-events-none">
        <div className="glass-card flex items-center p-1 rounded-2xl shadow-xl pointer-events-auto">
          <div className="p-3 text-primary"><Search className="w-5 h-5" /></div>
          <input 
            type="text" 
            placeholder="Buscar clínicas, gimnasios..." 
            className="flex-1 bg-transparent border-none text-on-surface placeholder:text-outline-variant font-body focus:ring-0"
          />
          <button className="p-3 text-primary"><Filter className="w-5 h-5" /></button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pointer-events-auto">
          {[
            { id: 'Hospitales', icon: Hospital, color: 'bg-primary' },
            { id: 'Gimnasios', icon: Dumbbell, color: 'bg-white font-bold' },
            { id: 'Saludable', icon: Utensils, color: 'bg-white' },
            { id: 'Parques', icon: Trees, color: 'bg-white' },
          ].map((f) => (
            <button 
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md whitespace-nowrap font-serif text-xs font-bold transition-all",
                activeFilter === f.id ? "bg-primary text-on-primary scale-105" : "bg-surface-variant/90 text-on-surface-variant"
              )}
            >
              <f.icon className="w-4 h-4" />
              {f.id}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 px-5 z-10">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-primary/20 backdrop-blur-3xl"
        >
          <img src={IMAGES.gym} className="w-20 h-20 rounded-2xl object-cover" alt="Gym" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-sans font-bold text-primary truncate">BodyTech Chapinero</h3>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">ABIERTO</span>
            </div>
            <p className="text-[10px] text-outline font-body mb-2">Calle 63 # 7-15, Bogotá</p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-secondary fill-secondary" />
              <span className="text-[11px] font-bold">4.8</span>
              <span className="text-[9px] text-outline ml-1">(2.4k reseñas)</span>
            </div>
          </div>
          <button className="bg-primary text-on-primary w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
            <Navigation2 className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      <button className="absolute bottom-32 right-6 z-20 bg-secondary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
        <MapPinPlus className="w-7 h-7" />
      </button>
    </motion.div>
  );
}

function ScreenCommunity() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-5 space-y-8"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-sans text-3xl font-bold">Comunidad Vital</h2>
          <p className="text-on-surface-variant font-body text-sm">Conecta con ciudadanos que comparten tus metas de bienestar.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o interés..." 
            className="w-full pl-12 pr-4 py-4 glass-panel rounded-2xl text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/30 transition-all border-none shadow-inner"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-serif text-xs font-bold tracking-widest text-outline uppercase">Conexiones Sugeridas</h3>
          <button className="text-primary text-xs font-serif font-bold hover:underline">Ver todos</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
          {[
            { name: 'Elena R.', role: 'Yoga Master', img: IMAGES.elenaAvatar },
            { name: 'Carlos M.', role: 'Nutrición', img: IMAGES.avatarChef },
            { name: 'Mateo P.', role: 'Maratón', img: IMAGES.avatarRunner }
          ].map((profile, i) => (
            <div key={i} className="glass-card w-36 flex-shrink-0 p-4 rounded-[2rem] text-center space-y-3 shadow-lg border border-outline/5">
              <div className="mx-auto w-16 h-16 rounded-full p-0.5 vitality-gradient">
                <img src={profile.img} className="w-full h-full rounded-full border-2 border-background object-cover" alt={profile.name} />
              </div>
              <div className="min-w-0">
                <p className="font-sans font-bold text-sm truncate">{profile.name}</p>
                <p className="text-[10px] text-outline font-serif font-bold tracking-wider uppercase mt-0.5">{profile.role}</p>
              </div>
              <button className="w-full py-2 vitality-gradient text-on-primary rounded-xl text-[10px] font-bold uppercase tracking-wider active:scale-95 transition-transform flex items-center justify-center gap-1">
                <Users className="w-3 h-3" /> Añadir
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5 pb-8">
        <h3 className="font-serif text-xs font-bold tracking-widest text-outline uppercase px-1">Tips de la Comunidad</h3>
        {[
          { title: 'El Bowl de la Energía', author: 'NutriLaura', category: 'ALIMENTACIÓN', img: IMAGES.medBowl, likes: 124, comments: 12, desc: 'Sustituye el arroz blanco por quinua real para mantener tu energía estable todo el día.', icon: Utensils },
          { title: 'Respiración 4-7-8', author: 'Elena R.', category: 'YOGA & MENTE', img: IMAGES.yogaStudio, likes: 89, comments: 45, desc: 'Ideal para reducir el cortisol antes de dormir. Inhala en 4, mantén 7 y exhala en 8.', icon: Sparkles }
        ].map((item, i) => (
          <div key={i} className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl border border-outline/10">
            <div className="relative h-48 w-full group">
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-background/80 backdrop-blur-md rounded-full text-[9px] font-bold text-primary border border-primary/20 uppercase tracking-widest flex items-center gap-1.5">
                  <item.icon className="w-3 h-3" /> {item.category}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <div className="min-w-0 space-y-1">
                  <h4 className="font-sans text-xl font-bold truncate">{item.title}</h4>
                  <p className="text-on-surface-variant text-sm font-body line-clamp-2 leading-relaxed opacity-80">{item.desc}</p>
                </div>
                <Bookmark className="w-5 h-5 text-outline cursor-pointer hover:text-primary transition-colors" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-outline/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full vitality-gradient p-0.5">
                    <div className="w-full h-full rounded-full bg-background" />
                  </div>
                  <span className="text-[12px] font-bold text-on-surface">{item.author}</span>
                </div>
                <div className="flex gap-4 text-outline">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-sans hover:text-primary transition-colors cursor-pointer">
                    <Heart className="w-4 h-4" /> <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold font-sans hover:text-primary transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" /> <span>{item.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-28 right-6 z-40">
        <button className="w-14 h-14 vitality-gradient text-on-primary rounded-2xl shadow-xl flex items-center justify-center active:scale-90 transition-transform group">
          <Plus className="w-8 h-8" />
        </button>
      </div>
    </motion.div>
  );
}

function ScreenHealth() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-10 flex flex-col items-center justify-center h-full text-center space-y-4"
    >
      <div className="w-24 h-24 vitality-gradient rounded-full flex items-center justify-center animate-pulse">
        <Heart className="w-12 h-12 text-on-primary fill-current" />
      </div>
      <h2 className="text-2xl font-bold text-primary font-sans">Módulo de Salud</h2>
      <p className="text-on-surface-variant font-body max-w-xs">Estamos procesando tus datos vitales para ofrecerte una experiencia personalizada.</p>
      <div className="w-full max-w-xs h-2 bg-surface-variant rounded-full overflow-hidden mt-6">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, repeat: Infinity }}
          className="h-full vitality-gradient"
        />
      </div>
    </motion.div>
  );
}

// --- Navigation ---

function BottomNav({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (t: Tab) => void }) {
  const tabs: { id: Tab, label: string, icon: any }[] = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'community', label: 'Comunidad', icon: Users },
    { id: 'map', label: 'Mapa', icon: MapIcon },
    { id: 'health', label: 'Salud', icon: Heart }
  ];

  return (
    <nav className="absolute bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-2xl flex justify-around items-center px-4 pt-3 pb-8 rounded-t-[2.5rem] border-t border-outline-variant/10 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 relative rounded-2xl outline-none",
            activeTab === tab.id ? "text-primary bg-primary/10 scale-105" : "text-outline hover:text-on-background opacity-60"
          )}
        >
          <tab.icon className={cn("w-6 h-6", activeTab === tab.id && "fill-current")} />
          <span className="font-sans text-[10px] font-bold mt-1.5 uppercase tracking-widest">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div 
              layoutId="bubble"
              className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}
