import React, { useState, useEffect, useRef, useMemo, useContext, createContext } from "react";
import {
  Sparkles, AlertTriangle, Rocket, Lock, Unlock, Check, ChevronRight, ChevronDown, X, Send, Menu, Globe, Trophy,
  Calendar, BookOpen, Play, FileText, Compass, Zap, Target, Award,
  ExternalLink, Plus, Minus, RotateCcw, Search, Loader2, ArrowRight, ArrowLeft,
  Clock, TrendingUp, Medal, FlaskConical, Satellite, Heart, MapPin, CheckCircle2,
  Telescope, User, Settings, ThumbsUp, ThumbsDown, Gamepad2, PenLine, ListChecks,
  CalendarDays, Star, Link2, Bold, List, Filter, Trash2, Pencil, Archive, Pin,
  Atom, Waves, Eye, Flame, Sigma, Dna, Microscope, GraduationCap, Calculator, Circle,
  Triangle, Network, Infinity, TestTube, Battery, Wrench, Layers, Magnet, Thermometer,
  Radiation, Orbit, Cpu, Binary, Gauge, Lightbulb, Ruler, Hexagon, GitBranch, Dice5,
  Wind, Droplet, Activity, Boxes
, ChevronsRight } from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════════
   QUESTA V2, data-driven architecture
   ────────────────────────────────────────────────────────────────────────────
   This single artifact file is organized as VIRTUAL MODULES so that content
   is fully separated from software. When you eject to a real repo, split at
   the banner comments into these files, no code changes needed:

     src/config/brand.js        → BRAND
     src/lib/ai.js              → callAI  (Claude now · Gemini swap inside)
     src/i18n/mn.js, en.js      → I18N.mn, I18N.en   (translators edit these)
     src/data/subjects.js       → DB.subjects  (subjects → branches → nodes)
     src/data/competitions.js   → DB.competitions (+ auto status from windows)
     src/data/announcements.js  → DB.announcements
     src/components/*           → everything below the DATA sections

   UI components contain NO hardcoded copy or content: they render purely
   from I18N + DB. Admin panel edits DB copies held in React state (V1 demo:
   edits reset on refresh, wire to a database when you add a backend).
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══ MODULE: config/brand.js ═══ */
const BRAND = {
  name: "QUESTA",
  // Official wordmark (user-provided), embedded as data URIs.
  // dark variant for light surfaces · light variant for dark surfaces.
  logoUrl: "data:image/png;base64,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",
  logoUrlLight: "data:image/png;base64,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",
};

async function callAI(system, messages) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, messages }),
  });
  if (!r.ok) throw new Error("AI request failed");
  const data = await r.json();
  return data.text;
}

/* ═══ MODULE: components/GlobalStyles ═══ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Archivo:wght@600;700;800;900&display=swap');
    html, body, #root { overflow-x: hidden; max-width: 100vw; background: #f0f2ee; }
    .q-ink { color: #2b3634; }
    textarea::-webkit-resizer { display: none; }
    .q-mono { font-family: 'Space Grotesk', ui-monospace, monospace; }
    .q-display { font-family: 'Archivo', system-ui, sans-serif; }
    .q-grain::before { content:''; position:fixed; inset:0; z-index:1; pointer-events:none; opacity:0.4; mix-blend-mode:multiply; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E"); }
    @keyframes qFloat { 0%{transform:translateY(0)} 100%{transform:translateY(-120vh)} }
    @keyframes qTwinkle { 0%,100%{opacity:.15;transform:scale(.8)} 50%{opacity:.9;transform:scale(1.15)} }
    @keyframes qPulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(109,40,217,.28)} 50%{box-shadow:0 0 0 9px rgba(109,40,217,0)} }
    @keyframes qFadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes qPopIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
    @keyframes qOrbit { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes qBlink { 0%,90%,100%{transform:scaleY(1)} 95%{transform:scaleY(.1)} }
    @keyframes qDrift { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-22px) rotate(8deg)} }
    @keyframes qDriftSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(14px)} }
    @keyframes qShoot { 0%{transform:translate(0,0) rotate(18deg);opacity:0} 8%{opacity:1} 40%{opacity:1} 60%{transform:translate(420px,140px) rotate(18deg);opacity:0} 100%{opacity:0} }
    @keyframes qBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes qBreathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.035)} }
    @keyframes qWave { 0%,60%,100%{transform:rotate(8deg)} 70%{transform:rotate(-24deg)} 80%{transform:rotate(6deg)} 90%{transform:rotate(-16deg)} }
    @keyframes qAurora { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes qGlowUnder { 0%,100%{opacity:.55;transform:translateX(-50%) scale(1)} 50%{opacity:.85;transform:translateX(-50%) scale(1.12)} }
    @keyframes qSheen { 0%{transform:translateX(-120%)} 60%,100%{transform:translateX(220%)} }
    @keyframes qRingSpin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    .q-fade-up{animation:qFadeUp .5s ease both}
    .q-pop{animation:qPopIn .25s ease both}
    .q-glow{animation:qPulseGlow 2.2s ease-in-out infinite}
    .q-bob{animation:qBob 5.5s ease-in-out infinite}
    .q-breathe{animation:qBreathe 5s ease-in-out infinite}
    .q-aurora{background-size:220% 220%;animation:qAurora 26s ease-in-out infinite}
    .q-glass{background:rgba(255,255,255,.8);backdrop-filter:blur(16px) saturate(125%);-webkit-backdrop-filter:blur(16px) saturate(125%);border:1px solid rgba(226,232,240,.85);box-shadow:0 1px 2px rgba(15,23,42,.04)}
    .q-lp{background:rgba(245,242,253,.95);backdrop-filter:blur(6px) saturate(120%);-webkit-backdrop-filter:blur(6px) saturate(120%);border:1px solid rgba(61,74,70,.2);box-shadow:0 16px 40px -18px rgba(0,0,0,.55)}
    .q-glass-dark{background:linear-gradient(160deg,rgba(30,35,72,.66),rgba(17,20,46,.62));backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);border:1px solid rgba(43,54,52,.16)}
    .q-lift{transition:transform .45s cubic-bezier(.2,.75,.2,1),box-shadow .45s cubic-bezier(.2,.75,.2,1),border-color .45s ease}
    .q-lift:hover{transform:translateY(-6px)}
    .q-cardglow{position:relative;transition:transform .45s cubic-bezier(.2,.75,.2,1),box-shadow .45s cubic-bezier(.2,.75,.2,1),border-color .3s ease}
    .q-cardglow:hover{transform:translateY(-4px);box-shadow:0 18px 40px -22px rgba(30,27,75,.26);border-color:rgba(61,74,70,.4)}
    .q-sheen{position:relative;overflow:hidden}
    .q-sheen::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.22) 50%,transparent 58%);transform:translateX(-120%);pointer-events:none}
    .q-sheen:hover::after{animation:qSheen 1.1s ease}
    .q-underglow{position:absolute;left:50%;bottom:-14px;width:70%;height:26px;border-radius:50%;background:radial-gradient(ellipse,rgba(61,74,70,.3),transparent 70%);filter:blur(9px);pointer-events:none}
    .q-grad-text{background:linear-gradient(100deg,#6d28d9,#3d4a46);-webkit-background-clip:text;background-clip:text;color:transparent}
    @media (prefers-reduced-motion: reduce){ .q-star,.q-spark,.q-glow,.q-orbit,.q-blink,.q-bob,.q-breathe,.q-aurora,.q-drift,.q-shoot,.q-ring,.q-wave{animation:none !important} }
    @keyframes qsTicker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes qsBeacon { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
    @keyframes qsDataFloat { 0%{transform:translateY(0) translateX(0);opacity:.7} 50%{transform:translateY(-12px) translateX(4px);opacity:1} 100%{transform:translateY(0) translateX(0);opacity:.7} }
    @keyframes qsReveal { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:none} }
    @keyframes qsSceneIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
    @keyframes qsNodePulse { 0%,100%{box-shadow:0 0 0 0 rgba(61,74,70,.5)} 50%{box-shadow:0 0 0 8px rgba(61,74,70,0)} }
    .qs-reveal{opacity:0;transform:translateY(36px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
    .qs-reveal.qs-in{opacity:1;transform:none}
    .qs-d1{transition-delay:.1s} .qs-d2{transition-delay:.22s} .qs-d3{transition-delay:.34s} .qs-d4{transition-delay:.46s}
    .qs-ticker-wrap{overflow:hidden;white-space:nowrap;cursor:default}
    .qs-ticker{display:inline-flex;animation:qsTicker 36s linear infinite}
    .qs-ticker:hover{animation-play-state:paused}
    .qs-beacon{animation:qsBeacon 3s ease-in-out infinite}
    .qs-data-float{animation:qsDataFloat 4s ease-in-out infinite}
    .qs-scene{animation:qsSceneIn 1.1s cubic-bezier(.16,1,.3,1) both}
    @media (max-width:640px) { .qs-big5grid { grid-template-columns: 1fr !important; } }
    .qs-slide{opacity:0;transform:translateY(60px) scale(.97);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1)}
    .qs-slide.qs-in{opacity:1;transform:none}
    @keyframes qsDrift1 { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(3%,2%) scale(1.05)} 66%{transform:translate(-2%,1%) scale(0.97)} 100%{transform:translate(0,0) scale(1)} }
    @keyframes qsFloat1 { 0%{transform:translate(0,0) rotate(0deg)} 25%{transform:translate(12px,-18px) rotate(8deg)} 50%{transform:translate(-8px,-10px) rotate(-5deg)} 75%{transform:translate(15px,-22px) rotate(6deg)} 100%{transform:translate(0,0) rotate(0deg)} }
    @keyframes qsWater1 { 0%{transform:translate(0,0) scale(1);opacity:0.7} 33%{transform:translate(15px,10px) scale(1.08);opacity:0.85} 66%{transform:translate(-10px,5px) scale(0.95);opacity:0.75} 100%{transform:translate(0,0) scale(1);opacity:0.7} }
    @keyframes qsWater2 { 0%{transform:translate(0,0) scale(1);opacity:0.8} 40%{transform:translate(-12px,8px) scale(1.06);opacity:0.65} 70%{transform:translate(8px,-6px) scale(0.97);opacity:0.85} 100%{transform:translate(0,0) scale(1);opacity:0.8} }
    @keyframes qsWater3 { 0%{transform:translate(0,0) scale(1.02);opacity:0.75} 50%{transform:translate(10px,-12px) scale(0.94);opacity:0.85} 100%{transform:translate(0,0) scale(1.02);opacity:0.75} }
    @keyframes qsFloat2 { 0%{transform:translate(0,0) rotate(0deg)} 30%{transform:translate(-15px,-20px) rotate(-10deg)} 60%{transform:translate(10px,-14px) rotate(7deg)} 100%{transform:translate(0,0) rotate(0deg)} }
    @keyframes qsFloat3 { 0%{transform:translate(0,0) rotate(0deg)} 40%{transform:translate(8px,-25px) rotate(12deg)} 70%{transform:translate(-12px,-8px) rotate(-8deg)} 100%{transform:translate(0,0) rotate(0deg)} }
    @keyframes qsDrift2 { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(-4%,3%) scale(1.08)} 100%{transform:translate(0,0) scale(1)} }
    @keyframes qsDrift3 { 0%{transform:translate(0,0) scale(1.02)} 40%{transform:translate(5%,-2%) scale(0.96)} 80%{transform:translate(-3%,2%) scale(1.04)} 100%{transform:translate(0,0) scale(1.02)} }
    .qs-node-pulse{animation:qsNodePulse 2.5s ease-in-out infinite}
    @keyframes qsTitleReveal { 0%{opacity:0;transform:translateY(30px) scale(.96);filter:blur(12px)} 100%{opacity:1;transform:none;filter:blur(0)} }
    @keyframes qsSubReveal { 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:none} }
    .qs-title-reveal{animation:qsTitleReveal 1.6s cubic-bezier(.16,1,.3,1) both}
    .qs-sub-reveal{animation:qsSubReveal 1.4s cubic-bezier(.16,1,.3,1) .6s both}
    @keyframes qsFall { 0%{transform:translateY(-16px);opacity:0} 30%{opacity:1} 100%{transform:translateY(104px);opacity:0} }
  `}</style>
);

/* ═══ MODULE: components/RobotAvatar ═══  (Questa AI, cute) */
function RobotAvatar({ size = 40 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="qbotHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a6b64" /><stop offset="100%" stopColor="#3d4a46" />
        </linearGradient>
        <radialGradient id="qbotEye" cx="0.38" cy="0.32" r="0.85">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="55%" stopColor="#dbeafe" /><stop offset="100%" stopColor="#8a938c" />
        </radialGradient>
      </defs>
      <line x1="24" y1="9.5" x2="24" y2="5" stroke="#c7d2fe" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24" cy="4" r="2.6" fill="#8a938c"><animate attributeName="opacity" values="1;.45;1" dur="2.3s" repeatCount="indefinite" /></circle>
      <rect x="6.5" y="20" width="4" height="10" rx="2" fill="#3d4a46" />
      <rect x="37.5" y="20" width="4" height="10" rx="2" fill="#3d4a46" />
      <rect x="8" y="10" width="32" height="28" rx="13" fill="url(#qbotHead)" />
      <rect x="8" y="10" width="32" height="28" rx="13" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1" />
      <rect x="12" y="16" width="24" height="16" rx="8" fill="#171335" />
      <g style={{ transformOrigin: "24px 24px", animation: "qBlink 3.8s ease-in-out infinite" }}>
        <circle cx="19" cy="24" r="3.6" fill="url(#qbotEye)" />
        <circle cx="29" cy="24" r="3.6" fill="url(#qbotEye)" />
        <circle cx="17.7" cy="22.6" r="1.15" fill="#fff" />
        <circle cx="27.7" cy="22.6" r="1.15" fill="#fff" />
      </g>
      <circle cx="13.6" cy="29.6" r="1.7" fill="#f0abfc" opacity=".6" />
      <circle cx="34.4" cy="29.6" r="1.7" fill="#f0abfc" opacity=".6" />
      <path d="M21 30.5 Q24 32.6 27 30.5" stroke="#8a938c" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <rect x="16.5" y="38" width="15" height="6.5" rx="3.25" fill="#3d4a46" />
      <circle cx="24" cy="41.2" r="1.5" fill="#8a938c"><animate attributeName="opacity" values=".55;1;.55" dur="2.7s" repeatCount="indefinite" /></circle>
    </svg>
  );
}

/* refined full-body robot mascot for the hero */
function RobotMascot({ size = 300 }) {
  const h = size * 1.16;
  return (
    <div className="relative q-bob" style={{ width: size, height: h }}>
      <div className="absolute rounded-full" style={{ left: "50%", bottom: h * 0.015, width: "48%", height: size * 0.05, transform: "translateX(-50%)", background: "radial-gradient(ellipse, rgba(61,74,70,.5), transparent 70%)", filter: "blur(8px)" }} />
      <div className="q-breathe" style={{ width: "100%", height: "100%", transformOrigin: "50% 64%" }}>
        <svg width={size} height={h} viewBox="0 0 120 140" style={{ display: "block", overflow: "visible", filter: "drop-shadow(0 26px 42px rgba(30,20,70,.5))" }}>
          <defs>
            <linearGradient id="mHead" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#9a8cf5" /><stop offset="100%" stopColor="#5b4bd6" /></linearGradient>
            <linearGradient id="mBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c6cf0" /><stop offset="100%" stopColor="#3d4a46" /></linearGradient>
            <linearGradient id="mLimb" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6b5be8" /><stop offset="100%" stopColor="#4338ca" /></linearGradient>
            <radialGradient id="mEye" cx="0.4" cy="0.32" r="0.85"><stop offset="0%" stopColor="#f0edff" /><stop offset="100%" stopColor="#8a938c" /></radialGradient>
            <radialGradient id="mCore" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#8a938c" /><stop offset="100%" stopColor="#3d4a46" /></radialGradient>
          </defs>
          {/* legs */}
          <rect x="45" y="116" width="12" height="18" rx="6" fill="url(#mLimb)" />
          <rect x="63" y="116" width="12" height="18" rx="6" fill="url(#mLimb)" />
          <ellipse cx="51" cy="135" rx="8" ry="3.4" fill="#4338ca" />
          <ellipse cx="69" cy="135" rx="8" ry="3.4" fill="#4338ca" />
          {/* left arm */}
          <rect x="16" y="76" width="11" height="30" rx="5.5" fill="url(#mLimb)" />
          <circle cx="21.5" cy="106" r="6" fill="#6b5be8" />
          {/* right arm, waving */}
          <g style={{ transformOrigin: "99px 80px", animation: "qWave 5s ease-in-out infinite" }}>
            <rect x="94" y="66" width="11" height="30" rx="5.5" fill="url(#mLimb)" />
            <circle cx="99.5" cy="66" r="6.5" fill="#8b7cf0" />
          </g>
          {/* body */}
          <rect x="33" y="74" width="54" height="46" rx="19" fill="url(#mBody)" />
          <rect x="33" y="74" width="54" height="46" rx="19" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.3" />
          <circle cx="60" cy="96" r="9.5" fill="#14132e" />
          <circle cx="60" cy="96" r="6" fill="url(#mCore)"><animate attributeName="r" values="5.4;6.8;5.4" dur="3.2s" repeatCount="indefinite" /></circle>
          {/* neck */}
          <rect x="52" y="66" width="16" height="12" rx="5" fill="#3d4a46" />
          {/* antenna */}
          <line x1="60" y1="16" x2="60" y2="7" stroke="#c7d2fe" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="60" cy="5.5" r="3.8" fill="#8a938c"><animate attributeName="opacity" values="1;.5;1" dur="2.5s" repeatCount="indefinite" /></circle>
          {/* ears */}
          <rect x="21" y="38" width="6" height="16" rx="3" fill="#3d4a46" />
          <rect x="93" y="38" width="6" height="16" rx="3" fill="#3d4a46" />
          {/* head */}
          <rect x="25" y="16" width="70" height="56" rx="24" fill="url(#mHead)" />
          <rect x="25" y="16" width="70" height="56" rx="24" fill="none" stroke="rgba(255,255,255,.24)" strokeWidth="1.3" />
          {/* visor */}
          <rect x="33" y="27" width="54" height="34" rx="16" fill="#14132e" />
          <rect x="33" y="27" width="54" height="34" rx="16" fill="none" stroke="rgba(43,54,52,.2)" strokeWidth="1" />
          {/* eyes (blink) */}
          <g style={{ transformOrigin: "60px 44px", animation: "qBlink 4.6s ease-in-out infinite" }}>
            <rect x="45" y="37" width="7.5" height="14" rx="3.75" fill="url(#mEye)" />
            <rect x="67.5" y="37" width="7.5" height="14" rx="3.75" fill="url(#mEye)" />
          </g>
          {/* subtle smile */}
          <path d="M53 55 Q60 59 67 55" stroke="#8b7cf0" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".85" />
        </svg>
      </div>
    </div>
  );
}

/* ═══ MODULE: components/Logo ═══ */
const QUESTA_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjAAAADBCAYAAADRoIr6AABLVklEQVR42u2dd5huVXX/P2+ZuXMb3AJcuogIoiDYO5ZgiVijYkFsMRpbNGqCRKOJMYoSTWKLiTVGjb13o6KgiIoISrmANOmXcrmXcmfmLb8/1lq/s+fc85azzznvvO/M+j7Pee7cmbecs/faa3/X2quAw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HI4xQs2HINf4dCsa864PtcPhcDgcTmCKjEVNCcUgUlHXq9aD6HRSv2sP8XkM+d0Oh8PhcPimvcyfv96DcADsAqwFmsA0cAiwN7AB2Kj/7qJ/MyIzB9wO3AbMA1P62VcCvwcu1r8B7NCfb8347ob+23FC43A4HA6HE5iakoMuC70iM8A+SkjWAfcFHgM8XElIFbgO+CXwfeAMJTzXAddkkJma3q+TGYfD4XA4gVkmz1kPSMBc8Ps9gYOBPYBHAE9REhOiw0LvTC1y7LKOhpoZr/sl8DXgd8AtwPnAluDv03o/TmYcDofD4QRmiaKhV0haZpSsHAg8GfGyhJgLSE+vGJey0A0IUle/J+3t+RrwTeBy4Ockx0/22hbZx18Oh8PhcDiBmTDUEe+GkZENwBORuJUjgOODZ28h3oxGQFoWE+2A1DRIvDRzwBeAs4Bzge8G75lOkTSHw+FwOJzATBhxmQJm9f8PVOJyb+Bxwes6SLyJeWjGdRwsTqdNEigMcDPildkMfFD/b0dLLRdrh8PhcDgmh4hNB/8/EPgAcBFJ7EkLyfqZIzmymaSro/e+I/X7HwN/Fzz7CiVxniLvcDgcDscYoxH8vD/w30i6sm3ws4i3ZRJJS6+rrWRmPkVkXpwam7qLh8PhcDgc4+d1sQ16E/A5pMaKbejzJJk6S/lqBT9vA34NfALJsEoTPIfD4XA4HGOCfweuSnknlgNxSR8vtVK/uxp4uouHw+FwOBzj4XUxPAxJLU4frXSX8dVJjcEsUiBvfY8xdDgcDofDMSLishI5LmqnNu6uXzuRmfCY6dVIDRwnMg6Hw+FwjAAWwzEN3B2pgzKupGXcidQZwF7B2HqQr8PhcDgcFXhdjLysA/6DnSvXjvpopoUEB6evVnBP9tr5IV476sylLnAHcBywSsd2ykXN4XA4HI5yEFbEvQfwZd18bx/R5m9BsXNIHEkV3zFHkgo9qtiddjB+HwXuEoy3Hyk5HA6HY6K8HOOGBkmX6JchRdr21c1+usLvDTf4dCG4OeAyJNtpm3oxrP9QR/+/TQlWE+lovT5jrNcCd0IaSK5I/X0ueP4qCYUF984gDSNfDpwWEEbvq+RwOBwOJzARnpcOsBp4C/A3+vsW2Z2by4D1QppOjcfZSM+h63Sj/y1wgZKVIjgEeBASz7MWOAhpdbAh456aVFfHZVZJ1Fbgn4F/Cb6r7UvD4XA4HE5g8pGXA4B/BZ6ClM2fpvxgUyt0F3Z/bgFfUeJyJVIQ7tyM9/YiFd0hxrWVQQ52A+4LHKaE5mjgwcHf7T6rIHAhMfwk8HyS7tvuiXE4HA6HYwjyAtLD6BckxxxVxZ6ERd8+A7wEeDxy9JO+L+st1Ag29yKEsaGft4LsANq7AM8A/hr4eeq+56kmLsY+9xtIcK/HxDgcDofDMSR5OQBJ8+1WsFFb9+lW8PlvAB4N7Jq6n6kUYRnF8zcRT1Pay3KAEquPsbCmS6sCImOE8XSk1o6nWDscDofDMYC87F8heUln+LwCODx1H029amMyJuljqjXIMdPbguepIp3cxv4cFmaCORwOh8PhSJGXTcDP2LkxYZnXecBz1aMRYlReliJj1Ejd752AVyLBxFU2hzzHRdThcDgcjmzyshdwaoXk5Vwk42dNj+9fTOSJp6ll3PN64PVUUwnY5uLMgDg5HA7HuMISMnrpqhVIfOHers8cRWDCsxH4IeUdG4Wb9w7g5AxBrcrbMoNkE90PeATwEOA+wJ2RGJs19M+mqucgNOnX7At8NyAdZR0t2VHVN0kCjz2w1+FwjJMRvB74AZLkcAdJgdD0ZTGQ9v/zkKSRcTFoHRMidHXdDD9VInkJ41zOUgJRtWCGlYJ/NeD+bleS8W7gRcARwH7sXOzOCF7Mfb8QuKlEb0wnGNs363dMO4lxOBxjAEt4eAJwM3Fe5iOdwDiGRdjb6KTAU1LWccftwOczCEaVXqT7IhV6jYh1ely97v1MpFjfEeqtqaXuv5FzMR8B/ISFPZnKaD1wNfAo/Q7vneRwOBYbpof+goWJDcMauzcgxUSdwDiGIi+WXfNakv4/Rb0E5r25BHjpCL0Elmr98RxELKshZPj3a9TT8UgkKyskJ8MQmfA17woWa9HYInv/ZqSKcEiYHA6HYzFgbWVex8593oYhMFucwDiGhZGXl5LUHClKXqxuyanqeQiFukoYUbgfcHFBT4cVkUsX7TsN6QN1RGrB1oYY5xn9+QQWNqYsWvyvi6S675dBmBwOh2MxCMyrIwnMtcChTmAcw3pf7gpcjwRaFT3aMI/Hl0h6CDVHvHBeTrnZUx0lCqE353zgjUivJFtowxzhrNR/XwHcVtJ9Wtr2N5DYnSlf+A6HY5EJzCvJl7xge89VJB5l12OOnuTFLPXvlbyRfiD47FF6A4woPRy4Qr0nZaeAt1JE5gKkK7dhZohFZ92un4ocsXVLII7mKXod1TaadDgcjn4wQ+4lDBdvmCYwl6lR7QTG0ZfAAPwb5WQc2aZ+ciB4i7GJWtXedwb3NaeLo4zYnnCxhUTmq8CTM8jUICvlvurNKUpi2kpiriWJ4PesJIfDsVgE5oUsLCExLIG5GKkL4wTG0ZfAPKsk8mKel3cHm/diCZ7F9GwCPkrvAOOwBsF8AfLQCsbvBiUy+6QW8iCP0T2RTttFSYwpi3ORolCuABwOx2IRmONJPMN5CMz5eB0YxwDyshqJeynqkTAvxAdI+hYtttDZ969Bqv3+ExJQfAEL67H0ykaK8dSEJPBC4MQhF6CRmMMDT0yRYy9TGCeRBBe7J8bhcIyawBwXGLd5CMy5SOkKJzCOnWDHOqdQ/BjFMmA+jsR1jFOTwVrqmTeoV2ZfZfd3Be6GxMv8JfAF4FaKB/u2AhLyXZJA5voQJOaBAcEq4omZVWJ5cMZYOBwOR5UwffZ0YFsOfeYeGMdQnon7K/ko4n0xj8PXAsY9bsJWy3FPM0gGz12AZ5L0gerXFmGY6sO/IkkJbAxBLJ9A8bYD9r6fkwQMOxwOxygJzFOBrREE5iI8BsaRASMav6NYSXvzMvws8DCMe9ZLrcfVj+xNI+e4l7Gww/Qw5CL0xpxO0m17GE/M84L3x86RKYMHudg7HI5FIDBPAm6MIDCX4VlIjj4W/i0FCIy953KSGijLIWX3HuqVubmHp2WQp+o05MjKFmVtgMfozSTF9Ip4yi4JPtvhcDhGRWCegCQ25CUwV+N1YBwpzOj1e8qpO/KilFdnKSPc/O+HeJ5mGT6DyzwxV+miHkRi7Pf/StJyoAiJeaKLv8PhmBAC472QHAtgJOMVwHbi4yvsPR9bRuQlJBZhbZdXAZcGBGXQeIb1EJ6rn9HLc2U1dFYjMUYt4jOTrIrwJry4ncPhGB2BeTL5khJMh94CHOYExmECMI3UJjmb+DRdi8k4exmSl/R4WjuAe6k3Jux4PYjE2PWUAQvUCvIdSb5z5F7f+5kBpMnhcDjKJDB/RhKuMCyB6SAtVu7pBMYBScXXt5DUOCmS2fJwJS/LPabCsnv2Bj5EklY+iMTYkdC1SBXeep+xNEVwshKkmKMke/3NwB4BMXI4YmBHnOYl7HXV8RpEecbTxrTXNUnjaHrraZEE5lakLpYTGPe+0EDqgZxF8aq7n/EhzVyoAH+bk8R0gd+ysCdVlnKbAtYGnp7Yo79Z4D9TpNbh6Kc7miorK/SaJr8Hr5l6/xTjUexyHMbUxrM25HvDcRznMTS9+BSSpIc8R0geA7PENscinzGHpLMdoRZ8zOdaHMWr9P0tnx7QcWjoonsXcCXwaV2sjQHKqKNz8j9ITExNPyeELfxbgZcBv1QF1s1pkXVV6f0psAvios36vmGRZxOrpcZrkhFz/GaKeRKerR7I5nyf+14N7I4cpa4OSIkR5Vv1ugm4vc+8myc3bPi3VEkLgXGTxoqA6M2QHNebZ6atRGB2wBi2C6zpPN6iYQ3nTs41b3ptLvgcJzC9x6o7zjfYLGHhtIA9gUcX2LBsM/5LJBbDsfP4mBflM0jlyW/o4q0PmJ82Um7788A3A8FMk8cp4BzgPcDryR9/ZPexUYnQu1S+5gs883Kd66WCWoqwtFPPdyiScXcocFBg9c8ocVmjcjgdbFgWbzWr1+1Klu9QWbse+CNwHhJLd1nGZtxdImSmGZB225D3B45C4jvurORvpT63EZ1mMAa1QAfcgRzH3IE0OzwHKZJ5SY8xrILMDLtp2vPOBuNQG1Im7RnmlzCpLVPGaqm56Y4LuSl65mlC8Hzgv/R3eY8OTHhOA/5kBAx/0mFj/kjgR4ESqg3YFK/QTaKf4JnreStxAdRGqH4APEatvdmc8tjVjepRwF5IRls/r8Q0sJt6fa5UonZ7Qe/PYqzDro7dn+jzzKbWR9g7y+Z6XufpIr26Y/Q89QwydgwSs3CIytoe+qxrSv7+jsrwjepVuAmpr/QFHac06Z60DayeWsePAv4cqSy7XtfN2hK+5xZgi47hzcD3gE/oeIb3Uub4rUWyGecD8toM1vpMsF5WAi9HvP9dhvdemly+DPihfu58MJ6dDOOumVP+w/EZllilXxce/dVTxKGWkuH0904HzxPqwtBbGybOdIKfzaO1tY9DoZZxTxNFYGrBQH1AF9BcBIExQX0oUpYeJzBDseKWKq4f6oLst1BM4L+GnBlP9fCMmKC/E4m3iSUwf9DvOZfE9TwMGvosB6un6VC9z0FeptAifBjwmwkjMLYJHIh0Gj9Q57eeeoZuhiJuAD8BnqOeiHHCnkgtpychx0EbgV37bCrpY8tB+qmbIeO91kFbN+NtKh8f0bUzqdgV+BfgEUpaNpbkzbNxbPTQ1dcqsTkP+Gf10pSBad0//l5JyawaQLXUZl1LGTrrUved5xm3Mfiou0uxQPFagdcW+c7aEGsm7fFKkxHzdNqx7YVInORvgDORI9yJhQn4w9Xijan7Yqz3vwKL3zMK8o2/9TWaY3Dg2ixwbOr9WcK/gvggbPMUvEc/L0+fJCMqm0gCwvO2nnjIBMqRzcW9kQqhecf8bPVAjYMR1ABeghzj3Ex2YGWb+I7swwaUD+r6fhtwDfBvKm9lGXZV405KWG/qM66dCsYwax63qe4uI4bEDN93VCAPfpV3tZS43Kjr53+RMhxM0Br6/14AkPiKLtKZOO9g7NBF8pABm6qj/8b3LJJz8GGykswl2k/IPkRcRpKR0i+lFFOezXAVcqQYBnoOuix48agJJDC2AdwZiT1Iu3V7Xfaan1POkUER4rIe+Cfd1Do9NsPOIivfXvcwh8SUHcTCo4JxkqGVwCcz1vgox7XXPM4CJ5LUrooZO9MTJwTrvj3EGijrefyKH+t55LjpQ+o9nxp3IpM+PhrkAej2UBpWcXeNe18KbyJWg2cYIvneIcjFvsQVtrPXX6HeuTzEtBYo69PIVxDR5OkBE0xg7kQSy5KnLPpplB9HMsz9gsSwnEix0gnjcJmC/iJJkz9YvAyV8Bjg3kiLkHEfwyuRI63piLGz97xmEYiZX+Ve308ZA2NXq8kE81Ak3qETsdFZn5+nuvel8FzUkWJ3P6J/HR4jA79Ri7lfCuEq4juKG5k4KacXphYcYZ26DAnMAZEE5qcjJDC2Tlcj/a/+SHzl7XG7wjF/KbAheOZRylPYcPUYJHanjN5yoyCAFhKwKSeJMav9xcFzOoGZXEOgi4QRHDQGxkBPhfs4vdE7iItXuJCkmJATmHgY032sKrt2jw0lPNd+wxDk4njiChMamfg0+QppGYGZQs75YwjMA53AVLap2ho9DPjvYH7aS0wBzwWW5H0ySMWoxvl4JGC2MyFjHI7dGUhrGRgug8cIzHORmEonMJO9hmzPuE2dFGtzyEKUKzgPOrrI7kW+9DWDnW1+Bolmz0q5dAyPlhKF7wHvo3daW40ku+WB6mXp9jnKOTWSDFi9jqOABzO46F4ayzULLdbV2h3Bfdm6fTaSvfM89aI2WFqFwIxAt5DaVj/VTdUUc30E899Gsrc+oMS0iu/tVjh2O4D7IyUNNpAU4xxWl3ldlslfQ5YpOwN8GfigGmgtSuxxWC/wnn2Q1OkY74lZM5fSv8y9Iz+J+V8kfbnZgxTa7x+KHAHM9/HCbEfS5Ro5lYoVONwXiVDPY73WmIAKkBUThXEiMGGthxPU6NhD53dFid8T1qSY12uOpGBdr2uOnXt4leXVbCPxWP8D/AOS6dWpUF+ZLnwekiK9OtJATBuL6bGcD35vYzgX/L7oGM7o5z0YiXFcN8Q+Yd9p97OcDZmlgrA69HNVd9xtwJ4zEg8MKpR3CSz6PAtqCgn4upDJKYM+7rAxvAjJqGj32BDNwtuIpGBPsbAiZ6g4blYF1CW/h8w2vT1zvN9qxoTFq8bNGzGOHpiqYMR1NRL4fRJJtldRV7AdP9nGaoX8miqTVsRsxYAr3fuoHWzSnRKe344n3wK8X+W5Tcmu8ED2DwfejdR5iSVLnYCUNDLGcioYZxtDG8dGMIZFvOJW1+XJSKNYK6w2SL6nlAA5lgasTtcc8CA1sA/V/xf2xDQjFQ8krs1uxOJqID13zkltvo7iXpgmEkT3ZyooWe7n0EV+NPAddu4/ZcXVzoqcIys6dW+12K9n+Kqdq1iezSDHjby0de7+HUnVN6VT5D6tpkgjQ/9cDFyO1Je4Ra8bkHP0XkedmxBP375q3R2Y+tw5Epd2zH2bAp5HYlJWAq9AYs0alHP0bfe1HolN2424oqCwsIItiDf2LDUWtyLxJbOBZ2e96vJ5pILv/dVz0gw8Is1IIjWl738xcD5yJGbz0e1hTN+d5BgqHN+sIm9GeusF9OViGTzdHDqguwh6J+xeXivh863a8ZHA54BnqkwU6nsYS2BqSA+TGOExy/wiVUzeuLFcL0wTSWG+RAlMP2tvkyqs7wTzml4stwZes7yKv6PK8F5IfM6wBGYNyfFELadCWI6xVGUTHzs2OkA3nccHG2Psd9nRRLgZfg0J1r4c8fZtQQq0bUMSA4ady2nEI7xJN+H1SC+gZ7AwJXqeuJgdI0DzwNNVX71S77mMUvomuweq4RFDXuz4bRrxbr8NSb3+A5IpNmzV1DshtTzWIgUJH5syjvKOm5G/vwe+BWzus2Gic9jM+V3dCLnsVuBFW6qYD/RCkeNM88QcjtSMea7KaPQaihHIrm4u94tQnsb6a2plgXcCLRt2dPRunaM9eixw26Tum/KQdFNK9RIkGO85OZVYXYV1NZLinUdWagWsj+XozSvTQrP1uBKJw3h8MO8x5KXDwjiOzwKfQioOX0H/5q21IYyktsrZ9Xr9Tn//eeDjSAuD+yC1avYO7imWxLTUG3UD8DqSI/RYuTOduh4JdIxJ2TaP1jTSiPUb6nFJz2toTYcGix0ht5VMXq6vOVXJzKuVDLYi7s/GZp2O16uVnKaNJdsk360eo91IvPVTKo/mcVmremUWqTtzEPkSBey171CyN6P3FMorqbEKje/03/vNfzeHnup1hNzp4wjo9fth5LFB4gltBOR+F2A/nfvDdA2l95fYfXta5+0oJchvJemKXrk3zAZ3dyUgeVPdzGV3Hkn5YQ/gLR/mLTmP3im5nUD5P7oHobW5eSJx1Zat0vKLhyTMYYD4b8iXRm1u8XtV5JWoEvbcd1WLOW8a9SmUk0YdKtD3kqTQx6azhu97g240u/ZRpOEmmyceKCQ6jR46ZV9VmqdTTqpwC3hViUbY/YgrWWCvPwM4IiVTTfIdAdSCMQzX6lrE5V+kHo0FCe835Pqspe6pGVwzek8rlWBfwfCp5pYBexULa5Q4Fo79DJJBth/SfPWoQCeUkWa9AznOvN8oeYAJ1QEUqw/yqWBD8+q75cOUz5sHzJERkhf0EKKw31XMZmak4i0DLIz0Rr4Xkv0UQ2COdAJTWG7+moXtGYooq3eowVPL2ChrFeuqLO/NGqRTeovidS5mkaalw5Dzflihc5i3+qyt7e+l5r9e4hg2UiTr98QVLjRZffOAec8rE8eQ9IXKs2Y2I0d2k6YrFntf2QOJBbujh6GSV3b/j6QR6cjm4QmRQmwE5v3BwnVURzTXBVZTp898fJikj0ktQxHeI+fGmlXQbu0QQloGgTnCCUwh8nJsykMX43HpIO0N1vfx8CzWmjBsVLnsRCphk8vLSWLNYonDXSLWlr32V8Hc1SscOyMyjyCpvhwjH3MFZdVkaFr/PY58he/CVicHVzxuk76H1Pp4Q1ci3cjnC5AY09mPitXZ9cgHe2jEF1rQVAeJq7DfOcqHjfVW+gfvWZro4wN3alb8yTXEZYyFBGhPt3aGGq/aIn1vS2Xg74N5zlseoYYE5p+oOuLm1JwvZn2fbkqH3aib32tIYjLyyHZDlff+SFaSxUHEzN8jc64NiwWZQyoiW3GwToVjZ4H8pyDFMtssjJkbFlOIB7/IvaQt+ZjA/Xk8+zXPOIdxP6an3ogUttwesX4ISPGJSmpzB2PHEJhp4gN4a0jwXmxqriO/wv5en7kyJbg3SdnvrHTFmyLnzBTcIYjrcViZGbvmX0sclr32V0jQ3hz5zqQt2HILEuz5TooFYo9qbTSRc/3jkcynvErYsipeoVZkLAF9SOT9/x7xZluKatWYR7zm70IyimJ1+LEly243UgbcgI4btw7i9ZpCmp8eA1xH/mD2hpLvowMDt3IPTEM3pFilcR1y/ugEZjRK+ssklS37YY+MOQlTDa+MWPQ1VXoWdJfnfY7ReV/qSCD3q8hfJdOycK5AipZZTaFJ2Bws7fhLwPMRb2VeEmMVe9+F1C+K8cIcmlPurWDfNyknjZuI+X4v4sVq5Jhre74nl7DG7Tutrk1eojyFHx2VQWinkWy1l6knJq88mpH7BCI8erEEZh/icu9B0g+vzin4jvgF/gv619mxOdw4QAnMRnpGQmu3aqtq0klxbRG+zyrtvlEVUh6dYOnV1yP1S05XhTZJdZ3mlGB/VZXw7TnlyJTuvZD4kJj07IMi1tPNSOyaxSqNCnZ09EM1RolYq/csUfdb24kY2XdDqZz1sxL4ipLa2Zxza17LVxERExvLQLsF3rMD7380SgKzbUgFN6iOwfU6d1NOPJcUakiJ74cEBsqwRLGuBskLkaBrKx8/adih9/5ppC7FjpwkuhF4YfJakTWk7kZezCKpwIuhRy3V+rzIfWSeJGmgKGYjCYx7X8pfP/+B9DfMW6G6i2SErR7VJNYKvOdGeld9dZS/OdWAa4eYl/WBPNQyiM31SMZF7LxN5yC/Rayj2jKd55j3dHUjOUk3gWG9ZHYOfgdS7O7bE0xewk11BfCviCepmXMs68hRUMzxeowe7gbrZNR61NpBfAXxWHWC37URD1zYlDPdTNJ6pJVhoMUG8RZpQeDIlsWrSGIl8+qkDhF1eeojXGxmKWzJsZE5yhGuzUO8bt0Apb1VSUw/b00/rK5YxtyyisNByPFHngBUi406DykJvpLRBJFWvU5auhn+DRK4noccWCXbfxwhiV6s41L73lOUxIYFBK0IXtiUM91McpqdU+xHjcXK+FuqsGq6n0V6mNUj5uPIvF8aU3xpqqCSuMUJzMhx6RDW+6CigjuQFNlY78CaHPMe9qtxJVPdhl1H0qbbORSOBaleg5SGv4XJCdodxrMwrVbk10gKPA6LBvCkAt6EvLp7FyRwcjFkp0HSDuI2NUxv1Y3sVvXM3BFct6gBtAV4bbAPxML0Qmzneicw5a+dBpL1ei1JN/V6jrk8YhQEZkXBh5z1uR45hlEWu5J0j+1FQNYXIBW7BspvkGUb03CPZUx4Yp95F+BpOd9vxxZnI9kHU0vA+xLCmla+Aamyu558CQtTSOuNrzOcB6erCn/fnHO9AUlH/hhJVtJieGGO1e/fQVJbZZ7Em9UKfjacQRIAXBSrkSDsvGjgBKZs1HX/2B6pl+4e84V5MePzNHHYawiFuA/9A+v2QiqG5hXMWqBoYpo5OqrD04mr5XQDUnyqxtLr/m3xPdcTf57/6hzvs6qwecnDNPAXxDWmLGucAC5GGkdegXjlriPpKH6bbmjtYL9pquemLLmZyWlU1wrsfY7h9MMvItfN/qMgMEUm3lPXFkfJnJH6f9Zrtg9hSReZu5V45tm4wObxhMj3bwV+S1JZe6nBjsn+iTjv0pE5X396n/XZTwffD8l8yhOAXYXVndWEM+vqkMRKVKHn8rx2bgmS73HYb7qIZ3ZHxPv3HgUZubWg4nTmO3p8UpVcLVDQXRYW3fqYbky90kC3IxlkeRUGgcLwwoXjo2h2IekMnGf9toAPBHK0lIn/KcQdea8EHsDwRe1+UsDafSXS7b29SEZih+GbUFJAfwz6/pj3OapZN9cyotT2UROYOkkQsHtiRodZpMjWjcE8hGTyJFXWWVVITSjviJz7biA3nZzvqdoaG0fPSK3iZ7Y5f3qk1X4H8IlltAl8PZLAPDuHjj01Yh4tvmYGKWj3LqTatZGF0CuylBGbRu1JJOXoqrDru2WjhcZqN+JzKyUwRbHa535R8HPgbkia23lIH5XzgL8D3sTgQN8GxdzUt+RQHq5cqlU8AM8k7khvK/09dUvNmvxP4o4oHp5DIc8jHZ5rEXNpcUivV7L1QGC3lFfEYk+WIqFpRRKYDq5n+slUSEjC1PhGIOdhl/FOMBcbg70ir7zl0knNEQ6KpVnt7jKyaIJ5Q2AZZm1q3T5/20jvho/DKPTQ+zPIcm8XYPCO4XBkML555vMLKetrqePMyOdcl+O1tyG1Zz5L0p4hr9LvIF7W04GfAu/Q9X6xEs5wzU0FG8+kNzWMJSLLjcDUMjwnad3fyaF3pxFP4yokw3RXxBvYRcorrC54n5URmC5yJDEd8T6QpoF+fLQ4FmUtNedGLNtDCNQeSmLy1AwJkSe1brl2iq2N4PPbaqHHfFdHN9laivh0ie+NFjsW3YrXSugd2U6+ZqQgmTF7INlM/dKp7W8/QLJ4NkaOpXnEWsBReqHz9X9qQFwInM/C+IQaybH+JJKaQfqr3/u6S0hvmNcky7DoBkZhd4jPWqfEZK3+vCtJHa+VSEbqfirfm5BimPuW9Cy59pZmpBLbojccs9CmgwH1dgKjJzGxNTvWBApyRcT31nPKmMtF3IY7SDl1gXsQVw6hi7ST6PT57FE/UxWop+TwKuT4NQ9WInUtBhEY06HbkKynD6qBGFNvy8hIO/DkPEsvkCPjHwIXIEe6Z6iHZj5jX2ikrPJxjXdqR97bpBlJWSSlFuj0YeZojZKSTUh9o41IPaGmyuta/f8+Slz20J+HqZrcCtZLeNRU6bpvRgrMlRGMy5TCBrUAb3QCM3FegRgL2xbcbMRiXY5jHRvE2x1yLjrAYQGBqeWcyw8gtT6mAyNkOvjs7gCvTFY2SrcHie30kCUy/k1/Tq3PuNb6yHk30It27L1/xHpZDdwHCY4f5ti0pd6SZwMPJe4oydAICEgrmKe7s7BY2C+Bc5RkXY2kxm9Gjp5aGR6lbgGPR5XkvbtEdYHFoNQCUtrpMd/7qZzuj4RprCQ5JZkO9t31SLrybnoNu+e3MtZTeBWNkYxCLIG5CAkWy+OBsdcdgPRe+QHJ2a1j/K37WG9dE6kJMKqS55MsT7WCczQsDiSuJUgNyV5yDMZU4LUZ5jisDtwM/C3wLSVARRsO2pFxM+WtsHV5f70Ml+l1la7XLcCvkQSAG1LPFh5ZLeaaW0oEphaQz9kMsrgJaRZ6kK5hC5bdHTnW2VPJybC62gJvuxnEJO31WTHCMaicwGyOUJzGIncHHqQExmvCjP+CsgW0R4SAmWK+GKnOOazMFDlCWo4evW5O5XBAge9qLcMxbhJXsThP6w3z/JyJlDV4F5KOOl3ic9jmCDvHRTRVLtKycaMarNchMTofV89NiOlFIDLdQFdMuhFsRDNsvbCrkssHA/dEPKa7K0nZnf5HwFnxLlnEpFayfC3KwowRnDMjN4uOsve9C1qcjtEqitXK/GMIDIhr+splTDDGxQNTCzwwth7rI9AZy3HN1HSzyfMeC5B/n+rI15BU2a1VIGtpQtNJbXwNtfI3Bu87Bkn5biuheRvwu+D13RETikknLw0dy3n9+eXAM3TMNwWGY9ZztzMISXj0tCwsi7xC30WCwIooaGvsN4/HwYz7htpVq+wRwYIbFm2Vsd8hqaLDxALYd9SX2ThDdoxHFZhy0R4JYjI1u+p5OQE5RjghRYqqlMGsSulhVlIdibUIKzgfhRx9nQB8YxHWzCTHy5mHe38ktuxQJa7pnnQtso91lqKOzEVIYwfgduRIoEn+YyR0AezD8KW2HYu7se6jJGYuUmZuyEl+poPXxqSTTiqqLjTWGQE5chSfI8sseSPw50iGUr9aTVXLpAVomgFi1n8X8TIdigQgX4HUABk1SWyO4VobBndGQil+CzwBaZa7kp1bM1hWT4PlUV25MmVvi2dbwLY7Ed93JBIEPOkbznJQpkZgRkmYZlieRxW1Ea1jX3PjPZ+mZ9tIj7KDSeJO0rV3FmPPCLNj7D5WqWF6MhIvczwLPVBVbbormAyPYvj8uyLHhOcDR5PESmW1gZgEstKv79VYERjDDuBnERZBTa341UgqpyvT8V5wXbUIHhiphGKtxuYylQu3rhxkrJnrkOaQ70cyg2BhHZBhi5RVpSfCdV5D4jY+CfwKCUKF/LWghsXUBBg7teD5HwhcijThnE7N9bgRlnSrgND7FtbfyUqrHlsCYzf3m5SVnhcb9ftbrqvG2mLYDwkq65Iv/qWrC3QrcElOIrNcC9lNV0jcailFGWsVd/0a+iKSwPfCq0jiJc5HYk8sGNfIb2sRCU26Js891dD9K8Sr2qlAvsed9Nu6WwX8PdLqYV2fcRultyQkI2EGVDo4uM7ODRvDOMVZpDDiVSqX1zGiLNJmgQmZJy6wzDbBRyCZLeczfHCnY/Sw4kd5UzqtENd3kDPeMCW7VCHOID9Lwequ4rNrqTHKu357bUBdegfjL0ePUiPwDpQ5BnXdLF6p/38c8HykqOhuqk/TOn2enau4jpLM7AD+HamJ8yYkdrJMfR/bzLE7ojGoKXl7H/AikuKIoyAoaSJtZHdYA2YOqQe0HUnCmFN5ssq/25EU+4uUvJyt3qUnIzFRM1UPcLPAxG9BskvumXNSLG3scODeSEaTF7QbP3RUAJ8VKM+8768h5ctvUfIzN+R728tUHqao9uisVpDk1YN5zapsW/bm2B3S2q9qEyDn96fd7VtK3ixt7C2t+rt6gXhKn4fEF+6KpMrfhZ3jQ+ZSVnXVhGZGSdfLkAybvwSuLfHzYwnMKHohNXWz/yclL0WqK/eTtdCzOjXEnHYQz/h1SkJaOkfhz1chQdlXKCm5Uv8+qBXNdPC6mUgZr5TA2EBdhxQ1erd+aSOn0NVJGpd5GvV4wazpdUgWRN75tcj5O5AS5XmVeBEC0009wyRhxYgITDdiTGvAWcBH9R5nSErUN/t4c+ZS39nNQXjaGfdbG0CoawWIkB3BdOnd5qBfK4MwO2eOpOBnmaX3rfqtGYO2Lv8I/HPwuvsiKc4HIz1uDtbfTWds/uljgirkek4t8xXAsWrRl2GkxOqKqo/YpnQT/wskM6tVgucl7Dc0nZp/w6wS52uRFhFbkazhls7B1cCt+u9mfc2c/m7QONZJ4hNrGZ6eWg4jdVE9MOZFOU8fJm+DQBuAByHBXlvxejDjBJuHQ5Gz23nyRfpb/ZefAF/X+W77sA5EYwSeBYhv6PkDJP7CUaFVmXOdtQOdanEJLaQFwK+D1x6CBNTeCQmyfRiSSNHM2ABrPTbHIrBqvY9DMqueUeLYxuwbVVaUburnPwZpztkpuLbnA1IUPvcvkGObm/Q1O5Bmq9eox+RK/d2we/I0O2e5pa90X6T0Z6DfObYxMOGXXAn8AclnzxOgZRN8DNIX6RSdYA/oHR+sVIuuGyEnJh8XIjVg8hwfmVW7nGInwvTxUVTQvFrXXT3n/T2cpJt8kRThWk45GtbTUibJK2tzHRVxD0vqhwTEft4ceIRAjvCPAHbR694sTOm1jdP6JpUhl6b3n67G0eYSyF1sK4GqWhCYXK4D3qnPHFvvzDwu5jX7MfBt9ahcg8QWXjrEmNcHEBP7fVnekxbZHtdh1t5ICIyRlQuBDwPv0IdfkWOS24hr8x46MW33wowV1iEesryblRGerUjtilHP6STLz2pGkxJ6WeT7DmPELmJH9BpINwIMa7e0kPjF3wV/3xXpVL03Ek/zROBRKTJTK0E+jcR8TPVL0YDevEQk7KFUBaYRL9brkMDlmKMjS5Ix4nIycKp6W67I8Ho0ehCUzgCPSZXyNxIDtIgwmqvy3IDl57nxKX3/icD3lQzVncCMjUfg5ZFzYcdHvwa+TL7jI/u+WRK3aTdSprsTNt6o9RvT9bWTY24AforENuUNspsB1iDn5Y7JQpaHph787RYkxdfwOSQQeC3wCqRSbChrRWJlmkg9lPsg5ThijJyw2N+4xMDUVG+tQ7xZMyxsA5CXCP0H8CngjGDtNoPxCqs2jxPmIueklpfQ1gsuCJTA/ILEVZbnu7vK+I+qmBU78iuH11PsKOdaJIi3GTGvd0RYDXafayZ43GMJTF6lfy7J2XjeQpQPSo23Y3I9NJYS2w5IjW2Q1yA1XL6LpGrfHel31C7B0LTvP5n89aWySHnsZlk2pvRejkeO5zo5nQQ2prchnahfC/w8MArNaTDPwoDecZSvkaAogWkiZ3DWViDvpmPuxH9DCjS5YhwPT8DriUuBs+OjG9X7kqf2S5rAxB5V7DmBHhhbh/sFa6uKdWDVQC9EvFwx9/l8X6dLmtRY/ELopbkJqdf1HqTmzKsD+YldZw0kM6roWp0n7oikijg7e44jSLL0Yt7/MKSK8Q4WFiicFAN/rCvxZt3oxTr4U8Q1d1wNHDeBG89SVGJ1pOBULKlFld1XAoKa5/trSJDafKQs3nWCN9c9U+NY1ZqfJz649HG+TJYVoQnr/rSQtNv3AxuQY+IiMW67IIkcRYq7hQSmm0NPlJ3x19B7OUy9J3n3V2uU+2QkONeIyyRWJV8xKh1clMCY6/H/EFdjTGuApn7O25EzV7fuFgfm6vwvJKAvltB2SALN6pEy2YrwwJjM3Jed29GPu7Vim8TMCOTflOF3Ir9rFXHB3Y54+QjrtCwWmemm5PUO4H5IbaC8JMbkZi3wtIJ7UWw2Udmya/f/UCTDK09WbguJefk2Ep+WHvNJw5rg2SvVEUUXREe9LjexMAAs9j4+5vpqUWAp7M8m3hNm3ptrkMqTtQgvStjwbS5Shh4UEJhJ2GBtnA5hNMeopuw/Tlzw30qkp0vR2IVJQVYfmPoQ17DrzuJO7Ar7GoUbWYdqegnFEmDDvXXN1yLl8IiCMr86cr2X7YGxz9ojICW1nGPxPiR7c1KTWex592JEHcLLWAzmhfkmktdvHpWYB3848FT8GGnUQtdAqiK/m6TpWt7FbXN2BdIeYqqgZdTOSaTMMtybfD2bFhsWNPlYpJ5S1Z4NG8+fEX9Gf6R6YpaDFyarE29niGtY3Rk20evViHGFysZdGa84CNMdJxTQ2Z0C322EYX3k+2sljoNVl98U8fzTJMXnlgL2GxWBKaPmRFtv9iwk3euQgsriw8APScofO6rFlHo7XkfS2iFmYdf1c/6T+ODdooottFYniUB2EbezVSuNLRyYV/mfCvxJTkOmqxvGXwEnkZRMX6rkfj8kViP0OHVYmMYa1hYxr8oFfdaAzfmfIscosyTHCA3kCHdajYlVatE+Qn8+Dsn6HAcjz+JkvoxUVI/BCpLK7nmOokyGd9P5KeLFKYvobiC/F9W8aj9GqujC5Brw9UCXNQrI1EgJjH1pHfgCEuS3G3HuzpoKwbuQpl9LWTmOA6x2z6FIf5Jp4gLqTIn/EfhvirUOqKWUfMz7D0B6dU3CBjmPnBnvXdCI6EYoiTcCj855v9bk86VIX6TtLN3mm13kWPtOJFmX9ZSnJPSWtEjqWx2NVKHOkmNbH18lv7fwc3o/44R5NThXReqgZgE9P0V8S5yyiILN5zo1AvMQGLuHS5H6SpPs0TT9cGSKnC3GnER7c74aMPNuzitshvbsQEAd1cCaB36mwJyF1/EUDza0OigfZ2EmxLDy00XS+psTMP7WffqZSBxZnmcN5+u7kZtHE3Fbd3LOcxsJ4nynfs70ElsXVnH2mMh1cBsSm9HrmMJkczOSKmtlA3YE12xwzZEcN3XVyBs3Q+iUCBnqItWA7SiqlnPtoIbX9gyP2KDvvQjp1g3FQynM4LsHcA5Jw81hxmFW/31jIHu1CV0zdWB3pL1QzH6Su3RGvQKF/A6kiFlMIFItYHEfQZqPldHF05FNFGaRpmqPK+jpaiGZaP9D8SMce+/P1Kqr55QfkKqhu0zAHJgF/1DkWKYdqbw6Bb7/jcQd+c0AL0Fid+aWGIkxL8tbA6MqHfvS7nNdoSSmlxexFujLFXqFP6/Q8bRrKjAMOqoXYXw2ujZS5p4InW8bfd79wl67XfVE3u+uou9YI8JwsjnclclupWOxfC9DagVVwS8qJTAWr3IG0oG46BHCKiSodI9RDcYygvXreCTwr4jrsxE5xla87qWUEz1vcvNt5EgqRil2kfLn9TFf8G0ka+qpJPETRM5BLIH5mm4CtZx6w1zm70aCS4vU8hg3b4JZ9vckyTxKZx81+lzfG7AZGeG8NIKI1BFPZ20M5bnIvlErIMOxtcfK9u4XMd52pdoq3KPwwLSR/lnTTOiRck0nYRNSjXVYt17WUYAx80+zsLOqoxxFcy+kK7H10uhGzlNXSVDZBAskNT/2aOvmMbNS0+vENsH3kbhP8z6jjcu3iDtCsg379ZFyYK//XyQYdTFrlZS9Ps6O1F9tJXTDGI5/zfBHDeF145iNcx3xwOYZL5PdM1NrPu88PRrJ4BlWT9je0lIdWIZxHB4hmdy0cq6h00gqcU/aGgqP87YV2PfHolGsTeZxJOd7sZujCcF7gs92ElN8bg5FYh+6kQo0rEtxK3ImX+aiM0vkCxSLyTlxTBWC3c/T1PuxI3LBm8L+RiSBsbW0L1JhtZPzPjoklVDfHyiySSUxJncfJAnUzTsnW3KM+111/cTI9ivGaKynkGaQMc/xjdQmmFeXPZD8MRc79N8HlzSG9v79kUJ0eY2BOb2OSj3bpOwpNZXlcygWSzk3Tg8F8JOCG5ApyA7S2CpG0B0LF9neSJ+NIp6X8L2PrMDTYdbVS5AAxxhG30ECYw8YM0+MzcMhSKxEERJZlMDYuNSQHkfdCKMjrI3yYcQ1P66er2Fk7u8KeiNfnVMOtkZ+zyWp+17ssYvVIydFPoftMXdDSu/nWUdGYI4qicCElYW/FOFRtTX3rAlbO+F9frqEPWVu3B5wXbABFSEx1p77FYGwuycmv6CtAb5YInn5j4osQDtiaQKXFSAwXaQv01SPRbdYi32vwFJrFZiHMo6Q7L52DwyOFnHeuC4S/7HXGIx3Xlmr6WbaoZg3bG1OAvOTAnP/2jGx2J8buTZvQgLYY0hEGCv5vZw6zV739hIJoH3O2yMMATMALiAJgJ2UdQPwFuKPwceawAA8noXHQbGXvf95KdeVY7iFXkfq65S1aV5D0ruqChJjpONHJWwqmwPFMGrZqaXG50DkvLuMtPUyCEy4AR6t1ul85HjbdRUSX9DI2LDHzSMJUor+XwqsjVbgTajlXJfHFpj3S5F4w9oibHphJtWWSAJzeQECVgtIw2dzEhjTJ7chcSdlpC5Ppzx4eTdze/0bxpz8p9fNmyI9txNDYADeW8LGGQ7SC4LBdBIzWNiaJP1rimyaHd3gtgMPqdj6s7k9qqAXz573eiTmZHXKaqpChqyuRbjYd0WOxLolXmUcIZFS4K/Uz50tSGK6wMnAwakNdrENj3pKZg9B2qDEeiXtCO1GpIBn3o2nFqkXbe5vReoI2bONgig2gnv/N+KP2y5IGSt5YTFLH4kgDTbXJ5Y0dvYMTyCJB8q7fuyenpgx1ottBKf12eFItnFRb/5YE5hawNQ2l2R12vnlS8fYuhsHmHWyTi3D2MjwLCvhTRkbX5WK8g/kL/KWpTC7SK2ae5N0fg4VkFX1DBvqDbpsQ2ySXRV0ExIs+E0GF+aLyXgpg8CECnx9YNHOFRjzcFN+E3BYhnw2R7B2bY6mUt+1H1Isc1sB48oIfQd4UoH7+1ykXrS6MzeRFP4k41nLXI+NgJCfSLFj6LcW1N/m9fjHSP1gc/6k1NiFOqDXlc6MNTlbqxt7h7gjFbunFwZrujGitZLWB80McnmoGjndAfv5xGYh9cJdkPLu8yWQGPPEvDnYiCah8uqoYAv7rsDnS/J+2WL8tc5lg9FtPs+lOLvvpNyc71VL5x45rPYGO3cLzsJK9VAdD3w/w8Iqa8GXdYQUblA19Zr8ugS5aQVysxV4DdJ7ae2Q5DFWXhr6edMZFuwhSPHGM4N7jNVHZkx9DIkvi73vAwsYdzY/24C/VWIR6oGpAl4v28SmWZjm/DAlXXkrZadld++CRlAjuJ8rI8ewFXj1dyu4fswj9I6Cngl730cCT3e4VqZLWitZBth0xl5aV0/4i5H2GN0h9vGREJhRuHJDa/WFSKbCrA5Uke+36p8fBd6GBHtOjzuLG8FYr0QqUx6lm/QRxDUIDGGK4Wadw28x+j5Vv9PNp2gWWjul/C5GmtFdrON2nV5b1LKdG+Dl2hUJWt0PKbq4FukF8hydC5PVRh93sM3Pj/QZ92G4pprWa+TbuinfXsI427w+QMdl7xLkZz5FeD+JFLy8CMkg2dKHNNZTcthLd4VxdmkchASL7oMctxwezMtUpB6a1Q3rDD02uCm4j5iN7/PqCYjpIdcJdOwXkEyYH2WMa+iZyeo7E5KJrA3lPkr6Twx07XSELpkHfo5kMNYp1pHaao99G3g4cQUh53VsvqHek+uR+Jxt+nlTLCztEVZLvhCJpTGd0tVx+izSQTy2QKWN7R1IkOxmJPB/aw8iV89BBsNq0r2wASmyubeul5cFOmB+gB6O1RfzeeVp1IGM00jlzpdRTvlx+4yfKeu1jXXQ5CxFNEmqWj4e+ASSWTJI2IZVkCAtIp6OFJgbJVls6Ib6sxI2UwLLq8PO1S+3IRWAr9IN4Ha1tNvB5tIMlNhGJFX7wICwhJtcc4ACs1IBtwKPQYJJHznkRlYFgSGY20ciR1+rSpCjbkBkbDy2q1I+CwkKv0DHfksPRT0MNilRuRtSl2N3tWIfkHNehtE7v1XS8UeSjsoxurGrBHizzueKyPGdC977baRr9XVIcbXfRcjH7kidlcPV0/0c9b7aBhjbRLGmRP0iilfuntH1+SOV19iK0OF+1NZ7u1l/ng6MuJau8xn9/T8ihRzrAdmZV+/Jn1OsQnW45rpI1exzkXirC5EyDFcgMTex63ydzvO+qsM2IHGChyNB/TMp+Rp0PGnP+2H1nK9cCgSGgCGuQXLGjwmsmCKwSb5Zlf/bA6tmdpl4XVboIt4IvAr4KySWoYzNPs2qz1ASc5UKamuEz/pBJb9lkLIsy71RcLzsuMRITi2H/L4dORL9JRKjk4fA/B/wlMASLJPEHKMekw0ljXsYu5Fe+1crkblR1/M2kjicHQGRrKl811NejHXqBdukG+1Uam4Y4AnLs9Gdq6Tx/JTxEOtFmNK1e7I+50yBdVpLPeMf9D6v1c9u6fjeQNJvbLWO6UaSmKGDkWyydannj/Va2Vr7G8Q7XKbh9mJdQxuJP5ZqBYRl2Pf/g5IYI7C29u+GHB9vKkhiuoHMhfd0k66Xq5Xw7yBp+jkM6Vulc76rjtmeSmSyPI3D6jPbIz6khs8Xc8pxbgKzGF4CVMmcTjm54+mzxq+pC8+U2lJuBNkMxvSR6qHICqIs67LPPB05L26McHztSOHrJcpNr4ySlsqUVcicZefuwHbNB96c2FiuH5J0GD6T4c/y7TU/YmF2VZkkBsSV/EvKzTiw+5/XcahCXmdL/mybr826QVGSgVALyNWnKZ6W2gnGdVCcwh0ksTxVjqOt11cG67nsfeUCykkUCdsNzAc/p/8/q2SMlB404vyXShCLJCBkzel8BWvFxm02+I5Ozr1hXvXXaiTJZkkF8aaF7b5IHYNOSQombDd/GfDOYJHEWgzjinpKcZ7Ewr5G7YoEPFREtmmOKnUzLHv/4wpJzKguUxC/ZGHhtzMiCMyP1bNZBUwZ748ULuwWIGx5yON8D6Jo63wu45ovSCiHMZJ+g8TUlEVe0vK9F0mdoLkSxzU9nu0e8pQez3aJY/dbtfzLLkRq5OEoPU7pVDD/vTbtEzIIjJH/KSSOrFvB/WQZWnmv+dS66lDMEOkAj9Pnf1mE7ExM/Kot/CeTNH1sl7RY54PPuwAJOqUC1r+YR0aGF+gzdiqwjofxxJwSWOmjIIg2f3dWr8Uon7mK8buSpBKpZRH9MoLAnFIhgQmV8wzwogkmjUWvj6qrvWzykh7nQwIiW6V8d1JXVUS9q97hg6mudpeN3XtGvI7f0IPAWNznRjXUl+qa6AR66IXB8d3rImRqohJwbML/TM/zymSpofK/XQXoyQPIwCQQFsNzdfPbweB8/Kou+77zGG0beCMxG1mYyjkpCz4srHdM4OWYKuCB+UnFBCZN/g9HgkKXC3GxWKAVPTarKtb7XiQdnlsTOm52358Ijkirrhu1gqQEwGISmPBZN5LUG1pq5MX00AtSxP7EpU5gQqX4VCSorOzNqJ2yBLaomzGLLY8Lmcm6F8vgeomSvdYiEpesaztSqMzqRTQrJom1YLG8I+VqH5X7uEgxvWuAx6bWwLgTmPRcrlDlnT6O6Ey4Qu6kNqgvsjC+qDbCcZ5CYvrGXbb71f/48Ii9tCabF45AJgcRmPCZ1yLZdpM0l8OskfNIatWEVa5ftZSPkLIm+DFqlVaxKacF5adIdP3GHmRhlC0KavSOI1mDBMv+IzsH9Y2z8P8OeFSwKVc9lndH6krMsnODtHFxr9oC/RULi42FZ+Ygqa/jSmCysBFJI72Z7AZ1k+QCt+s2PZq9z5gYeK8LvNTpeL9xHcObkMJ6i2UgTuvRaic1ZmXKZL8YmF7E/wSSVgOTvE5uR2oO1XvI7EuXC4EJJ/j+SE2FUblN51Wg7obUjshySQ5bfTUvYemVsrtRz4ofG7iQJzlmYGPGEURV8vNCJF10LqVkWiNU+GEwavj7S5HAtn4KFyTDywLbOwMue02VQbzDjv0+SCGwK8iOSxsnRR1mmYS/v1LH/+gx9FJvQoJ7r8t4jsUa1yw5vxwp4jaKdT8M/oEkwSGtE4p6QeYDkpbnWPEgJNbtloyxHCcyk7VObgfOQWqNZT13EQKzgwmGKcK7IDUWqrQ0OhkK9TLdYB6E9Hto9rhHK7lspc/DKyQ8zdRrp/oI+UH6vc9W79CoLNkwQ6FswmjekNOQQm95F3msogf4az2KuZ7s0vatEsc1neWR/r6zkdoeUwMUusVXnBXhYfstsMsib7K2ftcj9XrOTHkNQitrvuQ5GJZQ2nd3Uwr5bCROY7E6luc5ujscCWC/OGMzna94EwzlPK0vztHjol0yZGKxyd9dlFyfl7GfdIjL5LHPeVtO3Rau/ycqkbl6kddI1jpJz+8W9XK/qMezpGX12exccmLQtaPIwhiXhdpVF/sXA0uozIJsaZiAhEWvrgc+BZyqg7pVLcurS/rOfdXLsgZJJz8+2ORR4e13tFQGssa0SMGlLFgBptORwONLiK9YOqxyqJMUFXssUuBqA9LzaFOPcehkrIXw/1nVQsOCdWlcqM/6MySdfz5Q6O0+Hpg5tV4fj2T8ZKWbhu+3CsnfAo6jvEq8sWu3ESh2kO7fj0HKkR9EUjuF1DO0UmNe63HsUOsxH93g3/DnGtmF927TObpcjxk+GKy5ZqATxk03NknadxwEvB7pd3bfDALbCp6h1mN8s8Y0PZbdlDc6xBYlqj8nKcBnctAak3EL9c1G4OVIdeFNSDbjhgKfvUWN3i+RryWCyaUdmRwNPF/3gCPYuVdYO3iGrDmkz8/djDXTzfh9VgG5m5FwgJuA/wK+o79vBt6rXnv4Q3X/zINZchZwHMcsnHowwG9XV9QGyqna2w+hVyb9PduVKZ+ubmZjqrchhaDSjLmmE2HVLa0U9Rqknsa9kb4d6ckzJVWl27UbCMo8UmX1NqTU+gNIqkmWJRtGYn6qRO2KikkMwcYf9mp6nCqKPZCy7XfWuaiVMJ6XINVOr0JKkH8PqRdiCrRO7z496YV/Z/XGbQi8es1gU7gtkA+T2e/rPYzTRttNbWKHImX3D9LN9mBV2OtGcE9/RI7wLtXxOwP4ARJMTUBE5yle2n4U+rHJwniB45Dj9z2RFOyDGL6wYTfHGrgG+L3K+c1ILahvpua9NYZjmDVmm5Dg08OUYDeG1CtG0G/S/eCrBclVPdBT08CxSHPKNUhp/wNVZ8XsZ3ljj65ATiIu1+c7VZ+vHXiJ20OS0xXqncqzvn8LfGDSCUzakn6CEpnDleFPU/25akhm6vQvn56uXmilvFeRHawZvq9FdtO6qhA2Mvwl8H7gf/R3++s4H0excuGDSMxzSNoQVN2vqhEo1fC7NuqGeogqsjV6TSG9O1YGFmdYZTK8tupmeA1y5JnuNTMVWMLjvilW6ZExMpxu63GIzsEBOh/Tul426Jzspv+fIqmobfNhXps5nYPtet2s1y1Ib6k5NTgu1Dm6IUPJdiZ0jurBhtpOEcXDlcSsUllerRvJWr3WK4lcr39rq27drnK9FUn7vR6p03W7julZqje2Taic1wLjZq7EeeiUpKfmUmO4rxKsQ0laPKzTtbFBddZqksxP01+7BB6V23UtbNd5u0PJyS3BWukqebkAqTJ9fer5pnIQl5FP6LgL27xO4ht0c7WNeJQtAtLFnrIUdC/rJm3VhUG8oxz/sI/NycB/qtfACOEOXRBvR1Lgyj62MxJzGtLk7MKSFn+ezbRBcuY9yHpoBN5AO/sfRLjCZnDtAgqx0WeNdnsQ0w7jjUYg860+4zOD9GTZoJvtlI5rFoGZDxT0bcHm229+aikDZakQxcaAcZ3WzW6NboL2b0hgbtVN7hbd8G4cMI5juanlNJLzeJtDb1Uoh2XvefUBemommLtVJPGYU/q3Nfr7lhKW23Rub9X/G0HtJf/WsDGMQY15lrx9jYbRzRMHG4RVuvFtpXivkLJz4ts9rs6Y3KON1WUk0eOkBKwRCO+bKroXszDOAe4ZKJLFsl5tczQLZhCpDMmnvW9qhB60peadaQbjWKZnNT0/zWUyPzauU6nnrxf4vGZqjbicj24u6xlrpEzDvblM18miWG+Ge5GkEs4x2YWzRpHmaOPzCXVFhtZHP4/cdyoiYeZq3oy4uhmjRVNLXaGFlr4c1Y1/nZ2z+XpdYZmDus/PwHHtN7ZZY+mYjLnMyn71dTKGLj+QQMd/YWlU/6y6ZP0tSMDw6oB1D1ogAHeqcGyNxFwMPDiDpDocDofDsWS9MU0kUO18Jys9r79hYerwsJ4OIzHHUl1DOSNYVyOtJJzEOBwOh2PJI3R9zegGmD5OWi5emU6Gd+O9SIZBOF61iPE1L8xcxV6iG4FnDOkhcjgcDodjSRGZOvB3SKrkuPXEGUUlYcvbP7TPGOUd13tV6IFJk5jrSLozO4lxOBwOx7LEm5D4iu0sXk+cqvpSpMnEVcDHKbeUvBGYO1fsgUnHxJyPFPlzEuNwOByOZeeRCeMo/gIp5/7HjA1znsloTd/KIBCzSOG0LyJVZc0DVS9xHEGOoU5lNM01jZidgfQucRLjcDgcjmWHdKfn+wH/i3TtvTKDDFjzqsUmNKGXZZad25efBnwdeC1SF4cKN3ojMUcgmUw7RuC9MqL2I6QysD2bp/s5HA6HY9kRmXRfo0chQa7fQ6oSpj0zO0jaAlQdP9MOyMoOsmNNfgJ8FOkCOp0iGNMVbu5Wa2CGpLDdjhGQPItf+ilwd/fEOBwOh6Oflb1cPDJhqe1VwFOQNgX7ILEXh2W8N3xPVjGzrDHsZvyc7u7aq8fSRUjDtD8iTbU+A1ybIi2j6t9iz7kG+AiSKVR1U01I2g6cDbxaSZzNn8PhcDgcy841H/YNSTeXOxw4EunBsh64h5KaAyu8nxuQwNUzkTL/25Ay+5uRvhWGxWw6Z/1n1iGdq4/RsZuuWH6sd9PlSAuJHzK63kkOh8PhcAIztggbKs5nEINdkSyc/dQDMaM/74+0X99I0u3VAoctvbkV/HsjkiJ8tf58M5IdNau/uwrpBJqG9aVojcGmbV1vNwIfAp6m91V1Q0prKPlH4OlIJ1wnMQ6Hw+Hw4MhgHMIsHiMiWVgVEJopvdIdSsNGjztIuoF2+nx/M/ju7hhu0naEsw44CXip3mPVPTU6Oi+XAE9APFZOYhwOh8Ph6EMqwuZYjYo+c5KaptkYzABvTZGtUfR12oxkRYF3TXU4HA6HIxcBSXcDHeZaSp0/6wGZeSujSz03EnMp8AgnMQ6Hw+FwOIoQuR8zuv5TRmKuBZ4UkBg/CnU4HA6Hw5EbXwnIRdUkxj5/O1IbJ53W7nA4HA6HwzE03oikgYeeklF04H4jSWq8Hyk5HA6Hw+EYGkYcjiWpbjwKEmOtB96u9+BtBxwOh2OZoOFD4CgBXZWl3yNp4w9DCt21qc4rYhldc0hQbxs4RUlM16fE4XA4HA7HsITCyMprSI6Tsvo7VeWJeaV+v3tiHA6Hw+Fw5CIxVpDvhUgF4lGSmDuQKsHg3kWHw+FwOBw5UA9IzLHA9UowqiYx1jn8KuBonwaHw+FwOBx5USPptH0s0rTSekONok7M5Uhncc9KcjgcDofDkZvEmCfmeUgvqDbVZyfZ55/rU+BwOBwOhyOWxFgsyvHA7Yy2Yu9xwX04HA6Hw+Fw5CIxdpTzHJI6MVWSGOsEfol+rwf0OhwOh8PhiCIx5gV5PHAbo6nUe1OKQDkcDofD4XBE4xFIL6OqPTG3IMG84MdIDofD4XA4SsCDkKq9VbYduAPJggL3wjgcDseSgit1x2KgBpwO/C1ynFRXElMFVgTf6XA4HA6Hw1EKeX4hUnyuioq924D9WRiD43A4HA6HwxGNMMX6aODSEklMB/HoXKyf71lIDofD4XA4SiUxVrH3GJKKvWV5Yp6Je18cDofD4XBUTGJegGQOtSjWdmAWuNCH1uFwOBwOR9Ukxo55XoQE9nYiScys/vtg/OjI4XA4HA5HxaiTBPb+KbCFfF2sOyRp2a/14XQ4HA6HwzEqhPEqRwLXKyFp0b/gXfi3F+n73fvicDgcDodjUUjMnsCnGK5twA+V9DgcDofD4XAsKpEBCfC9G/Bh4FaSAN85/fcS4KkkBevC9zocDodjiW8SDse4ymc39f+0zHaD16Rf73A4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HI7q8f8AO2NJQWrS/uUAAAAASUVORK5CYII=";
function Logo({ size = 26, onDark = false }) {
  return <img src={QUESTA_LOGO} alt="Questa" draggable={false} style={{ height: size, width: "auto", display: "block", filter: onDark ? "brightness(0) invert(1)" : "none" }} />;
}

/* ═══ MODULE: components/Starfield ═══  (immersive galactic layer) */
const COSMIC_GLYPHS = [Atom, Sigma, Dna, Hexagon, Orbit, Binary, FlaskConical, Waves, Infinity, Triangle];
function Starfield({ count = 48, dark = false, glyphs = true }) {
  const stars = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 120,
    size: Math.random() * 2 + 0.8, dur: Math.random() * 70 + 55, delay: -Math.random() * 90,
    op: (dark ? 0.32 : 0.14) + Math.random() * (dark ? 0.32 : 0.14),
    c: dark ? ["#c7d2fe", "#8a938c", "#ddd6fe"][i % 3] : ["#7c6bd8", "#8b7fd6", "#3d4a46"][i % 3],
  })), [count, dark]);
  const sparks = useMemo(() => Array.from({ length: Math.round(count / 10) }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    dur: Math.random() * 3 + 3, delay: Math.random() * 5, size: Math.random() * 2.4 + 1.6,
    c: dark ? "#8a938c" : "#8b7fd6",
  })), [count, dark]);
  const floaters = useMemo(() => (glyphs ? Array.from({ length: Math.max(3, Math.round(count / 10)) }, (_, i) => ({
    id: i, Icon: COSMIC_GLYPHS[(i * 3) % COSMIC_GLYPHS.length],
    left: Math.random() * 90 + 3, top: Math.random() * 86 + 5,
    size: Math.random() * 20 + 20, dur: Math.random() * 9 + 11, delay: -Math.random() * 9,
    op: dark ? Math.random() * 0.08 + 0.07 : Math.random() * 0.04 + 0.035,
    c: dark ? ["#8a938c", "#8a938c", "#6b736e"][i % 3] : "#7c6bd8",
  })) : []), [count, dark, glyphs]);
  const shooters = useMemo(() => (dark ? Array.from({ length: 2 }, (_, i) => ({
    id: i, left: Math.random() * 50 + 5, top: Math.random() * 38 + 4,
    dur: Math.random() * 4 + 7, delay: Math.random() * 10 + i * 6,
  })) : []), [dark]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((s) => (
        <span key={s.id} className="q-star absolute rounded-full"
          style={{ left: s.left + "%", top: s.top + "%", width: s.size, height: s.size, background: s.c, opacity: s.op, boxShadow: dark ? `0 0 ${s.size * 2}px ${s.c}` : "none", animation: `qFloat ${s.dur}s linear ${s.delay}s infinite` }} />
      ))}
      {sparks.map((s) => (
        <span key={"sp" + s.id} className="q-spark absolute rounded-full"
          style={{ left: s.left + "%", top: s.top + "%", width: s.size, height: s.size, background: s.c, boxShadow: `0 0 7px ${s.c}`, animation: `qTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
      ))}
      {floaters.map((f) => (
        <div key={"fl" + f.id} className="q-drift absolute" style={{ left: f.left + "%", top: f.top + "%", opacity: f.op, animation: `qDrift ${f.dur}s ease-in-out ${f.delay}s infinite` }}>
          <f.Icon size={f.size} color={f.c} strokeWidth={1.4} />
        </div>
      ))}
      {shooters.map((s) => (
        <span key={"sh" + s.id} className="q-shoot absolute" style={{ left: s.left + "%", top: s.top + "%", width: 2, height: 2, borderRadius: 9, background: "#e0e7ff", boxShadow: `0 0 6px 1px #c7d2fe, -60px -18px 40px -10px rgba(107,115,110,.45)`, animation: `qShoot ${s.dur}s ease-in ${s.delay}s infinite` }} />
      ))}
    </div>
  );
}

/* ═══ MODULE: i18n/mn.js + i18n/en.js ═══
   Every UI string lives here. Translators edit ONLY this module. */
const I18N = {
en: {
    nav: { home: "Home", learning: "Learning", research: "Research", competitions: "Competitions", nasa: "NASA Space Apps Challenge", about: "About", dashboard: "Dashboard", login: "Log In", signin: "Sign In" },
    heroEyebrow: "STEM learning platform", heroWhat: "STEM learning platform", heroChips: ["Personalized roadmaps", "Research prep", "Professor finder", "Competitions", "Scholarships", "University prep"], heroL1: "Master STEM", heroL2: "reach the world's best.",
    heroSub: "Questa turns the world's best STEM resources into a personalized roadmap, with guidance in your own language, and takes you from your current level to research, competitions, scholarships, and top universities. Completely free.",
    ctaStart: "Generate my tailored roadmap",
    statsOpp: "opportunities", statsStudents: "students", statsSubjects: "subjects", statsFree: "free",
    exploreTitle: "What can you do here?", exploreEyebrow: "Explore",
    exploreCards: {
      learning: ["LEARNING", "Courses across physics, math, CS, chemistry, biology, and engineering."],
      research: ["RESEARCH", "Find mentors, build research skills, discover programs."],
      competitions: ["COMPETITIONS", "International olympiads and science contests."],
      nasa: ["NASA SPACE APPS CHALLENGE", "Annual global hackathon for space and science."],
      internships: ["INTERNSHIPS", "Summer research programs at top institutions."],
    },
    internTitle: "Internships & research programs", internSub: "Students can apply to these world-class programs and take part in real research.", internLocal: "Locally: reach out to university labs (NUM, MUST) or professors for a research placement, start from the Professor Finder.",
    howTitle: "How to use it?",
    howSteps: [
      ["Pick your goal", "A major, an olympiad, research, or just exploring, tell us where you're headed."],
      ["Get your roadmap", "We build a step-by-step plan from real courses, ordered the way you should learn them."],
      ["Learn from the best", "Every resource links directly to MIT OpenCourseWare, Stanford, Harvard, Princeton, and more."],
      ["Track your understanding", "Mark topics as complete, keep personal notes, and reflect on your progress."],
      ["Discover what comes next", "When you are ready, the next step becomes clear."],
    ],
    readyBand: ["You can start anywhere.", "Where you arrive is your choice."],
    footNote: "",
    demoNote: "V1 demo, progress resets on refresh", adminLink: "⚙ Admin (demo)",
    langBtn: "МН", aiLabel: "AI assistant", aiSub: "Ask me anything",
    subjectsTitle: "Knowledge Trees", subjectsSub: "Each subject expands into its subfields. Every subfield is a constellation-style roadmap.",
    branchesLabel: "branches", nodesLabel: "topics", weeksShort: "wks", hoursShort: "hrs",
    openTree: "Open roadmap", plannedLabel: "Coming soon", liveBadge: "Live",
    choosePath: "First, choose your learning path", chooseSpec: "Now choose a specialization", explorePath: "Explore", tracksLabel: "tracks",
    plannedNote: "Roadmaps for these branches are in production, the architecture is ready for hundreds more.",
    backTo: "Back",
    stageF: "🌱 Foundation", stageA: "🚀 Advanced", stageO: "🌍 Opportunity", phF: "Foundation", phA: "Advanced", phO: "Research & Projects",
    lockedNode: "Locked", firstDo: "First:", done: "Done",
    whyTitle: "Why you need this", timeLabel: "Time", weeks: "weeks",
    resourcesTitle: "Exactly what to learn from", startHere: "▶ Start here",
    rt: { video: "Video", course: "Course", book: "Book/Text", practice: "Practice", sim: "Simulator" },
    roles: { primary: "Primary lecture", secondary: "Secondary lecture", textbook: "Textbook", sim: "Simulation", viz: "Visualization", practice: "Practice", advanced: "Advanced reading" },
    objectivesTitle: "Learning objectives", objIntro: "I should be able to:",
    misconTitle: "Common misconceptions", applicTitle: "Real-life applications",
    relCompsTitle: "Related competitions", relResearchTitle: "Related research fields", unlocksTitle: "Unlocks after you finish this",
    keyIdeas: "Objectives & key ideas",
    myNotes: "My notes", notesPh: "Save formulas, ideas, links here... (autosaves)",
    helpful: "Helpful", fbThanks: "Feedback recorded, thank you!",
    askAI: "Ask Questa AI", quizBtn: "Take mini-quiz", markDone: "Mark complete",
    quizTitle: "Mini quiz", quizPass: "Excellent! Topic unlocked 🎉", quizFail: "Give it another try!",
    quizCheck: "Check", quizRetry: "Retry", quizNeed: "Pass the quiz to complete",
    milestone: "🏁 Milestone",
    oppTitle: "International Competitions & Opportunities", oppEyebrow: "Every door has a key",
    oppSub: "Contests genuinely open to students from Mongolia. Eligibility, registration windows, requirements, all on one card.",
    reqLabel: "Requirements", unlocked: "Unlocked", locked: "Locked",
    view: "Register here", prepResources: "Prep resources",
    matchLabel: "Match", missingLabel: "Missing", weeksLeft: "weeks left",
    d1: "● Beginner", d2: "● Intermediate", d3: "● Advanced",
    stOpen: "Open", stSoon: "Opening soon", stClosing: "Closing soon", stClosed: "Closed", stTba: "Dates TBA", stAlways: "Always open",
    estMark: "estimated", windowLabel: "Registration window", eligLabel: "Eligibility",
    eligOk: "Open to Mongolia ✓", eligCheck: "Verify eligibility", uniFlag: "University stage",
    prepLabel: "Prep", monthsUnit: "mo",
    save: "Save", savedBadge: "Saved", savedTitle: "Saved opportunities",
    researchTitle: "The Research Path", researchEyebrow: "The researcher's road",
    researchSub: "Questa bridges you from “I don't know where to start” to “ready for world-class opportunities.”",
    readiness: "Research Readiness", missing: "Missing", estimate: "Estimated", goToNext: "Go to next step",
    findProf: "Find professors", findProfSub: "Questa AI searches the web for real researchers matching your interest. (It won't write emails for you, it helps you find who to reach!)",
    interestPh: "Interest... e.g. quantum computing, machine learning",
    orgPh: "University / country (optional)... e.g. NUM, MIT",
    searchBtn: "Search", searching: "Searching...",
    profDisclaimer: "⚠️ Verify AI-found information yourself before reaching out.",
    profTips: ["Mention the exact courses you've completed", "Show you've read one of their works", "Keep it short, specific, polite"],
    profTipsTitle: "3 things to remember when reaching out",
    profLocked: "This tool unlocks when you become “Research Ready”", demoPeek: "Peek in demo mode",
    hi: "Hi", level: "Level", totalXp: "Total XP", nextLevel: "Next level",
    guideSays: "Questa AI recommends", moreAdvice: "Detailed AI advice",
    myPath: "My path", continueBtn: "Continue", skillsTitle: "Skill map",
    oppReady: "Opportunities unlocked", startJourneyFirst: "Start your journey first!",
    hoursStudied: "Hours studied", mastered: "Topics mastered", completionRate: "Completion",
    deadlinesTitle: "Upcoming windows", noDeadlines: "No open windows right now, see all on the Competitions page",
    plannerTitle: "AI Study Planner", plannerQ: "How many minutes do you have today?", plannerAI: "Refine with AI",
    planFor: "Plan", min: "min",
    planActs: { video: "watch video", course: "take lesson", book: "read", practice: "practice", sim: "try simulator", quiz: "take mini-quiz" },
    calendarTitle: "Calendar, registration windows",
    profileTitle: "My Profile", editProfile: "Edit profile", saveProfile: "Save", profileSaved: "Profile updated ✓",
    pf: { name: "Name", grade: "Grade", country: "Country", dreamUni: "Dream university", major: "Intended major", gpa: "GPA", sat: "SAT / ACT (optional)", english: "English / IELTS", hours: "Weekly study hours", langs: "Programming languages", interests: "Interests", oly: "Olympiad experience", res: "Research experience", dream: "3-year dream" },
    portfolioTitle: "Portfolio", autoAch: "Questa achievements", addEntry: "Add",
    entryTypes: ["Project", "Competition", "Research", "Certificate", "Leadership"],
    entryPh: "Title... e.g. Movie-recommender ML model", portfolioEmpty: "Empty for now, add your first entry",
    searchTitle: "Search", searchPh: "Search topics, competitions, branches...", searchEmpty: "No results",
    sTopics: "Topics", sComps: "Competitions", sBranches: "Branches",
    obWelcome: "Welcome! 👋", obWelcomeSub: "Your preparation roadmap.",
    obContinue: "Continue", obBack: "Back",
    obName: "What should we call you?", obNamePh: "Your name...",
    obGoal: "What is your goal?", obGrade: "What grade are you in?",
    obSubjects: "Favorite subjects? (pick any)",
    obCoding: "Programming experience?", obCalc: "Calculus?",
    obResearch: "Research experience?", obEnglish: "English (SAT/IELTS)?",
    obDream: "Your dream in 3 years?", obDreamPh: "e.g. Study physics at MIT...", obTime: "How much time can you dedicate per day?",
    obAge: "How old are you?", obAgePh: "Age", obCountry: "Country", obCountryPh: "e.g. Mongolia", obCurriculum: "School curriculum", obGpa: "GPA (optional)", obGpaPh: "e.g. 3.8 / 90%",
    obCareer: "Your dream career?", obUnis: "Dream universities (optional)", obLevel: "How would you rate your overall level?", obStyle: "How do you like to learn?", obDifficulty: "Preferred difficulty?",
    obExperience: "What experience do you have?", obStrengths: "Your strengths?", obWeaknesses: "Your weaknesses?", obPickMany: "(pick any that apply)", obOtherPh: "Type your own answer here...",
    obMajor: "What major are you hoping to study?", obRegion: "Which province/city do you live in?", obRegionPh: "Select province or city", obPrefLang: "Preferred learning language?", obKnown: "Which topics have you already learned?", obKnownSub: "Tick every topic you already know",
    levelOpts5: ["Beginner", "Intermediate", "Advanced", "Competition Level", "Research Ready"],
    prefLangOpts: ["English", "Mongolian", "Both"],
    curriculumOpts: ["Mongolian", "Cambridge", "IB", "American (AP)", "Other"],
    levelOpts3: ["Beginner", "Intermediate", "Advanced"],
    styleOpts: ["Videos", "Books", "Interactive", "Projects", "Practice-heavy", "Theory-heavy", "Visual"],
    diffOpts: ["Easy", "Balanced", "Rigorous", "University", "Olympiad", "Research"],
    expOpts: ["Programming", "Competitions", "Research", "Laboratory", "Projects", "Public speaking", "Teaching", "Writing"],
    strengthOpts: ["Mathematics", "Consistency", "Curiosity", "Problem-solving", "Creativity", "Speed"],
    weakOpts: ["Procrastination", "Mathematics", "English", "Consistency", "Motivation", "Time management"],
    obGenBtn: "Generate my roadmap", obGenerating: "Questa AI is building your roadmap…",
    obDone: "Your path is ready! ✨", obStartsAt: "Starting path:", obKnownSkipped: "Credited what you already know:", obGo: "Go to dashboard",
    gradeOpts: ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Other"],
    subjOpts: ["Math", "Physics", "Chemistry", "Biology", "Computer Science", "Engineering"],
    codingOpts: ["None yet", "A little", "Comfortable"],
    calcOpts: ["Not yet", "Learning now", "Comfortable"],
    resOpts: ["None", "School project", "Real research"],
    engOpts: ["Beginner", "Elementary", "Intermediate", "Upper Intermediate", "Advanced", "Fluent"],
    chatGreet: (n) => `Hi${n ? " " + n : ""}! I'm Questa AI 🤖 How can I help?`,
    chatPh: "Type your question...",
    quick: ["Build my roadmap", "Explain a concept", "Find research", "What's next for me?"],
    chatErr: "Sorry, something went wrong. Please try again.",
    nasaTitle: "NASA Space Apps Challenge, Ulaanbaatar",
    nasaSub: "The world's largest hackathon, an international competition. Solve real problems with NASA's open data in 48 hours.",
    nasaPrep: "Prep pathway", nasaJoin: "Form a team and join", nasaOfficial: "Register here",
    nasaMeta: "Ulaanbaatar · Every autumn · organized by Questa",
    aboutTitle: "What is Questa?",
    aboutBody: "Questa is an open platform guiding Mongolian students from “I don't know where to start” to “ready for world-class opportunities.” We've curated 300+ opportunities and resources.",
    aboutMission: "Mission", aboutMissionBody: "Every curious student, rural or urban, deserves a path to the world's best education.",
    values: [["Open", "Every resource is free"], ["Personal", "AI adapts to each student"], ["Real", "Beyond learning, competitions & research"]],
    adminTitle: "Admin Dashboard",
    adminNote: "Demo mode: edits apply live to the UI this session and reset on refresh. With a backend, these forms write to the database.",
    adminTabs: ["Competitions", "Announcements", "Content"],
    addComp: "+ Add competition", edit: "Edit", del: "Delete", archiveBtn: "Archive", unarchive: "Restore",
    featureBtn: "Feature", filterAll: "All", filterArchived: "Archived", saveBtn: "Save", cancel: "Cancel",
    f: { nameMn: "Name (MN)", nameEn: "Name (EN)", descMn: "Description (MN)", descEn: "Description (EN)", link: "Official link", cat: "Category", level: "Difficulty (1-3)", reqs: "Requirements, node ids, comma-separated", open: "Opens month (1-12)", close: "Closes month (1-12)", est: "Dates are estimates (change yearly)", elig: "Eligibility note (MN)", win: "Window note (MN)" },
    annNew: "+ New announcement", annTitlePh: "Title...", annPublish: "Publish", annNone: "No announcements",
    annToolbar: "Format: bold, list, link, no HTML needed",
    adminSearch: "Search...",
    rmTitle: "My Roadmaps", rmSub: "A personal learning path tailored to each goal.", rmNew: "+ Create new roadmap", rmNone: "No roadmaps yet, create your first.", rmCreate: "Create roadmap", rmOpen: "Open", rmDelete: "Delete",
    rmOverview: "Overview", rmGoal: "Goal", rmCareer: "Career", rmDreamUni: "Dream university", rmLevel: "Current level", rmTarget: "Target level", rmProgress: "Progress", rmCourses: "Courses", rmDone: "Completed", rmNext: "Next course", rmStartNext: "Start next", rmComps: "Related competitions", rmMilestones: "Milestones", rmNoComps: "No matching competitions yet.", rmPhaseCourses: "courses", rmAllDone: "You've completed this roadmap! 🎉",
    phaseT: { foundation: "Foundation", core: "Core Knowledge", advanced: "Advanced Topics", research: "Research & Projects" },
    phaseWhy: { foundation: "The essential groundwork every path is built on.", core: "The core theory of your field.", advanced: "Deeper, specialized topics.", research: "Apply your knowledge, research skills, projects, and opportunities." },
    lvlLbl: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", competition: "Competition", university: "University", olympiad: "Olympiad", research: "Research", balanced: "Balanced", easy: "Easy", rigorous: "Rigorous" },
  },
};

/* ═══ MODULE: data/goals.js + levels ═══ */
const GOALS = [
  { id: "stem", icon: "📚", en: "General STEM Learning", path: "physics" },
  { id: "olympiad", icon: "🏅", en: "Olympiads", path: "math" },
  { id: "intl", icon: "🌍", en: "International Competitions", path: "cs" },
  { id: "research", icon: "🔬", en: "Research", path: "research" },
  { id: "university", icon: "🎓", en: "University Preparation", path: "research" },
  { id: "projects", icon: "💻", en: "Build Projects", path: "cs" },
  { id: "career", icon: "🚀", en: "Career Exploration", path: "physics" },
  { id: "other", icon: "✍️", en: "Other", path: "physics" },
];
const LEVELS = [0, 400, 900, 1500, 2200, 3000, 4000, 5200];
const LEVEL_TITLES = {
  en: ["New Star", "Curious", "Learner", "Explorer", "Young Researcher", "Researcher", "Senior Researcher", "Supernova"],
};
function levelFromXp(xp) { let lv = 0; for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i]) lv = i; return lv; }

/* ═══ MODULE: data/subjects.js ═══
   subjects → branches → nodes. Every node carries an exact resource stack:
   res: [{ t: video|course|book|practice|sim, s: 1 = "start here",
           r: quality stars, l: {mn,en} exact episode/chapter/unit label, u: url }]
   Adding a subject/branch/node = adding data here. UI renders automatically. */
const DB = {};
DB.subjects = [
{
  id: "physics", icon: "⚛️", hue: "#3d4a46",
  name: { en: "Physics" },
  desc: { en: "Mechanics, electromagnetism, thermodynamics, and quantum theory." },
  branches: [
  { id: "phys-core", icon: "⚛️", w: 900, h: 940,
    name: { en: "Physics & Math Foundations" },
    desc: { en: "From algebra to quantum mechanics, Einstein's road" },
    nodes: [
    { id: "algebra", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 150, diff: 1, prereqs: [],
      name: { en: "Algebra & Trigonometry" },
      desc: { en: "Equations, functions, sine & cosine, the language of all physics." },
      why: { en: "The mathematical language underlying every equation in physics." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Khan Academy → Algebra 1 · start at the Functions unit" }, u: "https://www.khanacademy.org/math/algebra" },
        { t: "video", r: 4, l: { en: "Khan → Trigonometry · the Unit Circle lesson" }, u: "https://www.khanacademy.org/math/trigonometry" },
        { t: "book", r: 4, l: { en: "Paul's Notes → Algebra: Preliminaries chapter" }, u: "https://tutorial.math.lamar.edu/Classes/Alg/Alg.aspx" },
        { t: "practice", r: 5, l: { en: "AoPS Alcumus, adaptive practice (Algebra mode)" }, u: "https://artofproblemsolving.com/alcumus" },
      ],
      notes: { en: ["A function is a machine: input → output", "sin, cos = coordinates on a circle", "Logarithm = inverse of exponent"] },
      quiz: [
        { q: { en: "What is sin(90°)?" }, o: { en: ["0", "1", "0.5"] }, a: 1 },
        { q: { en: "If 2x + 4 = 10, x = ?" }, o: { en: ["3", "5", "7"] }, a: 0 },
      ] },
    { id: "calculus", stage: "f", pos: [450, 205], weeks: 6, h: 30, xp: 300, diff: 2, prereqs: ["algebra"],
      name: { en: "Calculus I" },
      desc: { en: "Derivatives and integrals, the mathematics of change." },
      why: { en: "Derivatives and integrals are how physics describes change and accumulation." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Essence of Calculus · Episode 1" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" },
        { t: "course", r: 5, l: { en: "MIT OCW 18.01SC → 1A: Definition of the Derivative" }, u: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/" },
        { t: "book", r: 5, l: { en: "Paul's Notes → Calculus I · Limits chapter" }, u: "https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx" },
        { t: "practice", r: 4, l: { en: "Khan → Calculus 1 · Unit 1: Limits exercises" }, u: "https://www.khanacademy.org/math/calculus-1" },
      ],
      notes: { en: ["Derivative = instantaneous rate of change", "Integral = area, accumulation", "They are inverse operations (fundamental theorem)"] },
      quiz: [
        { q: { en: "Derivative of x²?" }, o: { en: ["2x", "x", "x³/3"] }, a: 0 },
        { q: { en: "A derivative measures..." }, o: { en: ["Area", "Rate of change", "Length"] }, a: 1 },
      ] },
    { id: "linear-algebra", stage: "a", pos: [240, 350], weeks: 5, h: 25, xp: 300, diff: 2, prereqs: ["calculus"],
      name: { en: "Linear Algebra" },
      desc: { en: "Vectors, matrices, eigenvalues, the math of space." },
      why: { en: "Quantum mechanics is built entirely on linear algebra." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "3B1B → Essence of Linear Algebra · Ep. 1 (Vectors)" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
        { t: "course", r: 5, l: { en: "MIT 18.06 (Strang) → Lecture 1: Geometry of Linear Equations" }, u: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
        { t: "sim", r: 4, l: { en: "Immersive Math → Ch.1 (interactive book)" }, u: "https://immersivemath.com" },
        { t: "practice", r: 4, l: { en: "Khan → Linear Algebra · Vectors unit exercises" }, u: "https://www.khanacademy.org/math/linear-algebra" },
      ],
      notes: { en: ["A matrix = a transformation of space", "Eigenvectors keep their direction", "Det = 0 means the transform 'collapses'"] },
      quiz: [
        { q: { en: "Diagonal of a 2×2 identity matrix?" }, o: { en: ["0,0", "1,1", "2,2"] }, a: 1 },
        { q: { en: "An eigenvector preserves its..." }, o: { en: ["Length", "Direction", "Color"] }, a: 1 },
      ] },
    { id: "mechanics", stage: "a", pos: [660, 350], weeks: 5, h: 25, xp: 300, diff: 2, prereqs: ["calculus"],
      name: { en: "Classical Mechanics" },
      desc: { en: "Newton's laws, energy, momentum, the science of motion." },
      why: { en: "The foundation of all physics; the core of IPhO." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "Walter Lewin 8.01 → Lecture 1 (Units & Measurement)" }, u: "https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qhlFQ-As8e" },
        { t: "course", r: 5, l: { en: "MIT 8.01SC → Week 1: Kinematics" }, u: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/" },
        { t: "book", r: 5, l: { en: "OpenStax Univ. Physics I → Ch.3–5 (Motion, Newton's Laws)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/3-introduction" },
        { t: "sim", r: 5, l: { en: "PhET → Forces and Motion: Basics" }, u: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics" },
        { t: "practice", r: 4, l: { en: "IPhO archive → past Problem 1s" }, u: "https://ipho-unofficial.org/" },
      ],
      notes: { en: ["F = ma, where it all starts", "Energy is conserved, only changes form", "Momentum = m·v, conserved in collisions"] },
      quiz: [
        { q: { en: "Newton's second law?" }, o: { en: ["F = ma", "E = mc²", "V = IR"] }, a: 0 },
        { q: { en: "A falling object's kinetic energy..." }, o: { en: ["Decreases", "Increases", "Constant"] }, a: 1 },
      ] },
    { id: "em", stage: "a", pos: [660, 495], weeks: 6, h: 30, xp: 300, diff: 2, prereqs: ["mechanics"],
      name: { en: "Electromagnetism" },
      desc: { en: "Charge, fields, Maxwell's equations." },
      why: { en: "Electricity, radio, light, and all modern technology rest on electromagnetism." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 8.02SC → Week 1: Electric Charge" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.5 (Electric Charges & Fields)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
        { t: "sim", r: 5, l: { en: "PhET → Circuit Construction Kit: DC" }, u: "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc" },
        { t: "video", r: 4, l: { en: "Khan → Physics: Electric charge & field lessons" }, u: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage" },
      ],
      notes: { en: ["Charges create fields, fields exert forces", "Changing magnetic field → electric field", "Light = an electromagnetic wave"] },
      quiz: [
        { q: { en: "Like charges..." }, o: { en: ["Attract", "Repel", "Ignore"] }, a: 1 },
        { q: { en: "Light is..." }, o: { en: ["Sound", "An EM wave", "Nothing"] }, a: 1 },
      ] },
    { id: "quantum", stage: "a", pos: [450, 640], weeks: 8, h: 40, xp: 400, diff: 3, prereqs: ["linear-algebra", "em"],
      name: { en: "Quantum Mechanics" },
      desc: { en: "Wave-particle duality, superposition, Schrödinger's equation." },
      why: { en: "The framework that governs atoms, molecules, and all of modern technology." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "MIT 8.04 (Allan Adams) → Lecture 1: Superposition" }, u: "https://www.youtube.com/playlist?list=PLUl4u3cNGP61-9PEhRognw5vryrSEVLPr" },
        { t: "course", r: 5, l: { en: "MIT OCW 8.04 → Lecture Notes 1" }, u: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/" },
        { t: "practice", r: 4, l: { en: "8.04 → Problem Set 1 (on the course site)" }, u: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/" },
      ],
      notes: { en: ["State = a vector, measurement = probability", "Superposition: both until measured", "We don't notice because ħ is tiny"] },
      quiz: [
        { q: { en: "What happens when you measure a quantum state?" }, o: { en: ["Nothing", "It 'collapses' to one outcome", "It's destroyed"] }, a: 1 },
        { q: { en: "The math foundation of QM?" }, o: { en: ["Geometry", "Linear algebra", "Statistics"] }, a: 1 },
      ] },
    { id: "condensed", stage: "a", pos: [450, 785], weeks: 6, h: 30, xp: 400, diff: 3, prereqs: ["quantum"],
      name: { en: "Condensed Matter" },
      desc: { en: "Crystals, semiconductors, superconductors." },
      why: { en: "The physics of real materials, from semiconductors to superconductors." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "Steven Simon → Oxford Solid State · Lecture 1" }, u: "https://www.youtube.com/playlist?list=PLarP9uJyRmNiPFo43php4tLGDlqNTmqON" },
        { t: "book", r: 5, l: { en: "Simon → Oxford Solid State Basics · Ch.1-2 (podcast version)" }, u: "https://podcasts.ox.ac.uk/series/oxford-solid-state-basics" },
        { t: "practice", r: 4, l: { en: "arXiv cond-mat → read 1 abstract per week" }, u: "https://arxiv.org/list/cond-mat/new" },
      ],
      notes: { en: ["Crystal = repeating atomic lattice", "Band theory → conductor vs insulator", "Emergence: many particles = new physics"] },
      quiz: [
        { q: { en: "An example semiconductor?" }, o: { en: ["Silicon (Si)", "Iron", "Rubber"] }, a: 0 },
        { q: { en: "A superconductor's resistance?" }, o: { en: ["Large", "Zero", "Negative"] }, a: 1 },
      ] },
    { id: "research-phys", stage: "o", pos: [450, 905], weeks: 2, h: 8, xp: 250, diff: 3, prereqs: ["condensed"],
      name: { en: "Toward First Research" },
      desc: { en: "Read papers on arXiv and connect to the Research path." },
      why: { en: "Here the physics path merges with the research path." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "arXiv → new cond-mat papers" }, u: "https://arxiv.org/list/cond-mat/new" },
        { t: "book", r: 5, l: { en: "Keshav → How to Read a Paper (PDF)" }, u: "https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf" },
      ],
      notes: { en: ["Open the “Research” pathway", "Read 1 abstract per week", "Ask Questa AI about anything unclear"] },
      quiz: null },
  ] },
  { id: "phys-thermo", icon: "🔥", w: 900, h: 460,
    name: { en: "Thermodynamics" },
    desc: { en: "Heat, energy, entropy, from engines to stars" },
    nodes: [
    { id: "thermo-laws", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Laws of Thermodynamics" },
      desc: { en: "Energy, heat, work, from the 0th to the 3rd law." },
      why: { en: "One set of laws governs engines, stars, and living cells." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics II → Ch.1-4 (Thermodynamics)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/1-introduction" },
        { t: "sim", r: 5, l: { en: "PhET → Gas Properties" }, u: "https://phet.colorado.edu/en/simulations/gas-properties" },
        { t: "video", r: 4, l: { en: "Khan → Physics: Thermodynamics section" }, u: "https://www.khanacademy.org/science/physics/thermodynamics" },
      ],
      notes: { en: ["1st law = energy is conserved", "Heat flows hot → cold", "Work and heat, energy's two roads"] },
      quiz: [
        { q: { en: "The 1st law says..." }, o: { en: ["Energy is conserved", "Entropy decreases", "Heat doesn't exist"] }, a: 0 },
        { q: { en: "Heat naturally flows..." }, o: { en: ["Hot → cold", "Cold → hot", "It doesn't"] }, a: 0 },
      ] },
    { id: "kinetic-theory", stage: "a", pos: [450, 205], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["thermo-laws"],
      name: { en: "Kinetic Theory" },
      desc: { en: "A gas = colliding molecules. Temperature = average energy." },
      why: { en: "Explains temperature, pressure, and entropy from molecular behavior." },
      res: [
        { t: "sim", s: 1, r: 5, l: { en: "PhET → Gas Properties (pressure-temperature experiments)" }, u: "https://phet.colorado.edu/en/simulations/gas-properties" },
        { t: "book", r: 4, l: { en: "OpenStax Univ. Physics II → Ch.2 (Kinetic Theory)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/2-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Thermodynamics: kinetic theory videos" }, u: "https://www.khanacademy.org/science/physics/thermodynamics" },
      ],
      notes: { en: ["T ∝ average kinetic energy", "Pressure = molecular collisions", "PV = nRT, the ideal gas law"] },
      quiz: [
        { q: { en: "Temperature is proportional to..." }, o: { en: ["Average kinetic energy", "Number of molecules", "Volume"] }, a: 0 },
        { q: { en: "Gas pressure comes from..." }, o: { en: ["Molecular collisions", "Gravity", "Light"] }, a: 0 },
      ] },
    { id: "entropy", stage: "a", pos: [450, 350], weeks: 3, h: 15, xp: 250, diff: 3, prereqs: ["kinetic-theory"],
      name: { en: "Entropy & the 2nd Law" },
      desc: { en: "Why disorder always grows." },
      why: { en: "Why time moves forward and why information has physical consequences." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics II → Ch.4 (Second Law)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/4-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Second law of thermodynamics lesson" }, u: "https://www.khanacademy.org/science/physics/thermodynamics" },
        { t: "practice", r: 4, l: { en: "OpenStax Ch.4 → end-of-chapter problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/4-introduction" },
      ],
      notes: { en: ["In a closed system S only grows", "Entropy = (log of) microstate count", "Time's one-way street follows from the 2nd law"] },
      quiz: [
        { q: { en: "In a closed system, entropy..." }, o: { en: ["Grows or stays constant", "Decreases", "Vanishes"] }, a: 0 },
        { q: { en: "When ice melts, entropy..." }, o: { en: ["Increases", "Decreases", "Unchanged"] }, a: 0 },
      ] },
  ] },
  { id: "phys-waves", icon: "🌊", w: 900, h: 460,
    name: { en: "Waves & Optics" },
    desc: { en: "Oscillations, sound, light, nature's rhythm" },
    nodes: [
    { id: "oscillations", stage: "f", pos: [450, 60], weeks: 2, h: 10, xp: 200, diff: 2, prereqs: [],
      name: { en: "Oscillations (SHM)" },
      desc: { en: "Pendulums, springs, the foundation of sinusoidal motion." },
      why: { en: "Atoms, bridges, circuits, and musical instruments all follow the same equations." },
      res: [
        { t: "sim", s: 1, r: 5, l: { en: "PhET → Pendulum Lab" }, u: "https://phet.colorado.edu/en/simulations/pendulum-lab" },
        { t: "book", r: 5, l: { en: "OpenStax Univ. Physics I → Ch.15 (Oscillations)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/15-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Simple harmonic motion lessons" }, u: "https://www.khanacademy.org/science/physics/mechanical-waves-and-sound" },
      ],
      notes: { en: ["SHM: F = −kx", "A pendulum's period depends on length & g, not mass", "Energy trades kinetic ↔ potential"] },
      quiz: [
        { q: { en: "In SHM force is proportional to..." }, o: { en: ["Displacement (−x)", "Velocity", "Time"] }, a: 0 },
        { q: { en: "A pendulum's period does NOT depend on..." }, o: { en: ["Mass", "Length", "g"] }, a: 0 },
      ] },
    { id: "waves-sound", stage: "a", pos: [450, 205], weeks: 2, h: 10, xp: 200, diff: 2, prereqs: ["oscillations"],
      name: { en: "Waves & Sound" },
      desc: { en: "Interference, frequency, resonance." },
      why: { en: "Sound, light, radio, and ocean waves all share the same mathematics." },
      res: [
        { t: "sim", s: 1, r: 5, l: { en: "PhET → Wave Interference" }, u: "https://phet.colorado.edu/en/simulations/wave-interference" },
        { t: "book", r: 5, l: { en: "OpenStax Univ. Physics I → Ch.16-17 (Waves, Sound)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/16-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Waves lessons" }, u: "https://www.khanacademy.org/science/physics/mechanical-waves-and-sound" },
      ],
      notes: { en: ["v = λ·f", "Interference: constructive & destructive", "Resonance = amplitude spikes at matching frequency"] },
      quiz: [
        { q: { en: "Wave speed = ?" }, o: { en: ["λ·f", "λ/f", "f/λ"] }, a: 0 },
        { q: { en: "Does sound travel in a vacuum?" }, o: { en: ["No", "Yes", "Sometimes"] }, a: 0 },
      ] },
    { id: "optics", stage: "a", pos: [450, 350], weeks: 2, h: 10, xp: 200, diff: 2, prereqs: ["waves-sound"],
      name: { en: "Light & Optics" },
      desc: { en: "Refraction, lenses, how telescopes work." },
      why: { en: "How lenses, mirrors, and light shape everything from microscopes to telescopes." },
      res: [
        { t: "sim", s: 1, r: 5, l: { en: "PhET → Bending Light" }, u: "https://phet.colorado.edu/en/simulations/bending-light" },
        { t: "book", r: 5, l: { en: "OpenStax Univ. Physics III → Ch.1-4 (Optics)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/1-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Geometric optics lessons" }, u: "https://www.khanacademy.org/science/physics/geometric-optics" },
      ],
      notes: { en: ["Snell's law: n₁sinθ₁ = n₂sinθ₂", "A lens steers light", "White light = all colors combined"] },
      quiz: [
        { q: { en: "Entering a denser medium, light..." }, o: { en: ["Refracts", "Vanishes", "Speeds up"] }, a: 0 },
        { q: { en: "White light through a prism..." }, o: { en: ["Splits into a rainbow", "Turns red", "Disappears"] }, a: 0 },
      ] },
  ] },
  { id: "phys-mechanics", icon: "🎯", w: 900, h: 1090,
    name: { en: "Classical Mechanics" },
    desc: { en: "From kinematics to Hamiltonian mechanics, a full university curriculum" },
    nodes: [
    { id: "kinematics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: [],
      name: { en: "Kinematics" },
      desc: { en: "Position, velocity, acceleration, describing motion without forces." },
      why: { en: "You can't take a single further step without the language of motion." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics I → Ch.3–4 (Motion, 2D Motion)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/3-introduction" },
        { t: "course", r: 5, l: { en: "MIT 8.01 → Week 1: 1D Kinematics" }, u: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/" },
        { t: "sim", r: 5, l: { en: "PhET → Projectile Motion" }, u: "https://phet.colorado.edu/en/simulations/projectile-motion" },
        { t: "practice", r: 4, l: { en: "Khan → Physics: One-dimensional motion exercises" }, u: "https://www.khanacademy.org/science/physics/one-dimensional-motion" },
      ],
      notes: { en: ["v = dx/dt, a = dv/dt", "Constant acceleration: v = v₀ + at", "Horizontal & vertical motion are independent"] },
      quiz: [
        { q: { en: "Acceleration is the derivative of..." }, o: { en: ["Position", "Velocity", "Force"] }, a: 1 },
        { q: { en: "Vertical acceleration of a horizontally-thrown object?" }, o: { en: ["0", "g (downward)", "Increases"] }, a: 1 },
      ] },
    { id: "newton-dynamics", stage: "f", pos: [450, 195], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["kinematics"],
      name: { en: "Newtonian Dynamics" },
      desc: { en: "Newton's three laws, free-body diagrams, force analysis." },
      why: { en: "Here you begin to understand WHY things move." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics I → Ch.5–6 (Newton's Laws, Applications)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/5-introduction" },
        { t: "sim", r: 5, l: { en: "PhET → Forces and Motion: Basics" }, u: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics" },
        { t: "practice", r: 4, l: { en: "Khan → Forces and Newton's laws exercises" }, u: "https://www.khanacademy.org/science/physics/forces-newtons-laws" },
      ],
      notes: { en: ["F = ma, the second law", "Action = reaction (3rd law)", "Always draw a free-body diagram"] },
      quiz: [
        { q: { en: "If net force is zero, an object..." }, o: { en: ["Stops", "Moves at constant velocity or stays still", "Accelerates"] }, a: 1 },
        { q: { en: "A table pushes a book with what force?" }, o: { en: ["Normal force", "Friction", "Gravity"] }, a: 0 },
      ] },
    { id: "work-energy", stage: "a", pos: [275, 330], weeks: 4, h: 20, xp: 300, diff: 2, prereqs: ["newton-dynamics"],
      name: { en: "Work & Energy" },
      desc: { en: "Work, kinetic/potential energy, conservation of energy." },
      why: { en: "The energy method solves many problems more easily than forces." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics I → Ch.7–8 (Work, Kinetic & Potential Energy)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/7-introduction" },
        { t: "sim", r: 5, l: { en: "PhET → Energy Skate Park: Basics" }, u: "https://phet.colorado.edu/en/simulations/energy-skate-park-basics" },
        { t: "practice", r: 4, l: { en: "Khan → Work and energy exercises" }, u: "https://www.khanacademy.org/science/physics/work-and-energy" },
      ],
      notes: { en: ["W = F·d·cosθ", "KE = ½mv², PE = mgh", "Energy is conserved in a closed system"] },
      quiz: [
        { q: { en: "Kinetic energy formula?" }, o: { en: ["½mv²", "mgh", "mv"] }, a: 0 },
        { q: { en: "If force is perpendicular to motion, work is..." }, o: { en: ["0", "Maximum", "Negative"] }, a: 0 },
      ] },
    { id: "momentum", stage: "a", pos: [625, 330], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["newton-dynamics"],
      name: { en: "Momentum & Collisions" },
      desc: { en: "Momentum, its conservation, elastic and inelastic collisions." },
      why: { en: "Rockets, billiards, particle physics, all rest on momentum." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics I → Ch.9 (Linear Momentum, Collisions)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/9-introduction" },
        { t: "sim", r: 5, l: { en: "PhET → Collision Lab" }, u: "https://phet.colorado.edu/en/simulations/collision-lab" },
        { t: "practice", r: 4, l: { en: "Khan → Momentum and collisions exercises" }, u: "https://www.khanacademy.org/science/physics/linear-momentum" },
      ],
      notes: { en: ["p = mv", "Momentum is conserved in a closed system", "Elastic: energy is also conserved"] },
      quiz: [
        { q: { en: "Momentum formula?" }, o: { en: ["mv", "½mv²", "ma"] }, a: 0 },
        { q: { en: "In an inelastic collision, what is NOT conserved?" }, o: { en: ["Momentum", "Kinetic energy", "Mass"] }, a: 1 },
      ] },
    { id: "rotational", stage: "a", pos: [450, 470], weeks: 5, h: 25, xp: 350, diff: 3, prereqs: ["work-energy", "momentum"],
      name: { en: "Rotational Motion" },
      desc: { en: "Torque, moment of inertia, angular momentum." },
      why: { en: "Everything from planets to atoms to galaxies rotates." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics I → Ch.10–11 (Rotation, Angular Momentum)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/10-introduction" },
        { t: "video", r: 4, l: { en: "Walter Lewin 8.01 → rotational motion lectures" }, u: "https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qhlFQ-As8e" },
        { t: "practice", r: 4, l: { en: "Khan → Torque and angular momentum exercises" }, u: "https://www.khanacademy.org/science/physics/torque-angular-momentum" },
      ],
      notes: { en: ["τ = Iα (rotational F = ma)", "L = Iω is conserved", "Moment of inertia = mass distribution"] },
      quiz: [
        { q: { en: "A skater pulling their arms in..." }, o: { en: ["Spins faster", "Spins slower", "Stops"] }, a: 0 },
        { q: { en: "The rotational analog of F = ma?" }, o: { en: ["τ = Iα", "p = mv", "W = Fd"] }, a: 0 },
      ] },
    { id: "cm-oscillations", stage: "a", pos: [450, 605], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["work-energy"],
      name: { en: "Oscillations II" },
      desc: { en: "SHM, damped and driven oscillations, resonance." },
      why: { en: "The bridge to Lagrangian mechanics; the basis of wave theory." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics I → Ch.15 (Oscillations)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/15-introduction" },
        { t: "course", r: 5, l: { en: "MIT 8.03 → Mechanical Vibrations section" }, u: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/" },
        { t: "sim", r: 4, l: { en: "PhET → Pendulum Lab" }, u: "https://phet.colorado.edu/en/simulations/pendulum-lab" },
      ],
      notes: { en: ["mẍ = −kx → ω = √(k/m)", "Damping reduces amplitude", "Resonance: driving frequency = natural frequency"] },
      quiz: [
        { q: { en: "Angular frequency of SHM?" }, o: { en: ["√(k/m)", "k/m", "√(m/k)"] }, a: 0 },
        { q: { en: "Resonance occurs when..." }, o: { en: ["Frequencies match", "Damping is large", "Mass is small"] }, a: 0 },
      ] },
    { id: "lagrangian", stage: "a", pos: [450, 740], weeks: 6, h: 30, xp: 400, diff: 3, prereqs: ["rotational", "cm-oscillations"],
      name: { en: "Lagrangian Mechanics" },
      desc: { en: "The principle of least action, the Euler–Lagrange equations." },
      why: { en: "The true language of modern physics, the door to quantum & field theory." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Classical Dynamics (Cambridge) · Ch.2 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/dynamics.html" },
        { t: "video", r: 5, l: { en: "MIT 8.223 → Lagrangian Mechanics lectures" }, u: "https://ocw.mit.edu/courses/8-223-classical-mechanics-ii-january-iap-2017/" },
      ],
      notes: { en: ["L = T − V (kinetic − potential)", "Nature minimizes the action", "Write any system in generalized coordinates"] },
      quiz: [
        { q: { en: "The Lagrangian L = ?" }, o: { en: ["T − V", "T + V", "V − T"] }, a: 0 },
        { q: { en: "The least-action principle minimizes the..." }, o: { en: ["Action S", "Energy", "Time"] }, a: 0 },
      ] },
    { id: "hamiltonian", stage: "a", pos: [450, 875], weeks: 6, h: 30, xp: 400, diff: 3, prereqs: ["lagrangian"],
      name: { en: "Hamiltonian Mechanics" },
      desc: { en: "Phase space, Hamilton's equations, Poisson brackets." },
      why: { en: "The direct source of quantum mechanics, the basis of the H operator." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Classical Dynamics · Ch.4 (Hamiltonian)" }, u: "https://www.damtp.cam.ac.uk/user/tong/dynamics.html" },
        { t: "video", r: 4, l: { en: "Physics with Elliot → Hamiltonian mechanics intro" }, u: "https://www.youtube.com/watch?v=FhqNeMbYzu4" },
      ],
      notes: { en: ["H = T + V (total energy)", "q̇ = ∂H/∂p, ṗ = −∂H/∂q", "Phase space = position + momentum"] },
      quiz: [
        { q: { en: "The Hamiltonian usually equals the..." }, o: { en: ["Total energy", "Work", "Torque"] }, a: 0 },
        { q: { en: "Phase space is built from..." }, o: { en: ["Position & momentum", "Time & mass", "Force & energy"] }, a: 0 },
      ] },
    { id: "chaos-nonlinear", stage: "o", pos: [450, 1010], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["hamiltonian"],
      name: { en: "Chaos & Nonlinear Dynamics" },
      desc: { en: "Sensitive dependence, attractors, chaotic systems." },
      why: { en: "From weather to heartbeats, the real world is nonlinear." },
      res: [
        { t: "video", r: 5, l: { en: "Veritasium → “Chaos: The Science of the Butterfly Effect”" }, u: "https://www.youtube.com/watch?v=fDek6cYijxI" },
        { t: "practice", r: 4, l: { en: "arXiv nlin → read one abstract" }, u: "https://arxiv.org/list/nlin/new" },
      ],
      notes: { en: ["Butterfly effect = sensitive start", "Deterministic ≠ predictable", "An attractor = long-term behavior"] },
      quiz: [
        { q: { en: "A chaotic system is ___ to initial conditions" }, o: { en: ["Sensitive", "Indifferent", "Stable"] }, a: 0 },
        { q: { en: "Chaos can arise in systems that are..." }, o: { en: ["Deterministic", "Random", "Linear"] }, a: 0 },
      ] },
  ] },
  { id: "phys-em", icon: "⚡", w: 1000, h: 1860,
    name: { en: "Electromagnetism" },
    desc: { en: "From charge to Maxwell and radiation, a full university course with olympiad prep" },
    nodes: [
    { id: "electric-charge", stage: "f", pos: [500, 60], weeks: 1, h: 6, xp: 150, diff: 1, prereqs: [],
      name: { en: "Electric Charge" },
      desc: { en: "The nature of charge, quantization, conservation, conductors vs insulators." },
      why: { en: "All of electromagnetism begins with charge, this is the foundation stone." },
      objectives: { en: ["Explain positive/negative charge and how they interact", "Understand that charge is quantized and conserved", "Distinguish conductors from insulators"] },
      misconceptions: { en: ["'Charge is created', no, it's only transferred (conserved)", "In rubbing, electrons move, not protons"] },
      applications: { en: ["Static electricity, lightning", "Photocopiers, laser printers, electrostatic filters"] },
      comps: ["ipho"], research: { en: "Plasma physics, surface science" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 1: Electric Charge" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Charge and electric force lessons" }, u: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.5.1–5.2 (Electric Charge)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.4 (Electrostatics)" }, u: "https://www.feynmanlectures.caltech.edu/II_04.html" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Balloons and Static Electricity" }, u: "https://phet.colorado.edu/en/simulations/balloons-and-static-electricity" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.5 → end-of-chapter problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
      ],
      quiz: [
        { q: { en: "Like charges..." }, o: { en: ["Repel", "Attract", "Ignore"] }, a: 0 },
        { q: { en: "In charging by friction, charge is..." }, o: { en: ["Transferred (conserved)", "Created", "Destroyed"] }, a: 0 },
      ] },
    { id: "coulombs-law", stage: "f", pos: [500, 185], weeks: 1, h: 6, xp: 150, diff: 1, prereqs: ["electric-charge"],
      name: { en: "Coulomb's Law" },
      desc: { en: "The force between two point charges: F = kq₁q₂/r²." },
      why: { en: "The quantitative foundation of electrostatics, everything else follows." },
      objectives: { en: ["Write Coulomb's law in vector form", "Use superposition for several charges", "Compare with the law of gravity"] },
      misconceptions: { en: ["Force falls as 1/r², not 1/r", "Forces are vectors, add them as vectors, not scalars"] },
      applications: { en: ["Bonding inside molecules", "Electrostatic painting, dust precipitators"] },
      comps: ["ipho"], research: { en: "Atomic & molecular physics" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 1: Coulomb's Law" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Coulomb's law and electric force" }, u: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.5.3–5.4 (Coulomb's Law)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
        { role: "sim", t: "sim", r: 5, l: { en: "PhET → Coulomb's Law" }, u: "https://phet.colorado.edu/en/simulations/coulombs-law" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.5 → Coulomb's law problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
      ],
      quiz: [
        { q: { en: "If distance doubles, the force..." }, o: { en: ["Drops 4×", "Drops 2×", "Unchanged"] }, a: 0 },
        { q: { en: "Coulomb force depends on..." }, o: { en: ["Charge and distance", "Only mass", "Speed"] }, a: 0 },
      ] },
    { id: "electric-field", stage: "f", pos: [500, 310], weeks: 2, h: 10, xp: 200, diff: 2, prereqs: ["coulombs-law"],
      name: { en: "Electric Field" },
      desc: { en: "The field E = F/q, field lines, superposition." },
      why: { en: "The 'field' concept explains action at a distance and transformed physics." },
      objectives: { en: ["Compute E from a charge", "Draw and interpret field lines", "Apply superposition as vectors"] },
      misconceptions: { en: ["Field lines never cross", "E exists in space whether or not a test charge is there"] },
      applications: { en: ["Oscilloscopes, old CRT screens", "Electrostatic filters, inkjet printers"] },
      comps: ["ipho"], research: { en: "Accelerator physics, electron optics" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 2: The Electric Field" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Electric field lessons" }, u: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.5.5–5.7 (Electric Field)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.4 (Electrostatics)" }, u: "https://www.feynmanlectures.caltech.edu/II_04.html" },
        { role: "sim", t: "sim", r: 5, l: { en: "PhET → Charges and Fields" }, u: "https://phet.colorado.edu/en/simulations/charges-and-fields" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.5 → electric field problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
      ],
      quiz: [
        { q: { en: "Units of electric field?" }, o: { en: ["N/C (or V/m)", "N·C", "C/N"] }, a: 0 },
        { q: { en: "Field lines start on..." }, o: { en: ["Positive charge", "Negative charge", "Nowhere"] }, a: 0 },
      ] },
    { id: "charge-distributions", stage: "a", pos: [760, 435], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["electric-field"],
      name: { en: "Continuous Charge Distributions" },
      desc: { en: "Fields from line, surface, and volume charges (integration)." },
      why: { en: "Real objects aren't point charges, learn to integrate for the field." },
      objectives: { en: ["Define λ, σ, ρ densities", "Integrate for the field of a line/ring", "Exploit symmetry"] },
      misconceptions: { en: ["You can't shortcut the integral without symmetry", "dE is a vector, split into components"] },
      applications: { en: ["Charge distributions on antennas", "Capacitor plates"] },
      comps: ["ipho"], research: { en: "Computational electrodynamics" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 2: Continuous Charge Distributions" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 4, l: { en: "OpenStax Univ. Physics II → Ch.5.6 (Calculating Fields)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.5 → distribution problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
      ],
      quiz: [
        { q: { en: "σ is which density?" }, o: { en: ["Surface", "Linear", "Volume"] }, a: 0 },
        { q: { en: "What most simplifies the integral?" }, o: { en: ["Symmetry", "Large charge", "Color"] }, a: 0 },
      ] },
    { id: "gauss-law", stage: "a", pos: [280, 435], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: ["electric-field"],
      name: { en: "Gauss's Law" },
      desc: { en: "∮E·dA = Q/ε₀, flux and enclosed charge." },
      why: { en: "With symmetry it gives fields instantly, no integration, an extremely powerful tool." },
      objectives: { en: ["Define and compute flux", "Use Gauss to find E (sphere, cylinder, plane)", "Choose the right Gaussian surface"] },
      misconceptions: { en: ["Gauss's law always holds, but is only useful with symmetry", "Flux depends on enclosed charge, not the surface shape"] },
      applications: { en: ["Field inside a conductor = 0 (Faraday cage)", "Coaxial cables"] },
      comps: ["ipho"], research: { en: "Theoretical electrodynamics" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 3: Gauss's Law" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Gauss's law lessons" }, u: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.6 (Gauss's Law)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/6-introduction" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.5 (Application of Gauss' Law)" }, u: "https://www.feynmanlectures.caltech.edu/II_05.html" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.6 → Gauss's law problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/6-introduction" },
      ],
      quiz: [
        { q: { en: "Flux in Gauss's law depends on..." }, o: { en: ["Enclosed charge", "Surface shape", "Color"] }, a: 0 },
        { q: { en: "Gauss is most useful when there is..." }, o: { en: ["Symmetry", "Large charge", "Vacuum"] }, a: 0 },
      ] },
    { id: "electric-potential", stage: "a", pos: [500, 435], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: ["electric-field"],
      name: { en: "Electric Potential" },
      desc: { en: "Potential V, potential energy, E = −∇V." },
      why: { en: "The scalar V is easier to work with than the vector E, the energy route." },
      objectives: { en: ["Compute V from charges", "Use the V–E relation (gradient)", "Draw equipotential surfaces"] },
      misconceptions: { en: ["Potential ≠ potential energy (V = U/q)", "E need not be zero where V = 0"] },
      applications: { en: ["Voltage in batteries", "ECG, EEG, biopotentials"] },
      comps: ["ipho", "ioaa"], research: { en: "Condensed matter physics" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 4: Electric Potential" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Electric potential lessons" }, u: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.7 (Electric Potential)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/7-introduction" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Charges and Fields (plot equipotentials)" }, u: "https://phet.colorado.edu/en/simulations/charges-and-fields" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.7 → potential problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/7-introduction" },
      ],
      quiz: [
        { q: { en: "Relation between V and E?" }, o: { en: ["E = −∇V", "E = ∇V", "E = V²"] }, a: 0 },
        { q: { en: "Potential is a ___ quantity" }, o: { en: ["Scalar", "Vector", "Tensor"] }, a: 0 },
      ] },
    { id: "capacitance", stage: "a", pos: [360, 560], weeks: 2, h: 10, xp: 250, diff: 2, prereqs: ["electric-potential", "gauss-law"],
      name: { en: "Capacitance" },
      desc: { en: "C = Q/V, capacitors, stored energy." },
      why: { en: "Energy storage and filtering, a fundamental electronic component." },
      objectives: { en: ["Compute C of a parallel-plate capacitor", "Combine series and parallel", "Find the ½CV² energy"] },
      misconceptions: { en: ["Capacitance doesn't depend on applied voltage, it's geometric", "In series, capacitance DECREASES"] },
      applications: { en: ["Camera flashes, touchscreen sensing", "Power smoothing, memory"] },
      comps: ["ipho"], research: { en: "Nanoelectronics, energy storage" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 4: Capacitance" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.8 (Capacitance)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/8-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Capacitors lessons" }, u: "https://www.khanacademy.org/science/physics/circuits-topic" },
        { role: "sim", t: "sim", r: 5, l: { en: "PhET → Capacitor Lab: Basics" }, u: "https://phet.colorado.edu/en/simulations/capacitor-lab-basics" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.8 → capacitance problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/8-introduction" },
      ],
      quiz: [
        { q: { en: "Capacitance formula?" }, o: { en: ["Q/V", "V/Q", "QV"] }, a: 0 },
        { q: { en: "Energy stored in a capacitor?" }, o: { en: ["½CV²", "CV", "C/V"] }, a: 0 },
      ] },
    { id: "dielectrics", stage: "a", pos: [300, 685], weeks: 1, h: 8, xp: 250, diff: 2, prereqs: ["capacitance"],
      name: { en: "Dielectrics" },
      desc: { en: "Polarization, the dielectric constant, matter in a field." },
      why: { en: "Real capacitors use dielectrics, they boost capacitance many-fold." },
      objectives: { en: ["Explain polarization", "Understand how κ raises capacitance", "Relate D, E, P in matter"] },
      misconceptions: { en: ["A dielectric is an insulator, but it polarizes", "A dielectric weakens the field but doesn't cancel it"] },
      applications: { en: ["Ceramic & electrolytic capacitors", "Cable insulation"] },
      comps: ["ipho"], research: { en: "Materials physics, ferroelectrics" },
      res: [
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.8.5 (Dielectrics)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/8-introduction" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.10 (Dielectrics)" }, u: "https://www.feynmanlectures.caltech.edu/II_10.html" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Capacitor Lab: Basics (insert a dielectric)" }, u: "https://phet.colorado.edu/en/simulations/capacitor-lab-basics" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.8 → dielectric problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/8-introduction" },
      ],
      quiz: [
        { q: { en: "A dielectric does what to capacitance?" }, o: { en: ["Increases it", "Decreases it", "Zeroes it"] }, a: 0 },
        { q: { en: "What happens inside a dielectric?" }, o: { en: ["Polarization", "Current", "Decay"] }, a: 0 },
      ] },
    { id: "electric-current", stage: "a", pos: [660, 560], weeks: 1, h: 8, xp: 250, diff: 2, prereqs: ["electric-potential"],
      name: { en: "Electric Current" },
      desc: { en: "Current I = dQ/dt, current density, drift velocity." },
      why: { en: "From statics to charges in motion, the start of all electronics." },
      objectives: { en: ["Define current and current density", "Relate drift velocity to current", "Understand the current-direction convention"] },
      misconceptions: { en: ["Electrons drift slowly (mm/s) but the signal travels near light-speed", "Conventional current is the positive direction, electrons move opposite"] },
      applications: { en: ["Every electrical circuit", "LEDs, sensors"] },
      comps: ["ipho"], research: { en: "Mesoscopic physics" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 6: Current & Resistance" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.9.1–9.2 (Current)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/9-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Current lessons" }, u: "https://www.khanacademy.org/science/physics/circuits-topic" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.9 → current problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/9-introduction" },
      ],
      quiz: [
        { q: { en: "Definition of current?" }, o: { en: ["dQ/dt", "Q·t", "dV/dt"] }, a: 0 },
        { q: { en: "The electron drift speed is..." }, o: { en: ["Very slow (mm/s)", "Light speed", "Zero"] }, a: 0 },
      ] },
    { id: "resistance-ohm", stage: "a", pos: [660, 685], weeks: 2, h: 10, xp: 250, diff: 2, prereqs: ["electric-current"],
      name: { en: "Resistance & Ohm's Law" },
      desc: { en: "V = IR, resistivity, power P = IV." },
      why: { en: "The most practical law governing energy flow in circuits." },
      objectives: { en: ["Apply V = IR", "Distinguish resistivity from resistance", "Compute power and heat loss"] },
      misconceptions: { en: ["Ohm's law isn't universal (diodes are non-ohmic)", "Resistance depends on geometry & material, not voltage"] },
      applications: { en: ["Heaters, incandescent bulbs, fuses", "Sensors (thermistors, strain gauges)"] },
      comps: ["ipho", "Physics Bowl"], research: { en: "Materials conduction, nanosystems" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 6: Ohm's Law & Power" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.9.3–9.5 (Resistivity, Ohm's Law)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/9-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Resistance and Ohm's law" }, u: "https://www.khanacademy.org/science/physics/circuits-topic" },
        { role: "sim", t: "sim", r: 5, l: { en: "PhET → Ohm's Law" }, u: "https://phet.colorado.edu/en/simulations/ohms-law" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Resistance in a Wire" }, u: "https://phet.colorado.edu/en/simulations/resistance-in-a-wire" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.9 → resistance problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/9-introduction" },
      ],
      quiz: [
        { q: { en: "Ohm's law?" }, o: { en: ["V = IR", "V = I/R", "V = I²R"] }, a: 0 },
        { q: { en: "Electric power?" }, o: { en: ["P = IV", "P = I/V", "P = V/I"] }, a: 0 },
      ] },
    { id: "dc-circuits", stage: "a", pos: [480, 810], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: ["resistance-ohm", "capacitance"],
      name: { en: "DC Circuits" },
      desc: { en: "Kirchhoff's laws, series/parallel, RC circuits." },
      why: { en: "Turns theory into the ability to analyze real circuits." },
      objectives: { en: ["Apply Kirchhoff's node & loop laws", "Reduce series/parallel resistors", "Explain the RC charging curve"] },
      misconceptions: { en: ["Current isn't 'used up' in a circuit, it's conserved at nodes", "Parallel resistance is less than any single resistor"] },
      applications: { en: ["Every electronic device", "Timers, filters, phone chargers"] },
      comps: ["ipho", "Physics Bowl"], research: { en: "Electronic circuit design" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 7: DC Circuits" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.10 (Direct-Current Circuits)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/10-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Circuits with resistors lessons" }, u: "https://www.khanacademy.org/science/physics/circuits-topic" },
        { role: "sim", t: "sim", r: 5, l: { en: "PhET → Circuit Construction Kit: DC" }, u: "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.10 → circuit problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/10-introduction" },
      ],
      quiz: [
        { q: { en: "Kirchhoff's current law is based on..." }, o: { en: ["Charge conservation", "Energy loss", "Ohm's law"] }, a: 0 },
        { q: { en: "An RC circuit sets a..." }, o: { en: ["Time constant", "Only voltage", "No frequency"] }, a: 0 },
      ] },
    { id: "magnetic-field", stage: "a", pos: [660, 900], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: ["electric-current"],
      name: { en: "Magnetic Fields" },
      desc: { en: "The magnetic field B, magnetic flux, moving charges." },
      why: { en: "Motors, generators, MRI, magnetic fields power the modern world." },
      objectives: { en: ["Describe the B field and its sources", "Compute magnetic flux", "Understand how B differs from E"] },
      misconceptions: { en: ["No magnetic monopoles are known (∇·B = 0)", "A magnetic field exerts no force on a stationary charge"] },
      applications: { en: ["MRI, compasses, magnetic memory", "Particle accelerators"] },
      comps: ["ipho", "ioaa"], research: { en: "Magnetism, astrophysical fields" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 8: Magnetic Fields" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.11 (Magnetic Forces and Fields)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/11-introduction" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.13 (Magnetostatics)" }, u: "https://www.feynmanlectures.caltech.edu/II_13.html" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Magnets and Electromagnets" }, u: "https://phet.colorado.edu/en/simulations/magnets-and-electromagnets" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.11 → magnetic field problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/11-introduction" },
      ],
      quiz: [
        { q: { en: "∇·B = 0 expresses that there are no..." }, o: { en: ["Magnetic monopoles", "Electric charges", "Currents"] }, a: 0 },
        { q: { en: "A magnetic field exerts force on a charge that is..." }, o: { en: ["Moving", "Stationary", "Neutral"] }, a: 0 },
      ] },
    { id: "lorentz-force", stage: "a", pos: [880, 1025], weeks: 1, h: 8, xp: 250, diff: 2, prereqs: ["magnetic-field"],
      name: { en: "Lorentz Force" },
      desc: { en: "F = q(E + v×B), the combined force on a charge." },
      why: { en: "Unifies electric and magnetic forces in one equation." },
      objectives: { en: ["Compute the Lorentz force as vectors", "Explain circular motion in a B field", "Apply the right-hand rule"] },
      misconceptions: { en: ["The magnetic force does no work (⊥ to v)", "v×B is perpendicular to both v and B"] },
      applications: { en: ["Cyclotrons, mass spectrometers", "Old CRTs, auroras"] },
      comps: ["ipho"], research: { en: "Accelerator physics, plasma" },
      res: [
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.11.2–11.6 (Magnetic Force, Motion)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/11-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Magnetic force on a charge" }, u: "https://www.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.11 → Lorentz force problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/11-introduction" },
      ],
      quiz: [
        { q: { en: "The Lorentz force?" }, o: { en: ["q(E + v×B)", "qE only", "qv·B"] }, a: 0 },
        { q: { en: "Does the magnetic force do work?" }, o: { en: ["No (⊥ to velocity)", "Yes, always", "Sometimes"] }, a: 0 },
      ] },
    { id: "biot-savart", stage: "a", pos: [660, 1025], weeks: 2, h: 10, xp: 300, diff: 3, prereqs: ["magnetic-field"],
      name: { en: "Biot–Savart Law" },
      desc: { en: "The magnetic field from a current (integration)." },
      why: { en: "The 'Coulomb's law' of magnetostatics, the field of any current." },
      objectives: { en: ["Write the Biot–Savart law", "Integrate for the field of a wire/loop", "Compare with Ampère's law"] },
      misconceptions: { en: ["dB comes from a cross product (dl×r̂)", "Biot–Savart always holds but is tedious without symmetry"] },
      applications: { en: ["Solenoid & electromagnet design", "MRI coil design"] },
      comps: ["ipho"], research: { en: "Magnet systems engineering" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 9: Sources of Magnetic Field" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.12.1–12.3 (Biot–Savart)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/12-introduction" },
        { role: "viz", t: "book", r: 4, l: { en: "Feynman Lectures Vol II → Ch.14 (The Magnetic Field in Various Situations)" }, u: "https://www.feynmanlectures.caltech.edu/II_14.html" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.12 → Biot–Savart problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/12-introduction" },
      ],
      quiz: [
        { q: { en: "The Biot–Savart law gives the..." }, o: { en: ["Magnetic field of a current", "Electric field of a charge", "Voltage"] }, a: 0 },
        { q: { en: "The direction of dB comes from..." }, o: { en: ["dl×r̂ (cross product)", "Addition", "Dot product"] }, a: 0 },
      ] },
    { id: "amperes-law", stage: "a", pos: [660, 1150], weeks: 2, h: 10, xp: 300, diff: 3, prereqs: ["biot-savart"],
      name: { en: "Ampère's Law" },
      desc: { en: "∮B·dl = μ₀I, the magnetic field under symmetry." },
      why: { en: "The 'Gauss's law' of magnetostatics, instant fields with symmetry." },
      objectives: { en: ["Use Ampère to find B (wire, solenoid, toroid)", "Choose the right Amperian loop", "Compare with Biot–Savart"] },
      misconceptions: { en: ["Ampère's law always holds but is only useful with symmetry", "It's incomplete without Maxwell's added term"] },
      applications: { en: ["Solenoids, toroids, conducting cables", "Magnetic shielding"] },
      comps: ["ipho"], research: { en: "Theoretical electrodynamics" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 9: Ampère's Law" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.12.4–12.5 (Ampère's Law)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/12-introduction" },
        { role: "viz", t: "book", r: 4, l: { en: "Feynman Lectures Vol II → Ch.13 (Magnetostatics)" }, u: "https://www.feynmanlectures.caltech.edu/II_13.html" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.12 → Ampère's law problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/12-introduction" },
      ],
      quiz: [
        { q: { en: "Ampère's law relates B to the..." }, o: { en: ["Enclosed current", "Enclosed charge", "Flux"] }, a: 0 },
        { q: { en: "Ampère's law is most useful with..." }, o: { en: ["Symmetry", "Large current", "Vacuum"] }, a: 0 },
      ] },
    { id: "em-induction", stage: "a", pos: [460, 1275], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["amperes-law", "gauss-law"],
      name: { en: "Electromagnetic Induction" },
      desc: { en: "Faraday's law ε = −dΦ/dt, Lenz's law, inductance." },
      why: { en: "The principle that generates nearly all the world's electricity." },
      objectives: { en: ["Compute induced EMF via Faraday's law", "Find direction via Lenz's law", "Explain inductance and ½LI² energy"] },
      misconceptions: { en: ["EMF comes from the CHANGE in flux, not the flux itself", "Lenz's law is a consequence of energy conservation"] },
      applications: { en: ["Generators, transformers", "Induction stoves, wireless charging"] },
      comps: ["ipho", "Physics Bowl"], research: { en: "Power systems, wireless power" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 10: Faraday's Law" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.13 (Electromagnetic Induction)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/13-introduction" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.17 (The Laws of Induction)" }, u: "https://www.feynmanlectures.caltech.edu/II_17.html" },
        { role: "sim", t: "sim", r: 5, l: { en: "PhET → Faraday's Law" }, u: "https://phet.colorado.edu/en/simulations/faradays-law" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.13 → induction problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/13-introduction" },
      ],
      quiz: [
        { q: { en: "Faraday's law?" }, o: { en: ["ε = −dΦ/dt", "ε = Φt", "ε = BA"] }, a: 0 },
        { q: { en: "Lenz's law follows from..." }, o: { en: ["Energy conservation", "Charge conservation", "Ohm's law"] }, a: 0 },
      ] },
    { id: "maxwell-equations", stage: "a", pos: [460, 1400], weeks: 3, h: 18, xp: 400, diff: 3, prereqs: ["em-induction", "dielectrics", "amperes-law"],
      name: { en: "Maxwell's Equations" },
      desc: { en: "Four equations uniting electricity, magnetism, and light." },
      why: { en: "One of humanity's greatest theoretical unifications." },
      objectives: { en: ["Name the four equations and their meaning", "Understand the displacement-current term", "Show why light is a wave"] },
      misconceptions: { en: ["Maxwell completed Ampère by adding displacement current", "The equations imply fields are real, propagating things"] },
      applications: { en: ["All wireless comms, radar, optics", "Antennas and waveguides"] },
      comps: ["ipho"], research: { en: "Photonics, high-frequency electronics" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.02SC → Week 12: Maxwell's Equations" }, u: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/" },
        { role: "secondary", t: "video", r: 5, l: { en: "3Blue1Brown → “Divergence and curl: Maxwell's equations”" }, u: "https://www.youtube.com/watch?v=rB83DpBJQsE" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.18 (The Maxwell Equations)" }, u: "https://www.feynmanlectures.caltech.edu/II_18.html" },
        { role: "advanced", t: "book", r: 5, l: { en: "David Tong → Electromagnetism (Cambridge) · Ch.1 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/em.html" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.16.1 → Maxwell's equations problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/16-introduction" },
      ],
      quiz: [
        { q: { en: "How many Maxwell's equations?" }, o: { en: ["4", "3", "5"] }, a: 0 },
        { q: { en: "What did Maxwell add to Ampère's law?" }, o: { en: ["Displacement current", "Charge", "Mass"] }, a: 0 },
      ] },
    { id: "em-plane-waves", stage: "a", pos: [460, 1525], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["maxwell-equations"],
      name: { en: "Electromagnetic Waves" },
      desc: { en: "The wave equation, c = 1/√(μ₀ε₀), polarization, the spectrum." },
      why: { en: "Maxwell revealed that light itself is an electromagnetic wave." },
      objectives: { en: ["Derive the wave equation from Maxwell", "Show E ⊥ B ⊥ propagation", "Compute energy flow (Poynting vector)"] },
      misconceptions: { en: ["EM waves need no medium (travel in vacuum)", "Radio, light, X-rays differ only in frequency"] },
      applications: { en: ["Radio, WiFi, light, X-rays", "Fiber-optic communication"] },
      comps: ["ipho", "ioaa"], research: { en: "Photonics, optical communication" },
      res: [
        { role: "primary", t: "course", r: 5, l: { en: "MIT 8.03 → Electromagnetic Waves section" }, u: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Univ. Physics II → Ch.16 (Electromagnetic Waves)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/16-introduction" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.20 (Solutions of Maxwell's Equations in Free Space)" }, u: "https://www.feynmanlectures.caltech.edu/II_20.html" },
        { role: "practice", t: "practice", r: 4, l: { en: "OpenStax Ch.16 → wave problems" }, u: "https://openstax.org/books/university-physics-volume-2/pages/16-introduction" },
      ],
      quiz: [
        { q: { en: "Speed of EM waves in vacuum?" }, o: { en: ["c = 1/√(μ₀ε₀)", "Slower than sound", "Infinite"] }, a: 0 },
        { q: { en: "In an EM wave, E and B are..." }, o: { en: ["Perpendicular to each other", "Parallel", "Opposite"] }, a: 0 },
      ] },
    { id: "em-radiation", stage: "a", pos: [460, 1650], weeks: 3, h: 18, xp: 400, diff: 3, prereqs: ["em-plane-waves"],
      name: { en: "Radiation" },
      desc: { en: "Accelerating charges, dipole radiation, antennas." },
      why: { en: "Accelerating charges radiate waves, the heart of every transmitter." },
      objectives: { en: ["Explain why accelerating charges radiate", "Describe the dipole radiation pattern", "Estimate radiated power"] },
      misconceptions: { en: ["A charge at constant velocity doesn't radiate, only accelerating ones", "Near-field and far-field (radiation) differ"] },
      applications: { en: ["Antennas, radio broadcasting", "Synchrotron radiation, medical imaging"] },
      comps: ["ipho"], research: { en: "Antenna theory, synchrotron sources" },
      res: [
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.21 (Solutions with Currents and Charges)" }, u: "https://www.feynmanlectures.caltech.edu/II_21.html" },
        { role: "advanced", t: "book", r: 5, l: { en: "David Tong → Electromagnetism · Ch.6 (Radiation) (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/em.html" },
        { role: "practice", t: "practice", r: 4, l: { en: "arXiv physics.class-ph → read one abstract" }, u: "https://arxiv.org/list/physics.class-ph/new" },
      ],
      quiz: [
        { q: { en: "Which charge radiates?" }, o: { en: ["Accelerating", "Constant velocity", "Stationary"] }, a: 0 },
        { q: { en: "Antennas exploit..." }, o: { en: ["Radiation from accelerating charge", "Steady current", "Static charge"] }, a: 0 },
      ] },
    { id: "advanced-electrodynamics", stage: "o", pos: [460, 1775], weeks: 5, h: 25, xp: 450, diff: 3, prereqs: ["em-radiation"],
      name: { en: "Advanced Electrodynamics" },
      desc: { en: "Covariant form, the field tensor, gauge, and relativity." },
      why: { en: "The capstone: seeing E and M as one relativistic field." },
      objectives: { en: ["Write Maxwell in tensor form", "Understand gauge invariance", "Show magnetism = relativistic electricity"] },
      misconceptions: { en: ["E and B are observer-dependent (parts of one field)", "Potentials carry physical meaning (Aharonov–Bohm)"] },
      applications: { en: ["Particle physics, accelerators", "Relativistic plasmas, astrophysics"] },
      comps: ["ipho"], research: { en: "Quantum field theory, high-energy physics" },
      res: [
        { role: "primary", t: "book", r: 5, l: { en: "David Tong → Electromagnetism (Cambridge) · full course (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/em.html" },
        { role: "practice", t: "practice", r: 4, l: { en: "arXiv physics.class-ph → read a research abstract" }, u: "https://arxiv.org/list/physics.class-ph/new" },
      ],
      quiz: null },
  ] },
  { id: "phys-quantum", icon: "⚛️", w: 900, h: 1090,
    name: { en: "Quantum Mechanics" },
    desc: { en: "From the old quantum theory to quantum information, a full curriculum" },
    nodes: [
    { id: "old-quantum", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Old Quantum Theory" },
      desc: { en: "Blackbody, photoelectric effect, the Bohr atom, wave-particle duality." },
      why: { en: "The story of why classical physics failed and quantum was born." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics III → Ch.6 (Photons & Matter Waves)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/6-introduction" },
        { t: "video", r: 5, l: { en: "PBS Space Time → quantum intro videos" }, u: "https://www.youtube.com/watch?v=p7bzE1E5PMY" },
        { t: "video", r: 4, l: { en: "Khan → Photons and the photoelectric effect" }, u: "https://www.khanacademy.org/science/physics/quantum-physics" },
      ],
      notes: { en: ["E = hf (Planck/Einstein)", "Photoelectric effect = light as particles", "de Broglie: matter is also a wave"] },
      quiz: [
        { q: { en: "Photon energy E = ?" }, o: { en: ["hf", "mc²", "½mv²"] }, a: 0 },
        { q: { en: "de Broglie's idea?" }, o: { en: ["Matter has wave nature", "Light stops", "Atoms are indivisible"] }, a: 0 },
      ] },
    { id: "qm-math", stage: "f", pos: [450, 195], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["old-quantum"],
      name: { en: "Math Tools for QM" },
      desc: { en: "Complex numbers, linear algebra, probability, Hilbert space." },
      why: { en: "QM = linear algebra + probability. These tools are essential." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Essence of Linear Algebra (full)" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
        { t: "course", r: 4, l: { en: "MIT 8.05 → Unit 1: Linear Algebra & QM" }, u: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/" },
      ],
      notes: { en: ["A state = a vector in Hilbert space", "Observables = Hermitian operators", "|ψ|² = probability density"] },
      quiz: [
        { q: { en: "A quantum state is represented by a..." }, o: { en: ["Vector", "Scalar", "Matrix row"] }, a: 0 },
        { q: { en: "|ψ|² represents..." }, o: { en: ["Probability density", "Energy", "Velocity"] }, a: 0 },
      ] },
    { id: "schrodinger-1d", stage: "a", pos: [450, 330], weeks: 5, h: 25, xp: 350, diff: 3, prereqs: ["qm-math"],
      name: { en: "Schrödinger Equation (1D)" },
      desc: { en: "Wave functions, wells, potential barriers, the harmonic oscillator." },
      why: { en: "The F = ma of quantum mechanics. Everything is computed from here." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 8.04 → Wavefunctions & Schrödinger Equation section" }, u: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/" },
        { t: "sim", r: 5, l: { en: "PhET → Quantum Bound States" }, u: "https://phet.colorado.edu/en/simulations/bound-states" },
      ],
      notes: { en: ["iħ ∂ψ/∂t = Ĥψ", "Bound states → discrete energies", "Tunneling: passing through barriers"] },
      quiz: [
        { q: { en: "A bound particle's energy is..." }, o: { en: ["Quantized (discrete)", "Continuous", "Zero"] }, a: 0 },
        { q: { en: "Quantum tunneling is..." }, o: { en: ["Passing a forbidden region", "Fast motion", "Losing energy"] }, a: 0 },
      ] },
    { id: "operators-formalism", stage: "a", pos: [450, 465], weeks: 5, h: 25, xp: 350, diff: 3, prereqs: ["schrodinger-1d"],
      name: { en: "Operators & Formalism" },
      desc: { en: "Hermitian operators, commutators, uncertainty, Dirac notation." },
      why: { en: "Here you discover Heisenberg's uncertainty principle." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 8.05 → Unit 2: Operators & Uncertainty" }, u: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/" },
      ],
      notes: { en: ["[x,p] = iħ (commutator)", "ΔxΔp ≥ ħ/2 (uncertainty)", "|ψ⟩ = Dirac ket notation"] },
      quiz: [
        { q: { en: "Heisenberg's principle limits knowing..." }, o: { en: ["Position & momentum together", "Only energy", "Only time"] }, a: 0 },
        { q: { en: "[x,p] = ?" }, o: { en: ["iħ", "0", "1"] }, a: 0 },
      ] },
    { id: "hydrogen-3d", stage: "a", pos: [275, 600], weeks: 5, h: 25, xp: 400, diff: 3, prereqs: ["operators-formalism"],
      name: { en: "3D & the Hydrogen Atom" },
      desc: { en: "3D Schrödinger, the hydrogen atom, orbitals." },
      why: { en: "The entire periodic table of chemistry emerges here." },
      res: [
        { t: "course", r: 4, l: { en: "MIT 8.04 → Hydrogen Atom section" }, u: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/" },
        { t: "video", r: 4, l: { en: "3B1B-style → hydrogen wavefunctions visualized" }, u: "https://www.youtube.com/watch?v=W2Xb2GFK2yc" },
      ],
      notes: { en: ["Quantum numbers: n, l, m", "Orbitals = shapes of wavefunctions", "Hydrogen = exactly solvable"] },
      quiz: [
        { q: { en: "How many quantum numbers describe an orbital (n,l,m)?" }, o: { en: ["3", "1", "5"] }, a: 0 },
        { q: { en: "An orbital represents..." }, o: { en: ["Electron probability", "A fixed path", "Charge"] }, a: 0 },
      ] },
    { id: "spin-angular", stage: "a", pos: [275, 735], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["hydrogen-3d"],
      name: { en: "Spin & Angular Momentum" },
      desc: { en: "Spin, Pauli matrices, adding angular momenta." },
      why: { en: "Spin is purely quantum, with no classical analog." },
      res: [
        { t: "course", r: 4, l: { en: "MIT 8.05 → Angular Momentum & Spin section" }, u: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/" },
        { t: "video", r: 4, l: { en: "Physics Explained → “What is spin?”" }, u: "https://www.youtube.com/watch?v=pWlk1gLkF2Y" },
      ],
      notes: { en: ["Electron spin = ½", "Pauli matrices describe spin", "Spin determines statistics"] },
      quiz: [
        { q: { en: "What is the electron's spin?" }, o: { en: ["½", "1", "0"] }, a: 0 },
        { q: { en: "Does spin have a classical analog?" }, o: { en: ["No, purely quantum", "Yes, spinning", "Yes, orbits"] }, a: 0 },
      ] },
    { id: "perturbation", stage: "a", pos: [625, 600], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["operators-formalism"],
      name: { en: "Perturbation Theory" },
      desc: { en: "Approximation methods, the variational principle, splittings (Stark, Zeeman)." },
      why: { en: "Real systems are rarely exactly solvable, approximation is essential." },
      res: [
        { t: "course", r: 4, l: { en: "MIT 8.06 → Perturbation Theory section" }, u: "https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/" },
      ],
      notes: { en: ["Correct a small perturbation order by order", "Variational: bounds the ground-state energy", "Zeeman = splitting in a magnetic field"] },
      quiz: [
        { q: { en: "When is perturbation theory used?" }, o: { en: ["When no exact solution exists", "Always", "Never"] }, a: 0 },
        { q: { en: "The variational method gives a..." }, o: { en: ["Bound on ground energy", "Exact answer", "Velocity"] }, a: 0 },
      ] },
    { id: "identical-particles", stage: "a", pos: [275, 870], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["spin-angular"],
      name: { en: "Identical Particles" },
      desc: { en: "Bosons and fermions, the Pauli principle, many-body systems." },
      why: { en: "Explains why electrons stack and why stars don't collapse." },
      res: [
        { t: "video", r: 4, l: { en: "PBS Space Time → “Pauli exclusion principle”" }, u: "https://www.youtube.com/watch?v=D6gAsCe0Rtg" },
      ],
      notes: { en: ["Fermions: antisymmetric, Pauli exclusion", "Bosons: symmetric, can pile up", "Spin determines statistics"] },
      quiz: [
        { q: { en: "Can two electrons share the same state?" }, o: { en: ["No (Pauli)", "Yes", "Sometimes"] }, a: 0 },
        { q: { en: "An electron is a..." }, o: { en: ["Fermion", "Boson", "Neither"] }, a: 0 },
      ] },
    { id: "quantum-info-intro", stage: "o", pos: [450, 1005], weeks: 5, h: 25, xp: 450, diff: 3, prereqs: ["perturbation", "identical-particles"],
      name: { en: "Quantum Information (Intro)" },
      desc: { en: "Qubits, entanglement, quantum gates, Bell inequalities." },
      why: { en: "Quantum computing and cryptography, the 21st-century frontier." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Qiskit Textbook → Ch.1 (Quantum States & Qubits)" }, u: "https://qiskit.org/learn/" },
        { t: "video", r: 5, l: { en: "Qiskit → Coding with Qiskit series · Ep.1" }, u: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvrgHZt3exM_NNiNKGZqTQaN" },
        { t: "practice", r: 4, l: { en: "IBM Quantum → experiment on a real quantum computer" }, u: "https://quantum.ibm.com/" },
      ],
      notes: { en: ["A qubit = a bit in superposition", "Entanglement = 'spooky action at a distance'", "Connect to the Research path"] },
      quiz: [
        { q: { en: "How does a qubit differ from a bit?" }, o: { en: ["Can be in superposition", "Faster", "Bigger"] }, a: 0 },
        { q: { en: "What is entanglement?" }, o: { en: ["Correlation between qubits", "Speed", "Charge"] }, a: 0 },
      ] },
  ] },
  { id: "phys-statmech", icon: "🎲", w: 900, h: 820,
    name: { en: "Statistical Mechanics" },
    desc: { en: "From probability to phase transitions, micro to macro" },
    nodes: [
    { id: "sm-probability", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Probability & Ensembles" },
      desc: { en: "Statistical distributions, microstates vs macrostates, the ensemble idea." },
      why: { en: "Understand 10²³ particles statistically, not one by one." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Statistical Physics (Cambridge) · Ch.1 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/statphys.html" },
        { t: "course", r: 4, l: { en: "MIT 8.044 → Probability section" }, u: "https://ocw.mit.edu/courses/8-044-statistical-physics-i-spring-2013/" },
        { t: "video", r: 4, l: { en: "Khan → Statistics: distributions" }, u: "https://www.khanacademy.org/math/statistics-probability" },
      ],
      notes: { en: ["A macrostate = many microstates", "Most probable state = equilibrium", "Entropy = ln(number of microstates)"] },
      quiz: [
        { q: { en: "Entropy is related to the number of..." }, o: { en: ["Microstates", "Particles", "Dimensions"] }, a: 0 },
        { q: { en: "Equilibrium is the ___ state" }, o: { en: ["Most probable", "Lowest energy", "Coldest"] }, a: 0 },
      ] },
    { id: "microcanonical", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["sm-probability"],
      name: { en: "Microcanonical Ensemble" },
      desc: { en: "Isolated systems, equal a-priori probability, the statistical definition of entropy." },
      why: { en: "Boltzmann's famous S = k ln W comes from here." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Statistical Physics · Ch.1.2 (Microcanonical)" }, u: "https://www.damtp.cam.ac.uk/user/tong/statphys.html" },
      ],
      notes: { en: ["S = k ln W (Boltzmann)", "Isolated: E, N, V fixed", "All microstates are equally likely"] },
      quiz: [
        { q: { en: "Boltzmann's entropy formula?" }, o: { en: ["S = k ln W", "E = mc²", "PV = nRT"] }, a: 0 },
        { q: { en: "In the microcanonical ensemble, what is fixed?" }, o: { en: ["Energy", "Temperature", "Pressure"] }, a: 0 },
      ] },
    { id: "canonical", stage: "a", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["microcanonical"],
      name: { en: "Canonical Ensemble" },
      desc: { en: "Contact with a heat bath, the partition function Z, the Boltzmann factor." },
      why: { en: "The most useful tool in stat mech, Z gives you everything." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Statistical Physics · Ch.2 (Canonical Ensemble)" }, u: "https://www.damtp.cam.ac.uk/user/tong/statphys.html" },
        { t: "course", r: 4, l: { en: "MIT 8.044 → Canonical Ensemble section" }, u: "https://ocw.mit.edu/courses/8-044-statistical-physics-i-spring-2013/" },
      ],
      notes: { en: ["P ∝ e^(−E/kT) (Boltzmann factor)", "Z = Σ e^(−E/kT)", "From Z: energy, entropy, everything"] },
      quiz: [
        { q: { en: "The Boltzmann factor?" }, o: { en: ["e^(−E/kT)", "E/kT", "kT/E"] }, a: 0 },
        { q: { en: "What is Z?" }, o: { en: ["The partition function", "Energy", "Temperature"] }, a: 0 },
      ] },
    { id: "grand-canonical", stage: "a", pos: [450, 465], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["canonical"],
      name: { en: "Grand Canonical Ensemble" },
      desc: { en: "Particle exchange, chemical potential, the grand partition function." },
      why: { en: "The bridge to quantum statistics (Bose, Fermi)." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Statistical Physics · Ch.3 (Grand Canonical)" }, u: "https://www.damtp.cam.ac.uk/user/tong/statphys.html" },
      ],
      notes: { en: ["μ = chemical potential", "Particle number can vary", "Basis of quantum gases"] },
      quiz: [
        { q: { en: "In the grand canonical ensemble, what is exchanged?" }, o: { en: ["Energy and particles", "Only volume", "Nothing"] }, a: 0 },
        { q: { en: "What does μ represent?" }, o: { en: ["Chemical potential", "Mass", "Magnetization"] }, a: 0 },
      ] },
    { id: "quantum-stats", stage: "a", pos: [450, 600], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["grand-canonical"],
      name: { en: "Quantum Statistics" },
      desc: { en: "Bose–Einstein & Fermi–Dirac distributions, the Fermi gas, BE condensate." },
      why: { en: "Stars, metals, lasers, ultracold atoms, all from here." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Statistical Physics · Ch.3.5–3.6 (Quantum Gases)" }, u: "https://www.damtp.cam.ac.uk/user/tong/statphys.html" },
        { t: "video", r: 4, l: { en: "PBS Space Time → “Bose-Einstein condensate”" }, u: "https://www.youtube.com/watch?v=eLxG5ySTVW0" },
      ],
      notes: { en: ["Fermions: one per state (Fermi–Dirac)", "Bosons: can pile up (Bose–Einstein)", "Fermi gas = metals, white dwarfs"] },
      quiz: [
        { q: { en: "Fermions follow which statistics?" }, o: { en: ["Fermi–Dirac", "Bose–Einstein", "Maxwell"] }, a: 0 },
        { q: { en: "A BE condensate forms from..." }, o: { en: ["Bosons", "Fermions", "Electrons"] }, a: 0 },
      ] },
    { id: "phase-transitions", stage: "o", pos: [450, 735], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["quantum-stats"],
      name: { en: "Phase Transitions" },
      desc: { en: "The Ising model, critical phenomena, order parameters." },
      why: { en: "From boiling water to magnetization, nature's abrupt changes." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Statistical Physics · Ch.5 (Phase Transitions)" }, u: "https://www.damtp.cam.ac.uk/user/tong/statphys.html" },
        { t: "practice", r: 4, l: { en: "arXiv cond-mat.stat-mech → read one abstract" }, u: "https://arxiv.org/list/cond-mat.stat-mech/new" },
      ],
      notes: { en: ["Ising = a simple spin model", "At criticality all scales matter", "Universality: different systems, same laws"] },
      quiz: [
        { q: { en: "The Ising model models..." }, o: { en: ["Interacting spins", "Planets", "Molecules"] }, a: 0 },
        { q: { en: "Water freezing to ice is a..." }, o: { en: ["Phase transition", "Chemical reaction", "Nuclear decay"] }, a: 0 },
      ] },
  ] },
  { id: "phys-condensed", icon: "💎", w: 900, h: 880,
    name: { en: "Condensed Matter Physics" },
    desc: { en: "From crystals to topology, the physics of solids" },
    nodes: [
    { id: "crystal-structure", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Crystal Structure" },
      desc: { en: "Lattices, bases, unit cells, crystal systems." },
      why: { en: "Every property of a solid starts with atomic arrangement." },
      res: [
        { t: "video", r: 5, l: { en: "Steven Simon → Oxford Solid State · Lecture 1" }, u: "https://www.youtube.com/playlist?list=PLarP9uJyRmNiPFo43php4tLGDlqNTmqON" },
        { t: "book", r: 4, l: { en: "Simon → Oxford Solid State Basics · Ch.10-12 (podcast)" }, u: "https://podcasts.ox.ac.uk/series/oxford-solid-state-basics" },
      ],
      notes: { en: ["Lattice + basis = crystal", "The unit cell repeats", "FCC, BCC, HCP, common structures"] },
      quiz: [
        { q: { en: "A crystal is defined by..." }, o: { en: ["Lattice + basis", "Only atoms", "Temperature"] }, a: 0 },
        { q: { en: "The unit cell..." }, o: { en: ["Repeats to form the crystal", "Melts", "Is charged"] }, a: 0 },
      ] },
    { id: "reciprocal-lattice", stage: "a", pos: [275, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["crystal-structure"],
      name: { en: "Reciprocal Lattice & Diffraction" },
      desc: { en: "Reciprocal space, Bragg's law, Brillouin zones." },
      why: { en: "How X-ray diffraction reads a crystal's structure." },
      res: [
        { t: "video", r: 4, l: { en: "Steven Simon → Oxford Solid State · reciprocal lattice lectures" }, u: "https://www.youtube.com/playlist?list=PLarP9uJyRmNiPFo43php4tLGDlqNTmqON" },
      ],
      notes: { en: ["Reciprocal lattice = Fourier partner", "Bragg: 2d sinθ = nλ", "Brillouin zone = reciprocal unit cell"] },
      quiz: [
        { q: { en: "Bragg's law?" }, o: { en: ["2d sinθ = nλ", "E = hf", "F = ma"] }, a: 0 },
        { q: { en: "Crystal structure is probed with..." }, o: { en: ["X-ray diffraction", "Sound", "Photography"] }, a: 0 },
      ] },
    { id: "free-electron", stage: "a", pos: [625, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["crystal-structure"],
      name: { en: "Free Electron Model" },
      desc: { en: "The electron gas, Fermi energy, thermal & electrical conductivity." },
      why: { en: "The first explanation of why metals conduct." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong, Solid State Physics (free electron & bands)" }, u: "https://www.damtp.cam.ac.uk/user/tong/solidstate.html" },
      ],
      notes: { en: ["Electrons = a free quantum gas", "Fermi energy = highest filled level", "Only electrons near E_F carry current"] },
      quiz: [
        { q: { en: "The Fermi energy is..." }, o: { en: ["Highest filled level", "Lowest energy", "Heat"] }, a: 0 },
        { q: { en: "In a metal, electrons are modeled as a..." }, o: { en: ["Quantum gas", "Crystal", "Liquid drop"] }, a: 0 },
      ] },
    { id: "phonons", stage: "a", pos: [275, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["reciprocal-lattice"],
      name: { en: "Phonons" },
      desc: { en: "Lattice vibrations, heat capacity, thermal conductivity." },
      why: { en: "The quantum explanation of how heat moves through solids." },
      res: [
        { t: "video", r: 4, l: { en: "Steven Simon → Oxford Solid State · phonons lectures" }, u: "https://www.youtube.com/playlist?list=PLarP9uJyRmNiPFo43php4tLGDlqNTmqON" },
      ],
      notes: { en: ["A phonon = a quantum of lattice vibration", "Explains heat capacity (Debye)", "Sound = acoustic phonons"] },
      quiz: [
        { q: { en: "A phonon is a quantum of..." }, o: { en: ["Lattice vibration", "Light", "Charge"] }, a: 0 },
        { q: { en: "Phonons help explain..." }, o: { en: ["Heat capacity", "Color", "Magnetism"] }, a: 0 },
      ] },
    { id: "band-theory", stage: "a", pos: [450, 360], weeks: 5, h: 25, xp: 400, diff: 3, prereqs: ["reciprocal-lattice", "free-electron"],
      name: { en: "Band Theory" },
      desc: { en: "Bloch's theorem, energy bands, the band gap." },
      why: { en: "The master key distinguishing conductors, insulators, semiconductors." },
      res: [
        { t: "sim", r: 5, l: { en: "PhET → Band Structure" }, u: "https://phet.colorado.edu/en/simulations/band-structure" },
        { t: "video", r: 4, l: { en: "Steven Simon → Oxford Solid State · band theory lectures" }, u: "https://www.youtube.com/playlist?list=PLarP9uJyRmNiPFo43php4tLGDlqNTmqON" },
      ],
      notes: { en: ["Bloch: wavefunction × periodicity", "A band gap → insulator", "A full band carries no current"] },
      quiz: [
        { q: { en: "A material with a band gap is a..." }, o: { en: ["Insulator/semiconductor", "Metal", "Superconductor"] }, a: 0 },
        { q: { en: "Bloch's theorem describes..." }, o: { en: ["Wavefunctions in a periodic lattice", "Heat", "Magnetism"] }, a: 0 },
      ] },
    { id: "cm-semiconductors", stage: "a", pos: [275, 500], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["band-theory"],
      name: { en: "Semiconductors" },
      desc: { en: "Doping, the p-n junction, the transistor." },
      why: { en: "All modern electronics, computers, phones, start here." },
      res: [
        { t: "sim", r: 5, l: { en: "PhET → Semiconductors" }, u: "https://phet.colorado.edu/en/simulations/semiconductor" },
        { t: "video", r: 4, l: { en: "Ben Eater / similar → “How semiconductors work”" }, u: "https://www.youtube.com/watch?v=33vbFFFn04k" },
      ],
      notes: { en: ["Doping = adding levels in the gap", "A p-n junction = a diode", "The transistor = foundation of the modern world"] },
      quiz: [
        { q: { en: "Doping changes a semiconductor's..." }, o: { en: ["Conductivity", "Color", "Mass"] }, a: 0 },
        { q: { en: "A p-n junction forms a..." }, o: { en: ["Diode", "Resistor", "Capacitor"] }, a: 0 },
      ] },
    { id: "magnetism", stage: "a", pos: [625, 500], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["free-electron"],
      name: { en: "Magnetism" },
      desc: { en: "Dia-, para-, ferromagnetism, the exchange interaction." },
      why: { en: "Hard drives and magnetic memory, a result of quantum exchange." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Feynman Lectures II, Ch.34: The Magnetism of Matter" }, u: "https://www.feynmanlectures.caltech.edu/II_34.html" },
      ],
      notes: { en: ["Ferromagnet = aligned spins", "Exchange is quantum in origin", "Lost above the Curie temperature"] },
      quiz: [
        { q: { en: "Ferromagnetism is caused by..." }, o: { en: ["Aligned spins", "Light", "Heat"] }, a: 0 },
        { q: { en: "Magnetism is lost above the..." }, o: { en: ["Curie temperature", "Boiling point", "Zero"] }, a: 0 },
      ] },
    { id: "superconductivity", stage: "o", pos: [450, 640], weeks: 5, h: 25, xp: 450, diff: 3, prereqs: ["band-theory"],
      name: { en: "Superconductivity" },
      desc: { en: "Zero resistance, the Meissner effect, Cooper pairs, BCS theory." },
      why: { en: "The physics behind MRI machines, particle accelerators, and quantum computers." },
      res: [
        { t: "video", r: 5, l: { en: "Veritasium → superconductor story" }, u: "https://www.youtube.com/watch?v=jVtqfjTfppg" },
        { t: "practice", r: 4, l: { en: "arXiv cond-mat.supr-con → read one abstract" }, u: "https://arxiv.org/list/cond-mat.supr-con/new" },
      ],
      notes: { en: ["Zero resistance + Meissner effect", "A Cooper pair = 2 bound electrons", "Connect to the Research path"] },
      quiz: [
        { q: { en: "A superconductor's resistance?" }, o: { en: ["Zero", "Large", "Infinite"] }, a: 0 },
        { q: { en: "A Cooper pair is..." }, o: { en: ["Two bound electrons", "Two protons", "An atom"] }, a: 0 },
      ] },
    { id: "topological-matter", stage: "o", pos: [625, 780], weeks: 5, h: 25, xp: 450, diff: 3, prereqs: ["band-theory"],
      name: { en: "Topological Matter" },
      desc: { en: "Topological insulators, edge states, the quantum Hall effect." },
      why: { en: "The 2016 Nobel Prize, the hottest area of condensed matter." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Quantum Hall Effect (Cambridge) · Ch.1 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/qhe.html" },
        { t: "video", r: 4, l: { en: "PBS Space Time → topological matter" }, u: "https://www.youtube.com/watch?v=zNjknwuisdI" },
        { t: "practice", r: 4, l: { en: "arXiv cond-mat.mes-hall → read one abstract" }, u: "https://arxiv.org/list/cond-mat.mes-hall/new" },
      ],
      notes: { en: ["Insulating inside, conducting on edges", "Topology = an invariant like 'hole count'", "Connect to the Research path"] },
      quiz: [
        { q: { en: "A topological insulator conducts on its..." }, o: { en: ["Edges/surface", "Inside", "Nowhere"] }, a: 0 },
        { q: { en: "The quantum Hall effect features..." }, o: { en: ["Quantized conductance", "Zero temperature", "Light"] }, a: 0 },
      ] },
  ] },
  { id: "phys-nuclear", icon: "☢️", w: 900, h: 690,
    name: { en: "Nuclear Physics" },
    desc: { en: "From nuclear structure to reactors and medicine" },
    nodes: [
    { id: "nuclear-structure", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Nuclear Structure" },
      desc: { en: "Protons, neutrons, binding energy, the mass defect." },
      why: { en: "Atomic mass and every energy source start here." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics III → Ch.10 (Nuclear Physics)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/10-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Nuclear physics: nucleus lessons" }, u: "https://www.khanacademy.org/science/physics/quantum-physics/in-in-nuclei" },
      ],
      notes: { en: ["Mass defect → E = Δmc² binding energy", "Iron is the most stable region", "The strong force holds the nucleus"] },
      quiz: [
        { q: { en: "Nuclear binding energy comes from the..." }, o: { en: ["Mass defect", "Charge", "Spin"] }, a: 0 },
        { q: { en: "Nuclei are most stable around..." }, o: { en: ["Iron (Fe)", "Hydrogen", "Uranium"] }, a: 0 },
      ] },
    { id: "radioactivity", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["nuclear-structure"],
      name: { en: "Radioactivity" },
      desc: { en: "Alpha, beta, gamma decay, half-life." },
      why: { en: "Dating, medicine, energy, the uses of radiation." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics III → Ch.10.4–10.5 (Radioactive Decay)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/10-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Radioactive decay lessons" }, u: "https://www.khanacademy.org/science/physics/quantum-physics/in-in-nuclei" },
        { t: "practice", r: 4, l: { en: "OpenStax Ch.10 → end-of-chapter problems" }, u: "https://openstax.org/books/university-physics-volume-3/pages/10-introduction" },
      ],
      notes: { en: ["Alpha = He nucleus, beta = electron, gamma = photon", "N = N₀e^(−λt)", "Half-life is constant"] },
      quiz: [
        { q: { en: "An alpha particle is a..." }, o: { en: ["Helium nucleus", "Electron", "Photon"] }, a: 0 },
        { q: { en: "Half-life is the time for..." }, o: { en: ["Half to decay", "All to decay", "Doubling"] }, a: 0 },
      ] },
    { id: "nuclear-reactions", stage: "a", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["radioactivity"],
      name: { en: "Nuclear Reactions" },
      desc: { en: "Fission, fusion, reaction cross-sections." },
      why: { en: "Stars, nuclear power, the H-bomb, all here." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics III → Ch.10.6–10.7 (Fission, Fusion)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/10-introduction" },
        { t: "video", r: 4, l: { en: "PBS Space Time → nuclear fusion videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Fission: heavy nucleus splits", "Fusion: light nuclei merge", "Both release energy via E = mc²"] },
      quiz: [
        { q: { en: "The Sun shines via..." }, o: { en: ["Fusion", "Fission", "Burning"] }, a: 0 },
        { q: { en: "Nuclear power plants use..." }, o: { en: ["Fission", "Fusion", "Chemical reaction"] }, a: 0 },
      ] },
    { id: "nuclear-models", stage: "a", pos: [450, 465], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["nuclear-reactions"],
      name: { en: "Nuclear Models" },
      desc: { en: "The liquid-drop model, the shell model, magic numbers." },
      why: { en: "Why nuclei have the binding energies and stability they do." },
      res: [
        { t: "video", r: 4, l: { en: "Khan → Nuclear stability lessons" }, u: "https://www.khanacademy.org/science/physics/quantum-physics/in-in-nuclei" },
      ],
      notes: { en: ["Liquid drop: explains binding energy", "Shell: magic numbers (2,8,20,28...)", "The two models complement each other"] },
      quiz: [
        { q: { en: "Magic numbers relate to..." }, o: { en: ["Filled shells", "Charge", "Speed"] }, a: 0 },
        { q: { en: "The liquid-drop model explains..." }, o: { en: ["Binding energy", "Color", "Spin only"] }, a: 0 },
      ] },
    { id: "nuclear-applications", stage: "o", pos: [450, 600], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["nuclear-models"],
      name: { en: "Nuclear Applications" },
      desc: { en: "Reactors, nuclear medicine, carbon dating." },
      why: { en: "From theory to real-world technology." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics III → Ch.10.8 (Applications & Effects)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/10-introduction" },
        { t: "practice", r: 4, l: { en: "arXiv nucl-ex → read one abstract" }, u: "https://arxiv.org/list/nucl-ex/new" },
      ],
      notes: { en: ["Reactor = controlled fission", "PET/radiotherapy = nuclear medicine", "Connect to the Research path"] },
      quiz: null },
  ] },
  { id: "phys-particle", icon: "🌀", w: 900, h: 820,
    name: { en: "Particle Physics" },
    desc: { en: "The Standard Model and beyond, matter's smallest pieces" },
    nodes: [
    { id: "standard-model", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "The Standard Model" },
      desc: { en: "Quarks, leptons, the four fundamental interactions." },
      why: { en: "All matter in the universe is built from 17 particles." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "CERN → The Standard Model overview" }, u: "https://home.cern/science/physics/standard-model" },
        { t: "video", r: 5, l: { en: "PBS Space Time → Standard Model videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["6 quarks, 6 leptons, 5 bosons", "Quarks → protons, neutrons", "Forces = boson exchange"] },
      quiz: [
        { q: { en: "A proton is made of..." }, o: { en: ["Quarks", "Electrons", "Photons"] }, a: 0 },
        { q: { en: "Forces are carried by..." }, o: { en: ["Bosons", "Quarks", "Atoms"] }, a: 0 },
      ] },
    { id: "particle-symmetries", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["standard-model"],
      name: { en: "Symmetries & Conservation" },
      desc: { en: "Noether's theorem, conservation laws, symmetry groups." },
      why: { en: "Every symmetry yields a conserved quantity, a deep principle." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Standard Model (Cambridge) · Ch.1 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/sm.html" },
        { t: "video", r: 4, l: { en: "PBS Space Time → symmetry & conservation videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Noether: symmetry → conservation", "Time symmetry → energy conservation", "Internal symmetry → charge"] },
      quiz: [
        { q: { en: "Noether's theorem links symmetries to..." }, o: { en: ["Conserved quantities", "Speed", "Mass"] }, a: 0 },
        { q: { en: "Time-translation symmetry conserves..." }, o: { en: ["Energy", "Charge", "Spin"] }, a: 0 },
      ] },
    { id: "feynman-diagrams", stage: "a", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["particle-symmetries"],
      name: { en: "Feynman Diagrams" },
      desc: { en: "Drawing interactions, virtual particles, QED." },
      why: { en: "The working language of particle physicists, calculation & intuition." },
      res: [
        { t: "video", r: 5, l: { en: "PBS Space Time → “Feynman diagrams” video" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Lines = particles, vertices = interactions", "Virtual particles = intermediate", "Each diagram = a probability term"] },
      quiz: [
        { q: { en: "A vertex in a Feynman diagram is an..." }, o: { en: ["Interaction", "Particle", "Time"] }, a: 0 },
        { q: { en: "QED describes..." }, o: { en: ["The EM interaction", "Gravity", "Fission"] }, a: 0 },
      ] },
    { id: "gauge-theory", stage: "a", pos: [450, 465], weeks: 5, h: 25, xp: 400, diff: 3, prereqs: ["feynman-diagrams"],
      name: { en: "Gauge Theory" },
      desc: { en: "Local symmetry, QED, QCD, the weak interaction." },
      why: { en: "All fundamental forces arise from gauge symmetry, the central idea of modern physics." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Gauge Theory (Cambridge) · Ch.1 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/gaugetheory.html" },
        { t: "video", r: 4, l: { en: "PBS Space Time → gauge theory videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Local symmetry → forces appear", "QCD = the strong interaction", "Gluons carry color"] },
      quiz: [
        { q: { en: "Gauge symmetry gives rise to..." }, o: { en: ["Fundamental forces", "Mass only", "Time"] }, a: 0 },
        { q: { en: "QCD describes the ___ force" }, o: { en: ["Strong", "Gravitational", "Electric"] }, a: 0 },
      ] },
    { id: "higgs-mechanism", stage: "a", pos: [450, 600], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["gauge-theory"],
      name: { en: "The Higgs Mechanism" },
      desc: { en: "Spontaneous symmetry breaking, the Higgs field, particle mass." },
      why: { en: "Why particles have mass, discovered in 2012." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "CERN → The Higgs boson overview" }, u: "https://home.cern/science/physics/higgs-boson" },
        { t: "video", r: 4, l: { en: "PBS Space Time → Higgs mechanism video" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["The Higgs field fills space", "Interaction with the field → mass", "2012: the LHC found the Higgs boson"] },
      quiz: [
        { q: { en: "The Higgs mechanism explains particle..." }, o: { en: ["Mass", "Charge", "Spin"] }, a: 0 },
        { q: { en: "The Higgs boson was found in..." }, o: { en: ["2012", "1969", "2020"] }, a: 0 },
      ] },
    { id: "beyond-sm", stage: "o", pos: [450, 735], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["higgs-mechanism"],
      name: { en: "Beyond the Standard Model" },
      desc: { en: "Neutrino mass, dark matter, grand unification." },
      why: { en: "Physics's biggest open questions begin here." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "PBS Space Time → beyond Standard Model videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
        { t: "practice", r: 4, l: { en: "arXiv hep-ph → read one abstract" }, u: "https://arxiv.org/list/hep-ph/new" },
      ],
      notes: { en: ["Neutrino mass doesn't fit the SM neatly", "Dark matter = an unknown 27%", "Connect to the Research path"] },
      quiz: null },
  ] },
  { id: "phys-astro", icon: "🔭", w: 900, h: 820,
    name: { en: "Astrophysics" },
    desc: { en: "From planetary orbits to galaxies" },
    nodes: [
    { id: "celestial-mechanics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Celestial Mechanics" },
      desc: { en: "Kepler's laws, orbits, the two-body gravitational problem." },
      why: { en: "The basis of planetary, lunar, and satellite motion." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.3 (Orbits and Gravity)" }, u: "https://openstax.org/books/astronomy-2e/pages/3-introduction" },
        { t: "sim", r: 4, l: { en: "PhET → Gravity and Orbits" }, u: "https://phet.colorado.edu/en/simulations/gravity-and-orbits" },
        { t: "video", r: 4, l: { en: "Khan → Kepler's laws lessons" }, u: "https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation" },
      ],
      notes: { en: ["Kepler 1: elliptical orbits", "Kepler 3: T² ∝ a³", "Gravity = the centripetal force"] },
      quiz: [
        { q: { en: "Planetary orbits are..." }, o: { en: ["Ellipses", "Only circles", "Straight lines"] }, a: 0 },
        { q: { en: "Kepler's 3rd law relates period to..." }, o: { en: ["Orbit size", "Mass only", "Color"] }, a: 0 },
      ] },
    { id: "stellar-structure", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["celestial-mechanics"],
      name: { en: "Stellar Structure" },
      desc: { en: "Hydrostatic equilibrium, the HR diagram, nuclear burning." },
      why: { en: "The physics of why a star shines and stays in balance." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.16–17 (The Sun, The Stars)" }, u: "https://openstax.org/books/astronomy-2e/pages/16-introduction" },
        { t: "video", r: 4, l: { en: "Crash Course Astronomy → Stars section" }, u: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL" },
      ],
      notes: { en: ["Gravity ↔ pressure balance", "HR diagram: luminosity vs temperature", "Hydrogen fuses to helium in the core"] },
      quiz: [
        { q: { en: "What keeps a star from collapsing?" }, o: { en: ["Internal pressure", "Magnetic field", "Rotation"] }, a: 0 },
        { q: { en: "The HR diagram plots luminosity vs..." }, o: { en: ["Temperature", "Mass", "Distance"] }, a: 0 },
      ] },
    { id: "stellar-evolution", stage: "a", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["stellar-structure"],
      name: { en: "Stellar Evolution" },
      desc: { en: "Stellar life cycles, red giants, supernovae." },
      why: { en: "The atoms in your body were forged inside stars." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.21–23 (Birth, Death of Stars)" }, u: "https://openstax.org/books/astronomy-2e/pages/21-introduction" },
        { t: "video", r: 4, l: { en: "Crash Course Astronomy → Stellar evolution section" }, u: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL" },
      ],
      notes: { en: ["Mass determines destiny", "Massive stars → supernovae", "Heavy elements form in supernovae"] },
      quiz: [
        { q: { en: "How do massive stars end their lives?" }, o: { en: ["Supernova", "Fade quietly", "Become planets"] }, a: 0 },
        { q: { en: "What mainly determines a star's evolution?" }, o: { en: ["Mass", "Color", "Name"] }, a: 0 },
      ] },
    { id: "compact-objects", stage: "a", pos: [275, 465], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["stellar-evolution"],
      name: { en: "Compact Objects" },
      desc: { en: "White dwarfs, neutron stars, black holes." },
      why: { en: "The most extreme forms of matter, where quantum meets gravity." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.23–24 (Death of Stars, Black Holes)" }, u: "https://openstax.org/books/astronomy-2e/pages/23-introduction" },
        { t: "video", r: 5, l: { en: "PBS Space Time → neutron stars & black holes videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["White dwarf: electron degeneracy holds it up", "Neutron star: neutron degeneracy", "Black hole: not even light escapes"] },
      quiz: [
        { q: { en: "What cannot escape a black hole?" }, o: { en: ["Light", "Only matter", "Nothing at all"] }, a: 0 },
        { q: { en: "What holds up a white dwarf?" }, o: { en: ["Electron degeneracy pressure", "Burning", "Rotation"] }, a: 0 },
      ] },
    { id: "galaxies", stage: "a", pos: [625, 465], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["stellar-evolution"],
      name: { en: "Galaxies" },
      desc: { en: "Galaxy structure, rotation curves, evidence for dark matter." },
      why: { en: "Stars gather into galaxies, which weave the cosmic web." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.25–26 (The Milky Way, Galaxies)" }, u: "https://openstax.org/books/astronomy-2e/pages/25-introduction" },
        { t: "video", r: 4, l: { en: "Crash Course Astronomy → Galaxies section" }, u: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL" },
      ],
      notes: { en: ["Rotation curves → dark matter", "Spiral, elliptical, irregular", "A supermassive black hole at the center"] },
      quiz: [
        { q: { en: "Galaxy rotation curves suggest..." }, o: { en: ["Dark matter", "No gas", "Static stars"] }, a: 0 },
        { q: { en: "At most galaxy centers there is a..." }, o: { en: ["Supermassive black hole", "No stars", "A planet"] }, a: 0 },
      ] },
    { id: "observational-astro", stage: "o", pos: [450, 600], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["compact-objects", "galaxies"],
      name: { en: "Observational Astronomy" },
      desc: { en: "Telescopes, multi-wavelength astronomy, multi-messenger astronomy." },
      why: { en: "Test theory against real light from the sky." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.6 (Astronomical Instruments)" }, u: "https://openstax.org/books/astronomy-2e/pages/6-introduction" },
        { t: "course", r: 4, l: { en: "NASA → Astrophysics missions" }, u: "https://science.nasa.gov/astrophysics/" },
        { t: "practice", r: 4, l: { en: "arXiv astro-ph → read one abstract" }, u: "https://arxiv.org/list/astro-ph/new" },
      ],
      notes: { en: ["Observe from radio to gamma", "Gravitational waves = a new sense", "Connect to the Research path"] },
      quiz: null },
  ] },
  { id: "phys-cosmology", icon: "🌌", w: 900, h: 690,
    name: { en: "Cosmology" },
    desc: { en: "From the expanding universe to its earliest moments" },
    nodes: [
    { id: "expanding-universe", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "The Expanding Universe" },
      desc: { en: "Hubble's law, redshift, the scale of the universe." },
      why: { en: "The expansion of the universe is a top discovery of the 20th century." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.29 (The Big Bang)" }, u: "https://openstax.org/books/astronomy-2e/pages/29-introduction" },
        { t: "video", r: 4, l: { en: "Crash Course Astronomy → Hubble & expansion section" }, u: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL" },
      ],
      notes: { en: ["Hubble: v = H₀d", "Redshift → receding galaxies", "Space itself expands"] },
      quiz: [
        { q: { en: "Hubble's law relates a galaxy's speed to its..." }, o: { en: ["Distance", "Mass", "Color"] }, a: 0 },
        { q: { en: "Redshift indicates a galaxy is..." }, o: { en: ["Receding", "Approaching", "Static"] }, a: 0 },
      ] },
    { id: "big-bang", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["expanding-universe"],
      name: { en: "The Big Bang" },
      desc: { en: "The CMB, primordial nucleosynthesis, the history of the universe." },
      why: { en: "The physical evidence for 13.8 billion years of cosmic history." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.29.3–29.4 (CMB, Nucleosynthesis)" }, u: "https://openstax.org/books/astronomy-2e/pages/29-introduction" },
        { t: "video", r: 5, l: { en: "PBS Space Time → CMB & Big Bang videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["CMB = light from 380,000 years after", "Hydrogen & helium formed early", "The universe expanded hot → cold"] },
      quiz: [
        { q: { en: "What is the CMB?" }, o: { en: ["Light from the early universe", "Starlight", "A galaxy"] }, a: 0 },
        { q: { en: "Which elements formed first after the Big Bang?" }, o: { en: ["Hydrogen and helium", "Iron", "Carbon"] }, a: 0 },
      ] },
    { id: "dark-matter-energy", stage: "a", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["big-bang"],
      name: { en: "Dark Matter & Dark Energy" },
      desc: { en: "The evidence, the ΛCDM model, 95% of the universe." },
      why: { en: "95% of the universe is unknown, the greatest mystery." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Astronomy 2e → Ch.28 (Dark Matter, Fate)" }, u: "https://openstax.org/books/astronomy-2e/pages/28-introduction" },
        { t: "video", r: 5, l: { en: "PBS Space Time → dark matter/energy videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Dark matter ~27%, dark energy ~68%", "Ordinary matter is only ~5%", "Dark energy accelerates expansion"] },
      quiz: [
        { q: { en: "Ordinary matter is what fraction of the universe?" }, o: { en: ["~5%", "~50%", "~95%"] }, a: 0 },
        { q: { en: "Dark energy does what?" }, o: { en: ["Accelerates expansion", "Attracts", "Glows"] }, a: 0 },
      ] },
    { id: "structure-formation", stage: "a", pos: [450, 465], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["dark-matter-energy"],
      name: { en: "Structure Formation" },
      desc: { en: "Gravitational collapse, the cosmic web, how galaxies formed." },
      why: { en: "Explains how stars and galaxies grew from a smooth universe." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Cosmology (Cambridge) · Ch.4 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/cosmo.html" },
        { t: "video", r: 4, l: { en: "PBS Space Time → structure formation videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Tiny density fluctuations grow", "Dark matter scaffolds structure", "The cosmic web = filaments and voids"] },
      quiz: [
        { q: { en: "Structure grows from..." }, o: { en: ["Density fluctuations", "Nothing", "Light"] }, a: 0 },
        { q: { en: "What scaffolds structure formation?" }, o: { en: ["Dark matter", "Light", "Radio waves"] }, a: 0 },
      ] },
    { id: "early-universe", stage: "o", pos: [450, 600], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["structure-formation"],
      name: { en: "Early Universe & Inflation" },
      desc: { en: "Cosmic inflation, the open questions." },
      why: { en: "The leading theory for why the universe is flat and smooth." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong → Cosmology · Ch.5 (Inflation)" }, u: "https://www.damtp.cam.ac.uk/user/tong/cosmo.html" },
        { t: "practice", r: 4, l: { en: "arXiv astro-ph.CO → read one abstract" }, u: "https://arxiv.org/list/astro-ph.CO/new" },
      ],
      notes: { en: ["Inflation = huge expansion in an instant", "Explains flatness and smoothness", "Connect to the Research path"] },
      quiz: null },
  ] },
  { id: "phys-gr", icon: "🕳️", w: 900, h: 820,
    name: { en: "General Relativity" },
    desc: { en: "From special relativity to black holes and gravitational waves" },
    nodes: [
    { id: "special-relativity", stage: "f", pos: [450, 60], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: [],
      name: { en: "Special Relativity" },
      desc: { en: "Lorentz transformations, spacetime, E = mc²." },
      why: { en: "Space and time unite, Einstein's first revolution." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics III → Ch.5 (Relativity)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/5-introduction" },
        { t: "book", r: 5, l: { en: "David Tong → Dynamics and Relativity · Ch.7 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/dynamics.html" },
        { t: "video", r: 4, l: { en: "Khan → Special relativity lessons" }, u: "https://www.khanacademy.org/science/physics/special-relativity" },
      ],
      notes: { en: ["Light speed is the same for all observers", "Time dilation, length contraction", "E = mc²: mass = energy"] },
      quiz: [
        { q: { en: "What is the same for all observers?" }, o: { en: ["The speed of light", "Time", "Length"] }, a: 0 },
        { q: { en: "E = mc² expresses..." }, o: { en: ["Mass-energy equivalence", "Speed", "Force"] }, a: 0 },
      ] },
    { id: "tensor-calculus", stage: "a", pos: [450, 195], weeks: 5, h: 25, xp: 350, diff: 3, prereqs: ["special-relativity"],
      name: { en: "Tensor Calculus" },
      desc: { en: "Tensors, manifolds, the metric, the covariant derivative." },
      why: { en: "The math language of curved space, the tool of GR." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Sean Carroll → Lecture Notes on GR · Ch.2 (free, arXiv)" }, u: "https://arxiv.org/abs/gr-qc/9712019" },
        { t: "book", r: 4, l: { en: "David Tong → General Relativity · Ch.2 (free PDF)" }, u: "https://www.damtp.cam.ac.uk/user/tong/gr.html" },
      ],
      notes: { en: ["A tensor = a coordinate-independent object", "The metric gμν measures distance", "The covariant derivative accounts for curvature"] },
      quiz: [
        { q: { en: "The metric gμν defines..." }, o: { en: ["Distance and geometry", "Speed", "Charge"] }, a: 0 },
        { q: { en: "A tensor is ___ the choice of coordinates" }, o: { en: ["Independent of", "Dependent on", "Destroyed by"] }, a: 0 },
      ] },
    { id: "equivalence-geodesics", stage: "a", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["tensor-calculus"],
      name: { en: "Equivalence Principle & Geodesics" },
      desc: { en: "The equivalence principle, free fall, the geodesic equation." },
      why: { en: "Gravity is not a force, it's motion in curved space." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Sean Carroll → GR Notes · Ch.3 (Curvature)" }, u: "https://arxiv.org/abs/gr-qc/9712019" },
        { t: "video", r: 4, l: { en: "PBS Space Time → equivalence principle video" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Acceleration ≡ gravity (locally)", "Free fall = moving on a geodesic", "A geodesic = a 'straight line' in curved space"] },
      quiz: [
        { q: { en: "The equivalence principle equates gravity with..." }, o: { en: ["Acceleration", "Light", "Charge"] }, a: 0 },
        { q: { en: "A freely falling body moves along a..." }, o: { en: ["Geodesic", "Only a circle", "A straight line"] }, a: 0 },
      ] },
    { id: "einstein-equations", stage: "a", pos: [450, 465], weeks: 5, h: 25, xp: 400, diff: 3, prereqs: ["equivalence-geodesics"],
      name: { en: "Einstein's Field Equations" },
      desc: { en: "Gμν = 8πG Tμν, matter curves spacetime." },
      why: { en: "One of the most beautiful equations humanity has written." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Sean Carroll → GR Notes · Ch.4 (Einstein's Equation)" }, u: "https://arxiv.org/abs/gr-qc/9712019" },
      ],
      notes: { en: ["'Matter curves space, space moves matter'", "Gμν = curvature, Tμν = energy-momentum", "Newton's gravity is a limiting case"] },
      quiz: [
        { q: { en: "In Einstein's equation, what curves spacetime?" }, o: { en: ["Energy and matter", "Only light", "Time"] }, a: 0 },
        { q: { en: "Newtonian gravity is GR's..." }, o: { en: ["Limiting case", "Opposite", "Identical"] }, a: 0 },
      ] },
    { id: "black-holes", stage: "a", pos: [450, 600], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["einstein-equations"],
      name: { en: "Black Holes" },
      desc: { en: "The Schwarzschild solution, event horizons, singularities." },
      why: { en: "The most extreme prediction of Einstein's equations." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Sean Carroll → GR Notes · Ch.7 (Schwarzschild, Black Holes)" }, u: "https://arxiv.org/abs/gr-qc/9712019" },
        { t: "video", r: 5, l: { en: "PBS Space Time → black hole physics videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Event horizon = the point of no return", "Schwarzschild radius r = 2GM/c²", "A singularity inside"] },
      quiz: [
        { q: { en: "The event horizon is the..." }, o: { en: ["Point of no return", "A surface", "The center"] }, a: 0 },
        { q: { en: "Black holes are predicted by..." }, o: { en: ["General relativity", "Quantum mechanics", "Thermodynamics"] }, a: 0 },
      ] },
    { id: "gr-waves-cosmology", stage: "o", pos: [450, 735], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["black-holes"],
      name: { en: "Gravitational Waves & Cosmology" },
      desc: { en: "Ripples in spacetime, LIGO, the universe in GR." },
      why: { en: "Directly detected in 2015, a new way to hear the universe." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "LIGO → gravitational-wave education page" }, u: "https://www.ligo.caltech.edu/page/what-are-gw" },
        { t: "book", r: 4, l: { en: "Sean Carroll → GR Notes · Ch.6 (Gravitational Waves)" }, u: "https://arxiv.org/abs/gr-qc/9712019" },
        { t: "practice", r: 4, l: { en: "arXiv gr-qc → read one abstract" }, u: "https://arxiv.org/list/gr-qc/new" },
      ],
      notes: { en: ["Merging black holes shake spacetime", "LIGO 2015: the first detection", "Connect to the Research path"] },
      quiz: null },
  ] },
  { id: "phys-plasma", icon: "🔥", w: 900, h: 690,
    name: { en: "Plasma Physics" },
    desc: { en: "From the fourth state of matter to fusion" },
    nodes: [
    { id: "plasma-basics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Plasma Basics" },
      desc: { en: "Ionized gas, Debye shielding, the plasma frequency." },
      why: { en: "99% of visible matter in the universe is plasma." },
      res: [
        { t: "video", r: 4, l: { en: "PBS Space Time → plasma & fusion videos" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Plasma = ions + free electrons", "Debye shielding screens charge", "Collective behavior is the key feature"] },
      quiz: [
        { q: { en: "Plasma is..." }, o: { en: ["Ionized gas", "Solid ice", "Pure metal"] }, a: 0 },
        { q: { en: "Most visible matter in the universe is..." }, o: { en: ["Plasma", "Solid", "Liquid"] }, a: 0 },
      ] },
    { id: "single-particle-motion", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["plasma-basics"],
      name: { en: "Single-Particle Motion" },
      desc: { en: "Motion in fields, cyclotron gyration, drifts." },
      why: { en: "Auroras and the Van Allen belts, charged particle motion." },
      res: [
        { t: "sim", r: 4, l: { en: "PhET → Charges and Fields (motion in fields)" }, u: "https://phet.colorado.edu/en/simulations/charges-and-fields" },
      ],
      notes: { en: ["Gyrates in a magnetic field", "E×B drift shifts the guiding center", "Magnetic mirrors trap particles"] },
      quiz: [
        { q: { en: "A charged particle in a magnetic field..." }, o: { en: ["Spirals", "Stops", "Vanishes"] }, a: 0 },
        { q: { en: "The E×B drift depends on..." }, o: { en: ["Electric & magnetic fields", "Only mass", "Color"] }, a: 0 },
      ] },
    { id: "mhd", stage: "a", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["single-particle-motion"],
      name: { en: "Magnetohydrodynamics (MHD)" },
      desc: { en: "Treating plasma as a fluid, magnetic pressure, equilibrium." },
      why: { en: "Sunspots and stellar magnetic fields, explained by MHD." },
      res: [
        { t: "video", r: 4, l: { en: "PBS Space Time → magnetohydrodynamics video" }, u: "https://www.youtube.com/c/pbsspacetime" },
      ],
      notes: { en: ["Plasma + fluid equations + Maxwell", "Magnetic fields exert pressure", "Field lines are 'frozen in'"] },
      quiz: [
        { q: { en: "MHD treats plasma as a..." }, o: { en: ["Conducting fluid", "A solid", "Not a gas"] }, a: 0 },
        { q: { en: "Magnetic fields exert ___ on plasma" }, o: { en: ["Pressure", "Sound", "Light"] }, a: 0 },
      ] },
    { id: "plasma-waves", stage: "a", pos: [450, 465], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["mhd"],
      name: { en: "Plasma Waves & Instabilities" },
      desc: { en: "Langmuir waves, instabilities, wave-particle interactions." },
      why: { en: "The key challenge in confining a fusion plasma." },
      res: [
        { t: "practice", r: 4, l: { en: "arXiv physics.plasm-ph → read one abstract" }, u: "https://arxiv.org/list/physics.plasm-ph/new" },
      ],
      notes: { en: ["Langmuir = electron density waves", "Instabilities release energy", "Waves transfer energy to particles"] },
      quiz: [
        { q: { en: "Plasma instabilities..." }, o: { en: ["Release energy, hinder confinement", "Cool the plasma", "Emit light"] }, a: 0 },
        { q: { en: "Langmuir waves are oscillations of..." }, o: { en: ["Electron density", "Magnetic field", "Sound"] }, a: 0 },
      ] },
    { id: "fusion-applications", stage: "o", pos: [450, 600], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["plasma-waves"],
      name: { en: "Fusion & Applications" },
      desc: { en: "Tokamaks, inertial confinement, space plasmas." },
      why: { en: "The dream of limitless clean energy." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "ITER → fusion energy overview" }, u: "https://www.iter.org/sci/whatisfusion" },
        { t: "practice", r: 4, l: { en: "arXiv physics.plasm-ph → read a fusion abstract" }, u: "https://arxiv.org/list/physics.plasm-ph/new" },
      ],
      notes: { en: ["Tokamak = magnetically confined fusion", "The Sun powers itself by fusion", "Connect to the Research path"] },
      quiz: null },
  ] },
  { id: "phys-atomic", icon: "🔬", w: 900, h: 690,
    name: { en: "Atomic & Molecular Physics" },
    desc: { en: "From multi-electron atoms to lasers" },
    nodes: [
    { id: "multi-electron-atoms", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Multi-Electron Atoms" },
      desc: { en: "Atomic spectra, shell filling, the periodic table." },
      why: { en: "All chemical properties come from atomic electron structure." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Univ. Physics III → Ch.8 (Atomic Structure)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/8-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Atomic structure and spectra" }, u: "https://www.khanacademy.org/science/physics/quantum-physics" },
      ],
      notes: { en: ["The Pauli principle fills shells", "Spectral lines = energy transitions", "Shell structure sets the periodic table"] },
      quiz: [
        { q: { en: "Atomic spectral lines come from..." }, o: { en: ["Energy transitions", "Mass change", "Rotation"] }, a: 0 },
        { q: { en: "What arranges electrons into shells?" }, o: { en: ["The Pauli principle", "Gravity", "Friction"] }, a: 0 },
      ] },
    { id: "fine-structure", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["multi-electron-atoms"],
      name: { en: "Fine Structure" },
      desc: { en: "Spin-orbit coupling, fine and hyperfine structure." },
      why: { en: "The precision of atomic clocks comes from here." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "David Tong, Applications of QM (atomic physics, fine structure)" }, u: "https://www.damtp.cam.ac.uk/user/tong/aqm.html" },
      ],
      notes: { en: ["Spin-orbit = spin couples to motion", "Fine structure splits lines", "Hyperfine = interaction with the nucleus"] },
      quiz: [
        { q: { en: "Fine structure arises from..." }, o: { en: ["Spin-orbit coupling", "Gravity", "Pressure"] }, a: 0 },
        { q: { en: "Atomic clocks exploit atomic..." }, o: { en: ["Transition frequencies", "Mass", "Color"] }, a: 0 },
      ] },
    { id: "atoms-in-fields", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["fine-structure"],
      name: { en: "Atoms in Fields" },
      desc: { en: "The Zeeman effect, the Stark effect, atoms in fields." },
      why: { en: "The basis for measuring stellar magnetic fields via spectra." },
      res: [
        { t: "video", r: 4, l: { en: "MIT 8.421 → Atomic Physics (OCW materials)" }, u: "https://ocw.mit.edu/courses/8-421-atomic-and-optical-physics-i-spring-2014/" },
      ],
      notes: { en: ["Zeeman: magnetic field splits lines", "Stark: electric field splits lines", "Fields shift atomic levels"] },
      quiz: [
        { q: { en: "The Zeeman effect is caused by a..." }, o: { en: ["Magnetic field", "Electric field", "Sound"] }, a: 0 },
        { q: { en: "The Stark effect arises from an..." }, o: { en: ["Electric field", "Magnetic field", "Gravity"] }, a: 0 },
      ] },
    { id: "molecular-spectra", stage: "a", pos: [450, 465], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["atoms-in-fields"],
      name: { en: "Molecular Structure & Spectra" },
      desc: { en: "Chemical bonding, rotational-vibrational spectra." },
      why: { en: "The basis of astronomical spectroscopy and chemical analysis." },
      res: [
        { t: "video", r: 4, l: { en: "Khan → Molecular spectroscopy basics" }, u: "https://www.khanacademy.org/science/physics/quantum-physics" },
      ],
      notes: { en: ["A bond = shared electrons", "Rotation & vibration are quantized", "IR/microwave reveal molecules"] },
      quiz: [
        { q: { en: "Molecular rotation & vibration are..." }, o: { en: ["Quantized", "Continuous", "Random"] }, a: 0 },
        { q: { en: "Molecules are probed with..." }, o: { en: ["IR/microwave", "Gamma rays", "Sound"] }, a: 0 },
      ] },
    { id: "laser-physics", stage: "o", pos: [450, 600], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["molecular-spectra"],
      name: { en: "Laser Physics" },
      desc: { en: "Stimulated emission, population inversion, lasers & applications." },
      why: { en: "Ultracold atoms and quantum optics, the AMO research frontier." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 8.421 → Laser physics (OCW materials)" }, u: "https://ocw.mit.edu/courses/8-421-atomic-and-optical-physics-i-spring-2014/" },
        { t: "practice", r: 4, l: { en: "arXiv physics.atom-ph → read one abstract" }, u: "https://arxiv.org/list/physics.atom-ph/new" },
      ],
      notes: { en: ["Laser = amplification by stimulated emission", "Requires population inversion", "Connect to the Research path"] },
      quiz: null },
  ] },
  { id: "phys-biophysics", icon: "🧫", w: 900, h: 690,
    name: { en: "Biophysics" },
    desc: { en: "From the physics of life to molecular machines" },
    nodes: [
    { id: "biophys-intro", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Introduction to Biophysics" },
      desc: { en: "The physical scales of life, energy, the cellular world." },
      why: { en: "A living cell is a molecular machine run by the laws of physics." },
      res: [
        { t: "video", r: 4, l: { en: "iBiology → biophysics intro lectures" }, u: "https://www.ibiology.org/" },
      ],
      notes: { en: ["Life operates at the nm–μm scale", "kT ≈ the unit of thermal energy", "Physics sets the limits of life"] },
      quiz: [
        { q: { en: "Biophysics studies..." }, o: { en: ["The physics of life", "Only DNA sequences", "Only evolution"] }, a: 0 },
        { q: { en: "The relevant energy scale in cells?" }, o: { en: ["kT (thermal)", "MeV", "kWh"] }, a: 0 },
      ] },
    { id: "molecular-forces", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["biophys-intro"],
      name: { en: "Molecular Forces & Diffusion" },
      desc: { en: "Entropic forces, Brownian motion, diffusion." },
      why: { en: "How molecules move and organize inside cells." },
      res: [
        { t: "video", r: 4, l: { en: "Khan → Diffusion and osmosis" }, u: "https://www.khanacademy.org/science/biology/membranes-and-transport" },
      ],
      notes: { en: ["Brownian motion = thermal kicks", "Diffusion: ⟨x²⟩ = 2Dt", "Entropic forces are real forces"] },
      quiz: [
        { q: { en: "Brownian motion is caused by..." }, o: { en: ["Thermal kicks", "Magnetic fields", "Gravity"] }, a: 0 },
        { q: { en: "In diffusion, distance scales with time as..." }, o: { en: ["√t", "t", "t²"] }, a: 0 },
      ] },
    { id: "membranes-transport", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["molecular-forces"],
      name: { en: "Membranes & Transport" },
      desc: { en: "Lipid bilayers, ion channels, the membrane potential." },
      why: { en: "Nerve impulses and cell energy, the physics of membranes." },
      res: [
        { t: "video", r: 4, l: { en: "Khan → Membranes and transport" }, u: "https://www.khanacademy.org/science/biology/membranes-and-transport" },
      ],
      notes: { en: ["A membrane = a semi-permeable gate", "Ion channels are selective", "The Nernst equation gives the potential"] },
      quiz: [
        { q: { en: "Ion channels are..." }, o: { en: ["Selectively permeable", "Fully sealed", "Random"] }, a: 0 },
        { q: { en: "The membrane potential is set by..." }, o: { en: ["Ion concentration differences", "Light", "Sound"] }, a: 0 },
      ] },
    { id: "molecular-machines", stage: "a", pos: [450, 465], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["membranes-transport"],
      name: { en: "Molecular Machines" },
      desc: { en: "Motor proteins, DNA mechanics, protein folding." },
      why: { en: "Life runs on machines the size of molecules." },
      res: [
        { t: "video", r: 4, l: { en: "Harvard → “Inner Life of the Cell” animation" }, u: "https://www.youtube.com/watch?v=wJyUtbn0O5Y" },
      ],
      notes: { en: ["Kinesin = a cellular 'walker'", "DNA can be pulled mechanically", "Proteins fold into definite shapes"] },
      quiz: [
        { q: { en: "Motor proteins do what?" }, o: { en: ["Transport cargo in cells", "Emit light", "Destroy DNA"] }, a: 0 },
        { q: { en: "A protein's function is set by its..." }, o: { en: ["Folded shape", "Color", "Charge only"] }, a: 0 },
      ] },
    { id: "biophys-methods", stage: "o", pos: [450, 600], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["molecular-machines"],
      name: { en: "Biophysical Methods" },
      desc: { en: "Single-molecule measurement, cryo-EM, optical tweezers." },
      why: { en: "Modern tools to watch life one molecule at a time." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "iBiology → single-molecule & imaging lectures" }, u: "https://www.ibiology.org/" },
        { t: "practice", r: 4, l: { en: "arXiv physics.bio-ph → read one abstract" }, u: "https://arxiv.org/list/physics.bio-ph/new" },
      ],
      notes: { en: ["Optical tweezers = holding molecules with light", "Cryo-EM sees structure at atomic detail", "Connect to the Research path"] },
      quiz: null },
  ] },
  { id: "phys-computational", icon: "💻", w: 900, h: 690,
    name: { en: "Computational Physics" },
    desc: { en: "Solving physics with code, numerical methods, simulation" },
    nodes: [
    { id: "sciphys-python", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: [],
      name: { en: "Python for Physics" },
      desc: { en: "NumPy, Matplotlib, expressing physics problems in code." },
      why: { en: "Modern physics doesn't move without computation and simulation." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "SciPy Lecture Notes → Getting started" }, u: "https://scipy-lectures.org/" },
        { role: "secondary", t: "video", r: 4, l: { en: "freeCodeCamp → Python + NumPy for science" }, u: "https://www.youtube.com/c/Freecodecamp" },
        { role: "practice", t: "practice", r: 4, l: { en: "Project Euler → solve the first problems in code" }, u: "https://projecteuler.net/" },
      ],
      quiz: [
        { q: { en: "Which library is used for numeric arrays in Python?" }, o: { en: ["NumPy", "Django", "Flask"] }, a: 0 },
        { q: { en: "What is used for plotting?" }, o: { en: ["Matplotlib", "NumPy", "SQL"] }, a: 0 },
      ] },
    { id: "numerical-methods", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["sciphys-python"],
      name: { en: "Numerical Methods" },
      desc: { en: "Integration, differential equations, root-finding, linear systems." },
      why: { en: "Most physics equations can only be solved numerically." },
      res: [
        { role: "secondary", t: "course", r: 4, l: { en: "SciPy Lecture Notes → NumPy/SciPy numerics" }, u: "https://scipy-lectures.org/" },
      ],
      quiz: [
        { q: { en: "One numerical method for ODEs?" }, o: { en: ["Runge–Kutta", "Matrix transpose", "SQL join"] }, a: 0 },
        { q: { en: "Why numerical integration?" }, o: { en: ["When no analytic solution exists", "Always", "Never"] }, a: 0 },
      ] },
    { id: "monte-carlo", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["numerical-methods"],
      name: { en: "Monte Carlo Methods" },
      desc: { en: "Random sampling, statistical-physics simulation, the Metropolis algorithm." },
      why: { en: "The Ising model and many-body systems are solved by random methods." },
      res: [
        { role: "advanced", t: "practice", r: 4, l: { en: "arXiv physics.comp-ph → read one abstract" }, u: "https://arxiv.org/list/physics.comp-ph/new" },
      ],
      quiz: [
        { q: { en: "Monte Carlo relies on..." }, o: { en: ["Random sampling", "Exact formulas", "Only integration"] }, a: 0 },
        { q: { en: "The Ising model is simulated with..." }, o: { en: ["The Metropolis algorithm", "Matrix inverse", "FFT only"] }, a: 0 },
      ] },
    { id: "simulating-systems", stage: "a", pos: [450, 465], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["monte-carlo"],
      name: { en: "Simulating Systems" },
      desc: { en: "N-body problems, molecular dynamics, PDE simulation." },
      why: { en: "From galaxies to proteins, the computer is the lab." },
      res: [
        { role: "advanced", t: "practice", r: 4, l: { en: "arXiv physics.comp-ph → read a simulation abstract" }, u: "https://arxiv.org/list/physics.comp-ph/new" },
      ],
      quiz: [
        { q: { en: "Molecular dynamics simulates..." }, o: { en: ["Atomic motion", "SQL queries", "Websites"] }, a: 0 },
        { q: { en: "The N-body problem tracks..." }, o: { en: ["Mutual gravity of many bodies", "One particle", "Color"] }, a: 0 },
      ] },
    { id: "comp-project", stage: "o", pos: [450, 600], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["simulating-systems"],
      name: { en: "Computational Project" },
      desc: { en: "Build a full simulation of a real physical system." },
      why: { en: "Prove theory with working code, the start of research." },
      res: [
        { role: "practice", t: "practice", s: 1, r: 5, l: { en: "Simulate a system of your choice and put it on GitHub" }, u: "https://github.com/" },
        { role: "advanced", t: "practice", r: 4, l: { en: "arXiv physics.comp-ph → research directions" }, u: "https://arxiv.org/list/physics.comp-ph/new" },
      ],
      quiz: null },
  ] },
  { id: "phys-mathematical", icon: "➗", w: 900, h: 820,
    name: { en: "Mathematical Physics" },
    desc: { en: "The mathematical tools of physics, from vector analysis to group theory" },
    nodes: [
    { id: "vector-calculus", stage: "f", pos: [450, 60], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: [],
      name: { en: "Vector Calculus" },
      desc: { en: "Gradient, divergence, curl, the Gauss and Stokes theorems." },
      why: { en: "Maxwell, fluid dynamics, all written in the language of vector calculus." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Multivariable calculus (full course)" }, u: "https://www.khanacademy.org/math/multivariable-calculus" },
        { role: "viz", t: "book", r: 5, l: { en: "Feynman Lectures Vol II → Ch.2–3 (Vector Field Calculus)" }, u: "https://www.feynmanlectures.caltech.edu/II_02.html" },
      ],
      quiz: [
        { q: { en: "Divergence measures..." }, o: { en: ["Field 'outflow/inflow'", "Rotation", "Length"] }, a: 0 },
        { q: { en: "Curl measures..." }, o: { en: ["Field rotation", "Magnitude", "Mass"] }, a: 0 },
      ] },
    { id: "complex-methods", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["vector-calculus"],
      name: { en: "Complex Methods" },
      desc: { en: "Complex functions, analyticity, contour integrals, residues." },
      why: { en: "Hard integrals, waves, quantum mechanics, simplified by complex analysis." },
      res: [
        { role: "secondary", t: "video", r: 4, l: { en: "3Blue1Brown → complex numbers videos" }, u: "https://www.youtube.com/c/3blue1brown" },
      ],
      quiz: [
        { q: { en: "The residue theorem evaluates..." }, o: { en: ["Contour integrals", "Matrices", "Probability"] }, a: 0 },
        { q: { en: "An analytic function is..." }, o: { en: ["Complex-differentiable", "Even", "Linear"] }, a: 0 },
      ] },
    { id: "fourier-methods", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["complex-methods"],
      name: { en: "Fourier Methods" },
      desc: { en: "Fourier series, transforms, frequency space." },
      why: { en: "Waves, signals, quantum mechanics, all speak Fourier." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → “But what is the Fourier Transform?”" }, u: "https://www.youtube.com/watch?v=spUNpyF58BY" },
      ],
      quiz: [
        { q: { en: "The Fourier transform converts..." }, o: { en: ["Time → frequency", "Mass → energy", "Length → time"] }, a: 0 },
        { q: { en: "A Fourier series decomposes a signal into..." }, o: { en: ["Sines and cosines", "Polynomials", "Matrices"] }, a: 0 },
      ] },
    { id: "deqs-special-functions", stage: "a", pos: [450, 465], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["fourier-methods"],
      name: { en: "Differential Equations & Special Functions" },
      desc: { en: "ODEs and PDEs, Bessel, Legendre, Hermite functions." },
      why: { en: "Hydrogen, heat, waves, solved with special functions." },
      res: [
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 18.03 → Differential Equations (OCW)" }, u: "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/" },
      ],
      quiz: [
        { q: { en: "Legendre polynomials appear in..." }, o: { en: ["Spherically symmetric problems", "Matrix inverse", "SQL"] }, a: 0 },
        { q: { en: "A PDE is an equation with..." }, o: { en: ["Partial derivatives", "Only numbers", "Matrices"] }, a: 0 },
      ] },
    { id: "linalg-operators", stage: "a", pos: [450, 600], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["deqs-special-functions"],
      name: { en: "Linear Algebra & Operators" },
      desc: { en: "Vector spaces, eigenvalues, Hermitian operators." },
      why: { en: "All of quantum mechanics is linear algebra, this is its foundation." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Essence of Linear Algebra (full)" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
      ],
      quiz: [
        { q: { en: "Eigenvalues of a Hermitian operator are..." }, o: { en: ["Real", "Complex", "Zero"] }, a: 0 },
        { q: { en: "In QM, observables are..." }, o: { en: ["Hermitian operators", "Scalars", "Matrix rows"] }, a: 0 },
      ] },
    { id: "group-theory-physics", stage: "o", pos: [450, 735], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["linalg-operators"],
      name: { en: "Group Theory in Physics" },
      desc: { en: "Symmetry groups, representations, Lie groups." },
      why: { en: "Particle physics, crystals, the Standard Model, all group theory." },
      res: [
        { role: "advanced", t: "practice", r: 4, l: { en: "arXiv math-ph → read one abstract" }, u: "https://arxiv.org/list/math-ph/new" },
      ],
      quiz: null },
  ] },
  { id: "phys-experimental", icon: "🔧", w: 900, h: 690,
    name: { en: "Experimental Physics" },
    desc: { en: "Measurement, error, instruments, data, real laboratory skills" },
    nodes: [
    { id: "measurement-uncertainty", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Measurement & Uncertainty" },
      desc: { en: "Error propagation, significant figures, statistical uncertainty." },
      why: { en: "A measurement without uncertainty is meaningless, the basis of all experiment." },
      res: [
        { role: "secondary", t: "course", r: 4, l: { en: "NIST → Uncertainty of measurement results" }, u: "https://physics.nist.gov/cuu/Uncertainty/" },
      ],
      quiz: [
        { q: { en: "Every measurement must include..." }, o: { en: ["An uncertainty (error)", "A color", "A name"] }, a: 0 },
        { q: { en: "How do errors combine?" }, o: { en: ["By propagation rules", "Never", "Randomly"] }, a: 0 },
      ] },
    { id: "lab-electronics", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 2, prereqs: ["measurement-uncertainty"],
      name: { en: "Lab Electronics" },
      desc: { en: "Oscilloscopes, multimeters, amplifiers, data acquisition." },
      why: { en: "The skill to understand and run real experimental instruments." },
      res: [
        { role: "secondary", t: "sim", r: 4, l: { en: "PhET → Circuit Construction Kit: AC" }, u: "https://phet.colorado.edu/en/simulations/circuit-construction-kit-ac" },
      ],
      quiz: [
        { q: { en: "An oscilloscope displays..." }, o: { en: ["Voltage vs time", "Mass", "Color"] }, a: 0 },
        { q: { en: "A multimeter measures..." }, o: { en: ["Voltage, current, resistance", "Sound", "Light"] }, a: 0 },
      ] },
    { id: "data-fitting", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["lab-electronics"],
      name: { en: "Data Fitting & Analysis" },
      desc: { en: "Least squares, χ², fitting models to data." },
      why: { en: "The core skill of extracting physical laws from raw data." },
      res: [
        { role: "secondary", t: "course", r: 4, l: { en: "SciPy Lecture Notes → curve fitting (scipy.optimize)" }, u: "https://scipy-lectures.org/" },
      ],
      quiz: [
        { q: { en: "χ² measures..." }, o: { en: ["How well a model fits data", "Mass", "Speed"] }, a: 0 },
        { q: { en: "Least squares does what?" }, o: { en: ["Minimizes deviations", "Deletes data", "Randomizes"] }, a: 0 },
      ] },
    { id: "detectors", stage: "a", pos: [450, 465], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["data-fitting"],
      name: { en: "Sensors & Detectors" },
      desc: { en: "Light, radiation, particle detectors, signal-to-noise." },
      why: { en: "From the Higgs to gravitational waves, no detectors, no discoveries." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Particle Data Group → Detectors review" }, u: "https://pdg.lbl.gov/" },
        { role: "advanced", t: "practice", r: 4, l: { en: "arXiv physics.ins-det → read one abstract" }, u: "https://arxiv.org/list/physics.ins-det/new" },
      ],
      quiz: [
        { q: { en: "A good signal-to-noise ratio means..." }, o: { en: ["A clear measurement", "Lots of noise", "Data loss"] }, a: 0 },
        { q: { en: "A detector does what?" }, o: { en: ["Senses particles/radiation", "Makes sound", "Writes code"] }, a: 0 },
      ] },
    { id: "exp-design-project", stage: "o", pos: [450, 600], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["detectors"],
      name: { en: "Experiment Design Project" },
      desc: { en: "A full experiment from hypothesis to measurement to analysis." },
      why: { en: "Think like a real scientist and design your own experiment." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 8.13 Junior Lab: designing & running real experiments" }, u: "https://ocw.mit.edu/courses/8-13-14-experimental-physics-i-ii-junior-lab-fall-2016-spring-2017/" },
      ],
      quiz: null },
  ] },
  { id: "phys-c-mechanics", icon: "orbit", w: 900, h: 420,
    name: { en: "Mechanics" },
    desc: { en: "Motion, forces, energy, where physics begins" },
    nodes: [
    { id: "c-kinematics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 150, diff: 1, prereqs: [],
      name: { en: "Kinematics" },
      desc: { en: "Position, velocity, acceleration, free fall, projectiles." },
      why: { en: "Describing motion with numbers, the first step of mechanics." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → One-dimensional motion" }, u: "https://www.khanacademy.org/science/physics/one-dimensional-motion" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 1 → Ch.3–4" }, u: "https://openstax.org/books/university-physics-volume-1/pages/3-introduction" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Projectile Motion" }, u: "https://phet.colorado.edu/en/simulations/projectile-motion" },
      ],
      quiz: [
        { q: { en: "Acceleration is the rate of change of..." }, o: { en: ["Velocity", "Position", "Mass"] }, a: 0 },
        { q: { en: "Free-fall acceleration (Earth)?" }, o: { en: ["~9.8 m/s²", "0", "~3 m/s²"] }, a: 0 },
      ] },
    { id: "c-newton-laws", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["c-kinematics"],
      name: { en: "Newton's Laws" },
      desc: { en: "The three laws, force, free-body diagrams, friction." },
      why: { en: "The fundamental law of why objects move as they do." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Forces and Newton's laws" }, u: "https://www.khanacademy.org/science/physics/forces-newtons-laws" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 1 → Ch.5–6" }, u: "https://openstax.org/books/university-physics-volume-1/pages/5-introduction" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Forces and Motion: Basics" }, u: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics" },
      ],
      quiz: [
        { q: { en: "Newton's second law?" }, o: { en: ["F = ma", "E = mc²", "PV = nRT"] }, a: 0 },
        { q: { en: "With no net force, an object..." }, o: { en: ["Keeps its velocity", "Stops", "Accelerates"] }, a: 0 },
      ] },
    { id: "c-energy-momentum", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["c-newton-laws"],
      name: { en: "Energy & Momentum" },
      desc: { en: "Work, kinetic/potential energy, momentum, conservation." },
      why: { en: "Conservation laws, the most powerful idea in physics." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Work and energy" }, u: "https://www.khanacademy.org/science/physics/work-and-energy" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 1 → Ch.7–9" }, u: "https://openstax.org/books/university-physics-volume-1/pages/7-introduction" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Energy Skate Park" }, u: "https://phet.colorado.edu/en/simulations/energy-skate-park" },
      ],
      quiz: null },
  ] },
  { id: "phys-c-em", icon: "zap", w: 900, h: 420,
    name: { en: "Electromagnetism" },
    desc: { en: "Charge, current, circuits, magnetism, the essentials" },
    nodes: [
    { id: "c-electric-charge-field", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Charge & Field" },
      desc: { en: "Electric charge, Coulomb's force, the electric field." },
      why: { en: "Everything electrical begins with charge." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Electric charge, field and potential" }, u: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 2 → Ch.5" }, u: "https://openstax.org/books/university-physics-volume-2/pages/5-introduction" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Charges and Fields" }, u: "https://phet.colorado.edu/en/simulations/charges-and-fields" },
      ],
      quiz: [
        { q: { en: "Like charges..." }, o: { en: ["Repel", "Attract", "Ignore"] }, a: 0 },
        { q: { en: "Coulomb's force vs distance?" }, o: { en: ["1/r²", "1/r", "r²"] }, a: 0 },
      ] },
    { id: "c-current-circuits", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["c-electric-charge-field"],
      name: { en: "Current & Circuits" },
      desc: { en: "Current, voltage, resistance, Ohm's law, circuits." },
      why: { en: "How every electrical device works." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Circuits" }, u: "https://www.khanacademy.org/science/physics/circuits-topic" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 2 → Ch.9–10" }, u: "https://openstax.org/books/university-physics-volume-2/pages/9-introduction" },
        { role: "sim", t: "sim", r: 5, l: { en: "PhET → Circuit Construction Kit: DC" }, u: "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc" },
      ],
      quiz: [
        { q: { en: "Ohm's law?" }, o: { en: ["V = IR", "F = ma", "E = mc²"] }, a: 0 },
        { q: { en: "Current is the flow of..." }, o: { en: ["Charge", "Heat", "Light"] }, a: 0 },
      ] },
    { id: "c-magnetism-basics", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["c-current-circuits"],
      name: { en: "Magnetism" },
      desc: { en: "Magnetic fields, current & magnetism, induction, motors." },
      why: { en: "Motors, generators, MRI, magnetism in action." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Magnetic forces and fields" }, u: "https://www.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 2 → Ch.11–13" }, u: "https://openstax.org/books/university-physics-volume-2/pages/11-introduction" },
        { role: "sim", t: "sim", r: 4, l: { en: "PhET → Faraday's Law" }, u: "https://phet.colorado.edu/en/simulations/faradays-law" },
      ],
      quiz: null },
  ] },
  { id: "phys-c-waves", icon: "waves", w: 900, h: 420,
    name: { en: "Waves" },
    desc: { en: "Oscillations, waves, sound, periodic motion" },
    nodes: [
    { id: "c-wave-basics", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "Wave Basics" },
      desc: { en: "Oscillation, frequency, wavelength, speed, amplitude." },
      why: { en: "Sound, light, earthquakes, all waves." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Wave on a String" }, u: "https://phet.colorado.edu/en/simulations/wave-on-a-string" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 1 → Ch.15–16" }, u: "https://openstax.org/books/university-physics-volume-1/pages/15-introduction" },
      ],
      quiz: [
        { q: { en: "Wave speed = ?" }, o: { en: ["Frequency × wavelength", "Amplitude × time", "Mass × speed"] }, a: 0 },
        { q: { en: "Amplitude represents the wave's..." }, o: { en: ["Size/intensity", "Speed", "Frequency"] }, a: 0 },
      ] },
    { id: "c-sound", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 200, diff: 2, prereqs: ["c-wave-basics"],
      name: { en: "Sound" },
      desc: { en: "Sound waves, pitch, loudness, the Doppler effect." },
      why: { en: "The basis of music, hearing, and ultrasound." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Mechanical waves and sound" }, u: "https://www.khanacademy.org/science/physics/mechanical-waves-and-sound" },
        { role: "textbook", t: "book", r: 4, l: { en: "OpenStax University Physics Vol 1 → Ch.17 (Sound)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/17-introduction" },
      ],
      quiz: [
        { q: { en: "Sound travels through a..." }, o: { en: ["Medium (air etc.)", "Vacuum", "Light"] }, a: 0 },
        { q: { en: "The Doppler effect changes the perceived..." }, o: { en: ["Frequency", "Mass", "Charge"] }, a: 0 },
      ] },
    { id: "c-standing-waves", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["c-sound"],
      name: { en: "Standing Waves & Resonance" },
      desc: { en: "Interference, standing waves, resonance, harmonics." },
      why: { en: "Why instruments make notes and bridges can collapse." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax University Physics Vol 1 → Ch.16.6 (Standing Waves)" }, u: "https://openstax.org/books/university-physics-volume-1/pages/16-introduction" },
      ],
      quiz: null },
  ] },
  { id: "phys-c-optics", icon: "eye", w: 900, h: 420,
    name: { en: "Optics" },
    desc: { en: "Light, reflection, refraction, lenses, the physics of light" },
    nodes: [
    { id: "c-reflection-refraction", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "Reflection & Refraction" },
      desc: { en: "Reflection, refraction, Snell's law, total internal reflection." },
      why: { en: "How mirrors, lenses, and fiber optics work." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Bending Light" }, u: "https://phet.colorado.edu/en/simulations/bending-light" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 3 → Ch.1 (Nature of Light)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/1-introduction" },
      ],
      quiz: [
        { q: { en: "Snell's law describes..." }, o: { en: ["Refraction", "Mass", "Charge"] }, a: 0 },
        { q: { en: "Angle of reflection = ?" }, o: { en: ["Angle of incidence", "0", "90°"] }, a: 0 },
      ] },
    { id: "c-mirrors-lenses", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 200, diff: 2, prereqs: ["c-reflection-refraction"],
      name: { en: "Mirrors & Lenses" },
      desc: { en: "Concave/convex mirrors, lenses, the thin-lens equation." },
      why: { en: "The basis of glasses, cameras, telescopes, microscopes." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Geometric Optics" }, u: "https://phet.colorado.edu/en/simulations/geometric-optics" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 3 → Ch.2 (Geometric Optics)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/2-introduction" },
      ],
      quiz: [
        { q: { en: "A convex lens ___ light" }, o: { en: ["Converges", "Diverges", "Absorbs"] }, a: 0 },
        { q: { en: "A camera uses a..." }, o: { en: ["Lens", "Only a prism", "Only a mirror"] }, a: 0 },
      ] },
    { id: "c-wave-optics", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 250, diff: 3, prereqs: ["c-mirrors-lenses"],
      name: { en: "Wave Optics" },
      desc: { en: "Interference, diffraction, polarization, double-slit." },
      why: { en: "The stunning proof that light is a wave." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax University Physics Vol 3 → Ch.3–4 (Interference, Diffraction)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/3-introduction" },
      ],
      quiz: null },
  ] },
  { id: "phys-c-thermo", icon: "flame", w: 900, h: 420,
    name: { en: "Thermodynamics" },
    desc: { en: "Heat, temperature, energy, gas behavior" },
    nodes: [
    { id: "c-heat-temperature", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "Heat & Temperature" },
      desc: { en: "Temperature, heat, heat capacity, heat transfer." },
      why: { en: "Heat and temperature aren't the same, understand why." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Thermodynamics" }, u: "https://www.khanacademy.org/science/physics/thermodynamics" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 2 → Ch.1–2 (Temperature, Heat)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/1-introduction" },
      ],
      quiz: [
        { q: { en: "Heat is the transfer of..." }, o: { en: ["Thermal energy", "Mass", "Charge"] }, a: 0 },
        { q: { en: "Absolute zero is..." }, o: { en: ["0 K", "0 °C", "100 K"] }, a: 0 },
      ] },
    { id: "c-gas-behavior", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 200, diff: 2, prereqs: ["c-heat-temperature"],
      name: { en: "Gas Behavior" },
      desc: { en: "The ideal gas law, kinetic theory, pressure." },
      why: { en: "The molecular reason gases behave as they do." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Gas Properties" }, u: "https://phet.colorado.edu/en/simulations/gas-properties" },
        { role: "textbook", t: "book", r: 4, l: { en: "OpenStax University Physics Vol 2 → Ch.2 (Kinetic Theory)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/2-introduction" },
      ],
      quiz: [
        { q: { en: "The ideal gas law?" }, o: { en: ["PV = nRT", "V = IR", "F = ma"] }, a: 0 },
        { q: { en: "Temperature relates to molecular..." }, o: { en: ["Average kinetic energy", "Mass", "Charge"] }, a: 0 },
      ] },
    { id: "c-laws-thermo", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 250, diff: 3, prereqs: ["c-gas-behavior"],
      name: { en: "The Laws of Thermodynamics" },
      desc: { en: "The first and second laws, entropy, heat engines." },
      why: { en: "The laws governing energy and disorder in the universe." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax University Physics Vol 2 → Ch.3–4 (Laws of Thermo)" }, u: "https://openstax.org/books/university-physics-volume-2/pages/3-introduction" },
      ],
      quiz: null },
  ] },
  { id: "phys-c-modern", icon: "sparkles", w: 900, h: 420,
    name: { en: "Modern Physics" },
    desc: { en: "Relativity, quanta, atoms, the 20th-century revolution" },
    nodes: [
    { id: "c-special-relativity-intro", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Special Relativity" },
      desc: { en: "The speed of light, time dilation, length contraction, E = mc²." },
      why: { en: "Transformed our understanding of space and time." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Special relativity" }, u: "https://www.khanacademy.org/science/physics/special-relativity" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 3 → Ch.5 (Relativity)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/5-introduction" },
      ],
      quiz: [
        { q: { en: "Einstein's famous equation?" }, o: { en: ["E = mc²", "F = ma", "PV = nRT"] }, a: 0 },
        { q: { en: "What is constant for all observers?" }, o: { en: ["The speed of light", "Time", "Length"] }, a: 0 },
      ] },
    { id: "c-quantum-basics", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 3, prereqs: ["c-special-relativity-intro"],
      name: { en: "Quantum Basics" },
      desc: { en: "Photons, the photoelectric effect, wave-particle duality." },
      why: { en: "The strange quantum rules of the atomic world." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Photoelectric Effect" }, u: "https://phet.colorado.edu/en/simulations/photoelectric" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax University Physics Vol 3 → Ch.6 (Photons & Matter Waves)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/6-introduction" },
      ],
      quiz: [
        { q: { en: "A particle of light is a..." }, o: { en: ["Photon", "Electron", "Proton"] }, a: 0 },
        { q: { en: "Wave-particle duality says matter/light acts as..." }, o: { en: ["Both wave and particle", "Only a wave", "Only a particle"] }, a: 0 },
      ] },
    { id: "c-atomic-nuclear-intro", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 250, diff: 3, prereqs: ["c-quantum-basics"],
      name: { en: "Atoms & Nuclei" },
      desc: { en: "The Bohr model, spectra, radioactivity, nuclear energy." },
      why: { en: "The physics of stars, reactors, and medical imaging." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Models of the Hydrogen Atom" }, u: "https://phet.colorado.edu/en/simulations/hydrogen-atom" },
        { role: "textbook", t: "book", r: 4, l: { en: "OpenStax University Physics Vol 3 → Ch.8, 10 (Atoms, Nuclear)" }, u: "https://openstax.org/books/university-physics-volume-3/pages/8-introduction" },
      ],
      quiz: null },
  ] },
  ],
  planned: [],
  paths: [
    { id: "core", icon: "🎯", tag: { en: "Core" },
      name: { en: "Core Learning" },
      desc: { en: "Build a strong foundation in physics for university STEM, engineering, and scientific literacy." },
      branches: ["phys-c-mechanics", "phys-c-em", "phys-c-waves", "phys-c-optics", "phys-c-thermo", "phys-c-modern"] },
    { id: "university", icon: "🎓", tag: { en: "University" },
      name: { en: "University & Research" },
      desc: { en: "Advanced physics for university students, theoretical physics, experimental physics, and research." },
      branches: ["phys-mechanics", "phys-em", "phys-quantum", "phys-statmech", "phys-condensed", "phys-atomic", "phys-nuclear", "phys-particle", "phys-gr", "phys-astro", "phys-plasma", "phys-computational", "phys-mathematical", "phys-experimental", "phys-cosmology", "phys-biophysics"] },
    { id: "olympiad", icon: "🏅", tag: { en: "Olympiad" },
      name: { en: "Olympiad Physics" },
      desc: { en: "Advanced problem-solving curriculum for national and international physics olympiads." },
      branches: ["phys-mechanics", "phys-em", "phys-thermo", "phys-waves", "phys-quantum", "phys-experimental"] },
  ],
},
{
  id: "math", icon: "📐", hue: "#dc2626",
  name: { en: "Mathematics" },
  desc: { en: "Algebra, calculus, linear algebra, probability, and olympiad problems." },
  branches: [
  { id: "math-olympiad", icon: "🏅", w: 900, h: 720,
    name: { en: "Olympiad Mathematics" },
    desc: { en: "From the art of problem solving to the IMO" },
    nodes: [
    { id: "problem-solving", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 150, diff: 1, prereqs: [],
      name: { en: "Art of Problem Solving" },
      desc: { en: "The olympiad mindset: experiment, conjecture, prove." },
      why: { en: "Olympiads test thinking, not memorized knowledge." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "AoPS Alcumus → adaptive problems" }, u: "https://artofproblemsolving.com/alcumus" },
        { t: "video", r: 4, l: { en: "3Blue1Brown → “The hardest problem on the hardest test”" }, u: "https://www.youtube.com/watch?v=M64HUIJFTZM" },
        { t: "course", r: 4, l: { en: "AoPS → free online resources" }, u: "https://artofproblemsolving.com/online" },
      ],
      notes: { en: ["Start with small cases", "Find the pattern, then prove it", "Stuck? Transform the problem"] },
      quiz: [
        { q: { en: "1+2+...+100 = ?" }, o: { en: ["5050", "5000", "10000"] }, a: 0 },
        { q: { en: "Best move when stuck?" }, o: { en: ["Give up", "Try small cases", "Look up the answer"] }, a: 1 },
      ] },
    { id: "algebra-oly", stage: "f", pos: [200, 205], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["problem-solving"],
      name: { en: "Olympiad Algebra" },
      desc: { en: "Inequalities, polynomials, functional equations." },
      why: { en: "1–2 of the 6 IMO problems are always algebra." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Evan Chen → Olympiad handouts · Algebra section" }, u: "https://web.evanchen.cc/olympiad.html" },
        { t: "course", r: 4, l: { en: "Khan → Algebra 2 · Polynomials unit" }, u: "https://www.khanacademy.org/math/algebra2" },
        { t: "video", r: 4, l: { en: "Michael Penn → olympiad algebra problems" }, u: "https://www.youtube.com/@MichaelPennMath" },
      ],
      notes: { en: ["AM-GM: arithmetic mean ≥ geometric mean", "Vieta's formulas, sums/products of roots", "Exploit symmetry"] },
      quiz: [
        { q: { en: "For a,b>0, AM-GM: (a+b)/2 ... √(ab)" }, o: { en: ["≥", "≤", "="] }, a: 0 },
        { q: { en: "Sum of roots of x²−5x+6=0?" }, o: { en: ["5", "6", "−5"] }, a: 0 },
      ] },
    { id: "proofs", stage: "f", pos: [450, 205], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["problem-solving"],
      name: { en: "Writing Proofs" },
      desc: { en: "Induction, contradiction, pigeonhole." },
      why: { en: "A right answer is half; proving it is the other half." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Book of Proof → Ch.1: Sets" }, u: "https://richardhammack.github.io/BookOfProof/" },
        { t: "course", r: 4, l: { en: "Coursera → Intro to Mathematical Thinking · Week 1" }, u: "https://www.coursera.org/learn/mathematical-thinking" },
        { t: "practice", r: 4, l: { en: "Book of Proof → Ch.4 (Direct Proof) exercises" }, u: "https://richardhammack.github.io/BookOfProof/" },
      ],
      notes: { en: ["Induction = the domino effect", "Assume the opposite → contradiction", "Pigeonhole: n+1 rabbits, n holes"] },
      quiz: [
        { q: { en: "Induction's 2 steps: base and ..." }, o: { en: ["Step", "Conclusion", "Guess"] }, a: 0 },
        { q: { en: "Among 13 people, 2 share a birth month. Why?" }, o: { en: ["Pigeonhole", "Induction", "Chance"] }, a: 0 },
      ] },
    { id: "geometry-oly", stage: "f", pos: [700, 205], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["problem-solving"],
      name: { en: "Olympiad Geometry" },
      desc: { en: "Circles, triangle centers, transformations." },
      why: { en: "Traditionally a strength of the Mongolian team!" },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Evan Chen → free chapters of the EGMO book" }, u: "https://web.evanchen.cc/geombook.html" },
        { t: "course", r: 4, l: { en: "Khan → Geometry · Circles unit" }, u: "https://www.khanacademy.org/math/geometry" },
        { t: "practice", r: 5, l: { en: "Evan Chen → geometry handouts" }, u: "https://web.evanchen.cc/olympiad.html" },
      ],
      notes: { en: ["Inscribed angle = half the central angle", "Hunt for similar triangles", "A good diagram is half the solution"] },
      quiz: [
        { q: { en: "Sum of a triangle's interior angles?" }, o: { en: ["90°", "180°", "360°"] }, a: 1 },
        { q: { en: "An angle inscribed in a semicircle?" }, o: { en: ["45°", "60°", "90°"] }, a: 2 },
      ] },
    { id: "combinatorics", stage: "a", pos: [200, 360], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["algebra-oly", "proofs"],
      name: { en: "Combinatorics" },
      desc: { en: "Counting, graphs, game strategies." },
      why: { en: "The most idea-driven part of the IMO." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 6.042J → the Counting lectures" }, u: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/" },
        { t: "practice", r: 5, l: { en: "AoPS Alcumus → Counting & Probability mode" }, u: "https://artofproblemsolving.com/alcumus" },
        { t: "video", r: 4, l: { en: "Mathologer → combinatorics videos" }, u: "https://www.youtube.com/@Mathologer" },
      ],
      notes: { en: ["Addition vs multiplication rule", "C(n,k) = number of choices", "Find the invariant, what never changes?"] },
      quiz: [
        { q: { en: "Ways to choose 2 from 5 people?" }, o: { en: ["10", "20", "25"] }, a: 0 },
        { q: { en: "3 shirts, 4 pants, combinations?" }, o: { en: ["7", "12", "34"] }, a: 1 },
      ] },
    { id: "number-theory", stage: "a", pos: [450, 360], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["algebra-oly", "proofs"],
      name: { en: "Number Theory" },
      desc: { en: "Primes, divisibility, modular arithmetic." },
      why: { en: "'The queen of mathematics', an IMO classic." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "Michael Penn → Number Theory playlist · Lecture 1" }, u: "https://www.youtube.com/playlist?list=PL22w63XsKjqwn2V9CiP7cuSGv9plj71vv" },
        { t: "practice", r: 5, l: { en: "Project Euler → Problems 1–10" }, u: "https://projecteuler.net/" },
        { t: "book", r: 4, l: { en: "Evan Chen → number theory handouts" }, u: "https://web.evanchen.cc/olympiad.html" },
      ],
      notes: { en: ["a ≡ b (mod n): same remainder", "Fermat's little theorem", "GCD & the Euclidean algorithm"] },
      quiz: [
        { q: { en: "17 mod 5 = ?" }, o: { en: ["2", "3", "1"] }, a: 0 },
        { q: { en: "The smallest prime?" }, o: { en: ["1", "2", "3"] }, a: 1 },
      ] },
    { id: "imo-prep", stage: "a", pos: [450, 515], weeks: 8, h: 40, xp: 400, diff: 3, prereqs: ["combinatorics", "number-theory", "geometry-oly"],
      name: { en: "IMO Preparation" },
      desc: { en: "Real olympiad problems, timed practice." },
      why: { en: "Nothing teaches like past IMO problems." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IMO → official past problems" }, u: "https://www.imo-official.org/problems.aspx" },
        { t: "book", r: 5, l: { en: "Evan Chen → OTIS Excerpts (free textbook)" }, u: "https://web.evanchen.cc/otis.html" },
        { t: "course", r: 4, l: { en: "AoPS → Contest Collections · IMO section" }, u: "https://artofproblemsolving.com/community/c13_contests" },
      ],
      notes: { en: ["1 problem a day, 90 minutes", "Write full solutions", "Start with Mongolia's national olympiad"] },
      quiz: [
        { q: { en: "How many students per IMO team?" }, o: { en: ["4", "6", "8"] }, a: 1 },
        { q: { en: "How many problems at the IMO?" }, o: { en: ["6", "10", "3"] }, a: 0 },
      ] },
    { id: "problem-sets", stage: "o", pos: [450, 650], weeks: 2, h: 10, xp: 250, diff: 3, prereqs: ["imo-prep"],
      name: { en: "The Great Problem Vault" },
      desc: { en: "AoPS archive of every contest on Earth." },
      why: { en: "From here on, it's all practice." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "AoPS → Contest Collections (every contest)" }, u: "https://artofproblemsolving.com/community/c13_contests" },
        { t: "book", r: 4, l: { en: "Evan Chen → all handouts" }, u: "https://web.evanchen.cc/olympiad.html" },
      ],
      notes: { en: ["Check your unlocked contests on the Competitions page", "Training with a team accelerates growth"] },
      quiz: null },
  ] },
  { id: "math-pure", icon: "♾️", w: 900, h: 500,
    name: { en: "Pure Mathematics" },
    desc: { en: "Analysis, algebra, topology, toward university level" },
    nodes: [
    { id: "real-analysis", stage: "a", pos: [260, 60], weeks: 6, h: 30, xp: 350, diff: 3, prereqs: [],
      name: { en: "Real Analysis" },
      desc: { en: "ε-δ, limits, the rigorous theory of continuity." },
      why: { en: "Understand WHY calculus works, a mathematician's first real step." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 18.100A (Fall 2020) → Lecture 1" }, u: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/" },
        { t: "practice", r: 4, l: { en: "18.100A → Assignment 1" }, u: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/" },
      ],
      notes: { en: ["ε-δ is the precise language of 'how close'", "Continuity = small input, small output", "The completeness axiom is ℝ's secret"] },
      quiz: [
        { q: { en: "The ε-δ definition makes precise..." }, o: { en: ["Limits", "Integrals", "Numbers"] }, a: 0 },
        { q: { en: "A continuous function means..." }, o: { en: ["Small changes give small responses", "Has jumps", "Always increasing"] }, a: 0 },
      ] },
    { id: "diff-eq", stage: "a", pos: [640, 60], weeks: 5, h: 25, xp: 300, diff: 2, prereqs: [],
      name: { en: "Differential Equations" },
      desc: { en: "Solving systems defined by their change." },
      why: { en: "Planets, epidemics, circuits, nature speaks in ODEs." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 18.03SC → Unit I: First Order ODEs" }, u: "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/" },
        { t: "book", r: 5, l: { en: "Paul's Notes → DE: Basic Concepts chapter" }, u: "https://tutorial.math.lamar.edu/Classes/DE/DE.aspx" },
        { t: "practice", r: 4, l: { en: "Paul's Notes → First Order practice problems" }, u: "https://tutorial.math.lamar.edu/Classes/DE/DE.aspx" },
      ],
      notes: { en: ["y' = ky → exponential growth", "Initial conditions pick the solution", "Numerics: Euler's step"] },
      quiz: [
        { q: { en: "A solution of y' = y?" }, o: { en: ["eˣ", "x²", "sin x"] }, a: 0 },
        { q: { en: "ODEs model..." }, o: { en: ["Processes of change", "Only straight lines", "Colors"] }, a: 0 },
      ] },
    { id: "probability", stage: "a", pos: [640, 210], weeks: 5, h: 25, xp: 300, diff: 2, prereqs: [],
      name: { en: "Probability" },
      desc: { en: "The mathematics of uncertainty." },
      why: { en: "ML, physics, finance, all rest on probability." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT RES.6-012 (Tsitsiklis) → Lecture 1" }, u: "https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/" },
        { t: "book", r: 5, l: { en: "Blitzstein → Stat 110 · Lecture 1 + Ch.1" }, u: "https://projects.iq.harvard.edu/stat110" },
        { t: "practice", r: 4, l: { en: "Stat 110 → Strategic Practice 1" }, u: "https://projects.iq.harvard.edu/stat110" },
      ],
      notes: { en: ["P(A∪B) = P(A)+P(B)−P(A∩B)", "Conditioning = updating on information", "Law of large numbers, averages settle"] },
      quiz: [
        { q: { en: "Two dice, P(both sixes)?" }, o: { en: ["1/36", "1/12", "1/6"] }, a: 0 },
        { q: { en: "P(A) + P(Aᶜ) = ?" }, o: { en: ["1", "0", "2"] }, a: 0 },
      ] },
    { id: "abstract-algebra", stage: "a", pos: [260, 210], weeks: 6, h: 30, xp: 350, diff: 3, prereqs: ["proofs"],
      name: { en: "Abstract Algebra" },
      desc: { en: "Groups, rings, fields, the language of symmetry." },
      why: { en: "Cryptography and particle physics both run on group theory." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Judson → Abstract Algebra · Ch.1-3" }, u: "https://judsonbooks.org/aata-files/aata/aata.html" },
        { t: "course", r: 5, l: { en: "MIT 18.703 Modern Algebra → Lecture Notes 1" }, u: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/" },
        { t: "practice", r: 4, l: { en: "Judson → Ch.3 (Groups) exercises" }, u: "http://abstract.ups.edu/" },
      ],
      notes: { en: ["A group = operation + 4 axioms", "Every symmetry forms a group", "ℤₙ, the group of the modular world"] },
      quiz: [
        { q: { en: "One of the 4 group axioms?" }, o: { en: ["Inverse element", "Infinity", "Ordering"] }, a: 0 },
        { q: { en: "Is (ℤ, +) a group?" }, o: { en: ["Yes", "No", "Sometimes"] }, a: 0 },
      ] },
    { id: "topology", stage: "a", pos: [260, 360], weeks: 5, h: 25, xp: 350, diff: 3, prereqs: ["real-analysis"],
      name: { en: "Topology" },
      desc: { en: "The 'rubber' properties of shape, a mug equals a donut." },
      why: { en: "The language of modern math; now inside physics too." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Morris → Topology Without Tears · Ch.1" }, u: "https://www.topologywithouttears.net/" },
        { t: "practice", r: 4, l: { en: "Topology Without Tears → Ch.1 exercises" }, u: "https://www.topologywithouttears.net/" },
      ],
      notes: { en: ["Open sets are topology's atoms", "Homeomorphism = rubber transformation", "Invariant: the number of holes"] },
      quiz: [
        { q: { en: "Topologically, a mug equals..." }, o: { en: ["A donut (torus)", "A sphere", "A cube"] }, a: 0 },
        { q: { en: "Topology studies..." }, o: { en: ["Properties preserved by continuous maps", "Only angles", "Counting"] }, a: 0 },
      ] },
  ] },
  { id: "math-foundations", icon: "🧩", w: 900, h: 690,
    name: { en: "Foundations & Proofs" },
    desc: { en: "Logic, proof, set theory, the language of mathematics" },
    nodes: [
    { id: "logic-intro", stage: "f", pos: [450, 60], weeks: 2, h: 10, xp: 200, diff: 1, prereqs: [],
      name: { en: "Mathematical Logic" },
      desc: { en: "Propositional and predicate logic, quantifiers, truth tables." },
      why: { en: "A proof is logic, where mathematical thinking begins." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Hammack → Book of Proof · Ch.1–2" }, u: "https://richardhammack.github.io/BookOfProof/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 6.042J → Logic (OCW)" }, u: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/" },
      ],
      quiz: [
        { q: { en: "'∀' means..." }, o: { en: ["For all", "There exists", "Not"] }, a: 0 },
        { q: { en: "'P → Q' is false only when..." }, o: { en: ["P true, Q false", "Both true", "Both false"] }, a: 0 },
      ] },
    { id: "proof-techniques", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["logic-intro"],
      name: { en: "Proof Techniques" },
      desc: { en: "Direct, contradiction, induction, contrapositive proofs." },
      why: { en: "The ability to prove underlies all higher math." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Hammack → Book of Proof · Ch.4–10" }, u: "https://richardhammack.github.io/BookOfProof/" },
      ],
      quiz: [
        { q: { en: "Induction first checks the..." }, o: { en: ["Base case", "Conclusion", "Counterexample"] }, a: 0 },
        { q: { en: "Proof by contradiction assumes the..." }, o: { en: ["Negation", "Conclusion true", "Nothing"] }, a: 0 },
      ] },
    { id: "set-theory", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["proof-techniques"],
      name: { en: "Set Theory" },
      desc: { en: "Sets, operations, power sets, an intro to ZFC." },
      why: { en: "All of modern mathematics is built on sets." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Hammack → Book of Proof · Ch.1 (Sets)" }, u: "https://richardhammack.github.io/BookOfProof/" },
      ],
      quiz: [
        { q: { en: "What is A ∪ B?" }, o: { en: ["Union", "Intersection", "Difference"] }, a: 0 },
        { q: { en: "A set with n elements has how many subsets?" }, o: { en: ["2ⁿ", "n²", "n!"] }, a: 0 },
      ] },
    { id: "functions-relations", stage: "a", pos: [450, 465], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["set-theory"],
      name: { en: "Relations & Functions" },
      desc: { en: "Relations, equivalence relations, injections/surjections/bijections." },
      why: { en: "A rigorous notion of function underlies analysis and algebra." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Hammack → Book of Proof · Ch.11–12" }, u: "https://richardhammack.github.io/BookOfProof/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 6.042J → Relations & Functions (OCW)" }, u: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/" },
      ],
      quiz: [
        { q: { en: "A bijection is..." }, o: { en: ["Injective and surjective", "Only injective", "Constant"] }, a: 0 },
        { q: { en: "Equivalence relation: reflexive, symmetric, and?" }, o: { en: ["Transitive", "Even", "Bounded"] }, a: 0 },
      ] },
    { id: "cardinality", stage: "o", pos: [450, 600], weeks: 2, h: 12, xp: 400, diff: 3, prereqs: ["functions-relations"],
      name: { en: "Cardinality" },
      desc: { en: "Countable and uncountable sets, Cantor's theorem." },
      why: { en: "Infinities come in different sizes, a stunning discovery." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Hammack → Book of Proof · Ch.13" }, u: "https://richardhammack.github.io/BookOfProof/" },
        { role: "viz", t: "video", r: 5, l: { en: "Veritasium → “Infinite Hotel”" }, u: "https://www.youtube.com/watch?v=OxGsU8oIWjY" },
      ],
      quiz: null },
  ] },
  { id: "math-linalg", icon: "🔢", w: 900, h: 820,
    name: { en: "Linear Algebra" },
    desc: { en: "From vectors to the spectral theorem, the basis of data, physics, ML" },
    nodes: [
    { id: "la-vectors", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 200, diff: 1, prereqs: [],
      name: { en: "Vectors & Vector Spaces" },
      desc: { en: "Vectors, linear combinations, basis, dimension." },
      why: { en: "Linear algebra is the language of data, physics, and ML." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Essence of Linear Algebra (Ch.1–2)" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
        { role: "secondary", t: "course", r: 5, l: { en: "MIT 18.06 → Lectures 1–2 (Strang)" }, u: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
      ],
      quiz: [
        { q: { en: "A basis is a set that is..." }, o: { en: ["Independent and spanning", "Parallel", "Zero"] }, a: 0 },
        { q: { en: "Dimension is..." }, o: { en: ["Number of basis vectors", "Vector length", "Row count"] }, a: 0 },
      ] },
    { id: "la-matrices", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["la-vectors"],
      name: { en: "Matrices & Linear Systems" },
      desc: { en: "Matrix operations, Gaussian elimination, inverses, determinants." },
      why: { en: "Systems of linear equations are solved with matrices." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.06 → Lectures 2–5 (Elimination)" }, u: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Matrices" }, u: "https://www.khanacademy.org/math/linear-algebra" },
      ],
      quiz: [
        { q: { en: "If determinant is 0, the matrix is..." }, o: { en: ["Not invertible", "Invertible", "Zero"] }, a: 0 },
        { q: { en: "Gaussian elimination solves..." }, o: { en: ["Linear systems", "ODEs", "Integrals"] }, a: 0 },
      ] },
    { id: "la-linear-maps", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["la-matrices"],
      name: { en: "Linear Transformations" },
      desc: { en: "Linear maps, kernel, image, rank-nullity." },
      why: { en: "A matrix IS a linear transformation, it ties it all together." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Linear transformations (Ch.3–4)" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
      ],
      quiz: [
        { q: { en: "rank + nullity = ?" }, o: { en: ["Dimension of the domain", "0", "1"] }, a: 0 },
        { q: { en: "The kernel is..." }, o: { en: ["Vectors mapping to zero", "All vectors", "The basis"] }, a: 0 },
      ] },
    { id: "la-eigenvalues", stage: "a", pos: [450, 465], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["la-linear-maps"],
      name: { en: "Eigenvalues & Eigenvectors" },
      desc: { en: "Eigenvalues, eigenvectors, diagonalization." },
      why: { en: "From Google PageRank to quantum mechanics, everywhere." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Eigenvectors and eigenvalues" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
        { role: "secondary", t: "course", r: 5, l: { en: "MIT 18.06 → Lectures 21–22 (Eigenvalues)" }, u: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
      ],
      quiz: [
        { q: { en: "In Av = λv, λ is the..." }, o: { en: ["Eigenvalue", "Determinant", "Rank"] }, a: 0 },
        { q: { en: "Diagonalization simplifies..." }, o: { en: ["Matrix powers", "Addition", "Division"] }, a: 0 },
      ] },
    { id: "la-inner-product", stage: "a", pos: [450, 600], weeks: 2, h: 12, xp: 300, diff: 3, prereqs: ["la-linear-maps"],
      name: { en: "Inner Product Spaces" },
      desc: { en: "Inner products, orthogonality, Gram–Schmidt, projection." },
      why: { en: "Least squares, Fourier, ML, all rest on orthogonality." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.06 → Lectures 15–17 (Orthogonality)" }, u: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
      ],
      quiz: [
        { q: { en: "Inner product of orthogonal vectors?" }, o: { en: ["0", "1", "∞"] }, a: 0 },
        { q: { en: "Gram–Schmidt produces an ___ basis" }, o: { en: ["Orthogonal", "Random", "Zero"] }, a: 0 },
      ] },
    { id: "la-spectral", stage: "o", pos: [450, 735], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["la-eigenvalues", "la-inner-product"],
      name: { en: "Spectral Theorem & SVD" },
      desc: { en: "Spectral theorem for symmetric matrices, singular value decomposition." },
      why: { en: "SVD is the heart of data science, PCA, and image compression." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.06 → Lectures 25, 29 (SVD)" }, u: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
      ],
      quiz: null },
  ] },
  { id: "math-abstract-algebra", icon: "🔷", w: 900, h: 690,
    name: { en: "Abstract Algebra" },
    desc: { en: "From groups to Galois theory, the mathematics of symmetry" },
    nodes: [
    { id: "groups", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: [],
      name: { en: "Groups" },
      desc: { en: "Group axioms, examples, cyclic groups, order." },
      why: { en: "Groups are the language of symmetry, essential in physics & chemistry." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Judson → Abstract Algebra · Ch.3–4 (free online)" }, u: "http://abstract.ups.edu/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 18.701 → Algebra I: Groups (OCW)" }, u: "https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/" },
        { role: "viz", t: "video", r: 4, l: { en: "Socratica → Abstract Algebra series" }, u: "https://www.youtube.com/playlist?list=PLi01XoE8jYoi3SgnnGorR_XOW3IcK-TP6" },
      ],
      quiz: [
        { q: { en: "A group must have an ___ element" }, o: { en: ["Identity", "Only zero", "Non-invertible"] }, a: 0 },
        { q: { en: "A cyclic group is generated by..." }, o: { en: ["A single element", "Two elements", "All elements"] }, a: 0 },
      ] },
    { id: "group-homomorphisms", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["groups"],
      name: { en: "Subgroups & Homomorphisms" },
      desc: { en: "Subgroups, Lagrange's theorem, homomorphisms, quotient groups." },
      why: { en: "The key tools to compare and decompose groups." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Judson → Abstract Algebra · Ch.9–11" }, u: "http://abstract.ups.edu/" },
      ],
      quiz: [
        { q: { en: "Lagrange: subgroup order divides..." }, o: { en: ["The group's order", "Zero", "The identity"] }, a: 0 },
        { q: { en: "A homomorphism preserves the..." }, o: { en: ["Group operation", "Size", "Color"] }, a: 0 },
      ] },
    { id: "rings", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["group-homomorphisms"],
      name: { en: "Rings & Ideals" },
      desc: { en: "Rings, ideals, quotient rings, integral domains." },
      why: { en: "Integers and polynomials all carry ring structure." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Judson → Abstract Algebra · Ch.16–18" }, u: "http://abstract.ups.edu/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 18.702 → Algebra II: Rings (OCW)" }, u: "https://ocw.mit.edu/courses/18-702-algebra-ii-spring-2011/" },
      ],
      quiz: [
        { q: { en: "A ring has which two operations?" }, o: { en: ["Addition and multiplication", "Division and powers", "Logarithm"] }, a: 0 },
        { q: { en: "Ideals are used to form..." }, o: { en: ["Quotient rings", "Vectors", "Matrices"] }, a: 0 },
      ] },
    { id: "fields-extensions", stage: "a", pos: [450, 465], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["rings"],
      name: { en: "Fields & Extensions" },
      desc: { en: "Fields, field extensions, algebraic elements." },
      why: { en: "This is where 'squaring the circle' is proven impossible." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Judson → Abstract Algebra · Ch.21" }, u: "http://abstract.ups.edu/" },
      ],
      quiz: [
        { q: { en: "A field differs from a ring by having..." }, o: { en: ["Multiplicative inverses", "Only addition", "Ideals"] }, a: 0 },
        { q: { en: "ℚ, ℝ, ℂ are examples of..." }, o: { en: ["Fields", "Only groups", "Matrices"] }, a: 0 },
      ] },
    { id: "galois-theory", stage: "o", pos: [450, 600], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["fields-extensions"],
      name: { en: "Galois Theory" },
      desc: { en: "Galois groups, solvability of equations by radicals." },
      why: { en: "Explains why there's no formula for the quintic." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Judson → Abstract Algebra · Ch.23 (Galois)" }, u: "http://abstract.ups.edu/" },
      ],
      quiz: null },
  ] },
  { id: "math-real-analysis", icon: "📈", w: 900, h: 820,
    name: { en: "Real Analysis" },
    desc: { en: "From sequences to metric spaces, the rigorous foundation of calculus" },
    nodes: [
    { id: "sequences-limits", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: [],
      name: { en: "Sequences & Limits" },
      desc: { en: "The ε–δ definition of limit, convergence, Cauchy sequences." },
      why: { en: "The ε–δ language that makes calculus rigorous, the base of all analysis." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.100A → Sequences & Limits section (OCW)" }, u: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/" },
        { role: "secondary", t: "video", r: 4, l: { en: "The Bright Side of Mathematics → Real Analysis" }, u: "https://www.youtube.com/playlist?list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr" },
      ],
      notes: { en: ["ε–δ: for any small ε there's an N", "Cauchy sequences converge in ℝ", "A limit is unique"] },
      quiz: [
        { q: { en: "In ℝ, a Cauchy sequence is..." }, o: { en: ["Convergent", "Bounded only", "Zero"] }, a: 0 },
        { q: { en: "The limit definition uses which two symbols?" }, o: { en: ["ε and δ", "x and y", "∫ and Σ"] }, a: 0 },
      ] },
    { id: "continuity", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["sequences-limits"],
      name: { en: "Continuity" },
      desc: { en: "Continuous functions, the intermediate value theorem, uniform continuity." },
      why: { en: "Makes 'continuous' precise and proves deep theorems." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.100A → Continuity section (OCW)" }, u: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/" },
      ],
      notes: { en: ["IVT: a sign change implies a root", "Continuous on a closed interval → uniformly continuous", "A continuous function attains its max"] },
      quiz: [
        { q: { en: "The intermediate value theorem guarantees a..." }, o: { en: ["Root exists", "A maximum", "A derivative"] }, a: 0 },
        { q: { en: "A continuous function on a closed interval..." }, o: { en: ["Attains max & min", "Is zero", "Is undefined"] }, a: 0 },
      ] },
    { id: "differentiation", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["continuity"],
      name: { en: "Differentiation" },
      desc: { en: "The rigorous definition of derivative, the mean value theorem, Taylor's theorem." },
      why: { en: "Grounds the derivative rigorously; the MVT ties everything together." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.100A → Differentiation section (OCW)" }, u: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/" },
      ],
      notes: { en: ["Derivative = limit of (f(x+h)−f(x))/h", "The MVT is analysis's key tool", "Taylor approximates functions by polynomials"] },
      quiz: [
        { q: { en: "The mean value theorem guarantees a point where..." }, o: { en: ["Derivative = average slope", "The function is zero", "A max"] }, a: 0 },
        { q: { en: "A differentiable function is always..." }, o: { en: ["Continuous", "Even", "Bounded"] }, a: 0 },
      ] },
    { id: "riemann-integration", stage: "a", pos: [450, 465], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["differentiation"],
      name: { en: "Riemann Integration" },
      desc: { en: "Riemann sums, integrability, the fundamental theorem of calculus." },
      why: { en: "Defines the integral rigorously and links it to differentiation." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.100A → Riemann Integral section (OCW)" }, u: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/" },
      ],
      notes: { en: ["The integral = limit of Riemann sums", "Continuous functions are integrable", "FTC: integration and differentiation are inverse"] },
      quiz: [
        { q: { en: "The fundamental theorem links integration and..." }, o: { en: ["Differentiation", "Matrices", "Logic"] }, a: 0 },
        { q: { en: "The Riemann integral is a limit of..." }, o: { en: ["Sums (Riemann)", "Derivatives", "Matrices"] }, a: 0 },
      ] },
    { id: "series-convergence", stage: "a", pos: [450, 600], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["differentiation"],
      name: { en: "Series & Convergence" },
      desc: { en: "Convergence tests, power series, uniform convergence." },
      why: { en: "Expressing functions as infinite sums, a powerful analytic tool." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.100A → Series section (OCW)" }, u: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/" },
      ],
      notes: { en: ["Ratio/root tests check convergence", "Power series have a radius of convergence", "Uniform convergence preserves continuity"] },
      quiz: [
        { q: { en: "A power series is characterized by its..." }, o: { en: ["Radius of convergence", "Color", "Matrix"] }, a: 0 },
        { q: { en: "The ratio test checks..." }, o: { en: ["Series convergence", "Continuity", "Derivatives"] }, a: 0 },
      ] },
    { id: "metric-spaces", stage: "o", pos: [450, 735], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["riemann-integration", "series-convergence"],
      name: { en: "Metric Spaces" },
      desc: { en: "Metrics, open/closed sets, completeness, compactness." },
      why: { en: "Generalizes analysis and bridges to topology." },
      res: [
        { role: "advanced", t: "course", r: 4, l: { en: "MIT 18.100B → Metric Spaces variant (OCW)" }, u: "https://ocw.mit.edu/courses/18-100b-analysis-i-fall-2010/" },
      ],
      notes: { en: ["A metric = a generalized 'distance'", "Complete: Cauchy sequences converge", "Compact sets are crucial"] },
      quiz: null },
  ] },
  { id: "math-complex-analysis", icon: "🌐", w: 900, h: 560,
    name: { en: "Complex Analysis" },
    desc: { en: "From complex functions to the residue theorem" },
    nodes: [
    { id: "complex-functions", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: [],
      name: { en: "Complex Functions" },
      desc: { en: "The complex plane, complex functions, exp and log." },
      why: { en: "Complex analysis has a beauty with no equal in real math." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.04 → Complex Variables (OCW)" }, u: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/" },
      ],
      notes: { en: ["i² = −1, z = x + iy", "e^(iθ) = cosθ + i·sinθ (Euler)", "A complex function maps plane to plane"] },
      quiz: [
        { q: { en: "Euler's formula?" }, o: { en: ["e^(iθ) = cosθ + i·sinθ", "e^θ = θ", "i = 1"] }, a: 0 },
        { q: { en: "i² equals?" }, o: { en: ["−1", "1", "0"] }, a: 0 },
      ] },
    { id: "cauchy-riemann", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["complex-functions"],
      name: { en: "Cauchy–Riemann Equations" },
      desc: { en: "Analyticity, the Cauchy–Riemann conditions, harmonic functions." },
      why: { en: "Complex differentiability is a surprisingly powerful condition." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.04 → Analytic Functions section (OCW)" }, u: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/" },
      ],
      notes: { en: ["Cauchy–Riemann: uₓ = v_y, u_y = −vₓ", "Analytic = complex-differentiable", "Real & imaginary parts are harmonic"] },
      quiz: [
        { q: { en: "An analytic function satisfies the ___ equations" }, o: { en: ["Cauchy–Riemann", "Maxwell", "Newton"] }, a: 0 },
        { q: { en: "The real part of an analytic function is..." }, o: { en: ["Harmonic", "Constant", "Zero"] }, a: 0 },
      ] },
    { id: "contour-integration", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["cauchy-riemann"],
      name: { en: "Contour Integration" },
      desc: { en: "Complex integration, Cauchy's theorem, Cauchy's integral formula." },
      why: { en: "An analytic function is fully determined by its boundary values." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.04 → Cauchy's Theorem section (OCW)" }, u: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/" },
      ],
      notes: { en: ["Cauchy's theorem: closed contour = 0 if analytic", "Cauchy's formula gives values from the boundary", "Complex integrals are path-independent (when analytic)"] },
      quiz: [
        { q: { en: "Closed contour integral of an analytic function?" }, o: { en: ["0", "1", "∞"] }, a: 0 },
        { q: { en: "Cauchy's integral formula gives function values from the..." }, o: { en: ["Boundary values", "Derivative", "Matrix"] }, a: 0 },
      ] },
    { id: "residue-theorem", stage: "o", pos: [450, 465], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["contour-integration"],
      name: { en: "Residue Theorem" },
      desc: { en: "Laurent series, singularities, residues, evaluating real integrals." },
      why: { en: "Solves integrals instantly that are impossible in real analysis." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.04 → Residues section (OCW)" }, u: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/" },
      ],
      notes: { en: ["A residue = the 1/z Laurent coefficient", "Closed integral = 2πi × sum of residues", "Powerful for real integrals"] },
      quiz: null },
  ] },
  { id: "math-topology", icon: "🍩", w: 900, h: 690,
    name: { en: "Topology" },
    desc: { en: "From topological spaces to the fundamental group, the mathematics of shape" },
    nodes: [
    { id: "topological-spaces", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: [],
      name: { en: "Topological Spaces" },
      desc: { en: "Open sets, topologies, bases, subspaces." },
      why: { en: "Defining 'nearness' without distance, the generalization of geometry." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.901 → Introduction to Topology (OCW)" }, u: "https://ocw.mit.edu/courses/18-901-introduction-to-topology-fall-2004/" },
      ],
      notes: { en: ["A topology = a collection of open sets", "Unions & finite intersections stay open", "Topology is 'rubber-sheet geometry'"] },
      quiz: [
        { q: { en: "A topology specifies which sets are..." }, o: { en: ["Open", "Zero", "Bounded"] }, a: 0 },
        { q: { en: "Topology is nicknamed..." }, o: { en: ["Rubber-sheet geometry", "Number theory", "Logic"] }, a: 0 },
      ] },
    { id: "continuity-homeomorphism", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["topological-spaces"],
      name: { en: "Continuity & Homeomorphism" },
      desc: { en: "Continuous maps, homeomorphisms, topological invariants." },
      why: { en: "Explains why a coffee cup and a donut are 'the same'." },
      res: [
        { role: "viz", t: "video", r: 4, l: { en: "PBS Infinite Series → topology videos" }, u: "https://www.youtube.com/playlist?list=PLa6IE8XPP_glKmuftvE_flU_iBj_ymybP" },
      ],
      notes: { en: ["Continuous: preimage of open is open", "Homeomorphism = topological sameness", "Invariants are preserved"] },
      quiz: [
        { q: { en: "A homeomorphism preserves..." }, o: { en: ["Topological structure", "Distance", "Angles"] }, a: 0 },
        { q: { en: "In topology, a cup and a donut are..." }, o: { en: ["The same (homeomorphic)", "Totally different", "Both spheres"] }, a: 0 },
      ] },
    { id: "compactness", stage: "a", pos: [450, 330], weeks: 2, h: 12, xp: 300, diff: 3, prereqs: ["continuity-homeomorphism"],
      name: { en: "Compactness" },
      desc: { en: "Open covers, compact spaces, the Heine–Borel theorem." },
      why: { en: "Topology's most important concept, the generalization of 'bounded'." },
      res: [
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 18.901 → Compactness section (OCW)" }, u: "https://ocw.mit.edu/courses/18-901-introduction-to-topology-fall-2004/" },
      ],
      notes: { en: ["Compact = every open cover has a finite subcover", "In ℝⁿ: compact ⟺ closed + bounded", "Continuous functions attain max on compact sets"] },
      quiz: [
        { q: { en: "In ℝⁿ, a compact set is..." }, o: { en: ["Closed and bounded", "Only open", "Zero"] }, a: 0 },
        { q: { en: "Compactness is about..." }, o: { en: ["Open covers", "Angles", "Matrices"] }, a: 0 },
      ] },
    { id: "connectedness", stage: "a", pos: [450, 465], weeks: 2, h: 12, xp: 300, diff: 3, prereqs: ["continuity-homeomorphism"],
      name: { en: "Connectedness" },
      desc: { en: "Connected spaces, path-connectedness, components." },
      why: { en: "Captures whether a space is 'in one piece' topologically." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Topology Without Tears (Morris): Connectedness" }, u: "https://www.topologywithouttears.net/" },
      ],
      notes: { en: ["Connected = not split into two open sets", "Path-connected → connected", "Connectedness is a topological invariant"] },
      quiz: [
        { q: { en: "A connected space cannot be split into two disjoint..." }, o: { en: ["Open sets", "Points", "Matrices"] }, a: 0 },
        { q: { en: "Path-connectedness means any two points are joined by a..." }, o: { en: ["Path", "Straight line", "Circle"] }, a: 0 },
      ] },
    { id: "fundamental-group", stage: "o", pos: [450, 600], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["compactness", "connectedness"],
      name: { en: "The Fundamental Group" },
      desc: { en: "Homotopy, loops, the fundamental group, the start of algebraic topology." },
      why: { en: "Classifies topological spaces using algebraic structures." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Hatcher → Algebraic Topology · Ch.1 (free online)" }, u: "https://pi.math.cornell.edu/~hatcher/AT/ATpage.html" },
        { role: "advanced", t: "practice", r: 4, l: { en: "arXiv math.AT → read one abstract" }, u: "https://arxiv.org/list/math.AT/new" },
      ],
      notes: { en: ["The fundamental group classifies loops", "The circle's fundamental group = ℤ", "Links algebra and topology"] },
      quiz: null },
  ] },
  { id: "math-diffgeo", icon: "🌀", w: 900, h: 560,
    name: { en: "Differential Geometry" },
    desc: { en: "From curves to manifolds, the mathematics of curved space" },
    nodes: [
    { id: "curves-frenet", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: [],
      name: { en: "Curves & the Frenet Frame" },
      desc: { en: "Parametrized curves, curvature, torsion, Frenet–Serret." },
      why: { en: "Fully describes a space curve with numerical quantities." },
      res: [
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 18.950 → Differential Geometry (OCW)" }, u: "https://ocw.mit.edu/courses/18-950-differential-geometry-fall-2008/" },
      ],
      notes: { en: ["Curvature = how fast it bends", "Torsion = how much it leaves a plane", "Frenet frame: T, N, B"] },
      quiz: [
        { q: { en: "Curvature measures how much a curve..." }, o: { en: ["Bends", "Lengthens", "Is colored"] }, a: 0 },
        { q: { en: "The Frenet frame has how many vectors?" }, o: { en: ["3 (T, N, B)", "1", "5"] }, a: 0 },
      ] },
    { id: "surfaces", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["curves-frenet"],
      name: { en: "Surfaces" },
      desc: { en: "Regular surfaces, the first fundamental form, tangent planes." },
      why: { en: "Spheres, tori, the geometry of surfaces starts here." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Hatcher, Algebraic Topology: Surfaces" }, u: "https://pi.math.cornell.edu/~hatcher/AT/ATpage.html" },
      ],
      notes: { en: ["A surface = locally plane-like", "The first fundamental form measures distance", "The tangent plane is the local linear approximation"] },
      quiz: [
        { q: { en: "The first fundamental form measures..." }, o: { en: ["Distance on the surface", "Color", "Mass"] }, a: 0 },
        { q: { en: "A surface locally looks like a..." }, o: { en: ["Plane", "Always a sphere", "Line"] }, a: 0 },
      ] },
    { id: "gaussian-curvature", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["surfaces"],
      name: { en: "Gaussian Curvature" },
      desc: { en: "The second fundamental form, Gaussian curvature, Theorema Egregium." },
      why: { en: "Proves mathematically that you can't make a distortion-free map." },
      res: [
        { role: "viz", t: "video", r: 4, l: { en: "Khan / 3B1B → curvature visualizations" }, u: "https://www.khanacademy.org/math/multivariable-calculus" },
      ],
      notes: { en: ["Gaussian curvature K = an intrinsic property", "Theorema Egregium: K is knowable within the surface", "Sphere K > 0, saddle K < 0"] },
      quiz: [
        { q: { en: "Theorema Egregium says curvature is..." }, o: { en: ["Intrinsic", "Only extrinsic", "Constant"] }, a: 0 },
        { q: { en: "The Gaussian curvature of a sphere is..." }, o: { en: ["Positive (> 0)", "Negative", "Zero"] }, a: 0 },
      ] },
    { id: "manifolds-intro", stage: "o", pos: [450, 465], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["gaussian-curvature"],
      name: { en: "Introduction to Manifolds" },
      desc: { en: "Manifolds, tangent spaces, the Riemannian metric." },
      why: { en: "The mathematical language of general relativity, curved spacetime." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Evan Chen, Napkin: Manifolds" }, u: "https://web.evanchen.cc/napkin.html" },
      ],
      notes: { en: ["A manifold = locally ℝⁿ-like space", "A tangent space at each point", "The Riemannian metric measures distance, the basis of GR"] },
      quiz: null },
  ] },
  { id: "math-number-theory", icon: "🔟", w: 900, h: 690,
    name: { en: "Number Theory" },
    desc: { en: "From divisibility to analytic number theory, the math of integers" },
    nodes: [
    { id: "divisibility-gcd", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 200, diff: 1, prereqs: [],
      name: { en: "Divisibility & GCD" },
      desc: { en: "Divisibility, primes, the Euclidean algorithm, the fundamental theorem of arithmetic." },
      why: { en: "The foundation stone of all integer theory." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.781 → Theory of Numbers (OCW)" }, u: "https://ocw.mit.edu/courses/18-781-theory-of-numbers-spring-2012/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Primes and divisibility" }, u: "https://www.khanacademy.org/math" },
        { role: "practice", t: "practice", r: 4, l: { en: "AoPS → Introduction to Number Theory exercises" }, u: "https://artofproblemsolving.com/" },
      ],
      notes: { en: ["FTA: prime factorization is unique", "The Euclidean algorithm finds the GCD", "Primes are infinite (Euclid)"] },
      quiz: [
        { q: { en: "The fundamental theorem of arithmetic: every integer has a unique..." }, o: { en: ["Prime factorization", "Square root", "Inverse"] }, a: 0 },
        { q: { en: "The Euclidean algorithm computes the..." }, o: { en: ["GCD", "A prime", "A matrix"] }, a: 0 },
      ] },
    { id: "modular-arithmetic", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["divisibility-gcd"],
      name: { en: "Modular Arithmetic" },
      desc: { en: "Congruences, Fermat's & Euler's theorems, the CRT." },
      why: { en: "RSA cryptography and all computer hashing rest on modular arithmetic." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.781 → Congruences section (OCW)" }, u: "https://ocw.mit.edu/courses/18-781-theory-of-numbers-spring-2012/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Modular arithmetic (cryptography)" }, u: "https://www.khanacademy.org/computing/computer-science/cryptography" },
      ],
      notes: { en: ["a ≡ b (mod n): n | (a−b)", "Fermat's little theorem: aᵖ⁻¹ ≡ 1 (mod p)", "The CRT combines systems"] },
      quiz: [
        { q: { en: "Fermat's little theorem: aᵖ⁻¹ ≡ ? (mod p)" }, o: { en: ["1", "0", "p"] }, a: 0 },
        { q: { en: "RSA cryptography rests on..." }, o: { en: ["Modular arithmetic", "Matrices", "Geometry"] }, a: 0 },
      ] },
    { id: "prime-distribution", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["modular-arithmetic"],
      name: { en: "Prime Distribution" },
      desc: { en: "The prime number theorem, π(x), the density of primes." },
      why: { en: "How primes are distributed, one of math's deepest questions." },
      res: [
        { role: "viz", t: "video", r: 5, l: { en: "3Blue1Brown → “Prime spirals” / prime videos" }, u: "https://www.youtube.com/c/3blue1brown" },
      ],
      notes: { en: ["PNT: π(x) ~ x/ln(x)", "Primes thin out but never end", "The Riemann hypothesis concerns this distribution"] },
      quiz: [
        { q: { en: "The prime number theorem: π(x) ~ ?" }, o: { en: ["x/ln(x)", "x²", "2ˣ"] }, a: 0 },
        { q: { en: "π(x) counts the number of..." }, o: { en: ["Primes below x", "Divisors", "Matrices"] }, a: 0 },
      ] },
    { id: "diophantine-equations", stage: "a", pos: [450, 465], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["modular-arithmetic"],
      name: { en: "Diophantine Equations" },
      desc: { en: "Integer solutions, Pythagorean triples, Pell's equation." },
      why: { en: "Famous problems like Fermat's Last Theorem live here." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.781 → Diophantine Equations section (OCW)" }, u: "https://ocw.mit.edu/courses/18-781-theory-of-numbers-spring-2012/" },
        { role: "practice", t: "practice", r: 4, l: { en: "AoPS → Diophantine equations problems" }, u: "https://artofproblemsolving.com/" },
      ],
      notes: { en: ["Only integer solutions are sought", "Pythagorean triples: a² + b² = c²", "Modular arithmetic is often the key"] },
      quiz: [
        { q: { en: "Diophantine equations seek which solutions?" }, o: { en: ["Integers", "Complex", "Matrices"] }, a: 0 },
        { q: { en: "a² + b² = c² gives..." }, o: { en: ["Pythagorean triples", "Pell's equation", "Euler"] }, a: 0 },
      ] },
    { id: "analytic-nt", stage: "o", pos: [450, 600], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["prime-distribution", "diophantine-equations"],
      name: { en: "Analytic Number Theory" },
      desc: { en: "The Riemann zeta function, the Riemann hypothesis, analytic methods." },
      why: { en: "Connected to the most famous unsolved problem in mathematics." },
      res: [
        { role: "advanced", t: "practice", r: 4, l: { en: "arXiv math.NT → read one abstract" }, u: "https://arxiv.org/list/math.NT/new" },
      ],
      notes: { en: ["ζ(s) = Σ 1/nˢ", "Riemann hypothesis: zeros on Re(s) = ½", "A $1M Millennium Prize problem"] },
      quiz: null },
  ] },
  { id: "math-combinatorics-graph", icon: "🔗", w: 900, h: 560,
    name: { en: "Combinatorics & Graph Theory" },
    desc: { en: "From counting to extremal theory, the math of discrete structures" },
    nodes: [
    { id: "counting-principles", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 200, diff: 1, prereqs: [],
      name: { en: "Counting Principles" },
      desc: { en: "Permutations and combinations, the binomial theorem, inclusion-exclusion." },
      why: { en: "'How many ways?', the fundamental question of combinatorics." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.042J → Counting section (OCW)" }, u: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Combinatorics and probability" }, u: "https://www.khanacademy.org/math/statistics-probability/counting-permutations-and-combinations" },
        { role: "practice", t: "practice", r: 4, l: { en: "AoPS → Introduction to Counting & Probability" }, u: "https://artofproblemsolving.com/" },
      ],
      notes: { en: ["Permutations: order matters; combinations: it doesn't", "Binomial theorem: coefficients of (a+b)ⁿ", "Inclusion-exclusion handles overlaps"] },
      quiz: [
        { q: { en: "In a combination, order..." }, o: { en: ["Doesn't matter", "Matters", "Is undefined"] }, a: 0 },
        { q: { en: "Expanding (a+b)ⁿ gives..." }, o: { en: ["Binomial coefficients", "Matrices", "Primes"] }, a: 0 },
      ] },
    { id: "generating-functions", stage: "a", pos: [280, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["counting-principles"],
      name: { en: "Generating Functions" },
      desc: { en: "Ordinary and exponential generating functions, solving recurrences." },
      why: { en: "A magical tool that turns counting into algebra." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Wilf → generatingfunctionology (free PDF)" }, u: "https://www2.math.upenn.edu/~wilf/DownldGF.html" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 6.042J → Generating Functions (OCW)" }, u: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/" },
      ],
      notes: { en: ["Encode a sequence as a power series", "Recurrences → algebraic equations", "Even Fibonacci becomes easy"] },
      quiz: [
        { q: { en: "A generating function encodes a sequence as a..." }, o: { en: ["Power series", "Matrix", "Graph"] }, a: 0 },
        { q: { en: "Generating functions help solve..." }, o: { en: ["Recurrences", "Integrals", "Matrix inverse"] }, a: 0 },
      ] },
    { id: "graph-basics", stage: "a", pos: [620, 195], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["counting-principles"],
      name: { en: "Graph Theory Basics" },
      desc: { en: "Vertices, edges, degree, paths, trees, Euler & Hamilton paths." },
      why: { en: "Networks, maps, computer science, all graphs." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Diestel → Graph Theory · Ch.1 (free online)" }, u: "https://diestel-graph-theory.com/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 6.042J → Graph Theory (OCW)" }, u: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/" },
      ],
      notes: { en: ["A graph = vertices + edges", "A tree = a connected acyclic graph", "An Euler path uses each edge exactly once"] },
      quiz: [
        { q: { en: "A tree is a connected graph with no..." }, o: { en: ["Cycles", "Vertices", "Edges"] }, a: 0 },
        { q: { en: "An Euler path traverses each ___ exactly once" }, o: { en: ["Edge", "Vertex", "Graph"] }, a: 0 },
      ] },
    { id: "graph-algorithms", stage: "a", pos: [620, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["graph-basics"],
      name: { en: "Graph Algorithms" },
      desc: { en: "BFS/DFS, shortest paths (Dijkstra), minimum spanning trees." },
      why: { en: "Navigation systems, network routing, and social platforms all depend on graph algorithms." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Diestel → Graph Theory · algorithmic sections" }, u: "https://diestel-graph-theory.com/" },
        { role: "practice", t: "practice", r: 4, l: { en: "LeetCode → Graph algorithm problems" }, u: "https://leetcode.com/" },
      ],
      notes: { en: ["BFS explores in layers, DFS goes deep", "Dijkstra finds shortest paths", "MST = min-weight connecting tree"] },
      quiz: [
        { q: { en: "Dijkstra's algorithm finds the..." }, o: { en: ["Shortest path", "Longest path", "A cycle"] }, a: 0 },
        { q: { en: "BFS explores..." }, o: { en: ["In layers", "Randomly", "Depth-first"] }, a: 0 },
      ] },
    { id: "extremal-combinatorics", stage: "o", pos: [450, 465], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["generating-functions", "graph-algorithms"],
      name: { en: "Extremal Combinatorics" },
      desc: { en: "Ramsey theory, Turán's theorem, the probabilistic method." },
      why: { en: "'Complete disorder is impossible', results of deep beauty." },
      res: [
        { role: "advanced", t: "practice", r: 4, l: { en: "arXiv math.CO → read one abstract" }, u: "https://arxiv.org/list/math.CO/new" },
      ],
      notes: { en: ["Ramsey: order is unavoidable in large structures", "The probabilistic method proves existence", "A favorite topic of Erdős"] },
      quiz: null },
  ] },
  { id: "math-probability-statistics", icon: "🎲", w: 900, h: 690,
    name: { en: "Probability & Statistics" },
    desc: { en: "From probability foundations to regression, the basis of data science" },
    nodes: [
    { id: "prob-foundations", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: [],
      name: { en: "Probability Foundations" },
      desc: { en: "Sample spaces, conditional probability, Bayes' theorem, independence." },
      why: { en: "Quantifying uncertainty, the language of science." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Harvard Stat 110 (Blitzstein) → Lectures 1–4" }, u: "https://projects.iq.harvard.edu/stat110/home" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Probability" }, u: "https://www.khanacademy.org/math/statistics-probability/probability-library" },
        { role: "textbook", t: "book", r: 4, l: { en: "Blitzstein & Hwang → Introduction to Probability · Ch.1–2 (free PDF)" }, u: "https://projects.iq.harvard.edu/stat110/home" },
      ],
      notes: { en: ["Bayes: P(A|B) = P(B|A)P(A)/P(B)", "Independent: P(A∩B) = P(A)P(B)", "Conditional probability incorporates new info"] },
      quiz: [
        { q: { en: "Bayes' theorem updates a..." }, o: { en: ["Probability with evidence", "A matrix", "An integral"] }, a: 0 },
        { q: { en: "For independent events, P(A∩B) = ?" }, o: { en: ["P(A)P(B)", "P(A)+P(B)", "0"] }, a: 0 },
      ] },
    { id: "random-variables", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["prob-foundations"],
      name: { en: "Random Variables" },
      desc: { en: "Discrete/continuous variables, expectation, variance." },
      why: { en: "The key tool to model random phenomena numerically." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Harvard Stat 110 → Random Variables section" }, u: "https://projects.iq.harvard.edu/stat110/home" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 18.600 → Probability (OCW)" }, u: "https://ocw.mit.edu/courses/18-600-probability-and-random-variables-fall-2019/" },
      ],
      notes: { en: ["Expectation E[X] = long-run average", "Variance = a measure of spread", "E[aX+b] = aE[X]+b (linear)"] },
      quiz: [
        { q: { en: "E[X] represents the..." }, o: { en: ["Mean value", "Variance", "Maximum"] }, a: 0 },
        { q: { en: "Variance measures..." }, o: { en: ["Spread", "The mean", "A matrix"] }, a: 0 },
      ] },
    { id: "distributions", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["random-variables"],
      name: { en: "Distributions" },
      desc: { en: "Binomial, Poisson, normal distributions, the central limit theorem." },
      why: { en: "The CLT explains why the normal distribution is everywhere." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Harvard Stat 110 → Distributions & CLT" }, u: "https://projects.iq.harvard.edu/stat110/home" },
        { role: "viz", t: "video", r: 5, l: { en: "3Blue1Brown → “Central limit theorem” video" }, u: "https://www.youtube.com/c/3blue1brown" },
      ],
      notes: { en: ["Normal = the 'bell curve'", "CLT: sums tend to normal", "Poisson counts rare events"] },
      quiz: [
        { q: { en: "The central limit theorem tends toward the ___ distribution" }, o: { en: ["Normal", "Poisson", "Uniform"] }, a: 0 },
        { q: { en: "The 'bell curve' is the ___ distribution" }, o: { en: ["Normal", "Binomial", "Exponential"] }, a: 0 },
      ] },
    { id: "statistical-inference", stage: "a", pos: [450, 465], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["distributions"],
      name: { en: "Statistical Inference" },
      desc: { en: "Estimation, confidence intervals, hypothesis testing, p-values." },
      why: { en: "The basis of drawing conclusions from data and making scientific decisions." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.650 → Statistics for Applications (OCW)" }, u: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/" },
        { role: "textbook", t: "book", r: 4, l: { en: "OpenStax → Introductory Statistics · Ch.8–9" }, u: "https://openstax.org/books/introductory-statistics/pages/8-introduction" },
      ],
      notes: { en: ["Confidence intervals express uncertainty", "p-value = chance of a result by randomness", "Estimation: sample → population"] },
      quiz: [
        { q: { en: "A p-value expresses the probability of a result..." }, o: { en: ["Arising by chance", "Always true", "Being zero"] }, a: 0 },
        { q: { en: "A confidence interval expresses..." }, o: { en: ["Estimate uncertainty", "Only the mean", "A matrix"] }, a: 0 },
      ] },
    { id: "regression-models", stage: "o", pos: [450, 600], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["statistical-inference"],
      name: { en: "Regression Models" },
      desc: { en: "Linear regression, multiple predictors, model evaluation." },
      why: { en: "The most fundamental model in machine learning and data science." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.650 → Regression section (OCW)" }, u: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/" },
        { role: "advanced", t: "book", r: 4, l: { en: "ISLR → Introduction to Statistical Learning · Ch.3 (free PDF)" }, u: "https://www.statlearning.com/" },
      ],
      notes: { en: ["Linear regression fits a line to data", "R² measures fit", "A direct bridge to ML"] },
      quiz: null },
  ] },
  { id: "math-differential-equations", icon: "〰️", w: 900, h: 560,
    name: { en: "Differential Equations" },
    desc: { en: "From first-order ODEs to PDEs, the mathematics of change" },
    nodes: [
    { id: "first-order-ode", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: [],
      name: { en: "First-Order ODEs" },
      desc: { en: "Separable, linear ODEs, direction fields, exponential growth." },
      why: { en: "Population growth, decay, cooling, nature speaks in ODEs." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.03SC → First-order ODEs (OCW)" }, u: "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Differential equations" }, u: "https://www.khanacademy.org/math/differential-equations" },
      ],
      notes: { en: ["Separable: separate variables then integrate", "Linear ODEs use an integrating factor", "dy/dt = ky → exponential"] },
      quiz: [
        { q: { en: "The solution of dy/dt = ky is..." }, o: { en: ["Exponential", "Linear", "Constant"] }, a: 0 },
        { q: { en: "A separable ODE is solved by..." }, o: { en: ["Separating variables & integrating", "Matrix inverse", "Dijkstra"] }, a: 0 },
      ] },
    { id: "second-order-ode", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["first-order-ode"],
      name: { en: "Second-Order ODEs" },
      desc: { en: "Constant coefficients, the harmonic oscillator, resonance." },
      why: { en: "Oscillations, circuits, mechanics, all second-order ODEs." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.03SC → Second-order ODEs (OCW)" }, u: "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/" },
      ],
      notes: { en: ["Solved via the characteristic equation", "Harmonic oscillator: mẍ + kx = 0", "Resonance when driving frequency matches"] },
      quiz: [
        { q: { en: "Constant-coefficient 2nd-order ODEs are solved via the..." }, o: { en: ["Characteristic equation", "Matrix inverse", "Fourier only"] }, a: 0 },
        { q: { en: "The harmonic oscillator is which order ODE?" }, o: { en: ["Second", "First", "Zeroth"] }, a: 0 },
      ] },
    { id: "systems-odes", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["second-order-ode"],
      name: { en: "Systems of ODEs" },
      desc: { en: "Linear systems, the eigenvalue method, the phase plane." },
      why: { en: "Models interacting systems like predator-prey and epidemics." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.03SC → Systems of ODEs (OCW)" }, u: "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/" },
      ],
      notes: { en: ["Systems → matrix form", "Eigenvalues determine stability", "The phase plane shows behavior"] },
      quiz: [
        { q: { en: "Stability of an ODE system is set by the..." }, o: { en: ["Eigenvalues", "Only determinant", "Color"] }, a: 0 },
        { q: { en: "The phase plane shows the system's..." }, o: { en: ["Behavior/trajectories", "Color", "Mass"] }, a: 0 },
      ] },
    { id: "pdes-intro", stage: "o", pos: [450, 465], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["systems-odes"],
      name: { en: "Partial Differential Equations" },
      desc: { en: "The heat, wave, and Laplace equations, Fourier methods." },
      why: { en: "Heat, sound, electromagnetism, all physical fields are PDEs." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.03SC → PDEs & Fourier section (OCW)" }, u: "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/" },
      ],
      notes: { en: ["Heat, wave, Laplace, three classic PDEs", "Fourier methods separate variables", "Every physical field is a PDE"] },
      quiz: null },
  ] },
  { id: "math-algebra", icon: "➗", w: 900, h: 420,
    name: { en: "Algebra" },
    desc: { en: "Expressions, equations, functions, the foundation of school algebra" },
    nodes: [
    { id: "alg-expressions", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 150, diff: 1, prereqs: [],
      name: { en: "Expressions & Operations" },
      desc: { en: "Variables, exponents, polynomials, factoring." },
      why: { en: "The written language of all higher math, the base of algebra." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax → Elementary Algebra 2e · Ch.1–6" }, u: "https://openstax.org/books/elementary-algebra-2e/pages/1-introduction" },
        { role: "secondary", t: "video", r: 5, l: { en: "Khan → Algebra basics" }, u: "https://www.khanacademy.org/math/algebra-basics" },
      ],
      quiz: [
        { q: { en: "x² · x³ = ?" }, o: { en: ["x⁵", "x⁶", "x"] }, a: 0 },
        { q: { en: "Factoring rewrites a polynomial as a..." }, o: { en: ["Product", "Only a sum", "A matrix"] }, a: 0 },
      ] },
    { id: "alg-equations", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: ["alg-expressions"],
      name: { en: "Equations & Inequalities" },
      desc: { en: "Linear and quadratic equations, systems, inequalities." },
      why: { en: "'Solving for the unknown', the central goal of algebra." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax → Elementary Algebra 2e · Ch.2, 9–10" }, u: "https://openstax.org/books/elementary-algebra-2e/pages/2-introduction" },
        { role: "secondary", t: "video", r: 5, l: { en: "Khan → Solving equations" }, u: "https://www.khanacademy.org/math/algebra" },
      ],
      quiz: [
        { q: { en: "The quadratic formula finds the..." }, o: { en: ["Roots", "Slope", "Area"] }, a: 0 },
        { q: { en: "If 2x = 10, then x = ?" }, o: { en: ["5", "10", "20"] }, a: 0 },
      ] },
    { id: "alg-functions", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["alg-equations"],
      name: { en: "Functions & Graphs" },
      desc: { en: "The function concept, linear and quadratic functions, graphing." },
      why: { en: "Functions are the single most important idea in math and science." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax → Intermediate Algebra 2e · Ch.3, 8" }, u: "https://openstax.org/books/intermediate-algebra-2e/pages/3-introduction" },
        { role: "secondary", t: "video", r: 5, l: { en: "Khan → Functions" }, u: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions" },
      ],
      quiz: [
        { q: { en: "In y = mx + b, m is the..." }, o: { en: ["Slope", "Intercept", "Root"] }, a: 0 },
        { q: { en: "A function gives how many outputs per input?" }, o: { en: ["Exactly one", "Two", "Infinite"] }, a: 0 },
      ] },
  ] },
  { id: "math-geometry", icon: "📐", w: 900, h: 420,
    name: { en: "Geometry" },
    desc: { en: "Shapes, proof, symmetry, from Euclid to coordinates" },
    nodes: [
    { id: "geo-basics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 150, diff: 1, prereqs: [],
      name: { en: "Foundations of Geometry" },
      desc: { en: "Points, lines, angles, parallels, axioms." },
      why: { en: "The first school of proof, Euclid's 2000-year tradition." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Geometry: foundations" }, u: "https://www.khanacademy.org/math/geometry" },
        { role: "textbook", t: "book", r: 4, l: { en: "Euclid → Elements · Book I (free, online)" }, u: "https://mathcs.clarku.edu/~djoyce/elements/toc.html" },
      ],
      quiz: [
        { q: { en: "Sum of a triangle's angles?" }, o: { en: ["180°", "90°", "360°"] }, a: 0 },
        { q: { en: "Parallel lines..." }, o: { en: ["Never meet", "Always meet", "Are perpendicular"] }, a: 0 },
      ] },
    { id: "geo-triangles", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["geo-basics"],
      name: { en: "Triangles & Congruence" },
      desc: { en: "Congruence, similarity, the Pythagorean theorem." },
      why: { en: "The triangle is geometry's most fundamental building block." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Congruence & similarity" }, u: "https://www.khanacademy.org/math/geometry" },
      ],
      quiz: [
        { q: { en: "Pythagorean theorem: a² + b² = ?" }, o: { en: ["c²", "c", "2c"] }, a: 0 },
        { q: { en: "Similar triangles have sides that are..." }, o: { en: ["Proportional", "Equal", "Perpendicular"] }, a: 0 },
      ] },
    { id: "geo-circles", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["geo-triangles"],
      name: { en: "Circles & Coordinate Geometry" },
      desc: { en: "Circle theorems, area, volume, coordinate systems." },
      why: { en: "Links algebra and geometry, opening analytic geometry." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Circles & analytic geometry" }, u: "https://www.khanacademy.org/math/geometry" },
      ],
      quiz: [
        { q: { en: "Area of a circle?" }, o: { en: ["πr²", "2πr", "πd"] }, a: 0 },
        { q: { en: "Coordinate geometry connects geometry with..." }, o: { en: ["Algebra", "Logic", "Statistics"] }, a: 0 },
      ] },
  ] },
  { id: "math-trigonometry", icon: "📊", w: 900, h: 420,
    name: { en: "Trigonometry" },
    desc: { en: "Ratios, identities, graphs, the mathematics of angles" },
    nodes: [
    { id: "trig-ratios", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 150, diff: 1, prereqs: [],
      name: { en: "Trigonometric Ratios" },
      desc: { en: "Sine, cosine, tangent, right triangles, the unit circle." },
      why: { en: "Waves, rotation, navigation, the uses of trigonometry." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax → Algebra and Trigonometry 2e · Ch.7" }, u: "https://openstax.org/books/algebra-and-trigonometry-2e/pages/7-introduction" },
        { role: "secondary", t: "video", r: 5, l: { en: "Khan → Trigonometry" }, u: "https://www.khanacademy.org/math/trigonometry" },
      ],
      quiz: [
        { q: { en: "sin = ?" }, o: { en: ["opposite/hypotenuse", "adjacent/hypotenuse", "opposite/adjacent"] }, a: 0 },
        { q: { en: "Radius of the unit circle?" }, o: { en: ["1", "π", "2"] }, a: 0 },
      ] },
    { id: "trig-identities", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["trig-ratios"],
      name: { en: "Trigonometric Identities" },
      desc: { en: "Pythagorean identities, sum formulas, trig equations." },
      why: { en: "The key tool to simplify trigonometric expressions." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax → Algebra and Trigonometry 2e · Ch.9" }, u: "https://openstax.org/books/algebra-and-trigonometry-2e/pages/9-introduction" },
      ],
      quiz: [
        { q: { en: "sin²θ + cos²θ = ?" }, o: { en: ["1", "0", "2"] }, a: 0 },
        { q: { en: "Identities are used to..." }, o: { en: ["Simplify expressions", "Find area", "Only graph"] }, a: 0 },
      ] },
    { id: "trig-graphs", stage: "a", pos: [450, 330], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["trig-identities"],
      name: { en: "Trigonometric Graphs" },
      desc: { en: "Sine waves, amplitude, frequency, phase, inverse functions." },
      why: { en: "Waves, sound, light, AC current, all sinusoids." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Khan → Graphs of trig functions" }, u: "https://www.khanacademy.org/math/trigonometry" },
      ],
      quiz: [
        { q: { en: "The height of a sine wave is its..." }, o: { en: ["Amplitude", "Frequency", "Phase"] }, a: 0 },
        { q: { en: "Frequency determines how ___ the wave repeats" }, o: { en: ["Fast", "Tall", "Only long"] }, a: 0 },
      ] },
  ] },
  { id: "math-precalculus", icon: "📈", w: 900, h: 420,
    name: { en: "Precalculus" },
    desc: { en: "Functions, exponentials, sequences, the bridge to calculus" },
    nodes: [
    { id: "precalc-functions", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Advanced Functions" },
      desc: { en: "Polynomial, rational functions, transformations, composition." },
      why: { en: "The full grasp of functions needed to enter calculus." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax → Precalculus 2e · Ch.1–5" }, u: "https://openstax.org/books/precalculus-2e/pages/1-introduction" },
        { role: "secondary", t: "video", r: 5, l: { en: "Khan → Precalculus" }, u: "https://www.khanacademy.org/math/precalculus" },
      ],
      quiz: [
        { q: { en: "(f∘g)(x) means..." }, o: { en: ["f(g(x))", "f(x)·g(x)", "f(x)+g(x)"] }, a: 0 },
        { q: { en: "A rational function is a ratio of..." }, o: { en: ["Polynomials", "Matrices", "Vectors"] }, a: 0 },
      ] },
    { id: "precalc-exponential", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["precalc-functions"],
      name: { en: "Exponentials & Logarithms" },
      desc: { en: "Exponential growth, logarithms, the number e, applications." },
      why: { en: "Population, interest, decay, pH, all exponential/logarithmic." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax → Precalculus 2e · Ch.6" }, u: "https://openstax.org/books/precalculus-2e/pages/6-introduction" },
      ],
      quiz: [
        { q: { en: "log(xy) = ?" }, o: { en: ["log x + log y", "log x · log y", "log x − log y"] }, a: 0 },
        { q: { en: "The number e is approximately?" }, o: { en: ["2.718", "3.14", "1.618"] }, a: 0 },
      ] },
    { id: "precalc-sequences", stage: "a", pos: [450, 330], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["precalc-exponential"],
      name: { en: "Sequences & Series" },
      desc: { en: "Arithmetic/geometric sequences, sums, an intro to limits." },
      why: { en: "Opens the idea of limits, the step right before calculus." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax → Precalculus 2e · Ch.11" }, u: "https://openstax.org/books/precalculus-2e/pages/11-introduction" },
      ],
      quiz: [
        { q: { en: "In a geometric sequence, each term is multiplied by a..." }, o: { en: ["Constant ratio", "Constant difference", "Random value"] }, a: 0 },
        { q: { en: "An infinite geometric series converges when |r|..." }, o: { en: ["< 1", "> 1", "= 1"] }, a: 0 },
      ] },
  ] },
  { id: "math-calculus", icon: "∫", w: 900, h: 420,
    name: { en: "Calculus" },
    desc: { en: "Limits, derivatives, integrals, the mathematics of change" },
    nodes: [
    { id: "calc-limits", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Limits & Continuity" },
      desc: { en: "The limit concept, one-sided limits, continuity." },
      why: { en: "All of calculus is built on the limit." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Essence of Calculus (Ch.1–2)" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax → Calculus Volume 1 · Ch.2" }, u: "https://openstax.org/books/calculus-volume-1/pages/2-introduction" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 18.01SC → Limits (OCW)" }, u: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/" },
      ],
      quiz: [
        { q: { en: "A limit describes a function's value as x..." }, o: { en: ["Approaches a point", "Becomes zero", "Only goes to infinity"] }, a: 0 },
        { q: { en: "For a continuous function, the limit equals the..." }, o: { en: ["Function value", "Zero", "Derivative"] }, a: 0 },
      ] },
    { id: "calc-derivatives", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 2, prereqs: ["calc-limits"],
      name: { en: "Derivatives" },
      desc: { en: "The definition, rules, applications, optimization." },
      why: { en: "Speed, slope, change, the derivative measures it all." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Essence of Calculus (Ch.2–4)" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax → Calculus Volume 1 · Ch.3–4" }, u: "https://openstax.org/books/calculus-volume-1/pages/3-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Derivatives" }, u: "https://www.khanacademy.org/math/calculus-1" },
      ],
      quiz: [
        { q: { en: "The derivative measures the..." }, o: { en: ["Rate of change", "Area", "Volume"] }, a: 0 },
        { q: { en: "d/dx(x²) = ?" }, o: { en: ["2x", "x", "x³/3"] }, a: 0 },
      ] },
    { id: "calc-integrals", stage: "a", pos: [450, 330], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["calc-derivatives"],
      name: { en: "Integrals" },
      desc: { en: "Definite/indefinite integrals, the fundamental theorem, area." },
      why: { en: "Area, volume, total accumulation, the integral sums it up." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "3Blue1Brown → Essence of Calculus (Ch.8)" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax → Calculus Volume 1 · Ch.5" }, u: "https://openstax.org/books/calculus-volume-1/pages/5-introduction" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 18.01SC → Integration (OCW)" }, u: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/" },
      ],
      quiz: [
        { q: { en: "The fundamental theorem links integrals and..." }, o: { en: ["Derivatives", "Matrices", "Logic"] }, a: 0 },
        { q: { en: "A definite integral computes the..." }, o: { en: ["Area under a curve", "Slope", "Only a limit"] }, a: 0 },
      ] },
  ] },
  { id: "math-oly-inequalities", icon: "⚖️", w: 900, h: 420,
    name: { en: "Olympiad Inequalities" },
    desc: { en: "From AM-GM to SOS, the art of inequalities" },
    nodes: [
    { id: "ineq-amgm", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: [],
      name: { en: "AM–GM & Basic Inequalities" },
      desc: { en: "The AM–GM mean inequality, the triangle inequality." },
      why: { en: "The most basic weapon in olympiad inequalities." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "AoPS → Introduction to Inequalities" }, u: "https://artofproblemsolving.com/" },
        { role: "textbook", t: "book", r: 4, l: { en: "Evan Chen → olympiad handouts" }, u: "https://web.evanchen.cc/" },
      ],
      quiz: [
        { q: { en: "AM–GM: (a+b)/2 compared to √(ab)?" }, o: { en: ["≥", "≤", "="] }, a: 0 },
        { q: { en: "Equality in AM–GM holds when..." }, o: { en: ["a = b", "a = 0", "never"] }, a: 0 },
      ] },
    { id: "ineq-cauchy", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["ineq-amgm"],
      name: { en: "Cauchy–Schwarz & Rearrangement" },
      desc: { en: "Cauchy–Schwarz, rearrangement inequality, Chebyshev." },
      why: { en: "The key tools for intermediate and advanced olympiads." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Evan Chen → Cauchy-Schwarz handout" }, u: "https://web.evanchen.cc/" },
        { role: "practice", t: "practice", r: 4, l: { en: "AoPS → Intermediate inequalities problems" }, u: "https://artofproblemsolving.com/" },
      ],
      quiz: [
        { q: { en: "Cauchy–Schwarz bounds a sum of..." }, o: { en: ["Products", "Matrices", "Angles"] }, a: 0 },
        { q: { en: "The rearrangement inequality concerns..." }, o: { en: ["Ordering and sums", "Circles", "Matrices"] }, a: 0 },
      ] },
    { id: "ineq-advanced", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["ineq-cauchy"],
      name: { en: "Advanced Inequalities" },
      desc: { en: "The SOS method, Schur, Jensen, convexity." },
      why: { en: "Advanced techniques to crack IMO-level inequalities." },
      res: [
        { role: "advanced", t: "practice", r: 4, l: { en: "IMO Shortlist → inequality problems" }, u: "https://www.imo-official.org/problems.aspx" },
      ],
      quiz: null },
  ] },
  { id: "math-oly-fe", icon: "🔧", w: 900, h: 420,
    name: { en: "Functional Equations" },
    desc: { en: "From substitution to Cauchy's FE, olympiad functional equations" },
    nodes: [
    { id: "fe-basics", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: [],
      name: { en: "Functional Equation Basics" },
      desc: { en: "Substitution, special values, even/odd properties." },
      why: { en: "The method that cracks an entire olympiad problem class." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Evan Chen → Introduction to Functional Equations" }, u: "https://web.evanchen.cc/" },
        { role: "practice", t: "practice", r: 4, l: { en: "AoPS → Functional equations topic" }, u: "https://artofproblemsolving.com/" },
      ],
      quiz: [
        { q: { en: "The most common FE technique?" }, o: { en: ["Substitution", "Matrix inverse", "Integration"] }, a: 0 },
        { q: { en: "In FEs, you often first try plugging in..." }, o: { en: ["Special values (0, 1)", "Matrices", "Complex numbers"] }, a: 0 },
      ] },
    { id: "fe-cauchy", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["fe-basics"],
      name: { en: "Cauchy's Functional Equation" },
      desc: { en: "f(x+y) = f(x)+f(y), solutions, continuity conditions." },
      why: { en: "The most famous functional equation, a must-know." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Evan Chen → FE handout · Cauchy section" }, u: "https://web.evanchen.cc/" },
      ],
      quiz: [
        { q: { en: "Cauchy's FE: f(x+y) = ?" }, o: { en: ["f(x) + f(y)", "f(x)·f(y)", "f(xy)"] }, a: 0 },
        { q: { en: "If continuous, Cauchy's FE solution is..." }, o: { en: ["f(x) = cx", "f(x) = x²", "f(x) = eˣ"] }, a: 0 },
      ] },
    { id: "fe-techniques", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["fe-cauchy"],
      name: { en: "Advanced FE Techniques" },
      desc: { en: "Using injectivity/surjectivity, fixed points, IMO problems." },
      why: { en: "Fully cracking IMO-level functional equations." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "IMO Shortlist → algebra (FE) problems" }, u: "https://www.imo-official.org/problems.aspx" },
        { role: "advanced", t: "book", r: 4, l: { en: "Evan Chen → Napkin · FE chapter" }, u: "https://web.evanchen.cc/napkin.html" },
      ],
      quiz: null },
  ] },
  ],
  planned: [],
  paths: [
    { id: "core", icon: "📗", tag: { en: "Core" },
      name: { en: "Core Learning" },
      desc: { en: "Build a strong mathematical foundation for university STEM, engineering, physics, computer science, and research." },
      branches: ["math-algebra", "math-geometry", "math-trigonometry", "math-precalculus", "math-calculus", "math-linalg", "math-probability-statistics"] },
    { id: "university", icon: "🎓", tag: { en: "University" },
      name: { en: "University & Research" },
      desc: { en: "Advanced university mathematics for students interested in higher mathematics, theoretical physics, research, and graduate study." },
      branches: ["math-foundations", "math-abstract-algebra", "math-real-analysis", "math-complex-analysis", "math-topology", "math-diffgeo", "math-number-theory", "math-combinatorics-graph", "math-differential-equations"] },
    { id: "olympiad", icon: "🏅", tag: { en: "Olympiad" },
      name: { en: "Olympiad Mathematics" },
      desc: { en: "Problem-solving focused curriculum for AMC, AIME, IMO, national olympiads, and advanced mathematical competitions." },
      branches: ["math-olympiad", "math-oly-inequalities", "math-oly-fe"] },
  ],
},
{
  id: "cs", icon: "💻", hue: "#ea580c",
  name: { en: "Computer Science" },
  desc: { en: "Programming, data structures, algorithms, and machine learning." },
  branches: [
  { id: "cs-ai", icon: "🤖", w: 900, h: 850,
    name: { en: "AI & Machine Learning" },
    desc: { en: "From Python to deep learning and Kaggle" },
    nodes: [
    { id: "python", stage: "f", pos: [450, 60], weeks: 4, h: 20, xp: 250, diff: 1, prereqs: [],
      name: { en: "Python" },
      desc: { en: "The world's most popular language, the standard for research & AI." },
      why: { en: "Used across every scientific discipline for simulation and data analysis." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Harvard CS50P → Lecture 0: Functions, Variables" }, u: "https://cs50.harvard.edu/python/" },
        { t: "practice", r: 5, l: { en: "CS50P → Problem Set 0" }, u: "https://cs50.harvard.edu/python/2022/psets/0/" },
        { t: "video", r: 4, l: { en: "freeCodeCamp → Python for Beginners (first 2 hours)" }, u: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
        { t: "sim", r: 4, l: { en: "Python Tutor → visualize code step by step" }, u: "https://pythontutor.com/" },
      ],
      notes: { en: ["Variables, loops, functions, that's 80%", "Errors are teachers; learn to read them", "30 min daily beats 4 hours weekly"] },
      quiz: [
        { q: { en: "What does print(2 ** 3) output?" }, o: { en: ["6", "8", "9"] }, a: 1 },
        { q: { en: "Index of a list's first element?" }, o: { en: ["0", "1", "-1"] }, a: 0 },
      ] },
    { id: "git", stage: "f", pos: [200, 205], weeks: 1, h: 5, xp: 100, diff: 1, prereqs: ["python"],
      name: { en: "Git & GitHub" },
      desc: { en: "Version control and collaboration." },
      why: { en: "Every lab uses Git, a researcher's CV is their GitHub." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "GitHub Skills → “Introduction to GitHub”" }, u: "https://skills.github.com/" },
        { t: "video", r: 4, l: { en: "freeCodeCamp → Git & GitHub (first hour)" }, u: "https://www.youtube.com/watch?v=RGOj5yH7evk" },
      ],
      notes: { en: ["A commit is a snapshot", "A branch is a parallel universe", "Push sends it to the cloud"] },
      quiz: [
        { q: { en: "Command to save changes?" }, o: { en: ["git commit", "git fly", "git save"] }, a: 0 },
        { q: { en: "GitHub is for..." }, o: { en: ["Games", "Sharing code", "Photo editing"] }, a: 1 },
      ] },
    { id: "data-structures", stage: "f", pos: [450, 205], weeks: 5, h: 25, xp: 300, diff: 2, prereqs: ["python"],
      name: { en: "Data Structures & Algorithms" },
      desc: { en: "Lists, trees, graphs; search and sorting." },
      why: { en: "The foundation of every algorithm you will ever write or use." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 6.006 → Lecture 1: Algorithmic Thinking" }, u: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/" },
        { t: "sim", r: 5, l: { en: "VisuAlgo → sorting & tree animations" }, u: "https://visualgo.net/en" },
        { t: "practice", r: 5, l: { en: "LeetCode → Top Interview 150 (start)" }, u: "https://leetcode.com/studyplan/top-interview-150/" },
      ],
      notes: { en: ["Big-O = growth rate", "Hash table = a magic dictionary", "Recursion: a function calling itself"] },
      quiz: [
        { q: { en: "Binary search runs in..." }, o: { en: ["O(n)", "O(log n)", "O(n²)"] }, a: 1 },
        { q: { en: "A stack follows..." }, o: { en: ["FIFO", "LIFO", "Random"] }, a: 1 },
      ] },
    { id: "ml-math", stage: "f", pos: [700, 205], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["python"],
      name: { en: "Math for ML" },
      desc: { en: "Vectors, matrices, probability, the language of AI." },
      why: { en: "A neural net = matrix multiplication + derivatives." },
      res: [
        { t: "video", s: 1, r: 5, l: { en: "3B1B → Neural Networks · Episode 1" }, u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
        { t: "course", r: 4, l: { en: "Khan → Linear Algebra · Vectors unit" }, u: "https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces" },
        { t: "book", r: 4, l: { en: "Mathematics for ML → Ch.2 Linear Algebra" }, u: "https://mml-book.github.io/" },
      ],
      notes: { en: ["A vector = a number with direction", "Dot product = similarity", "Gradient = direction of steepest ascent"] },
      quiz: [
        { q: { en: "[1,2]·[3,4] = ?" }, o: { en: ["11", "10", "7"] }, a: 0 },
        { q: { en: "A gradient points toward..." }, o: { en: ["Steepest ascent", "North", "Zero"] }, a: 0 },
      ] },
    { id: "ml", stage: "a", pos: [575, 360], weeks: 6, h: 30, xp: 350, diff: 2, prereqs: ["data-structures", "ml-math"],
      name: { en: "Machine Learning" },
      desc: { en: "Regression, classification, the art of training models." },
      why: { en: "Programs that learn from data, the 21st century superpower." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Andrew Ng → ML Specialization · Course 1 Week 1" }, u: "https://www.coursera.org/specializations/machine-learning-introduction" },
        { t: "video", r: 5, l: { en: "StatQuest → “Machine Learning” playlist · video 1" }, u: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF" },
        { t: "practice", r: 5, l: { en: "Kaggle Learn → Intro to Machine Learning" }, u: "https://www.kaggle.com/learn/intro-to-machine-learning" },
      ],
      notes: { en: ["Never forget the train/test split", "Overfitting = memorized, not understood", "Falling loss means the model is learning"] },
      quiz: [
        { q: { en: "Overfitting means..." }, o: { en: ["Bad on new data", "Too fast", "Too simple"] }, a: 0 },
        { q: { en: "Predicting house prices is..." }, o: { en: ["Classification", "Regression", "Clustering"] }, a: 1 },
      ] },
    { id: "dl", stage: "a", pos: [575, 505], weeks: 6, h: 30, xp: 400, diff: 3, prereqs: ["ml"],
      name: { en: "Deep Learning" },
      desc: { en: "Neural networks, CNNs, transformers." },
      why: { en: "ChatGPT, vision, self-driving cars, it all lives here." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "fast.ai → Practical Deep Learning · Lesson 1" }, u: "https://course.fast.ai/" },
        { t: "video", r: 5, l: { en: "3B1B → But what is a neural network? (Ch.1)" }, u: "https://www.youtube.com/watch?v=aircAruvnKk" },
        { t: "sim", r: 4, l: { en: "TensorFlow Playground → experiment with a neural net" }, u: "https://playground.tensorflow.org/" },
      ],
      notes: { en: ["Each layer learns deeper features", "Backprop distributes the error backwards", "No GPU? Google Colab is free"] },
      quiz: [
        { q: { en: "Neural nets are trained by..." }, o: { en: ["Backpropagation", "Memorization", "Sorting"] }, a: 0 },
        { q: { en: "The go-to network for images?" }, o: { en: ["CNN", "RNN", "SQL"] }, a: 0 },
      ] },
    { id: "ai-projects", stage: "o", pos: [575, 650], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["dl"],
      name: { en: "Your Own AI Project" },
      desc: { en: "Build one end-to-end project on a Kaggle dataset." },
      why: { en: "One finished project speaks louder than 10 certificates." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "Kaggle → Titanic: the classic starter competition" }, u: "https://www.kaggle.com/competitions/titanic" },
        { t: "course", r: 4, l: { en: "Kaggle Learn → Intermediate Machine Learning" }, u: "https://www.kaggle.com/learn/intermediate-machine-learning" },
      ],
      notes: { en: ["Start small: one question, one dataset", "Put it on GitHub with a README", "Debrief your results with Questa AI"] },
      quiz: null },
    { id: "ai-competitions", stage: "o", pos: [575, 780], weeks: 2, h: 10, xp: 250, diff: 3, prereqs: ["ai-projects"],
      name: { en: "Enter Competitions" },
      desc: { en: "Kaggle, NASA Space Apps, assemble your team." },
      why: { en: "Competitions = accelerated growth + a network." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "Kaggle → Getting Started competitions" }, u: "https://www.kaggle.com/competitions?hostSegmentIdFilter=5" },
      ],
      notes: { en: ["See your unlocked contests on the Competitions page", "NASA Space Apps needs AI teams!"] },
      quiz: null },
  ] },
  { id: "cs-cp", icon: "🏆", w: 900, h: 560,
    name: { en: "Competitive Programming" },
    desc: { en: "C++ and algorithms toward the IOI" },
    nodes: [
    { id: "cpp-basics", stage: "f", pos: [450, 60], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: [],
      name: { en: "C++ Fundamentals" },
      desc: { en: "The fast, standard language of contests." },
      why: { en: "The standard language for competitive programming and systems engineering." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "USACO Guide → Bronze: Getting Started" }, u: "https://usaco.guide/bronze/" },
        { t: "course", r: 4, l: { en: "learncpp.com → Ch.1 (C++ basics)" }, u: "https://www.learncpp.com/" },
        { t: "practice", r: 5, l: { en: "Codeforces → Problemset, 800-rated problems" }, u: "https://codeforces.com/problemset?tags=800-900" },
      ],
      notes: { en: ["cin/cout, input & output", "vector, sort, the STL is your friend", "Speed matters: aim for O(n log n)"] },
      quiz: [
        { q: { en: "C++ array indexing starts at..." }, o: { en: ["0", "1", "-1"] }, a: 0 },
        { q: { en: "The STL sort function?" }, o: { en: ["sort()", "order()", "arrange()"] }, a: 0 },
      ] },
    { id: "cp-algorithms", stage: "a", pos: [450, 205], weeks: 6, h: 30, xp: 350, diff: 3, prereqs: ["cpp-basics", "data-structures"],
      name: { en: "Contest Algorithms" },
      desc: { en: "Graphs, dynamic programming, greedy." },
      why: { en: "Mastering these patterns is what separates strong problem solvers." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → Graph: BFS/DFS section" }, u: "https://cp-algorithms.com/" },
        { t: "course", r: 5, l: { en: "USACO Guide → Silver & Gold modules" }, u: "https://usaco.guide/silver/" },
        { t: "practice", r: 5, l: { en: "Codeforces → Div 2 A–C problems" }, u: "https://codeforces.com/problemset" },
      ],
      notes: { en: ["DP = remember overlapping subproblems", "BFS = layer by layer, DFS = go deep", "Greedy doesn't always work, prove it"] },
      quiz: [
        { q: { en: "Shortest path on an unweighted graph?" }, o: { en: ["BFS", "DFS", "Sort"] }, a: 0 },
        { q: { en: "The core idea of DP?" }, o: { en: ["Remember subproblems", "Randomness", "Sorting"] }, a: 0 },
      ] },
    { id: "cp-contest", stage: "o", pos: [450, 350], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["cp-algorithms"],
      name: { en: "Compete" },
      desc: { en: "USACO, Codeforces rounds, the national olympiad." },
      why: { en: "Contest experience teaches more than theory." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "USACO → enter the monthly contest" }, u: "http://www.usaco.org/" },
        { t: "practice", r: 5, l: { en: "Codeforces → weekly Rounds" }, u: "https://codeforces.com/contests" },
      ],
      notes: { en: ["See IOI on the Competitions page", "Do 1 virtual round per week"] },
      quiz: null },
  ] },
  { id: "cs-programming", icon: "cpu", w: 900, h: 420,
    name: { en: "Programming Fundamentals" },
    desc: { en: "Variables, control flow, functions, where code begins" },
    nodes: [
    { id: "prog-basics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 150, diff: 1, prereqs: [],
      name: { en: "Programming Basics" },
      desc: { en: "Variables, data types, operators, input/output." },
      why: { en: "The first alphabet of telling a computer what to do." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Harvard CS50 → Intro to CS" }, u: "https://cs50.harvard.edu/x/" },
        { role: "secondary", t: "course", r: 5, l: { en: "MIT 6.0001 → Intro to CS in Python (OCW)" }, u: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/" },
      ],
      quiz: [
        { q: { en: "A variable stores a..." }, o: { en: ["Value", "Shape", "Color"] }, a: 0 },
        { q: { en: "int is what kind of data type?" }, o: { en: ["Integer", "Text", "Boolean"] }, a: 0 },
      ] },
    { id: "prog-control-flow", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: ["prog-basics"],
      name: { en: "Control Flow" },
      desc: { en: "Conditionals (if/else), loops (for/while), logic." },
      why: { en: "Decisions and repetition are what make a program smart." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Harvard CS50 → Loops & conditionals" }, u: "https://cs50.harvard.edu/x/" },
        { role: "practice", t: "practice", r: 4, l: { en: "freeCodeCamp → hands-on exercises" }, u: "https://www.freecodecamp.org/" },
      ],
      quiz: [
        { q: { en: "An if statement checks a..." }, o: { en: ["Condition", "Speed", "Mass"] }, a: 0 },
        { q: { en: "A for loop is used to..." }, o: { en: ["Repeat", "Store", "Delete"] }, a: 0 },
      ] },
    { id: "prog-functions", stage: "a", pos: [450, 330], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["prog-control-flow"],
      name: { en: "Functions & Decomposition" },
      desc: { en: "Functions, parameters, return values, scope, recursion." },
      why: { en: "The art of breaking big problems into small, reusable pieces." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.0001 → Functions & recursion (OCW)" }, u: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/" },
      ],
      quiz: null },
  ] },
  { id: "cs-python", icon: "cpu", w: 900, h: 420,
    name: { en: "Python Programming" },
    desc: { en: "A modern, versatile programming language" },
    nodes: [
    { id: "py-fundamentals", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: [],
      name: { en: "Python Fundamentals" },
      desc: { en: "Syntax, lists, dictionaries, strings, files." },
      why: { en: "The default language for data science, machine learning, and scientific computing." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Automate the Boring Stuff with Python" }, u: "https://automatetheboringstuff.com/" },
        { role: "secondary", t: "course", r: 5, l: { en: "Python.org → Official Tutorial" }, u: "https://docs.python.org/3/tutorial/" },
      ],
      quiz: [
        { q: { en: "A Python list uses which brackets?" }, o: { en: ["[ ]", "{ }", "< >"] }, a: 0 },
        { q: { en: "A dictionary stores..." }, o: { en: ["Key-value pairs", "Only numbers", "Only text"] }, a: 0 },
      ] },
    { id: "py-collections", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["py-fundamentals"],
      name: { en: "Collections & Comprehensions" },
      desc: { en: "List/dict comprehensions, sets, tuples, iterators." },
      why: { en: "The tools that show Python's elegance and power." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Python.org → Data Structures tutorial" }, u: "https://docs.python.org/3/tutorial/datastructures.html" },
      ],
      quiz: [
        { q: { en: "A set contains only ___ elements" }, o: { en: ["Unique", "Sorted", "Numeric"] }, a: 0 },
        { q: { en: "Can a tuple be changed?" }, o: { en: ["No (immutable)", "Yes", "Sometimes"] }, a: 0 },
      ] },
    { id: "py-libraries", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["py-collections"],
      name: { en: "Libraries & Ecosystem" },
      desc: { en: "pip, NumPy, Pandas, Matplotlib, virtual environments." },
      why: { en: "Python's real power is its vast library ecosystem." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "NumPy & Pandas → official guides" }, u: "https://numpy.org/learn/" },
      ],
      quiz: null },
  ] },
  { id: "cs-oop", icon: "boxes", w: 900, h: 420,
    name: { en: "Object-Oriented Programming" },
    desc: { en: "Classes, objects, inheritance, design patterns" },
    nodes: [
    { id: "oop-classes", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Classes & Objects" },
      desc: { en: "Classes, objects, attributes, methods, encapsulation." },
      why: { en: "A powerful way to model the real world in code." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Refactoring Guru → OOP principles" }, u: "https://refactoring.guru/design-patterns/what-is-pattern" },
        { role: "secondary", t: "course", r: 4, l: { en: "Python.org → Classes tutorial" }, u: "https://docs.python.org/3/tutorial/classes.html" },
      ],
      quiz: [
        { q: { en: "An object is an instance of a..." }, o: { en: ["Class", "Function", "Variable"] }, a: 0 },
        { q: { en: "Encapsulation hides internal..." }, o: { en: ["Data/logic", "Color", "Speed"] }, a: 0 },
      ] },
    { id: "oop-inheritance", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["oop-classes"],
      name: { en: "Inheritance & Polymorphism" },
      desc: { en: "Inheritance, polymorphism, abstraction, interfaces." },
      why: { en: "Reusing code and organizing flexible systems." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Refactoring Guru → Inheritance & polymorphism" }, u: "https://refactoring.guru/" },
      ],
      quiz: [
        { q: { en: "Inheritance lets a class ___ another" }, o: { en: ["Extend", "Delete", "Only copy"] }, a: 0 },
        { q: { en: "Polymorphism allows one interface for many..." }, o: { en: ["Types", "Colors", "Files"] }, a: 0 },
      ] },
    { id: "oop-patterns", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["oop-inheritance"],
      name: { en: "Design Patterns" },
      desc: { en: "Singleton, Factory, Observer, SOLID principles." },
      why: { en: "Proven solutions to common problems by experienced engineers." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Refactoring Guru → Design Patterns catalog" }, u: "https://refactoring.guru/design-patterns" },
      ],
      quiz: null },
  ] },
  { id: "cs-data-structures", icon: "network", w: 900, h: 420,
    name: { en: "Data Structures" },
    desc: { en: "Arrays, lists, trees, graphs, hashing" },
    nodes: [
    { id: "ds-arrays-lists", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Arrays & Linked Lists" },
      desc: { en: "Arrays, dynamic arrays, linked lists, stacks, queues." },
      why: { en: "The most fundamental ways to organize data." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "VisuAlgo → Linked List, Stack, Queue" }, u: "https://visualgo.net/en/list" },
      ],
      quiz: [
        { q: { en: "A stack works on which principle?" }, o: { en: ["LIFO", "FIFO", "Random"] }, a: 0 },
        { q: { en: "Accessing an array element takes..." }, o: { en: ["O(1)", "O(n)", "O(n²)"] }, a: 0 },
      ] },
    { id: "ds-trees-graphs", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["ds-arrays-lists"],
      name: { en: "Trees & Graphs" },
      desc: { en: "Binary trees, BSTs, balanced trees, graph representations." },
      why: { en: "Structures that model hierarchies, networks, and relationships." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "VisuAlgo → Binary Search Tree, Graph" }, u: "https://visualgo.net/en/bst" },
        { role: "advanced", t: "course", r: 4, l: { en: "MIT 6.006 → Trees & Graphs (OCW)" }, u: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/" },
      ],
      quiz: [
        { q: { en: "In a BST, the left child is ___ the parent" }, o: { en: ["Less than", "Greater than", "Equal"] }, a: 0 },
        { q: { en: "A graph consists of nodes and..." }, o: { en: ["Edges", "Leaves", "Columns"] }, a: 0 },
      ] },
    { id: "ds-hash-heaps", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["ds-trees-graphs"],
      name: { en: "Hash Tables & Heaps" },
      desc: { en: "Hash tables, collisions, heaps, priority queues." },
      why: { en: "Key structures for fast lookup and priority processing." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "VisuAlgo → Hash Table, Heap" }, u: "https://visualgo.net/en/hashtable" },
      ],
      quiz: null },
  ] },
  { id: "cs-algorithms", icon: "git-branch", w: 900, h: 420,
    name: { en: "Algorithms Fundamentals" },
    desc: { en: "Sorting, searching, complexity, divide & conquer" },
    nodes: [
    { id: "algo-sorting", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Sorting & Searching" },
      desc: { en: "Bubble, merge, quicksort, binary search." },
      why: { en: "The classic foundational algorithms of computer science." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "VisuAlgo → Sorting visualizations" }, u: "https://visualgo.net/en/sorting" },
      ],
      quiz: [
        { q: { en: "Binary search requires ___ data" }, o: { en: ["Sorted", "Random", "Empty"] }, a: 0 },
        { q: { en: "Merge sort's time complexity?" }, o: { en: ["O(n log n)", "O(n²)", "O(1)"] }, a: 0 },
      ] },
    { id: "algo-complexity", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["algo-sorting"],
      name: { en: "Complexity Analysis" },
      desc: { en: "Big-O notation, time/space complexity." },
      why: { en: "The universal language for judging algorithm efficiency." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.006 → Complexity (OCW)" }, u: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/" },
      ],
      quiz: [
        { q: { en: "O(1) means ___ time" }, o: { en: ["Constant", "Linear", "Quadratic"] }, a: 0 },
        { q: { en: "Big-O measures how an algorithm..." }, o: { en: ["Scales", "Looks", "Is stored"] }, a: 0 },
      ] },
    { id: "algo-divide-conquer", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["algo-complexity"],
      name: { en: "Divide & Conquer, Algorithm Design" },
      desc: { en: "Divide & conquer, greedy, an intro to dynamic programming." },
      why: { en: "Core strategies that appear in nearly every technical interview and contest." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.006 → Algorithm design (OCW)" }, u: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/" },
      ],
      quiz: null },
  ] },
  { id: "cs-web", icon: "globe", w: 900, h: 420,
    name: { en: "Web Development" },
    desc: { en: "HTML, CSS, JavaScript, backend, APIs" },
    nodes: [
    { id: "web-html-css", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 150, diff: 1, prereqs: [],
      name: { en: "HTML & CSS" },
      desc: { en: "Web structure (HTML), styling (CSS), responsive design." },
      why: { en: "The foundation of what you see on every website." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MDN → HTML & CSS guides" }, u: "https://developer.mozilla.org/en-US/docs/Learn" },
        { role: "secondary", t: "course", r: 5, l: { en: "The Odin Project (free, full path)" }, u: "https://www.theodinproject.com/" },
      ],
      quiz: [
        { q: { en: "HTML defines a page's..." }, o: { en: ["Structure", "Speed", "Server"] }, a: 0 },
        { q: { en: "CSS is used for..." }, o: { en: ["Styling", "Databases", "Logic"] }, a: 0 },
      ] },
    { id: "web-javascript", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 2, prereqs: ["web-html-css"],
      name: { en: "JavaScript" },
      desc: { en: "DOM, events, fetch, modern JS, intro to frameworks." },
      why: { en: "The language that makes the web interactive and alive." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MDN → JavaScript guide" }, u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      ],
      quiz: [
        { q: { en: "The DOM represents the page as a..." }, o: { en: ["Tree structure", "Array", "File"] }, a: 0 },
        { q: { en: "JavaScript primarily runs in the..." }, o: { en: ["Browser", "Printer", "Disk"] }, a: 0 },
      ] },
    { id: "web-backend", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["web-javascript"],
      name: { en: "Backend & APIs" },
      desc: { en: "Servers, REST APIs, database connections, authentication." },
      why: { en: "The logic and data behind the scenes of a web app." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "The Odin Project → Backend (Node.js) path" }, u: "https://www.theodinproject.com/" },
      ],
      quiz: null },
  ] },
  { id: "cs-cp-graphs", icon: "git-branch", w: 900, h: 420,
    name: { en: "Graph Algorithms" },
    desc: { en: "Traversal, shortest paths, graph theory" },
    nodes: [
    { id: "cp-graph-traversal", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: [],
      name: { en: "Graph Traversal" },
      desc: { en: "BFS, DFS, connected components, topological sort." },
      why: { en: "The starting point of almost every graph problem." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Competitive Programmer's Handbook → Graphs" }, u: "https://cses.fi/book/book.pdf" },
        { role: "practice", t: "practice", r: 5, l: { en: "CSES Problem Set → Graph section" }, u: "https://cses.fi/problemset/" },
      ],
      quiz: [
        { q: { en: "BFS uses which structure?" }, o: { en: ["Queue", "Stack", "Heap"] }, a: 0 },
        { q: { en: "DFS uses which structure?" }, o: { en: ["Stack/recursion", "Queue", "Hash"] }, a: 0 },
      ] },
    { id: "cp-shortest-paths", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["cp-graph-traversal"],
      name: { en: "Shortest Paths" },
      desc: { en: "Dijkstra, Bellman-Ford, Floyd-Warshall." },
      why: { en: "Common in navigation, networks, and olympiad problems." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → Shortest paths" }, u: "https://cp-algorithms.com/" },
      ],
      quiz: [
        { q: { en: "Does Dijkstra work with negative edge weights?" }, o: { en: ["No", "Yes", "Always"] }, a: 0 },
        { q: { en: "Floyd-Warshall finds ___ shortest paths" }, o: { en: ["All-pairs", "Single-source", "Random"] }, a: 0 },
      ] },
    { id: "cp-graph-adv", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["cp-shortest-paths"],
      name: { en: "Advanced Graph Algorithms" },
      desc: { en: "MST, network flow, bipartite matching, SCCs." },
      why: { en: "Required for the hardest problems in competitive programming." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → Advanced graphs" }, u: "https://cp-algorithms.com/" },
      ],
      quiz: null },
  ] },
  { id: "cs-cp-dp", icon: "git-branch", w: 900, h: 420,
    name: { en: "Dynamic Programming" },
    desc: { en: "Subproblems, memoization, DP patterns" },
    nodes: [
    { id: "cp-dp-intro", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Intro to DP" },
      desc: { en: "Overlapping subproblems, memoization, bottom-up DP." },
      why: { en: "The single most important competitive programming topic." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Competitive Programmer's Handbook → DP" }, u: "https://cses.fi/book/book.pdf" },
        { role: "practice", t: "practice", r: 5, l: { en: "CSES Problem Set → DP section" }, u: "https://cses.fi/problemset/" },
      ],
      quiz: [
        { q: { en: "Memoization stores ___ results" }, o: { en: ["Subproblem", "Random", "Empty"] }, a: 0 },
        { q: { en: "DP suits problems with overlapping..." }, o: { en: ["Subproblems", "Colors", "Files"] }, a: 0 },
      ] },
    { id: "cp-dp-patterns", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["cp-dp-intro"],
      name: { en: "DP Patterns" },
      desc: { en: "Grid DP, interval DP, bitmask DP, LIS, knapsack." },
      why: { en: "Recognizing common DP shapes is the key to speed." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "USACO Guide → DP section" }, u: "https://usaco.guide/" },
      ],
      quiz: [
        { q: { en: "The knapsack is a classic ___ DP" }, o: { en: ["Optimization", "Rendering", "Random"] }, a: 0 },
        { q: { en: "Bitmask DP encodes a ___ as bits" }, o: { en: ["State (subset)", "Color", "File"] }, a: 0 },
      ] },
    { id: "cp-dp-optimization", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["cp-dp-patterns"],
      name: { en: "DP Optimization" },
      desc: { en: "Convex hull trick, divide & conquer DP, matrix exponentiation." },
      why: { en: "Advanced techniques that make slow DP fast." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → DP optimizations" }, u: "https://cp-algorithms.com/" },
      ],
      quiz: null },
  ] },
  { id: "cs-cp-math", icon: "calculator", w: 900, h: 420,
    name: { en: "Number Theory (CP)" },
    desc: { en: "Modular arithmetic, primes, combinatorics" },
    nodes: [
    { id: "cp-number-theory", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Modular Arithmetic" },
      desc: { en: "GCD, LCM, modular inverse, Fermat, Euler." },
      why: { en: "Used in nearly every olympiad number problem." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → Number theory" }, u: "https://cp-algorithms.com/" },
        { role: "practice", t: "practice", r: 5, l: { en: "CSES Problem Set → Mathematics" }, u: "https://cses.fi/problemset/" },
      ],
      quiz: [
        { q: { en: "(a·b) mod m equals..." }, o: { en: ["((a mod m)(b mod m)) mod m", "a·b", "a+b"] }, a: 0 },
        { q: { en: "The classic algorithm for GCD?" }, o: { en: ["Euclid", "Dijkstra", "Merge sort"] }, a: 0 },
      ] },
    { id: "cp-modular-primes", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["cp-number-theory"],
      name: { en: "Primes & Sieves" },
      desc: { en: "Sieve of Eratosthenes, factorization, primality testing." },
      why: { en: "The core tools of number theory problems." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → Sieve, factorization" }, u: "https://cp-algorithms.com/" },
      ],
      quiz: [
        { q: { en: "The Sieve of Eratosthenes finds..." }, o: { en: ["Prime numbers", "Shortest paths", "Sorting"] }, a: 0 },
        { q: { en: "The sieve's complexity is about..." }, o: { en: ["O(n log log n)", "O(n²)", "O(2ⁿ)"] }, a: 0 },
      ] },
    { id: "cp-combinatorics", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["cp-modular-primes"],
      name: { en: "Combinatorics" },
      desc: { en: "Permutations, combinations, binomial coefficients, inclusion-exclusion." },
      why: { en: "Counting problems are very common in IOI/ICPC." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → Combinatorics" }, u: "https://cp-algorithms.com/" },
      ],
      quiz: null },
  ] },
  { id: "cs-cp-strings", icon: "binary", w: 900, h: 420,
    name: { en: "String Algorithms" },
    desc: { en: "Matching, hashing, suffix structures" },
    nodes: [
    { id: "cp-string-basics", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "String Matching" },
      desc: { en: "KMP, the Z-function, Rabin-Karp matching." },
      why: { en: "Classic problems of finding patterns within text." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → String matching" }, u: "https://cp-algorithms.com/" },
        { role: "practice", t: "practice", r: 5, l: { en: "CSES Problem Set → String algorithms" }, u: "https://cses.fi/problemset/" },
      ],
      quiz: [
        { q: { en: "KMP uses a ___ function" }, o: { en: ["Prefix", "Only hash", "Random"] }, a: 0 },
        { q: { en: "String matching finds a pattern in a..." }, o: { en: ["Text", "Graph", "Tree"] }, a: 0 },
      ] },
    { id: "cp-hashing", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 350, diff: 3, prereqs: ["cp-string-basics"],
      name: { en: "String Hashing" },
      desc: { en: "Polynomial hashing, substring comparison, collisions." },
      why: { en: "A powerful way to compare strings in constant time." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → String hashing" }, u: "https://cp-algorithms.com/" },
      ],
      quiz: [
        { q: { en: "Polynomial hashing enables fast ___ comparison" }, o: { en: ["Substring", "Graph", "Number"] }, a: 0 },
        { q: { en: "A hash collision is when two inputs share the same..." }, o: { en: ["Hash value", "Length", "Color"] }, a: 0 },
      ] },
    { id: "cp-suffix", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["cp-hashing"],
      name: { en: "Suffix Structures" },
      desc: { en: "Suffix arrays, suffix automata, tries, Aho-Corasick." },
      why: { en: "Tools for the hardest, highest-level string problems." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "CP-Algorithms → Suffix structures" }, u: "https://cp-algorithms.com/" },
      ],
      quiz: null },
  ] },
  { id: "cs-cp-ioi", icon: "award", w: 900, h: 420,
    name: { en: "IOI & ICPC Preparation" },
    desc: { en: "Strategy, past problems, contest practice" },
    nodes: [
    { id: "cp-ioi-prep", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "IOI Preparation" },
      desc: { en: "Problem dissection, time management, earning partial scores." },
      why: { en: "The IOI is the world's premier informatics olympiad." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "USACO Guide (Bronze to Platinum)" }, u: "https://usaco.guide/" },
        { role: "practice", t: "practice", r: 5, l: { en: "Codeforces → contests & archive" }, u: "https://codeforces.com/" },
      ],
      quiz: [
        { q: { en: "The IOI tests..." }, o: { en: ["Algorithmic problem solving", "Only typing speed", "Memorization"] }, a: 0 },
        { q: { en: "Partial scoring rewards solving part of a..." }, o: { en: ["Problem", "File", "Time"] }, a: 0 },
      ] },
    { id: "cp-icpc-prep", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["cp-ioi-prep"],
      name: { en: "ICPC Preparation" },
      desc: { en: "Team strategy, code libraries, contest practice." },
      why: { en: "ICPC is the university team world championship." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "Codeforces → Gym (team contests)" }, u: "https://codeforces.com/gyms" },
      ],
      quiz: [
        { q: { en: "ICPC is contested in teams of..." }, o: { en: ["3", "1", "10"] }, a: 0 },
        { q: { en: "In team prep, what matters?" }, o: { en: ["Code library + roles", "Only speed", "Luck"] }, a: 0 },
      ] },
    { id: "cp-past-ioi", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["cp-icpc-prep"],
      name: { en: "Past IOI Problems" },
      desc: { en: "Solving real IOI problems under time, analyzing, improving." },
      why: { en: "The best way to test readiness for the world stage." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "oj.uz → IOI archive problems" }, u: "https://oj.uz/" },
      ],
      quiz: null },
  ] },
  { id: "cs-algorithms-adv", icon: "git-branch", w: 900, h: 420,
    name: { en: "Advanced Algorithms" },
    desc: { en: "Flows, NP-completeness, randomized algorithms" },
    nodes: [
    { id: "adv-graph-flows", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "Network Flows" },
      desc: { en: "Max-flow, min-cut, matching, flow applications." },
      why: { en: "A surprising number of problems reduce to flow." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.046 → Design & Analysis of Algorithms (OCW)" }, u: "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/" },
      ],
      quiz: [
        { q: { en: "The max-flow min-cut theorem relates flow to..." }, o: { en: ["Minimum cut", "Sorting", "Hashing"] }, a: 0 },
        { q: { en: "Bipartite matching can be solved via..." }, o: { en: ["Flow", "Sorting", "Hashing"] }, a: 0 },
      ] },
    { id: "adv-np-complete", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["adv-graph-flows"],
      name: { en: "NP-Completeness" },
      desc: { en: "P, NP, reductions, NP-complete problems, intractability." },
      why: { en: "Understanding which problems are 'truly hard'." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.046 → NP-completeness (OCW)" }, u: "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/" },
      ],
      quiz: [
        { q: { en: "The P = NP question asks if every quickly ___ problem is quickly solvable" }, o: { en: ["Verifiable", "Printable", "Storable"] }, a: 0 },
        { q: { en: "A reduction shows one problem is at least as hard as..." }, o: { en: ["Another problem", "A file", "A graph"] }, a: 0 },
      ] },
    { id: "adv-randomized", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["adv-np-complete"],
      name: { en: "Randomized & Approximation Algorithms" },
      desc: { en: "Randomized algorithms, approximation ratios, LP relaxation." },
      why: { en: "When exact solutions are impossible, these methods find practical answers." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.046 → Randomized algorithms (OCW)" }, u: "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/" },
      ],
      quiz: null },
  ] },
  { id: "cs-theory", icon: "binary", w: 900, h: 420,
    name: { en: "Theory of Computation" },
    desc: { en: "Automata, languages, computability, complexity" },
    nodes: [
    { id: "automata-theory", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "Automata & Languages" },
      desc: { en: "Finite automata, regular languages, context-free grammars." },
      why: { en: "The mathematical foundation of what 'computation' means." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.404 → Theory of Computation (OCW)" }, u: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/" },
      ],
      quiz: [
        { q: { en: "A finite automaton recognizes ___ languages" }, o: { en: ["Regular", "All", "Empty"] }, a: 0 },
        { q: { en: "Regular expressions are equivalent to..." }, o: { en: ["Finite automata", "Turing machines", "Graphs"] }, a: 0 },
      ] },
    { id: "computability-theory", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["automata-theory"],
      name: { en: "Computability" },
      desc: { en: "Turing machines, the halting problem, undecidability." },
      why: { en: "Proving there are problems NO computer can ever solve." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.404 → Computability (OCW)" }, u: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/" },
      ],
      quiz: [
        { q: { en: "The halting problem is..." }, o: { en: ["Undecidable", "Easy", "Constant"] }, a: 0 },
        { q: { en: "A Turing machine models general..." }, o: { en: ["Computation", "Graphs", "Networks"] }, a: 0 },
      ] },
    { id: "complexity-classes", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["computability-theory"],
      name: { en: "Complexity Classes" },
      desc: { en: "P, NP, PSPACE, reductions, completeness, hierarchies." },
      why: { en: "The deep structure of computational difficulty theory." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Boaz Barak, Intro to Theoretical CS" }, u: "https://introtcs.org/" },
      ],
      quiz: null },
  ] },
  { id: "cs-os", icon: "cpu", w: 900, h: 420,
    name: { en: "Operating Systems" },
    desc: { en: "Processes, memory, concurrency, file systems" },
    nodes: [
    { id: "os-processes", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Processes & Threads" },
      desc: { en: "Processes, threads, scheduling, context switching." },
      why: { en: "How a computer runs many things at once." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OSTEP → Operating Systems: Three Easy Pieces" }, u: "https://pages.cs.wisc.edu/~remzi/OSTEP/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 6.1810 → Operating System Engineering (OCW)" }, u: "https://pdos.csail.mit.edu/6.828/" },
      ],
      quiz: [
        { q: { en: "Threads within a process share..." }, o: { en: ["Memory", "Nothing", "Only CPU"] }, a: 0 },
        { q: { en: "The scheduler decides which process..." }, o: { en: ["Runs", "Deletes", "Is stored"] }, a: 0 },
      ] },
    { id: "os-memory-mgmt", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["os-processes"],
      name: { en: "Memory Management" },
      desc: { en: "Virtual memory, paging, the TLB, caching." },
      why: { en: "The magic of sharing limited RAM among many programs." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OSTEP → Virtualization (Memory) section" }, u: "https://pages.cs.wisc.edu/~remzi/OSTEP/" },
      ],
      quiz: [
        { q: { en: "Virtual memory gives each process its own..." }, o: { en: ["Address space", "CPU", "Disk"] }, a: 0 },
        { q: { en: "Paging divides memory into fixed-size..." }, o: { en: ["Pages", "Files", "Graphs"] }, a: 0 },
      ] },
    { id: "os-concurrency", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["os-memory-mgmt"],
      name: { en: "Concurrency" },
      desc: { en: "Locks, semaphores, deadlock, race conditions." },
      why: { en: "Writing correct concurrent code is one of the hardest challenges." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OSTEP → Concurrency section" }, u: "https://pages.cs.wisc.edu/~remzi/OSTEP/" },
      ],
      quiz: null },
  ] },
  { id: "cs-networks", icon: "network", w: 900, h: 420,
    name: { en: "Computer Networks" },
    desc: { en: "Layers, protocols, TCP/IP, routing" },
    nodes: [
    { id: "net-layers", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 2, prereqs: [],
      name: { en: "Network Layers" },
      desc: { en: "OSI/TCP-IP model, encapsulation, the role of protocols." },
      why: { en: "How the internet is organized in layers." },
      res: [
        { role: "secondary", t: "course", r: 4, l: { en: "Stanford CS144 → Computer Networking" }, u: "https://cs144.github.io/" },
      ],
      quiz: [
        { q: { en: "The OSI model has how many layers?" }, o: { en: ["7", "3", "12"] }, a: 0 },
        { q: { en: "Encapsulation wraps data with layer..." }, o: { en: ["Headers", "Color", "Only size"] }, a: 0 },
      ] },
    { id: "net-tcp-ip", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["net-layers"],
      name: { en: "TCP/IP & Transport" },
      desc: { en: "IP addressing, TCP/UDP, reliable delivery, DNS." },
      why: { en: "The core protocols that run the internet." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Stanford CS144: Computer Networking" }, u: "https://cs144.github.io/" },
      ],
      quiz: [
        { q: { en: "TCP provides ___ delivery" }, o: { en: ["Reliable", "Unreliable", "Random"] }, a: 0 },
        { q: { en: "DNS translates domain names to..." }, o: { en: ["IP addresses", "Files", "Colors"] }, a: 0 },
      ] },
    { id: "net-routing-security", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["net-tcp-ip"],
      name: { en: "Routing & Security" },
      desc: { en: "Routing algorithms, NAT, TLS, network security." },
      why: { en: "How data safely travels across the globe." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Stanford CS144: Routing & Networks" }, u: "https://cs144.github.io/" },
      ],
      quiz: null },
  ] },
  { id: "cs-distributed", icon: "network", w: 900, h: 420,
    name: { en: "Distributed Systems" },
    desc: { en: "Consistency, consensus, fault tolerance" },
    nodes: [
    { id: "dist-consistency", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "Consistency & Replication" },
      desc: { en: "Replication, consistency models, the CAP theorem." },
      why: { en: "The core challenge of making many computers act as one." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.5840 → Distributed Systems (materials)" }, u: "https://pdos.csail.mit.edu/6.824/" },
      ],
      quiz: [
        { q: { en: "The CAP theorem trades off which three?" }, o: { en: ["Consistency, availability, partition-tolerance", "CPU, RAM, disk", "Speed, color, size"] }, a: 0 },
        { q: { en: "Replication improves availability and..." }, o: { en: ["Fault tolerance", "Color", "Size"] }, a: 0 },
      ] },
    { id: "dist-consensus", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["dist-consistency"],
      name: { en: "Consensus" },
      desc: { en: "Paxos, Raft, leader election, distributed logs." },
      why: { en: "The subtle problem of getting unreliable machines to agree." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.5840 → Raft, consensus lectures" }, u: "https://pdos.csail.mit.edu/6.824/" },
      ],
      quiz: [
        { q: { en: "Raft is an algorithm for..." }, o: { en: ["Consensus", "Sorting", "Hashing"] }, a: 0 },
        { q: { en: "Consensus ensures nodes agree on a..." }, o: { en: ["Single value/log", "Color", "Size"] }, a: 0 },
      ] },
    { id: "dist-fault-tolerance", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["dist-consensus"],
      name: { en: "Fault Tolerance & Scale" },
      desc: { en: "MapReduce, sharding, retries, large-system design." },
      why: { en: "How world-scale systems like Google and Amazon work." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.5840 → MapReduce, fault tolerance" }, u: "https://pdos.csail.mit.edu/6.824/" },
      ],
      quiz: null },
  ] },
  { id: "cs-security", icon: "binary", w: 900, h: 420,
    name: { en: "Cybersecurity & Cryptography" },
    desc: { en: "Encryption, attacks, defense" },
    nodes: [
    { id: "sec-fundamentals", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 2, prereqs: [],
      name: { en: "Security Fundamentals" },
      desc: { en: "Threat models, vulnerabilities, attack types, the CIA triad." },
      why: { en: "Every system connected to the internet needs this knowledge." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "Cryptopals → Crypto Challenges" }, u: "https://cryptopals.com/" },
        { role: "secondary", t: "course", r: 4, l: { en: "OWASP → Top Ten (web vulnerabilities)" }, u: "https://owasp.org/www-project-top-ten/" },
      ],
      quiz: [
        { q: { en: "The CIA triad is confidentiality, integrity, and..." }, o: { en: ["Availability", "Speed", "Color"] }, a: 0 },
        { q: { en: "A threat model identifies potential..." }, o: { en: ["Attacks/risks", "Colors", "File sizes"] }, a: 0 },
      ] },
    { id: "sec-crypto", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["sec-fundamentals"],
      name: { en: "Cryptography" },
      desc: { en: "Symmetric/public-key, RSA, hashing, digital signatures." },
      why: { en: "The mathematical foundation of modern digital security." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Dan Boneh → Cryptography I (Coursera, free audit)" }, u: "https://www.coursera.org/learn/crypto" },
      ],
      quiz: [
        { q: { en: "Public-key crypto uses how many keys?" }, o: { en: ["2 (public/private)", "1", "0"] }, a: 0 },
        { q: { en: "A cryptographic hash is designed to be..." }, o: { en: ["One-way", "Reversible", "Non-random"] }, a: 0 },
      ] },
    { id: "sec-web-security", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["sec-crypto"],
      name: { en: "Web & System Security" },
      desc: { en: "SQL injection, XSS, authentication, secure design." },
      why: { en: "The practical knowledge of defending against real attacks." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "OWASP → Web Security Testing Guide" }, u: "https://owasp.org/" },
      ],
      quiz: null },
  ] },
  { id: "cs-graphics", icon: "eye", w: 900, h: 420,
    name: { en: "Computer Graphics & Game Dev" },
    desc: { en: "Rendering, 3D math, game engines" },
    nodes: [
    { id: "gfx-rasterization", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Rasterization & Rendering" },
      desc: { en: "Pixels, triangles, depth buffers, the rendering pipeline." },
      why: { en: "How 3D scenes get drawn onto a screen." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "LearnOpenGL (free, complete)" }, u: "https://learnopengl.com/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 6.837 → Computer Graphics (OCW)" }, u: "https://ocw.mit.edu/courses/6-837-computer-graphics-fall-2012/" },
      ],
      quiz: [
        { q: { en: "The depth buffer decides which surface is..." }, o: { en: ["In front", "Bright", "Large"] }, a: 0 },
        { q: { en: "3D models are mostly built from..." }, o: { en: ["Triangles", "Circles", "Text"] }, a: 0 },
      ] },
    { id: "gfx-shading", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["gfx-rasterization"],
      name: { en: "Lighting & Shaders" },
      desc: { en: "Lighting models, shaders, textures, GPU programming." },
      why: { en: "The math that makes scenes look realistic and beautiful." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "LearnOpenGL → Lighting & shaders" }, u: "https://learnopengl.com/" },
      ],
      quiz: [
        { q: { en: "Shaders run on the..." }, o: { en: ["GPU", "Disk", "Printer"] }, a: 0 },
        { q: { en: "Textures add surface ___ to models" }, o: { en: ["Detail/color", "Mass", "Speed"] }, a: 0 },
      ] },
    { id: "gfx-game-dev", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["gfx-shading"],
      name: { en: "Game Development" },
      desc: { en: "Game engines, physics, collision, game logic." },
      why: { en: "The creative field that unites graphics, physics, and design." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Godot Engine → official docs" }, u: "https://docs.godotengine.org/" },
      ],
      quiz: null },
  ] },
  { id: "cs-quantum-computing", icon: "atom", w: 900, h: 420,
    name: { en: "Quantum Computing" },
    desc: { en: "Qubits, quantum algorithms, correction" },
    nodes: [
    { id: "qc-qubits-gates", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "Qubits & Gates" },
      desc: { en: "Superposition, entanglement, quantum gates, measurement." },
      why: { en: "The building blocks of a fundamentally different computing paradigm." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "IBM Qiskit → Quantum learning" }, u: "https://learning.quantum.ibm.com/" },
      ],
      quiz: [
        { q: { en: "A qubit can represent 0 and 1..." }, o: { en: ["Simultaneously (superposition)", "Never", "Sequentially"] }, a: 0 },
        { q: { en: "Entanglement is a correlation between..." }, o: { en: ["Qubits", "Files", "Pixels"] }, a: 0 },
      ] },
    { id: "qc-algorithms", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["qc-qubits-gates"],
      name: { en: "Quantum Algorithms" },
      desc: { en: "Deutsch-Jozsa, Grover's, Shor's algorithms." },
      why: { en: "Why quantum computers can beat classical ones on some problems." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "IBM Qiskit → Quantum algorithms" }, u: "https://learning.quantum.ibm.com/" },
      ],
      quiz: [
        { q: { en: "Shor's algorithm quickly performs..." }, o: { en: ["Factoring", "Sorting", "Drawing"] }, a: 0 },
        { q: { en: "Grover's algorithm speeds up..." }, o: { en: ["Search", "Printing", "Storing"] }, a: 0 },
      ] },
    { id: "qc-error-correction", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["qc-algorithms"],
      name: { en: "Quantum Error Correction" },
      desc: { en: "Decoherence, error-correcting codes, fault-tolerant computing." },
      why: { en: "The key obstacle to building practical quantum computers." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "IBM Quantum Learning: error correction" }, u: "https://learning.quantum.ibm.com/" },
      ],
      quiz: null },
  ] },
  ],
  planned: [],
  paths: [
    { id: "core", icon: "💻", tag: { en: "Core" },
      name: { en: "Core Learning" },
      desc: { en: "A complete computer science foundation for software, AI, cybersecurity, game dev, robotics, and research." },
      branches: ["cs-programming", "cs-python", "cs-oop", "cs-data-structures", "cs-algorithms", "cs-web"] },
    { id: "university", icon: "🎓", tag: { en: "University" },
      name: { en: "University & Research" },
      desc: { en: "A complete university CS curriculum, algorithms, theory, systems, AI, security, and quantum." },
      branches: ["cs-ai", "cs-algorithms-adv", "cs-theory", "cs-os", "cs-networks", "cs-distributed", "cs-security", "cs-graphics", "cs-quantum-computing"] },
    { id: "olympiad", icon: "🏅", tag: { en: "Competitive" },
      name: { en: "Competitive Programming" },
      desc: { en: "Algorithmic problem solving for national informatics olympiads, IOI, ICPC, and competitive programming contests." },
      branches: ["cs-cp", "cs-cp-graphs", "cs-cp-dp", "cs-cp-math", "cs-cp-strings", "cs-cp-ioi"] },
  ],
},
{
  id: "chemistry", icon: "🧪", hue: "#0ea5e9",
  name: { en: "Chemistry" },
  desc: { en: "Atomic structure, bonding, reactions, thermodynamics, and organic chemistry." },
  branches: [
  { id: "chem-general", icon: "🧪", w: 900, h: 620,
    name: { en: "General Chemistry" },
    desc: { en: "The foundation path toward the IChO" },
    nodes: [
    { id: "atomic-structure", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: [],
      name: { en: "Atomic Structure" },
      desc: { en: "Electrons, orbitals, the periodic table." },
      why: { en: "All of chemistry starts with atomic structure." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Khan → Chemistry · Atomic structure unit" }, u: "https://www.khanacademy.org/science/chemistry/atomic-structure" },
        { t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.2-3 (Atoms, Electronic Structure)" }, u: "https://openstax.org/books/chemistry-2e/pages/2-introduction" },
        { t: "sim", r: 5, l: { en: "PhET → Build an Atom" }, u: "https://phet.colorado.edu/en/simulations/build-an-atom" },
      ],
      notes: { en: ["Electrons live in orbitals", "The periodic table maps electron structure", "Valence electrons decide reactions"] },
      quiz: [
        { q: { en: "What's in an atom's nucleus?" }, o: { en: ["Protons and neutrons", "Only electrons", "Nothing"] }, a: 0 },
        { q: { en: "What determines chemical reactions?" }, o: { en: ["Valence electrons", "Neutrons", "Mass"] }, a: 0 },
      ] },
    { id: "bonding", stage: "f", pos: [450, 205], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["atomic-structure"],
      name: { en: "Chemical Bonding" },
      desc: { en: "Ionic, covalent, molecular shapes." },
      why: { en: "Why molecules have their shapes and properties." },
      res: [
        { t: "sim", s: 1, r: 5, l: { en: "PhET → Molecule Shapes" }, u: "https://phet.colorado.edu/en/simulations/molecule-shapes" },
        { t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.7-8 (Bonding, Molecular Geometry)" }, u: "https://openstax.org/books/chemistry-2e/pages/7-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Chemical bonds lessons" }, u: "https://www.khanacademy.org/science/chemistry/chemical-bonds" },
      ],
      notes: { en: ["Ionic = give/take electrons", "Covalent = share electrons", "VSEPR → molecular shape"] },
      quiz: [
        { q: { en: "In a covalent bond, electrons are..." }, o: { en: ["Shared", "Transferred", "Destroyed"] }, a: 0 },
        { q: { en: "What bond is in NaCl?" }, o: { en: ["Ionic", "Covalent", "Metallic"] }, a: 0 },
      ] },
    { id: "reactions", stage: "a", pos: [260, 360], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["bonding"],
      name: { en: "Reactions & Stoichiometry" },
      desc: { en: "Balancing equations, mole calculations." },
      why: { en: "Quantitative chemistry, the basis of lab work." },
      res: [
        { t: "sim", s: 1, r: 5, l: { en: "PhET → Balancing Chemical Equations" }, u: "https://phet.colorado.edu/en/simulations/balancing-chemical-equations" },
        { t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.4 (Stoichiometry)" }, u: "https://openstax.org/books/chemistry-2e/pages/4-introduction" },
        { t: "practice", r: 4, l: { en: "Khan → Stoichiometry exercises" }, u: "https://www.khanacademy.org/science/chemistry/chemical-reactions-stoichiome" },
      ],
      notes: { en: ["Mass is conserved → balance it", "A mole = 6.022×10²³ items", "The limiting reactant sets the yield"] },
      quiz: [
        { q: { en: "Items per mole (Avogadro)?" }, o: { en: ["6.022×10²³", "3.14", "1000"] }, a: 0 },
        { q: { en: "Why balance an equation?" }, o: { en: ["Mass is conserved", "It looks nice", "No reason"] }, a: 0 },
      ] },
    { id: "chem-olympiad", stage: "o", pos: [640, 360], weeks: 5, h: 25, xp: 300, diff: 3, prereqs: ["reactions"],
      name: { en: "IChO Preparation" },
      desc: { en: "International Chemistry Olympiad problems." },
      why: { en: "Mongolia competes at the IChO regularly." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO → past preparatory problems" }, u: "https://www.ichosc.org/" },
        { t: "book", r: 4, l: { en: "OpenStax Chemistry 2e → review all chapters" }, u: "https://openstax.org/details/books/chemistry-2e" },
      ],
      notes: { en: ["See IChO on the Competitions page", "Prepare for both theory and practical"] },
      quiz: null },
  ] },
  { id: "chem-matter", icon: "💨", w: 900, h: 420,
    name: { en: "States of Matter & Gases" },
    desc: { en: "Solids, liquids, gases, the gas laws, intermolecular forces" },
    nodes: [
    { id: "states-matter", stage: "f", pos: [450, 60], weeks: 2, h: 10, xp: 150, diff: 1, prereqs: [],
      name: { en: "States of Matter" },
      desc: { en: "Solid, liquid, gas, phase transitions, kinetic theory." },
      why: { en: "The molecular reason substances melt and boil." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → States of Matter" }, u: "https://phet.colorado.edu/en/simulations/states-of-matter" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.10 (Liquids & Solids)" }, u: "https://openstax.org/books/chemistry-2e/pages/10-introduction" },
      ],
      quiz: [
        { q: { en: "Gas molecules are..." }, o: { en: ["Far apart, free-moving", "Tightly packed", "Motionless"] }, a: 0 },
        { q: { en: "Melting is the transition from..." }, o: { en: ["Solid → liquid", "Liquid → gas", "Gas → solid"] }, a: 0 },
      ] },
    { id: "gas-laws", stage: "f", pos: [450, 195], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["states-matter"],
      name: { en: "The Gas Laws" },
      desc: { en: "Boyle's, Charles's laws, the ideal gas law PV = nRT." },
      why: { en: "Quantifies the pressure–volume–temperature relationship." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Gas Properties" }, u: "https://phet.colorado.edu/en/simulations/gas-properties" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.9 (Gases)" }, u: "https://openstax.org/books/chemistry-2e/pages/9-introduction" },
      ],
      quiz: [
        { q: { en: "The ideal gas law?" }, o: { en: ["PV = nRT", "E = mc²", "F = ma"] }, a: 0 },
        { q: { en: "Boyle's law: as pressure rises, volume..." }, o: { en: ["Decreases", "Increases", "Stays same"] }, a: 0 },
      ] },
    { id: "imf-forces", stage: "a", pos: [450, 330], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["gas-laws"],
      name: { en: "Intermolecular Forces" },
      desc: { en: "Van der Waals, hydrogen bonding, dipole forces." },
      why: { en: "The real reason water boils at 100°C." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.10.1 (IMFs)" }, u: "https://openstax.org/books/chemistry-2e/pages/10-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Intermolecular forces" }, u: "https://www.khanacademy.org/science/chemistry/states-of-matter-and-intermolecular-forces" },
      ],
      quiz: [
        { q: { en: "Strongest intermolecular force?" }, o: { en: ["Hydrogen bonding", "London", "Dipole-dipole"] }, a: 0 },
        { q: { en: "IMFs determine..." }, o: { en: ["Boiling point", "Atomic mass", "Nuclear charge"] }, a: 0 },
      ] },
  ] },
  { id: "chem-thermochem", icon: "🔥", w: 900, h: 420,
    name: { en: "Thermochemistry" },
    desc: { en: "Enthalpy, Hess's law, entropy, Gibbs free energy" },
    nodes: [
    { id: "enthalpy-heat", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Enthalpy & Heat" },
      desc: { en: "Heat, enthalpy (ΔH), exo/endothermic reactions, calorimetry." },
      why: { en: "Tells whether a reaction releases or absorbs heat." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.5 (Thermochemistry)" }, u: "https://openstax.org/books/chemistry-2e/pages/5-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Thermochemistry" }, u: "https://www.khanacademy.org/science/chemistry/thermodynamics-chemistry" },
      ],
      quiz: [
        { q: { en: "An exothermic reaction ___ heat" }, o: { en: ["Releases", "Absorbs", "Destroys"] }, a: 0 },
        { q: { en: "ΔH represents the change in..." }, o: { en: ["Enthalpy", "Entropy", "Volume"] }, a: 0 },
      ] },
    { id: "hess-law", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["enthalpy-heat"],
      name: { en: "Hess's Law" },
      desc: { en: "The additivity of enthalpy, computing reaction heats." },
      why: { en: "Finds hard-to-measure reaction heats indirectly." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.5.3 (Hess's Law)" }, u: "https://openstax.org/books/chemistry-2e/pages/5-introduction" },
      ],
      quiz: [
        { q: { en: "Hess's law is based on the conservation of..." }, o: { en: ["Energy", "Only mass", "Charge"] }, a: 0 },
        { q: { en: "Enthalpy is a ___ function" }, o: { en: ["State", "Path", "Random"] }, a: 0 },
      ] },
    { id: "entropy-gibbs", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["hess-law"],
      name: { en: "Entropy & Gibbs Energy" },
      desc: { en: "Entropy (ΔS), Gibbs free energy, spontaneity." },
      why: { en: "The general law predicting whether a reaction is spontaneous." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.16 (Thermodynamics)" }, u: "https://openstax.org/books/chemistry-2e/pages/16-introduction" },
        { role: "advanced", t: "course", r: 4, l: { en: "MIT 5.111 → Thermodynamics section (OCW)" }, u: "https://ocw.mit.edu/courses/5-111sc-principles-of-chemical-science-fall-2014/" },
      ],
      quiz: null },
  ] },
  { id: "chem-equilibrium", icon: "⚖️", w: 900, h: 420,
    name: { en: "Chemical Equilibrium" },
    desc: { en: "Equilibrium constants, Le Chatelier, solubility" },
    nodes: [
    { id: "equilibrium-const", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: [],
      name: { en: "The Equilibrium Constant" },
      desc: { en: "Reversible reactions, the equilibrium constant K, the reaction quotient Q." },
      why: { en: "Quantifies how far a reaction proceeds." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Reactions & Rates" }, u: "https://phet.colorado.edu/en/simulations/reactions-and-rates" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.13 (Equilibrium)" }, u: "https://openstax.org/books/chemistry-2e/pages/13-introduction" },
      ],
      quiz: [
        { q: { en: "If K is large, the reaction favors..." }, o: { en: ["Products", "Reactants", "Neither"] }, a: 0 },
        { q: { en: "At equilibrium, the forward and reverse rates are..." }, o: { en: ["Equal", "Zero", "Infinite"] }, a: 0 },
      ] },
    { id: "le-chatelier", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["equilibrium-const"],
      name: { en: "Le Chatelier's Principle" },
      desc: { en: "Stresses on equilibrium: concentration, pressure, temperature." },
      why: { en: "Used to optimize processes like ammonia production." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.13.3 (Le Chatelier)" }, u: "https://openstax.org/books/chemistry-2e/pages/13-introduction" },
      ],
      quiz: [
        { q: { en: "Adding reactant shifts equilibrium toward..." }, o: { en: ["Products", "Reactants", "No shift"] }, a: 0 },
        { q: { en: "Le Chatelier's principle predicts the response to a..." }, o: { en: ["Stress", "A catalyst", "Color"] }, a: 0 },
      ] },
    { id: "solubility-product", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 300, diff: 3, prereqs: ["le-chatelier"],
      name: { en: "Solubility Product" },
      desc: { en: "Ksp, precipitation, the common-ion effect." },
      why: { en: "Predicts what dissolves and what precipitates." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.15 (Equilibria of Solubility)" }, u: "https://openstax.org/books/chemistry-2e/pages/15-introduction" },
      ],
      quiz: null },
  ] },
  { id: "chem-acids", icon: "🧪", w: 900, h: 420,
    name: { en: "Acids & Bases" },
    desc: { en: "Acid-base theories, pH, buffers, titration" },
    nodes: [
    { id: "acid-base-theories", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Acid-Base Theories" },
      desc: { en: "Arrhenius, Brønsted–Lowry, Lewis theories, conjugate pairs." },
      why: { en: "Three levels of understanding what acids and bases are." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Acid-Base Solutions" }, u: "https://phet.colorado.edu/en/simulations/acid-base-solutions" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.14 (Acid-Base Equilibria)" }, u: "https://openstax.org/books/chemistry-2e/pages/14-introduction" },
      ],
      quiz: [
        { q: { en: "A Brønsted acid is a..." }, o: { en: ["Proton donor", "Proton acceptor", "Electron donor"] }, a: 0 },
        { q: { en: "A Lewis base donates a..." }, o: { en: ["Electron pair", "Proton", "Neutron"] }, a: 0 },
      ] },
    { id: "ph-poh", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["acid-base-theories"],
      name: { en: "pH & pOH" },
      desc: { en: "The pH scale, strong/weak acids, Ka, Kb, hydrogen ions." },
      why: { en: "Quantifies the acidity of a solution." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → pH Scale" }, u: "https://phet.colorado.edu/en/simulations/ph-scale" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → pH, pOH and buffers" }, u: "https://www.khanacademy.org/science/chemistry/acids-and-bases-topic" },
      ],
      quiz: [
        { q: { en: "pH 7 is..." }, o: { en: ["Neutral", "Acidic", "Basic"] }, a: 0 },
        { q: { en: "As pH decreases, acidity..." }, o: { en: ["Increases", "Decreases", "Stays same"] }, a: 0 },
      ] },
    { id: "buffers-titration", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["ph-poh"],
      name: { en: "Buffers & Titration" },
      desc: { en: "Buffer solutions, Henderson–Hasselbalch, titration curves." },
      why: { en: "The basis of vital systems like keeping blood pH stable." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.14.6–14.7 (Buffers, Titration)" }, u: "https://openstax.org/books/chemistry-2e/pages/14-introduction" },
      ],
      quiz: null },
  ] },
  { id: "chem-electro", icon: "🔋", w: 900, h: 420,
    name: { en: "Electrochemistry" },
    desc: { en: "Redox, galvanic cells, electrolysis" },
    nodes: [
    { id: "redox-basics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Redox Reactions" },
      desc: { en: "Oxidation states, oxidation-reduction, balancing redox equations." },
      why: { en: "Corrosion, combustion, respiration, all redox." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.17 (Electrochemistry)" }, u: "https://openstax.org/books/chemistry-2e/pages/17-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Oxidation-reduction reactions" }, u: "https://www.khanacademy.org/science/chemistry/oxidation-reduction" },
      ],
      quiz: [
        { q: { en: "Oxidation is the ___ of electrons" }, o: { en: ["Loss", "Gain", "Sharing"] }, a: 0 },
        { q: { en: "Reduction is the ___ of electrons" }, o: { en: ["Gain", "Loss", "Destruction"] }, a: 0 },
      ] },
    { id: "galvanic-cells", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["redox-basics"],
      name: { en: "Galvanic Cells" },
      desc: { en: "Voltaic cells, electrode potentials, EMF, the Nernst equation." },
      why: { en: "The principle of how batteries generate electricity." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.17.2–17.4 (Cells, Potentials)" }, u: "https://openstax.org/books/chemistry-2e/pages/17-introduction" },
      ],
      quiz: [
        { q: { en: "A galvanic cell produces..." }, o: { en: ["Electrical energy", "Only heat", "Light"] }, a: 0 },
        { q: { en: "Oxidation occurs at the..." }, o: { en: ["Anode", "Cathode", "Neither"] }, a: 0 },
      ] },
    { id: "electrolysis", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 300, diff: 3, prereqs: ["galvanic-cells"],
      name: { en: "Electrolysis" },
      desc: { en: "Electrolytic cells, Faraday's laws, industrial applications." },
      why: { en: "Used in aluminum & chlorine production and electroplating." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.17.7 (Electrolysis)" }, u: "https://openstax.org/books/chemistry-2e/pages/17-introduction" },
      ],
      quiz: null },
  ] },
  { id: "chem-organic", icon: "🧬", w: 900, h: 420,
    name: { en: "Organic Chemistry" },
    desc: { en: "Carbon compounds, functional groups, reactions" },
    nodes: [
    { id: "organic-intro", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Intro to Organic Chemistry" },
      desc: { en: "Carbon, hydrocarbons, isomers, nomenclature." },
      why: { en: "The language of life's chemistry, the world of carbon." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Organic Chemistry → Ch.1–3" }, u: "https://openstax.org/books/organic-chemistry/pages/1-introduction" },
        { role: "secondary", t: "video", r: 5, l: { en: "Khan → Organic chemistry" }, u: "https://www.khanacademy.org/science/organic-chemistry" },
      ],
      quiz: [
        { q: { en: "Organic chemistry studies compounds of..." }, o: { en: ["Carbon", "Metals", "Noble gases"] }, a: 0 },
        { q: { en: "Isomers have the same formula but different..." }, o: { en: ["Structure", "Mass", "Atom count"] }, a: 0 },
      ] },
    { id: "functional-groups", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["organic-intro"],
      name: { en: "Functional Groups" },
      desc: { en: "Alcohols, aldehydes, ketones, acids, amines, esters." },
      why: { en: "Functional groups determine a molecule's reactivity." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Organic Chemistry → functional-group chapters" }, u: "https://openstax.org/details/books/organic-chemistry" },
        { role: "secondary", t: "course", r: 4, l: { en: "Master Organic Chemistry → Functional Groups" }, u: "https://www.masterorganicchemistry.com/" },
      ],
      quiz: [
        { q: { en: "–OH is which functional group?" }, o: { en: ["Alcohol", "Ketone", "Acid"] }, a: 0 },
        { q: { en: "Functional groups determine..." }, o: { en: ["Reactivity", "Mass", "Only color"] }, a: 0 },
      ] },
    { id: "organic-reactions", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["functional-groups"],
      name: { en: "Organic Reactions" },
      desc: { en: "Substitution, addition, elimination, an intro to mechanisms." },
      why: { en: "Drugs, polymers, dyes, all synthesized by organic reactions." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Organic Chemistry → reaction chapters" }, u: "https://openstax.org/details/books/organic-chemistry" },
        { role: "advanced", t: "course", r: 4, l: { en: "MIT 5.12 → Organic Chemistry I (OCW)" }, u: "https://ocw.mit.edu/courses/5-12-organic-chemistry-i-spring-2005/" },
      ],
      quiz: null },
  ] },
  { id: "chem-physical", icon: "⚗️", w: 900, h: 420,
    name: { en: "Physical Chemistry" },
    desc: { en: "Thermodynamics, kinetics, quantum foundations" },
    nodes: [
    { id: "pchem-thermo", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Chemical Thermodynamics" },
      desc: { en: "The laws, free energy, chemical potential, phase equilibria." },
      why: { en: "Determines which reactions occur and under what conditions." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 5.61 → Physical Chemistry: Thermodynamics (OCW)" }, u: "https://ocw.mit.edu/courses/5-61-physical-chemistry-fall-2017/" },
      ],
      quiz: [
        { q: { en: "Chemical potential governs..." }, o: { en: ["Matter flow/equilibrium", "Color", "Only mass"] }, a: 0 },
        { q: { en: "A reaction with decreasing Gibbs energy is..." }, o: { en: ["Spontaneous", "Impossible", "At equilibrium"] }, a: 0 },
      ] },
    { id: "pchem-kinetics", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["pchem-thermo"],
      name: { en: "Chemical Kinetics" },
      desc: { en: "Rate laws, reaction mechanisms, Arrhenius, catalysis." },
      why: { en: "Determines HOW FAST a reaction goes (not thermodynamics)." },
      res: [
        { role: "secondary", t: "book", r: 4, l: { en: "LibreTexts → Physical Chemistry: Kinetics" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: [
        { q: { en: "The Arrhenius equation relates rate to..." }, o: { en: ["Temperature", "Color", "Volume"] }, a: 0 },
        { q: { en: "A catalyst changes the..." }, o: { en: ["Activation energy", "Equilibrium", "Enthalpy"] }, a: 0 },
      ] },
    { id: "pchem-quantum", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["pchem-kinetics"],
      name: { en: "Quantum Chemistry Foundations" },
      desc: { en: "The Schrödinger equation, atomic orbitals, molecular orbitals." },
      why: { en: "The quantum-mechanical explanation of bonding and spectra." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 5.61 → Quantum Mechanics section (OCW)" }, u: "https://ocw.mit.edu/courses/5-61-physical-chemistry-fall-2017/" },
      ],
      quiz: null },
  ] },
  { id: "chem-organic-adv", icon: "🧬", w: 900, h: 420,
    name: { en: "Organic Chemistry II" },
    desc: { en: "Reaction mechanisms, stereochemistry, synthesis" },
    nodes: [
    { id: "reaction-mechanisms", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Reaction Mechanisms" },
      desc: { en: "Arrow pushing, SN1/SN2, E1/E2, intermediates." },
      why: { en: "Deeply understanding WHY and HOW reactions happen." },
      res: [
        { role: "secondary", t: "course", r: 5, l: { en: "Master Organic Chemistry → Reaction Mechanisms" }, u: "https://www.masterorganicchemistry.com/" },
      ],
      quiz: [
        { q: { en: "An SN2 reaction has which kinetics?" }, o: { en: ["Second order", "Zero order", "Third order"] }, a: 0 },
        { q: { en: "A curved arrow shows the movement of..." }, o: { en: ["Electrons", "Atoms", "Only protons"] }, a: 0 },
      ] },
    { id: "stereochemistry", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["reaction-mechanisms"],
      name: { en: "Stereochemistry" },
      desc: { en: "Chirality, enantiomers, R/S, optical activity." },
      why: { en: "A drug molecule's handedness can make it life-saving or toxic." },
      res: [
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Stereochemistry" }, u: "https://www.khanacademy.org/science/organic-chemistry/stereochemistry-topic" },
      ],
      quiz: [
        { q: { en: "Enantiomers are related as..." }, o: { en: ["Mirror images", "Identical", "Isotopes"] }, a: 0 },
        { q: { en: "A chiral molecule rotates..." }, o: { en: ["Polarized light", "Sound", "A magnetic field"] }, a: 0 },
      ] },
    { id: "organic-synthesis", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["stereochemistry"],
      name: { en: "Organic Synthesis" },
      desc: { en: "Multi-step synthesis, retrosynthesis, protecting groups." },
      why: { en: "The art of building complex molecules by design." },
      res: [
        { role: "advanced", t: "course", r: 4, l: { en: "MIT 5.13 → Organic Chemistry II (OCW)" }, u: "https://ocw.mit.edu/courses/5-13-organic-chemistry-ii-fall-2006/" },
      ],
      quiz: null },
  ] },
  { id: "chem-inorganic", icon: "💎", w: 900, h: 420,
    name: { en: "Inorganic Chemistry" },
    desc: { en: "Coordination compounds, crystal field, descriptive chemistry" },
    nodes: [
    { id: "coordination-compounds", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Coordination Compounds" },
      desc: { en: "Complex ions, ligands, coordination number, nomenclature." },
      why: { en: "Hemoglobin, chlorophyll, coordination compounds of life." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 5.03 → Inorganic Chemistry (OCW)" }, u: "https://ocw.mit.edu/courses/5-03-principles-of-inorganic-chemistry-i-fall-2008/" },
      ],
      quiz: [
        { q: { en: "A ligand donates an..." }, o: { en: ["Electron pair", "Proton", "Neutron"] }, a: 0 },
        { q: { en: "Hemoglobin contains which metal?" }, o: { en: ["Iron (Fe)", "Copper (Cu)", "Zinc (Zn)"] }, a: 0 },
      ] },
    { id: "crystal-field", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["coordination-compounds"],
      name: { en: "Crystal Field Theory" },
      desc: { en: "d-orbital splitting, color, magnetic properties." },
      why: { en: "Why transition metal compounds are colored." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "LibreTexts → Crystal Field Theory" }, u: "https://chem.libretexts.org/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 5.03 → Crystal Field section (OCW)" }, u: "https://ocw.mit.edu/courses/5-03-principles-of-inorganic-chemistry-i-fall-2008/" },
      ],
      quiz: [
        { q: { en: "Crystal field theory explains complex..." }, o: { en: ["Color & magnetism", "Mass", "Density"] }, a: 0 },
        { q: { en: "Ligands split the..." }, o: { en: ["d-orbitals", "The nucleus", "Protons"] }, a: 0 },
      ] },
    { id: "descriptive-inorganic", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["crystal-field"],
      name: { en: "Descriptive Inorganic Chemistry" },
      desc: { en: "Main-group elements, transition metals, periodic trends." },
      why: { en: "The real properties of elements, key olympiad knowledge." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e: Representative Elements" }, u: "https://openstax.org/details/books/chemistry-2e" },
      ],
      quiz: null },
  ] },
  { id: "chem-analytical", icon: "🔬", w: 900, h: 420,
    name: { en: "Analytical Chemistry" },
    desc: { en: "Quantitative analysis, chromatography, spectroscopy" },
    nodes: [
    { id: "quant-analysis", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: [],
      name: { en: "Quantitative Analysis" },
      desc: { en: "Titration, gravimetry, error, statistical analysis." },
      why: { en: "The science of precisely measuring 'how much?'." },
      res: [
        { role: "secondary", t: "book", r: 4, l: { en: "LibreTexts → Analytical Chemistry" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: [
        { q: { en: "Titration determines the ___ of a solution" }, o: { en: ["Concentration", "Color", "Temperature"] }, a: 0 },
        { q: { en: "The equivalence point is where moles of acid and base are..." }, o: { en: ["Equal", "Zero", "Doubled"] }, a: 0 },
      ] },
    { id: "chromatography", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 300, diff: 3, prereqs: ["quant-analysis"],
      name: { en: "Chromatography" },
      desc: { en: "TLC, column, GC, HPLC, separating mixtures." },
      why: { en: "Separating complex mixtures into their components." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "LibreTexts: Chromatographic Methods (Harvey Ch.12)" }, u: "https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Analytical_Chemistry_2.1_(Harvey)/12:_Chromatographic_and_Electrophoretic_Methods" },
      ],
      quiz: [
        { q: { en: "Chromatography is used to..." }, o: { en: ["Separate mixtures", "Speed reactions", "Measure heat"] }, a: 0 },
        { q: { en: "HPLC separates compounds in a..." }, o: { en: ["Liquid", "Only solid", "Plasma"] }, a: 0 },
      ] },
    { id: "spectroscopy-methods", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["chromatography"],
      name: { en: "Spectroscopy" },
      desc: { en: "UV-Vis, IR, NMR, mass spectrometry, structure determination." },
      why: { en: "The key tools to determine molecular structure 'without seeing'." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "LibreTexts → Spectroscopy (UV-Vis, IR, NMR, MS)" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: null },
  ] },
  { id: "chem-oly-advanced", icon: "🎯", w: 900, h: 420,
    name: { en: "Advanced Problem Solving" },
    desc: { en: "Physical, organic, inorganic olympiad problems" },
    nodes: [
    { id: "oly-physical-problems", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "Physical Chemistry Problems" },
      desc: { en: "Thermodynamics, kinetics, equilibrium olympiad problems." },
      why: { en: "The largest share of the IChO theoretical exam." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (physical chem)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: [
        { q: { en: "A core topic of the IChO theory exam?" }, o: { en: ["Physical chemistry", "Only nomenclature", "History"] }, a: 0 },
        { q: { en: "Thermodynamics problems compute..." }, o: { en: ["ΔG, ΔH, ΔS", "Only pH", "Atomic number"] }, a: 0 },
      ] },
    { id: "oly-inorganic-problems", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["oly-physical-problems"],
      name: { en: "Inorganic & Descriptive Problems" },
      desc: { en: "Descriptive chemistry, coordination, crystal structure, stoichiometry." },
      why: { en: "The part demanding deep knowledge of element properties." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (inorganic)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: [
        { q: { en: "Descriptive chemistry studies the properties of..." }, o: { en: ["Elements", "Only gases", "Matrices"] }, a: 0 },
        { q: { en: "In a crystal structure, atoms are..." }, o: { en: ["Regularly repeating", "Random", "Gas-like"] }, a: 0 },
      ] },
    { id: "oly-organic-problems", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["oly-inorganic-problems"],
      name: { en: "Organic Olympiad Problems" },
      desc: { en: "Mechanisms, synthesis, structure elucidation, spectral analysis." },
      why: { en: "The most creative, challenging problems at the IChO." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (organic)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: null },
  ] },
  { id: "chem-oly-icho", icon: "🏅", w: 900, h: 420,
    name: { en: "IChO Preparation" },
    desc: { en: "Theory, laboratory, past problems" },
    nodes: [
    { id: "icho-theory-prep", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "IChO Theory Preparation" },
      desc: { en: "All theory-exam topics, time management, strategy." },
      why: { en: "The theory exam is 60% of the IChO medal." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO official syllabus & regulations" }, u: "https://www.ichosc.org/" },
      ],
      quiz: [
        { q: { en: "The IChO theory exam is what share of the score?" }, o: { en: ["~60%", "~10%", "~100%"] }, a: 0 },
        { q: { en: "The best preparation source is the..." }, o: { en: ["Preparatory Problems", "Wikipedia", "Only a textbook"] }, a: 0 },
      ] },
    { id: "icho-lab-skills", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["icho-theory-prep"],
      name: { en: "IChO Laboratory Skills" },
      desc: { en: "Titration, synthesis, separation, safety." },
      why: { en: "The practical exam is 40% of the medal." },
      res: [
        { role: "secondary", t: "book", r: 4, l: { en: "LibreTexts → Chemistry laboratory techniques" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: [
        { q: { en: "The IChO practical exam is what share?" }, o: { en: ["~40%", "~5%", "~90%"] }, a: 0 },
        { q: { en: "The first rule of the lab is..." }, o: { en: ["Safety", "Speed", "Color"] }, a: 0 },
      ] },
    { id: "icho-past-problems", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["icho-lab-skills"],
      name: { en: "IChO Past Problems" },
      desc: { en: "Full timed exams, review, fixing weaknesses." },
      why: { en: "The best way to prepare for real exam conditions." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO: all past problems (1968-2023)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: null },
  ] },
  { id: "chem-atomic", icon: "atom", w: 900, h: 420,
    name: { en: "Atomic Structure" },
    desc: { en: "Electron structure, orbitals, quantum numbers" },
    nodes: [
    { id: "atom-subatomic", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "Subatomic Particles" },
      desc: { en: "Protons, neutrons, electrons, isotopes, atomic mass." },
      why: { en: "Every element's identity starts with subatomic particles." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Build an Atom" }, u: "https://phet.colorado.edu/en/simulations/build-an-atom" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.2 (Atoms & Molecules)" }, u: "https://openstax.org/books/chemistry-2e/pages/2-introduction" },
      ],
      quiz: [
        { q: { en: "Isotopes differ in the number of..." }, o: { en: ["Neutrons", "Protons", "Electrons"] }, a: 0 },
        { q: { en: "Atomic number equals the number of..." }, o: { en: ["Protons", "Neutrons", "Mass"] }, a: 0 },
      ] },
    { id: "electron-config", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["atom-subatomic"],
      name: { en: "Electron Configuration" },
      desc: { en: "Orbitals, quantum numbers, Aufbau, Hund, Pauli." },
      why: { en: "Electron arrangement determines all element properties." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.6 (Electronic Structure)" }, u: "https://openstax.org/books/chemistry-2e/pages/6-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Electron configurations" }, u: "https://www.khanacademy.org/science/chemistry/electronic-structure-of-atoms" },
      ],
      quiz: [
        { q: { en: "The Aufbau principle: electrons fill from..." }, o: { en: ["Lowest energy up", "Highest energy down", "Randomly"] }, a: 0 },
        { q: { en: "Pauli: one orbital holds how many electrons?" }, o: { en: ["2", "1", "8"] }, a: 0 },
      ] },
    { id: "quantum-numbers", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 300, diff: 3, prereqs: ["electron-config"],
      name: { en: "Quantum Numbers & Orbitals" },
      desc: { en: "The n, l, mₗ, mₛ quantum numbers, orbital shapes." },
      why: { en: "The quantum model of the atom, deep chemical insight." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "LibreTexts → Quantum Numbers and Orbitals" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: null },
  ] },
  { id: "chem-periodic", icon: "network", w: 900, h: 420,
    name: { en: "The Periodic Table" },
    desc: { en: "Periodic law, trends, groups" },
    nodes: [
    { id: "periodic-law", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "The Periodic Law" },
      desc: { en: "Mendeleev, periods, groups, metals/nonmetals." },
      why: { en: "Chemistry's most powerful organizing tool." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.6.4 (Periodic Table)" }, u: "https://openstax.org/books/chemistry-2e/pages/6-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → The periodic table" }, u: "https://www.khanacademy.org/science/chemistry/periodic-table" },
      ],
      quiz: [
        { q: { en: "A vertical column is called a..." }, o: { en: ["Group", "Period", "Block"] }, a: 0 },
        { q: { en: "Who created the periodic table?" }, o: { en: ["Mendeleev", "Newton", "Darwin"] }, a: 0 },
      ] },
    { id: "periodic-trends", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["periodic-law"],
      name: { en: "Periodic Trends" },
      desc: { en: "Atomic radius, ionization energy, electronegativity." },
      why: { en: "Predicts element behavior from its position." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.6.5 (Periodic Trends)" }, u: "https://openstax.org/books/chemistry-2e/pages/6-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Periodic trends" }, u: "https://www.khanacademy.org/science/chemistry/periodic-table" },
      ],
      quiz: [
        { q: { en: "Down a group, atomic radius..." }, o: { en: ["Increases", "Decreases", "Constant"] }, a: 0 },
        { q: { en: "Electronegativity is highest at the..." }, o: { en: ["Top right", "Bottom left", "Center"] }, a: 0 },
      ] },
    { id: "periodic-groups", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: ["periodic-trends"],
      name: { en: "Chemistry of the Groups" },
      desc: { en: "Alkali metals, halogens, noble gases, transition metals." },
      why: { en: "Real element properties, key olympiad knowledge." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "LibreTexts → Descriptive Chemistry of the Elements" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: null },
  ] },
  { id: "chem-bonding-core", icon: "hexagon", w: 900, h: 420,
    name: { en: "Bonding & Molecular Geometry" },
    desc: { en: "Ionic, covalent bonds, VSEPR, hybridization" },
    nodes: [
    { id: "bond-types", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Types of Bonding" },
      desc: { en: "Ionic, covalent, metallic bonding, Lewis structures." },
      why: { en: "The fundamental principle of why atoms combine." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Molecule Shapes" }, u: "https://phet.colorado.edu/en/simulations/molecule-shapes" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.7 (Chemical Bonding)" }, u: "https://openstax.org/books/chemistry-2e/pages/7-introduction" },
      ],
      quiz: [
        { q: { en: "In a covalent bond, electrons are..." }, o: { en: ["Shared", "Transferred", "Destroyed"] }, a: 0 },
        { q: { en: "A Lewis structure shows..." }, o: { en: ["Valence electrons", "Neutrons", "Mass"] }, a: 0 },
      ] },
    { id: "vsepr-geometry", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["bond-types"],
      name: { en: "VSEPR & Molecular Geometry" },
      desc: { en: "Electron-pair repulsion, molecular shapes, polarity." },
      why: { en: "A molecule's shape determines all its properties." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Molecule Polarity" }, u: "https://phet.colorado.edu/en/simulations/molecule-polarity" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.7.6 (Molecular Structure)" }, u: "https://openstax.org/books/chemistry-2e/pages/7-introduction" },
      ],
      quiz: [
        { q: { en: "The shape of a water molecule?" }, o: { en: ["Bent", "Linear", "Tetrahedral"] }, a: 0 },
        { q: { en: "VSEPR predicts molecular..." }, o: { en: ["Shape", "Mass", "Color"] }, a: 0 },
      ] },
    { id: "hybridization", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["vsepr-geometry"],
      name: { en: "Hybridization & MO Theory" },
      desc: { en: "sp, sp², sp³ hybrids, molecular orbital theory." },
      why: { en: "The quantum-mechanical explanation of bonding and shape." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.8 (Advanced Bonding)" }, u: "https://openstax.org/books/chemistry-2e/pages/8-introduction" },
      ],
      quiz: null },
  ] },
  { id: "chem-stoichiometry", icon: "calculator", w: 900, h: 420,
    name: { en: "Stoichiometry" },
    desc: { en: "Moles, equations, yield, quantitative chemistry" },
    nodes: [
    { id: "mole-concept", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "The Mole Concept" },
      desc: { en: "The mole, Avogadro's number, molar mass, empirical formulas." },
      why: { en: "The base of quantitative chemistry, the mole is chemistry's 'dozen'." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.3 (Composition of Substances)" }, u: "https://openstax.org/books/chemistry-2e/pages/3-introduction" },
        { role: "secondary", t: "video", r: 5, l: { en: "Khan → The mole and Avogadro's number" }, u: "https://www.khanacademy.org/science/chemistry/chemical-reactions-stoichiome" },
      ],
      quiz: [
        { q: { en: "Avogadro's number?" }, o: { en: ["6.022×10²³", "3.14", "9.8"] }, a: 0 },
        { q: { en: "A mole measures the amount of..." }, o: { en: ["Substance (particle count)", "Only mass", "Volume"] }, a: 0 },
      ] },
    { id: "balancing-equations", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["mole-concept"],
      name: { en: "Balancing Equations" },
      desc: { en: "Mass conservation, coefficients, reaction types." },
      why: { en: "Correctly writing reactions quantitatively is essential." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Balancing Chemical Equations" }, u: "https://phet.colorado.edu/en/simulations/balancing-chemical-equations" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.4 (Stoichiometry of Reactions)" }, u: "https://openstax.org/books/chemistry-2e/pages/4-introduction" },
      ],
      quiz: [
        { q: { en: "Balancing obeys the conservation of..." }, o: { en: ["Mass", "Color", "Speed"] }, a: 0 },
        { q: { en: "Coefficients change the number of..." }, o: { en: ["Molecules/moles", "Atom type", "Charge"] }, a: 0 },
      ] },
    { id: "limiting-reagent", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["balancing-equations"],
      name: { en: "Limiting Reagent & Yield" },
      desc: { en: "Limiting reagent, theoretical/actual yield, percent yield." },
      why: { en: "The core of industrial and laboratory calculations." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.4.3–4.4 (Yields)" }, u: "https://openstax.org/books/chemistry-2e/pages/4-introduction" },
      ],
      quiz: null },
  ] },
  { id: "chem-solutions", icon: "droplet", w: 900, h: 420,
    name: { en: "Solutions" },
    desc: { en: "Concentration, solubility, colligative properties" },
    nodes: [
    { id: "concentration-units", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "Concentration Units" },
      desc: { en: "Molarity, molality, mass percent, dilution." },
      why: { en: "Quantifies how concentrated a solution is." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Concentration" }, u: "https://phet.colorado.edu/en/simulations/concentration" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.3.3, 11 (Solutions)" }, u: "https://openstax.org/books/chemistry-2e/pages/3-introduction" },
      ],
      quiz: [
        { q: { en: "Molarity is moles of solute per..." }, o: { en: ["Liter of solution", "Kg of solvent", "Gram"] }, a: 0 },
        { q: { en: "In dilution, what stays constant?" }, o: { en: ["Moles of solute", "Concentration", "Volume"] }, a: 0 },
      ] },
    { id: "solubility-factors", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["concentration-units"],
      name: { en: "Solubility" },
      desc: { en: "'Like dissolves like', temperature, pressure effects." },
      why: { en: "The ability to predict what dissolves in what." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.11.3 (Solubility)" }, u: "https://openstax.org/books/chemistry-2e/pages/11-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Solutions and solubility" }, u: "https://www.khanacademy.org/science/chemistry/states-of-matter-and-intermolecular-forces" },
      ],
      quiz: [
        { q: { en: "'Like dissolves like' refers to matching..." }, o: { en: ["Polarity", "Mass", "Color"] }, a: 0 },
        { q: { en: "Gas solubility as temperature rises..." }, o: { en: ["Decreases", "Increases", "Constant"] }, a: 0 },
      ] },
    { id: "colligative-props", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["solubility-factors"],
      name: { en: "Colligative Properties" },
      desc: { en: "Boiling point elevation, freezing point depression, osmotic pressure." },
      why: { en: "Road salt, cell osmosis, colligative properties in action." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.11.4 (Colligative Properties)" }, u: "https://openstax.org/books/chemistry-2e/pages/11-introduction" },
      ],
      quiz: null },
  ] },
  { id: "chem-kinetics", icon: "activity", w: 900, h: 420,
    name: { en: "Chemical Kinetics" },
    desc: { en: "Reaction rates, rate laws, catalysis" },
    nodes: [
    { id: "rate-basics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Reaction Rate Basics" },
      desc: { en: "Reaction rate, collision theory, activation energy." },
      why: { en: "Understanding HOW FAST reactions happen." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Reactions & Rates" }, u: "https://phet.colorado.edu/en/simulations/reactions-and-rates" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Chemistry 2e → Ch.12 (Kinetics)" }, u: "https://openstax.org/books/chemistry-2e/pages/12-introduction" },
      ],
      quiz: [
        { q: { en: "Activation energy is the minimum energy to..." }, o: { en: ["Start a reaction", "Stop a reaction", "Release heat"] }, a: 0 },
        { q: { en: "As temperature rises, reaction rate..." }, o: { en: ["Increases", "Decreases", "Constant"] }, a: 0 },
      ] },
    { id: "rate-laws-core", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 3, prereqs: ["rate-basics"],
      name: { en: "Rate Laws" },
      desc: { en: "Reaction order, rate constant, half-life." },
      why: { en: "Expresses reaction rate as a quantitative formula." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.12.3–12.4 (Rate Laws)" }, u: "https://openstax.org/books/chemistry-2e/pages/12-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Kinetics and rate laws" }, u: "https://www.khanacademy.org/science/chemistry/chem-kinetics" },
      ],
      quiz: [
        { q: { en: "For a first-order reaction, half-life is..." }, o: { en: ["Constant", "Depends on concentration", "Zero"] }, a: 0 },
        { q: { en: "A rate law relates rate to..." }, o: { en: ["Concentration", "Color", "Mass"] }, a: 0 },
      ] },
    { id: "catalysis-mechanisms", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["rate-laws-core"],
      name: { en: "Catalysis & Mechanisms" },
      desc: { en: "Reaction mechanisms, intermediates, catalysts." },
      why: { en: "Enzymes and industrial catalysis, life and technology." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Chemistry 2e → Ch.12.6–12.7 (Mechanisms, Catalysis)" }, u: "https://openstax.org/books/chemistry-2e/pages/12-introduction" },
      ],
      quiz: null },
  ] },
  { id: "chem-biochem", icon: "dna", w: 900, h: 420,
    name: { en: "Biochemistry" },
    desc: { en: "Biomolecules, enzymes, metabolism" },
    nodes: [
    { id: "biomolecules", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: [],
      name: { en: "Biomolecules" },
      desc: { en: "Proteins, carbohydrates, lipids, nucleic acids." },
      why: { en: "The structural building blocks of life's chemistry." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 5.07 → Biological Chemistry (OCW)" }, u: "https://ocw.mit.edu/courses/5-07sc-biological-chemistry-i-fall-2013/" },
      ],
      quiz: [
        { q: { en: "The building block of proteins?" }, o: { en: ["Amino acids", "Glucose", "Nucleotides"] }, a: 0 },
        { q: { en: "DNA is which biomolecule?" }, o: { en: ["Nucleic acid", "Protein", "Lipid"] }, a: 0 },
      ] },
    { id: "enzyme-catalysis", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["biomolecules"],
      name: { en: "Enzymes & Catalysis" },
      desc: { en: "Enzyme structure, Michaelis–Menten, active sites." },
      why: { en: "Enzymes catalyze all the reactions of life." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 5.07 → Enzymes section (OCW)" }, u: "https://ocw.mit.edu/courses/5-07sc-biological-chemistry-i-fall-2013/" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Enzymes and kinetics" }, u: "https://www.khanacademy.org/science/biology/energy-and-enzymes" },
      ],
      quiz: [
        { q: { en: "An enzyme lowers the..." }, o: { en: ["Activation energy", "Temperature", "Mass"] }, a: 0 },
        { q: { en: "Michaelis–Menten describes enzyme..." }, o: { en: ["Kinetics", "Only structure", "Color"] }, a: 0 },
      ] },
    { id: "metabolism", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["enzyme-catalysis"],
      name: { en: "Metabolism" },
      desc: { en: "Glycolysis, the Krebs cycle, oxidative phosphorylation, ATP." },
      why: { en: "The chemical pathways of how cells produce energy." },
      res: [
        { role: "advanced", t: "book", r: 4, l: { en: "OpenStax Biology 2e → Ch.7 (Cellular Respiration)" }, u: "https://openstax.org/books/biology-2e/pages/7-introduction" },
      ],
      quiz: null },
  ] },
  { id: "chem-quantum", icon: "atom", w: 900, h: 420,
    name: { en: "Quantum Chemistry" },
    desc: { en: "Schrödinger, orbitals, spectroscopic theory" },
    nodes: [
    { id: "schrodinger-chem", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "The Schrödinger Equation" },
      desc: { en: "Wavefunctions, particle in a box, the hydrogen atom." },
      why: { en: "The quantum-mechanical foundation of chemical bonding." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 5.61 → Quantum Mechanics section (OCW)" }, u: "https://ocw.mit.edu/courses/5-61-physical-chemistry-fall-2017/" },
      ],
      quiz: [
        { q: { en: "The wavefunction gives the ___ of finding a particle" }, o: { en: ["Probability", "Mass", "Charge"] }, a: 0 },
        { q: { en: "The Schrödinger equation solves for..." }, o: { en: ["Energy & wavefunction", "Only mass", "Color"] }, a: 0 },
      ] },
    { id: "molecular-orbitals-adv", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["schrodinger-chem"],
      name: { en: "Molecular Orbital Theory" },
      desc: { en: "LCAO, bonding/antibonding orbitals, bond order." },
      why: { en: "Explains molecular magnetism and spectra." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "LibreTexts → Molecular Orbital Theory" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: [
        { q: { en: "Why is O₂ paramagnetic?" }, o: { en: ["Unpaired electrons (MO)", "Ionic bond", "Mass"] }, a: 0 },
        { q: { en: "Bond order indicates bond..." }, o: { en: ["Strength", "Color", "Mass"] }, a: 0 },
      ] },
    { id: "computational-qchem", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["molecular-orbitals-adv"],
      name: { en: "Computational Quantum Chemistry" },
      desc: { en: "Hartree–Fock, DFT, ab initio methods, molecular modeling." },
      why: { en: "The modern way to predict molecules and reactions on a computer." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "LibreTexts → Computational Chemistry" }, u: "https://chem.libretexts.org/" },
        { role: "advanced", t: "course", r: 4, l: { en: "MIT 5.61 → Computational section (OCW)" }, u: "https://ocw.mit.edu/courses/5-61-physical-chemistry-fall-2017/" },
      ],
      quiz: null },
  ] },
  { id: "chem-materials", icon: "boxes", w: 900, h: 420,
    name: { en: "Materials Chemistry" },
    desc: { en: "Crystals, polymers, semiconductors, nano" },
    nodes: [
    { id: "crystal-structures", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: [],
      name: { en: "Crystal Structures" },
      desc: { en: "Crystal lattices, unit cells, close packing, defects." },
      why: { en: "A solid's properties come from its structure." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 3.091 → Intro to Solid State Chemistry (OCW)" }, u: "https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/" },
      ],
      quiz: [
        { q: { en: "Atoms in a crystal are arranged..." }, o: { en: ["In an ordered pattern", "Randomly", "Like a gas"] }, a: 0 },
        { q: { en: "A unit cell is the ___ repeating unit" }, o: { en: ["Smallest", "Largest", "Random"] }, a: 0 },
      ] },
    { id: "semiconductors-chem", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["crystal-structures"],
      name: { en: "Semiconductors" },
      desc: { en: "Band theory, doping, the p-n junction." },
      why: { en: "The chemical basis of all modern electronics." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 3.091 → Electronic Materials section (OCW)" }, u: "https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/" },
      ],
      quiz: [
        { q: { en: "Doping changes a semiconductor's..." }, o: { en: ["Conductivity", "Mass", "Only color"] }, a: 0 },
        { q: { en: "Band theory explains electrical..." }, o: { en: ["Conduction", "Mass", "Shape"] }, a: 0 },
      ] },
    { id: "nanomaterials", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["semiconductors-chem"],
      name: { en: "Nanomaterials" },
      desc: { en: "Nanoparticles, quantum dots, graphene, carbon nanotubes." },
      why: { en: "The most rapidly advancing frontier of materials science." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "LibreTexts → Nanomaterials and Nanochemistry" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: null },
  ] },
  { id: "chem-coordination", icon: "network", w: 900, h: 420,
    name: { en: "Coordination Chemistry" },
    desc: { en: "Complexes, ligands, crystal field, color" },
    nodes: [
    { id: "complex-ions-adv", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: [],
      name: { en: "Complex Ions" },
      desc: { en: "Central metals, ligands, coordination number, isomers." },
      why: { en: "The heart of transition metal chemistry." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 5.03 → Coordination Chemistry (OCW)" }, u: "https://ocw.mit.edu/courses/5-03-principles-of-inorganic-chemistry-i-fall-2008/" },
      ],
      quiz: [
        { q: { en: "A ligand donates ___ to the central metal" }, o: { en: ["An electron pair", "A proton", "A neutron"] }, a: 0 },
        { q: { en: "Coordination number is the number of..." }, o: { en: ["Ligand bonds", "Protons", "Electron shells"] }, a: 0 },
      ] },
    { id: "ligand-field-theory", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["complex-ions-adv"],
      name: { en: "Ligand Field Theory" },
      desc: { en: "d-orbital splitting, high/low spin, the spectrochemical series." },
      why: { en: "Explains the color and magnetism of coordination compounds." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "LibreTexts → Ligand Field Theory" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: [
        { q: { en: "Crystal field splitting determines..." }, o: { en: ["Color & spin", "Mass", "Nucleus"] }, a: 0 },
        { q: { en: "A strong-field ligand tends to give..." }, o: { en: ["Low spin", "High spin", "Zero spin"] }, a: 0 },
      ] },
    { id: "organometallic", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["ligand-field-theory"],
      name: { en: "Organometallic Chemistry" },
      desc: { en: "Metal–carbon bonds, the 18-electron rule, catalysis." },
      why: { en: "A powerful tool for industrial catalysis and synthesis." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Organic Chemistry: Organometallics" }, u: "https://openstax.org/details/books/organic-chemistry" },
      ],
      quiz: null },
  ] },
  { id: "chem-spectroscopy", icon: "gauge", w: 900, h: 420,
    name: { en: "Spectroscopy & Instrumental Analysis" },
    desc: { en: "UV-Vis, IR, NMR, mass spectrometry" },
    nodes: [
    { id: "uv-ir-spec", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: [],
      name: { en: "UV-Vis & IR Spectroscopy" },
      desc: { en: "Light absorption, functional group ID, Beer–Lambert." },
      why: { en: "A fast way to determine molecular structure and concentration." },
      res: [
        { role: "primary", t: "sim", s: 1, r: 5, l: { en: "PhET → Beer's Law Lab" }, u: "https://phet.colorado.edu/en/simulations/beers-law-lab" },
      ],
      quiz: [
        { q: { en: "IR spectroscopy identifies..." }, o: { en: ["Functional groups", "Only mass", "Nucleus"] }, a: 0 },
        { q: { en: "Beer–Lambert relates absorbance to..." }, o: { en: ["Concentration", "Mass", "Temperature"] }, a: 0 },
      ] },
    { id: "nmr-spec", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["uv-ir-spec"],
      name: { en: "NMR Spectroscopy" },
      desc: { en: "¹H and ¹³C NMR, chemical shift, spin-spin coupling." },
      why: { en: "The most powerful tool for determining organic structure." },
      res: [
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → NMR spectroscopy" }, u: "https://www.khanacademy.org/science/organic-chemistry/spectroscopy-jay" },
      ],
      quiz: [
        { q: { en: "NMR most commonly observes which nucleus?" }, o: { en: ["¹H (proton)", "Electron", "Neutron"] }, a: 0 },
        { q: { en: "Chemical shift reflects a nucleus's..." }, o: { en: ["Electronic environment", "Mass", "Charge"] }, a: 0 },
      ] },
    { id: "mass-spec", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["nmr-spec"],
      name: { en: "Mass Spectrometry" },
      desc: { en: "Ionization, mass/charge ratio, fragmentation patterns." },
      why: { en: "Determines molecular mass and structure; the basis of proteomics." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "LibreTexts: Intro to Mass Spectrometry (Van Bramer)" }, u: "https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/An_Introduction_to_Mass_Spectrometry_(Van_Bramer)" },
      ],
      quiz: null },
  ] },
  { id: "chem-medicinal", icon: "flask-conical", w: 900, h: 420,
    name: { en: "Medicinal Chemistry" },
    desc: { en: "Drug design, targets, pharmacology" },
    nodes: [
    { id: "drug-targets", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: [],
      name: { en: "Drug Targets" },
      desc: { en: "Receptors, enzymes, drug–target interactions." },
      why: { en: "The molecular basis of how drugs act on the body." },
      res: [
        { role: "secondary", t: "book", r: 4, l: { en: "LibreTexts → Medicinal Chemistry" }, u: "https://chem.libretexts.org/" },
      ],
      quiz: [
        { q: { en: "Most drugs interact with..." }, o: { en: ["Protein targets", "Metals", "Gases"] }, a: 0 },
        { q: { en: "The 'lock and key' model describes..." }, o: { en: ["Drug–receptor fit", "Mass", "Color"] }, a: 0 },
      ] },
    { id: "drug-design", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["drug-targets"],
      name: { en: "Drug Design" },
      desc: { en: "Structure-activity relationships (SAR), pharmacophores, optimization." },
      why: { en: "The scientific process of inventing new drugs." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Organic Chemistry: drug molecules" }, u: "https://openstax.org/details/books/organic-chemistry" },
      ],
      quiz: [
        { q: { en: "SAR studies the link between structure and..." }, o: { en: ["Activity", "Mass", "Color"] }, a: 0 },
        { q: { en: "A pharmacophore is the part of a molecule responsible for its..." }, o: { en: ["Biological activity", "Color", "Mass"] }, a: 0 },
      ] },
    { id: "pharmacokinetics", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["drug-design"],
      name: { en: "Pharmacokinetics" },
      desc: { en: "Absorption, distribution, metabolism, excretion (ADME)." },
      why: { en: "Determines how a drug travels through the body." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Organic Chemistry: drug metabolism" }, u: "https://openstax.org/details/books/organic-chemistry" },
      ],
      quiz: null },
  ] },
  { id: "chem-oly-physical", icon: "thermometer", w: 900, h: 420,
    name: { en: "Olympiad Physical Chemistry" },
    desc: { en: "Thermodynamics, kinetics, equilibrium problems" },
    nodes: [
    { id: "pchem-oly-thermo", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Thermodynamics Problems" },
      desc: { en: "ΔG, ΔH, ΔS calculations, links to equilibrium constants." },
      why: { en: "The largest part of the IChO theory exam." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (thermodynamics)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: [
        { q: { en: "If ΔG < 0, the reaction is..." }, o: { en: ["Spontaneous", "Impossible", "At equilibrium"] }, a: 0 },
        { q: { en: "ΔG° and K are related through..." }, o: { en: ["−RT ln K", "ma", "IR"] }, a: 0 },
      ] },
    { id: "pchem-oly-kinetics", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["pchem-oly-thermo"],
      name: { en: "Kinetics Problems" },
      desc: { en: "Determining rate laws, mechanisms, Arrhenius." },
      why: { en: "Requires deriving rate laws from data." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (kinetics)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: [
        { q: { en: "Rate laws are derived from..." }, o: { en: ["Experimental data", "Atomic mass", "Color"] }, a: 0 },
        { q: { en: "Arrhenius relates rate constant to..." }, o: { en: ["Temperature", "Mass", "Volume"] }, a: 0 },
      ] },
    { id: "pchem-oly-equilibrium", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["pchem-oly-kinetics"],
      name: { en: "Equilibrium & Electrochemistry Problems" },
      desc: { en: "Acid-base, solubility, Nernst, cell potentials." },
      why: { en: "Multi-step equilibrium problems are common at the IChO." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (equilibrium & electro)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: null },
  ] },
  { id: "chem-oly-organic", icon: "hexagon", w: 900, h: 420,
    name: { en: "Olympiad Organic Chemistry" },
    desc: { en: "Mechanisms, synthesis, spectral problems" },
    nodes: [
    { id: "organic-oly-mechanisms", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Mechanism Problems" },
      desc: { en: "Arrow pushing, intermediates, regio/stereoselectivity." },
      why: { en: "The core skill of the IChO organic section." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (mechanisms)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: [
        { q: { en: "Curved arrows show the movement of..." }, o: { en: ["Electrons", "Atoms", "Only protons"] }, a: 0 },
        { q: { en: "Regioselectivity determines the ___ of addition" }, o: { en: ["Position", "Rate", "Mass"] }, a: 0 },
      ] },
    { id: "organic-oly-synthesis", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["organic-oly-mechanisms"],
      name: { en: "Synthesis Problems" },
      desc: { en: "Multi-step synthesis, retrosynthesis, 'black box' problems." },
      why: { en: "The most creative and difficult IChO problems." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (synthesis)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: [
        { q: { en: "Retrosynthesis works backward from the..." }, o: { en: ["Target molecule", "The reagent", "The catalyst"] }, a: 0 },
        { q: { en: "Multi-step synthesis requires ___ of reactions" }, o: { en: ["Planning a sequence", "Random choice", "Only one"] }, a: 0 },
      ] },
    { id: "organic-oly-spectra", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["organic-oly-synthesis"],
      name: { en: "Spectral Elucidation Problems" },
      desc: { en: "Determining structure from IR, NMR, MS data." },
      why: { en: "Reconstructing molecules from spectra, a classic olympiad problem." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO competition problems (spectra)" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: null },
  ] },
  { id: "chem-oly-lab", icon: "test-tube", w: 900, h: 420,
    name: { en: "Laboratory Techniques" },
    desc: { en: "Titration, synthesis, separation, qualitative analysis" },
    nodes: [
    { id: "lab-titration", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Titration Techniques" },
      desc: { en: "Acid-base, redox, complexometric, potentiometric titration." },
      why: { en: "The most common skill in the IChO practical exam." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "LibreTexts: Analytical Chemistry (titrations, Harvey)" }, u: "https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Analytical_Chemistry_2.1_(Harvey)" },
      ],
      quiz: [
        { q: { en: "The equivalence point is where reactant moles are..." }, o: { en: ["Stoichiometrically equal", "Zero", "Doubled"] }, a: 0 },
        { q: { en: "An indicator signals the..." }, o: { en: ["Endpoint", "Mass", "Temperature"] }, a: 0 },
      ] },
    { id: "lab-synthesis", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["lab-titration"],
      name: { en: "Synthesis & Purification" },
      desc: { en: "Reflux, crystallization, distillation, TLC, yield calculation." },
      why: { en: "The practical skill of making and purifying real compounds." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Organic Chemistry: synthesis" }, u: "https://openstax.org/details/books/organic-chemistry" },
      ],
      quiz: [
        { q: { en: "Crystallization is used to..." }, o: { en: ["Purify", "Heat", "Measure"] }, a: 0 },
        { q: { en: "TLC checks reaction..." }, o: { en: ["Progress/purity", "Temperature", "Mass"] }, a: 0 },
      ] },
    { id: "lab-analysis", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["lab-synthesis"],
      name: { en: "Qualitative Analysis" },
      desc: { en: "Cation/anion identification, analysis schemes, safety." },
      why: { en: "Identifying an unknown, a classic olympiad task." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "LibreTexts: Analytical Chemistry (analysis, Harvey)" }, u: "https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Analytical_Chemistry_2.1_(Harvey)" },
      ],
      quiz: null },
  ] },
  { id: "chem-oly-past", icon: "award", w: 900, h: 420,
    name: { en: "Past IChO Problems" },
    desc: { en: "Full exams, review, mock tests" },
    nodes: [
    { id: "icho-mock-theory", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "Mock Theory Exams" },
      desc: { en: "Working past years' theory exams under time." },
      why: { en: "The best way to adapt to real exam conditions." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO past theoretical exams" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: [
        { q: { en: "The main goal of mock exams?" }, o: { en: ["Adapt to time & conditions", "Only reading", "Taking notes"] }, a: 0 },
        { q: { en: "After an exam, it's important to..." }, o: { en: ["Analyze mistakes", "Forget it", "Never retry"] }, a: 0 },
      ] },
    { id: "icho-mock-practical", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["icho-mock-theory"],
      name: { en: "Mock Practical Exams" },
      desc: { en: "Lab tasks under time, with safety." },
      why: { en: "The practical exam is 40% of the medal." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO past practical exams" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: [
        { q: { en: "The practical exam is what share of the medal?" }, o: { en: ["~40%", "~5%", "~90%"] }, a: 0 },
        { q: { en: "The first rule of the lab?" }, o: { en: ["Safety", "Speed", "Color"] }, a: 0 },
      ] },
    { id: "icho-full-mock", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["icho-mock-practical"],
      name: { en: "Full IChO Simulation" },
      desc: { en: "A complete timed simulation of theory + practical, with review." },
      why: { en: "The final step to confirm you're ready for the international." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IChO full competition problems & solutions" }, u: "https://icho.sk/competition-problems/" },
      ],
      quiz: null },
  ] },
  ],
  planned: [],
  paths: [
    { id: "core", icon: "🧪", tag: { en: "Core" },
      name: { en: "Core Learning" },
      desc: { en: "Build a strong chemistry foundation for university STEM, medicine, engineering, and life sciences." },
      branches: ["chem-general", "chem-atomic", "chem-periodic", "chem-bonding-core", "chem-stoichiometry", "chem-matter", "chem-solutions", "chem-thermochem", "chem-kinetics", "chem-equilibrium", "chem-acids", "chem-electro", "chem-organic"] },
    { id: "university", icon: "🎓", tag: { en: "University" },
      name: { en: "University & Research" },
      desc: { en: "Advanced chemistry for university study, scientific research, and specialized fields of chemistry." },
      branches: ["chem-physical", "chem-organic-adv", "chem-inorganic", "chem-analytical", "chem-biochem", "chem-quantum", "chem-materials", "chem-coordination", "chem-spectroscopy", "chem-medicinal"] },
    { id: "olympiad", icon: "🏅", tag: { en: "Olympiad" },
      name: { en: "Olympiad Chemistry" },
      desc: { en: "Advanced chemistry problem-solving curriculum for national and international chemistry olympiads." },
      branches: ["chem-oly-physical", "chem-oly-organic", "chem-oly-lab", "chem-oly-advanced", "chem-oly-past", "chem-oly-icho"] },
  ],
},
{
  id: "biology", icon: "🧬", hue: "#16a34a",
  name: { en: "Biology" },
  desc: { en: "Cells, genetics, molecular biology, physiology, and ecology." },
  branches: [
  { id: "bio-molecular", icon: "🧬", w: 900, h: 620,
    name: { en: "Molecular & Cell Biology" },
    desc: { en: "The foundation path of life, toward the IBO" },
    nodes: [
    { id: "cell-biology", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: [],
      name: { en: "Cell Biology" },
      desc: { en: "Cells, organelles, membranes." },
      why: { en: "The cell is the smallest unit of life." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Khan → Biology · Cells unit" }, u: "https://www.khanacademy.org/science/biology/structure-of-a-cell" },
        { t: "book", r: 5, l: { en: "OpenStax Biology 2e → Ch.4-5 (Cell Structure)" }, u: "https://openstax.org/books/biology-2e/pages/4-introduction" },
        { t: "video", r: 5, l: { en: "Amoeba Sisters → Cell playlist · intro video" }, u: "https://www.youtube.com/c/AmoebaSisters" },
      ],
      notes: { en: ["Prokaryote vs eukaryote", "Mitochondria = the power plant", "The membrane = a selective gate"] },
      quiz: [
        { q: { en: "The cell's 'power plant'?" }, o: { en: ["Mitochondria", "Nucleus", "Membrane"] }, a: 0 },
        { q: { en: "Bacteria are which cell type?" }, o: { en: ["Prokaryote", "Eukaryote", "Virus"] }, a: 0 },
      ] },
    { id: "genetics", stage: "a", pos: [450, 205], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["cell-biology"],
      name: { en: "Genetics" },
      desc: { en: "DNA, heredity, Mendel's laws." },
      why: { en: "The core of modern biology and medicine." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.11-13 (Genetics, DNA)" }, u: "https://openstax.org/books/biology-2e/pages/11-introduction" },
        { t: "video", r: 5, l: { en: "Amoeba Sisters → DNA & Heredity playlist" }, u: "https://www.youtube.com/c/AmoebaSisters" },
        { t: "course", r: 4, l: { en: "Khan → Biology · Classical genetics unit" }, u: "https://www.khanacademy.org/science/biology/classical-genetics" },
      ],
      notes: { en: ["DNA → RNA → protein (central dogma)", "Dominant vs recessive alleles", "A Punnett square predicts inheritance"] },
      quiz: [
        { q: { en: "The central dogma?" }, o: { en: ["DNA→RNA→protein", "Protein→DNA", "RNA→DNA→sugar"] }, a: 0 },
        { q: { en: "The letters of DNA?" }, o: { en: ["A, T, G, C", "A, B, C, D", "X, Y, Z"] }, a: 0 },
      ] },
    { id: "physiology", stage: "a", pos: [260, 360], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: ["cell-biology"],
      name: { en: "Physiology" },
      desc: { en: "How organ systems work." },
      why: { en: "A big part of the IBO; the basis of medicine." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.33-37 (Animal Systems)" }, u: "https://openstax.org/books/biology-2e/pages/33-introduction" },
        { t: "video", r: 4, l: { en: "Khan → Human biology lessons" }, u: "https://www.khanacademy.org/science/biology/human-biology" },
      ],
      notes: { en: ["Homeostasis = internal balance", "Systems are interconnected", "Structure follows function"] },
      quiz: [
        { q: { en: "Stability of the internal environment?" }, o: { en: ["Homeostasis", "Mitosis", "Osmosis"] }, a: 0 },
        { q: { en: "Cell that carries oxygen in blood?" }, o: { en: ["Red blood cell", "Neuron", "Skin cell"] }, a: 0 },
      ] },
    { id: "bio-olympiad", stage: "o", pos: [640, 360], weeks: 5, h: 25, xp: 300, diff: 3, prereqs: ["genetics"],
      name: { en: "IBO Preparation" },
      desc: { en: "International Biology Olympiad problems." },
      why: { en: "Mongolia competes at the IBO." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO → past papers" }, u: "https://www.ibo-info.org/en/info/past-competitions.html" },
      ],
      notes: { en: ["See IBO on the Competitions page", "Practical lab skills matter"] },
      quiz: null },
  ] },
  { id: "bio-cell", icon: "circle", w: 900, h: 420,
    name: { en: "Cell Biology" },
    desc: { en: "Cells, organelles, membranes, cell division" },
    nodes: [
    { id: "cell-theory", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "Cell Theory" },
      desc: { en: "Prokaryotic/eukaryotic cells, cell theory, organelles." },
      why: { en: "The cell is the smallest unit of life, biology's foundation." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Amoeba Sisters → Cells playlist" }, u: "https://www.youtube.com/c/AmoebaSisters" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Biology 2e → Ch.4 (Cell Structure)" }, u: "https://openstax.org/books/biology-2e/pages/4-introduction" },
      ],
      quiz: [
        { q: { en: "A eukaryotic cell is defined by having a..." }, o: { en: ["Nucleus", "No wall", "Chlorophyll"] }, a: 0 },
        { q: { en: "Mitochondria produce..." }, o: { en: ["ATP energy", "Only DNA", "Only protein"] }, a: 0 },
      ] },
    { id: "cell-membrane-transport", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["cell-theory"],
      name: { en: "Membranes & Transport" },
      desc: { en: "Lipid bilayers, diffusion, osmosis, active transport." },
      why: { en: "How a cell controls what enters and leaves." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.5 (Membranes)" }, u: "https://openstax.org/books/biology-2e/pages/5-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Membranes and transport" }, u: "https://www.khanacademy.org/science/biology/membranes-and-transport" },
      ],
      quiz: [
        { q: { en: "Osmosis is the diffusion of..." }, o: { en: ["Water", "Protein", "DNA"] }, a: 0 },
        { q: { en: "Active transport requires..." }, o: { en: ["Energy (ATP)", "Nothing", "Light"] }, a: 0 },
      ] },
    { id: "cell-division", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["cell-membrane-transport"],
      name: { en: "Cell Division" },
      desc: { en: "The cell cycle, mitosis, meiosis, the basis of cancer." },
      why: { en: "The cellular basis of growth, repair, and reproduction." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.10–11 (Cell Division)" }, u: "https://openstax.org/books/biology-2e/pages/10-introduction" },
      ],
      quiz: null },
  ] },
  { id: "bio-genetics", icon: "git-branch", w: 900, h: 420,
    name: { en: "Genetics" },
    desc: { en: "Heredity, DNA, gene expression" },
    nodes: [
    { id: "mendelian-genetics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Mendelian Genetics" },
      desc: { en: "Laws of inheritance, alleles, Punnett squares, dominant/recessive." },
      why: { en: "How traits pass from generation to generation." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Amoeba Sisters → Genetics playlist" }, u: "https://www.youtube.com/c/AmoebaSisters" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Biology 2e → Ch.12 (Mendel)" }, u: "https://openstax.org/books/biology-2e/pages/12-introduction" },
      ],
      quiz: [
        { q: { en: "An allele is a version of a..." }, o: { en: ["Gene", "Cell", "Protein"] }, a: 0 },
        { q: { en: "A Punnett square predicts offspring..." }, o: { en: ["Genotypes", "Age", "Size"] }, a: 0 },
      ] },
    { id: "dna-replication", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["mendelian-genetics"],
      name: { en: "DNA & Replication" },
      desc: { en: "DNA structure, the double helix, replication, mutations." },
      why: { en: "The molecule that stores and copies life's genetic code." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.14 (DNA)" }, u: "https://openstax.org/books/biology-2e/pages/14-introduction" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 7.014 → Molecular Biology (OCW)" }, u: "https://ocw.mit.edu/courses/7-014-introductory-biology-spring-2005/" },
      ],
      quiz: [
        { q: { en: "DNA has what shape?" }, o: { en: ["Double helix", "Cube", "Sphere"] }, a: 0 },
        { q: { en: "Base A pairs with..." }, o: { en: ["T", "G", "C"] }, a: 0 },
      ] },
    { id: "gene-expression", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["dna-replication"],
      name: { en: "Gene Expression" },
      desc: { en: "Transcription, translation, the genetic code, regulation." },
      why: { en: "How genes become proteins and build life." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.15–16 (Gene Expression)" }, u: "https://openstax.org/books/biology-2e/pages/15-introduction" },
      ],
      quiz: null },
  ] },
  { id: "bio-evolution", icon: "git-branch", w: 900, h: 420,
    name: { en: "Evolution" },
    desc: { en: "Natural selection, evidence, speciation" },
    nodes: [
    { id: "natural-selection", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Natural Selection" },
      desc: { en: "Darwin, adaptation, fitness, the drivers of evolution." },
      why: { en: "The unifying theory explaining life's diversity." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Amoeba Sisters → Natural Selection" }, u: "https://www.youtube.com/c/AmoebaSisters" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenStax Biology 2e → Ch.18–19 (Evolution)" }, u: "https://openstax.org/books/biology-2e/pages/18-introduction" },
      ],
      quiz: [
        { q: { en: "Who proposed natural selection?" }, o: { en: ["Darwin", "Mendel", "Newton"] }, a: 0 },
        { q: { en: "Fitness in biology means..." }, o: { en: ["Reproductive success", "Strength", "Speed"] }, a: 0 },
      ] },
    { id: "evidence-evolution", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["natural-selection"],
      name: { en: "Evidence for Evolution" },
      desc: { en: "Fossils, homology, molecular evidence, phylogeny." },
      why: { en: "Why evolution is such robust scientific fact." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.20 (Phylogenies)" }, u: "https://openstax.org/books/biology-2e/pages/20-introduction" },
      ],
      quiz: [
        { q: { en: "Homologous structures suggest a..." }, o: { en: ["Common ancestor", "Same environment", "Chance"] }, a: 0 },
        { q: { en: "A phylogenetic tree shows evolutionary..." }, o: { en: ["Relationships", "Only age", "Size"] }, a: 0 },
      ] },
    { id: "speciation-genetics", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["evidence-evolution"],
      name: { en: "Speciation & Population Genetics" },
      desc: { en: "Hardy–Weinberg, gene flow, drift, speciation." },
      why: { en: "The genetic mechanism of how new species arise." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.19 (Population Genetics)" }, u: "https://openstax.org/books/biology-2e/pages/19-introduction" },
      ],
      quiz: null },
  ] },
  { id: "bio-ecology", icon: "wind", w: 900, h: 420,
    name: { en: "Ecology" },
    desc: { en: "Ecosystems, populations, biodiversity" },
    nodes: [
    { id: "ecosystems", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "Ecosystems" },
      desc: { en: "Food webs, energy flow, nutrient cycles." },
      why: { en: "How living and non-living worlds interact." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.46 (Ecosystems)" }, u: "https://openstax.org/books/biology-2e/pages/46-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Ecology" }, u: "https://www.khanacademy.org/science/biology/ecology" },
      ],
      quiz: [
        { q: { en: "Energy in an ecosystem originates from the..." }, o: { en: ["Sun", "Soil", "Water"] }, a: 0 },
        { q: { en: "A producer is an organism that..." }, o: { en: ["Makes its own food", "Eats others", "Decomposes"] }, a: 0 },
      ] },
    { id: "population-ecology", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["ecosystems"],
      name: { en: "Population Ecology" },
      desc: { en: "Population growth, carrying capacity, interactions." },
      why: { en: "Models of how populations grow and are limited." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.45 (Population Ecology)" }, u: "https://openstax.org/books/biology-2e/pages/45-introduction" },
      ],
      quiz: [
        { q: { en: "Carrying capacity (K) is the maximum ___ an environment supports" }, o: { en: ["Population", "Temperature", "Area"] }, a: 0 },
        { q: { en: "Exponential growth occurs with ___ resources" }, o: { en: ["Unlimited", "Limited", "Zero"] }, a: 0 },
      ] },
    { id: "biodiversity-conservation", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: ["population-ecology"],
      name: { en: "Biodiversity & Conservation" },
      desc: { en: "Biodiversity, habitat loss, conservation." },
      why: { en: "The scientific basis of protecting life on Earth." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.47 (Conservation)" }, u: "https://openstax.org/books/biology-2e/pages/47-introduction" },
      ],
      quiz: null },
  ] },
  { id: "bio-anatomy", icon: "activity", w: 900, h: 420,
    name: { en: "Human Anatomy & Physiology" },
    desc: { en: "Organ systems, homeostasis, function" },
    nodes: [
    { id: "body-organization", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: [],
      name: { en: "Body Organization" },
      desc: { en: "Tissues, organs, organ systems, homeostasis." },
      why: { en: "How the body is organized and maintains balance." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Anatomy & Physiology → Ch.1 (Intro)" }, u: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Human anatomy and physiology" }, u: "https://www.khanacademy.org/science/health-and-medicine" },
      ],
      quiz: [
        { q: { en: "Homeostasis is maintaining a stable internal..." }, o: { en: ["Environment", "Size", "Color"] }, a: 0 },
        { q: { en: "Organs are made of..." }, o: { en: ["Tissues", "Only molecules", "One cell"] }, a: 0 },
      ] },
    { id: "major-systems", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 2, prereqs: ["body-organization"],
      name: { en: "Major Body Systems" },
      desc: { en: "Circulatory, respiratory, digestive, excretory." },
      why: { en: "How the organ systems that keep us alive function." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Anatomy & Physiology → systems chapters" }, u: "https://openstax.org/details/books/anatomy-and-physiology-2e" },
      ],
      quiz: [
        { q: { en: "The heart belongs to which system?" }, o: { en: ["Circulatory", "Respiratory", "Digestive"] }, a: 0 },
        { q: { en: "The lungs exchange..." }, o: { en: ["Gases (O₂/CO₂)", "Only water", "Food"] }, a: 0 },
      ] },
    { id: "nervous-endocrine", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["major-systems"],
      name: { en: "Nervous & Endocrine Systems" },
      desc: { en: "Neurons, action potentials, hormones, regulation." },
      why: { en: "The two systems that control and coordinate the body." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Anatomy & Physiology → Ch.12–17 (Nervous, Endocrine)" }, u: "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-introduction" },
      ],
      quiz: null },
  ] },
  { id: "bio-plant", icon: "wind", w: 900, h: 420,
    name: { en: "Plant Biology" },
    desc: { en: "Plant structure, photosynthesis, transport" },
    nodes: [
    { id: "plant-structure", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "Plant Structure" },
      desc: { en: "Roots, stems, leaves, plant tissues." },
      why: { en: "How plants are built and how they work." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.30 (Plant Form)" }, u: "https://openstax.org/books/biology-2e/pages/30-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Plant biology" }, u: "https://www.khanacademy.org/science/biology/plant-biology" },
      ],
      quiz: [
        { q: { en: "Leaves are the main site of..." }, o: { en: ["Photosynthesis", "Anchoring", "Reproduction"] }, a: 0 },
        { q: { en: "Roots absorb..." }, o: { en: ["Water and minerals", "Light", "Only CO₂"] }, a: 0 },
      ] },
    { id: "photosynthesis-core", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["plant-structure"],
      name: { en: "Photosynthesis" },
      desc: { en: "Light reactions, the Calvin cycle, chlorophyll." },
      why: { en: "The process that feeds nearly all life on Earth." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.8 (Photosynthesis)" }, u: "https://openstax.org/books/biology-2e/pages/8-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Amoeba Sisters → Photosynthesis" }, u: "https://www.youtube.com/c/AmoebaSisters" },
      ],
      quiz: [
        { q: { en: "Photosynthesis produces glucose and..." }, o: { en: ["Oxygen", "Nitrogen", "Methane"] }, a: 0 },
        { q: { en: "Chlorophyll absorbs..." }, o: { en: ["Light", "Only water", "Soil"] }, a: 0 },
      ] },
    { id: "plant-transport-repro", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["photosynthesis-core"],
      name: { en: "Transport & Reproduction" },
      desc: { en: "Xylem, phloem, transpiration, flowers, pollination." },
      why: { en: "How plants move materials and reproduce." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.30–32 (Transport, Reproduction)" }, u: "https://openstax.org/books/biology-2e/pages/30-introduction" },
      ],
      quiz: null },
  ] },
  { id: "bio-microbiology", icon: "circle", w: 900, h: 420,
    name: { en: "Microbiology" },
    desc: { en: "Bacteria, viruses, microbial growth" },
    nodes: [
    { id: "microbes-intro", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 150, diff: 1, prereqs: [],
      name: { en: "The Microbial World" },
      desc: { en: "Bacteria, archaea, viruses, fungi, protists." },
      why: { en: "The most numerous and ancient life on Earth." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Microbiology → Ch.1–4" }, u: "https://openstax.org/books/microbiology/pages/1-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Amoeba Sisters → Microbes" }, u: "https://www.youtube.com/c/AmoebaSisters" },
      ],
      quiz: [
        { q: { en: "Bacteria are which cell type?" }, o: { en: ["Prokaryotic", "Eukaryotic", "Viral"] }, a: 0 },
        { q: { en: "Do viruses require a living cell to replicate?" }, o: { en: ["Yes", "No", "Sometimes"] }, a: 0 },
      ] },
    { id: "bacterial-structure", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["microbes-intro"],
      name: { en: "Bacterial Structure & Growth" },
      desc: { en: "Cell walls, Gram staining, growth curves, metabolism." },
      why: { en: "The practical basis of microbiology and medicine." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Microbiology → Ch.3, 9 (Structure, Growth)" }, u: "https://openstax.org/books/microbiology/pages/3-introduction" },
      ],
      quiz: [
        { q: { en: "Gram staining distinguishes bacterial..." }, o: { en: ["Cell walls", "Size", "Speed"] }, a: 0 },
        { q: { en: "Bacteria reproduce by..." }, o: { en: ["Binary fission", "Meiosis", "Pollination"] }, a: 0 },
      ] },
    { id: "microbes-disease", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["bacterial-structure"],
      name: { en: "Microbes & Disease" },
      desc: { en: "Pathogens, immunity, antibiotics, resistance." },
      why: { en: "The basis of infectious disease and therapeutic microbiology." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Microbiology → Ch.15–16 (Disease, Antimicrobials)" }, u: "https://openstax.org/books/microbiology/pages/15-introduction" },
      ],
      quiz: null },
  ] },
  { id: "bio-biochem-intro", icon: "flask-conical", w: 900, h: 420,
    name: { en: "Biochemistry Fundamentals" },
    desc: { en: "Biomolecules, enzymes, cellular respiration" },
    nodes: [
    { id: "biomolecules-bio", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Molecules of Life" },
      desc: { en: "Carbohydrates, lipids, proteins, nucleic acids." },
      why: { en: "The four major molecular classes that make up life." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.3 (Biological Macromolecules)" }, u: "https://openstax.org/books/biology-2e/pages/3-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "Amoeba Sisters → Biomolecules" }, u: "https://www.youtube.com/c/AmoebaSisters" },
      ],
      quiz: [
        { q: { en: "The monomer of proteins?" }, o: { en: ["Amino acids", "Glucose", "Nucleotides"] }, a: 0 },
        { q: { en: "Lipids are ___ in water" }, o: { en: ["Insoluble", "Soluble", "Gaseous"] }, a: 0 },
      ] },
    { id: "enzymes-bio", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 250, diff: 2, prereqs: ["biomolecules-bio"],
      name: { en: "Enzymes" },
      desc: { en: "Enzymes, activation energy, active sites, regulation." },
      why: { en: "The biological catalysts that make life's reactions possible." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.6.5 (Enzymes)" }, u: "https://openstax.org/books/biology-2e/pages/6-introduction" },
      ],
      quiz: [
        { q: { en: "Enzymes lower the..." }, o: { en: ["Activation energy", "Temperature", "Mass"] }, a: 0 },
        { q: { en: "Most enzymes are..." }, o: { en: ["Proteins", "Lipids", "Carbohydrates"] }, a: 0 },
      ] },
    { id: "cellular-respiration", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["enzymes-bio"],
      name: { en: "Cellular Respiration" },
      desc: { en: "Glycolysis, the Krebs cycle, the electron transport chain, ATP." },
      why: { en: "The biochemistry of how cells extract energy from glucose." },
      res: [
        { role: "primary", t: "textbook", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.7 (Cellular Respiration)" }, u: "https://openstax.org/books/biology-2e/pages/7-introduction" },
      ],
      quiz: null },
  ] },
  { id: "bio-molecular-adv", icon: "git-branch", w: 900, h: 420,
    name: { en: "Molecular Biology" },
    desc: { en: "Gene regulation, recombinant DNA, CRISPR" },
    nodes: [
    { id: "gene-regulation-adv", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Gene Regulation" },
      desc: { en: "Operons, transcription factors, epigenetics." },
      why: { en: "Why cells with identical genomes become different." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 7.06 → Cell Biology · Gene Regulation (OCW)" }, u: "https://ocw.mit.edu/courses/7-06-cell-biology-spring-2007/" },
      ],
      quiz: [
        { q: { en: "Epigenetics changes gene expression without changing the..." }, o: { en: ["DNA sequence", "Cell", "Organism"] }, a: 0 },
        { q: { en: "Transcription factors control..." }, o: { en: ["Gene transcription", "Only division", "Size"] }, a: 0 },
      ] },
    { id: "recombinant-dna", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["gene-regulation-adv"],
      name: { en: "Recombinant DNA" },
      desc: { en: "Restriction enzymes, cloning, PCR, vectors." },
      why: { en: "The foundation of modern biotechnology and genetic engineering." },
      res: [
        { role: "secondary", t: "video", r: 4, l: { en: "iBiology → DNA technology lectures" }, u: "https://www.ibiology.org/" },
      ],
      quiz: [
        { q: { en: "PCR is used to ___ DNA" }, o: { en: ["Amplify", "Destroy", "Stain"] }, a: 0 },
        { q: { en: "Restriction enzymes ___ DNA" }, o: { en: ["Cut at specific sites", "Glue", "Read"] }, a: 0 },
      ] },
    { id: "crispr-genome-editing", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["recombinant-dna"],
      name: { en: "CRISPR & Genome Editing" },
      desc: { en: "CRISPR-Cas9, guide RNA, editing applications, ethics." },
      why: { en: "The revolutionary technology to precisely edit life's code." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "iBiology → CRISPR lectures (Doudna et al.)" }, u: "https://www.ibiology.org/" },
      ],
      quiz: null },
  ] },
  { id: "bio-genomics", icon: "binary", w: 900, h: 420,
    name: { en: "Genomics" },
    desc: { en: "Genome sequencing, comparison, function" },
    nodes: [
    { id: "genome-sequencing", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Genome Sequencing" },
      desc: { en: "Sanger, next-generation sequencing (NGS), assembly." },
      why: { en: "The modern basis from the Human Genome to clinical genetics." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "NCBI → Genomics resources & primers" }, u: "https://www.ncbi.nlm.nih.gov/" },
        { role: "secondary", t: "video", r: 4, l: { en: "iBiology → Genomics lectures" }, u: "https://www.ibiology.org/" },
      ],
      quiz: [
        { q: { en: "A genome is an organism's complete set of..." }, o: { en: ["DNA", "Proteins", "Cells"] }, a: 0 },
        { q: { en: "NGS enabled ___ sequencing" }, o: { en: ["Fast, cheap", "Slow, costly", "Impossible"] }, a: 0 },
      ] },
    { id: "comparative-genomics", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["genome-sequencing"],
      name: { en: "Comparative Genomics" },
      desc: { en: "Comparing genomes, evolutionary conservation, synteny." },
      why: { en: "Understanding species differences and evolution at genome level." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "NCBI → Comparative genomics tools" }, u: "https://www.ncbi.nlm.nih.gov/" },
      ],
      quiz: [
        { q: { en: "Comparative genomics reveals evolutionary..." }, o: { en: ["Relationships", "Color", "Size"] }, a: 0 },
        { q: { en: "Conserved sequences are often..." }, o: { en: ["Functionally important", "Junk", "Random"] }, a: 0 },
      ] },
    { id: "functional-genomics", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["comparative-genomics"],
      name: { en: "Functional Genomics" },
      desc: { en: "Transcriptomics, RNA-seq, gene expression profiling." },
      why: { en: "Studying not just which genes exist, but WHEN and WHERE they act." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "NCBI → GEO & functional genomics" }, u: "https://www.ncbi.nlm.nih.gov/" },
      ],
      quiz: null },
  ] },
  { id: "bio-bioinformatics", icon: "cpu", w: 900, h: 420,
    name: { en: "Bioinformatics" },
    desc: { en: "Sequence alignment, phylogeny, structural analysis" },
    nodes: [
    { id: "sequence-alignment", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Sequence Alignment" },
      desc: { en: "BLAST, dynamic programming, scoring matrices." },
      why: { en: "The core bioinformatics tool to compare genes and proteins." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "NCBI → BLAST tutorials" }, u: "https://www.ncbi.nlm.nih.gov/" },
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 7.91J → Foundations of Computational Biology (OCW)" }, u: "https://ocw.mit.edu/courses/7-91j-foundations-of-computational-and-systems-biology-spring-2014/" },
      ],
      quiz: [
        { q: { en: "BLAST searches for ___ sequences" }, o: { en: ["Similar", "Random", "Empty"] }, a: 0 },
        { q: { en: "Alignment reveals sequence..." }, o: { en: ["Similarity", "Mass", "Color"] }, a: 0 },
      ] },
    { id: "phylogenetics-comp", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["sequence-alignment"],
      name: { en: "Computational Phylogenetics" },
      desc: { en: "Building phylogenetic trees, distance methods, bootstrap." },
      why: { en: "Reconstructing evolutionary history from molecular data." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 7.91J → Phylogenetics (OCW)" }, u: "https://ocw.mit.edu/courses/7-91j-foundations-of-computational-and-systems-biology-spring-2014/" },
      ],
      quiz: [
        { q: { en: "A phylogenetic tree shows..." }, o: { en: ["Evolutionary relationships", "Cell structure", "Size"] }, a: 0 },
        { q: { en: "Bootstrap assesses tree..." }, o: { en: ["Confidence", "Color", "Length"] }, a: 0 },
      ] },
    { id: "structural-bioinfo", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["phylogenetics-comp"],
      name: { en: "Structural Bioinformatics" },
      desc: { en: "Protein structure prediction, AlphaFold, docking." },
      why: { en: "The revolution of predicting protein structure from sequence." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "NCBI → Structure database & tools" }, u: "https://www.ncbi.nlm.nih.gov/" },
      ],
      quiz: null },
  ] },
  { id: "bio-immunology", icon: "activity", w: 900, h: 420,
    name: { en: "Immunology" },
    desc: { en: "Innate & adaptive immunity, disorders" },
    nodes: [
    { id: "innate-immunity", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Innate Immunity" },
      desc: { en: "Barriers, inflammation, phagocytes, the complement system." },
      why: { en: "The body's first line of defense against infection." },
      res: [
        { role: "secondary", t: "video", r: 4, l: { en: "Khan → Immunology" }, u: "https://www.khanacademy.org/science/biology/human-biology" },
      ],
      quiz: [
        { q: { en: "Innate immunity is..." }, o: { en: ["Fast, non-specific", "Slow, specific", "Absent"] }, a: 0 },
        { q: { en: "Phagocytes ___ pathogens" }, o: { en: ["Engulf", "Feed", "Create"] }, a: 0 },
      ] },
    { id: "adaptive-immunity", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["innate-immunity"],
      name: { en: "Adaptive Immunity" },
      desc: { en: "B and T cells, antibodies, antigens, immune memory." },
      why: { en: "The basis of vaccines and long-term immunity." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Janeway, Immunobiology (adaptive immunity)" }, u: "https://www.ncbi.nlm.nih.gov/books/NBK10757/" },
      ],
      quiz: [
        { q: { en: "Antibodies recognize..." }, o: { en: ["Antigens", "Only cells", "Heat"] }, a: 0 },
        { q: { en: "Vaccines create immune..." }, o: { en: ["Memory", "Only fever", "Disease"] }, a: 0 },
      ] },
    { id: "immune-disorders", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["adaptive-immunity"],
      name: { en: "Immune Disorders" },
      desc: { en: "Allergies, autoimmunity, immunodeficiency, immunotherapy." },
      why: { en: "The clinical consequences when immunity goes wrong." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax A&P 2e: The Immune System" }, u: "https://openstax.org/details/books/anatomy-and-physiology-2e" },
      ],
      quiz: null },
  ] },
  { id: "bio-neuroscience", icon: "activity", w: 900, h: 420,
    name: { en: "Neuroscience" },
    desc: { en: "Neurons, the brain, synaptic plasticity" },
    nodes: [
    { id: "neuron-signaling", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Neuronal Signaling" },
      desc: { en: "Membrane potential, action potentials, synapses." },
      why: { en: "How the brain transmits information electrically." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 9.13 → The Human Brain (OCW)" }, u: "https://ocw.mit.edu/courses/9-13-the-human-brain-spring-2019/" },
      ],
      quiz: [
        { q: { en: "An action potential is an electrical..." }, o: { en: ["Impulse", "Heat", "Light"] }, a: 0 },
        { q: { en: "A synapse is a junction between two..." }, o: { en: ["Neurons", "Muscles", "Bones"] }, a: 0 },
      ] },
    { id: "brain-organization", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["neuron-signaling"],
      name: { en: "Brain Organization" },
      desc: { en: "Brain regions, sensory, motor, higher functions." },
      why: { en: "How brain structure produces behavior and cognition." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 9.13 → Brain Systems (OCW)" }, u: "https://ocw.mit.edu/courses/9-13-the-human-brain-spring-2019/" },
      ],
      quiz: [
        { q: { en: "The cerebral cortex handles higher..." }, o: { en: ["Cognition", "Only heartbeat", "Digestion"] }, a: 0 },
        { q: { en: "The cerebellum coordinates..." }, o: { en: ["Movement", "Only vision", "Immunity"] }, a: 0 },
      ] },
    { id: "synaptic-plasticity", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["brain-organization"],
      name: { en: "Synaptic Plasticity" },
      desc: { en: "LTP, LTD, the cellular basis of learning and memory." },
      why: { en: "The molecular mechanism of how the brain learns and remembers." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax A&P 2e: Nervous System" }, u: "https://openstax.org/details/books/anatomy-and-physiology-2e" },
      ],
      quiz: null },
  ] },
  { id: "bio-physiology", icon: "activity", w: 900, h: 420,
    name: { en: "Human Physiology" },
    desc: { en: "Cardiovascular, renal, endocrine" },
    nodes: [
    { id: "cardiovascular-phys", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Cardiovascular Physiology" },
      desc: { en: "The cardiac cycle, blood pressure, regulation." },
      why: { en: "How the system that delivers blood to every tissue works." },
      res: [
        { role: "secondary", t: "book", r: 4, l: { en: "OpenStax Anatomy & Physiology → Ch.19–20" }, u: "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-introduction" },
      ],
      quiz: [
        { q: { en: "The left ventricle pumps blood to the..." }, o: { en: ["Body (aorta)", "Lungs", "Heart"] }, a: 0 },
        { q: { en: "Systolic pressure is measured during heart..." }, o: { en: ["Contraction", "Relaxation", "Stopping"] }, a: 0 },
      ] },
    { id: "renal-respiratory", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["cardiovascular-phys"],
      name: { en: "Renal & Respiratory Physiology" },
      desc: { en: "Filtration, gas exchange, acid-base balance." },
      why: { en: "The systems that maintain the body's internal balance." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax A&P 2e: Urinary & Respiratory" }, u: "https://openstax.org/details/books/anatomy-and-physiology-2e" },
      ],
      quiz: [
        { q: { en: "The kidneys filter the..." }, o: { en: ["Blood", "Air", "Food"] }, a: 0 },
        { q: { en: "In the lungs, gas exchange occurs in the..." }, o: { en: ["Alveoli", "Only trachea", "Nose"] }, a: 0 },
      ] },
    { id: "endocrine-phys", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["renal-respiratory"],
      name: { en: "Endocrine Physiology" },
      desc: { en: "Hormones, negative feedback, glucose regulation." },
      why: { en: "How hormones run the body's long-term regulation." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax A&P 2e: The Endocrine System" }, u: "https://openstax.org/details/books/anatomy-and-physiology-2e" },
      ],
      quiz: null },
  ] },
  { id: "bio-cancer", icon: "circle", w: 900, h: 420,
    name: { en: "Cancer Biology" },
    desc: { en: "Oncogenes, tumor progression, therapy" },
    nodes: [
    { id: "oncogenes", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Oncogenes & Tumor Suppressors" },
      desc: { en: "Proto-oncogenes, tumor suppressor genes, cell cycle failure." },
      why: { en: "The genetics of why a normal cell becomes cancerous." },
      res: [
        { role: "secondary", t: "video", r: 4, l: { en: "iBiology → Cancer biology lectures" }, u: "https://www.ibiology.org/" },
      ],
      quiz: [
        { q: { en: "Tumor suppressor genes normally ___ cell division" }, o: { en: ["Restrain", "Accelerate", "Start"] }, a: 0 },
        { q: { en: "Cancer is fundamentally a disease of the..." }, o: { en: ["Genes/cell cycle", "Only infection", "Diet"] }, a: 0 },
      ] },
    { id: "tumor-progression", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["oncogenes"],
      name: { en: "Tumor Progression" },
      desc: { en: "Angiogenesis, metastasis, the tumor microenvironment." },
      why: { en: "The cellular mechanism of how tumors grow and spread." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: Cell Cycle & Cancer" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: [
        { q: { en: "Metastasis is when cancer..." }, o: { en: ["Spreads to other organs", "Shrinks", "Heals"] }, a: 0 },
        { q: { en: "Angiogenesis creates new ___ for the tumor" }, o: { en: ["Blood vessels", "Neurons", "Muscle"] }, a: 0 },
      ] },
    { id: "cancer-therapy", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["tumor-progression"],
      name: { en: "Cancer Therapy" },
      desc: { en: "Chemotherapy, targeted therapy, immunotherapy." },
      why: { en: "How molecular biology translates into new treatments." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: Cell Cycle Control" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: null },
  ] },
  { id: "bio-virology", icon: "circle", w: 900, h: 420,
    name: { en: "Virology" },
    desc: { en: "Virus structure, replication, pathogenesis" },
    nodes: [
    { id: "virus-structure", stage: "a", pos: [450, 60], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: [],
      name: { en: "Virus Structure" },
      desc: { en: "Capsids, genomes (DNA/RNA), envelopes, classification." },
      why: { en: "Viruses sit at the strange boundary of living and non-living." },
      res: [
        { role: "secondary", t: "book", r: 4, l: { en: "OpenStax Microbiology → Ch.6 (Viruses)" }, u: "https://openstax.org/books/microbiology/pages/6-introduction" },
      ],
      quiz: [
        { q: { en: "A virus genome can be..." }, o: { en: ["DNA or RNA", "Only DNA", "Protein"] }, a: 0 },
        { q: { en: "A capsid is the virus's protein..." }, o: { en: ["Coat", "Genome", "Enzyme"] }, a: 0 },
      ] },
    { id: "viral-replication", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["virus-structure"],
      name: { en: "Viral Replication" },
      desc: { en: "Attachment, entry, replication, assembly, release." },
      why: { en: "The key targets for designing antiviral drugs." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Microbiology: Viruses" }, u: "https://openstax.org/details/books/microbiology" },
      ],
      quiz: [
        { q: { en: "To replicate, a virus requires a..." }, o: { en: ["Host cell", "Only water", "Light"] }, a: 0 },
        { q: { en: "Retroviruses use reverse..." }, o: { en: ["Transcriptase", "Heat", "Light"] }, a: 0 },
      ] },
    { id: "viral-pathogenesis", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["viral-replication"],
      name: { en: "Pathogenesis & Epidemiology" },
      desc: { en: "Viral disease, epidemics, vaccines, antivirals." },
      why: { en: "The science of understanding and preventing pandemics." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Microbiology: Disease & Epidemiology" }, u: "https://openstax.org/details/books/microbiology" },
      ],
      quiz: null },
  ] },
  { id: "bio-oly-cell-molecular", icon: "circle", w: 900, h: 420,
    name: { en: "Olympiad Cell & Molecular Biology" },
    desc: { en: "Cell, molecular, and technique problems" },
    nodes: [
    { id: "oly-cell-molecular-theory", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "Cell-Molecular Theory" },
      desc: { en: "Deep cell structure, signal transduction, molecular pathways." },
      why: { en: "The largest part of the IBO theory exam (~half)." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: Cell & Molecular Biology" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: [
        { q: { en: "Cell & molecular biology is roughly what share of the IBO?" }, o: { en: ["A large share", "A tiny share", "Zero"] }, a: 0 },
        { q: { en: "The core olympiad textbook?" }, o: { en: ["Campbell Biology", "Wikipedia", "Newspaper"] }, a: 0 },
      ] },
    { id: "oly-molecular-techniques", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["oly-cell-molecular-theory"],
      name: { en: "Molecular Technique Problems" },
      desc: { en: "Gel electrophoresis, PCR, blotting, sequence reading." },
      why: { en: "A common, high-scoring part of the IBO practical." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO practical papers (molecular techniques)" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: [
        { q: { en: "Gel electrophoresis separates molecules by..." }, o: { en: ["Size/charge", "Color", "Smell"] }, a: 0 },
        { q: { en: "PCR amplifies..." }, o: { en: ["DNA", "Protein", "Lipid"] }, a: 0 },
      ] },
    { id: "oly-cell-problems", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["oly-molecular-techniques"],
      name: { en: "Integrated Cell Problems" },
      desc: { en: "Multi-concept analytical and calculation problems." },
      why: { en: "IBO success depends on integrated, not isolated, understanding." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO past papers (cell biology)" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: null },
  ] },
  { id: "bio-oly-genetics", icon: "git-branch", w: 900, h: 420,
    name: { en: "Olympiad Genetics" },
    desc: { en: "Classical, population, molecular genetics problems" },
    nodes: [
    { id: "oly-genetics-problems", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: [],
      name: { en: "Genetics Problems" },
      desc: { en: "Inheritance analysis, pedigrees, linkage, crossing over." },
      why: { en: "Quantitative genetics problems appear frequently at the IBO." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO past papers (genetics)" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: [
        { q: { en: "A pedigree tracks a trait through..." }, o: { en: ["Generations", "Cells", "Molecules"] }, a: 0 },
        { q: { en: "Crossing over creates genetic..." }, o: { en: ["Recombination", "Only mutation", "Death"] }, a: 0 },
      ] },
    { id: "oly-population-genetics", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["oly-genetics-problems"],
      name: { en: "Population Genetics Problems" },
      desc: { en: "Hardy–Weinberg equilibrium, allele frequencies, selection." },
      why: { en: "Quantitative problems linking genetics and evolution." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: Population Evolution" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: [
        { q: { en: "The Hardy–Weinberg equation?" }, o: { en: ["p² + 2pq + q² = 1", "E = mc²", "F = ma"] }, a: 0 },
        { q: { en: "H–W equilibrium describes ___ allele frequencies" }, o: { en: ["Stable", "Rising", "Zero"] }, a: 0 },
      ] },
    { id: "oly-molecular-genetics", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["oly-population-genetics"],
      name: { en: "Molecular Genetics Problems" },
      desc: { en: "Gene regulation, mutation effects, genomic analysis." },
      why: { en: "Molecular genetics is increasingly central to the modern IBO." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: DNA & Gene Expression" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: null },
  ] },
  { id: "bio-oly-physiology", icon: "activity", w: 900, h: 420,
    name: { en: "Olympiad Plant & Animal Physiology" },
    desc: { en: "Plant, animal, human physiology problems" },
    nodes: [
    { id: "oly-plant-physiology", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: [],
      name: { en: "Plant Physiology Problems" },
      desc: { en: "Photosynthesis, transport, hormones, growth responses." },
      why: { en: "Plant physiology is a consistently high-scoring IBO area." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: Plant Biology" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: [
        { q: { en: "Stomata regulate gas exchange and..." }, o: { en: ["Water loss", "DNA", "Color"] }, a: 0 },
        { q: { en: "Auxin is a plant..." }, o: { en: ["Growth hormone", "Enzyme", "Pigment"] }, a: 0 },
      ] },
    { id: "oly-animal-physiology", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["oly-plant-physiology"],
      name: { en: "Animal Physiology Problems" },
      desc: { en: "Circulation, respiration, excretion, nervous, hormones." },
      why: { en: "Comparative physiology is a pillar of the IBO." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: Animal Systems" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: [
        { q: { en: "Comparative physiology compares systems across..." }, o: { en: ["Organisms", "Atoms", "Stars"] }, a: 0 },
        { q: { en: "The nephron is the unit of the..." }, o: { en: ["Kidney", "Heart", "Lung"] }, a: 0 },
      ] },
    { id: "oly-human-physiology", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["oly-animal-physiology"],
      name: { en: "Human Physiology Problems" },
      desc: { en: "Immunity, endocrine, homeostasis, integrated regulation." },
      why: { en: "Especially relevant for medicine-bound students." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax A&P 2e: Human Physiology" }, u: "https://openstax.org/details/books/anatomy-and-physiology-2e" },
      ],
      quiz: null },
  ] },
  { id: "bio-oly-ecology-evolution", icon: "wind", w: 900, h: 420,
    name: { en: "Olympiad Ecology & Evolution" },
    desc: { en: "Ecology, evolution, behavior problems" },
    nodes: [
    { id: "oly-ecology-problems", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: [],
      name: { en: "Ecology Problems" },
      desc: { en: "Population models, interactions, ecosystem analysis." },
      why: { en: "Ecology demands lots of calculation and graph interpretation." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO past papers (ecology)" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: [
        { q: { en: "Logistic growth is limited by..." }, o: { en: ["Carrying capacity", "Only light", "Color"] }, a: 0 },
        { q: { en: "Predator-prey models describe population..." }, o: { en: ["Cycles", "Color", "Size"] }, a: 0 },
      ] },
    { id: "oly-evolution-problems", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["oly-ecology-problems"],
      name: { en: "Evolution Problems" },
      desc: { en: "Building phylogenies, types of selection, coevolution." },
      why: { en: "Evolutionary logic connects every part of the IBO." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: Evolution" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: [
        { q: { en: "Balancing selection maintains..." }, o: { en: ["Diversity", "One allele", "Zero"] }, a: 0 },
        { q: { en: "Phylogenetic trees are built from shared..." }, o: { en: ["Traits/sequences", "Color", "Size"] }, a: 0 },
      ] },
    { id: "oly-behavior", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 450, diff: 3, prereqs: ["oly-evolution-problems"],
      name: { en: "Ethology (Behavior)" },
      desc: { en: "Instinct, learned behavior, social behavior, signaling." },
      why: { en: "Behavioral ecology is its own IBO section." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "OpenStax Biology 2e: Behavioral Biology" }, u: "https://openstax.org/details/books/biology-2e" },
      ],
      quiz: null },
  ] },
  { id: "bio-oly-lab", icon: "test-tube", w: 900, h: 420,
    name: { en: "Laboratory & Data Interpretation" },
    desc: { en: "Lab techniques, data interpretation, experiments" },
    nodes: [
    { id: "oly-lab-techniques", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: [],
      name: { en: "Laboratory Techniques" },
      desc: { en: "Microscopy, dissection, staining, chromatography, titration." },
      why: { en: "The IBO practical exam is ~50% of the total score." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO practical exam papers" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: [
        { q: { en: "The IBO practical is what share?" }, o: { en: ["~50%", "~5%", "~90%"] }, a: 0 },
        { q: { en: "A microscope is used to study..." }, o: { en: ["Cells/tissues", "Stars", "Mountains"] }, a: 0 },
      ] },
    { id: "oly-data-interpretation", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["oly-lab-techniques"],
      name: { en: "Data Interpretation" },
      desc: { en: "Graphs, tables, statistical tests, drawing conclusions." },
      why: { en: "The core skill of modern IBO tasks." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO past papers (data interpretation)" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: [
        { q: { en: "p < 0.05 typically indicates a result is..." }, o: { en: ["Statistically significant", "Wrong", "Random"] }, a: 0 },
        { q: { en: "Graphs help reveal data..." }, o: { en: ["Trends", "Color", "Smell"] }, a: 0 },
      ] },
    { id: "oly-experimental-design", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 450, diff: 3, prereqs: ["oly-data-interpretation"],
      name: { en: "Experimental Design" },
      desc: { en: "Hypotheses, controls, variables, replication, analysis." },
      why: { en: "Thinking like a real scientist, the core of olympiad and research." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO practical papers (experimental design)" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: null },
  ] },
  { id: "bio-oly-ibo", icon: "award", w: 900, h: 420,
    name: { en: "IBO Preparation" },
    desc: { en: "Theory, practical, past problems" },
    nodes: [
    { id: "ibo-theory-prep", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: [],
      name: { en: "IBO Theory Preparation" },
      desc: { en: "Full topic coverage, time management, strategy." },
      why: { en: "The IBO spans cell, genetics, physiology, and ecology." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO info center: theory prep & syllabus" }, u: "https://www.ibo-info.org/en/info.html" },
      ],
      quiz: [
        { q: { en: "The core IBO textbook?" }, o: { en: ["Campbell Biology", "Newspaper", "Wikipedia"] }, a: 0 },
        { q: { en: "The best preparation method?" }, o: { en: ["Doing past exams", "Only reading", "Nothing"] }, a: 0 },
      ] },
    { id: "ibo-practical-prep", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["ibo-theory-prep"],
      name: { en: "IBO Practical Preparation" },
      desc: { en: "Four lab blocks: cell, anatomy, physiology, ecology." },
      why: { en: "The practical is ~50% of the total score." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO practical papers archive" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: [
        { q: { en: "The IBO practical has how many lab blocks?" }, o: { en: ["4", "1", "10"] }, a: 0 },
        { q: { en: "The practical score is ___ of the total" }, o: { en: ["~half", "~10%", "~90%"] }, a: 0 },
      ] },
    { id: "ibo-past-problems", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 450, diff: 3, prereqs: ["ibo-practical-prep"],
      name: { en: "Past IBO Problems" },
      desc: { en: "Full timed exams, review, fixing weaknesses." },
      why: { en: "The final step to confirm readiness for the international." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "IBO: all past exam papers" }, u: "https://www.ibo-info.org/en/info/papers.html" },
      ],
      quiz: null },
  ] },
  { id: "bio-biotech", icon: "git-branch", w: 900, h: 420,
    name: { en: "Biotechnology" },
    desc: { en: "Genetic engineering, CRISPR, industrial biotech" },
    nodes: [
    { id: "biotech-genetic-engineering", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Genetic Engineering" },
      desc: { en: "Recombinant DNA, cloning, transgenic organisms, expression." },
      why: { en: "The foundation of engineering organisms by design." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.17 (Biotechnology)" }, u: "https://openstax.org/books/biology-2e/pages/17-introduction" },
        { role: "secondary", t: "video", r: 4, l: { en: "iBiology → Genetic engineering lectures" }, u: "https://www.ibiology.org/" },
      ],
      quiz: [
        { q: { en: "A transgenic organism carries a gene from..." }, o: { en: ["Another species", "The same cell", "A gas"] }, a: 0 },
        { q: { en: "Recombinant DNA combines DNA from..." }, o: { en: ["Two sources", "One gene", "Protein"] }, a: 0 },
      ] },
    { id: "biotech-crispr-editing", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["biotech-genetic-engineering"],
      name: { en: "CRISPR & Genome Editing" },
      desc: { en: "CRISPR-Cas9, guide RNA, therapies, ethics." },
      why: { en: "The revolutionary tool to precisely edit life's code." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "iBiology → CRISPR lectures (Doudna et al.)" }, u: "https://www.ibiology.org/" },
        { role: "secondary", t: "book", r: 4, l: { en: "OpenStax Biology 2e → Ch.17.1 (Gene editing)" }, u: "https://openstax.org/books/biology-2e/pages/17-introduction" },
      ],
      quiz: [
        { q: { en: "CRISPR-Cas9 is used to ___ DNA" }, o: { en: ["Edit", "Stain", "Melt"] }, a: 0 },
        { q: { en: "Guide RNA determines the ___ of editing" }, o: { en: ["Location", "Speed", "Color"] }, a: 0 },
      ] },
    { id: "biotech-industrial-medical", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["biotech-crispr-editing"],
      name: { en: "Industrial & Medical Biotech" },
      desc: { en: "Fermentation, biopharmaceuticals, cell therapy, bioengineering." },
      why: { en: "Where biology connects to medicine, industry, and engineering." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenStax Biology 2e → Ch.17.2–17.4 (Biotech applications)" }, u: "https://openstax.org/books/biology-2e/pages/17-introduction" },
      ],
      quiz: null },
  ] },
  ],
  planned: [],
  paths: [
    { id: "core", icon: "🧬", tag: { en: "Core" },
      name: { en: "Core Learning" },
      desc: { en: "Build a complete biology foundation for university STEM, medicine, life sciences, biotechnology, and research." },
      branches: ["bio-molecular", "bio-cell", "bio-genetics", "bio-evolution", "bio-ecology", "bio-anatomy", "bio-plant", "bio-microbiology", "bio-biochem-intro"] },
    { id: "university", icon: "🎓", tag: { en: "University" },
      name: { en: "University & Research" },
      desc: { en: "A complete university biology curriculum, from cells to genomics, neuroscience, and cancer biology." },
      branches: ["bio-molecular-adv", "bio-genomics", "bio-bioinformatics", "bio-immunology", "bio-neuroscience", "bio-physiology", "bio-cancer", "bio-virology", "bio-biotech"] },
    { id: "olympiad", icon: "🏅", tag: { en: "Olympiad" },
      name: { en: "Biology Olympiad" },
      desc: { en: "Advanced problem-solving curriculum for the national and international biology olympiads (IBO)." },
      branches: ["bio-oly-cell-molecular", "bio-oly-genetics", "bio-oly-physiology", "bio-oly-ecology-evolution", "bio-oly-lab", "bio-oly-ibo"] },
  ],
},
{
  id: "engineering", icon: "🚀", hue: "#db2777",
  name: { en: "Engineering" },
  desc: { en: "Mechanics, circuits, materials, control systems, and design." },
  branches: [
  { id: "eng-robotics", icon: "🤖", w: 900, h: 620,
    name: { en: "Robotics & Mechatronics" },
    desc: { en: "Uniting design, electronics, and code" },
    nodes: [
    { id: "cad", stage: "f", pos: [260, 70], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: [],
      name: { en: "CAD & 3D Modeling" },
      desc: { en: "Design parts in Onshape." },
      why: { en: "If you can't draw the idea, you can't build it." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Onshape Learning Center → “Introduction to CAD”" }, u: "https://learn.onshape.com/" },
        { t: "video", r: 4, l: { en: "Onshape → Getting Started series · video 1" }, u: "https://www.youtube.com/watch?v=2CEy1y2QW9w" },
      ],
      notes: { en: ["Sketch → Extrude covers 80%", "Fully define every dimension", "Onshape is free and runs in the browser"] },
      quiz: [
        { q: { en: "Turning a 2D sketch into 3D is..." }, o: { en: ["Extrude", "Delete", "Zoom"] }, a: 0 },
        { q: { en: "CAD stands for..." }, o: { en: ["Computer-Aided Design", "Cool Art Drawing", "Code And Debug"] }, a: 0 },
      ] },
    { id: "electronics", stage: "f", pos: [640, 70], weeks: 4, h: 20, xp: 250, diff: 2, prereqs: [],
      name: { en: "Electronics Basics" },
      desc: { en: "Voltage, current, resistance, circuits." },
      why: { en: "Every robot is ultimately a circuit." },
      res: [
        { t: "sim", s: 1, r: 5, l: { en: "PhET → Circuit Construction Kit: DC" }, u: "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc" },
        { t: "course", r: 4, l: { en: "Khan → Electrical engineering · Circuit analysis" }, u: "https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic" },
        { t: "video", r: 4, l: { en: "GreatScott! → Electronics Basics · Ep.1" }, u: "https://www.youtube.com/playlist?list=PLAROrg3NQn7cyu01HpOv5BWo217XWBZu0" },
      ],
      notes: { en: ["V = I·R, Ohm's law", "Always pair an LED with a resistor", "A multimeter is the engineer's senses"] },
      quiz: [
        { q: { en: "Ohm's law?" }, o: { en: ["V = IR", "E = mc²", "F = ma"] }, a: 0 },
        { q: { en: "The unit of current?" }, o: { en: ["Volt", "Ampere", "Watt"] }, a: 1 },
      ] },
    { id: "arduino", stage: "a", pos: [640, 225], weeks: 3, h: 15, xp: 250, diff: 2, prereqs: ["electronics"],
      name: { en: "Arduino" },
      desc: { en: "Read sensors, drive motors, first embedded code." },
      why: { en: "The bridge between code and hardware." },
      res: [
        { t: "sim", s: 1, r: 5, l: { en: "Tinkercad Circuits → Arduino simulator (first lesson)" }, u: "https://www.tinkercad.com/circuits" },
        { t: "course", r: 4, l: { en: "Arduino Docs → “Built-in Examples: Blink”" }, u: "https://docs.arduino.cc/built-in-examples/basics/Blink/" },
        { t: "video", r: 4, l: { en: "Paul McWhorter → Arduino series · Lesson 1" }, u: "https://www.youtube.com/playlist?list=PLGs0VKk2DiYw-L-RibttcvK-WBZm8WLEP" },
      ],
      notes: { en: ["setup() runs once, loop() forever", "Blink is the engineer's Hello World", "Free simulator: Tinkercad"] },
      quiz: [
        { q: { en: "Arduino's repeating function?" }, o: { en: ["loop()", "setup()", "main()"] }, a: 0 },
        { q: { en: "The classic first sketch?" }, o: { en: ["Blink", "Jump", "Ping"] }, a: 0 },
      ] },
    { id: "eng-project", stage: "a", pos: [450, 380], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["cad", "arduino"],
      name: { en: "Build Project" },
      desc: { en: "Design, assemble, code, one complete device." },
      why: { en: "WRO, ISEF, universities, all want to see what you built." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "Hackster.io → beginner Arduino projects" }, u: "https://www.hackster.io/projects/tags/arduino" },
        { t: "course", r: 4, l: { en: "Arduino Project Hub → step-by-step guides" }, u: "https://projecthub.arduino.cc/" },
      ],
      notes: { en: ["Find a problem → build the fix", "Document with photos/video", "Failures are data"] },
      quiz: null },
    { id: "robotics-comp", stage: "o", pos: [450, 520], weeks: 2, h: 10, xp: 250, diff: 3, prereqs: ["eng-project"],
      name: { en: "Robotics & Contests" },
      desc: { en: "WRO, FIRST, NASA Space Apps, compete as a team." },
      why: { en: "Engineers build in teams, not alone." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "World Robot Olympiad → this season's challenge" }, u: "https://wro-association.org/" },
      ],
      notes: { en: ["Contests live on the Competitions page", "NASA Space Apps needs engineers!"] },
      quiz: null },
  ] },
  { id: "eng-math", icon: "sigma", w: 900, h: 420,
    name: { en: "Engineering Mathematics" },
    desc: { en: "Calculus, differential equations, numerical methods" },
    nodes: [
    { id: "eng-calculus", stage: "f", pos: [450, 60], weeks: 4, h: 20, xp: 200, diff: 2, prereqs: [],
      name: { en: "Engineering Calculus" },
      desc: { en: "Derivatives, integrals, vector calculus, applications." },
      why: { en: "The mathematical language of nearly all engineering." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.01/18.02 → Calculus (OCW)" }, u: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/" },
      ],
      quiz: [
        { q: { en: "A derivative measures a rate of..." }, o: { en: ["Change", "Area", "Mass"] }, a: 0 },
        { q: { en: "An integral finds accumulated..." }, o: { en: ["Quantity/area", "Only speed", "Color"] }, a: 0 },
      ] },
    { id: "eng-diff-eq", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["eng-calculus"],
      name: { en: "Differential Equations" },
      desc: { en: "ODEs, PDEs, Laplace transforms, boundary-value problems." },
      why: { en: "The tool to model motion, heat, flow, and vibration." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.03 → Differential Equations (OCW)" }, u: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/" },
      ],
      quiz: [
        { q: { en: "An ODE involves derivatives of a function of ___ variable(s)" }, o: { en: ["One", "Many", "Zero"] }, a: 0 },
        { q: { en: "The Laplace transform simplifies solving..." }, o: { en: ["Differential equations", "Matrices", "Graphs"] }, a: 0 },
      ] },
    { id: "eng-numerical", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["eng-diff-eq"],
      name: { en: "Numerical Methods" },
      desc: { en: "Root finding, numerical integration, finite elements, error." },
      why: { en: "Solving problems with no analytic solution using computers." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 18.330 → Introduction to Numerical Analysis (OCW)" }, u: "https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/" },
      ],
      quiz: null },
  ] },
  { id: "eng-mechanics", icon: "orbit", w: 900, h: 420,
    name: { en: "Engineering Mechanics" },
    desc: { en: "Statics, dynamics, strength of materials" },
    nodes: [
    { id: "eng-statics", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Statics" },
      desc: { en: "Forces, moments, equilibrium, trusses, supports." },
      why: { en: "Why bridges and buildings stand up." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.001 → Mechanics & Materials I (OCW)" }, u: "https://ocw.mit.edu/courses/2-001-mechanics-and-materials-i-fall-2006/" },
      ],
      quiz: [
        { q: { en: "In static equilibrium, the net force is..." }, o: { en: ["Zero", "Large", "Varying"] }, a: 0 },
        { q: { en: "A moment tends to cause..." }, o: { en: ["Rotation", "Melting", "Heat"] }, a: 0 },
      ] },
    { id: "eng-dynamics", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["eng-statics"],
      name: { en: "Dynamics" },
      desc: { en: "Kinematics, kinetics, work-energy, vibration." },
      why: { en: "The basis of designing moving machines and mechanisms." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 8.01 Classical Mechanics (dynamics)" }, u: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/" },
      ],
      quiz: [
        { q: { en: "Dynamics studies bodies in..." }, o: { en: ["Motion", "Only equilibrium", "Rest"] }, a: 0 },
        { q: { en: "Kinetics relates motion to..." }, o: { en: ["Forces", "Color", "Only mass"] }, a: 0 },
      ] },
    { id: "eng-strength-materials", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["eng-dynamics"],
      name: { en: "Strength of Materials" },
      desc: { en: "Stress, strain, bending, torsion, failure." },
      why: { en: "Calculating whether a structure survives its load." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.001 → Stress & strain (OCW)" }, u: "https://ocw.mit.edu/courses/2-001-mechanics-and-materials-i-fall-2006/" },
      ],
      quiz: null },
  ] },
  { id: "eng-materials", icon: "boxes", w: 900, h: 420,
    name: { en: "Materials Science Fundamentals" },
    desc: { en: "Structure, properties, material selection" },
    nodes: [
    { id: "material-properties", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Material Properties" },
      desc: { en: "Mechanical, thermal, electrical properties, testing." },
      why: { en: "How engineers pick the right material for the job." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 3.091 → Intro to Solid State Chemistry (OCW)" }, u: "https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/" },
      ],
      quiz: [
        { q: { en: "Young's modulus measures a material's..." }, o: { en: ["Stiffness", "Color", "Mass"] }, a: 0 },
        { q: { en: "Ductility is the ability to..." }, o: { en: ["Stretch/deform", "Melt", "Glow"] }, a: 0 },
      ] },
    { id: "material-structure", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["material-properties"],
      name: { en: "Material Structure" },
      desc: { en: "Crystal structure, defects, phase diagrams, metals/polymers/ceramics." },
      why: { en: "A material's properties come from its internal structure." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 3.091 → Crystal structure (OCW)" }, u: "https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/" },
      ],
      quiz: [
        { q: { en: "A phase diagram shows phases vs temperature and..." }, o: { en: ["Composition", "Color", "Speed"] }, a: 0 },
        { q: { en: "Defects in a crystal change its..." }, o: { en: ["Properties", "Only color", "Mass"] }, a: 0 },
      ] },
    { id: "material-selection", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 350, diff: 2, prereqs: ["material-structure"],
      name: { en: "Material Selection & Corrosion" },
      desc: { en: "Selection criteria, corrosion, sustainability, cost." },
      why: { en: "The real engineering skill of making design trade-offs." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 3.091: Materials Science" }, u: "https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2018/" },
      ],
      quiz: null },
  ] },
  { id: "eng-electrical-fund", icon: "zap", w: 900, h: 420,
    name: { en: "Electrical Fundamentals" },
    desc: { en: "Circuits, AC/DC, electrical machines" },
    nodes: [
    { id: "eng-circuits", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Circuit Analysis" },
      desc: { en: "Ohm's & Kirchhoff's laws, resistors, capacitors, inductors." },
      why: { en: "The foundation of all electrical and electronic systems." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.002 → Circuits & Electronics (OCW)" }, u: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/" },
        { role: "secondary", t: "course", r: 4, l: { en: "All About Circuits (free textbook)" }, u: "https://www.allaboutcircuits.com/textbook/" },
      ],
      quiz: [
        { q: { en: "Kirchhoff's current law: current into a node equals current..." }, o: { en: ["Out of it", "Zero", "Doubled"] }, a: 0 },
        { q: { en: "A capacitor stores..." }, o: { en: ["Charge/energy", "Current", "Heat"] }, a: 0 },
      ] },
    { id: "eng-ac-power", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["eng-circuits"],
      name: { en: "AC & Power" },
      desc: { en: "Alternating current, phasors, power, three-phase." },
      why: { en: "The world's power grid runs on AC." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "All About Circuits → AC theory" }, u: "https://www.allaboutcircuits.com/textbook/" },
      ],
      quiz: [
        { q: { en: "AC stands for..." }, o: { en: ["Alternating current", "Average current", "Active current"] }, a: 0 },
        { q: { en: "A phasor represents an AC signal's magnitude and..." }, o: { en: ["Phase", "Mass", "Color"] }, a: 0 },
      ] },
    { id: "eng-machines", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["eng-ac-power"],
      name: { en: "Electrical Machines" },
      desc: { en: "Motors, generators, transformers, electromechanical conversion." },
      why: { en: "The devices that turn electricity into motion and back." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.061 → Electric Power Systems materials (OCW)" }, u: "https://ocw.mit.edu/courses/6-061-introduction-to-electric-power-systems-spring-2011/" },
      ],
      quiz: null },
  ] },
  { id: "eng-electronics-fund", icon: "cpu", w: 900, h: 420,
    name: { en: "Electronics Fundamentals" },
    desc: { en: "Semiconductors, analog, digital logic" },
    nodes: [
    { id: "eng-semiconductors", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Semiconductors & Diodes" },
      desc: { en: "Diodes, transistors, the p-n junction, rectifiers." },
      why: { en: "The building blocks of all modern electronics." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.002 → Semiconductors & amplifiers (OCW)" }, u: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/" },
      ],
      quiz: [
        { q: { en: "A diode lets current flow in..." }, o: { en: ["One direction", "Both directions", "No direction"] }, a: 0 },
        { q: { en: "A transistor can amplify or..." }, o: { en: ["Switch", "Melt", "Only glow"] }, a: 0 },
      ] },
    { id: "eng-analog", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 3, prereqs: ["eng-semiconductors"],
      name: { en: "Analog Circuits" },
      desc: { en: "Op-amps, filters, amplifiers, feedback." },
      why: { en: "The art of processing and amplifying real-world signals." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "All About Circuits: Analog Circuits" }, u: "https://www.allaboutcircuits.com/" },
      ],
      quiz: [
        { q: { en: "An op-amp is used to ___ signals" }, o: { en: ["Amplify", "Store", "Delete"] }, a: 0 },
        { q: { en: "A filter selects certain signal..." }, o: { en: ["Frequencies", "Colors", "Masses"] }, a: 0 },
      ] },
    { id: "eng-digital-logic", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["eng-analog"],
      name: { en: "Digital Logic" },
      desc: { en: "Logic gates, Boolean algebra, flip-flops, state machines." },
      why: { en: "The hardware foundation of computers and digital devices." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.004 → Computation Structures (OCW)" }, u: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/" },
      ],
      quiz: null },
  ] },
  { id: "eng-cad-design", icon: "ruler", w: 900, h: 420,
    name: { en: "CAD & Engineering Design" },
    desc: { en: "3D modeling, design process, prototyping" },
    nodes: [
    { id: "cad-modeling", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 1, prereqs: [],
      name: { en: "CAD Modeling" },
      desc: { en: "Sketches, parametric modeling, assemblies, engineering drawings." },
      why: { en: "How modern engineering products are designed digitally." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Onshape → Learning Center (free, in-browser)" }, u: "https://learn.onshape.com/" },
        { role: "secondary", t: "course", r: 4, l: { en: "Autodesk Fusion → tutorials" }, u: "https://www.autodesk.com/products/fusion-360/" },
      ],
      quiz: [
        { q: { en: "Parametric modeling makes designs easy to..." }, o: { en: ["Edit/update", "Only print", "Delete"] }, a: 0 },
        { q: { en: "CAD is used to create ___ models" }, o: { en: ["Design (2D/3D)", "Sound", "Only text"] }, a: 0 },
      ] },
    { id: "eng-design-process", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["cad-modeling"],
      name: { en: "Engineering Design Process" },
      desc: { en: "Problem definition, ideation, analysis, iteration, design thinking." },
      why: { en: "The systematic way to move from idea to real solution." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.009 → Product Engineering Process (OCW)" }, u: "https://ocw.mit.edu/courses/2-009-the-product-engineering-process-fall-2009/" },
      ],
      quiz: [
        { q: { en: "The design process is typically..." }, o: { en: ["Iterative", "One-time", "Random"] }, a: 0 },
        { q: { en: "The first step is usually to..." }, o: { en: ["Define the problem", "Build the product", "Sell it"] }, a: 0 },
      ] },
    { id: "eng-prototyping", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 2, prereqs: ["eng-design-process"],
      name: { en: "Prototyping & Measurement" },
      desc: { en: "3D printing, fabrication, sensors, measurement, instrumentation." },
      why: { en: "Turning a design into something real and testable." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.008 → Design & Manufacturing II materials (OCW)" }, u: "https://ocw.mit.edu/courses/2-008-design-and-manufacturing-ii-spring-2004/" },
      ],
      quiz: null },
  ] },
  { id: "eng-comp-robotics", icon: "wrench", w: 900, h: 420,
    name: { en: "Robotics Competitions" },
    desc: { en: "Building, programming, competition strategy" },
    nodes: [
    { id: "robo-comp-build", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 2, prereqs: [],
      name: { en: "Building a Robot" },
      desc: { en: "Mechanics, motors, sensors, chassis design." },
      why: { en: "Turning engineering theory into a real moving machine." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "FIRST Robotics → resources & competition" }, u: "https://www.firstinspires.org/" },
        { role: "secondary", t: "practice", r: 4, l: { en: "VEX Robotics → build guides" }, u: "https://www.vexrobotics.com/" },
      ],
      quiz: [
        { q: { en: "A robot's chassis is its..." }, o: { en: ["Structural frame", "Program", "Sensor"] }, a: 0 },
        { q: { en: "An actuator produces..." }, o: { en: ["Motion", "Only light", "Only sound"] }, a: 0 },
      ] },
    { id: "robo-comp-programming", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["robo-comp-build"],
      name: { en: "Robot Programming" },
      desc: { en: "Sensor reading, control, autonomy, intro to ROS." },
      why: { en: "The code that makes a robot smart and autonomous." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Modern Robotics (Lynch & Park, free online)" }, u: "https://modernrobotics.northwestern.edu/" },
      ],
      quiz: [
        { q: { en: "An autonomous robot operates..." }, o: { en: ["By deciding itself", "Only remotely", "Never moves"] }, a: 0 },
        { q: { en: "Sensors give a robot information about its..." }, o: { en: ["Environment", "Only color", "Name"] }, a: 0 },
      ] },
    { id: "robo-comp-strategy", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 400, diff: 3, prereqs: ["robo-comp-programming"],
      name: { en: "Competition Strategy" },
      desc: { en: "Game analysis, teamwork, reliability, iteration." },
      why: { en: "Even the best robot loses with a bad strategy." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "FIRST/VEX → game rules & strategy" }, u: "https://www.firstinspires.org/" },
      ],
      quiz: null },
  ] },
  { id: "eng-comp-electronics", icon: "cpu", w: 900, h: 420,
    name: { en: "Electronics & Mechatronics Projects" },
    desc: { en: "Microcontrollers, sensors, embedded systems" },
    nodes: [
    { id: "elec-comp-microcontroller", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 2, prereqs: [],
      name: { en: "Microcontrollers (Arduino)" },
      desc: { en: "Arduino, GPIO, sensors, driving actuators, coding." },
      why: { en: "The heart of electronics projects that interact with the world." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Arduino → Education & Project Hub" }, u: "https://www.arduino.cc/education/" },
        { role: "practice", t: "practice", r: 4, l: { en: "Instructables → Electronics projects" }, u: "https://www.instructables.com/circuits/" },
      ],
      quiz: [
        { q: { en: "A microcontroller is a small..." }, o: { en: ["Computer on a chip", "Motor", "Sensor"] }, a: 0 },
        { q: { en: "GPIO pins are used for..." }, o: { en: ["Input/output", "Only sound", "Only light"] }, a: 0 },
      ] },
    { id: "elec-comp-mechatronics", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["elec-comp-microcontroller"],
      name: { en: "Mechatronics Integration" },
      desc: { en: "Integrating mechanics + electronics + code, control loops." },
      why: { en: "The basis of every modern smart device." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "Arduino → Mechatronics projects" }, u: "https://www.arduino.cc/education/" },
      ],
      quiz: [
        { q: { en: "Mechatronics combines mechanics, electronics, and..." }, o: { en: ["Programming", "Chemistry", "Painting"] }, a: 0 },
        { q: { en: "A control loop uses sensor feedback to adjust..." }, o: { en: ["Output", "Color", "Name"] }, a: 0 },
      ] },
    { id: "elec-comp-embedded", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["elec-comp-mechatronics"],
      name: { en: "Embedded Systems & IoT" },
      desc: { en: "Real-time code, power efficiency, wireless, IoT." },
      why: { en: "The technology of smart homes, wearables, and sensor networks." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "Arduino → IoT Cloud projects" }, u: "https://www.arduino.cc/education/" },
      ],
      quiz: null },
  ] },
  { id: "eng-comp-design", icon: "ruler", w: 900, h: 420,
    name: { en: "Design & CAD Challenges" },
    desc: { en: "Mechanical design, CAD contests, prototypes" },
    nodes: [
    { id: "design-comp-mechanical", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 2, prereqs: [],
      name: { en: "Mechanical Design Challenges" },
      desc: { en: "Bridge, machine, mechanism design, load capacity, efficiency." },
      why: { en: "The engineering core of creative problem-solving under constraints." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "MIT 2.007 → Design & Manufacturing (OCW, competition)" }, u: "https://ocw.mit.edu/courses/2-007-design-and-manufacturing-i-spring-2009/" },
      ],
      quiz: [
        { q: { en: "Design challenges emphasize solving under..." }, o: { en: ["Constraints", "Luck", "Randomness"] }, a: 0 },
        { q: { en: "A mechanism transmits or transforms..." }, o: { en: ["Motion/force", "Color", "Sound"] }, a: 0 },
      ] },
    { id: "design-comp-cad", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["design-comp-mechanical"],
      name: { en: "CAD & Simulation Contests" },
      desc: { en: "Detailed CAD, FEA simulation, optimization, rendering." },
      why: { en: "Testing and improving a design before building it." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Onshape → Advanced CAD & simulation" }, u: "https://learn.onshape.com/" },
      ],
      quiz: [
        { q: { en: "FEA simulates stress, heat, and..." }, o: { en: ["Deformation", "Color", "Name"] }, a: 0 },
        { q: { en: "Simulation reduces the need for physical..." }, o: { en: ["Prototypes/testing", "Coffee", "Paper"] }, a: 0 },
      ] },
    { id: "design-comp-prototype", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["design-comp-cad"],
      name: { en: "Prototype Development" },
      desc: { en: "3D printing, CNC, assembly, testing, iteration." },
      why: { en: "The final step from digital design to something you can hold." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "MIT 2.008 → Prototyping & manufacturing (OCW)" }, u: "https://ocw.mit.edu/courses/2-008-design-and-manufacturing-ii-spring-2004/" },
      ],
      quiz: null },
  ] },
  { id: "eng-comp-innovation", icon: "lightbulb", w: 900, h: 420,
    name: { en: "Engineering Innovation & Research" },
    desc: { en: "Innovation, research projects, science fairs" },
    nodes: [
    { id: "innov-process", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 2, prereqs: [],
      name: { en: "The Innovation Process" },
      desc: { en: "Finding problems, ideation, prototyping solutions, testing." },
      why: { en: "Turning engineering into real-world impact." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.009 → Product Engineering Process (OCW)" }, u: "https://ocw.mit.edu/courses/2-009-the-product-engineering-process-fall-2009/" },
      ],
      quiz: [
        { q: { en: "Innovation starts by identifying a real..." }, o: { en: ["Problem/need", "Color", "Name"] }, a: 0 },
        { q: { en: "Prototypes help you ___ an idea early" }, o: { en: ["Test", "Only sell", "Hide"] }, a: 0 },
      ] },
    { id: "innov-research-project", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["innov-process"],
      name: { en: "Research Projects" },
      desc: { en: "Problem definition, methodology, data, analysis, reporting." },
      why: { en: "Thinking like an engineer-researcher and creating new knowledge." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 2.009: Product Engineering Process" }, u: "https://ocw.mit.edu/courses/2-009-the-product-engineering-process-fall-2005/" },
      ],
      quiz: [
        { q: { en: "A research project is grounded in a..." }, o: { en: ["Hypothesis/question", "Luck", "Art"] }, a: 0 },
        { q: { en: "Data supports your..." }, o: { en: ["Conclusions", "Color", "Name"] }, a: 0 },
      ] },
    { id: "innov-science-fair", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 2, prereqs: ["innov-research-project"],
      name: { en: "Science Fair & STEM Competitions" },
      desc: { en: "Presenting projects, posters, judging, ISEF/STEM contests." },
      why: { en: "Showing your work to the world and opening doors." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "Society for Science → ISEF guidelines" }, u: "https://www.societyforscience.org/isef/" },
      ],
      quiz: null },
  ] },
  { id: "eng-comp-problem-solving", icon: "gauge", w: 900, h: 420,
    name: { en: "Engineering Problem Solving" },
    desc: { en: "Analysis, optimization, international challenges" },
    nodes: [
    { id: "eng-prob-analysis", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Engineering Analysis" },
      desc: { en: "Problem decomposition, assumptions, calculation, dimensional analysis." },
      why: { en: "The systematic way to approach any engineering problem." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "MIT OCW → Engineering problem sets (various courses)" }, u: "https://ocw.mit.edu/" },
      ],
      quiz: [
        { q: { en: "Dimensional analysis checks that units..." }, o: { en: ["Are consistent", "Are colorful", "Are cheap"] }, a: 0 },
        { q: { en: "Good analysis breaks a big problem into..." }, o: { en: ["Smaller parts", "One step", "Something bigger"] }, a: 0 },
      ] },
    { id: "eng-prob-optimization", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["eng-prob-analysis"],
      name: { en: "Optimization & Trade-offs" },
      desc: { en: "Constraints, objective functions, trade-offs, decision matrices." },
      why: { en: "Real engineering is the art of the best trade-off, not perfection." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "MIT OCW → Optimization in engineering design" }, u: "https://ocw.mit.edu/" },
      ],
      quiz: [
        { q: { en: "Optimization seeks to improve an..." }, o: { en: ["Objective metric", "Color", "Name"] }, a: 0 },
        { q: { en: "A trade-off means improving one thing may..." }, o: { en: ["Worsen another", "Improve all", "Do nothing"] }, a: 0 },
      ] },
    { id: "eng-prob-international", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 450, diff: 3, prereqs: ["eng-prob-optimization"],
      name: { en: "International Engineering Challenges" },
      desc: { en: "Global competitions, team projects, real engineering briefs." },
      why: { en: "Testing your skills against world-class engineering challenges." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "FIRST / World Robot Olympiad / international contests" }, u: "https://www.firstinspires.org/" },
      ],
      quiz: null },
  ] },
  { id: "eng-mechanical", icon: "orbit", w: 900, h: 420,
    name: { en: "Mechanical Engineering" },
    desc: { en: "Thermodynamics, fluids, machine design" },
    nodes: [
    { id: "mech-thermo-eng", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Engineering Thermodynamics" },
      desc: { en: "The laws, cycles, engines, refrigeration, energy conversion." },
      why: { en: "The basis of engines, power plants, and refrigerators." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.006 → Thermal-Fluids Engineering (OCW)" }, u: "https://ocw.mit.edu/courses/2-006-thermal-fluids-engineering-ii-spring-2008/" },
      ],
      quiz: [
        { q: { en: "A heat engine converts heat into..." }, o: { en: ["Work", "Light", "Sound"] }, a: 0 },
        { q: { en: "The first law of thermodynamics is conservation of..." }, o: { en: ["Energy", "Only mass", "Charge"] }, a: 0 },
      ] },
    { id: "mech-fluids-eng", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["mech-thermo-eng"],
      name: { en: "Fluid Mechanics" },
      desc: { en: "Bernoulli, flow, viscosity, aerodynamics, pumps." },
      why: { en: "The basis of planes, pipes, pumps, and heat exchangers." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.006 → Fluid mechanics (OCW)" }, u: "https://ocw.mit.edu/courses/2-006-thermal-fluids-engineering-ii-spring-2008/" },
      ],
      quiz: [
        { q: { en: "Bernoulli's principle relates fluid speed to..." }, o: { en: ["Pressure", "Color", "Mass"] }, a: 0 },
        { q: { en: "Viscosity is a fluid's resistance to..." }, o: { en: ["Flow", "Melt", "Glow"] }, a: 0 },
      ] },
    { id: "mech-machine-design", stage: "o", pos: [450, 330], weeks: 4, h: 20, xp: 400, diff: 3, prereqs: ["mech-fluids-eng"],
      name: { en: "Machine Design" },
      desc: { en: "Fatigue, gears, bearings, shafts, factor of safety." },
      why: { en: "The art of designing reliable mechanical components." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 2.000: How and Why Machines Work" }, u: "https://ocw.mit.edu/courses/2-000-how-and-why-machines-work-spring-2002/" },
      ],
      quiz: null },
  ] },
  { id: "eng-electrical", icon: "zap", w: 900, h: 420,
    name: { en: "Electrical Engineering" },
    desc: { en: "Signals, systems, power" },
    nodes: [
    { id: "ee-signals-systems", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Signals & Systems" },
      desc: { en: "Fourier analysis, filters, convolution, discrete signals." },
      why: { en: "The math of audio, communications, and control systems." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.003 → Signals & Systems (OCW)" }, u: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/" },
      ],
      quiz: [
        { q: { en: "The Fourier transform decomposes a signal into..." }, o: { en: ["Frequencies", "Pixels", "Atoms"] }, a: 0 },
        { q: { en: "A filter modifies a signal's..." }, o: { en: ["Frequency content", "Mass", "Color"] }, a: 0 },
      ] },
    { id: "ee-power-systems", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: ["ee-signals-systems"],
      name: { en: "Power Systems" },
      desc: { en: "Generation, transmission, distribution, the grid, stability." },
      why: { en: "The electrical grid that powers modern society." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.061 → Electric Power Systems (OCW)" }, u: "https://ocw.mit.edu/courses/6-061-introduction-to-electric-power-systems-spring-2011/" },
      ],
      quiz: [
        { q: { en: "High voltage helps transmission by reducing..." }, o: { en: ["Power loss", "Color", "Size"] }, a: 0 },
        { q: { en: "The grid must balance supply and..." }, o: { en: ["Demand", "Color", "Mass"] }, a: 0 },
      ] },
    { id: "ee-power-electronics", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["ee-power-systems"],
      name: { en: "Power Electronics" },
      desc: { en: "Converters, inverters, PWM, power management." },
      why: { en: "The bridge connecting EVs, solar, wind, and batteries." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.622 → Power Electronics materials (OCW)" }, u: "https://ocw.mit.edu/courses/6-622-power-electronics-spring-2023/" },
      ],
      quiz: null },
  ] },
  { id: "eng-civil", icon: "boxes", w: 900, h: 420,
    name: { en: "Civil Engineering" },
    desc: { en: "Structures, soil, infrastructure" },
    nodes: [
    { id: "civil-structural", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Structural Analysis" },
      desc: { en: "Trusses, beams, loads, moment diagrams, reinforced concrete." },
      why: { en: "Designing bridges and buildings that are safe and economical." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 1.050 → Engineering Mechanics I (OCW)" }, u: "https://ocw.mit.edu/courses/1-050-engineering-mechanics-i-fall-2007/" },
      ],
      quiz: [
        { q: { en: "A safety factor ensures a structure can carry more than the..." }, o: { en: ["Expected load", "Color", "Only weight"] }, a: 0 },
        { q: { en: "A truss carries mostly axial..." }, o: { en: ["Forces (tension/compression)", "Heat", "Light"] }, a: 0 },
      ] },
    { id: "civil-geotech", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["civil-structural"],
      name: { en: "Geotechnical Engineering" },
      desc: { en: "Soil mechanics, foundations, slope stability, bearing capacity." },
      why: { en: "Every structure must stand on something, usually soil." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 1.361 → Geotechnical Engineering materials (OCW)" }, u: "https://ocw.mit.edu/courses/1-361-advanced-soil-mechanics-fall-2004/" },
      ],
      quiz: [
        { q: { en: "A foundation transfers building loads to the..." }, o: { en: ["Soil/rock", "Air", "Water"] }, a: 0 },
        { q: { en: "Soil mechanics studies soil behavior under..." }, o: { en: ["Load", "Light", "Sound"] }, a: 0 },
      ] },
    { id: "civil-transportation", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 2, prereqs: ["civil-geotech"],
      name: { en: "Transportation & Infrastructure" },
      desc: { en: "Roads, bridges, traffic modeling, sustainable urban planning." },
      why: { en: "The systems that connect cities and countries." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 1.041 → Transportation Systems materials (OCW)" }, u: "https://ocw.mit.edu/courses/1-041-transportation-foundations-and-methods-spring-2021/" },
      ],
      quiz: null },
  ] },
  { id: "eng-chemical", icon: "test-tube", w: 900, h: 420,
    name: { en: "Chemical Engineering" },
    desc: { en: "Balances, reaction engineering, separations" },
    nodes: [
    { id: "cheme-balances", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Mass & Energy Balances" },
      desc: { en: "Process balances, flows, recycle, unit operations." },
      why: { en: "The foundational tool of chemical plant modeling." },
      res: [
        { role: "secondary", t: "course", r: 4, l: { en: "MIT 10.302 → Transport Processes materials (OCW)" }, u: "https://ocw.mit.edu/courses/10-302-transport-processes-fall-2004/" },
      ],
      quiz: [
        { q: { en: "A mass balance is based on conservation of..." }, o: { en: ["Mass", "Color", "Speed"] }, a: 0 },
        { q: { en: "A unit operation is a basic ___ step" }, o: { en: ["Process", "Random", "Printing"] }, a: 0 },
      ] },
    { id: "cheme-reactions", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["cheme-balances"],
      name: { en: "Reaction Engineering" },
      desc: { en: "Reactor design, kinetics, catalysis, conversion, yield." },
      why: { en: "Scaling chemical reactions to industrial size." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 10.301 → Kinetics & Reaction Engineering (OCW)" }, u: "https://ocw.mit.edu/courses/10-301-kinetics-catalysis-and-reaction-engineering-fall-2022/" },
      ],
      quiz: [
        { q: { en: "Reactor design optimizes conversion and..." }, o: { en: ["Yield", "Color", "Name"] }, a: 0 },
        { q: { en: "A catalyst changes the reaction..." }, o: { en: ["Rate", "Equilibrium", "Mass"] }, a: 0 },
      ] },
    { id: "cheme-separations", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["cheme-reactions"],
      name: { en: "Separation Processes" },
      desc: { en: "Distillation, absorption, membranes, extraction, purification." },
      why: { en: "A key step in producing fuels, drugs, and materials." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 10.450: Process Dynamics & Control" }, u: "https://ocw.mit.edu/courses/10-450-process-dynamics-operations-and-control-spring-2006/" },
      ],
      quiz: null },
  ] },
  { id: "eng-aerospace", icon: "rocket", w: 900, h: 420,
    name: { en: "Aerospace Engineering" },
    desc: { en: "Aerodynamics, propulsion, flight mechanics" },
    nodes: [
    { id: "aero-aerodynamics", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Aerodynamics" },
      desc: { en: "Lift, drag, airfoil shapes, airflow." },
      why: { en: "The physics and engineering of why aircraft fly." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 16.100 → Aerodynamics (OCW)" }, u: "https://ocw.mit.edu/courses/16-100-aerodynamics-fall-2005/" },
      ],
      quiz: [
        { q: { en: "Lift opposes..." }, o: { en: ["Gravity", "Fuel", "Light"] }, a: 0 },
        { q: { en: "A wing's cross-section shape is called an..." }, o: { en: ["Airfoil", "Pixel", "Vector"] }, a: 0 },
      ] },
    { id: "aero-propulsion", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["aero-aerodynamics"],
      name: { en: "Propulsion" },
      desc: { en: "Jet engines, turbines, rockets, thrust." },
      why: { en: "The systems that push planes and rockets forward." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 16.50 → Aerospace Propulsion materials (OCW)" }, u: "https://ocw.mit.edu/courses/16-50-introduction-to-propulsion-systems-spring-2012/" },
      ],
      quiz: [
        { q: { en: "A rocket is propelled by Newton's ___ law" }, o: { en: ["Third", "First", "Zeroth"] }, a: 0 },
        { q: { en: "Thrust overcomes drag and..." }, o: { en: ["Inertia/weight", "Color", "Sound"] }, a: 0 },
      ] },
    { id: "aero-flight-mechanics", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["aero-propulsion"],
      name: { en: "Flight Mechanics & Orbits" },
      desc: { en: "Stability, control, orbital mechanics, trajectories." },
      why: { en: "The science of steering aircraft and satellites." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 16.07 → Dynamics materials (OCW)" }, u: "https://ocw.mit.edu/courses/16-07-dynamics-fall-2009/" },
      ],
      quiz: null },
  ] },
  { id: "eng-biomedical", icon: "activity", w: 900, h: 420,
    name: { en: "Biomedical Engineering" },
    desc: { en: "Biomechanics, medical devices, biosignals" },
    nodes: [
    { id: "biomed-biomechanics", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: [],
      name: { en: "Biomechanics" },
      desc: { en: "Mechanics of tissue, bone, muscle, prosthetics, implants." },
      why: { en: "Applying engineering mechanics to the human body." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 20.310 → Cellular & Tissue Biomechanics (OCW)" }, u: "https://ocw.mit.edu/courses/20-310j-molecular-cellular-and-tissue-biomechanics-spring-2015/" },
      ],
      quiz: [
        { q: { en: "Biomechanics studies mechanical forces in..." }, o: { en: ["Living tissue", "Only metal", "Gases"] }, a: 0 },
        { q: { en: "A prosthetic is an artificial..." }, o: { en: ["Organ/limb", "Motor", "Only a sensor"] }, a: 0 },
      ] },
    { id: "biomed-devices", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["biomed-biomechanics"],
      name: { en: "Medical Devices" },
      desc: { en: "Sensors, monitors, implants, safety, regulation." },
      why: { en: "Designing the medical technology that saves lives." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT → Medical Device Design materials (OCW)" }, u: "https://ocw.mit.edu/" },
      ],
      quiz: [
        { q: { en: "For medical devices, what is especially critical?" }, o: { en: ["Safety/reliability", "Color", "Only being cheap"] }, a: 0 },
        { q: { en: "A pacemaker regulates the..." }, o: { en: ["Heart rhythm", "Vision", "Hearing"] }, a: 0 },
      ] },
    { id: "biomed-imaging", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["biomed-devices"],
      name: { en: "Biosignals & Imaging" },
      desc: { en: "ECG, EEG, signal processing, MRI, CT, ultrasound." },
      why: { en: "The engineering of seeing and measuring inside the body." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 6.555 → Biomedical Signal & Image Processing (OCW)" }, u: "https://ocw.mit.edu/courses/hst-582j-biomedical-signal-and-image-processing-spring-2007/" },
      ],
      quiz: null },
  ] },
  { id: "eng-control", icon: "activity", w: 900, h: 420,
    name: { en: "Control Systems" },
    desc: { en: "Feedback, stability, automation" },
    nodes: [
    { id: "control-feedback", stage: "a", pos: [450, 60], weeks: 4, h: 20, xp: 350, diff: 3, prereqs: [],
      name: { en: "Feedback Control" },
      desc: { en: "Closed loops, PID, transfer functions, stability." },
      why: { en: "Automatically controls everything from thermostats to rockets." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.004 → Dynamics & Control II (OCW)" }, u: "https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/" },
      ],
      quiz: [
        { q: { en: "Feedback uses the ___ to adjust control" }, o: { en: ["Output (error)", "Color", "Name"] }, a: 0 },
        { q: { en: "PID stands for Proportional, Integral, and..." }, o: { en: ["Derivative", "Digital", "Direct"] }, a: 0 },
      ] },
    { id: "control-design", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["control-feedback"],
      name: { en: "Controller Design" },
      desc: { en: "Root locus, Bode, Nyquist, stability margins." },
      why: { en: "Tuning a system to be stable and responsive." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "Brian Douglas → Control Systems Lectures" }, u: "https://www.youtube.com/c/BrianBDouglas" },
      ],
      quiz: [
        { q: { en: "An unstable system's output tends to..." }, o: { en: ["Grow without bound", "Stay constant", "Go to zero"] }, a: 0 },
        { q: { en: "A Bode plot shows gain and phase vs..." }, o: { en: ["Frequency", "Mass", "Color"] }, a: 0 },
      ] },
    { id: "control-modern", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 400, diff: 3, prereqs: ["control-design"],
      name: { en: "Modern Control & Automation" },
      desc: { en: "State space, optimal control, robotics, industrial automation." },
      why: { en: "The basis of robots, self-driving cars, and smart factories." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "MIT 2.04a: Systems and Controls" }, u: "https://ocw.mit.edu/courses/2-04a-systems-and-controls-spring-2013/" },
      ],
      quiz: null },
  ] },
  { id: "eng-environmental", icon: "wind", w: 900, h: 420,
    name: { en: "Environmental & Renewable Energy" },
    desc: { en: "Renewable energy, water, sustainability" },
    nodes: [
    { id: "env-renewable", stage: "a", pos: [450, 60], weeks: 3, h: 15, xp: 350, diff: 2, prereqs: [],
      name: { en: "Renewable Energy" },
      desc: { en: "Solar, wind, hydro, geothermal, energy storage." },
      why: { en: "The biggest engineering challenge of the global climate." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 2.60 → Fundamentals of Advanced Energy Conversion (OCW)" }, u: "https://ocw.mit.edu/courses/2-60j-fundamentals-of-advanced-energy-conversion-spring-2020/" },
        { role: "secondary", t: "practice", r: 4, l: { en: "NREL → renewable energy resources" }, u: "https://www.nrel.gov/research/" },
      ],
      quiz: [
        { q: { en: "A solar panel converts sunlight into..." }, o: { en: ["Electricity", "Only heat", "Sound"] }, a: 0 },
        { q: { en: "A big challenge of renewables is..." }, o: { en: ["Storage/intermittency", "Color", "Name"] }, a: 0 },
      ] },
    { id: "env-water-treatment", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["env-renewable"],
      name: { en: "Water Treatment" },
      desc: { en: "Drinking water, wastewater, filtration, desalination." },
      why: { en: "Clean water is humanity's most vital resource." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT 1.85 → Water and Wastewater Treatment materials (OCW)" }, u: "https://ocw.mit.edu/courses/1-85-water-and-wastewater-treatment-engineering-spring-2006/" },
      ],
      quiz: [
        { q: { en: "Desalination removes ___ from water" }, o: { en: ["Salt", "Oxygen", "Color"] }, a: 0 },
        { q: { en: "An early step in water treatment is usually..." }, o: { en: ["Filtration", "Only boiling", "Drying"] }, a: 0 },
      ] },
    { id: "env-sustainability", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 400, diff: 2, prereqs: ["env-water-treatment"],
      name: { en: "Sustainable Engineering" },
      desc: { en: "Life-cycle analysis, green design, circular economy." },
      why: { en: "Engineering that accounts for future generations." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "MIT → Sustainability materials (OCW)" }, u: "https://ocw.mit.edu/" },
      ],
      quiz: null },
  ] },
  ],
  planned: [],
  paths: [
    { id: "core", icon: "🚀", tag: { en: "Core" },
      name: { en: "Core Learning" },
      desc: { en: "A complete engineering foundation for students preparing for university engineering programs." },
      branches: ["eng-math", "eng-mechanics", "eng-materials", "eng-electrical-fund", "eng-electronics-fund", "eng-cad-design"] },
    { id: "university", icon: "🎓", tag: { en: "University" },
      name: { en: "University & Research" },
      desc: { en: "A complete engineering curriculum spanning mechanical, electrical, civil, chemical, aerospace, biomedical, control, and more." },
      branches: ["eng-mechanical", "eng-electrical", "eng-civil", "eng-chemical", "eng-aerospace", "eng-biomedical", "eng-control", "eng-environmental", "eng-robotics"] },
    { id: "olympiad", icon: "🏆", tag: { en: "Design & Competitions" },
      name: { en: "Engineering Design & Competitions" },
      desc: { en: "Hands-on engineering challenges, robotics, design competitions, innovation projects, and international engineering contests." },
      branches: ["eng-comp-robotics", "eng-comp-electronics", "eng-comp-design", "eng-comp-innovation", "eng-comp-problem-solving"] },
  ],
},
{
  id: "research", icon: "🔬", hue: "#ca8a04",
  name: { en: "Research Skills" },
  desc: { en: "Reading papers, research methods, scientific writing, and mentorship." },
  branches: [
  { id: "research-core", icon: "🔬", w: 900, h: 720,
    name: { en: "Core Research Skills" },
    desc: { en: "Skills every field of research needs" },
    nodes: [
    { id: "learn-how", stage: "f", pos: [450, 60], weeks: 2, h: 8, xp: 100, diff: 1, prereqs: [],
      name: { en: "Learning How to Learn" },
      desc: { en: "How the brain works, focus, memory techniques." },
      why: { en: "Master the method and every next step doubles in speed." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Coursera → Learning How to Learn · Week 1" }, u: "https://www.coursera.org/learn/learning-how-to-learn" },
        { t: "video", r: 4, l: { en: "Barbara Oakley → TEDx: Learning how to learn" }, u: "https://www.youtube.com/watch?v=O96fE1E-rf8" },
      ],
      notes: { en: ["Alternate focused & diffuse modes", "Pomodoro: 25 min focus, 5 min rest", "Recall beats re-reading"] },
      quiz: [
        { q: { en: "Which is more effective?" }, o: { en: ["Re-reading", "Active recall", "Highlighting"] }, a: 1 },
        { q: { en: "A Pomodoro focus block is..." }, o: { en: ["25 min", "60 min", "5 min"] }, a: 0 },
      ] },
    { id: "reading-papers", stage: "f", pos: [450, 205], weeks: 2, h: 8, xp: 150, diff: 2, prereqs: ["learn-how"],
      name: { en: "Reading Papers" },
      desc: { en: "The three-pass method: abstract → figures → full read." },
      why: { en: "Reading is a researcher's #1 daily task." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Keshav → How to Read a Paper (3-page PDF)" }, u: "https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf" },
        { t: "video", r: 4, l: { en: "Andrew Ng → How to read research papers" }, u: "https://www.youtube.com/watch?v=733m6qBH-jI" },
        { t: "practice", r: 4, l: { en: "arXiv → read 1 abstract in your field" }, u: "https://arxiv.org/" },
      ],
      notes: { en: ["Pass 1: title, abstract, conclusion", "Pass 2: figures and tables", "Ask Questa AI about unknown terms"] },
      quiz: [
        { q: { en: "Read a paper first from its..." }, o: { en: ["Abstract", "References", "Middle"] }, a: 0 },
        { q: { en: "What is arXiv?" }, o: { en: ["An open paper repository", "A game", "A university"] }, a: 0 },
      ] },
    { id: "research-methods", stage: "a", pos: [250, 360], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["reading-papers"],
      name: { en: "Research Methods" },
      desc: { en: "Framing questions, hypotheses, experiment design." },
      why: { en: "A good question is half the solution." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Coursera → Understanding Research Methods · Week 1" }, u: "https://www.coursera.org/learn/research-methods" },
        { t: "video", r: 4, l: { en: "Crash Course → Statistics · Ep.1" }, u: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNM_Y-bUAhblSAdWRnmBUcr" },
      ],
      notes: { en: ["A hypothesis = a testable statement", "Always have a control group", "Correlation ≠ causation"] },
      quiz: [
        { q: { en: "A good hypothesis must be..." }, o: { en: ["Testable", "Long", "Secret"] }, a: 0 },
        { q: { en: "Ice-cream sales and drownings rise together. Cause?" }, o: { en: ["Ice cream", "Summer (a third factor)", "Not random"] }, a: 1 },
      ] },
    { id: "scientific-writing", stage: "a", pos: [650, 360], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: ["reading-papers"],
      name: { en: "Scientific Writing" },
      desc: { en: "Writing clearly, concisely, with evidence." },
      why: { en: "Unwritten research is undone research." },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Stanford → Writing in the Sciences · Unit 1" }, u: "https://www.coursera.org/learn/sciwrite" },
        { t: "video", r: 4, l: { en: "Steven Pinker → linguistics of writing (TED-style)" }, u: "https://www.youtube.com/watch?v=OV5J6BfToSw" },
      ],
      notes: { en: ["Prefer the active voice", "One paragraph = one idea", "Write a bad draft first, then refine"] },
      quiz: [
        { q: { en: "The I in IMRaD stands for..." }, o: { en: ["Introduction", "Internet", "Idea"] }, a: 0 },
        { q: { en: "Good scientific sentences are..." }, o: { en: ["Long and complex", "Short and clear", "Poetic"] }, a: 1 },
      ] },
    { id: "first-project", stage: "a", pos: [450, 505], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["research-methods", "scientific-writing"],
      name: { en: "First Mini-Research" },
      desc: { en: "Answer a small question through the full cycle: question → data → conclusion." },
      why: { en: "ISEF, RSI, professors, everyone asks 'what have you done?'" },
      res: [
        { t: "course", s: 1, r: 5, l: { en: "Science Buddies → Project Guide (step by step)" }, u: "https://www.sciencebuddies.org/science-fair-projects/science-fair" },
        { t: "practice", r: 4, l: { en: "Overleaf → Learn LaTeX in 30 minutes (write it up)" }, u: "https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes" },
      ],
      notes: { en: ["A 2-page report is enough", "Pick a small but REAL question", "Show a teacher and get feedback"] },
      quiz: null },
    { id: "find-mentor", stage: "o", pos: [450, 650], weeks: 1, h: 5, xp: 250, diff: 3, prereqs: ["first-project"],
      name: { en: "Find a Mentor" },
      desc: { en: "Use Questa AI to find researchers matching your interest." },
      why: { en: "The right mentor shortens your path by years." },
      res: [
        { t: "practice", s: 1, r: 5, l: { en: "Science Buddies: finding a mentor" }, u: "https://www.sciencebuddies.org/" },
      ],
      notes: { en: ["Use Find Professors on the Research page", "Write the email YOURSELF, sincerity shows", "No reply? Follow up politely after 2 weeks"] },
      quiz: null },
  ] },
  { id: "research-stats", icon: "📊", w: 900, h: 420,
    name: { en: "Statistical Analysis" },
    desc: { en: "Descriptive & inferential statistics, data analysis" },
    nodes: [
    { id: "stats-descriptive", stage: "f", pos: [450, 60], weeks: 3, h: 15, xp: 200, diff: 2, prereqs: [],
      name: { en: "Descriptive Statistics" },
      desc: { en: "Mean, median, spread, variance, types of distributions." },
      why: { en: "The first tool for summarizing and understanding data." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Khan Academy → Statistics & Probability" }, u: "https://www.khanacademy.org/math/statistics-probability" },
        { role: "textbook", t: "book", r: 5, l: { en: "OpenIntro Statistics" }, u: "https://www.openintro.org/book/os/" },
      ],
      quiz: [
        { q: { en: "The median is the ___ value" }, o: { en: ["Middle", "Maximum", "Mean"] }, a: 0 },
        { q: { en: "Standard deviation measures..." }, o: { en: ["Spread", "Average", "Count"] }, a: 0 },
      ] },
    { id: "stats-inference", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 3, prereqs: ["stats-descriptive"],
      name: { en: "Inferential Statistics" },
      desc: { en: "Hypothesis testing, p-values, confidence intervals, sampling." },
      why: { en: "The science of drawing conclusions about a population from a sample." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "OpenIntro Statistics → Inference chapters" }, u: "https://www.openintro.org/book/os/" },
      ],
      quiz: [
        { q: { en: "A small p-value suggests the result is..." }, o: { en: ["Statistically significant", "Random", "Wrong"] }, a: 0 },
        { q: { en: "A confidence interval gives a ___ of plausible values" }, o: { en: ["Range", "Single number", "Graph"] }, a: 0 },
      ] },
    { id: "stats-tools", stage: "o", pos: [450, 330], weeks: 3, h: 15, xp: 350, diff: 3, prereqs: ["stats-inference"],
      name: { en: "Statistical Tools" },
      desc: { en: "Python (pandas, SciPy) or R, regression, practice on real data." },
      why: { en: "The practical skill of applying theory to real data." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "SciPy & pandas → official tutorials" }, u: "https://scipy.org/" },
      ],
      quiz: null },
  ] },
  { id: "research-dataviz", icon: "📈", w: 900, h: 420,
    name: { en: "Data Visualization" },
    desc: { en: "Visualization principles, tools, data storytelling" },
    nodes: [
    { id: "dataviz-principles", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 200, diff: 2, prereqs: [],
      name: { en: "Visualization Principles" },
      desc: { en: "Chart types, when to use which, clarity, avoiding distortion." },
      why: { en: "A good chart reveals data instantly; a bad one misleads." },
      res: [
        { role: "primary", t: "book", s: 1, r: 5, l: { en: "Fundamentals of Data Visualization (C. Wilke, free)" }, u: "https://clauswilke.com/dataviz/" },
      ],
      quiz: [
        { q: { en: "Which chart best shows a trend over time?" }, o: { en: ["Line chart", "Pie chart", "Table"] }, a: 0 },
        { q: { en: "The main goal of good visualization is..." }, o: { en: ["Clarity", "Only beauty", "Color"] }, a: 0 },
      ] },
    { id: "dataviz-tools", stage: "a", pos: [450, 195], weeks: 3, h: 15, xp: 300, diff: 2, prereqs: ["dataviz-principles"],
      name: { en: "Visualization Tools" },
      desc: { en: "matplotlib, seaborn, ggplot, interactive charts." },
      why: { en: "The tools that turn ideas into real, clear charts." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "matplotlib & seaborn → official tutorials" }, u: "https://matplotlib.org/stable/tutorials/" },
      ],
      quiz: [
        { q: { en: "seaborn is built on top of..." }, o: { en: ["matplotlib", "Excel", "Word"] }, a: 0 },
        { q: { en: "Interactive charts add..." }, o: { en: ["Exploration", "Mass", "Sound"] }, a: 0 },
      ] },
    { id: "dataviz-storytelling", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 350, diff: 2, prereqs: ["dataviz-tools"],
      name: { en: "Data Storytelling" },
      desc: { en: "Narrative, dashboards, communicating results to an audience." },
      why: { en: "Data doesn't speak for itself, you have to tell its story." },
      res: [
        { t: "book", s: 1, r: 5, l: { en: "Claus Wilke: Fundamentals of Data Visualization" }, u: "https://clauswilke.com/dataviz/" },
      ],
      quiz: null },
  ] },
  { id: "research-lab", icon: "🧪", w: 900, h: 420,
    name: { en: "Laboratory Skills" },
    desc: { en: "Safety, techniques, notebooks, reproducibility" },
    nodes: [
    { id: "rlab-safety", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 200, diff: 1, prereqs: [],
      name: { en: "Lab Safety & Protocols" },
      desc: { en: "PPE, hazards, following protocols, documentation." },
      why: { en: "A safe lab is the first condition of good science." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "JoVE → Lab safety & basic methods (video)" }, u: "https://www.jove.com/science-education" },
      ],
      quiz: [
        { q: { en: "PPE stands for personal protective..." }, o: { en: ["Equipment", "Program", "Process"] }, a: 0 },
        { q: { en: "Why follow a protocol exactly?" }, o: { en: ["Safety + reproducibility", "Speed", "Cost"] }, a: 0 },
      ] },
    { id: "rlab-techniques", stage: "a", pos: [450, 195], weeks: 4, h: 20, xp: 300, diff: 2, prereqs: ["rlab-safety"],
      name: { en: "Core Lab Techniques" },
      desc: { en: "Measurement, titration, microscopy, sample prep, instruments." },
      why: { en: "The hands-on skills needed to run real experiments." },
      res: [
        { role: "primary", t: "video", s: 1, r: 5, l: { en: "JoVE → Science Education (lab techniques)" }, u: "https://www.jove.com/science-education" },
      ],
      quiz: [
        { q: { en: "Titration determines a solution's..." }, o: { en: ["Concentration", "Color", "Only mass"] }, a: 0 },
        { q: { en: "Sample prep matters because it affects..." }, o: { en: ["Result accuracy", "Color", "Only speed"] }, a: 0 },
      ] },
    { id: "rlab-notebook", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 350, diff: 2, prereqs: ["rlab-techniques"],
      name: { en: "Lab Notebooks & Reproducibility" },
      desc: { en: "Record-keeping, data storage, making work repeatable." },
      why: { en: "A result that can't be repeated isn't science." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "Open Science Framework → reproducibility guides" }, u: "https://www.cos.io/" },
      ],
      quiz: null },
  ] },
  { id: "research-ethics", icon: "⚖️", w: 900, h: 420,
    name: { en: "Research Ethics" },
    desc: { en: "Integrity, subjects' rights, authorship, citation" },
    nodes: [
    { id: "ethics-integrity", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 200, diff: 2, prereqs: [],
      name: { en: "Research Integrity" },
      desc: { en: "Honesty, plagiarism, fabrication, falsification of data." },
      why: { en: "Trust is the currency of science; ethics protects it." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "US Office of Research Integrity → resources" }, u: "https://ori.hhs.gov/" },
      ],
      quiz: [
        { q: { en: "Data fabrication means ___ data" }, o: { en: ["Making up", "Plotting", "Storing"] }, a: 0 },
        { q: { en: "Plagiarism is using others' work without..." }, o: { en: ["Credit", "Color", "Speed"] }, a: 0 },
      ] },
    { id: "ethics-subjects", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: ["ethics-integrity"],
      name: { en: "Human & Animal Subjects" },
      desc: { en: "Informed consent, IRB, privacy, animal welfare." },
      why: { en: "The ethical foundation of protecting research participants." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "NIH → Human subjects & bioethics resources" }, u: "https://www.niehs.nih.gov/research/resources/bioethics" },
      ],
      quiz: [
        { q: { en: "Informed consent ensures participants ___ before joining" }, o: { en: ["Understand and agree", "Get paid", "Give a name"] }, a: 0 },
        { q: { en: "An IRB reviews research for..." }, o: { en: ["Ethics/safety", "Grammar", "Speed"] }, a: 0 },
      ] },
    { id: "ethics-authorship", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 350, diff: 2, prereqs: ["ethics-subjects"],
      name: { en: "Authorship & Citation" },
      desc: { en: "Crediting contributions, citing correctly, conflicts of interest." },
      why: { en: "Fairly representing who did what and where ideas came from." },
      res: [
        { role: "primary", t: "course", s: 1, r: 5, l: { en: "Committee on Publication Ethics (COPE) → guidelines" }, u: "https://publicationethics.org/" },
      ],
      quiz: null },
  ] },
  { id: "research-present", icon: "🖼️", w: 900, h: 420,
    name: { en: "Posters & Presentations" },
    desc: { en: "Scientific posters, talks, Q&A" },
    nodes: [
    { id: "present-poster", stage: "f", pos: [450, 60], weeks: 2, h: 12, xp: 200, diff: 1, prereqs: [],
      name: { en: "Scientific Posters" },
      desc: { en: "Layout, title, figures, concise text, visual hierarchy." },
      why: { en: "A poster communicates your work at a glance." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "Better Posters → templates & tips" }, u: "https://betterposters.blogspot.com/" },
      ],
      quiz: [
        { q: { en: "A good poster should be..." }, o: { en: ["Clear and concise", "Full of text", "Tiny font"] }, a: 0 },
        { q: { en: "A poster title should be..." }, o: { en: ["Understandable", "Long", "Cryptic"] }, a: 0 },
      ] },
    { id: "present-talk", stage: "a", pos: [450, 195], weeks: 2, h: 12, xp: 300, diff: 2, prereqs: ["present-poster"],
      name: { en: "Research Talks" },
      desc: { en: "Slides, structure, delivery practice, timing." },
      why: { en: "Presenting ideas clearly and confidently is a skill." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "TED → How to give a great talk (guidance)" }, u: "https://www.ted.com/pages/prepare-your-speakers-performers" },
      ],
      quiz: [
        { q: { en: "A talk should open by stating the..." }, o: { en: ["Problem/goal", "Conclusion", "References"] }, a: 0 },
        { q: { en: "Slides should be..." }, o: { en: ["Simple and clear", "Text-heavy", "Tiny"] }, a: 0 },
      ] },
    { id: "present-qa", stage: "o", pos: [450, 330], weeks: 2, h: 12, xp: 350, diff: 2, prereqs: ["present-talk"],
      name: { en: "Q&A & Defense" },
      desc: { en: "Answering calmly, defending your work, taking critique." },
      why: { en: "Defending your work shows you truly understand it." },
      res: [
        { role: "primary", t: "practice", s: 1, r: 5, l: { en: "Society for Science → ISEF interview & judging tips" }, u: "https://www.societyforscience.org/isef/" },
      ],
      quiz: null },
  ] },
  ],
  planned: [],
},
];

/* flat index of every node (built once) */
const ALL_NODES = {};
const NODE_BRANCH = {};
const BRANCH_NAMES = {};
DB.subjects.forEach((s) => (s.branches || []).forEach((b) => {
  BRANCH_NAMES[b.id] = b.name || s.name;
  b.nodes.forEach((n) => {
    ALL_NODES[n.id] = { ...n, subjectId: s.id, branchId: b.id };
    NODE_BRANCH[n.id] = { subjectId: s.id, branchId: b.id };
  });
}));
function findBranch(branchId) {
  for (const s of DB.subjects) for (const b of (s.branches || [])) if (b.id === branchId) return { subject: s, branch: b };
  return null;
}

/* ═══ ROADMAP GENERATOR, composes existing courses into a personalized, phased plan ═══ */
const SUBJ_IDX_TO_ID = ["math", "physics", "chemistry", "biology", "cs", "engineering"];
const CAREER_OPTS = [
  { id: "physicist", subs: ["physics", "math"], en: "Physicist" },
  { id: "ai", subs: ["cs", "math"], en: "AI Researcher" },
  { id: "doctor", subs: ["biology", "chemistry"], en: "Doctor" },
  { id: "mathematician", subs: ["math", "cs"], en: "Mathematician" },
  { id: "aerospace", subs: ["engineering", "physics", "math"], en: "Aerospace Engineer" },
  { id: "software", subs: ["cs", "math"], en: "Software Engineer" },
  { id: "economist", subs: ["math", "cs"], en: "Economist" },
  { id: "scientist", subs: ["biology", "chemistry", "physics"], en: "Scientist" },
];
const UNI_OPTS = ["MIT", "Harvard", "Stanford", "Cambridge", "Oxford", "ETH Zürich", "Caltech", "NUS", "UC Berkeley", "Tokyo"];
const LEVEL_KEYS = ["beginner", "intermediate", "advanced"];
const DIFF_KEYS = ["easy", "balanced", "rigorous", "university", "olympiad", "research"];
const LEVEL_KEYS5 = ["beginner", "intermediate", "advanced", "competition", "research"];
const PREFLANG_KEYS = ["en", "mn", "both"];
const PROVINCES = ["Улаанбаатар", "Архангай", "Баян-Өлгий", "Баянхонгор", "Булган", "Дархан-Уул", "Дорнод", "Дорноговь", "Дундговь", "Говь-Алтай", "Говьсүмбэр", "Хэнтий", "Ховд", "Хөвсгөл", "Өмнөговь", "Орхон", "Өвөрхангай", "Сэлэнгэ", "Сүхбаатар", "Төв", "Увс", "Завхан"];
const MAJOR_GROUPS = [
  { id: "math", en: "Mathematics" },
  { id: "physics", en: "Physics" },
  { id: "cs", en: "Computer Science" },
  { id: "eng", en: "Engineering" },
  { id: "chem", en: "Chemistry" },
  { id: "bio", en: "Biology" },
  { id: "med", en: "Medical Sciences" },
  { id: "other", en: "Other" },
];
const MAJOR_OPTS = [
  { g: "math", en: "Pure Mathematics", subs: ["math"] },
  { g: "math", en: "Applied Mathematics", subs: ["math", "cs"] },
  { g: "math", en: "Statistics", subs: ["math", "cs"] },
  { g: "math", en: "Data Science", subs: ["cs", "math"] },
  { g: "math", en: "Actuarial Science", subs: ["math", "cs"] },
  { g: "math", en: "Computational Mathematics", subs: ["math", "cs"] },
  { g: "physics", en: "Physics", subs: ["physics", "math"] },
  { g: "physics", en: "Theoretical Physics", subs: ["physics", "math"] },
  { g: "physics", en: "Experimental Physics", subs: ["physics", "math"] },
  { g: "physics", en: "Astrophysics", subs: ["physics", "math"] },
  { g: "physics", en: "Quantum Physics", subs: ["physics", "math"] },
  { g: "physics", en: "Condensed Matter Physics", subs: ["physics", "math"] },
  { g: "physics", en: "Particle Physics", subs: ["physics", "math"] },
  { g: "physics", en: "Nuclear Physics", subs: ["physics", "math"] },
  { g: "physics", en: "Optical Physics", subs: ["physics", "math"] },
  { g: "physics", en: "Medical Physics", subs: ["physics", "biology"] },
  { g: "cs", en: "Computer Science", subs: ["cs", "math"] },
  { g: "cs", en: "Artificial Intelligence", subs: ["cs", "math"] },
  { g: "cs", en: "Machine Learning", subs: ["cs", "math"] },
  { g: "cs", en: "Software Engineering", subs: ["cs", "math"] },
  { g: "cs", en: "Cybersecurity", subs: ["cs", "math"] },
  { g: "cs", en: "Computer Engineering", subs: ["cs", "engineering"] },
  { g: "cs", en: "Computer Graphics", subs: ["cs", "math"] },
  { g: "cs", en: "Game Development", subs: ["cs", "math"] },
  { g: "cs", en: "Human-Computer Interaction", subs: ["cs"] },
  { g: "cs", en: "Robotics", subs: ["cs", "engineering", "physics"] },
  { g: "cs", en: "Distributed Systems", subs: ["cs", "math"] },
  { g: "eng", en: "Mechanical Engineering", subs: ["engineering", "physics"] },
  { g: "eng", en: "Electrical Engineering", subs: ["engineering", "physics", "math"] },
  { g: "eng", en: "Electronics Engineering", subs: ["engineering", "physics"] },
  { g: "eng", en: "Chemical Engineering", subs: ["engineering", "chemistry"] },
  { g: "eng", en: "Biomedical Engineering", subs: ["engineering", "biology"] },
  { g: "eng", en: "Aerospace Engineering", subs: ["engineering", "physics", "math"] },
  { g: "eng", en: "Civil Engineering", subs: ["engineering", "physics"] },
  { g: "eng", en: "Environmental Engineering", subs: ["engineering", "biology"] },
  { g: "eng", en: "Industrial Engineering", subs: ["engineering", "math"] },
  { g: "eng", en: "Materials Engineering", subs: ["engineering", "chemistry", "physics"] },
  { g: "eng", en: "Mechatronics", subs: ["engineering", "cs", "physics"] },
  { g: "eng", en: "Robotics Engineering", subs: ["engineering", "cs", "physics"] },
  { g: "eng", en: "Energy Engineering", subs: ["engineering", "physics"] },
  { g: "chem", en: "Chemistry", subs: ["chemistry"] },
  { g: "chem", en: "Organic Chemistry", subs: ["chemistry"] },
  { g: "chem", en: "Physical Chemistry", subs: ["chemistry", "physics"] },
  { g: "chem", en: "Analytical Chemistry", subs: ["chemistry"] },
  { g: "chem", en: "Inorganic Chemistry", subs: ["chemistry"] },
  { g: "chem", en: "Materials Chemistry", subs: ["chemistry", "physics"] },
  { g: "chem", en: "Medicinal Chemistry", subs: ["chemistry", "biology"] },
  { g: "chem", en: "Biochemistry", subs: ["chemistry", "biology"] },
  { g: "bio", en: "Biology", subs: ["biology"] },
  { g: "bio", en: "Molecular Biology", subs: ["biology", "chemistry"] },
  { g: "bio", en: "Cell Biology", subs: ["biology"] },
  { g: "bio", en: "Genetics", subs: ["biology"] },
  { g: "bio", en: "Biotechnology", subs: ["biology", "chemistry"] },
  { g: "bio", en: "Bioinformatics", subs: ["biology", "cs"] },
  { g: "bio", en: "Neuroscience", subs: ["biology"] },
  { g: "bio", en: "Microbiology", subs: ["biology"] },
  { g: "bio", en: "Immunology", subs: ["biology"] },
  { g: "bio", en: "Ecology", subs: ["biology"] },
  { g: "bio", en: "Human Physiology", subs: ["biology"] },
  { g: "med", en: "Medicine", subs: ["biology", "chemistry"] },
  { g: "med", en: "Dentistry", subs: ["biology", "chemistry"] },
  { g: "med", en: "Pharmacy", subs: ["chemistry", "biology"] },
  { g: "med", en: "Veterinary Medicine", subs: ["biology", "chemistry"] },
  { g: "med", en: "Public Health", subs: ["biology"] },
  { g: "med", en: "Medical Laboratory Science", subs: ["biology", "chemistry"] },
  { g: "other", en: "Other", subs: ["math", "physics"] },
];
const TOPIC_BANK = [
  { sid: "math", en: "Mathematics", topics: ["Algebra", "Geometry", "Trigonometry", "Precalculus", "Calculus", "Probability", "Statistics", "Linear Algebra", "Differential Equations", "Mathematical Proofs", "Number Theory", "Combinatorics"] },
  { sid: "physics", en: "Physics", topics: ["Mechanics", "Waves", "Electricity", "Magnetism", "Thermodynamics", "Optics", "Modern Physics", "Quantum Mechanics", "Relativity", "Nuclear Physics"] },
  { sid: "chemistry", en: "Chemistry", topics: ["Atomic Structure", "Chemical Bonding", "Stoichiometry", "Thermochemistry", "Kinetics", "Equilibrium", "Acids & Bases", "Electrochemistry", "Organic Chemistry", "Analytical Chemistry"] },
  { sid: "biology", en: "Biology", topics: ["Cell Biology", "Genetics", "Evolution", "Ecology", "Human Physiology", "Plant Biology", "Molecular Biology", "Microbiology", "Biochemistry"] },
  { sid: "cs", en: "Computer Science", topics: ["Programming Fundamentals", "Python", "C++", "Java", "JavaScript", "Object-Oriented Programming", "Data Structures", "Algorithms", "Web Development", "Databases", "Operating Systems", "Computer Networks", "Cybersecurity", "Artificial Intelligence", "Machine Learning"] },
  { sid: "engineering", en: "Engineering", topics: ["Engineering Mechanics", "Statics", "Dynamics", "Thermodynamics", "Fluid Mechanics", "Materials Science", "Machine Design", "CAD", "Circuit Analysis", "Electronics", "Digital Logic", "Electromagnetics", "Control Systems", "Signal Processing", "Mass & Energy Balances", "Transport Phenomena", "Reaction Engineering", "Process Control"] },
];
const GOAL_SUBS = { stem: ["math", "physics", "cs"], olympiad: ["math", "physics"], intl: ["cs", "math"], research: ["physics", "math"], university: ["math", "physics"], projects: ["cs", "math"], career: ["physics", "cs"], other: ["math", "physics"] };

function subjectsForProfile(p) {
  const out = [];
  const add = (id) => { if (id && DB.subjects.some((s) => s.id === id) && !out.includes(id)) out.push(id); };
  const car = CAREER_OPTS.find((c) => c.id === p.career);
  if (car) car.subs.forEach(add);
  (p.majors || []).forEach((i) => { const m = MAJOR_OPTS[i]; if (m) m.subs.forEach(add); });
  (p.goals || (p.goal ? [p.goal] : [])).forEach((g) => (GOAL_SUBS[g] || []).forEach(add));
  (p.subjects || []).forEach((i) => add(SUBJ_IDX_TO_ID[i]));
  if (!out.length) ["math", "physics", "cs"].forEach(add);
  return out;
}
/* Returns { id, name, goalKey, career, dreamUni, currentLevel, targetLevel, subjects, phases:[{key,ids}], comps, createdAt } */
function buildRoadmap(p, name) {
  const subjects = subjectsForProfile(p);
  let nodes = [];
  subjects.forEach((sid, si) => {
    const s = DB.subjects.find((x) => x.id === sid);
    if (!s || !s.branches) return;
    s.branches.slice(0, si === 0 ? 2 : 1).forEach((b) => b.nodes.forEach((nd) => nodes.push({ id: nd.id, stage: nd.stage })));
  });
  const rs = DB.subjects.find((x) => x.id === "research");
  if (rs && rs.branches[0]) rs.branches[0].nodes.slice(0, 3).forEach((nd) => nodes.push({ id: nd.id, stage: nd.stage, research: true }));
  // Low English proficiency (or Mongolian-only preference) → weave in scientific-English / academic-communication prep
  const englishLow = (typeof p.english === "number" && p.english <= 1) || p.prefLang === "mn";
  if (englishLow && rs) {
    const pres = rs.branches.find((b) => /present|writ|english|communi|paper|read/i.test(b.id) || /present|writ|english|communi|paper|read/i.test((b.name && b.name.en) || ""));
    if (pres) pres.nodes.slice(0, 3).forEach((nd) => nodes.push({ id: nd.id, stage: nd.stage, research: true }));
  }
  const seen = {}; nodes = nodes.filter((n) => !seen[n.id] && (seen[n.id] = 1));
  const f = nodes.filter((n) => n.stage === "f" && !n.research);
  const aAll = nodes.filter((n) => n.stage === "a" && !n.research);
  const half = Math.ceil(aAll.length / 2);
  const opp = nodes.filter((n) => n.stage === "o" && !n.research);
  const rsn = nodes.filter((n) => n.research);
  const phases = [
    { key: "foundation", ids: f.map((n) => n.id) },
    { key: "core", ids: aAll.slice(0, half).map((n) => n.id) },
    { key: "advanced", ids: aAll.slice(half).map((n) => n.id) },
    { key: "research", ids: [...opp, ...rsn].map((n) => n.id) },
  ].filter((ph) => ph.ids.length);
  const idset = {}; nodes.forEach((n) => (idset[n.id] = 1));
  const comps = DB.competitions.filter((c) => (c.reqs || []).some((r) => idset[r])).map((c) => c.id).slice(0, 4);
  return {
    id: "rm-" + Math.random().toString(36).slice(2, 9), name: name || "",
    goalKey: p.goal, career: p.career || "", dreamUni: (p.unis && p.unis[0]) || "",
    prefLang: p.prefLang || "both", englishLevel: typeof p.english === "number" ? p.english : 2,
    currentLevel: p.overallLevel || "beginner", targetLevel: p.difficulty || "university",
    subjects, phases, comps, createdAt: Date.now(),
  };
}
function roadmapAllIds(rm) { return rm.phases.reduce((a, ph) => a.concat(ph.ids), []); }
function roadmapName(p, lang) {
  const car = CAREER_OPTS.find((c) => c.id === p.career);
  if (car) return car[lang] || car.en;
  const g = GOALS.find((x) => x.id === p.goal);
  return g ? (g[lang] || g.en) : (lang === "mn" ? "Миний зам" : "My Path");
}
function buildCompRoadmap(opp, lang) {
  const collected = {};
  const add = (id) => { if (collected[id] || !ALL_NODES[id]) return; collected[id] = ALL_NODES[id]; (ALL_NODES[id].prereqs || []).forEach(add); };
  const reqIds = [...(opp.reqs || [])];
  if (opp.id === "nasa-space-apps") reqIds.push("ai-projects", "ai-competitions");
  reqIds.forEach(add);
  const nodes = Object.keys(collected).map((id) => collected[id]);
  const byStage = (st) => nodes.filter((n) => n.stage === st).map((n) => n.id);
  const phases = [
    { key: "foundation", ids: byStage("f") },
    { key: "core", ids: byStage("a") },
    { key: "advanced", ids: byStage("o") },
  ].filter((ph) => ph.ids.length);
  const subjects = [];
  nodes.forEach((n) => { const nb = NODE_BRANCH[n.id]; if (nb && subjects.indexOf(nb.subjectId) < 0) subjects.push(nb.subjectId); });
  return {
    id: "rm-comp-" + opp.id + "-" + Math.random().toString(36).slice(2, 6),
    name: (opp.name[lang] || opp.name.en) + (lang === "mn" ? "бэлтгэл" : "prep"),
    goalKey: "comp", career: "", dreamUni: "", prefLang: "both", englishLevel: 2,
    currentLevel: "beginner", targetLevel: "competition",
    subjects, phases, comps: [opp.id], compId: opp.id, createdAt: Date.now(),
  };
}

/* ═══ MODULE: data/competitions.js ═══
   Deadlines change yearly, so entries store REGISTRATION WINDOWS as months
   (win: {o: opens, c: closes, est: true = estimated / awaiting announcement}).
   Status (Open / Opening soon / Closing soon / Closed) is COMPUTED at runtime
, never hardcoded. elig.ok is true only where Mongolian participation is
   verified; 'check' marks entries to confirm with the national committee. */
DB.competitions = [
  { id: "research-ready", icon: "🔬", cat: "meta", level: 2, hidden: true,
    name: { en: "Research Ready" },
    desc: { en: "The full foundation kit for real research work. Unlocks the Professor Finder tool." },
    reqs: ["calculus", "python", "linear-algebra", "git", "scientific-writing"],
    link: null, elig: { ok: true, note: { en: "A core Questa milestone" } }, win: null, prep: 6,
    timeline: { en: "Foundations → Professor Finder unlocks" } },
  { id: "imo", icon: "📐", cat: "olympiad", level: 3,
    name: { en: "Int'l Mathematical Olympiad (IMO)" },
    desc: { en: "The oldest, most prestigious olympiad. Mongolia has competed since 1964!" },
    reqs: ["alg-equations", "alg-functions", "geo-triangles", "geo-circles", "trig-identities", "counting-principles", "extremal-combinatorics", "number-theory", "modular-arithmetic", "diophantine-equations", "proof-techniques", "imo-prep", "problem-sets"],
    link: "https://www.imo-official.org/",
    elig: { ok: true, note: { en: "Mongolia competes officially, qualify via the national olympiad" } },
    win: { o: 10, c: 2, est: true, note: { en: "National selection in winter; IMO in July" } },
    prep: 18, timeline: { en: "National olympiad → team selection → IMO" } },
  { id: "ipho", icon: "⚛️", cat: "olympiad", level: 3,
    name: { en: "Int'l Physics Olympiad (IPhO)" },
    desc: { en: "The world's top theory + experiment test. (Link: problem archive)" },
    reqs: ["newton-dynamics", "work-energy", "momentum", "rotational", "oscillations", "waves-sound", "optics", "thermo-laws", "kinetic-theory", "entropy", "electric-field", "gauss-law", "magnetic-field", "em-induction", "old-quantum"],
    link: "https://ipho-unofficial.org/",
    elig: { ok: true, note: { en: "Mongolia competes officially, qualify via the national olympiad" } },
    win: { o: 10, c: 2, est: true, note: { en: "National selection in winter; IPhO in July" } },
    prep: 18, timeline: { en: "National olympiad → team → IPhO" } },
  { id: "ioi", icon: "🖥️", cat: "olympiad", level: 3,
    name: { en: "Int'l Olympiad in Informatics (IOI)" },
    desc: { en: "The world championship of algorithms." },
    reqs: ["ds-arrays-lists", "ds-trees-graphs", "ds-hash-heaps", "algo-sorting", "algo-complexity", "algo-divide-conquer", "cp-graph-traversal", "cp-shortest-paths", "cp-dp-intro", "cp-dp-patterns", "cp-number-theory", "cp-ioi-prep", "cp-past-ioi"],
    link: "https://ioinformatics.org/",
    elig: { ok: true, note: { en: "Mongolia competes officially, qualify nationally" } },
    win: { o: 9, c: 1, est: true, note: { en: "National selection autumn–winter" } },
    prep: 18, timeline: { en: "National olympiad → team → IOI (summer)" } },
  { id: "icho", icon: "🧪", cat: "olympiad", level: 3,
    name: { en: "Int'l Chemistry Olympiad (IChO)" },
    desc: { en: "The international theory + lab olympiad." },
    reqs: ["atom-subatomic", "electron-config", "periodic-trends", "bond-types", "vsepr-geometry", "mole-concept", "rate-laws-core", "equilibrium-const", "acid-base-theories", "redox-basics", "organic-intro", "functional-groups", "organic-reactions", "icho-theory-prep", "oly-physical-problems", "oly-inorganic-problems", "oly-organic-problems", "icho-past-problems"],
    link: "https://www.ichosc.org/",
    elig: { ok: true, note: { en: "Mongolia participates, qualify via the national chemistry olympiad" } },
    win: { o: 10, c: 2, est: true, note: { en: "National selection in winter; IChO in July" } },
    prep: 15, timeline: { en: "National olympiad → team → IChO" } },
  { id: "ibo", icon: "🧬", cat: "olympiad", level: 3,
    name: { en: "Int'l Biology Olympiad (IBO)" },
    desc: { en: "The world's theory + practical biology olympiad." },
    reqs: ["biomolecules-bio", "enzymes-bio", "cellular-respiration", "photosynthesis-core", "gene-regulation-adv", "natural-selection", "ecosystems", "major-systems", "oly-cell-molecular-theory", "oly-genetics-problems", "oly-plant-physiology", "oly-animal-physiology", "oly-ecology-problems", "ibo-theory-prep", "ibo-past-problems"],
    link: "https://www.ibo-info.org/",
    elig: { ok: true, note: { en: "Mongolia participates, qualify via the national biology olympiad" } },
    win: { o: 10, c: 2, est: true, note: { en: "National selection in winter; IBO in July" } },
    prep: 15, timeline: { en: "National olympiad → team → IBO" } },
  { id: "ioaa", icon: "🔭", cat: "olympiad", level: 3,
    name: { en: "Int'l Olympiad on Astronomy & Astrophysics" },
    desc: { en: "The international olympiad of stars, planets, observation." },
    reqs: ["kinematics", "newton-dynamics", "optics", "waves-sound", "em-radiation", "old-quantum"],
    link: "https://ioaastrophysics.org/",
    elig: { ok: "check", note: { en: "Confirm participation with the national olympiad committee" } },
    win: { o: 11, c: 3, est: true, note: { en: "Selection winter–spring (estimated)" } },
    prep: 15, timeline: { en: "National selection → team → IOAA" } },
  { id: "egmo", icon: "🌸", cat: "olympiad", level: 3,
    name: { en: "European Girls' Math Olympiad (EGMO)" },
    desc: { en: "The prestigious girls' olympiad, Mongolia has taken part as a guest country." },
    reqs: ["alg-equations", "geo-triangles", "geo-circles", "counting-principles", "number-theory", "modular-arithmetic", "proof-techniques", "imo-prep", "problem-sets"],
    link: "https://www.egmo.org/",
    elig: { ok: true, note: { en: "Girls' team, as a guest country; via national selection" } },
    win: { o: 10, c: 1, est: true, note: { en: "Selection autumn–winter; EGMO in April" } },
    prep: 15, timeline: { en: "Selection → team → EGMO (April)" } },
  { id: "nasa-space-apps", icon: "🛰️", cat: "hackathon", level: 1, featured: true, volunteerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfm6N_ZJxh-oZJ2DQTxaAqQTygIwnPCmG5uFEZ7UHad36KNtA/viewform?usp=publish-editor",
    name: { en: "NASA Space Apps, Ulaanbaatar" },
    desc: { en: "Build solutions with NASA open data in 48 hours, an international competition, happening here!" },
    reqs: ["python"],
    link: "https://www.spaceappschallenge.org/",
    elig: { ok: true, note: { en: "Anyone can join, a local event runs in Ulaanbaatar" } },
    win: { o: 7, c: 10, est: true, note: { en: "November 14-15, 2026" } },
    prep: 2, timeline: { en: "Register → form a team → 48-hour hackathon" } },
  { id: "conrad", icon: "💡", cat: "research", level: 2,
    name: { en: "Conrad Challenge" },
    desc: { en: "An international online innovation + entrepreneurship challenge (ages 13-18)." },
    reqs: ["first-project"],
    link: "https://www.conradchallenge.org/",
    elig: { ok: true, note: { en: "Open internationally, online teams" } },
    win: { o: 8, c: 11, est: true, note: { en: "Registration in autumn (estimated)" } },
    prep: 4, timeline: { en: "Idea → Innovation Stage → Finals" } },
  { id: "technovation", icon: "📱", cat: "hackathon", level: 1,
    name: { en: "Technovation Girls" },
    desc: { en: "Girls build app/AI projects and compete globally." },
    reqs: ["python"],
    link: "https://technovationchallenge.org/",
    elig: { ok: true, note: { en: "Open worldwide to girls ages 8-18" } },
    win: { o: 10, c: 4, est: true, note: { en: "Season runs autumn → spring" } },
    prep: 4, timeline: { en: "Team → 12-week program → submission" } },
  { id: "first-global", icon: "🌐", cat: "robotics", level: 2,
    name: { en: "FIRST Global Challenge" },
    desc: { en: "One team per nation, the robotics 'olympics'. Mongolia fields a team yearly." },
    reqs: ["arduino"],
    link: "https://first.global/",
    elig: { ok: true, note: { en: "Via Mongolia's national team, seek out team openings" } },
    win: { o: 3, c: 6, est: true, note: { en: "Team formation in spring; event in autumn" } },
    prep: 6, timeline: { en: "Team → build season → world event" } },
  { id: "vex", icon: "⚙️", cat: "robotics", level: 2,
    name: { en: "VEX Robotics" },
    desc: { en: "One of the world's largest robotics leagues." },
    reqs: ["arduino", "eng-project"],
    link: "https://www.vexrobotics.com/",
    elig: { ok: "check", note: { en: "Needs team registration & school/club support, check the local league" } },
    win: { o: 5, c: 11, est: true, note: { en: "Season opens in summer (estimated)" } },
    prep: 6, timeline: { en: "Team → season matches → championship" } },
  { id: "wro", icon: "🤖", cat: "robotics", level: 2,
    name: { en: "World Robot Olympiad" },
    desc: { en: "Build robots, compete globally, Mongolian teams enter every year." },
    reqs: ["arduino"],
    link: "https://wro-association.org/",
    elig: { ok: true, note: { en: "Mongolia holds a national qualifier" } },
    win: { o: 3, c: 7, est: true, note: { en: "National round spring–summer" } },
    prep: 6, timeline: { en: "National qualifier → international final" } },
  { id: "iymc", icon: "🧮", cat: "olympiad", level: 1,
    name: { en: "Int'l Youth Math Challenge (IYMC)" },
    desc: { en: "A fully online math competition, a perfect first contest." },
    reqs: ["algebra-oly", "proofs"],
    link: "https://iymc.info/",
    elig: { ok: true, note: { en: "Fully online, open to students worldwide" } },
    win: { o: 8, c: 10, est: true, note: { en: "Rounds in autumn (estimated)" } },
    prep: 2, timeline: { en: "Qualification → Pre-Final → Final" } },
  { id: "kaggle", icon: "📊", cat: "hackathon", level: 1,
    name: { en: "Kaggle Competitions" },
    desc: { en: "The world's ML arena, real data, real prizes." },
    reqs: ["ml"],
    link: "https://www.kaggle.com/competitions",
    elig: { ok: true, note: { en: "Worldwide, ages 13+" } },
    win: { always: true },
    prep: 3, timeline: { en: "Getting Started → Featured competitions" } },
  { id: "isef", icon: "🏆", cat: "research", level: 3,
    name: { en: "ISEF" },
    desc: { en: "The world's largest pre-college science fair, $9M in awards." },
    reqs: ["research-methods", "scientific-writing", "first-project"],
    link: "https://www.societyforscience.org/isef/",
    elig: { ok: "check", note: { en: "Path runs through an affiliated fair, verify Mongolia's qualifier" } },
    win: { o: 11, c: 2, est: true, note: { en: "Local fairs in winter; ISEF in May" } },
    prep: 12, timeline: { en: "Research → affiliated fair → ISEF" } },
  { id: "mit-primes", icon: "🎓", cat: "research", level: 3,
    name: { en: "MIT PRIMES / CrowdMath" },
    desc: { en: "MIT's year-long math research program." },
    reqs: ["linear-algebra", "number-theory", "proofs"],
    link: "https://math.mit.edu/research/highschool/primes/",
    elig: { ok: "check", note: { en: "Main program is US-based; international students can join CrowdMath" } },
    win: { o: 9, c: 12, est: true, note: { en: "Applications in autumn (estimated)" } },
    prep: 12, timeline: { en: "Application + problem set → year of research" } },
  { id: "rsi", icon: "🧬", cat: "research", level: 3,
    name: { en: "RSI (Research Science Institute)" },
    desc: { en: "~80 top students worldwide do summer research at MIT." },
    reqs: ["calculus", "first-project", "scientific-writing"],
    link: "https://www.cee.org/programs/research-science-institute",
    elig: { ok: true, note: { en: "A few international spots, extremely competitive" } },
    win: { o: 10, c: 1, est: true, note: { en: "Applications in winter; program in summer" } },
    prep: 12, timeline: { en: "Apply → selection → summer at MIT" } },
  { id: "icpc", icon: "💠", cat: "olympiad", level: 3, uni: true,
    name: { en: "ICPC (university)" },
    desc: { en: "The world championship for university teams, a future goal." },
    reqs: ["ds-trees-graphs", "ds-hash-heaps", "algo-complexity", "cp-graph-traversal", "cp-shortest-paths", "cp-dp-intro", "cp-dp-patterns", "cp-graph-adv", "cp-icpc-prep"],
    link: "https://icpc.global/",
    elig: { ok: true, note: { en: "For university students, lay the base now" } },
    win: { o: 9, c: 11, est: true, note: { en: "Regionals in autumn" } },
    prep: 24, timeline: { en: "University → regionals → World Finals" } },
];

/* ═══ MODULE: data/announcements.js ═══ */
DB.announcements = [
  { id: "a1", pinned: false, date: "2026.07",
    title: "NASA Space Apps 2026, Улаанбаатар удахгүй!",
    body: "Дэлхийн хамгийн том хакатон **10-р сард** Улаанбаатарт болно.\n- Багаа одооноос бүрдүүл\n- Python замаа дуусга\n- [Албан ёсны сайт](https://www.spaceappschallenge.org/)" },
];

/* ═══ MODULE: lib/helpers.js ═══ */
const NOW = new Date();
function fmtMonth(lang, m) {
  return lang === "mn" ? m + "-р сар" : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m - 1];
}
function compStatus(c) {
  if (c.win && c.win.always) return "always";
  if (!c.win || c.win.o == null) return "tba";
  const m = NOW.getMonth() + 1, o = c.win.o, cl = c.win.c;
  const inWin = o <= cl ? m >= o && m <= cl : m >= o || m <= cl;
  if (inWin) {
    const until = m <= cl ? cl - m : cl + 12 - m;
    return until <= 0 ? "closing" : "open";
  }
  const untilOpen = m < o ? o - m : o + 12 - m;
  return untilOpen <= 1 ? "soon" : "closed";
}
function isNodeAvailable(node, completed) { return node.prereqs.every((p) => completed[p]); }
function branchProgress(branch, completed) {
  const done = branch.nodes.filter((n) => completed[n.id]).length;
  return { done, total: branch.nodes.length, pct: Math.round((done / branch.nodes.length) * 100) };
}
function subjectProgress(subject, completed) {
  const nodes = (subject.branches || []).flatMap((b) => b.nodes);
  const done = nodes.filter((n) => completed[n.id]).length;
  return { done, total: nodes.length, pct: nodes.length ? Math.round((done / nodes.length) * 100) : 0 };
}
function oppStatus(opp, completed) {
  const doneList = opp.reqs.filter((r) => completed[r]);
  const missing = opp.reqs.filter((r) => !completed[r]);
  return { unlocked: missing.length === 0, doneList, missing, pct: Math.round((doneList.length / opp.reqs.length) * 100) };
}
function estimateWeeks(missing) { return missing.reduce((s, id) => s + (ALL_NODES[id] ? ALL_NODES[id].weeks : 0), 0); }
function researchReadyStatus(user, completed, baseOpp) {
  let reqs = baseOpp && baseOpp.reqs ? baseOpp.reqs.slice() : [];
  if (user && user.pathway) {
    const subj = DB.subjects.find((x) => x.id === user.pathway);
    if (subj) {
      const extra = [];
      for (const b of (subj.branches || [])) for (const n of (b.nodes || []))
        if (/research|capstone|thesis/.test(n.id)) extra.push(n.id);
      reqs = reqs.concat(extra.slice(0, 6));
    }
  }
  reqs = Array.from(new Set(reqs));
  const doneList = reqs.filter((r) => completed[r]);
  const missing = reqs.filter((r) => !completed[r]);
  return { unlocked: missing.length === 0, doneList, missing, pct: reqs.length ? Math.round((doneList.length / reqs.length) * 100) : 0, reqs };
}
function hoursStudied(completed) { return Object.keys(completed).reduce((s, id) => s + (ALL_NODES[id] ? ALL_NODES[id].h : 0), 0); }
function estimateHours(missing) { return missing.reduce((s, id) => s + (ALL_NODES[id] ? ALL_NODES[id].h : 0), 0); }
function weeksRange(hours, hoursPerDay) {
  const w = hours / (Math.max(0.25, hoursPerDay) * 7);
  const lo = Math.max(1, Math.floor(w));
  let hi = Math.ceil(w); if (hi <= lo) hi = lo + 1;
  return [lo, hi];
}
/* Before a tailored roadmap exists (no hoursPerDay) → show total hours only.
   After → show a week RANGE computed from the student's daily pace. */
function paceLabel(hours, user, t) {
  const h = Math.round(hours);
  if (!user || !user.hoursPerDay) return h + " " + t.hoursShort;
  const [lo, hi] = weeksRange(hours, user.hoursPerDay);
  return lo + "-" + hi + " " + t.weeks;
}
/* Progression phase (not time-based), every student moves at their own pace. */
function phaseName(stage, t) { return stage === "f" ? t.phF : stage === "a" ? t.phA : t.phO; }
function bookSearchUrl(label) {
  const s = String(label || "").split(" · ")[0].replace(/→/g, " ").replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
  return "https://www.google.com/search?tbm=bks&q=" + encodeURIComponent(s);
}
const LEARN_LAYERS = [
  { key: "mn", icon: "🇲🇳", title: { en: "Learn in Mongolian" }, purpose: { en: "start in your language" } },
  { key: "visual", icon: "🎬", title: { en: "Build intuition" }, purpose: { en: "see it visually" } },
  { key: "practice", icon: "✏️", title: { en: "Practice" }, purpose: { en: "solve problems" } },
  { key: "university", icon: "🎓", title: { en: "Go deeper" }, purpose: { en: "university level" } },
  { key: "research", icon: "🔬", title: { en: "Research & tools" }, purpose: { en: "real tools" } },
];
function resLayers(res) {
  const L = { visual: [], practice: [], university: [], research: [] };
  (res || []).forEach((r) => {
    const u = (r.u || "").toLowerCase();
    const lab = (((r.l && r.l.en) || "") + " " + ((r.l && r.l.mn) || "")).toLowerCase();
    const s = u + " " + lab;
    // Mongolian-language sources
    if (/khanacademymongolia|youtube\.com\/@khanacademymongol|medle\./.test(u)) { L.mn.push(r); return; }
    // Research: papers, research tools, real software
    if (/arxiv\.org|qiskit|quantum\.ibm|quantum-computing\.ibm|playground\.tensorflow|kaggle\.com|iter\.org|ligo|home\.cern|pdg\.lbl|nist\.gov|scipy-lectures|projecteuler/.test(u)) { L.research.push(r); return; }
    // Practice: exercises, problems, judges
    if (r.t === "practice" || /codeforces|cses\.fi|oj\.uz|usaco|leetcode|alcumus|artofproblem/.test(u)) { L.practice.push(r); return; }
    // Simulations: interactive learning tools -> visual; genuine research sims -> research
    if (r.t === "sim") {
      if (/phet|colorado\.edu|immersivemath|geogebra|desmos|falstad|visualgo|pythontutor|tinkercad/.test(u)) L.visual.push(r);
      else L.research.push(r);
      return;
    }
    // Videos: MIT/OCW lectures -> university; other videos (3B1B etc.) -> visual intuition
    if (r.t === "video") { if (/ocw\.mit|mit ocw|mit \d|lecture/.test(s)) L.university.push(r); else L.visual.push(r); return; }
    // Khan Academy (accessible foundations) -> visual
    if (u.includes("khanacademy")) { L.visual.push(r); return; }
    // courses, books, lecture notes, textbooks -> university
    L.university.push(r);
  });
  return L;
}
function compSubjects(comp) {
  const set = new Set();
  (comp.reqs || []).forEach((id) => { const nb = NODE_BRANCH[id]; if (nb) set.add(nb.subjectId); });
  return set;
}
function nextAvailableInBranch(branch, completed, limit = 3) {
  return branch.nodes.filter((n) => !completed[n.id] && isNodeAvailable(n, completed)).slice(0, limit);
}
function nextAvailableForSubject(subjectId, completed, limit = 3) {
  const s = DB.subjects.find((x) => x.id === subjectId);
  if (!s) return [];
  const out = [];
  for (const b of s.branches || []) for (const n of nextAvailableInBranch(b, completed, limit)) { out.push(n); if (out.length >= limit) return out; }
  return out;
}
const GOAL_TO_OPP = { stem: "research-ready", research: "research-ready", university: "research-ready", career: "research-ready", other: "research-ready", projects: "kaggle", intl: "nasa-space-apps", olympiad: "imo" };
function primaryOpp(user, completed, comps) {
  const list = comps.filter((c) => !c.archived);
  let opp = list.find((o) => o.id === (user ? GOAL_TO_OPP[user.goal] : "research-ready")) || list[0];
  if (opp && oppStatus(opp, completed).unlocked) {
    const locked = list.find((o) => !o.hidden && !oppStatus(o, completed).unlocked);
    if (locked) opp = locked;
  }
  return opp;
}
function makePlan(minutes, node, lang) {
  const t = I18N[lang];
  const quizMin = node.quiz ? Math.min(12, Math.round(minutes * 0.15)) : 0;
  let pool = minutes - quizMin;
  const picks = node.res.slice(0, 3);
  const shares = picks.length === 1 ? [1] : picks.length === 2 ? [0.55, 0.45] : [0.45, 0.33, 0.22];
  const steps = picks.map((r, i) => ({ min: Math.max(10, Math.round(pool * shares[i])), act: t.planActs[r.t], label: r.l[lang], u: r.u }));
  if (quizMin) steps.push({ min: quizMin, act: t.planActs.quiz, label: node.name[lang], u: null });
  return steps;
}
function ruleBasedOnboarding(profile, lang) {
  const goal = GOALS.find((g) => g.id === profile.goal) || GOALS[0];
  const subject = goal.path;
  const known = new Set();
  if (profile.calc === 2) { known.add("algebra"); known.add("calculus"); }
  if (profile.calc === 1) known.add("algebra");
  if (profile.coding >= 1) known.add("python");
  if (profile.coding === 2) known.add("git");
  if (profile.research >= 1) known.add("learn-how");
  const alreadyKnows = [...known];
  const subjName = DB.subjects.find((s) => s.id === subject).name[lang];
  const message =
    lang === "mn"
      ? `${profile.name || "Сайн уу"}! Чиний зорилго «${goal.mn}» тул би ${subjName} чиглэлээс эхлэхийг зөвлөж байна. ${alreadyKnows.length ? "Мэддэг сэдвүүдийг чинь аль хэдийн тооцлоо, шууд ахисан шатнаас эхэлнэ!" : "Суурийг бататгаад алхам алхмаар өгсөнө."} Долоо хоног бүр багахан ч гэсэн урагшилвал 3 жилийн дараа мөрөөдөл чинь бодит зорилго болно. ✦`
      : `${profile.name || "Hi"}! Since your goal is “${goal.en}”, I recommend starting in ${subjName}. ${alreadyKnows.length ? "I've credited what you already know, you start ahead!" : "We'll solidify foundations step by step."} Small weekly progress turns your 3-year dream into a plan. ✦`;
  return { pathway: subject, alreadyKnows, message };
}
function buildSystemPrompt(state) {
  const { lang, user, xp, completed, comps, saved, roadmaps, activeRoadmap } = state;
  const lv = levelFromXp(xp);
  const rmActive = roadmaps ? (roadmaps.find((r) => r.id === activeRoadmap) || roadmaps[0] || null) : null;
  const rmNextCourses = rmActive ? roadmapAllIds(rmActive).filter((id) => !completed[id]).slice(0, 5).map((id) => (ALL_NODES[id] ? ALL_NODES[id].name.en : id)).join(", ") || "all done!" : "-";
  const branches = DB.subjects.map((s) =>
    s.icon + " " + s.name.en + ": " + (s.branches || []).map((b) => {
      const pr = branchProgress(b, completed);
      return `${b.name.en} ${pr.done}/${pr.total}`;
    }).join(" | ")
  ).join("\n");
  const nextIds = user ? nextAvailableForSubject(user.pathway, completed, 4).map((n) => n.name.en).join(", ") : "-";
  const opps = comps.filter((c) => !c.archived).map((o) => {
    const st = oppStatus(o, completed);
    return `${o.name.en} [${compStatus(o)}]: ${st.pct}% ready` + (st.unlocked ? " (all required topics done!)" : ", still needs: " + st.missing.slice(0, 6).map((m) => (ALL_NODES[m] ? ALL_NODES[m].name.en : m)).join(", ") + (st.missing.length > 6 ? ` +${st.missing.length - 6} more` : ""));
  }).join("\n");
  const p = user
    ? `Name: ${user.name} | Grade: ${user.gradeLabel || "-"} | Country: ${user.country || "Mongolia"} | Goal: ${(GOALS.find((g) => g.id === user.goal) || {}).en || "-"} | Dream uni: ${user.dreamUni || "-"} | Major: ${user.major || "-"} | GPA: ${user.gpa || "-"} | SAT/ACT: ${user.sat || "-"} | Weekly hours: ${user.hours || "-"} | Prog. languages: ${user.langs || "-"} | Interests: ${user.interests || "-"} | Coding ${user.coding}/2, Calc ${user.calc}/2, Research ${user.research}/2 | Dream: ${user.dream || "-"} | Saved: ${(saved || []).join(", ") || "-"}`
    : "Not onboarded yet, gently suggest pressing the big roadmap button to start.";
  return `You are the AI assistant (🤖) inside Questa, a warm, encouraging mentor for ambitious Mongolian students. Questa is a roadmap platform that guides students toward world-class STEM opportunities: olympiads, research, scholarships, and top universities. Most Mongolian students have no mentor for this journey, no one who knows the path. That is your role. You are the guide who always knows where the student is, what they should learn next, and how it connects to their dream. You do not replace their learning (that happens on the resources); you keep them oriented, motivated, and moving.

STUDENT PROFILE: ${p}
XP: ${xp} | Level ${lv + 1} "${LEVEL_TITLES.en[lv]}" | Hours studied: ${hoursStudied(completed)}
NEXT AVAILABLE TOPICS: ${nextIds}
THEIR ROADMAP, NEXT COURSES ON THEIR PERSONAL PATH: ${rmNextCourses}
(When relevant, proactively remind the student of the next course on their roadmap and nudge them toward it, you are their roadmap guide.)

BRANCH PROGRESS:
${branches}

COMPETITIONS (status computed from registration windows):
${opps}

HOW TO MENTOR (this is your main job, do it well):
- "What should I do next / this week?" -> Give a small, concrete plan: name the exact next 1-2 topics from their roadmap, the first resource to open, and which competition or goal it moves them toward. Size it to their weekly hours. One clear step beats ten.
- "Am I ready for [competition]?" -> Use their readiness %. Name the specific topics they still need. Be honest but encouraging: "You are 45% there, focus on X and Y next."
- "Can I get into [university] / win a scholarship?" -> Be honest and specific about what it takes, point them to the Opportunities pages and the Professor Finder, and give one concrete next step. Never crush the dream, never inflate it either.
- "How do I get into research?" -> Point to the Research path and the Professor Finder, and give one small first step they can do today.
- When they seem lost, stuck, or overwhelmed, zoom out: remind them of their goal and the single next step. You are their compass, not a lecture.

RULES:
- Reply in ${user && user.prefLang === "en" ? "English" : user && user.prefLang === "mn" ? "Mongolian (Монгол хэлээр)" : user && user.prefLang === "both" ? "whichever language the student writes in (Mongolian or English)" : (lang === "mn" ? "Mongolian (Монгол хэлээр)" : "English")}. When you use a key scientific term, keep the original English term alongside the Mongolian (e.g. "цахилгаан орон (electric field)") so the student gradually builds scientific English. Explain concepts for conceptual understanding, not literal word-for-word translation.
- Be concise (under ~150 words), warm, concrete. Use the student's name sometimes.
- Recommend SPECIFIC next topics by exact name and the exact resource to start with; tie advice to unlocking competitions.
- You may explain any STEM concept simply, with one small example.
- NEVER draft, write, or template emails/messages to professors. If asked, kindly refuse and point to the Professor Finder on the Research page + remind them a self-written sincere email works best.
- Competition dates are estimates; tell students to verify on official sites.
- Never invent progress. If unsure, ask one short question.`;
}

/* ═══ context ═══ */
/* ═══ CMS: editable business-content schema + deep helpers ═══ */
function getDeep(obj, path) { return path.split(".").reduce((o, p) => (o == null ? o : o[p]), obj); }
function setDeep(obj, path, val) {
  const parts = path.split("."); let o = obj;
  for (let i = 0; i < parts.length - 1; i++) { if (o[parts[i]] == null) o[parts[i]] = {}; o = o[parts[i]]; }
  o[parts[parts.length - 1]] = val;
}
function walkContent(obj, prefix, out) {
  for (const k in obj) {
    const v = obj[k]; const path = prefix ? prefix + "." + k : k;
    if (typeof v === "string") out.push({ key: path, type: "string" });
    else if (Array.isArray(v)) {
      if (v.length && v.every((x) => typeof x === "string")) out.push({ key: path, type: "array" });
      else if (v.length && v.every((x) => Array.isArray(x) && x.every((y) => typeof y === "string"))) out.push({ key: path, type: "matrix" });
    } else if (v && typeof v === "object") walkContent(v, path, out);
  }
}
function catForKey(k) {
  const s = (...ps) => ps.some((p) => k === p || k.startsWith(p));
  if (s("hero", "cta", "explore", "how", "readyBand", "stats")) return "Homepage";
  if (k === "nav") return "Navigation";
  if (s("subjects", "choose", "specialize", "openTree", "tracks", "backTo", "plannedLabel", "plannedNote", "liveBadge", "branchesLabel")) return "Subjects";
  if (s("stage", "locked", "why", "timeLabel", "resources", "startHere", "rt", "roles", "obj", "miscon", "applic", "relComp", "relResearch", "unlocks", "keyIdeas", "notes", "helpful", "fbThanks", "askAI", "milestone", "module", "difficulty")) return "Roadmaps";
  if (s("ai", "chat", "quick")) return "AI";
  if (s("research", "findProf", "interest", "org", "searchBtn", "searching", "prof", "skills", "scan")) return "Research";
  if (s("opp", "req", "view", "prep", "match", "st", "est", "window", "elig", "uni", "months", "saved", "d1", "d2", "d3")) return "Competitions";
  if (s("nasa")) return "Scholarships";
  if (s("quiz")) return "Quizzes";
  if (s("ob", "grade", "subj", "coding", "calc", "eng", "dream", "welcome", "goal")) return "Authentication";
  if (s("hi", "level", "xp", "next", "guide", "myPath", "continue", "oppReady", "startJourney", "hours", "mastered", "completion", "deadlines", "planner", "plan", "calendar", "profile", "edit", "pf", "portfolio", "auto", "addEntry", "entry", "readiness", "estimate", "unlocked", "weeks", "missing", "goToNext")) return "Dashboard";
  if (s("search", "sTopics", "sComps", "sBranches")) return "Search";
  if (s("foot", "demo", "admin", "ann", "filter", "saveBtn", "cancel", "addComp", "del", "archive", "feature", "langBtn")) return "Footer";
  return "Other";
}
function prettyKey(k) { return k.split(".").map((p) => p.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase())).join(" \u203a "); }
const CMS_SCHEMA = (() => { const out = []; walkContent(I18N.en, "", out); return out.map((it) => ({ ...it, cat: catForKey(it.key.split(".")[0]), desc: prettyKey(it.key) })); })();
const CMS_CATS = ["Homepage", "Navigation", "Subjects", "Roadmaps", "AI", "Research", "Competitions", "Scholarships", "Quizzes", "Authentication", "Dashboard", "Search", "Footer", "Other"].filter((c) => CMS_SCHEMA.some((it) => it.cat === c));

const QuestaCtx = createContext(null);
const useQ = () => useContext(QuestaCtx);

/* ═══ MODULE: components/atoms.jsx ═══ */
const cx = (...a) => a.filter(Boolean).join(" ");

/* ═══ Vector icon system (replaces emoji) ═══ */
const SUBJECT_ICONS = { physics: Atom, math: Sigma, cs: Cpu, chemistry: FlaskConical, biology: Dna, engineering: Wrench, research: Microscope };
const PATH_ICONS = { core: BookOpen, university: GraduationCap, olympiad: Trophy };
const COMP_ICONS = { imo: Sigma, ipho: Atom, ioi: Cpu, icho: FlaskConical, ibo: Dna, ioaa: Telescope, egmo: Sigma, "research-ready": Microscope };
const GOAL_ICONS = { researcher: Microscope, ai: Cpu, olympiad: Trophy, intl: Globe, explore: Compass, builder: Wrench };
function pickIcon(id = "", subject = "") {
  if (SUBJECT_ICONS[id]) return SUBJECT_ICONS[id];
  if (PATH_ICONS[id]) return PATH_ICONS[id];
  if (COMP_ICONS[id]) return COMP_ICONS[id];
  if (GOAL_ICONS[id]) return GOAL_ICONS[id];
  const k = String(id).toLowerCase();
  const has = (...w) => w.some((x) => k.includes(x));
  // ── Physics ──
  if (has("mechanic", "kinemat", "newton", "dynamic", "lagrang", "hamilton", "momentum", "energy")) return Orbit;
  if (has("-em", "electro", "magnet", "circuit", "charge", "current", "capacit", "resist", "induction", "maxwell", "coulomb", "gauss", "biot", "ampere", "lorentz")) return Zap;
  if (has("wave", "oscill", "sound", "acoustic")) return Waves;
  if (has("optic", "light", "lens", "mirror", "reflect", "refract")) return Eye;
  if (has("thermo", "heat", "entropy", "gas", "statmech", "kinetic")) return Flame;
  if (has("nuclear", "radioact", "fission", "fusion")) return Radiation;
  if (has("particle", "standard-model", "quark", "higgs", "feynman", "gauge")) return Sparkles;
  if (has("astro", "cosmo", "stellar", "galax", "universe", "celestial")) return Telescope;
  if (has("plasma")) return Wind;
  if (has("condensed", "crystal", "solid", "material", "band", "semiconduct")) return Boxes;
  if (has("relativ", "-gr", "black-hole", "spacetime", "geodesic", "einstein", "tensor")) return Orbit;
  if (has("quantum", "atom", "modern", "photon", "spin", "wavefunction")) return Atom;
  if (has("biophys", "molecular-machine", "membrane")) return Dna;
  // ── Chemistry ──
  if (has("chem-general", "periodic", "bonding", "stoich", "reaction", "mole")) return TestTube;
  if (has("matter", "-gas", "imf", "states")) return Wind;
  if (has("thermochem", "enthalpy", "hess", "gibbs")) return Flame;
  if (has("equilibr", "chatelier", "solubility")) return Activity;
  if (has("acid", "-ph", "buffer", "titrat")) return Droplet;
  if (has("electro", "redox", "galvanic", "electrolys")) return Battery;
  if (has("organic", "functional-group", "stereo", "synthesis", "mechanism")) return Hexagon;
  if (has("inorganic", "coordination", "crystal-field", "descriptive")) return Boxes;
  if (has("analytic", "chromatograph", "spectro", "quant-analysis")) return Gauge;
  if (has("physical", "pchem")) return Thermometer;
  if (has("icho", "oly-")) return Award;
  // ── Math ──
  if (has("algebra", "expression", "equation", "polynomial")) return Sigma;
  if (has("geometry", "geo-", "triangle", "circle")) return Triangle;
  if (has("trig")) return Waves;
  if (has("precalc", "calc", "-limit", "deriv", "integral")) return Infinity;
  if (has("linalg", "-la-", "la-", "matrix", "vector", "eigen", "spectral", "inner-product")) return Layers;
  if (has("analysis", "sequence", "continuity", "series", "metric", "riemann", "measure", "functional")) return Infinity;
  if (has("complex", "cauchy", "contour", "residue")) return Circle;
  if (has("topolog", "compact", "connected", "homeomorph", "fundamental-group")) return Network;
  if (has("diffgeo", "curve", "surface", "curvature", "manifold")) return Orbit;
  if (has("number", "divisib", "modular", "prime", "diophant")) return Calculator;
  if (has("combinator", "graph", "counting", "generating", "extremal")) return GitBranch;
  if (has("probab", "statist", "random", "distribution", "regression", "inference")) return Dice5;
  if (has("differential-equation", "-ode", "pde", "first-order", "second-order")) return Activity;
  if (has("foundation", "logic", "set-theory", "proof", "cardinal", "function")) return Binary;
  if (has("ineq")) return Ruler;
  if (has("-fe", "fe-")) return Sigma;
  // ── Biology ──
  if (has("bio-cell", "cell-", "-cell")) return Circle;
  if (has("genom")) return Binary;
  if (has("genetic")) return GitBranch;
  if (has("evolution", "evolutionary")) return GitBranch;
  if (has("ecolog")) return Wind;
  if (has("anatomy", "physiolog")) return Activity;
  if (has("plant", "botan")) return Wind;
  if (has("microb", "bacteri")) return Circle;
  if (has("virus", "virolog")) return Circle;
  if (has("cancer", "oncolog")) return Circle;
  if (has("immun")) return Activity;
  if (has("neuro")) return Activity;
  if (has("bioinform")) return Cpu;
  if (has("biochem")) return FlaskConical;
  if (has("bio-molecular", "molecular-adv", "molecular-bio")) return GitBranch;
  // ── Computer Science ──
  if (has("oop", "-classes", "inheritance", "design-pattern")) return Boxes;
  if (has("cs-web", "web-", "html", "javascript", "backend")) return Globe;
  if (has("cs-data-structures", "ds-", "trees-graph", "hash-heap")) return Network;
  if (has("cs-algorithms", "algo-", "sorting", "divide-conquer", "cp-graph", "cp-dp", "graph-algo")) return GitBranch;
  if (has("cs-theory", "automata", "computability", "complexity-class")) return Binary;
  if (has("cs-os", "os-processes", "os-memory", "os-concurrency", "operating")) return Cpu;
  if (has("cs-network", "net-layers", "net-tcp", "net-routing", "distributed", "dist-")) return Network;
  if (has("security", "crypto", "sec-")) return Binary;
  if (has("cs-graphics", "gfx-", "game-dev")) return Eye;
  if (has("cs-cp", "-cp-", "competitive", "cp-math", "cp-string", "cp-ioi")) return GitBranch;
  if (has("cs-programming", "prog-", "cs-python", "py-", "cs-ai")) return Cpu;
  // ── Engineering ──
  if (has("eng-math")) return Sigma;
  if (has("eng-electrical", "eng-electronics", "power-system", "power-electronic", "ee-")) return Zap;
  if (has("eng-cad", "cad-", "design-comp", "eng-design", "prototyp")) return Ruler;
  if (has("eng-civil", "civil-", "structural", "geotech")) return Boxes;
  if (has("eng-chemical", "cheme-")) return TestTube;
  if (has("eng-aerospace", "aero-")) return Rocket;
  if (has("eng-biomedical", "biomed-")) return Activity;
  if (has("eng-control", "control-")) return Activity;
  if (has("eng-environmental", "env-", "renewable", "water-treat", "sustainab")) return Wind;
  if (has("robotic", "robo-", "mechatronic")) return Wrench;
  if (has("innov", "science-fair", "research-project")) return Lightbulb;
  if (has("eng-prob", "problem-solving", "optimization", "international-challenge")) return Gauge;
  if (has("eng-mechanical", "mech-", "machine-design")) return Orbit;
  // ── Research Skills ──
  if (has("research-stats", "stats-")) return Sigma;
  if (has("research-dataviz", "dataviz-")) return Eye;
  if (has("research-lab", "rlab-")) return FlaskConical;
  if (has("research-ethics", "ethics-")) return Award;
  if (has("research-present", "present-poster", "present-talk", "present-qa")) return Compass;
  // ── generic / other subjects ──
  if (has("python", "code", "algorithm", "cpp", "data-struct")) return Cpu;
  if (has("experiment", "lab", "measure", "detector", "instrument")) return Gauge;
  if (has("mathematical")) return Sigma;
  if (has("comput", "numerical", "monte", "simulat")) return Cpu;
  if (SUBJECT_ICONS[subject]) return SUBJECT_ICONS[subject];
  return Circle;
}
function Ic({ id, subject, size = 22, className = "", strokeWidth = 2.2, color }) {
  const C = pickIcon(id, subject) || Circle;
  return <C size={size} className={className} strokeWidth={strokeWidth} color={color} />;
}
const Eyebrow = ({ children }) => <div className="text-xs font-bold tracking-widest uppercase text-violet-300 mb-3">{children}</div>;
const PBar = ({ pct, gold }) => (
  <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(61,74,70,.3)", boxShadow: "inset 0 0 0 1px rgba(61,74,70,.35)" }}>
    <div className={cx("h-full rounded-full transition-all duration-700", gold ? "bg-gradient-to-r from-amber-300 to-amber-500" : "bg-gradient-to-r from-indigo-400 to-fuchsia-500")}
      style={{ width: pct + "%", boxShadow: gold ? "0 0 10px rgba(245,158,11,.7)" : "0 0 10px rgba(168,85,247,.7)" }} />
  </div>
);
function DiffBadge({ level }) {
  const { t } = useQ();
  const map = { 1: ["bg-emerald-50 text-emerald-600", t.d1], 2: ["bg-amber-50 text-amber-600", t.d2], 3: ["bg-red-50 text-red-500", t.d3] };
  const [cls, label] = map[level] || map[2];
  return <span className={cx("px-2.5 py-1 rounded-full text-xs font-extrabold", cls)}>{label}</span>;
}
function StatusBadge({ status, est }) {
  const { t } = useQ();
  const map = {
    open: ["bg-emerald-500 q-ink", t.stOpen], closing: ["bg-orange-500 q-ink", t.stClosing],
    soon: ["bg-indigo-100 text-indigo-700", t.stSoon], closed: ["bg-violet-100 text-violet-500", t.stClosed],
    tba: ["bg-violet-100 text-violet-500", t.stTba], always: ["bg-emerald-50 text-emerald-600", t.stAlways],
  };
  const [cls, label] = map[status] || map.tba;
  return <span className={cx("px-2.5 py-1 rounded-full text-xs font-extrabold", cls)}>{label}{est && status !== "tba" ? " ~" : ""}</span>;
}
const Stars = ({ n }) => <span className="text-amber-400 text-xs tracking-tight">{"★".repeat(n)}<span className="text-slate-200">{"★".repeat(5 - n)}</span></span>;
function AIBadge() {
  const { t } = useQ();
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-violet-600">
      <RobotAvatar size={16} /> {t.aiLabel}
    </span>
  );
}
function HeartBtn({ id, small }) {
  const { saved, toggleSaved } = useQ();
  const on = saved.includes(id);
  return (
    <button onClick={(e) => { e.stopPropagation(); toggleSaved(id); }} aria-label="save"
      className={cx("rounded-full flex items-center justify-center transition-all", small ? "w-8 h-8" : "w-9 h-9",
        on ? "bg-rose-50 text-rose-500" : "bg-violet-50 text-violet-600 hover:text-rose-400")}>
      <Heart size={small ? 14 : 16} fill={on ? "currentColor" : "none"} />
    </button>
  );
}
function MdLite({ text }) {
  const render = (s) => {
    const parts = [];
    let rest = s, k = 0;
    const rx = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/;
    while (true) {
      const m = rest.match(rx);
      if (!m) { parts.push(rest); break; }
      parts.push(rest.slice(0, m.index));
      if (m[1]) parts.push(<a key={k++} href={m[2]} target="_blank" rel="noreferrer" className="text-violet-600 underline font-bold">{m[1]}</a>);
      else parts.push(<strong key={k++}>{m[3]}</strong>);
      rest = rest.slice(m.index + m[0].length);
    }
    return parts;
  };
  const lines = (text || "").split("\n");
  return (
    <div className="text-sm text-slate-700 leading-relaxed space-y-1">
      {lines.map((ln, i) =>
        ln.startsWith("- ")
          ? <div key={i} className="flex gap-2"><span className="text-violet-500">✦</span><span>{render(ln.slice(2))}</span></div>
          : ln.trim() === "" ? <div key={i} className="h-1" /> : <div key={i}>{render(ln)}</div>
      )}
    </div>
  );
}

/* ═══ MODULE: components/Navbar.jsx ═══ */
function Navbar() {
  const { t, lang, go, page, user, xp, setSearchOpen, setObOpen } = useQ();
  const [open, setOpen] = useState(false);
  const items = [["home", t.nav.home], ["learning", t.nav.learning], ["research", t.nav.research], ["competitions", t.nav.competitions], ["nasa", t.nav.nasa]];
  const lv = levelFromXp(xp);
  return (
    <header className="sticky top-0 z-40" style={{ padding: "12px 16px 12px", background: "transparent", pointerEvents: "none" }}>
      {/* Soft transparent blur around navbar */}
      <div style={{ position: "absolute", top: -15, left: 0, right: 0, bottom: -25, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.4) 20%, rgba(0,0,0,.6) 40%, rgba(0,0,0,.6) 60%, rgba(0,0,0,.4) 80%, transparent 100%)", maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.4) 20%, rgba(0,0,0,.6) 40%, rgba(0,0,0,.6) 60%, rgba(0,0,0,.4) 80%, transparent 100%)", pointerEvents: "none" }} />
      <div className="max-w-5xl mx-auto flex items-center justify-between" style={{ pointerEvents: "auto", background: "rgba(62,78,72,.65)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 14, padding: "0 8px 0 20px", height: 50 }}>
        <button onClick={() => { go("home"); setOpen(false); }} className="shrink-0" style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.9 }}><Logo size={26} onDark /></button>
        <div style={{ flex: 1 }} />
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} style={{ width: 38, height: 38, borderRadius: 12, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.85)" }}>
            <Search size={16} />
          </button>
          {!user && <>
            <button onClick={() => setObOpen(true)} style={{ padding: "7px 18px", borderRadius: 14, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.12)", cursor: "pointer", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: "rgba(255,255,255,.85)" }}>{t.nav.login}</button>
            <button onClick={() => setObOpen(true)} style={{ padding: "7px 18px", borderRadius: 14, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.12)", cursor: "pointer", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: "#fff" }}>{t.nav.signin}</button>
          </>}
          {user && <button onClick={() => go("dashboard")} style={{ width: 30, height: 30, borderRadius: 14, background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{(user.name||"?")[0].toUpperCase()}</button>}
          <button onClick={() => setOpen(!open)} style={{ width: 38, height: 38, borderRadius: 12, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.85)", display: "flex", alignItems: "center", justifyContent: "center" }}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {open && (
        <div className="max-w-5xl mx-auto q-pop" style={{ pointerEvents: "auto", background: "rgba(62,78,72,.65)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 14, marginTop: 8, padding: "8px", position: "absolute", left: 16, right: 16, top: "100%", zIndex: 50 }}>
          {items.concat(user ? [["dashboard", t.nav.dashboard]] : []).map(([id, label], i) => (
            <button key={id} onClick={() => { go(id); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", borderRadius: 10, fontSize: 15, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, background: "transparent", color: page === id ? "#fff" : "rgba(255,255,255,.7)", border: "none", cursor: "pointer", animation: "qsReveal .25s ease-out both", animationDelay: (i * 0.04) + "s" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ═══ MODULE: components/SearchModal.jsx ═══ */
function SearchModal() {
  const { t, lang, searchOpen, setSearchOpen, go, setDrawerNode, comps } = useQ();
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { if (searchOpen) { setQ(""); setTimeout(() => inputRef.current && inputRef.current.focus(), 50); } }, [searchOpen]);
  if (!searchOpen) return null;
  const mono = "'Space Grotesk', ui-monospace, monospace";
  const ql = q.toLowerCase().trim();
  const matchEn = (name) => (name.en || "").toLowerCase().includes(ql);
  const topics = ql.length > 1 ? Object.values(ALL_NODES).filter((n) => matchEn(n.name) || matchEn(n.desc || {}) || matchEn(n.why || {})).slice(0, 8) : [];
  const subjects = ql ? DB.subjects.filter((s) => matchEn(s.name)).slice(0, 3) : [];
  const branches = ql ? DB.subjects.flatMap((s) => (s.branches || []).map((b) => ({ ...b, subject: s }))).filter((b) => matchEn(b.name)).slice(0, 5) : [];
  const opportunities = ql ? comps.filter((c) => !c.hidden && !c.archived && matchEn(c.name)).slice(0, 5) : [];
  const hasResults = topics.length || subjects.length || branches.length || opportunities.length;
  const close = () => setSearchOpen(false);

  const pages = [
    { label: "Learning", key: "learning" },
    { label: "Research", key: "research" },
    { label: "Competitions", key: "competitions" },
    { label: "Internships", key: "internships" },
  ].filter(p => !ql || p.label.toLowerCase().includes(ql));

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0" style={{ background: "rgba(43,54,52,.15)", backdropFilter: "blur(4px)" }} onClick={close} />
      <div style={{ position: "fixed", top: 16, left: 16, right: 16, margin: "0 auto", maxWidth: 520, background: "#f0f2ee", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(43,54,52,.15)" }} onClick={e => e.stopPropagation()}>
        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(43,54,52,.08)" }}>
          <Search size={16} style={{ color: "rgba(43,54,52,.35)", flexShrink: 0 }} />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search topics, subjects, competitions..."
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 15, fontFamily: mono, fontWeight: 500, color: "#2b3634" }} />
          {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(43,54,52,.3)", fontSize: 14 }}>{String.fromCharCode(10005)}</button>}
          <button onClick={close} style={{ fontFamily: mono, fontSize: 11, color: "rgba(43,54,52,.35)", background: "rgba(43,54,52,.06)", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}>ESC</button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "8px 0" }}>
          {!ql && (
            <div style={{ padding: "40px 20px", textAlign: "center", fontSize: 13, color: "rgba(43,54,52,.3)", fontFamily: mono }}>Start typing to search</div>
          )}

          {ql && !hasResults && (
            <div style={{ padding: "40px 20px", textAlign: "center", fontSize: 14, color: "rgba(43,54,52,.35)" }}>No results</div>
          )}

          {subjects.length > 0 && (
            <div style={{ padding: "8px 20px" }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "rgba(43,54,52,.35)", marginBottom: 8 }}>SUBJECTS</div>
              {subjects.map(s => (
                <button key={s.id} onClick={() => { close(); go("subject", s.id); }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#2b3634", textAlign: "left" }}>
                  {s.name.en}
                  <span style={{ fontSize: 12, color: "rgba(43,54,52,.2)" }}>{String.fromCharCode(8594)}</span>
                </button>
              ))}
            </div>
          )}

          {branches.length > 0 && (
            <div style={{ padding: "8px 20px" }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "rgba(43,54,52,.35)", marginBottom: 8 }}>BRANCHES</div>
              {branches.map(b => (
                <button key={b.id} onClick={() => { close(); go("tree", b.id); }}
                  style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", width: "100%", padding: "10px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", borderBottom: "1px solid rgba(43,54,52,.04)" }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#2b3634" }}>{b.name.en}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(43,54,52,.3)" }}>{b.subject.name.en}</span>
                </button>
              ))}
            </div>
          )}

          {topics.length > 0 && (
            <div style={{ padding: "8px 20px" }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "rgba(43,54,52,.35)", marginBottom: 8 }}>TOPICS</div>
              {topics.map(n => {
                const found = findBranch(n.branchId);
                return (
                  <button key={n.id} onClick={() => { close(); go("tree", n.branchId); setTimeout(() => setDrawerNode(ALL_NODES[n.id]), 60); }}
                    style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", width: "100%", padding: "10px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", borderBottom: "1px solid rgba(43,54,52,.04)" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#2b3634" }}>{n.name.en}</span>
                    <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(43,54,52,.3)" }}>{found ? found.branch.name.en : ""}</span>
                  </button>
                );
              })}
            </div>
          )}

          {opportunities.length > 0 && (
            <div style={{ padding: "8px 20px" }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "rgba(43,54,52,.35)", marginBottom: 8 }}>OPPORTUNITIES</div>
              {opportunities.map(c => (
                <button key={c.id} onClick={() => { close(); go("competitions"); }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#2b3634", textAlign: "left", borderBottom: "1px solid rgba(43,54,52,.04)" }}>
                  {c.name.en || c.title}
                  <span style={{ fontSize: 12, color: "rgba(43,54,52,.2)" }}>{String.fromCharCode(8594)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══ MODULE: components/HomePage.jsx ═══ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".qs-reveal, .qs-slide");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("qs-in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CinematicHero({ go, t, lang }) {
    const mono = "'Space Grotesk', 'Roboto Mono', ui-monospace, monospace";
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible", background: "transparent" }}>
      {/* Editorial annotations */}
      <div style={{ position: "absolute", top: "clamp(80px,12vh,120px)", left: "clamp(24px,5vw,64px)", zIndex: 3, fontFamily: "'Space Grotesk', monospace", fontSize: 11, letterSpacing: "0.1em", color: "rgba(43,54,52,.5)", lineHeight: 1.7 }}>
        PLATFORM [FOR STEM]<br />EXPLORE WITH US
      </div>
      <div style={{ position: "absolute", top: "clamp(80px,12vh,120px)", right: "clamp(24px,5vw,64px)", zIndex: 3, fontFamily: "'Space Grotesk', monospace", fontSize: 11, letterSpacing: "0.1em", color: "rgba(43,54,52,.4)", lineHeight: 1.7, textAlign: "right" }}>
        FIELD NOTES<br />OPEN ARCHIVE<br />FOR SCIENCE
      </div>
      {/* Subtle green watercolor blooms */}
      <div style={{ position: "absolute", top: "30%", left: "20%", width: 220, height: 240, borderRadius: "44% 56% 52% 48% / 48% 52% 56% 44%", background: "radial-gradient(ellipse, rgba(100,140,115,.18), transparent 72%)", filter: "blur(35px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "60%", width: 180, height: 200, borderRadius: "52% 48% 44% 56% / 56% 44% 52% 48%", background: "radial-gradient(ellipse, rgba(95,135,110,.15), transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "65%", left: "35%", width: 160, height: 180, borderRadius: "48% 52% 56% 44% / 44% 56% 48% 52%", background: "radial-gradient(ellipse, rgba(90,130,105,.12), transparent 68%)", filter: "blur(38px)", pointerEvents: "none" }} />
      {/* Dust specks */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none", opacity: 0.6 }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 900">
        {(() => {
          const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
          const specks = [];
          for (let i = 0; i < 45; i++) {
            const x = Math.abs(rnd(i)) * 1200, y = Math.abs(rnd(i + 50)) * 900;
            const r = Math.abs(rnd(i + 100)) * 1.8 + 0.4;
            const o = Math.abs(rnd(i + 150)) * 0.18 + 0.05;
            specks.push(<circle key={"d" + i} cx={x} cy={y} r={r} fill={"rgba(43,54,52," + o.toFixed(2) + ")"} />);
          }
          return specks;
        })()}
      </svg>
      {/* Typography */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 clamp(24px,6vw,90px)", width: "100%", maxWidth: 1200 }}>
        <h1 style={{ margin: 0, lineHeight: 0.94, textAlign: "left", maxWidth: 900 }}>
          <span style={{ display: "block", fontFamily: "'Archivo', sans-serif", fontSize: "clamp(48px,10vw,140px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.045em" }}>ALWAYS MORE</span>
          <span style={{ display: "block", fontFamily: "'Archivo', sans-serif", fontSize: "clamp(48px,10vw,140px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.045em", marginTop: "-0.04em" }}>TO LEARN</span>
        </h1>
      </div>
    </section>
  );
}

function HomePage() {
  const { t, go, lang, anns, completed, setPathId } = useQ();
  const isMn = lang === "mn";
  useScrollReveal();
  const cards = [
    ["learning", Compass, t.exploreCards.learning, "learning"],
    ["research", Microscope, t.exploreCards.research, "research"],
    ["competitions", Trophy, t.exploreCards.competitions, "competitions"],
    ["nasa", Rocket, t.exploreCards.nasa, "nasa"],
    ["internships", Atom, t.exploreCards.internships, "internships"],
  ];
  const aboutFeatures = [
    { Icon: Network, title: isMn ? "Бүтэцтэй мэдлэгийн мод" : "Structured knowledge trees", desc: isMn ? "6 хичээл, 500+ сургалтын зангилаа." : "Six subjects, 500+ learning nodes with prerequisites and vetted resources." },
    { Icon: BookOpen, title: isMn ? "Баталгаажсан эх сурвалж" : "Verified resources", desc: isMn ? "MIT OCW, OpenStax, Khan Academy, CS50." : "MIT OpenCourseWare, OpenStax, Khan Academy, CS50, and more." },
    { Icon: Compass, title: isMn ? "Хувийн замын зураг" : "Personalized roadmaps", desc: isMn ? "Зорилго, түвшинд тохирсон алхам алхмаар зам." : "A step-by-step path tuned to your goal and level." },
  ];
  const pinned = anns.filter((a) => a.pinned)[0];

  // Curved path positions for the 5 widgets
  const pathPoints = [[12, 0], [68, 22], [28, 48], [72, 70], [18, 90]];
  const pathSvg = "M " + pathPoints.map(([x,y]) => `${x} ${y}`).join(" Q ");

  return (
    <div style={{ position: "relative", background: "transparent" }}>
      {/* Green atmospheric blooms across full first page */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "8%", left: "65%", width: 200, height: 220, borderRadius: "44% 56% 52% 48%", background: "radial-gradient(ellipse, rgba(100,140,115,.16), transparent 72%)", filter: "blur(35px)" }} />
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 180, height: 200, borderRadius: "52% 48% 44% 56%", background: "radial-gradient(ellipse, rgba(95,135,110,.14), transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "35%", left: "50%", width: 220, height: 240, borderRadius: "48% 52% 56% 44%", background: "radial-gradient(ellipse, rgba(90,130,105,.15), transparent 68%)", filter: "blur(38px)" }} />
        <div style={{ position: "absolute", top: "55%", left: "20%", width: 190, height: 210, borderRadius: "55% 45% 48% 52%", background: "radial-gradient(ellipse, rgba(98,138,112,.13), transparent 70%)", filter: "blur(42px)" }} />
        <div style={{ position: "absolute", top: "70%", left: "70%", width: 170, height: 190, borderRadius: "45% 55% 50% 50%", background: "radial-gradient(ellipse, rgba(92,132,108,.12), transparent 72%)", filter: "blur(36px)" }} />
        <div style={{ position: "absolute", top: "85%", left: "35%", width: 200, height: 220, borderRadius: "50% 50% 45% 55%", background: "radial-gradient(ellipse, rgba(96,136,110,.14), transparent 68%)", filter: "blur(40px)" }} />
      </div>

                  <CinematicHero go={go} t={t} lang={lang} />
                  {/* ─── WHAT IS QUESTA ─── */}
      <section style={{ background: "transparent", padding: "clamp(20px,3vh,40px) 0 clamp(40px,6vh,60px)", position: "relative", overflow: "visible", marginTop: "-12vh", zIndex: 2 }}>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div className="qs-reveal">
            <p className="q-mono" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(43,54,52,.55)", marginBottom: 24 }}>[ 001 ] ABOUT QUESTA</p>
            <h2 className="q-display" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 28 }}>Knowledge has a hierarchy.</h2>
            <p className="q-display" style={{ fontSize: "clamp(20px,2.5vw,32px)", color: "rgba(43,54,52,.55)", lineHeight: 1.5, maxWidth: 680, fontWeight: 400, letterSpacing: "-0.015em" }}>
              Some ideas depend on others. Some skills only become useful once their foundations are in place. Some problems reveal gaps you didn't know you had. The materials give you access to all of it at once, but not the order in which it makes sense. Questa is interested in that order.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU CAN DO ─── */}
      <section style={{ background: "transparent", padding: "clamp(80px,10vh,120px) 0", position: "relative", overflow: "visible" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div className="qs-reveal" style={{ marginBottom: "clamp(40px,6vh,64px)" }}>
            <p className="q-mono" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(43,54,52,.55)", marginBottom: 24 }}>[ 002 ] PLATFORM</p>
            <h2 className="q-display" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.03em", lineHeight: 1.12 }}>{t.exploreTitle}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {cards.map(([key, Icon, [title, desc], dest], i) => (
              <button key={key} onClick={() => go(dest)}
                className="qs-reveal text-left"
                style={{ padding: "clamp(28px,4vh,40px) 0", borderBottom: i < cards.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", background: "transparent", border: "none", borderBottom: i < cards.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", cursor: "pointer", transition: "opacity .15s", width: "100%" }}
                onMouseOver={e => e.currentTarget.style.opacity = "0.6"}
                onMouseOut={e => e.currentTarget.style.opacity = "1"}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <div className="q-display" style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.02em" }}>{title}</div>
                  <span style={{ fontSize: 22, color: "rgba(43,54,52,.2)", flexShrink: 0, fontWeight: 700 }}>{String.fromCharCode(187)}</span>
                </div>
                <div className="q-mono" style={{ fontSize: 12, color: "rgba(43,54,52,.45)", marginTop: 6, lineHeight: 1.5 }}>{desc}</div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ background: "transparent", padding: "clamp(40px,6vh,60px) 0", position: "relative", overflow: "visible" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div className="qs-reveal" style={{ marginBottom: "clamp(40px,6vh,64px)" }}>
            <p className="q-mono" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(43,54,52,.55)", marginBottom: 24 }}>[ 003 ] GUIDE</p>
            <h2 className="q-display" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.03em", lineHeight: 1.12 }}>{t.howTitle}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {t.howSteps.map(([title, desc], i) => (
              <div key={i} className="qs-reveal" style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,28px)", padding: "clamp(24px,3.5vh,36px) 0", borderBottom: i < t.howSteps.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none" }}>
                <span className="q-mono" style={{ fontSize: 13, color: "rgba(43,54,52,.25)", flexShrink: 0, width: 28 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="q-display" style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.02em", marginBottom: 6 }}>{title}</div>
                  <div className="q-mono" style={{ fontSize: 12, color: "rgba(43,54,52,.45)", lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroConstellation() {
  return (
    <svg width="380" height="380" viewBox="0 0 380 380" className="drop-shadow-xl">
      <defs><linearGradient id="qg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3d4a46" /><stop offset="100%" stopColor="#3d4a46" /></linearGradient></defs>
      <circle cx="190" cy="190" r="150" fill="none" stroke="#c7d2fe" strokeDasharray="3 7" />
      <circle cx="190" cy="190" r="105" fill="none" stroke="#ddd6fe" strokeDasharray="3 7" />
      <g className="q-orbit" style={{ transformOrigin: "190px 190px", animation: "qOrbit 26s linear infinite" }}><circle cx="190" cy="40" r="7" fill="url(#qg)" /></g>
      <g className="q-orbit" style={{ transformOrigin: "190px 190px", animation: "qOrbit 40s linear infinite reverse" }}><circle cx="85" cy="190" r="5" fill="#f59e0b" /></g>
      {[[190, 300, 10], [130, 240, 8], [250, 240, 8], [100, 165, 7], [190, 175, 9], [280, 165, 7], [155, 105, 7], [225, 105, 7], [190, 55, 11]].map(([x, y, r], i) => (
        <g key={i}><circle cx={x} cy={y} r={r + 6} fill="rgba(61,74,70,.12)" /><circle cx={x} cy={y} r={r} fill={i === 8 ? "#f59e0b" : "url(#qg)"} /></g>
      ))}
      {[[190, 300, 130, 240], [190, 300, 250, 240], [130, 240, 100, 165], [130, 240, 190, 175], [250, 240, 190, 175], [250, 240, 280, 165], [190, 175, 155, 105], [190, 175, 225, 105], [155, 105, 190, 55], [225, 105, 190, 55]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3d4a46" strokeWidth="1.5" opacity=".45" />
      ))}
      <text x="212" y="50" fontSize="16" fill="#f59e0b">✦</text>
    </svg>
  );
}

/* ═══ MODULE: components/Footer.jsx ═══ */
function Footer() {
  const { t, go } = useQ();
  return (
    <footer className="relative overflow-hidden mt-auto" style={{ background: "transparent", zIndex: 10 }}>
      
      <div className="max-w-6xl mx-auto px-4 py-10 relative flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size={20} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <a href="https://www.instagram.com/questastem" target="_blank" rel="noreferrer" style={{ color: "rgba(43,54,52,.45)", transition: "color .2s", display: "flex", alignItems: "center", gap: 6, textDecoration: "none", fontSize: 12, fontWeight: 600 }} onMouseOver={e => e.currentTarget.style.color = "#2b3634"} onMouseOut={e => e.currentTarget.style.color = "rgba(43,54,52,.45)"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            questastem
          </a>
          <a href="mailto:hello@questastem.com" style={{ color: "rgba(43,54,52,.45)", fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "color .2s", display: "flex", alignItems: "center", gap: 6 }} onMouseOver={e => e.currentTarget.style.color = "#2b3634"} onMouseOut={e => e.currentTarget.style.color = "rgba(43,54,52,.45)"}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
            hello@questastem.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs" style={{ color: "rgba(43,54,52,.4)" }}>{t.demoNote}</div>
          <button onClick={() => go("admin")} className="text-xs font-bold hover:q-ink transition-colors" style={{ color: "rgba(43,54,52,.4)" }}>{t.adminLink}</button>
        </div>
      </div>
    </footer>
  );
}

/* ═══ MODULE: components/LearningPage.jsx ═══ */
function LearningPage() {
  const { t, lang, go, completed, setPathId } = useQ();
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div style={{ marginBottom: 80 }}>
        <div className="q-mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 16 }}>[ ARCHIVE ]</div>
        <h1 className="q-display" style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", lineHeight: 1.05 }}>{t.subjectsTitle}</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {DB.subjects.map((s, i) => (
          <button key={s.id} onClick={() => { setPathId(null); go("subject", s.id); }}
            className="text-left"
            style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,32px)", padding: "clamp(20px,3vh,32px) 0", borderBottom: i < DB.subjects.length - 1 ? "1px solid rgba(43,54,52,.08)" : "none", background: "transparent", border: "none", borderBottom: i < DB.subjects.length - 1 ? "1px solid rgba(43,54,52,.08)" : "none", cursor: "pointer", transition: "opacity .2s", width: "100%" }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.6"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}>
            <span className="q-mono" style={{ fontSize: 12, color: "rgba(43,54,52,.3)", fontWeight: 500, flexShrink: 0, width: 36 }}>{String(i + 1).padStart(3, "0")}</span>
            <span className="q-display" style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.03em" }}>{s.name.en}</span>
            <span style={{ marginLeft: "auto", fontSize: 16, color: "rgba(43,54,52,.2)", flexShrink: 0 }}>{String.fromCharCode(8594)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══ MODULE: components/SubjectPage.jsx ═══ */
function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center flex-wrap gap-1.5 text-sm font-bold mb-5">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={14} className="text-slate-300" />}
          {it.onClick ? (
            <button onClick={it.onClick} className="text-indigo-300 hover:q-ink transition-colors">{it.label}</button>
          ) : (
            <span className="q-ink">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* Resolve a subject's path branch-ids into branch objects */
function pathBranches(s, path) {
  return (path.branches || []).map((bid) => s.branches.find((b) => b.id === bid)).filter(Boolean);
}

const JOURNEYS = {
  physics: {
    tag: { en: "Journey to Understanding the Universe" },
    intro: { en: "Why does rain fall? Why does the Moon seem to follow the car? How do planes fly? Physics is the search for the rules that govern the universe." },
    levels: [
      { g: { en: "Elementary" }, t: { en: "Why do things fall? Where does warmth come from? It all starts with simple wonder." } },
      { g: { en: "Middle school" }, t: { en: "Motion, forces, energy, light, and sound, the invisible rules behind everything from bicycles to phones." } },
      { g: { en: "High school" }, t: { en: "Physics becomes mathematical, you predict nature with equations, from electromagnetism to thermodynamics and modern physics." } },
      { g: { en: "University" }, t: { en: "Physics becomes the language for describing reality, you derive equations, build models, and begin asking questions nobody has answered." } },
      { g: { en: "Research" }, t: { en: "Dark matter, gravitational waves, quantum materials, quantum computing, expanding what humanity itself understands." } },
    ],
    close: { en: "Could you become one of the people who makes the next breakthrough?" },
    people: ["Einstein", "Marie Curie", "Feynman", "Ж. Гүррагчаа"],
  },
  math: {
    tag: { en: "Journey to the Language of the Universe" },
    intro: { en: "Mathematics isn't about memorizing numbers, it's about patterns, logic, and beauty. It is the language every science is written in." },
    levels: [
      { g: { en: "Elementary" }, t: { en: "Patterns, shapes, and games, the playground of numbers." } },
      { g: { en: "Middle school" }, t: { en: "Why algebra exists, letters that can stand for anything." } },
      { g: { en: "High school" }, t: { en: "Calculus, proof, and olympiads, the power to reason with certainty." } },
      { g: { en: "University" }, t: { en: "Abstract algebra, topology, and real analysis, the structures beneath everything." } },
      { g: { en: "Research" }, t: { en: "Open conjectures, the Fields Medal, and mathematics that reshapes physics itself." } },
    ],
    close: { en: "Could you be the one to prove the next great theorem?" },
    people: ["Ramanujan", "Emmy Noether", "Terence Tao", "Maryam Mirzakhani"],
  },
  cs: {
    tag: { en: "Journey to Building Intelligent Machines" },
    intro: { en: "How do games work? How does an app know which button you tapped? Computer science is the art of teaching machines to solve problems." },
    levels: [
      { g: { en: "Elementary" }, t: { en: "How does Minecraft work? How does a game remember your score?" } },
      { g: { en: "Middle school" }, t: { en: "How does an app know what you clicked? Write your first lines of code." } },
      { g: { en: "High school" }, t: { en: "Algorithms, AI, and cybersecurity, solving real problems with code." } },
      { g: { en: "University" }, t: { en: "Operating systems, compilers, and distributed systems, how computers really work." } },
      { g: { en: "Research" }, t: { en: "Machine learning, cryptography, and quantum algorithms, the frontier of computation." } },
    ],
    close: { en: "Could you build the technology that changes everything?" },
    people: ["Alan Turing", "Ada Lovelace", "Grace Hopper", "Geoffrey Hinton"],
  },
  chemistry: {
    tag: { en: "Journey into the Matter of Everything" },
    intro: { en: "Why do things burn, melt, and fizz? Chemistry is the science of matter, everything you can touch, taste, and breathe." },
    levels: [
      { g: { en: "Elementary" }, t: { en: "Why does ice melt? Why is fire hot? The everyday magic of matter." } },
      { g: { en: "Middle school" }, t: { en: "Atoms and molecules, the tiny building blocks of everything." } },
      { g: { en: "High school" }, t: { en: "Reactions, bonds, and the periodic table, predicting how matter transforms." } },
      { g: { en: "University" }, t: { en: "Organic synthesis, thermodynamics, and quantum chemistry, designing brand-new molecules." } },
      { g: { en: "Research" }, t: { en: "New materials, medicines, batteries, and catalysts that could change the world." } },
    ],
    close: { en: "Could you discover the next life-saving material?" },
    people: ["Marie Curie", "Dmitri Mendeleev", "Ahmed Zewail", "Frances Arnold"],
  },
  biology: {
    tag: { en: "Journey to Discover How Life Works" },
    intro: { en: "Why do we breathe? How do plants grow? Biology is the story of life, from a single cell to entire ecosystems." },
    levels: [
      { g: { en: "Elementary" }, t: { en: "Why do living things grow? Why do we sleep? The wonder of being alive." } },
      { g: { en: "Middle school" }, t: { en: "Cells, DNA, and ecosystems, the machinery inside every living thing." } },
      { g: { en: "High school" }, t: { en: "Genetics, evolution, and physiology, how life is built and how it changes." } },
      { g: { en: "University" }, t: { en: "Molecular biology, neuroscience, and immunology, reading the code of life." } },
      { g: { en: "Research" }, t: { en: "Gene editing, cancer, and synthetic biology, rewriting what life can do." } },
    ],
    close: { en: "Could you unlock the next secret of life?" },
    people: ["Charles Darwin", "Rosalind Franklin", "Jennifer Doudna", "Barbara McClintock"],
  },
  engineering: {
    tag: { en: "Journey to Engineering the Future" },
    intro: { en: "How are bridges, robots, and rockets built? Engineering is where ideas become real things that work." },
    levels: [
      { g: { en: "Elementary" }, t: { en: "Why don't bridges fall down? How do robots move?" } },
      { g: { en: "Middle school" }, t: { en: "Machines, circuits, and structures, building things that actually work." } },
      { g: { en: "High school" }, t: { en: "Design, electronics, and robotics, solving real problems with math and tools." } },
      { g: { en: "University" }, t: { en: "Control systems, materials, and mechatronics, engineering complex systems." } },
      { g: { en: "Research" }, t: { en: "Robotics, renewable energy, and spacecraft, building what doesn't exist yet." } },
    ],
    close: { en: "Could you engineer something the world has never seen?" },
    people: ["Nikola Tesla", "Hedy Lamarr", "Mary Jackson", "Ж. Гүррагчаа"],
  },
  research: {
    tag: { en: "Journey to Expanding Human Knowledge" },
    intro: { en: "Every great discovery began with one simple question: why? Research is the craft of adding something new to what humanity knows." },
    levels: [
      { g: { en: "The spark" }, t: { en: "Curiosity, observation, and experiment, how we learn what is true." } },
      { g: { en: "High school" }, t: { en: "Reading papers, asking questions, and running your very first real project." } },
      { g: { en: "University" }, t: { en: "Research methods, scientific writing, and working alongside real scientists." } },
      { g: { en: "Mentorship" }, t: { en: "Finding the right person, asking, and learning from their work." } },
      { g: { en: "Discovery" }, t: { en: "Publishing, mentoring others, and adding your own contribution to human knowledge." } },
    ],
    close: { en: "Could you ask a question no one has asked before?" },
    people: ["Every scientist started here"],
  },
};
function SubjectJourney({ s }) {
  const { lang } = useQ();
  const [open, setOpen] = useState(false);
  const j = JOURNEYS[s.id];
  if (!j) return null;
  return (
    <div className="mb-8 rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, " + s.hue + "26, " + s.hue + "0a)", border: "1px solid " + s.hue + "38" }}>
      <div className="p-6 sm:p-8">
        <div className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: s.hue }}>{lang === "mn" ? "Аялал" : "The journey"}</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold q-ink mb-3" style={{ letterSpacing: "-0.02em" }}>{j.tag[lang]}</h2>
        <p className="text-indigo-100 leading-relaxed max-w-2xl">{j.intro[lang]}</p>
        {!open && (
          <button onClick={() => setOpen(true)} className="mt-5 px-5 py-2.5 rounded-full font-extrabold text-sm q-ink inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform" style={{ background: s.hue }}>
            {lang === "mn" ? "Аялалыг эхлүүл" : "Begin the journey"} <ChevronDown size={16} />
          </button>
        )}
        {open && (
          <div className="mt-6 space-y-2.5 q-fade-up">
            {j.levels.map((lv, i) => (
              <div key={i} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
                <div className="text-xs font-extrabold uppercase tracking-wide mb-1" style={{ color: s.hue }}>{lv.g[lang]}</div>
                <div className="text-sm text-indigo-100 leading-relaxed">{lv.t[lang]}</div>
              </div>
            ))}
            <div className="rounded-2xl p-5 text-center" style={{ background: s.hue + "26", border: "1px solid " + s.hue + "4d" }}>
              <div className="text-lg font-extrabold q-ink mb-2 leading-snug">{j.close[lang]}</div>
              <div className="text-sm font-bold text-indigo-100">{j.people.join("  ·  ")}</div>
              <div className="text-xs text-indigo-300 mt-1.5">{lang === "mn" ? "Тэд бүгд асуултаас эхэлсэн." : "They all started by asking questions."}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function SubjectPage() {
  const { t, lang, go, subjectId, completed, pathId, setPathId } = useQ();
  const s = DB.subjects.find((x) => x.id === subjectId) || DB.subjects[0];
  const subjectIndex = DB.subjects.indexOf(s) + 1;
  const hasPaths = Array.isArray(s.paths) && s.paths.length > 0;
  const path = hasPaths ? s.paths.find((p) => p.id === pathId) : null;

  /* Distinctive scientific artifacts - modern, unique per field */
  const S = "rgba(43,54,52,.06)";
  const artifacts = {
    physics: (
      /* Feynman diagram - particle interaction */
      <svg viewBox="0 0 400 400" fill="none" stroke={S} strokeWidth="0.7">
        <path d="M40 60L180 200" /><path d="M40 340L180 200" />
        <path d="M220 200L360 60" /><path d="M220 200L360 340" />
        {/* wavy propagator */}
        {Array.from({length:20}).map((_,i)=>{const t=i/19,x=180+t*40,y=200+Math.sin(t*Math.PI*6)*12;return i>0?<line key={i} x1={180+(i-1)/19*40} y1={200+Math.sin((i-1)/19*Math.PI*6)*12} x2={x} y2={y} />:null})}
        <circle cx="180" cy="200" r="5" fill={S} /><circle cx="220" cy="200" r="5" fill={S} />
        {/* vertex labels */}
        <circle cx="40" cy="60" r="3" fill={S} /><circle cx="40" cy="340" r="3" fill={S} />
        <circle cx="360" cy="60" r="3" fill={S} /><circle cx="360" cy="340" r="3" fill={S} />
      </svg>
    ),
    math: (
      /* Lorenz attractor / strange attractor phase portrait */
      <svg viewBox="0 0 400 400" fill="none" stroke={S} strokeWidth="0.4">
        {(() => {
          let x=1,y=1,z=1; const pts=[]; const dt=0.005;
          for(let i=0;i<2000;i++){
            const dx=10*(y-x)*dt, dy=(x*(28-z)-y)*dt, dz=(x*y-8/3*z)*dt;
            x+=dx; y+=dy; z+=dz;
            pts.push([200+x*6, 200+z*5-80]);
          }
          return <path d={pts.map((p,i)=>(i===0?"M":"L")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ")} />
        })()}
        {(() => {
          let x=-1,y=-1,z=1; const pts=[]; const dt=0.005;
          for(let i=0;i<2000;i++){
            const dx=10*(y-x)*dt, dy=(x*(28-z)-y)*dt, dz=(x*y-8/3*z)*dt;
            x+=dx; y+=dy; z+=dz;
            pts.push([200+x*6, 200+z*5-80]);
          }
          return <path d={pts.map((p,i)=>(i===0?"M":"L")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ")} strokeOpacity="0.5" />
        })()}
      </svg>
    ),
    cs: (
      /* Neural network / computational graph */
      <svg viewBox="0 0 400 400" fill="none" stroke={S} strokeWidth="0.5">
        {/* layer 1 */}
        {[100,160,220,280,340].map((y,i)=><circle key={"a"+i} cx="80" cy={y} r="10" />)}
        {/* layer 2 */}
        {[130,200,270].map((y,i)=><circle key={"b"+i} cx="200" cy={y} r="12" />)}
        {/* layer 3 */}
        {[160,240].map((y,i)=><circle key={"c"+i} cx="320" cy={y} r="10" />)}
        {/* connections */}
        {[100,160,220,280,340].map((y1,i)=>[130,200,270].map((y2,j)=><line key={i+"-"+j} x1="90" y1={y1} x2="188" y2={y2} />))}
        {[130,200,270].map((y1,i)=>[160,240].map((y2,j)=><line key={"d"+i+"-"+j} x1="212" y1={y1} x2="310" y2={y2} />))}
      </svg>
    ),
    chemistry: (
      /* Molecular orbital / electron cloud probability */
      <svg viewBox="0 0 400 400" fill="none" stroke={S} strokeWidth="0.4">
        {/* p-orbital lobes */}
        <path d="M200 200C200 120 260 60 200 60C140 60 200 120 200 200" />
        <path d="M200 200C200 280 260 340 200 340C140 340 200 280 200 200" />
        {/* d-orbital */}
        <path d="M200 200C140 200 60 140 60 200C60 260 140 200 200 200" strokeOpacity="0.6" />
        <path d="M200 200C260 200 340 140 340 200C340 260 260 200 200 200" strokeOpacity="0.6" />
        {/* contour lines */}
        {[30,50,70,90,110].map(r=><ellipse key={r} cx="200" cy="130" rx={r*0.4} ry={r} strokeDasharray="1 3" />)}
        {[30,50,70,90,110].map(r=><ellipse key={"b"+r} cx="200" cy="270" rx={r*0.4} ry={r} strokeDasharray="1 3" />)}
        <circle cx="200" cy="200" r="6" fill={S} />
      </svg>
    ),
    biology: (
      /* Haeckel-style radiolarian - geometric marine microorganism */
      <svg viewBox="0 0 400 400" fill="none" stroke={S} strokeWidth="0.4">
        {/* outer spicule rays */}
        {Array.from({length:16}).map((_,i)=>{const a=i*Math.PI/8,l=170+((i%3)*15);return <line key={"r"+i} x1={200+80*Math.cos(a)} y1={200+80*Math.sin(a)} x2={200+l*Math.cos(a)} y2={200+l*Math.sin(a)} />})}
        {/* outer shell */}
        {Array.from({length:32}).map((_,i)=>{const a=i*Math.PI/16,a2=(i+1)*Math.PI/16;return <line key={"o"+i} x1={200+140*Math.cos(a)} y1={200+140*Math.sin(a)} x2={200+140*Math.cos(a2)} y2={200+140*Math.sin(a2)} />})}
        {/* middle lattice shell */}
        <circle cx="200" cy="200" r="95" />
        {Array.from({length:24}).map((_,i)=>{const a=i*Math.PI/12,a2=(i+1)*Math.PI/12;return <line key={"m"+i} x1={200+95*Math.cos(a)} y1={200+95*Math.sin(a)} x2={200+95*Math.cos(a2)} y2={200+95*Math.sin(a2)} strokeWidth="0.3" />})}
        {/* pores in middle shell */}
        {Array.from({length:12}).map((_,i)=>{const a=i*Math.PI/6+Math.PI/12;return <circle key={"p"+i} cx={200+95*Math.cos(a)} cy={200+95*Math.sin(a)} r="6" />})}
        {/* inner shell */}
        <circle cx="200" cy="200" r="50" />
        {Array.from({length:8}).map((_,i)=>{const a=i*Math.PI/4;return <circle key={"ip"+i} cx={200+50*Math.cos(a)} cy={200+50*Math.sin(a)} r="4" />})}
        {/* central capsule */}
        <circle cx="200" cy="200" r="22" fill="rgba(43,54,52,.03)" />
        <circle cx="200" cy="200" r="10" />
        {/* connecting bars between shells */}
        {Array.from({length:8}).map((_,i)=>{const a=i*Math.PI/4;return <line key={"b"+i} x1={200+25*Math.cos(a)} y1={200+25*Math.sin(a)} x2={200+48*Math.cos(a)} y2={200+48*Math.sin(a)} strokeWidth="0.3" />})}
        {Array.from({length:12}).map((_,i)=>{const a=i*Math.PI/6;return <line key={"b2"+i} x1={200+53*Math.cos(a)} y1={200+53*Math.sin(a)} x2={200+92*Math.cos(a)} y2={200+92*Math.sin(a)} strokeWidth="0.3" />})}
        {/* spine tips */}
        {Array.from({length:8}).map((_,i)=>{const a=i*Math.PI/4,l=175;return <circle key={"t"+i} cx={200+l*Math.cos(a)} cy={200+l*Math.sin(a)} r="2.5" fill="rgba(43,54,52,.04)" />})}
      </svg>
    ),
    engineering: (
      /* Bridge with structural analysis - loads, moments, cross-section */
      <svg viewBox="0 0 400 400" fill="none" stroke={S} strokeWidth="0.5">
        {/* deck */}
        <line x1="20" y1="220" x2="380" y2="220" strokeWidth="0.8" />
        {/* towers */}
        <line x1="120" y1="100" x2="120" y2="240" strokeWidth="0.8" />
        <line x1="280" y1="100" x2="280" y2="240" strokeWidth="0.8" />
        {/* catenary */}
        <path d="M20 150Q120 95 200 125Q280 95 380 150" strokeWidth="0.7" />
        {/* suspenders */}
        {[50,75,100,145,170,195,205,230,255,300,325,350].map(x=>{const t=(x-20)/360;return <line key={x} x1={x} y1={140+20*Math.pow(2*t-1,2)} x2={x} y2="220" strokeDasharray="1 3" />})}
        {/* foundations */}
        <path d="M108 240L120 268L132 240" /><path d="M268 240L280 268L292 240" />
        <line x1="105" y1="240" x2="135" y2="240" strokeWidth="0.8" /><line x1="265" y1="240" x2="295" y2="240" strokeWidth="0.8" />
        {/* tower bracing */}
        {[145,165,185,205].map(y=><><line key={"l"+y} x1="116" y1={y} x2="124" y2={y} /><line key={"r"+y} x1="276" y1={y} x2="284" y2={y} /></>)}
        {/* load arrows */}
        {[80,140,200,260,320].map(x=><g key={"f"+x}><line x1={x} y1="195" x2={x} y2="216" /><path d={`M${x-3} 212L${x} 220L${x+3} 212`} fill={S} stroke="none" /></g>)}
        {/* reactions */}
        <g><line x1="120" y1="275" x2="120" y2="248" /><path d="M117 253L120 245L123 253" fill={S} stroke="none" /></g>
        <g><line x1="280" y1="275" x2="280" y2="248" /><path d="M277 253L280 245L283 253" fill={S} stroke="none" /></g>
        {/* moment diagram */}
        <path d="M20 320Q120 290 200 305Q280 290 380 320" strokeDasharray="2 3" />
        <line x1="20" y1="320" x2="380" y2="320" strokeDasharray="1 5" />
        {/* dimensions */}
        <line x1="120" y1="340" x2="280" y2="340" /><line x1="120" y1="336" x2="120" y2="344" /><line x1="280" y1="336" x2="280" y2="344" />
        {/* I-beam cross section */}
        <rect x="15" y="40" width="70" height="55" strokeDasharray="1 2" />
        <rect x="30" y="45" width="40" height="8" /><rect x="45" y="45" width="10" height="40" /><rect x="30" y="77" width="40" height="8" />
        {/* stress gradient */}
        {[0,1,2,3,4].map(i=><line key={"s"+i} x1="90" y1={48+i*10} x2={95+i*4} y2={48+i*10} strokeWidth="0.3" />)}
      </svg>
    ),
        research: (
      /* Citation network / knowledge graph */
      <svg viewBox="0 0 400 400" fill="none" stroke={S} strokeWidth="0.4">
        {(() => {
          const nodes = [[200,200,14],[120,120,10],[280,100,8],[320,220,9],[100,280,7],[260,300,11],[160,200,6],[240,160,7],[180,300,8],[300,160,6],[80,180,5],[340,280,5],[140,60,6],[200,340,7],[60,120,4],[260,50,5],[350,140,4],[80,320,5]];
          const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[1,10],[2,7],[2,9],[3,9],[3,11],[4,10],[4,17],[5,8],[5,11],[6,1],[7,2],[7,9],[8,13],[9,16],[10,14],[11,5],[12,1],[12,2],[13,8],[15,2],[15,9],[16,3],[17,4]];
          return <>
            {edges.map(([a,b],i)=><line key={"e"+i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}
            {nodes.map(([x,y,r],i)=><circle key={"n"+i} cx={x} cy={y} r={r} fill="rgba(43,54,52,.03)" stroke={S} />)}
          </>
        })()}
      </svg>
    ),
  };

  const branches = hasPaths && path ? pathBranches(s, path) : (s.branches || []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Editorial subject header */}
      <div style={{ position: "relative", minHeight: "clamp(280px,40vh,420px)", display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: 40 }}>
        {/* Scientific artifact - giant, faint, background */}
        <div style={{ position: "absolute", top: "-10%", right: "-15%", width: "clamp(300px,70vw,600px)", height: "clamp(300px,70vw,600px)", opacity: 0.7, pointerEvents: "none" }}>
          {artifacts[s.id] || artifacts.physics}
        </div>
        {/* Minimalist breadcrumb chain */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", marginBottom: "clamp(40px,8vh,80px)", position: "relative", zIndex: 1 }}>
          <button onClick={() => go("learning")} className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.35)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", padding: 0 }}>KNOWLEDGE TREES</button>
          <span className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.18)", margin: "0 8px" }}>{String.fromCharCode(8250)}{String.fromCharCode(8250)}</span>
          {hasPaths && path ? (
            <>
              <button onClick={() => setPathId(null)} className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.35)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", padding: 0 }}>{s.name.en.toUpperCase()}</button>
              <span className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.18)", margin: "0 8px" }}>{String.fromCharCode(8250)}{String.fromCharCode(8250)}</span>
              <span className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.5)", letterSpacing: "0.1em" }}>{path.name.en.toUpperCase()}</span>
            </>
          ) : (
            <span className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.5)", letterSpacing: "0.1em" }}>{s.name.en.toUpperCase()}</span>
          )}
        </div>
        {/* Subject name */}
        <h1 className="q-display" style={{ fontSize: "clamp(48px,12vw,120px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.05em", lineHeight: 0.95, position: "relative", zIndex: 1, textTransform: "uppercase" }}>
          {hasPaths && path ? path.name.en : s.name.en}
        </h1>
        {/* Hairline rule */}
        <div style={{ height: 1, background: "rgba(43,54,52,.1)", marginTop: "clamp(40px,8vh,80px)" }} />
      </div>

      {/* Path chooser (if subject has paths and none selected) */}
      {hasPaths && !path ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div className="q-mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.35)", marginBottom: 24 }}>PATHS</div>
          {s.paths.map((p, i) => {
            const bs = pathBranches(s, p);
            return (
              <button key={p.id} onClick={() => { setPathId(p.id); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-left"
                style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,32px)", padding: "clamp(18px,2.5vh,28px) 0", borderBottom: i < s.paths.length - 1 ? "1px solid rgba(43,54,52,.06)" : "none", background: "transparent", border: "none", borderBottom: i < s.paths.length - 1 ? "1px solid rgba(43,54,52,.06)" : "none", cursor: "pointer", transition: "opacity .2s", width: "100%" }}
                onMouseOver={e => e.currentTarget.style.opacity = "0.6"}
                onMouseOut={e => e.currentTarget.style.opacity = "1"}>
                <span className="q-mono" style={{ fontSize: 12, color: "rgba(43,54,52,.25)", fontWeight: 500, flexShrink: 0, width: 28 }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ flex: 1 }}>
                  <span className="q-display" style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.02em" }}>{p.name.en}</span>
                  <div className="q-mono" style={{ fontSize: 12, color: "rgba(43,54,52,.35)", marginTop: 4 }}>{bs.length} branches</div>
                </div>
                <span style={{ fontSize: 16, color: "rgba(43,54,52,.2)", flexShrink: 0 }}>{String.fromCharCode(8594)}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Branch list - editorial index */
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {branches.map((b, i) => (
            <button key={b.id} onClick={() => go("tree", b.id)}
              className="text-left"
              style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,32px)", padding: "clamp(18px,2.5vh,28px) 0", borderBottom: i < branches.length - 1 ? "1px solid rgba(43,54,52,.06)" : "none", background: "transparent", border: "none", borderBottom: i < branches.length - 1 ? "1px solid rgba(43,54,52,.06)" : "none", cursor: "pointer", transition: "opacity .2s", width: "100%" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.6"}
              onMouseOut={e => e.currentTarget.style.opacity = "1"}>
              <span className="q-mono" style={{ fontSize: 12, color: "rgba(43,54,52,.25)", fontWeight: 500, flexShrink: 0, width: 28 }}>{String(i + 1).padStart(2, "0")}</span>
              <span className="q-display" style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 600, color: "#2b3634", letterSpacing: "-0.02em" }}>{b.name.en}</span>
              <span style={{ marginLeft: "auto", fontSize: 16, color: "rgba(43,54,52,.15)", flexShrink: 0 }}>{String.fromCharCode(8594)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══ MODULE: components/TreePage.jsx ═══ */
function TreePage() {
  const { t, lang, branchId, completed, setDrawerNode, go, setPathId } = useQ();
  const found = findBranch(branchId) || { subject: DB.subjects[0], branch: DB.subjects[0].branches[0] };
  const { subject, branch: p } = found;
  const pr = branchProgress(p, completed);
  const mono = "'Space Grotesk', ui-monospace, monospace";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Breadcrumb chain */}
      {(() => {
        const treePath = (subject.paths || []).find((pp) => (pp.branches || []).includes(branchId));
        const sep = <span className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.18)", margin: "0 8px" }}>{String.fromCharCode(8250)}{String.fromCharCode(8250)}</span>;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", marginBottom: 32 }}>
            <button onClick={() => { setPathId(null); go("learning"); }} className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.35)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", padding: 0 }}>KNOWLEDGE TREES</button>
            {sep}
            <button onClick={() => { setPathId(null); go("subject", subject.id); }} className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.35)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", padding: 0 }}>{subject.name.en.toUpperCase()}</button>
            {treePath && <>{sep}<button onClick={() => { setPathId(treePath.id); go("subject", subject.id); }} className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.35)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", padding: 0 }}>{treePath.name.en.toUpperCase()}</button></>}
            {sep}
            <span className="q-mono" style={{ fontSize: 11, color: "rgba(43,54,52,.55)", letterSpacing: "0.1em" }}>{p.name.en.toUpperCase()}</span>
          </div>
        );
      })()}

      {/* Branch title */}
      <h1 className="q-display" style={{ fontSize: "clamp(32px,6vw,56px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 40 }}>{p.name.en}</h1>

      {/* Glass-like archival canvas */}
      <div style={{ background: "rgba(43,54,52,.03)", border: "1px solid rgba(43,54,52,.08)", borderRadius: 14, padding: "clamp(32px,5vw,56px) clamp(24px,4vw,48px)", position: "relative", boxShadow: "inset 0 0 60px rgba(43,54,52,.04)" }}>

        {/* Progress indicator - editorial measurement line */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", letterSpacing: "0.1em" }}>{String(pr.done).padStart(2, "0")} / {String(pr.total).padStart(2, "0")}</span>
          <div style={{ flex: 1, height: 1, background: "rgba(43,54,52,.1)", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: 1, width: (pr.pct || 0) + "%", background: "rgba(43,54,52,.4)" }} />
          </div>
        </div>

        {/* Course index */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {p.nodes.map((n, i) => {
            const done = completed[n.id];
            return (
              <button key={n.id}
                onClick={() => setDrawerNode(ALL_NODES[n.id])}
                className="text-left group"
                style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,28px)", padding: "clamp(28px,4vh,40px) 0", borderBottom: i < p.nodes.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", background: "transparent", border: "none", borderBottom: i < p.nodes.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", cursor: "pointer", transition: "opacity .15s", width: "100%" }}
                onMouseOver={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.querySelector("[data-arrow]").style.opacity = "1"; }}
                onMouseOut={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.querySelector("[data-arrow]").style.opacity = "0"; }}>
                <span style={{ fontFamily: mono, fontSize: 13, color: done ? "rgba(43,54,52,.5)" : "rgba(43,54,52,.25)", fontWeight: 500, flexShrink: 0, width: 32 }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="q-display" style={{ fontSize: "clamp(18px,3vw,28px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.025em", textDecoration: done ? "none" : "none", flex: 1 }}>
                  {n.name.en}
                  {done && <span style={{ fontFamily: mono, fontSize: 18, color: "rgba(43,54,52,.4)", marginLeft: 14, fontWeight: 600 }}>{String.fromCharCode(10003)}</span>}
                </span>
                <span data-arrow="" style={{ fontSize: 18, color: "rgba(43,54,52,.25)", flexShrink: 0, opacity: 0, transition: "opacity .15s" }}>{String.fromCharCode(8594)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══ MODULE: components/NodeDrawer.jsx ═══ */
const RES_ICONS = { video: <Play size={16} className="text-red-500" />, course: <BookOpen size={16} className="text-indigo-500" />, book: <FileText size={16} className="text-slate-700" />, practice: <PenLine size={16} className="text-emerald-500" />, sim: <Gamepad2 size={16} className="text-violet-500" /> };
function NodeDrawer() {
  const { t, lang, drawerNode, setDrawerNode, completed, completeNode, askAI, go, notes, setNote, nodeChecks, setNodeChecks, comps } = useQ();
  // checks from nodeChecks
  
  const [notesExpanded, setNotesExpanded] = useState(false);
  if (!drawerNode) return null;
  const node = drawerNode;
  const done = completed[node.id];
  const close = () => setDrawerNode(null);
  const myChecks = (nodeChecks || {})[node.id] || {};
  const toggleCheck = (i) => setNodeChecks(p => ({...p, [node.id]: {...(p[node.id]||{}), [i]: !(p[node.id]||{})[i]}}));
  const diffLabel = node.diff === 1 ? "BEGINNER" : node.diff === 2 ? "INTERMEDIATE" : "ADVANCED";
  const mono = "'Space Grotesk', ui-monospace, monospace";

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0" style={{ background: "rgba(43,54,52,.25)", backdropFilter: "blur(3px)" }} onClick={close} />
      <div className="overflow-y-auto q-pop" style={{ position: "fixed", top: 16, left: 16, right: 16, bottom: 16, margin: "auto", background: "#f0f2ee", maxWidth: 600, borderRadius: 20, overflowY: "auto" }}>
        <div className="p-8 relative">
          {/* Close */}
          <button onClick={close} className="absolute top-6 right-6" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(43,54,52,.4)", fontSize: 18 }}>{String.fromCharCode(10005)}</button>

          {/* Level */}
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)", fontWeight: 500, marginBottom: 12 }}>{diffLabel}</div>

          {/* Title */}
          <h2 className="q-display" style={{ fontSize: "clamp(26px,6vw,40px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 16, paddingRight: 32 }}>{node.name.en}</h2>

          {/* Brief explanation */}
          <p style={{ fontSize: 14, color: "rgba(43,54,52,.7)", lineHeight: 1.7, marginBottom: 32, fontWeight: 500 }}>{node.why ? (node.why.en || node.why.mn) : (node.desc.en || node.desc.mn)}</p>

          {/* Hairline */}
          <div style={{ height: 1, background: "rgba(43,54,52,.14)", marginBottom: 32 }} />

          {/* Resources */}
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)", fontWeight: 500, marginBottom: 16 }}>RESOURCES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 32 }}>
            {node.res.map((r, i) => (
              <a key={i} href={r.u || "#"} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "14px 0", borderBottom: i < node.res.length - 1 ? "1px solid rgba(43,54,52,.06)" : "none", textDecoration: "none", transition: "opacity .2s" }}
                onMouseOver={e => e.currentTarget.style.opacity = "0.6"}
                onMouseOut={e => e.currentTarget.style.opacity = "1"}>
                <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(43,54,52,.4)", flexShrink: 0, width: 24 }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#2b3634" }}>{r.l.en}</div>
                </div>
                <span style={{ fontSize: 14, color: "rgba(43,54,52,.4)", flexShrink: 0 }}>{String.fromCharCode(8594)}</span>
              </a>
            ))}
          </div>

          {/* Ask AI - minimal */}
          <button onClick={() => { const nb = NODE_BRANCH[node.id]; const bn = nb && BRANCH_NAMES[nb.branchId]; close(); askAI("Can you help me understand " + node.name.en + "?", nb ? nb.branchId : "main", bn ? bn.en : null); }}
            style={{ width: "100%", padding: "14px 0", border: "2px solid rgba(43,54,52,.2)", borderRadius: 14, background: "transparent", cursor: "pointer", fontFamily: mono, fontSize: 12, letterSpacing: "0.1em", color: "rgba(43,54,52,.7)", fontWeight: 600, marginBottom: 32, transition: "border-color .2s" }}
            onMouseOver={e => e.currentTarget.style.borderColor = "rgba(43,54,52,.3)"}
            onMouseOut={e => e.currentTarget.style.borderColor = "rgba(43,54,52,.12)"}>
            LEARN FROM ASSISTANT
          </button>

          {/* Hairline */}
          <div style={{ height: 1, background: "rgba(43,54,52,.14)", marginBottom: 32 }} />

          {/* My Notes */}
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)", fontWeight: 500, marginBottom: 16 }}>MY NOTES</div>
          <div style={{ marginBottom: 32 }}>
            <textarea value={notes[node.id] || ""} onChange={(e) => setNote(node.id, e.target.value)}
              placeholder="Write your notes here..."
              rows={notesExpanded ? 14 : 4}
              style={{ width: "100%", padding: 16, border: "1.5px solid rgba(43,54,52,.15)", borderRadius: 14, background: "rgba(43,54,52,.03)", fontSize: 14, color: "#2b3634", lineHeight: 1.7, resize: "none", outline: "none", fontFamily: "inherit", transition: "height .2s" }} />
            <button onClick={() => setNotesExpanded(p => !p)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: 2, padding: "4px 0", background: "none", border: "none", cursor: "pointer", color: "rgba(43,54,52,.3)", fontSize: 16, transition: "color .2s" }}
              onMouseOver={e => e.currentTarget.style.color = "rgba(43,54,52,.5)"}
              onMouseOut={e => e.currentTarget.style.color = "rgba(43,54,52,.3)"}>
              <span style={{ transform: notesExpanded ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform .2s", display: "inline-block", fontWeight: 700 }}>{String.fromCharCode(187)}</span>
            </button>
          </div>

          {/* Hairline */}
          <div style={{ height: 1, background: "rgba(43,54,52,.14)", marginBottom: 32 }} />

          {/* Complete / Incomplete */}
          {done ? (
            <button onClick={() => completeNode(node.id)}
              style={{ width: "100%", padding: "14px 0", border: "1.5px solid rgba(43,54,52,.2)", borderRadius: 14, background: "rgba(43,54,52,.04)", cursor: "pointer", fontFamily: mono, fontSize: 13, fontWeight: 500, color: "rgba(43,54,52,.6)", letterSpacing: "0.05em" }}>
              MARK AS INCOMPLETE
            </button>
          ) : (
            <button onClick={() => completeNode(node.id)}
              style={{ width: "100%", padding: "14px 0", border: "1.5px solid rgba(43,54,52,.2)", borderRadius: 14, background: "transparent", cursor: "pointer", fontFamily: mono, fontSize: 13, fontWeight: 600, color: "#2b3634", letterSpacing: "0.05em" }}>
              MARK AS COMPLETE
            </button>
          )}

          <div style={{ height: 40 }} />
        </div>
      </div>
    </div>
  );
}

/* ═══ MODULE: components/Quiz.jsx ═══ */
function Quiz({ node, onPass }) {
  const { t, lang } = useQ();
  const [ans, setAns] = useState({});
  const [state, setState] = useState("doing");
  const [questions, setQuestions] = useState(node.quiz || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setAns({}); setState("doing"); setLoading(true);
    (async () => {
      try {
        const resList = (node.res || []).map((r) => (r.l ? r.l.en : "")).filter(Boolean).slice(0, 6).join("; ");
        const sys = `You are a rigorous STEM examiner. Write 6 challenging multiple-choice questions that genuinely test deep understanding of the topic below, a mix of conceptual, applied, and calculation/problem-solving questions at the right level for this course, not trivial recall. Each question must have exactly 4 plausible options with ONE unambiguous correct answer. Base the questions on the topic and its listed materials. Respond with ONLY a raw JSON array (no code fences, no commentary), written in ${lang === "mn" ? "Mongolian" : "English"}: [{"q":"question text","o":["option A","option B","option C","option D"],"a":<0-based index of the correct option>}]`;
        const info = `Topic: ${node.name.en}${node.desc ? "" + node.desc.en : ""}. Reward: +${node.xp} XP. Key materials: ${resList || "standard curriculum resources"}.`;
        const raw = await callAI(sys, [{ role: "user", content: info }], false);
        const clean = String(raw).replace(/```json/gi, "").replace(/```/g, "").trim();
        const s0 = clean.indexOf("["), s1 = clean.lastIndexOf("]");
        const arr = s0 >= 0 && s1 > s0 ? JSON.parse(clean.slice(s0, s1 + 1)) : [];
        const valid = (Array.isArray(arr) ? arr : []).filter((q) => q && typeof q.q === "string" && Array.isArray(q.o) && q.o.length >= 2 && Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length).slice(0, 8);
        if (alive && valid.length >= 3) setQuestions(valid);
      } catch (e) { /* keep static fallback */ }
      if (alive) setLoading(false);
    })();
    return () => { alive = false; };
  }, [node.id, lang]);

  const qText = (q) => (typeof q.q === "string" ? q.q : q.q[lang]);
  const qOpts = (q) => (Array.isArray(q.o) ? q.o : q.o[lang]);
  const allAnswered = questions.length > 0 && questions.every((_, i) => ans[i] !== undefined);
  const check = () => {
    const ok = questions.every((q, i) => ans[i] === q.a);
    setState(ok ? "pass" : "fail");
    if (ok) setTimeout(() => onPass(), 500);
  };

  if (loading) return (
    <div className="p-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50 flex items-center gap-2 text-sm font-extrabold text-indigo-700">
      <Loader2 size={16} className="animate-spin" /> {lang === "mn" ? "Гүнзгий шалгалт бэлдэж байна…" : "Building your quiz…"}
    </div>
  );
  if (!questions.length) return null;

  return (
    <div className="p-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50 q-pop">
      <div className="font-extrabold text-sm text-indigo-700 mb-3 flex items-center gap-1.5"><FlaskConical size={15} /> {t.quizTitle} · {questions.length}</div>
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <div className="text-sm font-bold text-slate-800 mb-2">{i + 1}. {qText(q)}</div>
          <div className="grid gap-1.5">
            {qOpts(q).map((o, j) => (
              <button key={j} onClick={() => state === "doing" && setAns({ ...ans, [i]: j })}
                className={cx("text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors",
                  ans[i] === j
                    ? state === "fail" && j !== q.a ? "border-red-300 bg-red-50 text-red-600"
                      : state !== "doing" && j === q.a ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border-violet-400 q-lp text-violet-700"
                    : state !== "doing" && j === q.a ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "border-transparent q-lp text-slate-600 hover:border-indigo-200")}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}
      {state === "pass" && <div className="font-extrabold text-emerald-600 text-sm mb-1">{t.quizPass}</div>}
      {state === "fail" && <div className="font-extrabold text-red-500 text-sm mb-2">{t.quizFail}</div>}
      {state !== "pass" && (
        <button onClick={state === "fail" ? () => { setAns({}); setState("doing"); } : check} disabled={state === "doing" && !allAnswered}
          className={cx("w-full py-3 rounded-xl font-extrabold text-sm transition-all",
            state === "fail" ? "bg-slate-800 q-ink" : allAnswered ? "bg-gradient-to-r from-indigo-600 to-violet-600 q-ink shadow-md" : "bg-violet-200 text-slate-600")}>
          {state === "fail" ? t.quizRetry : t.quizCheck}
        </button>
      )}
    </div>
  );
}
/* ═══ MODULE: components/OppCard.jsx ═══ */
function OppCard({ opp, featured }) {
  const { t, lang, completed, go, user, roadmaps, saveRoadmap, openRoadmap } = useQ();
  const s = oppStatus(opp, completed);
  const compRm = roadmaps.find((r) => r.compId === opp.id);
  const prepComp = () => {
    if (compRm) { openRoadmap(compRm.id); return; }
    const rm = buildCompRoadmap(opp, lang);
    saveRoadmap(rm);
    openRoadmap(rm.id);
  };
  const weeks = estimateWeeks(s.missing);
  const st = compStatus(opp);
  return (
    <div className={cx("rounded-3xl border q-lp p-6 flex flex-col transition-all",
      s.unlocked ? "border-amber-300" : "border-indigo-100", featured && "sm:col-span-2 lg:col-span-3")}
      style={{ boxShadow: s.unlocked ? "0 14px 40px -18px rgba(245,158,11,.45)" : "0 10px 30px -20px rgba(61,74,70,.35)" }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={cx("w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl", s.unlocked ? "bg-amber-50" : "bg-indigo-50")}><Ic id={opp.id} size={22} /></div>
          <div className="min-w-0">
            <div className="font-extrabold text-slate-900 leading-tight">{opp.name[lang]}</div>
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              <StatusBadge status={st} est={opp.win && opp.win.est} />
              <DiffBadge level={opp.level} />
              {opp.uni && <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-violet-100 text-violet-500">{t.uniFlag}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <HeartBtn id={opp.id} small />
          <span className={cx("px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5",
            s.unlocked ? "bg-gradient-to-r from-amber-400 to-amber-500 q-ink shadow-md" : "bg-violet-100 text-violet-500")}>
            {s.unlocked ? <><Award size={13} /> {t.unlocked}</> : <><Lock size={12} /> {t.locked}</>}
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-700 mt-3 leading-relaxed">{opp.desc[lang]}</p>

      <div className="mt-3 space-y-1.5 text-xs font-bold">
        <div className={cx("flex items-start gap-2", opp.elig.ok === true ? "text-emerald-600" : "text-amber-600")}>
          {opp.elig.ok === true ? <CheckCircle2 size={14} className="shrink-0 mt-0.5" /> : <Compass size={14} className="shrink-0 mt-0.5" />}
          <span>{opp.elig.ok === true ? t.eligOk : t.eligCheck}, <span className="font-semibold text-slate-700">{opp.elig.note[lang]}</span></span>
        </div>
        {opp.win && !opp.win.always && opp.win.o != null && (
          <div className="flex items-start gap-2 text-slate-700">
            <CalendarDays size={14} className="shrink-0 mt-0.5 text-indigo-500" />
            <span>{t.windowLabel}: {fmtMonth(lang, opp.win.o)} – {fmtMonth(lang, opp.win.c)}{opp.win.est ? " · ~" + t.estMark : ""}{opp.win.note ? " · " + opp.win.note[lang] : ""}</span>
          </div>
        )}
        {opp.timeline && (
          <div className="flex items-start gap-2 text-slate-600"><TrendingUp size={14} className="shrink-0 mt-0.5" /><span className="font-semibold">{opp.timeline[lang]}</span></div>
        )}
        <div className="flex items-start gap-2 text-slate-600"><Clock size={14} className="shrink-0 mt-0.5" /><span>{t.prepLabel}: ~{opp.prep} {t.monthsUnit}</span></div>
      </div>

      <div className="mt-4 flex-1">
        {opp.id !== "nasa-space-apps" && (
          <>
            <div className="flex items-center justify-between text-xs font-extrabold mb-1.5">
              <span className="text-slate-600 uppercase tracking-wide">{t.matchLabel}</span>
              <span className="text-indigo-600">{s.pct}%</span>
            </div>
            <PBar pct={s.pct} />
            <div className="text-xs font-extrabold text-slate-600 uppercase tracking-wide mt-3 mb-1.5">{lang === "mn" ? "Шалгах сэдвүүд" : "What it tests"} · {opp.reqs.length}</div>
            <ul className={cx("gap-x-4 gap-y-1.5 grid", featured ? "sm:grid-cols-2" : "")}>
              {opp.reqs.slice(0, 8).map((r) => {
                const ok = completed[r];
                return (
                  <li key={r} className={cx("text-sm font-bold flex items-center gap-2", ok ? "text-emerald-600" : "text-slate-600")}>
                    <span className={cx("w-5 h-5 rounded-md flex items-center justify-center border-2 text-xs shrink-0", ok ? "bg-emerald-500 border-emerald-500 q-ink" : "border-slate-300")}>{ok && <Check size={11} strokeWidth={4} />}</span>
                    {ALL_NODES[r] ? ALL_NODES[r].name[lang] : r}
                  </li>
                );
              })}
            </ul>
            {opp.reqs.length > 8 && <div className="text-xs font-bold text-slate-500 mt-1.5">+{opp.reqs.length - 8} {lang === "mn" ? "нэмэлт сэдэв" : "more topics"}</div>}
            {!s.unlocked && <div className="text-xs font-extrabold text-slate-600 mt-2">{s.missing.length} {t.nodesLabel}</div>}
          </>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {opp.link && (
          <a href={opp.link} target="_blank" rel="noreferrer"
            className="flex-1 py-3 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 bg-violet-700 q-ink shadow-md hover:bg-violet-800 transition-colors">
            {t.view} <ExternalLink size={14} />
          </a>
        )}
        {opp.volunteerLink && (
          <a href={opp.volunteerLink} target="_blank" rel="noreferrer"
            className="flex-1 py-3 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 bg-violet-700 q-ink shadow-md hover:bg-violet-800 transition-colors">
            {lang === "mn" ? "Сайн дурын" : "Volunteer"} <ExternalLink size={14} />
          </a>
        )}
        {opp.reqs && opp.reqs.length > 0 && (
          <button onClick={prepComp}
            className="w-full py-3 rounded-2xl bg-violet-700 q-ink font-extrabold text-sm flex items-center justify-center gap-1.5 shadow-md hover:bg-violet-800 transition-colors">
            {compRm ? (lang === "mn" ? "Замаа нээх" : "Open roadmap") : (lang === "mn" ? "Бэлтгэж, тусдаа зам үүсгэх" : "Prepare & generate roadmap")} <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══ MODULE: components/CompetitionsPage.jsx ═══ */
function CompetitionsPage() {
  const { t, lang, comps, go, roadmaps, setRoadmaps } = useQ();
  const [selected, setSelected] = useState(null);
  const list = comps.filter((c) => !c.hidden && !c.archived);
  const mono = "'Space Grotesk', ui-monospace, monospace";

  if (selected) {
    const o = selected;
    const fields = [...(compSubjects(o) || [])].map(sid => { const s = DB.subjects.find(x => x.id === sid); return s ? s.name.en : sid; }).join(", ");
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={() => setSelected(null)} style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", background: "none", border: "none", cursor: "pointer", marginBottom: 40, padding: 0, letterSpacing: "0.1em" }}>{String.fromCharCode(8592)} BACK</button>
        <h1 className="q-display" style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 8 }}>{o.name[lang] || o.name.en}</h1>
        {fields && <div style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.45)", marginBottom: 24 }}>{fields}</div>}
        <p style={{ fontSize: 15, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 40 }}>{o.desc[lang] || o.desc.en}</p>
        <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginBottom: 32 }} />

        {o.elig && o.elig.note && <><div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 10 }}>ELIGIBILITY</div><p style={{ fontSize: 14, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 28 }}>{o.elig.ok ? "Open to Mongolia" : "Check eligibility"}{o.elig.note ? " " + (o.elig.note[lang] || o.elig.note.en || o.elig.note) : ""}</p></>}

        {o.timeline && <><div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 10 }}>PATH</div><p style={{ fontSize: 14, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 28 }}>{o.timeline[lang] || o.timeline.en || o.timeline}</p></>}

        {o.win && o.win.note && <><div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 10 }}>TIMELINE</div><p style={{ fontSize: 14, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 28 }}>{o.win.note[lang] || o.win.note.en || o.win.note}</p></>}

        {o.prep && <><div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 10 }}>PREPARATION</div><p style={{ fontSize: 14, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 28 }}>Approximately {o.prep} months</p></>}

        <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginBottom: 32 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {o.link && <a href={o.link} target="_blank" rel="noreferrer" style={{ display: "block", padding: "14px 0", border: "1px solid rgba(43,54,52,.12)", borderRadius: 14, textAlign: "center", fontFamily: mono, fontSize: 13, color: "#2b3634", textDecoration: "none", letterSpacing: "0.05em" }}>Register here {String.fromCharCode(8594)}</a>}
          <button onClick={() => { const rm = { id: "rm-" + Date.now(), title: "Preparation: " + (o.name[lang] || o.name.en), created: new Date().toISOString(), type: "competition", targetId: o.id }; setRoadmaps(prev => [...(prev||[]), rm]); setSelected(null); go("roadmap"); }}
            style={{ padding: "14px 0", border: "1px solid rgba(43,54,52,.12)", borderRadius: 14, background: "transparent", cursor: "pointer", fontFamily: mono, fontSize: 13, color: "#2b3634", letterSpacing: "0.05em", width: "100%" }}>Prepare for this {String.fromCharCode(8594)}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 48 }}>Competitions</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {list.map((o, i) => {
          const fields = [...(compSubjects(o) || [])].map(sid => { const s = DB.subjects.find(x => x.id === sid); return s ? s.name.en : sid; }).join(", ");
          return (
            <button key={o.id} onClick={() => setSelected(o)} className="text-left"
              style={{ padding: "clamp(24px,3.5vh,36px) 0", borderBottom: i < list.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", background: "transparent", border: "none", borderBottom: i < list.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", cursor: "pointer", transition: "opacity .15s", width: "100%" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.6"}
              onMouseOut={e => e.currentTarget.style.opacity = "1"}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,28px)" }}>
                <span style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.25)", flexShrink: 0, width: 32 }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ flex: 1 }}>
                  <div className="q-display" style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.02em" }}>{o.name[lang] || o.name.en}</div>
                  {fields && <div style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", marginTop: 4 }}>{fields}</div>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ MODULE: components/ResearchPage.jsx ═══ */
function ResearchPage() {
  const { t, lang, go, finderOpen, setFinderOpen, comps, roadmaps, setRoadmaps } = useQ();
  const [view, setView] = useState("main");
  const [selectedProg, setSelectedProg] = useState(null);
  const mono = "'Space Grotesk', ui-monospace, monospace";
  const researchProgs = comps.filter(c => !c.hidden && !c.archived && (c.cat === "research" || c.id === "research-ready"));

  if (selectedProg) {
    const o = selectedProg;
    const fields = [...(compSubjects(o) || [])].map(sid => { const s = DB.subjects.find(x => x.id === sid); return s ? s.name.en : sid; }).join(", ");
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={() => setSelectedProg(null)} style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", background: "none", border: "none", cursor: "pointer", marginBottom: 40, padding: 0, letterSpacing: "0.1em" }}>{String.fromCharCode(8592)} BACK</button>
        <h1 className="q-display" style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 8 }}>{o.name[lang] || o.name.en}</h1>
        {fields && <div style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.45)", marginBottom: 24 }}>{fields}</div>}
        <p style={{ fontSize: 15, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 40 }}>{o.desc[lang] || o.desc.en}</p>
        <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginBottom: 32 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {o.link && <a href={o.link} target="_blank" rel="noreferrer" style={{ display: "block", padding: "14px 0", border: "1px solid rgba(43,54,52,.12)", borderRadius: 14, textAlign: "center", fontFamily: mono, fontSize: 13, color: "#2b3634", textDecoration: "none", letterSpacing: "0.05em" }}>Register here {String.fromCharCode(8594)}</a>}
          <button onClick={() => { const rm = { id: "rm-" + Date.now(), title: "Preparation: " + (o.name[lang] || o.name.en), created: new Date().toISOString(), type: "research" }; setRoadmaps(prev => [...(prev||[]), rm]); setSelectedProg(null); go("roadmap"); }}
            style={{ padding: "14px 0", border: "1px solid rgba(43,54,52,.12)", borderRadius: 14, background: "transparent", cursor: "pointer", fontFamily: mono, fontSize: 13, color: "#2b3634", letterSpacing: "0.05em", width: "100%" }}>Prepare for this {String.fromCharCode(8594)}</button>
        </div>
      </div>
    );
  }

  if (view === "programs") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={() => setView("main")} style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", background: "none", border: "none", cursor: "pointer", marginBottom: 40, padding: 0, letterSpacing: "0.1em" }}>{String.fromCharCode(8592)} RESEARCH</button>
        <h1 className="q-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 48 }}>Research Programs</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {researchProgs.length > 0 ? researchProgs.map((o, i) => {
            const fields = [...(compSubjects(o) || [])].map(sid => { const s = DB.subjects.find(x => x.id === sid); return s ? s.name.en : sid; }).join(", ");
            return (
              <button key={o.id} onClick={() => setSelectedProg(o)} className="text-left"
                style={{ padding: "clamp(24px,3.5vh,36px) 0", borderBottom: i < researchProgs.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", background: "transparent", border: "none", borderBottom: i < researchProgs.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", cursor: "pointer", transition: "opacity .15s", width: "100%" }}
                onMouseOver={e => e.currentTarget.style.opacity = "0.6"}
                onMouseOut={e => e.currentTarget.style.opacity = "1"}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,28px)" }}>
                  <span style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.25)", flexShrink: 0, width: 32 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ flex: 1 }}>
                    <div className="q-display" style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.02em" }}>{o.name[lang] || o.name.en}</div>
                    {fields && <div style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", marginTop: 4 }}>{fields}</div>}
                  </div>
                </div>
              </button>
            );
          }) : <p style={{ fontSize: 14, color: "rgba(43,54,52,.4)" }}>No research programs available yet.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 56 }}>Research</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <button onClick={() => { const rm = { id: "rm-" + Date.now(), title: "Research Preparation", created: new Date().toISOString(), type: "research" }; setRoadmaps(prev => [...(prev||[]), rm]); go("dashboard"); }} className="text-left"
          style={{ padding: "clamp(24px,3.5vh,36px) 0", borderBottom: "1px solid rgba(43,54,52,.07)", background: "none", border: "none", borderBottom: "1px solid rgba(43,54,52,.07)", cursor: "pointer", transition: "opacity .15s", width: "100%" }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.6"} onMouseOut={e => e.currentTarget.style.opacity = "1"}>
          <span className="q-display" style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 600, color: "#2b3634" }}>Start learning for research {String.fromCharCode(8594)}</span>
        </button>
        <button onClick={() => setFinderOpen(true)} className="text-left"
          style={{ padding: "clamp(24px,3.5vh,36px) 0", borderBottom: "1px solid rgba(43,54,52,.07)", background: "none", border: "none", borderBottom: "1px solid rgba(43,54,52,.07)", cursor: "pointer", transition: "opacity .15s", width: "100%" }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.6"} onMouseOut={e => e.currentTarget.style.opacity = "1"}>
          <span className="q-display" style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 600, color: "#2b3634" }}>Find research mentors {String.fromCharCode(8594)}</span>
        </button>
        <button onClick={() => setView("programs")} className="text-left"
          style={{ padding: "clamp(24px,3.5vh,36px) 0", background: "none", border: "none", cursor: "pointer", transition: "opacity .15s", width: "100%" }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.6"} onMouseOut={e => e.currentTarget.style.opacity = "1"}>
          <span className="q-display" style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 600, color: "#2b3634" }}>Research programs {String.fromCharCode(8594)}</span>
        </button>
      </div>
    </div>
  );
}

const RESEARCH_TOPICS = ["Quantum Computing", "Machine Learning", "Graph Theory", "Cancer Biology", "Astrophysics", "Robotics", "Climate Science", "Photonics", "Neuroscience", "Synthetic Biology", "Number Theory", "Materials Science"];
const RESEARCH_UNIS = ["MIT", "Harvard", "Stanford", "Cambridge", "Oxford", "ETH Zürich", "NUS", "NUM (МУИС)", "MUST (ШУТИС)"];

function ScanLoader() {
  const { lang } = useQ();
  const msgs = lang === "mn"
    ? ["Судлаачдыг хайж байна…", "Сонирхолд тааруулж байна…", "Нийтлэлүүдийг шинжилж байна…", "Тохирлыг эрэмбэлж байна…"]
    : ["Scanning researchers…", "Matching interests…", "Analyzing publications…", "Ranking compatibility…"];
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % msgs.length), 1500); return () => clearInterval(id); }, []);
  return (
    <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(43,54,52,.14)" }}>
      <span className="relative inline-block shrink-0" style={{ width: 26, height: 26 }}>
        <span className="absolute inset-0 rounded-full" style={{ border: "2px solid rgba(43,54,52,.22)", borderTopColor: "#8a938c", animation: "qRingSpin .9s linear infinite" }} />
      </span>
      <span className="text-sm font-bold text-indigo-100">{msgs[i]}</span>
    </div>
  );
}

function ResearchIdeaGenerator() {
  const { lang, user } = useQ();
  const [field, setField] = useState((user && (user.major || user.interests)) || "");
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const [err, setErr] = useState("");
  const gen = async () => {
    if (!field.trim() || loading) return;
    setLoading(true); setErr(""); setIdeas(null);
    try {
      const sys = `You generate original, feasible research project ideas for a motivated student (no university lab needed). Respond with ONLY a raw JSON array (no markdown, no prose) of exactly 4 objects: {"title":"...","desc":"...","angle":"..."}. title = concise, specific project title. desc = one clear sentence in ${lang === "mn" ? "Mongolian" : "English"}. angle = short note in ${lang === "mn" ? "Mongolian" : "English"} on how a student can actually start it (open datasets, simulation, low-cost experiment, or literature synthesis). Be specific and achievable, never vague.`;
      const text = await callAI(sys, [{ role: "user", content: `Field / major / interest: ${field}` }], false);
      const a = text.indexOf("["), b = text.lastIndexOf("]");
      if (a !== -1 && b > a) setIdeas(JSON.parse(text.slice(a, b + 1)));
      else setErr(lang === "mn" ? "Дахин оролдоно уу." : "Try again.");
    } catch (e) { setErr(lang === "mn" ? "Алдаа гарлаа." : "Something went wrong."); }
    setLoading(false);
  };
  return (
    <div className="mt-10 rounded-3xl overflow-hidden relative" style={{ background: "#f0f2ee", border: "1px solid rgba(43,54,52,.14)" }}>
      
      <div className="p-7 relative">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center q-ink"><Lightbulb size={21} /></div>
          <h2 className="text-2xl font-extrabold q-ink">{lang === "mn" ? "Судалгааны санаа гаргагч" : "Research Idea Generator"}</h2>
        </div>
        <p className="text-sm max-w-2xl leading-relaxed" style={{ color: "rgba(43,54,52,.8)" }}>{lang === "mn" ? "Мэргэжил, сонирхолдоо тохирсон, сурагч, оюутан бодитоор эхлүүлж болох судалгааны төслийн санаанууд." : "Project ideas tuned to your major and interests, ones a student can realistically start."}</p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <input value={field} onChange={(e) => setField(e.target.value)} placeholder={lang === "mn" ? "Мэргэжил / сонирхол (ж: Physics, AI…)" : "Major / interest (e.g., Physics, AI…)"}
            className="flex-1 px-4 py-3.5 rounded-2xl q-lp text-slate-900 text-sm font-semibold outline-none border-2 border-transparent focus:border-violet-400" />
          <button onClick={gen} disabled={loading || !field.trim()}
            className={cx("px-6 py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all", loading || !field.trim() ? "bg-slate-700 text-slate-400" : "bg-gradient-to-r from-fuchsia-500 to-violet-600 q-ink shadow-lg hover:-translate-y-0.5")}>
            {loading ? <><Loader2 size={16} className="animate-spin" /> {lang === "mn" ? "Гаргаж байна…" : "Generating…"}</> : <><Atom size={16} /> {lang === "mn" ? "Санаа гаргах" : "Generate ideas"}</>}
          </button>
        </div>
        {err && <div className="mt-4 text-sm font-bold text-red-400">{err}</div>}
        {ideas && (
          <div className="mt-6 grid sm:grid-cols-2 gap-3 q-fade-up">
            {ideas.map((idea, i) => (
              <div key={i} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(43,54,52,.14)" }}>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 q-ink text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div className="font-extrabold q-ink text-sm leading-snug">{idea.title}</div>
                </div>
                <div className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(107,115,110,.8)" }}>{idea.desc}</div>
                {idea.angle && <div className="text-xs mt-2 flex gap-1.5 leading-relaxed" style={{ color: "rgba(43,54,52,.45)" }}><Compass size={13} className="shrink-0 mt-0.5" /> {idea.angle}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfessorFinder({ unlocked, open, setOpen }) {
  const { t, lang, savedProfs, toggleProf } = useQ();
  const [peek, setPeek] = useState(false);
  const [interest, setInterest] = useState("");
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [raw, setRaw] = useState("");
  const [err, setErr] = useState("");
  const canUse = unlocked || peek;
  const search = async (query) => {
    const q = (query || interest).trim();
    if (!q || loading) return;
    if (query) setInterest(query);
    setLoading(true); setErr(""); setData(null); setRaw("");
    try {
      const sys = `You are a research-opportunity scout helping ambitious Mongolian students. Use web search to find REAL, currently active professors or researchers matching the student's interest. NEVER invent names or affiliations. Respond with ONLY a raw JSON object (no markdown, no prose): {"summary":"...","results":[{"name":"...","affiliation":"...","area":"...","areas":["..."],"match":88,"note":"..."}]}. Provide 3 to 6 results. "match" = integer 0-100 estimating fit with the student's interest. "areas" = 2 to 4 short research keywords. "summary" = 1-2 sentence overview in ${lang === "mn" ? "Mongolian" : "English"} comparing the researchers and naming who may fit best. "note" = one short sentence in ${lang === "mn" ? "Mongolian" : "English"} on why this person fits a well-prepared student. If plausibly relevant researchers exist at Mongolian universities (NUM/МУИС, MUST/ШУТИС), include at least one.`;
      const text = await callAI(sys, [{ role: "user", content: `Interest: ${q}. ${org ? "Preferred university/region: " + org + "." : ""}` }], true);
      const a = text.indexOf("{"), b = text.lastIndexOf("}");
      if (a !== -1 && b > a) { const obj = JSON.parse(text.slice(a, b + 1)); obj.results ? setData(obj) : setRaw(text); }
      else setRaw(text);
    } catch (e) { setErr(t.chatErr); }
    setLoading(false);
  };
  const Chip = ({ label, onClick, active }) => (
    <button onClick={onClick} className={cx("px-3 py-1.5 rounded-full text-xs font-bold transition-all", active ? "bg-gradient-to-r from-indigo-500 to-violet-600 q-ink" : "text-indigo-100 hover:brightness-125")}
      style={active ? {} : { background: "rgba(255,255,255,.07)", border: "1px solid rgba(43,54,52,.16)" }}>{label}</button>
  );
  return (
    <div className="mt-10 rounded-3xl overflow-hidden relative" style={{ background: "#f0f2ee", border: "1px solid rgba(43,54,52,.14)" }}>
      
      <div className="p-7 relative">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center q-ink"><Telescope size={21} /></div>
          <h2 className="text-2xl sm:text-3xl font-extrabold q-ink" style={{ letterSpacing: "-0.02em" }}>{lang === "mn" ? "Сониуч зантай судлаачдыг ол" : "Find Researchers Who Share Your Curiosity"}</h2>
        </div>
        <p className="text-sm max-w-2xl leading-relaxed" style={{ color: "rgba(43,54,52,.82)" }}>{t.findProfSub}</p>
        {!canUse ? (
          <div className="mt-6 p-6 rounded-2xl border border-dashed text-center" style={{ borderColor: "rgba(43,54,52,.28)" }}>
            <Lock className="mx-auto mb-2" size={22} style={{ color: "rgba(43,54,52,.7)" }} />
            <div className="font-bold text-indigo-100 text-sm">{t.profLocked}</div>
            <button onClick={() => setPeek(true)} className="mt-3 text-xs font-extrabold text-violet-300 underline">{t.demoPeek}</button>
          </div>
        ) : (
          <div className="mt-6">
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={interest} onChange={(e) => setInterest(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder={t.interestPh}
                className="px-4 py-3.5 rounded-2xl q-lp text-slate-900 text-sm font-semibold outline-none border-2 border-transparent focus:border-violet-400" />
              <input value={org} onChange={(e) => setOrg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder={t.orgPh}
                className="px-4 py-3.5 rounded-2xl q-lp text-slate-900 text-sm font-semibold outline-none border-2 border-transparent focus:border-violet-400" />
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "rgba(43,54,52,.6)" }}>{lang === "mn" ? "Жишээ сэдвүүд" : "Example topics"}</div>
              <div className="flex flex-wrap gap-2">
                {RESEARCH_TOPICS.map((tp) => <Chip key={tp} label={tp} active={interest === tp} onClick={() => { setInterest(tp); search(tp); }} />)}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "rgba(43,54,52,.6)" }}>{lang === "mn" ? "Их сургууль (заавал биш)" : "University (optional)"}</div>
              <div className="flex flex-wrap gap-2">
                {RESEARCH_UNIS.map((u) => <Chip key={u} label={u} active={org === u} onClick={() => setOrg(org === u ? "" : u)} />)}
              </div>
            </div>
            <button onClick={() => search()} disabled={loading || !interest.trim()}
              className={cx("mt-5 px-6 py-3.5 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition-all",
                loading || !interest.trim() ? "bg-slate-700 text-slate-400" : "bg-gradient-to-r from-indigo-500 to-violet-600 q-ink shadow-lg hover:-translate-y-0.5")}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> {t.searching}</> : <><Search size={16} /> {t.searchBtn}</>}
            </button>
            {loading && <ScanLoader />}
            {err && <div className="mt-4 text-sm font-bold text-red-400">{err}</div>}
            {data && data.summary && (
              <div className="mt-6 p-4 rounded-2xl q-fade-up" style={{ background: "rgba(61,74,70,.12)", border: "1px solid rgba(43,54,52,.2)" }}>
                <div className="flex items-center gap-2 mb-1.5"><RobotAvatar size={20} /><span className="text-xs font-extrabold text-violet-200 uppercase tracking-wide">{t.aiLabel}</span></div>
                <div className="text-sm leading-relaxed" style={{ color: "#e0e7ff" }}>{data.summary}</div>
              </div>
            )}
            {data && data.results && (
              <div className="grid sm:grid-cols-2 gap-3 mt-3 q-fade-up">
                {data.results.map((r, i) => {
                  const on = savedProfs.some((p) => p.name === r.name);
                  const areas = r.areas && r.areas.length ? r.areas : (r.area ? [r.area] : []);
                  const m = typeof r.match === "number" ? r.match : null;
                  const scholar = `https://scholar.google.com/scholar?q=${encodeURIComponent(r.name + " " + (r.area || ""))}`;
                  return (
                    <div key={i} className="p-5 rounded-2xl relative" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(165,180,255,.14)" }}>
                      <button onClick={() => toggleProf(r)} className={cx("absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors", on ? "text-rose-400" : "text-indigo-300 hover:text-rose-400")} style={{ background: "rgba(255,255,255,.06)" }}>
                        <Heart size={14} fill={on ? "currentColor" : "none"} />
                      </button>
                      <div className="font-extrabold q-ink text-sm pr-9">{r.name}</div>
                      <div className="text-xs font-bold text-indigo-300 mt-0.5">{r.affiliation}</div>
                      {m !== null && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full q-ink" style={{ background: m >= 85 ? "linear-gradient(90deg,#10b981,#059669)" : m >= 70 ? "linear-gradient(90deg,#f59e0b,#d97706)" : "linear-gradient(90deg,#3d4a46,#3d4a46)" }}>
                          <Star size={11} fill="currentColor" /> {m}% {lang === "mn" ? "тохирол" : "match"}
                        </div>
                      )}
                      {areas.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {areas.map((ar, k) => <span key={k} className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(61,74,70,.18)", color: "rgba(43,54,52,.45)" }}>{ar}</span>)}
                        </div>
                      )}
                      <div className="text-xs mt-2.5 leading-relaxed" style={{ color: "rgba(107,115,110,.82)" }}>{r.note}</div>
                      <a href={scholar} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-violet-300 hover:text-violet-200">
                        <Search size={12} /> Google Scholar →
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
            {raw && <div className="mt-4 p-4 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed" style={{ background: "rgba(255,255,255,.06)", color: "#e0e7ff" }}>{raw}</div>}
            {(data || raw) && <div className="mt-3 text-xs font-bold" style={{ color: "#fbbf24" }}>{t.profDisclaimer}</div>}
            <div className="mt-6 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,.06)" }}>
              <div className="text-xs font-extrabold uppercase tracking-wide mb-2" style={{ color: "rgba(43,54,52,.45)" }}>{t.profTipsTitle}</div>
              <ul className="space-y-1">
                {t.profTips.map((tip, i) => <li key={i} className="text-sm flex gap-2" style={{ color: "#e0e7ff" }}><span className="text-amber-400 font-bold">{i + 1}.</span>{tip}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ MODULE: components/NasaPage.jsx ═══ */
function NasaPage() {
  const { t, lang, comps } = useQ();
  const nasa = comps.find((c) => c.id === "nasa-space-apps");
  const mono = "'Space Grotesk', ui-monospace, monospace";
  if (!nasa) return <div className="max-w-3xl mx-auto px-6 py-16"><h1 className="q-display" style={{ fontSize: 36, fontWeight: 800, color: "#2b3634" }}>NASA Space Apps Challenge</h1><p style={{ marginTop: 16, color: "rgba(43,54,52,.5)" }}>Coming soon.</p></div>;
  const fields = [...(compSubjects(nasa) || [])].map(sid => { const s = DB.subjects.find(x => x.id === sid); return s ? s.name.en : sid; }).join(", ");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 8 }}>{nasa.name[lang] || nasa.name.en}</h1>
      {fields && <div style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.45)", marginBottom: 24 }}>{fields}</div>}
      <p style={{ fontSize: 15, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 40 }}>{nasa.desc[lang] || nasa.desc.en}</p>
      <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginBottom: 32 }} />
      {nasa.elig && nasa.elig.note && <><div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 10 }}>ELIGIBILITY</div><p style={{ fontSize: 14, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 28 }}>{nasa.elig.ok ? "Open to Mongolia" : "Check eligibility"}{nasa.elig.note ? " " + (nasa.elig.note[lang] || nasa.elig.note.en || "") : ""}</p></>}
      {nasa.timeline && <><div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 10 }}>PATH</div><p style={{ fontSize: 14, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 28 }}>{nasa.timeline[lang] || nasa.timeline.en}</p></>}
      {nasa.win && nasa.win.note && <><div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 10 }}>TIMELINE</div><p style={{ fontSize: 14, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 28 }}>{nasa.win.note[lang] || nasa.win.note.en || ""}</p></>}
      {nasa.prep && <><div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)", marginBottom: 10 }}>PREPARATION</div><p style={{ fontSize: 14, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 28 }}>Approximately {nasa.prep} months</p></>}
      <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginBottom: 32 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {nasa.link && <a href={nasa.link} target="_blank" rel="noreferrer" style={{ display: "block", padding: "14px 0", border: "1px solid rgba(43,54,52,.12)", borderRadius: 14, textAlign: "center", fontFamily: mono, fontSize: 13, color: "#2b3634", textDecoration: "none", letterSpacing: "0.05em" }}>Register here {String.fromCharCode(8594)}</a>}
        <button style={{ padding: "14px 0", border: "1px solid rgba(43,54,52,.12)", borderRadius: 14, background: "transparent", cursor: "pointer", fontFamily: mono, fontSize: 13, color: "#2b3634", letterSpacing: "0.05em", width: "100%" }}>Prepare for this {String.fromCharCode(8594)}</button>
      </div>
    </div>
  );
}

/* ═══ MODULE: components/ProfilePage.jsx ═══ */
function Dashboard() {
  const { t, lang, user, go, completed, roadmaps, setRoadmaps, comps, saved, updateProfile, setObOpen } = useQ();
  const mono = "'Space Grotesk', ui-monospace, monospace";
  const u = user || {};
  const completedCount = Object.values(completed).filter(Boolean).length;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: u.name || "", username: u.username || "", age: u.age || "", grade: u.grade || "" });

  const saveProfile = () => { updateProfile(form); setEditing(false); };

  if (!user) return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 16 }}>Dashboard</h1>
      <p style={{ fontSize: 14, color: "rgba(43,54,52,.5)", marginBottom: 32 }}>Sign in to see your dashboard.</p>
      <button onClick={() => setObOpen(true)} style={{ fontFamily: mono, fontSize: 13, color: "#2b3634", border: "1.5px solid rgba(43,54,52,.15)", borderRadius: 14, padding: "12px 24px", background: "transparent", cursor: "pointer" }}>Sign in</button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48 }}>
        <div>
          <h1 className="q-display" style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em" }}>{u.name || "Student"}</h1>
          {u.grade && <div style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.45)", marginTop: 4 }}>{u.grade}</div>}
        </div>
        <button onClick={() => editing ? saveProfile() : setEditing(true)}
          style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.45)", background: "none", border: "1.5px solid rgba(43,54,52,.12)", borderRadius: 14, padding: "8px 18px", cursor: "pointer" }}>
          {editing ? "Save" : "Edit profile"}
        </button>
      </div>
      {editing && (
        <div style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 14 }}>
          {[["NAME", "name"], ["USERNAME", "username"], ["AGE", "age"], ["GRADE / YEAR", "grade"]].map(([label, key]) => (
            <div key={key}>
              <label style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.15em", color: "rgba(43,54,52,.4)", display: "block", marginBottom: 6 }}>{label}</label>
              <input value={form[key] || ""} onChange={e => setForm(p => ({...p, [key]: e.target.value}))}
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(43,54,52,.12)", borderRadius: 12, background: "rgba(43,54,52,.02)", fontSize: 14, color: "#2b3634", outline: "none" }} />
            </div>
          ))}
          <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginTop: 16 }} />
        </div>
      )}
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)", marginBottom: 16 }}>PROGRESS</div>
      <div style={{ display: "flex", gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#2b3634" }}>{completedCount}</div>
          <div style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", marginTop: 4 }}>topics completed</div>
        </div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#2b3634" }}>0</div>
          <div style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", marginTop: 4 }}>hours studied</div>
        </div>
      </div>
      <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginBottom: 48 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)" }}>ROADMAPS</div>
      </div>
      {roadmaps && roadmaps.length > 0 ? roadmaps.slice(0, 5).map((rm, i) => (
        <div key={rm.id || i} style={{ padding: "14px 0", borderBottom: "1px solid rgba(43,54,52,.06)", fontSize: 14, fontWeight: 600, color: "#2b3634" }}>{rm.title || rm.name || "Roadmap"}</div>
      )) : (
        <div style={{ fontSize: 13, color: "rgba(43,54,52,.35)" }}>No roadmaps yet. Click "Prepare for this" on any competition, internship, or research program.</div>
      )}
      <button onClick={() => go("roadmaps")}
        style={{ width: "100%", padding: "14px 0", border: "1.5px solid rgba(43,54,52,.15)", borderRadius: 14, background: "transparent", cursor: "pointer", fontFamily: mono, fontSize: 13, fontWeight: 600, color: "#2b3634", letterSpacing: "0.05em", marginTop: 20 }}>
        Create new roadmap
      </button>
    </div>
  );
}

function ProfilePage() {
  const { t, lang, user, updateProfile, completed, roadmaps, comps, saved, go } = useQ();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const mono = "'Space Grotesk', ui-monospace, monospace";
  const completedCount = Object.values(completed).filter(Boolean).length;
  const u = user || {};

  const startEdit = () => { setForm({ name: u.name || "", username: u.username || "", age: u.age || "", grade: u.grade || "" }); setEditing(true); };
  const saveEdit = () => { updateProfile(form); setEditing(false); };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 48 }}>Profile</h1>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)" }}>BASIC</div>
        <button onClick={() => editing ? saveEdit() : startEdit()} style={{ fontFamily: mono, fontSize: 11, color: "rgba(43,54,52,.35)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}>{editing ? "SAVE" : "EDIT"}</button>
      </div>
      {editing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
          {[["NAME", "name"], ["USERNAME", "username"], ["AGE", "age"], ["GRADE / YEAR", "grade"]].map(([label, key]) => (
            <div key={key}>
              <label style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.15em", color: "rgba(43,54,52,.4)", display: "block", marginBottom: 6 }}>{label}</label>
              <input value={form[key] || ""} onChange={e => setForm(p => ({...p, [key]: e.target.value}))}
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(43,54,52,.12)", borderRadius: 12, background: "rgba(43,54,52,.02)", fontSize: 14, color: "#2b3634", outline: "none" }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#2b3634", marginBottom: 6 }}>{u.name || "Student"}</div>
          {u.username && <div style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.4)" }}>@{u.username}</div>}
          {u.grade && <div style={{ fontSize: 14, color: "rgba(43,54,52,.5)", marginTop: 4 }}>{u.grade}</div>}
        </div>
      )}

      <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginBottom: 48 }} />

      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)", marginBottom: 16 }}>PROGRESS</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#2b3634" }}>{completedCount} <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(43,54,52,.4)" }}>topics completed</span></div>
      <div style={{ height: 1, background: "rgba(43,54,52,.08)", margin: "48px 0" }} />

      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)", marginBottom: 16 }}>ROADMAPS</div>
      {roadmaps && roadmaps.length > 0 ? roadmaps.map((rm, i) => (
        <div key={rm.id || i} style={{ padding: "12px 0", borderBottom: i < roadmaps.length - 1 ? "1px solid rgba(43,54,52,.06)" : "none", fontSize: 14, fontWeight: 600, color: "#2b3634" }}>{rm.title || rm.name || "Roadmap"}</div>
      )) : <div style={{ fontSize: 13, color: "rgba(43,54,52,.35)" }}>No roadmaps yet.</div>}
      <div style={{ height: 1, background: "rgba(43,54,52,.08)", margin: "48px 0" }} />

      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.5)", marginBottom: 16 }}>SAVED</div>
      {comps.filter(c => saved && Array.isArray(saved) && saved.includes(c.id)).length > 0 ? comps.filter(c => saved.includes(c.id)).map((c, i) => (
        <div key={c.id} style={{ padding: "12px 0", borderBottom: "1px solid rgba(43,54,52,.06)", fontSize: 14, color: "#2b3634" }}>{c.name ? c.name.en : c.id}</div>
      )) : <div style={{ fontSize: 13, color: "rgba(43,54,52,.35)" }}>No saved opportunities yet.</div>}
    </div>
  );
}

/* ═══ MODULE: components/AdminPage.jsx ═══ */
function CmsRow({ item, curEn, curMn, edited, meta, onSave, onReset }) {
  const isArr = item.type === "array" || item.type === "matrix";
  const [en, setEn] = useState(curEn);
  const [mn, setMn] = useState(curMn);
  const [open, setOpen] = useState(false);
  useEffect(() => { setEn(curEn); setMn(curMn); }, [curEn, curMn]);
  const dirty = en !== curEn || mn !== curMn;
  const fieldCls = "w-full px-3 py-2 rounded-xl border-2 border-indigo-100 text-sm font-semibold text-slate-900 outline-none focus:border-violet-400 bg-white";
  return (
    <div className="rounded-2xl q-lp p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-extrabold text-slate-900">{item.desc}</span>
            {edited && <span className="text-xs font-bold px-2 py-0.5 rounded-full q-ink" style={{ background: "#3d4a46" }}>edited</span>}
          </div>
          <div className="text-xs text-slate-600 mt-0.5" style={{ fontFamily: "ui-monospace, monospace" }}>{item.cat} · {item.key}</div>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="shrink-0 px-3 py-1.5 rounded-full text-xs font-extrabold bg-indigo-600 q-ink">{open ? "Close" : "Edit"}</button>
      </div>
      {open && (
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          <div>
            <div className="text-xs font-bold text-slate-600 mb-1">English</div>
            {isArr ? <textarea value={en} onChange={(e) => setEn(e.target.value)} rows={4} className={fieldCls} /> : <input value={en} onChange={(e) => setEn(e.target.value)} className={fieldCls} />}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-600 mb-1">Монгол</div>
            {isArr ? <textarea value={mn} onChange={(e) => setMn(e.target.value)} rows={4} className={fieldCls} /> : <input value={mn} onChange={(e) => setMn(e.target.value)} className={fieldCls} />}
          </div>
          <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
            <button onClick={() => onSave(item, { en, mn })} disabled={!dirty}
              className={cx("px-4 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5", dirty ? "bg-gradient-to-r from-indigo-500 to-violet-600 q-ink" : "bg-violet-100 text-violet-400")}>
              <Sparkles size={13} /> Save &amp; publish
            </button>
            {edited && <button onClick={() => onReset(item)} className="px-4 py-2 rounded-xl text-xs font-extrabold bg-violet-100 text-violet-700 inline-flex items-center gap-1.5"><X size={13} /> Restore original</button>}
            {item.type === "array" && <span className="text-xs text-slate-600">one item per line</span>}
            {item.type === "matrix" && <span className="text-xs text-slate-600">one row per line · use | between parts</span>}
            {meta && meta.editedAt && <span className="text-xs text-slate-600 ml-auto">Last edited by {meta.editedBy || "Admin"}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentCMS() {
  const { contentOverrides, saveContent, resetContent, restoreContent, contentHistory, addToast } = useQ();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [showHist, setShowHist] = useState(false);
  const items = CMS_SCHEMA.filter((it) => (cat === "All" || it.cat === cat) && (!q || it.key.toLowerCase().includes(q.toLowerCase()) || it.desc.toLowerCase().includes(q.toLowerCase())));
  const editedCount = Object.keys(contentOverrides).length;
  const val = (key, lg, type) => {
    const ov = contentOverrides[key];
    let v = ov && ov[lg] !== undefined && ov[lg] !== null ? ov[lg] : getDeep(I18N[lg], key);
    if (type === "matrix") return Array.isArray(v) ? v.map((r) => (Array.isArray(r) ? r.join(" | ") : r)).join("\n") : "";
    if (type === "array") return Array.isArray(v) ? v.join("\n") : "";
    return v == null ? "" : v;
  };
  const doSave = (item, vals) => {
    const toArr = (s) => s.split("\n").map((x) => x.trim()).filter(Boolean);
    const toMat = (s) => toArr(s).map((line) => line.split("|").map((c) => c.trim()));
    if (item.type === "array") saveContent(item.key, { en: toArr(vals.en), mn: toArr(vals.mn) });
    else if (item.type === "matrix") saveContent(item.key, { en: toMat(vals.en), mn: toMat(vals.mn) });
    else saveContent(item.key, vals);
    addToast("✓ Published");
  };
  return (
    <div className="mt-6">
      <div className="rounded-2xl p-4 mb-4 q-lp flex flex-wrap items-center gap-3">
        <div className="text-sm font-bold text-slate-800">
          {editedCount > 0 ? `${editedCount} item${editedCount > 1 ? "s" : ""} customized` : "All content is at its default"}
        </div>
        <div className="text-xs text-slate-600">Edits publish instantly across the site. English + Монгол are stored side by side.</div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setShowHist((s) => !s)} className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-700 inline-flex items-center gap-1.5"><Clock size={13} /> History ({contentHistory.length})</button>
          {editedCount > 0 && <button onClick={() => { restoreContent({}); addToast("✓ Reset to defaults"); }} className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-violet-100 text-violet-700">Reset all</button>}
        </div>
      </div>
      {showHist && (
        <div className="rounded-2xl p-4 mb-4 q-lp">
          <div className="text-xs font-extrabold uppercase tracking-wide text-violet-600 mb-2">Version history</div>
          {contentHistory.length === 0 ? <div className="text-sm text-slate-600">No changes yet.</div> : (
            <div className="space-y-2">
              {contentHistory.slice(0, 8).map((h, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-slate-700">{Object.keys(h.overrides || {}).length} customized · {new Date(h.at).toLocaleTimeString()}</span>
                  <button onClick={() => { restoreContent(h); addToast("✓ Restored version"); }} className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-600 q-ink">Restore</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        {["All", ...CMS_CATS].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cx("px-3.5 py-1.5 rounded-full text-xs font-extrabold", cat === c ? "bg-indigo-600 q-ink" : "bg-indigo-100 text-indigo-700")}>{c}</button>
        ))}
      </div>
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-indigo-200 bg-white mb-4 max-w-md">
        <Search size={14} className="text-slate-500" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search content…" className="outline-none text-sm font-semibold w-full bg-white text-slate-900" />
      </div>
      <div className="space-y-3">
        {items.length === 0 ? <div className="text-sm text-slate-600">No content matches your search.</div> :
          items.map((it) => (
            <CmsRow key={it.key} item={it} curEn={val(it.key, "en", it.type)} curMn={val(it.key, "mn", it.type)}
              edited={!!contentOverrides[it.key]} meta={contentOverrides[it.key]} onSave={doSave} onReset={(item) => { resetContent(item.key); addToast("✓ Restored"); }} />
          ))}
      </div>
    </div>
  );
}

function AdminPage() {
  const { t, lang, comps, setComps, anns, setAnns, addToast } = useQ();
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const taRef = useRef(null);
  const [annTitle, setAnnTitle] = useState("");
  const [annBody, setAnnBody] = useState("");
  const [annOpen, setAnnOpen] = useState(false);
  const blank = { id: "", icon: "🏆", cat: "olympiad", level: 2, name: { en: "" }, desc: { en: "" }, link: "", reqs: [], elig: { ok: "check", note: { en: "" } }, win: { o: 9, c: 12, est: true, note: null }, prep: 6, timeline: null };
  const startEdit = (c) => setEditing(JSON.parse(JSON.stringify(c || { ...blank, id: "comp-" + Date.now() })));
  const saveEdit = () => {
    if (!editing.name.mn && !editing.name.en) return;
    if (!editing.name.en) editing.name.en = editing.name.mn;
    if (!editing.name.mn) editing.name.mn = editing.name.en;
    if (!editing.desc.en) editing.desc.en = editing.desc.mn;
    if (!editing.elig.note.en) editing.elig.note.en = editing.elig.note.mn;
    editing.reqs = editing.reqs.filter((r) => ALL_NODES[r]);
    setComps((cs) => cs.some((c) => c.id === editing.id) ? cs.map((c) => (c.id === editing.id ? editing : c)) : [...cs, editing]);
    setEditing(null); addToast("✓ " + t.saveBtn);
  };
  const list = comps.filter((c) => !c.hidden)
    .filter((c) => filter === "all" ? !c.archived : filter === "archived" ? c.archived : !c.archived && compStatus(c) === filter)
    .filter((c) => !q || c.name.mn.toLowerCase().includes(q.toLowerCase()) || c.name.en.toLowerCase().includes(q.toLowerCase()));
  const wrapSel = (pre, post) => {
    const ta = taRef.current; if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    setAnnBody(annBody.slice(0, s) + pre + annBody.slice(s, e) + post + annBody.slice(e));
  };
  const Inp = ({ v, on, ph, wide }) => (
    <input value={v} onChange={(e) => on(e.target.value)} placeholder={ph}
      className={cx("px-3.5 py-2.5 rounded-xl border-2 border-indigo-100 text-sm font-semibold outline-none focus:border-violet-400", wide && "sm:col-span-2")} />
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold q-ink flex items-center gap-2"><Settings size={24} className="text-violet-600" /> {t.adminTitle}</h1>
      <div className="mt-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-700">{t.adminNote}</div>
      <div className="flex gap-2 mt-6">
        {t.adminTabs.map((tb, i) => (
          <button key={i} onClick={() => setTab(i)} className={cx("px-5 py-2.5 rounded-full text-sm font-extrabold", tab === i ? "bg-indigo-600 q-ink" : "bg-indigo-50 text-indigo-700")}>{tb}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-indigo-200 bg-white">
              <Search size={14} className="text-slate-500" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.adminSearch} className="outline-none text-sm font-semibold w-40 bg-white text-slate-900" />
            </div>
            <span className="flex items-center gap-1 text-indigo-300"><Filter size={13} /></span>
            {["all", "open", "soon", "closed", "archived"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={cx("px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors", filter === f ? "bg-indigo-600 q-ink" : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200")}>
                {f === "all" ? t.filterAll : f === "archived" ? t.filterArchived : f === "open" ? t.stOpen : f === "soon" ? t.stSoon : t.stClosed}
              </button>
            ))}
            <button onClick={() => startEdit(null)} className="ml-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 q-ink text-sm font-extrabold shadow-md">{t.addComp}</button>
          </div>
          <div className="space-y-2">
            {list.map((c) => (
              <div key={c.id} className={cx("flex flex-wrap items-center gap-3 p-4 rounded-2xl border q-lp", c.archived ? "border-slate-200 opacity-60" : "border-indigo-100")}>
                <Ic id={c.id} size={20} />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-extrabold text-slate-800 truncate">{c.name[lang]} {c.featured && <Pin size={11} className="inline text-amber-500" />}</span>
                  <span className="block text-xs font-semibold text-slate-600">{c.cat} · Lv{c.level}</span>
                </span>
                <StatusBadge status={compStatus(c)} est={c.win && c.win.est} />
                <div className="flex items-center gap-1">
                  <button onClick={() => setComps((cs) => cs.map((x) => x.id === c.id ? { ...x, featured: !x.featured } : x))} title={t.featureBtn}
                    className={cx("w-8 h-8 rounded-full flex items-center justify-center", c.featured ? "bg-amber-50 text-amber-500" : "text-slate-300 hover:text-amber-400")}><Pin size={14} /></button>
                  <button onClick={() => startEdit(c)} className="w-8 h-8 rounded-full text-slate-600 hover:text-indigo-600 flex items-center justify-center" title={t.edit}><Pencil size={14} /></button>
                  <button onClick={() => setComps((cs) => cs.map((x) => x.id === c.id ? { ...x, archived: !x.archived } : x))} title={c.archived ? t.unarchive : t.archiveBtn}
                    className="w-8 h-8 rounded-full text-slate-600 hover:text-indigo-600 flex items-center justify-center"><Archive size={14} /></button>
                  <button onClick={() => setComps((cs) => cs.filter((x) => x.id !== c.id))} className="w-8 h-8 rounded-full text-slate-300 hover:text-red-500 flex items-center justify-center" title={t.del}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
          {editing && (
            <div className="mt-5 p-5 rounded-3xl border-2 border-violet-200 q-lp q-pop">
              <div className="grid sm:grid-cols-2 gap-3">
                <Inp v={editing.name.mn} on={(v) => setEditing({ ...editing, name: { ...editing.name, mn: v } })} ph={t.f.nameMn} />
                <Inp v={editing.name.en} on={(v) => setEditing({ ...editing, name: { ...editing.name, en: v } })} ph={t.f.nameEn} />
                <textarea value={editing.desc.mn} onChange={(e) => setEditing({ ...editing, desc: { ...editing.desc, mn: e.target.value } })} placeholder={t.f.descMn} rows={2}
                  className="px-3.5 py-2.5 rounded-xl border-2 border-indigo-100 text-sm font-semibold outline-none focus:border-violet-400 resize-none" />
                <textarea value={editing.desc.en} onChange={(e) => setEditing({ ...editing, desc: { ...editing.desc, en: e.target.value } })} placeholder={t.f.descEn} rows={2}
                  className="px-3.5 py-2.5 rounded-xl border-2 border-indigo-100 text-sm font-semibold outline-none focus:border-violet-400 resize-none" />
                <Inp v={editing.link || ""} on={(v) => setEditing({ ...editing, link: v })} ph={t.f.link} />
                <div className="flex gap-2">
                  <select value={editing.cat} onChange={(e) => setEditing({ ...editing, cat: e.target.value })}
                    className="flex-1 px-3 py-2.5 rounded-xl border-2 border-indigo-100 text-sm font-bold outline-none">
                    {["olympiad", "research", "hackathon", "robotics"].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={editing.level} onChange={(e) => setEditing({ ...editing, level: +e.target.value })}
                    className="px-3 py-2.5 rounded-xl border-2 border-indigo-100 text-sm font-bold outline-none">
                    {[1, 2, 3].map((l) => <option key={l} value={l}>Lv{l}</option>)}
                  </select>
                </div>
                <Inp wide v={editing.reqs.join(", ")} on={(v) => setEditing({ ...editing, reqs: v.split(",").map((x) => x.trim()).filter(Boolean) })} ph={t.f.reqs} />
                <div className="flex items-center gap-2">
                  <input type="number" min="1" max="12" value={editing.win ? editing.win.o : 9} onChange={(e) => setEditing({ ...editing, win: { ...(editing.win || {}), o: +e.target.value } })}
                    className="w-20 px-3 py-2.5 rounded-xl border-2 border-indigo-100 text-sm font-bold outline-none" />
                  <span className="text-slate-600 text-xs font-bold">{t.f.open}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" max="12" value={editing.win ? editing.win.c : 12} onChange={(e) => setEditing({ ...editing, win: { ...(editing.win || {}), c: +e.target.value } })}
                    className="w-20 px-3 py-2.5 rounded-xl border-2 border-indigo-100 text-sm font-bold outline-none" />
                  <span className="text-slate-600 text-xs font-bold">{t.f.close}</span>
                </div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <input type="checkbox" checked={!!(editing.win && editing.win.est)} onChange={(e) => setEditing({ ...editing, win: { ...(editing.win || {}), est: e.target.checked } })} className="w-4 h-4" />
                  {t.f.est}
                </label>
                <Inp v={editing.elig.note.mn} on={(v) => setEditing({ ...editing, elig: { ...editing.elig, note: { ...editing.elig.note, mn: v } } })} ph={t.f.elig} />
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={saveEdit} className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 q-ink text-sm font-extrabold shadow-md">{t.saveBtn}</button>
                <button onClick={() => setEditing(null)} className="px-6 py-2.5 rounded-2xl border-2 border-indigo-100 text-slate-700 text-sm font-extrabold">{t.cancel}</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 1 && (
        <div className="mt-6">
          <button onClick={() => setAnnOpen(!annOpen)} className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 q-ink text-sm font-extrabold shadow-md">{t.annNew}</button>
          {annOpen && (
            <div className="mt-4 p-5 rounded-3xl border-2 border-violet-200 q-lp q-pop">
              <input value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} placeholder={t.annTitlePh}
                className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-100 text-sm font-extrabold outline-none focus:border-violet-400" />
              <div className="flex items-center gap-1.5 mt-3">
                <button onClick={() => wrapSel("**", "**")} className="w-9 h-9 rounded-xl border-2 border-indigo-100 flex items-center justify-center text-slate-600 hover:border-violet-300"><Bold size={14} /></button>
                <button onClick={() => wrapSel("\n- ", "")} className="w-9 h-9 rounded-xl border-2 border-indigo-100 flex items-center justify-center text-slate-600 hover:border-violet-300"><List size={14} /></button>
                <button onClick={() => wrapSel("[", "](https://)")} className="w-9 h-9 rounded-xl border-2 border-indigo-100 flex items-center justify-center text-slate-600 hover:border-violet-300"><Link2 size={14} /></button>
                <span className="text-xs font-semibold text-slate-600 ml-2">{t.annToolbar}</span>
              </div>
              <textarea ref={taRef} value={annBody} onChange={(e) => setAnnBody(e.target.value)} rows={5}
                className="mt-2 w-full px-4 py-3 rounded-2xl border-2 border-indigo-100 text-sm font-medium outline-none focus:border-violet-400 resize-none" />
              {annBody && <div className="mt-3 p-4 rounded-2xl bg-indigo-50"><MdLite text={annBody} /></div>}
              <button onClick={() => { if (annTitle.trim()) { setAnns((a) => [{ id: "a" + Date.now(), pinned: false, date: NOW.getFullYear() + "." + String(NOW.getMonth() + 1).padStart(2, "0"), title: annTitle.trim(), body: annBody }, ...a]); setAnnTitle(""); setAnnBody(""); setAnnOpen(false); addToast("📣 ✓"); } }}
                className="mt-3 px-6 py-2.5 rounded-2xl bg-indigo-600 q-ink text-sm font-extrabold">{t.annPublish}</button>
            </div>
          )}
          <div className="mt-5 space-y-3">
            {anns.length === 0 && <div className="text-sm font-semibold text-slate-600">{t.annNone}</div>}
            {anns.map((a) => (
              <div key={a.id} className="p-5 rounded-3xl border border-indigo-100 q-lp">
                <div className="flex items-center gap-2 mb-2">
                  <button onClick={() => setAnns((xs) => xs.map((x) => x.id === a.id ? { ...x, pinned: !x.pinned } : x))}
                    className={cx("w-8 h-8 rounded-full flex items-center justify-center", a.pinned ? "bg-amber-50 text-amber-500" : "text-slate-300 hover:text-amber-400")}><Pin size={14} /></button>
                  <span className="font-extrabold text-slate-900 flex-1">{a.title}</span>
                  <span className="text-xs font-bold text-slate-600">{a.date}</span>
                  <button onClick={() => setAnns((xs) => xs.filter((x) => x.id !== a.id))} className="text-slate-300 hover:text-red-400"><Trash2 size={15} /></button>
                </div>
                <MdLite text={a.body} />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 2 && <ContentCMS />}
    </div>
  );
}

/* ═══ MODULE: components/Onboarding.jsx ═══ */
function Onboarding() {
  const { t, lang, user, updateProfile, finishOnboarding, obOpen, setObOpen } = useQ();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState("");
  const mono = "'Space Grotesk', ui-monospace, monospace";

  if (!obOpen) return null;

  const next = (s) => { setDir(1); setStep(s); };
  const back = (s) => { setDir(-1); setStep(s); };

  const handleGoogle = () => {
    window.open("/api/auth/google", "_self");
  };
  const handleApple = () => {
    window.open("/api/auth/apple", "_self");
  };

  const allDone = firstName.trim() && lastName.trim() && age.trim() && status && detail.trim();
  const finish = () => {
    const label = status === "k12" ? "Grade " + detail : status === "college" ? "Year " + detail : detail;
    updateProfile({ name: firstName.trim() + " " + lastName.trim(), firstName: firstName.trim(), lastName: lastName.trim(), age, status, detail, grade: label, email, interests: [], goals: [], skills: [], research: {} });
    finishOnboarding();
  };

  const slideStyle = (active) => ({
    position: active ? "relative" : "absolute",
    top: 0, left: 0, right: 0,
    opacity: active ? 1 : 0,
    transform: active ? "translateX(0)" : ("translateX(" + (dir > 0 ? "40px" : "-40px") + ")"),
    transition: "opacity .25s ease, transform .25s ease",
    pointerEvents: active ? "auto" : "none",
  });

  const inputStyle = { width: "100%", padding: "14px 18px", border: "1.5px solid rgba(43,54,52,.12)", borderRadius: 14, background: "rgba(43,54,52,.02)", fontSize: 15, color: "#2b3634", outline: "none", fontFamily: mono };
  const btnStyle = (active) => ({ width: "100%", padding: "15px 0", border: "2px solid " + (active ? "rgba(43,54,52,.25)" : "rgba(43,54,52,.08)"), borderRadius: 14, background: "transparent", cursor: active ? "pointer" : "default", fontFamily: mono, fontSize: 14, fontWeight: 600, color: active ? "#2b3634" : "rgba(43,54,52,.2)", letterSpacing: "0.04em", marginTop: 8 });
  const backBtn = (s) => <button onClick={() => back(s)} style={{ width: "100%", padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.3)", marginTop: 8 }}>Back</button>;
  const labelStyle = { fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", color: "rgba(43,54,52,.5)", display: "block", marginBottom: 10 };
  const choiceBtn = (val, label) => (
    <button key={val} onClick={() => { setDetail(""); setStatus(val); next(4); }}
      style={{ width: "100%", padding: "16px 20px", border: "1.5px solid " + (status === val ? "rgba(43,54,52,.3)" : "rgba(43,54,52,.1)"), borderRadius: 14, background: status === val ? "rgba(43,54,52,.04)" : "transparent", cursor: "pointer", textAlign: "left", fontSize: 15, fontWeight: 500, color: "#2b3634", fontFamily: mono }}>{label}</button>
  );

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0" style={{ background: "rgba(43,54,52,.15)", backdropFilter: "blur(4px)" }} onClick={() => setObOpen(false)} />
      <div className="overflow-y-auto" style={{ position: "fixed", top: 16, left: 16, right: 16, bottom: 16, margin: "auto", maxWidth: 420, background: "#f0f2ee", borderRadius: 14, padding: "clamp(28px,6vw,48px)", overflow: "hidden" }}>
        <div style={{ position: "relative" }}>

          {/* Step 0: Auth methods */}
          <div style={slideStyle(step === 0)}>
            <h1 className="q-display" style={{ fontSize: "clamp(24px,6vw,36px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 40, lineHeight: 1.1 }}>Get started</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={handleGoogle}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", padding: "15px 0", border: "1.5px solid rgba(43,54,52,.12)", borderRadius: 14, background: "transparent", cursor: "pointer", fontSize: 14, fontFamily: mono, fontWeight: 500, color: "#2b3634" }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
              <button onClick={handleApple}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", padding: "15px 0", border: "1.5px solid rgba(43,54,52,.12)", borderRadius: 14, background: "transparent", cursor: "pointer", fontSize: 14, fontFamily: mono, fontWeight: 500, color: "#2b3634" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2b3634"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.3-3.74 4.25z"/></svg>
                Continue with Apple
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "16px 0" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(43,54,52,.08)" }} />
                <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(43,54,52,.25)", letterSpacing: "0.15em" }}>OR</span>
                <div style={{ flex: 1, height: 1, background: "rgba(43,54,52,.08)" }} />
              </div>
              <button onClick={() => next(1)}
                style={{ width: "100%", padding: "15px 0", border: "1.5px solid rgba(43,54,52,.12)", borderRadius: 14, background: "transparent", cursor: "pointer", fontSize: 14, fontFamily: mono, fontWeight: 500, color: "#2b3634" }}>
                Continue with email
              </button>
            </div>
          </div>

          {/* Step 1: Email + Password */}
          <div style={slideStyle(step === 1)}>
            <h1 className="q-display" style={{ fontSize: "clamp(24px,6vw,36px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 36, lineHeight: 1.1 }}>Your email</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="..." type="email" autoFocus style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>PASSWORD</label>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="..." type="password" style={inputStyle} />
              </div>
            </div>
            <button onClick={() => { if (email.trim() && password.trim()) next(2); }} disabled={!email.trim() || !password.trim()} style={btnStyle(email.trim() && password.trim())}>Continue</button>
            {backBtn(0)}
          </div>

          {/* Step 2: First + Last name */}
          <div style={slideStyle(step === 2)}>
            <h1 className="q-display" style={{ fontSize: "clamp(24px,6vw,36px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 36, lineHeight: 1.1 }}>What is your name?</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>FIRST NAME</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="..." autoFocus style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>LAST NAME</label>
                <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="..." style={inputStyle} />
              </div>
            </div>
            <button onClick={() => { if (firstName.trim() && lastName.trim()) next(3); }} disabled={!firstName.trim() || !lastName.trim()} style={btnStyle(firstName.trim() && lastName.trim())}>Continue</button>
            {backBtn(1)}
          </div>

          {/* Step 3: Status - K12 / College / Working */}
          <div style={slideStyle(step === 3)}>
            <h1 className="q-display" style={{ fontSize: "clamp(24px,6vw,36px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 36, lineHeight: 1.1 }}>Which describes you?</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {choiceBtn("k12", "K-12 Student")}
              {choiceBtn("college", "College / University")}
              {choiceBtn("working", "Working")}
            </div>
            <div style={{ marginTop: 12 }}>{backBtn(2)}</div>
          </div>

          {/* Step 4: Detail based on status */}
          <div style={slideStyle(step === 4)}>
            <h1 className="q-display" style={{ fontSize: "clamp(24px,6vw,36px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 36, lineHeight: 1.1 }}>
              {status === "k12" ? "What grade are you in?" : status === "college" ? "What year?" : "What do you do?"}
            </h1>
            <div>
              <label style={labelStyle}>{status === "k12" ? "GRADE" : status === "college" ? "YEAR" : "FIELD / ROLE"}</label>
              <input value={detail} onChange={e => setDetail(e.target.value)} placeholder="..." autoFocus style={inputStyle} />
            </div>
            <button onClick={() => { if (detail.trim()) next(5); }} disabled={!detail.trim()} style={btnStyle(detail.trim())}>Continue</button>
            {backBtn(3)}
          </div>

          {/* Step 5: Age */}
          <div style={slideStyle(step === 5)}>
            <h1 className="q-display" style={{ fontSize: "clamp(24px,6vw,36px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 36, lineHeight: 1.1 }}>How old are you?</h1>
            <div>
              <label style={labelStyle}>AGE</label>
              <input value={age} onChange={e => setAge(e.target.value)} placeholder="..." autoFocus style={inputStyle} />
            </div>
            <button onClick={finish} disabled={!age.trim()} style={btnStyle(age.trim())}>Enter Questa</button>
            {backBtn(4)}
          </div>

        </div>
      </div>
    </div>
  );
}
function OptRow({ opts, val, onSel }) {
  return (
    <div className="grid gap-2.5">
      {opts.map((o, i) => (
        <button key={i} onClick={() => onSel(i)} className={cx("p-3.5 rounded-2xl border-2 font-extrabold text-sm text-left transition-all", val === i ? "border-violet-500 bg-violet-50 text-violet-700" : "border-indigo-100 text-slate-600 hover:border-indigo-300")}>
          {val === i && "● "}{o}
        </button>
      ))}
    </div>
  );
}

/* ═══ MODULE: components/ChatWidget.jsx ═══  (Questa AI, bottom-LEFT robot) */
function ChatWidget() {
  const { t, lang, chatOpen, setChatOpen, chatMsgs, chatLoading, sendChat, activeChatLabel } = useQ();
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [chatMsgs, chatLoading]);
  if (!chatOpen) return null;
  const mono = "'Space Grotesk', ui-monospace, monospace";
  const send = () => { if (!input.trim()) return; sendChat(input.trim()); setInput(""); };
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0" style={{ background: "rgba(43,54,52,.2)", backdropFilter: "blur(3px)" }} onClick={() => setChatOpen(false)} />
      <div style={{ position: "fixed", top: 16, left: 16, right: 16, bottom: 16, margin: "auto", maxWidth: 540, background: "#f0f2ee", borderRadius: 14, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(43,54,52,.08)" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "rgba(43,54,52,.4)" }}>AI ASSISTANT</div>
            {activeChatLabel && <div style={{ fontSize: 12, color: "rgba(43,54,52,.5)", marginTop: 2 }}>{activeChatLabel}</div>}
          </div>
          <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(43,54,52,.4)", fontSize: 18 }}>{String.fromCharCode(10005)}</button>
        </div>
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {chatMsgs.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", padding: "12px 16px", borderRadius: 14, background: m.role === "user" ? "rgba(43,54,52,.08)" : "rgba(43,54,52,.03)", border: m.role === "user" ? "none" : "1px solid rgba(43,54,52,.06)", fontSize: 14, color: "#2b3634", lineHeight: 1.65 }}>
              {m.role === "assistant" ? (() => { const lines = (m.text || "").split("\n"); return lines.map((l, li) => <p key={li} style={{ margin: li > 0 ? "8px 0 0" : 0 }}>{l}</p>); })() : m.text}
            </div>
          ))}
          {chatLoading && <div style={{ fontSize: 13, color: "rgba(43,54,52,.4)", fontStyle: "italic" }}>Thinking...</div>}
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(43,54,52,.08)", display: "flex", gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask anything..."
            style={{ flex: 1, padding: "12px 16px", border: "1px solid rgba(43,54,52,.1)", borderRadius: 12, background: "rgba(43,54,52,.02)", fontSize: 14, color: "#2b3634", outline: "none" }} />
          <button onClick={send}
            style={{ padding: "12px 20px", borderRadius: 14, background: "rgba(43,54,52,.08)", border: "none", cursor: "pointer", fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.6)", letterSpacing: "0.05em" }}>SEND</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ MODULE: components/Toasts.jsx ═══ */
function Toasts({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <div key={t.id} className={cx("px-5 py-3 rounded-2xl shadow-xl font-extrabold text-sm q-pop flex items-center gap-2",
          t.type === "gold" ? "bg-gradient-to-r from-amber-400 to-amber-500 q-ink" : t.type === "unlock" ? "bg-gradient-to-r from-indigo-600 to-violet-600 q-ink" : "q-lp text-slate-800 border border-indigo-100")}>
          {t.type === "gold" && <Medal size={16} />}{t.type === "unlock" && <Trophy size={16} />}{t.msg}
        </div>
      ))}
    </div>
  );
}

/* ═══ MODULE: pages/Roadmaps ═══ */
function RoadmapsPage() {
  const { t, lang, roadmaps, deleteRoadmap, go, user, setObOpen } = useQ();
  const mono = "'Space Grotesk', ui-monospace, monospace";
  if (!user) return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 16 }}>Roadmaps</h1>
      <p style={{ fontSize: 14, color: "rgba(43,54,52,.5)", marginBottom: 32 }}>Sign in to create and save roadmaps.</p>
      <button onClick={() => setObOpen(true)} style={{ fontFamily: mono, fontSize: 13, color: "#2b3634", border: "1.5px solid rgba(43,54,52,.15)", borderRadius: 14, padding: "12px 24px", background: "transparent", cursor: "pointer" }}>Sign in</button>
    </div>
  );
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 48 }}>Roadmaps</h1>
      {roadmaps.length === 0 ? (
        <div style={{ fontSize: 14, color: "rgba(43,54,52,.4)" }}>No roadmaps yet. Click "Prepare for this" on any competition, internship, or research program.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {roadmaps.map((rm, i) => (
            <div key={rm.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(20px,3vh,28px) 0", borderBottom: i < roadmaps.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#2b3634" }}>{rm.title || rm.name || "Roadmap"}</div>
                {rm.created && <div style={{ fontFamily: mono, fontSize: 11, color: "rgba(43,54,52,.35)", marginTop: 4 }}>{new Date(rm.created).toLocaleDateString()}</div>}
              </div>
              <button onClick={() => deleteRoadmap(rm.id)} style={{ fontFamily: mono, fontSize: 11, color: "rgba(43,54,52,.3)", background: "none", border: "none", cursor: "pointer" }}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RoadmapDetail() {
  const { t, lang, roadmaps, activeRoadmap, go, user, comps } = useQ();
  const rm = roadmaps.find((r) => r.id === activeRoadmap) || roadmaps[0];
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const mono = "'Space Grotesk', ui-monospace, monospace";

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      const u = user || {};
      const target = rm.targetId ? comps.find(c => c.id === rm.targetId) : null;
      const prompt = `You are a STEM education advisor. Create a detailed preparation roadmap for a student.

Student profile: Name: ${u.name || "Student"}, Age: ${u.age || "unknown"}, Grade: ${u.grade || "unknown"}

Target: ${rm.title || "General STEM preparation"}
${target ? "Competition/Program: " + (target.name?.en || target.title) : ""}
${target && target.desc ? "Description: " + (target.desc?.en || target.desc) : ""}
${target && target.timeline ? "Timeline: " + (target.timeline?.en || target.timeline) : ""}
${target && target.prep ? "Preparation time: ~" + target.prep + " months" : ""}

Create a structured roadmap with:
1. Phase breakdown (Foundation, Core, Advanced, Competition-ready)
2. Specific topics to study in order
3. Recommended resources (use MIT OCW, Khan Academy, OpenStax, etc.)
4. Weekly time commitment suggestions
5. Milestones and checkpoints

Keep it concise, practical, and actionable. Use clean formatting with headers and numbered lists.`;

      const reply = await callAI("You are a precise STEM education advisor. Give structured, actionable roadmaps.", [{ role: "user", content: prompt }]);
      setContent(reply);
    } catch { setContent("Could not generate roadmap. Please try again."); }
    setLoading(false);
  };

  useEffect(() => { if (rm && !content && !loading) generateRoadmap(); }, [rm]);

  if (!rm) return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: 32, fontWeight: 800, color: "#2b3634" }}>Roadmap</h1>
      <p style={{ fontSize: 14, color: "rgba(43,54,52,.4)", marginTop: 16 }}>Roadmap not found.</p>
      <button onClick={() => go("roadmaps")} style={{ marginTop: 24, fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.5)", background: "none", border: "none", cursor: "pointer" }}>View all roadmaps</button>
    </div>
  );
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <button onClick={() => go("roadmaps")} style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", background: "none", border: "none", cursor: "pointer", marginBottom: 40, padding: 0, letterSpacing: "0.1em" }}>{String.fromCharCode(8592)} ROADMAPS</button>
      <h1 className="q-display" style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 8 }}>{rm.title || "Roadmap"}</h1>
      {rm.created && <div style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", marginBottom: 32 }}>{new Date(rm.created).toLocaleDateString()}</div>}

      {loading ? (
        <div style={{ border: "1px solid rgba(43,54,52,.08)", borderRadius: 14, padding: "clamp(24px,4vw,40px)", background: "rgba(43,54,52,.02)" }}>
          <div style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.4)", animation: "qsReveal 1s ease-in-out infinite alternate" }}>Generating your personalized roadmap...</div>
        </div>
      ) : content ? (
        <div style={{ border: "1px solid rgba(43,54,52,.08)", borderRadius: 14, padding: "clamp(24px,4vw,40px)", background: "rgba(43,54,52,.02)" }}>
          <div style={{ fontSize: 14, color: "rgba(43,54,52,.7)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{content}</div>
        </div>
      ) : null}

      <button onClick={generateRoadmap} disabled={loading}
        style={{ width: "100%", padding: "14px 0", border: "1.5px solid rgba(43,54,52,.15)", borderRadius: 14, background: "transparent", cursor: loading ? "default" : "pointer", fontFamily: mono, fontSize: 13, fontWeight: 500, color: loading ? "rgba(43,54,52,.3)" : "#2b3634", letterSpacing: "0.05em", marginTop: 24 }}>
        {loading ? "Generating..." : "Regenerate roadmap"}
      </button>
    </div>
  );
}

/* ═══ MODULE: pages/Internships ═══ */
const INTERN_PROGRAMS = [
  { name: "Research Science Institute (RSI)", org: "CEE + MIT", url: "https://www.cee.org/programs/research-science-institute", en: "A free 6-week summer research program held at MIT for top rising seniors." },
  { name: "MIT PRIMES", org: "MIT Mathematics", url: "https://math.mit.edu/research/highschool/primes/", en: "A year-long research program in mathematics, computer science and computational biology." },
  { name: "Simons Summer Research Program", org: "Stony Brook University", url: "https://www.stonybrook.edu/simons/", en: "A summer of hands-on university research working alongside a faculty mentor." },
  { name: "Pioneer Academics", org: "Pioneer", url: "https://pioneeracademics.com/", en: "An accredited online research program open to students worldwide." },
  { name: "NASA OSTEM Internships", org: "NASA", url: "https://www.nasa.gov/learning-resources/internship-programs/", en: "Internships placing students on real NASA projects and missions." },
  { name: "Google Summer of Code", org: "Google", url: "https://summerofcode.withgoogle.com/", en: "A summer program contributing code to open-source projects (18+)." },
];
function InternshipsPage() {
  const { t, lang, go, roadmaps, setRoadmaps } = useQ();
  const [selected, setSelected] = useState(null);
  const mono = "'Space Grotesk', ui-monospace, monospace";

  if (selected) {
    const pr = selected;
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={() => setSelected(null)} style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", background: "none", border: "none", cursor: "pointer", marginBottom: 40, padding: 0, letterSpacing: "0.1em" }}>{String.fromCharCode(8592)} BACK</button>
        <h1 className="q-display" style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 8 }}>{pr.name}</h1>
        <div style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.45)", marginBottom: 24 }}>{pr.org}</div>
        <p style={{ fontSize: 15, color: "rgba(43,54,52,.6)", lineHeight: 1.7, marginBottom: 40 }}>{pr[lang] || pr.en}</p>
        <div style={{ height: 1, background: "rgba(43,54,52,.08)", marginBottom: 32 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href={pr.url} target="_blank" rel="noreferrer" style={{ display: "block", padding: "14px 0", border: "1px solid rgba(43,54,52,.12)", borderRadius: 14, textAlign: "center", fontFamily: mono, fontSize: 13, color: "#2b3634", textDecoration: "none", letterSpacing: "0.05em" }}>Register here {String.fromCharCode(8594)}</a>
          <button onClick={() => { const rm = { id: "rm-" + Date.now(), title: "Preparation: " + pr.name, created: new Date().toISOString(), type: "internship" }; setRoadmaps(prev => [...(prev||[]), rm]); setSelected(null); go("roadmap"); }}
            style={{ padding: "14px 0", border: "1px solid rgba(43,54,52,.12)", borderRadius: 14, background: "transparent", cursor: "pointer", fontFamily: mono, fontSize: 13, color: "#2b3634", letterSpacing: "0.05em", width: "100%" }}>Prepare for this {String.fromCharCode(8594)}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="q-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#2b3634", letterSpacing: "-0.04em", marginBottom: 48 }}>Internships</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {INTERN_PROGRAMS.map((pr, i) => (
          <button key={pr.name} onClick={() => setSelected(pr)} className="text-left"
            style={{ padding: "clamp(24px,3.5vh,36px) 0", borderBottom: i < INTERN_PROGRAMS.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", background: "transparent", border: "none", borderBottom: i < INTERN_PROGRAMS.length - 1 ? "1px solid rgba(43,54,52,.07)" : "none", cursor: "pointer", transition: "opacity .15s", width: "100%" }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.6"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,28px)" }}>
              <span style={{ fontFamily: mono, fontSize: 13, color: "rgba(43,54,52,.25)", flexShrink: 0, width: 32 }}>{String(i + 1).padStart(2, "0")}</span>
              <div style={{ flex: 1 }}>
                <div className="q-display" style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: "#2b3634", letterSpacing: "-0.02em" }}>{pr.name}</div>
                <div style={{ fontFamily: mono, fontSize: 12, color: "rgba(43,54,52,.4)", marginTop: 4 }}>{pr.org}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ APP ROOT ═══════════════ */
export default function App() {
  const lang = "en";
  const [page, setPage] = useState("home");
  const [subjectId, setSubjectId] = useState(DB.subjects[0].id);
  const [branchId, setBranchId] = useState(DB.subjects[0].branches[0].id);
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState({});
  const [lastDone, setLastDone] = useState(null);
  const [obOpen, setObOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [branchChats, setBranchChats] = useState({});
  const [activeChat, setActiveChat] = useState("main");
  const [activeChatLabel, setActiveChatLabel] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const branchChatsRef = useRef({});
  branchChatsRef.current = branchChats;
  const chatMsgs = branchChats[activeChat] || [];
  const [finderOpen, setFinderOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerNode, setDrawerNode] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [comps, setComps] = useState(DB.competitions);
  const [anns, setAnns] = useState(DB.announcements);
  const [saved, setSaved] = useState([]);
  const [savedProfs, setSavedProfs] = useState([]);
  const [notes, setNotes] = useState({});
  const [nodeChecks, setNodeChecks] = useState({});
  const [feedback, setFeedback] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [pathId, setPathId] = useState(null);
  const [contentOverrides, setContentOverrides] = useState({});
  const [contentHistory, setContentHistory] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const saveRoadmap = (rm) => setRoadmaps((r) => [rm, ...r]);
  const deleteRoadmap = (id) => setRoadmaps((r) => r.filter((x) => x.id !== id));
  const openRoadmap = (id) => { setActiveRoadmap(id); setPage("roadmap"); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };
  const t = useMemo(() => {
    const base = I18N[lang];
    const keys = Object.keys(contentOverrides);
    if (!keys.length) return base;
    const clone = JSON.parse(JSON.stringify(base));
    keys.forEach((k) => { const ov = contentOverrides[k]; if (ov && ov[lang] !== undefined && ov[lang] !== null) setDeep(clone, k, ov[lang]); });
    return clone;
  }, [lang, contentOverrides]);
  const saveContent = (key, valsByLang) => {
    setContentHistory((h) => [{ overrides: contentOverrides, at: Date.now() }, ...h].slice(0, 30));
    setContentOverrides((o) => ({ ...o, [key]: { ...(o[key] || {}), ...valsByLang, editedAt: Date.now(), editedBy: "Admin" } }));
  };
  const resetContent = (key) => {
    setContentHistory((h) => [{ overrides: contentOverrides, at: Date.now() }, ...h].slice(0, 30));
    setContentOverrides((o) => { const n = { ...o }; delete n[key]; return n; });
  };
  const restoreContent = (snap) => { setContentHistory((h) => [{ overrides: contentOverrides, at: Date.now() }, ...h].slice(0, 30)); setContentOverrides(snap && snap.overrides ? snap.overrides : {}); };

  const addToast = (msg, type) => {
    const id = Date.now() + Math.random();
    setToasts((x) => [...x, { id, msg, type }]);
    setTimeout(() => setToasts((x) => x.filter((z) => z.id !== id)), 3200);
  };
  const go = (dest, id) => {
    if (dest === "onboarding") { user ? setPage("dashboard") : setObOpen(true); return; }
    if (dest === "subject" && id) setSubjectId(id);
    if (dest === "tree" && id) { const fb = findBranch(id); if (fb) setSubjectId(fb.subject.id); setBranchId(id); }
    setDrawerNode(null);
    setPage(dest);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const startOnboarding = () => (user ? setPage("dashboard") : setObOpen(true));

  const completeNode = (id) => {
    if (completed[id]) { setCompleted((c) => ({ ...c, [id]: false })); return; }
    setCompleted((c) => ({ ...c, [id]: true }));
    setLastDone(id);
  };

  const sendChat = async (msg, branchKey) => {
    const key = branchKey || activeChat;
    const cur = branchChatsRef.current[key] || [];
    const seeded = cur.length ? cur : [{ role: "assistant", content: t.chatGreet(user ? user.name : "") }];
    const next = [...seeded, { role: "user", content: msg }];
    setBranchChats((bc) => ({ ...bc, [key]: next })); setChatLoading(true);
    try {
      const reply = await callAI(buildSystemPrompt({ lang, user, xp, completed, comps, saved, roadmaps, activeRoadmap }), next.slice(-12));
      setBranchChats((bc) => ({ ...bc, [key]: [...next, { role: "assistant", content: reply }] }));
    } catch { setBranchChats((bc) => ({ ...bc, [key]: [...next, { role: "assistant", content: t.chatErr }] })); }
    setChatLoading(false);
  };
  const askAI = (q, branchKey = "main", label = null) => { setActiveChat(branchKey); setActiveChatLabel(label); setChatOpen(true); setTimeout(() => sendChat(q, branchKey), 60); };

  const updateProfile = (d) => { setUser((u) => ({ ...u, ...d })); addToast(t.profileSaved); };
  const giveFeedback = (k, d) => { setFeedback((f) => { if (f[k]) return f; addToast(t.fbThanks); return { ...f, [k]: d }; }); };
  const toggleSaved = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleProf = (prof) => setSavedProfs((s) => (s.some((p) => p.name === prof.name) ? s.filter((p) => p.name !== prof.name) : [...s, prof]));
  const setNote = (id, v) => setNotes((n) => ({ ...n, [id]: v }));
  const addPortfolio = (entry) => setPortfolio((p) => [...p, entry]);
  const delPortfolio = (i) => setPortfolio((p) => p.filter((_, j) => j !== i));

  const finishOnboarding = () => {
    setObOpen(false);
    setPage("home");
  };

  const ctx = {
    t, lang, page, go, startOnboarding,
    subjectId, branchId, user, setUser, xp, completed, lastDone,
    obOpen, setObOpen, chatOpen, setChatOpen, chatMsgs, chatLoading, sendChat, askAI, activeChat, setActiveChat, activeChatLabel, setActiveChatLabel,
    finderOpen, setFinderOpen, searchOpen, setSearchOpen, drawerNode, setDrawerNode,
    comps, setComps, anns, setAnns, saved, toggleSaved, savedProfs, toggleProf,
    notes, setNote, nodeChecks, setNodeChecks, feedback, giveFeedback, portfolio, addPortfolio, delPortfolio,
    completeNode, updateProfile, finishOnboarding, addToast,
    pathId, setPathId,
    contentOverrides, saveContent, resetContent, restoreContent, contentHistory,
    roadmaps, setRoadmaps, activeRoadmap, setActiveRoadmap, saveRoadmap, deleteRoadmap, openRoadmap,
  };

  const PAGES = { home: HomePage, learning: LearningPage, subject: SubjectPage, tree: TreePage, research: ResearchPage, competitions: CompetitionsPage, nasa: NasaPage, dashboard: Dashboard, profile: ProfilePage, admin: AdminPage, roadmaps: RoadmapsPage, roadmap: RoadmapDetail, internships: InternshipsPage };
  const Page = PAGES[page] || HomePage;

  return (
    <QuestaCtx.Provider value={ctx}>
      <GlobalStyles />
      <div className="min-h-screen flex flex-col q-grain" style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif", background: "#f0f2ee", minHeight: "100vh", color: "#2b3634" }}>
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
          <div className="absolute inset-0" style={{ background: "radial-gradient(900px 640px at 82% 2%, rgba(61,74,70,.18), transparent 60%), radial-gradient(760px 580px at 2% 92%, rgba(61,74,70,.12), transparent 62%), radial-gradient(600px 500px at 50% 50%, rgba(61,74,70,.08), transparent 55%)" }} />
        </div>
        <Navbar />
        <main className="flex-1 relative" style={{ zIndex: 1 }}><Page /></main>
        <Footer />
        <NodeDrawer />
        {obOpen && <Onboarding />}
        <ChatWidget />
        <SearchModal />
        <Toasts toasts={toasts} />
      </div>
    </QuestaCtx.Provider>
  );
}

/* ═══ MODULE: components/AboutPage.jsx ═══ */
