import { useState, useEffect, useRef } from "react";

const CHAPTERS = [
  {
    id: 0,
    title: "Kirish",
    icon: "🏛️",
    tag: "INTRO",
    color: "#C9A84C",
  },
  {
    id: 1,
    title: "Malaysian SNR",
    icon: "🇲🇾",
    tag: "SNR",
    color: "#FF6B35",
  },
  {
    id: 2,
    title: "ICT Konseptlari",
    icon: "⚡",
    tag: "ICT",
    color: "#00D4FF",
  },
  {
    id: 3,
    title: "Fibonacci",
    icon: "🌀",
    tag: "FIBO",
    color: "#A8FF78",
  },
  {
    id: 4,
    title: "Aylanma Fibonacci",
    icon: "🔄",
    tag: "ROT.FIBO",
    color: "#FF9FF3",
  },
  {
    id: 5,
    title: "Birlashgan Strategiya",
    icon: "💎",
    tag: "MASTER",
    color: "#FFD700",
  },
  {
    id: 6,
    title: "Risk Menejmenti",
    icon: "🛡️",
    tag: "RISK",
    color: "#FF4757",
  },
  {
    id: 7,
    title: "Real Misollar",
    icon: "📊",
    tag: "LIVE",
    color: "#7BED9F",
  },
];

// ─── SVG Chart Components ───────────────────────────────────────────────

function SNRChart() {
  return (
    <svg viewBox="0 0 500 280" style={{ width: "100%", borderRadius: "12px", background: "#0a0f1a" }}>
      {/* Grid */}
      {[60,100,140,180,220,260].map(y => (
        <line key={y} x1="40" y1={y} x2="480" y2={y} stroke="#1a2340" strokeWidth="1"/>
      ))}
      {/* Resistance zone */}
      <rect x="40" y="55" width="440" height="20" fill="#FF6B35" fillOpacity="0.18" />
      <line x1="40" y1="55" x2="480" y2="55" stroke="#FF6B35" strokeWidth="2" strokeDasharray="6,3"/>
      <line x1="40" y1="75" x2="480" y2="75" stroke="#FF6B35" strokeWidth="1" strokeDasharray="4,4"/>
      <text x="48" y="50" fill="#FF6B35" fontSize="11" fontFamily="monospace">RESISTANCE ZONE</text>

      {/* Support zone */}
      <rect x="40" y="215" width="440" height="20" fill="#00D4FF" fillOpacity="0.18" />
      <line x1="40" y1="215" x2="480" y2="215" stroke="#00D4FF" strokeWidth="2" strokeDasharray="6,3"/>
      <line x1="40" y1="235" x2="480" y2="235" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4,4"/>
      <text x="48" y="250" fill="#00D4FF" fontSize="11" fontFamily="monospace">SUPPORT ZONE</text>

      {/* Price candles */}
      {[
        [70,120,100,145,90],[110,175,155,180,160],[150,200,180,210,185],
        [190,225,205,230,210],[230,220,195,225,190],[270,190,155,195,150],
        [310,165,130,170,125],[350,145,115,155,110],[390,120,95,125,90],
        [430,70,55,75,50]
      ].map(([x,open,close,high,low],i) => (
        <g key={i}>
          <line x1={x} y1={high} x2={x} y2={low} stroke={close < open ? "#FF4757" : "#2ed573"} strokeWidth="1.5"/>
          <rect x={x-7} y={Math.min(open,close)} width="14" height={Math.abs(open-close)||2}
            fill={close < open ? "#FF4757" : "#2ed573"} rx="1"/>
        </g>
      ))}

      {/* Bounce arrows */}
      <text x="435" y="85" fill="#FFD700" fontSize="18">↓</text>
      <text x="355" y="200" fill="#FFD700" fontSize="18">↑</text>

      <text x="48" y="30" fill="#C9A84C" fontSize="13" fontFamily="monospace" fontWeight="bold">MALAYSIAN SNR — SUPPORT & RESISTANCE ZONES</text>
    </svg>
  );
}

function ICTChart() {
  return (
    <svg viewBox="0 0 500 300" style={{ width: "100%", borderRadius: "12px", background: "#0a0f1a" }}>
      {/* Grid */}
      {[60,100,140,180,220,260].map(y => (
        <line key={y} x1="40" y1={y} x2="480" y2={y} stroke="#1a2340" strokeWidth="1"/>
      ))}

      {/* FVG Zone */}
      <rect x="200" y="100" width="80" height="40" fill="#A8FF78" fillOpacity="0.15" stroke="#A8FF78" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="205" y="118" fill="#A8FF78" fontSize="9" fontFamily="monospace">FVG</text>
      <text x="200" y="133" fill="#A8FF78" fontSize="8" fontFamily="monospace">FAIR VALUE</text>
      <text x="205" y="143" fill="#A8FF78" fontSize="8" fontFamily="monospace">GAP</text>

      {/* OB Zone */}
      <rect x="130" y="150" width="60" height="30" fill="#FF9FF3" fillOpacity="0.2" stroke="#FF9FF3" strokeWidth="1.5"/>
      <text x="138" y="170" fill="#FF9FF3" fontSize="10" fontFamily="monospace" fontWeight="bold">OB</text>

      {/* Liquidity sweep */}
      <line x1="40" y1="80" x2="480" y2="80" stroke="#FFD700" strokeWidth="1" strokeDasharray="8,4"/>
      <text x="300" y="75" fill="#FFD700" fontSize="10" fontFamily="monospace">BSL — BUY SIDE LIQUIDITY</text>

      <line x1="40" y1="240" x2="480" y2="240" stroke="#FF4757" strokeWidth="1" strokeDasharray="8,4"/>
      <text x="280" y="255" fill="#FF4757" fontSize="10" fontFamily="monospace">SSL — SELL SIDE LIQUIDITY</text>

      {/* Price path */}
      <polyline
        points="50,230 90,220 130,180 170,160 190,85 220,100 260,130 300,140 340,120 380,90 430,78"
        fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* Sweep then reversal arrow */}
      <text x="395" y="70" fill="#FF4757" fontSize="16">⚡</text>
      <text x="48" y="30" fill="#00D4FF" fontSize="13" fontFamily="monospace" fontWeight="bold">ICT — OB / FVG / LIQUIDITY SWEEP</text>
    </svg>
  );
}

function FiboChart() {
  const levels = [
    { pct: 0,    y: 50,  label: "0%",     color: "#FF4757" },
    { pct: 23.6, y: 90,  label: "23.6%",  color: "#FF9FF3" },
    { pct: 38.2, y: 120, label: "38.2%",  color: "#FFD700" },
    { pct: 50,   y: 145, label: "50%",    color: "#A8FF78" },
    { pct: 61.8, y: 168, label: "61.8%",  color: "#00D4FF" },
    { pct: 78.6, y: 198, label: "78.6%",  color: "#7BED9F" },
    { pct: 100,  y: 240, label: "100%",   color: "#C9A84C" },
  ];
  return (
    <svg viewBox="0 0 500 290" style={{ width: "100%", borderRadius: "12px", background: "#0a0f1a" }}>
      {levels.map(l => (
        <g key={l.pct}>
          <line x1="40" y1={l.y} x2="460" y2={l.y} stroke={l.color} strokeWidth={l.pct===61.8||l.pct===50?2:1} strokeDasharray={l.pct===61.8?"none":"5,3"} strokeOpacity="0.8"/>
          <text x="465" y={l.y+4} fill={l.color} fontSize="10" fontFamily="monospace">{l.label}</text>
        </g>
      ))}
      {/* Price retracement arrow */}
      <polyline points="60,50 60,240" fill="none" stroke="#555" strokeWidth="1.5"/>
      <text x="20" y="50" fill="#FF4757" fontSize="10" fontFamily="monospace">HIGH</text>
      <text x="20" y="244" fill="#C9A84C" fontSize="10" fontFamily="monospace">LOW</text>

      {/* Entry zone highlight */}
      <rect x="42" y="145" width="415" height="53" fill="#00D4FF" fillOpacity="0.07" rx="3"/>
      <text x="48" y="162" fill="#00D4FF" fontSize="11" fontFamily="monospace" fontWeight="bold">⭐ PREMIUM ENTRY ZONE (50–61.8%)</text>

      {/* Price retracing */}
      <polyline points="120,50 160,80 200,75 240,95 280,110 320,130 360,155 380,170 400,165 430,240"
        fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="none"/>
      <circle cx="380" cy="170" r="6" fill="#00D4FF" fillOpacity="0.9"/>
      <text x="385" y="166" fill="#00D4FF" fontSize="9" fontFamily="monospace">ENTRY</text>

      <text x="48" y="25" fill="#A8FF78" fontSize="13" fontFamily="monospace" fontWeight="bold">FIBONACCI RETRACEMENT DARAJALARI</text>
    </svg>
  );
}

function RotFiboChart() {
  return (
    <svg viewBox="0 0 500 300" style={{ width: "100%", borderRadius: "12px", background: "#0a0f1a" }}>
      {/* Arcs representing rotational fibonacci */}
      {[40,70,110,160,220].map((r,i) => (
        <ellipse key={i} cx="120" cy="260" rx={r} ry={r*0.55}
          fill="none" stroke={["#FFD700","#FF9FF3","#00D4FF","#A8FF78","#FF6B35"][i]}
          strokeWidth="1.5" strokeDasharray="6,3" strokeOpacity="0.7"
          clipPath="url(#topHalf)"/>
      ))}
      <defs>
        <clipPath id="topHalf">
          <rect x="0" y="0" width="500" height="260"/>
        </clipPath>
      </defs>

      {/* Labels */}
      {[
        [155,225,"23.6%","#FFD700"],
        [182,196,"38.2%","#FF9FF3"],
        [220,168,"50%","#00D4FF"],
        [268,145,"61.8%","#A8FF78"],
        [326,130,"78.6%","#FF6B35"],
      ].map(([x,y,label,color]) => (
        <g key={label}>
          <circle cx={x} cy={y} r="3" fill={color}/>
          <text x={x+5} y={y+4} fill={color} fontSize="10" fontFamily="monospace">{label}</text>
        </g>
      ))}

      {/* Price wave */}
      <polyline
        points="120,260 150,220 180,195 220,168 260,150 300,140 340,135"
        fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinejoin="round"/>

      <circle cx="120" cy="260" r="5" fill="#FFD700"/>
      <text x="90" y="278" fill="#FFD700" fontSize="10" fontFamily="monospace">SWING LOW</text>

      <text x="48" y="25" fill="#FF9FF3" fontSize="13" fontFamily="monospace" fontWeight="bold">AYLANMA (ROTATIONAL) FIBONACCI</text>
      <text x="48" y="42" fill="#888" fontSize="10" fontFamily="monospace">Narx harakatining kelajakdagi nuqtalarini aniqlash</text>
    </svg>
  );
}

function MasterStrategyChart() {
  return (
    <svg viewBox="0 0 500 320" style={{ width: "100%", borderRadius: "12px", background: "#0a0f1a" }}>
      {/* SNR Zone */}
      <rect x="40" y="155" width="440" height="25" fill="#FF6B35" fillOpacity="0.15"/>
      <line x1="40" y1="155" x2="480" y2="155" stroke="#FF6B35" strokeWidth="1.5" strokeDasharray="6,3"/>
      <line x1="40" y1="180" x2="480" y2="180" stroke="#FF6B35" strokeWidth="1.5" strokeDasharray="6,3"/>
      <text x="45" y="172" fill="#FF6B35" fontSize="10" fontFamily="monospace">SNR SUPPORT ZONE</text>

      {/* Fibo 61.8% */}
      <line x1="40" y1="168" x2="480" y2="168" stroke="#00D4FF" strokeWidth="2"/>
      <text x="385" y="163" fill="#00D4FF" fontSize="10" fontFamily="monospace">FIBO 61.8%</text>

      {/* OB box */}
      <rect x="180" y="155" width="70" height="25" fill="#FF9FF3" fillOpacity="0.25" stroke="#FF9FF3" strokeWidth="1.5"/>
      <text x="188" y="172" fill="#FF9FF3" fontSize="9" fontFamily="monospace" fontWeight="bold">ICT OB</text>

      {/* Liquidity sweep */}
      <line x1="40" y1="100" x2="480" y2="100" stroke="#FFD700" strokeWidth="1" strokeDasharray="8,4"/>
      <text x="45" y="95" fill="#FFD700" fontSize="10" fontFamily="monospace">LIQUIDITY (SSL) — SWEEP MAQSAD</text>

      {/* Price path — sweep down then reversal */}
      <polyline
        points="60,90 100,95 140,100 180,108 220,130 245,170 260,168 280,160 310,140 350,110 400,80 450,60"
        fill="none" stroke="#A8FF78" strokeWidth="2.5" strokeLinejoin="round"/>

      {/* Sweep point */}
      <circle cx="245" cy="170" r="7" fill="none" stroke="#FFD700" strokeWidth="2"/>
      <text x="252" y="168" fill="#FFD700" fontSize="10" fontFamily="monospace">SWEEP</text>

      {/* Entry point */}
      <circle cx="260" cy="168" r="8" fill="#00D4FF" fillOpacity="0.9"/>
      <text x="268" y="164" fill="#00D4FF" fontSize="10" fontFamily="monospace" fontWeight="bold">ENTRY ✓</text>

      {/* TP arrow */}
      <line x1="400" y1="80" x2="400" y2="40" stroke="#A8FF78" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <text x="405" y="60" fill="#A8FF78" fontSize="10" fontFamily="monospace">TP</text>

      {/* SL line */}
      <line x1="40" y1="200" x2="480" y2="200" stroke="#FF4757" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="45" y="215" fill="#FF4757" fontSize="10" fontFamily="monospace">SL — Zone pastida</text>

      <text x="48" y="25" fill="#FFD700" fontSize="13" fontFamily="monospace" fontWeight="bold">MASTER SETUP: SNR + ICT OB + FIBO 61.8%</text>
      <text x="48" y="42" fill="#888" fontSize="10" fontFamily="monospace">Uchta tasdiqlash = Yuqori ehtimollik kirish</text>
    </svg>
  );
}

// ─── Chapter Content ────────────────────────────────────────────────────

function ChapterContent({ id }) {
  const Box = ({ color, title, children }) => (
    <div style={{
      border: `1px solid ${color}30`,
      borderLeft: `3px solid ${color}`,
      background: `${color}08`,
      borderRadius: "8px",
      padding: "14px 16px",
      marginBottom: "14px"
    }}>
      {title && <div style={{ color, fontFamily: "monospace", fontSize: "11px", fontWeight: "bold", marginBottom: "8px", letterSpacing: "2px" }}>{title}</div>}
      {children}
    </div>
  );

  const Rule = ({ num, text, color = "#FFD700" }) => (
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "10px" }}>
      <div style={{
        minWidth: "28px", height: "28px", borderRadius: "50%",
        background: `${color}20`, border: `1px solid ${color}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color, fontSize: "12px", fontWeight: "bold", fontFamily: "monospace"
      }}>{num}</div>
      <p style={{ color: "#ccc", margin: 0, lineHeight: 1.6, fontSize: "14px" }}>{text}</p>
    </div>
  );

  const chapters = {
    0: (
      <div>
        <p style={{ color: "#aaa", fontSize: "15px", lineHeight: 1.8 }}>
          Bu kitob <strong style={{ color: "#FFD700" }}>Malaysian SNR</strong>, <strong style={{ color: "#00D4FF" }}>ICT konseptlari</strong>, <strong style={{ color: "#A8FF78" }}>Fibonacci</strong> va <strong style={{ color: "#FF9FF3" }}>Aylanma Fibonacci</strong> ni birlashtirib, professional darajada trading qilishni o'rgatadi.
        </p>
        <Box color="#C9A84C" title="📌 BU KITOBDAN NIMA OLASIZ">
          <Rule num="✓" text="Malaysian SNR — zona asosida support/resistance topish" color="#FF6B35"/>
          <Rule num="✓" text="ICT — Order Block, FVG, Liquidity tushunchalari" color="#00D4FF"/>
          <Rule num="✓" text="Fibonacci — eng kuchli retracement darajalari" color="#A8FF78"/>
          <Rule num="✓" text="Aylanma Fibonacci — extension va projection" color="#FF9FF3"/>
          <Rule num="✓" text="Barchasini birlashtirib ishlaydigan MASTER strategiya" color="#FFD700"/>
        </Box>
        <Box color="#FF4757" title="⚠️ MUHIM">
          <p style={{ color: "#ccc", margin: 0, fontSize: "14px", lineHeight: 1.7 }}>
            Bu strategiya <strong style={{ color: "#FF4757" }}>Forex, Crypto, Indices</strong> da ishlaydi. Minimum TF: M15. Ideal: H1/H4 analiz + M15/M5 kirish.
          </p>
        </Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "16px" }}>
          {[["💹","Bozor","Forex, Crypto, Indices"],["⏰","Timeframe","H4 tahlil, M15 kirish"],["🎯","Win Rate","70–80% (to'g'ri qo'llanilganda)"],["📈","R:R","Minimum 1:2, Ideal 1:3"]].map(([icon,k,v]) => (
            <div key={k} style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "8px", padding: "12px" }}>
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>{icon}</div>
              <div style={{ color: "#666", fontSize: "11px", fontFamily: "monospace" }}>{k}</div>
              <div style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "600" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    ),

    1: (
      <div>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.8 }}>
          Malaysian SNR — bu narx grafikida <strong style={{ color: "#FF6B35" }}>ZONA</strong> sifatida ko'rsatiladigan support va resistance. Oddiy chiziq emas — keng zona!
        </p>
        <SNRChart />
        <Box color="#FF6B35" title="🇲🇾 MALAYSIAN SNR QOIDALARI">
          <Rule num="1" text="Zonani eng kamida 2 ta marta test qilingan narxdan chizing" color="#FF6B35"/>
          <Rule num="2" text="Zona — sham body (ochilish-yopilish) orasidagi masofa" color="#FF6B35"/>
          <Rule num="3" text="Narx zonaga tegib QAYTsa — bu kuchli signal" color="#FF6B35"/>
          <Rule num="4" text="Eng avvalgi va eng so'nggi murojaat orasida ko'proq vaqt o'tgan zone KUCHLIROQ" color="#FF6B35"/>
        </Box>
        <Box color="#00D4FF" title="📍 QANDAY TOPILADI?">
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "#00D4FF" }}>Resistance:</strong> Narx ko'tarildi → qaytdi → yana ko'tarildi → qaytdi. Shu cho'qqilar orasidagi zona = Resistance Zone.<br/><br/>
            <strong style={{ color: "#A8FF78" }}>Support:</strong> Narx tushdi → ko'tarildi → yana tushdi → ko'tarildi. Shu tublar orasidagi zona = Support Zone.
          </p>
        </Box>
        <Box color="#FFD700" title="⭐ KUCHLI ZONA BELGILARI">
          <Rule num="1" text="Ko'p marta test qilingan (3+ marta)" color="#FFD700"/>
          <Rule num="2" text="Katta timeframeda ko'rinadi (H4, Daily)" color="#FFD700"/>
          <Rule num="3" text="Narx zonadan tez va kuchli qaytgan" color="#FFD700"/>
          <Rule num="4" text="Zona shakllangandan keyin uzoq vaqt o'tmagan" color="#FFD700"/>
        </Box>
        <Box color="#A8FF78" title="💡 MUHIM NUANCE">
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            Malaysian SNR'da <strong style={{ color: "#A8FF78" }}>Support Resistance ga aylanadi</strong> — narx support zonani "yorib" o'tsa, u Resistance bo'lib qoladi (va aksincha). Bu "Role Reversal" deyiladi.
          </p>
        </Box>
      </div>
    ),

    2: (
      <div>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.8 }}>
          ICT (Inner Circle Trader) — Smart Money harakatini tushunish tizimi. Bozor katta o'yinchilar tomonidan boshqariladi. Ularning izini topamiz.
        </p>
        <ICTChart />
        <Box color="#00D4FF" title="⚡ ICT ASOSIY TUSHUNCHALAR">
          {[
            ["Order Block (OB)","Katta o'yinchilar buyurtma bergan narx zonasi. Ko'pincha so'nggi bearish sham (bullish OB uchun) yoki so'nggi bullish sham (bearish OB uchun)","#FF9FF3"],
            ["Fair Value Gap (FVG)","3 ta sham orasida narx to'ldirilmagan bo'shliq. Narx keyinchalik bu bo'shliqni to'ldirish uchun qaytadi","#A8FF78"],
            ["Liquidity","Narx Stop Loss uyumlarini 'yeydi'. BSL (Buy Side) va SSL (Sell Side) likvidlik zonalari","#FFD700"],
            ["Breaker Block","Avvalgi OB yorilgandan keyin hosil bo'ladigan yangi zona — rollar almashadi","#00D4FF"],
          ].map(([t,d,c]) => (
            <div key={t} style={{ marginBottom: "14px" }}>
              <div style={{ color: c, fontFamily: "monospace", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>{t}</div>
              <p style={{ color: "#bbb", margin: 0, fontSize: "13px", lineHeight: 1.6 }}>{d}</p>
            </div>
          ))}
        </Box>
        <Box color="#FF9FF3" title="🎯 OB QANDAY TOPILADI?">
          <Rule num="1" text="Bullish harakat boshlangan joy oldidagi so'nggi bearish (qizil) sham — bu Bullish OB" color="#FF9FF3"/>
          <Rule num="2" text="OB ko'pincha katta harakatdan oldin paydo bo'ladi (Impulse oldi)" color="#FF9FF3"/>
          <Rule num="3" text="Narx OB ga qaytganda — kirish joyi!" color="#FF9FF3"/>
        </Box>
        <Box color="#FFD700" title="🏦 SMART MONEY MANTIQ">
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            Banklar va hedge fondlar trillionlab dollar bilan ishlaydi. Ular buy/sell qilish uchun <strong style={{ color: "#FFD700" }}>likvidlik</strong> kerak. Shuning uchun ular avval narxni retail traderlar Stop Loss joylarga olib boradi (sweep), keyin haqiqiy yo'nalishda harakat qiladi.
          </p>
        </Box>
      </div>
    ),

    3: (
      <div>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.8 }}>
          Fibonacci — tabiatdagi nisbatlar asosida qurilgan. Narx har doim shu "sehrli" darajalarda to'xtaydi yoki qaytadi.
        </p>
        <FiboChart />
        <Box color="#A8FF78" title="🌀 FIBONACCI DARAJALARI">
          {[
            ["23.6%","Kuchsiz pullback — trend juda kuchli bo'lganda","#FF9FF3"],
            ["38.2%","O'rtacha pullback — kuchli trenddagi entry","#FFD700"],
            ["50%","Psixologik daraja — yarmigacha qaytish","#A8FF78"],
            ["61.8%","OLTIN NISBAT (Golden Ratio) — eng kuchli daraja ⭐","#00D4FF"],
            ["78.6%","Chuqur pullback — trend davom etishiga ishonch kamroq","#FF6B35"],
          ].map(([level,desc,color]) => (
            <div key={level} style={{ display:"flex", gap:"12px", alignItems:"flex-start", marginBottom:"10px" }}>
              <div style={{ minWidth:"52px", background:`${color}20`, border:`1px solid ${color}`, borderRadius:"6px", padding:"3px 6px", textAlign:"center", color, fontFamily:"monospace", fontSize:"11px", fontWeight:"bold" }}>{level}</div>
              <p style={{ color:"#bbb", margin:0, fontSize:"13px", lineHeight:1.6 }}>{desc}</p>
            </div>
          ))}
        </Box>
        <Box color="#FFD700" title="📏 QANDAY CHIZILADI?">
          <Rule num="1" text="Bullish trend: eng pastdan (Swing Low) eng tepaga (Swing High) chizing" color="#FFD700"/>
          <Rule num="2" text="Bearish trend: eng tepadan (Swing High) eng pastga (Swing Low) chizing" color="#FFD700"/>
          <Rule num="3" text="Narx 61.8% darajasiga qaytganda — bu ideal entry zona!" color="#FFD700"/>
        </Box>
        <Box color="#00D4FF" title="💡 PRO TIP">
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "#00D4FF" }}>Confluence</strong> — ikki yoki undan ko'p daraja bir joyga to'g'ri kelsa kuchli signal: masalan, <strong style={{ color: "#A8FF78" }}>Fibo 61.8%</strong> + <strong style={{ color: "#FF6B35" }}>SNR Zona</strong> bir xil narxda bo'lsa — bu YUQORI EHTIMOLLIK kirish!
          </p>
        </Box>
      </div>
    ),

    4: (
      <div>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.8 }}>
          Aylanma (Rotational) Fibonacci — narx qayerga yetishi mumkinligini oldindan ko'rsatadi. TP (Take Profit) darajalarini aniqlash uchun ishlatiladi.
        </p>
        <RotFiboChart />
        <Box color="#FF9FF3" title="🔄 AYLANMA FIBONACCI NIMA?">
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            Aylanma Fibonacci <strong style={{ color: "#FF9FF3" }}>Extension</strong> darajalarini ko'rsatadi — ya'ni narx kirish nuqtasidan qanchalik uzoqqa borishi mumkin. Bu bizga <strong style={{ color: "#FFD700" }}>TP1, TP2, TP3</strong> joylashtirishga yordam beradi.
          </p>
        </Box>
        <Box color="#FFD700" title="📐 EXTENSION DARAJALARI">
          {[
            ["127.2%","Minimal TP — konservativ chiqish","#A8FF78"],
            ["161.8%","Asosiy TP — ko'p traderlar shu joyda chiqadi","#00D4FF"],
            ["200%","Kuchli trend TP","#FFD700"],
            ["261.8%","Maksimal target — faqat kuchli trendda","#FF9FF3"],
          ].map(([level,desc,color]) => (
            <div key={level} style={{ display:"flex", gap:"12px", alignItems:"flex-start", marginBottom:"10px" }}>
              <div style={{ minWidth:"60px", background:`${color}20`, border:`1px solid ${color}`, borderRadius:"6px", padding:"3px 6px", textAlign:"center", color, fontFamily:"monospace", fontSize:"11px", fontWeight:"bold" }}>{level}</div>
              <p style={{ color:"#bbb", margin:0, fontSize:"13px", lineHeight:1.6 }}>{desc}</p>
            </div>
          ))}
        </Box>
        <Box color="#A8FF78" title="🔧 QANDAY QO'LLANILADI?">
          <Rule num="1" text="Swing Low (kirish nuqtasi) dan Swing High (chiqish nuqtasi) gacha chizing" color="#A8FF78"/>
          <Rule num="2" text="Extension darajalari shu harakat uchun maqsad nuqtalarini ko'rsatadi" color="#A8FF78"/>
          <Rule num="3" text="TP1 = 127.2%, TP2 = 161.8%, TP3 = 200% ga qo'ying" color="#A8FF78"/>
          <Rule num="4" text="TP1 da pozitsiyaning 50% ni yoping, qolganini TP2-3 ga qoldiring" color="#A8FF78"/>
        </Box>
        <Box color="#00D4FF" title="🔄 AYLANMA KOMBINATSIYA">
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            Aylanma Fibonacci + SNR birlashsa: <strong style={{ color: "#FF9FF3" }}>161.8% extension</strong> yaqinida Resistance zona bo'lsa — bu IDEAL TP joyi. Narx bu yerda to'xtash ehtimoli juda yuqori!
          </p>
        </Box>
      </div>
    ),

    5: (
      <div>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.8 }}>
          Eng muhim bob — hamma tushunchalar birlashadi. Bu yerda <strong style={{ color: "#FFD700" }}>MASTER SETUP</strong> ni ko'rasiz.
        </p>
        <MasterStrategyChart />
        <Box color="#FFD700" title="💎 MASTER SETUP QOIDALARI">
          <p style={{ color: "#aaa", fontSize: "13px", marginBottom: "12px" }}>3 ta tasdiqlash kerak (Confluence). Qanchalik ko'p tasdiqlash — shunchalik kuchli signal:</p>
          <Rule num="1" text="SNR Zona — H4 yoki Daily darajasida aniq support/resistance zona" color="#FF6B35"/>
          <Rule num="2" text="Fibo 61.8% — zona ichida yoki yaqinida Fibonacci oltin nisbati" color="#A8FF78"/>
          <Rule num="3" text="ICT OB yoki FVG — zonada Order Block yoki Fair Value Gap mavjud" color="#FF9FF3"/>
          <Rule num="4" text="Likvidlik Sweep — narx avval Stop Loss uyumini olgan (foyda)" color="#FFD700"/>
          <Rule num="5" text="M15/M5 da tasdiqlash sham — Engulfing, Pin Bar, yoki MSB" color="#00D4FF"/>
        </Box>
        <Box color="#A8FF78" title="📋 KIRISH ALGORITMI">
          {[
            ["1. HTF Tahlil","H4/Daily da SNR zona va Fibonacci chizing"],
            ["2. Zona Kuting","Narx zonaga yaqinlashishini kuting"],
            ["3. Sweep Kuting","Narx zona pastidan qisqa "sham" chiqargandan so'ng"],
            ["4. OB/FVG Topish","Zonada ICT OB yoki FVG ni aniqlang"],
            ["5. LTF Kirish","M15 da bullish/bearish tasdiqlash sham hosil bo'lganda kiring"],
            ["6. SL/TP","SL: Zona pastidan 5-10 pip. TP1: Eng yaqin likvidlik. TP2: 161.8%"],
          ].map(([step,desc],i) => (
            <div key={i} style={{ display:"flex", gap:"12px", marginBottom:"10px", alignItems:"flex-start" }}>
              <div style={{ minWidth:"100px", color:"#A8FF78", fontFamily:"monospace", fontSize:"11px", fontWeight:"bold", paddingTop:"2px" }}>{step}</div>
              <p style={{ color:"#bbb", margin:0, fontSize:"13px", lineHeight:1.6 }}>{desc}</p>
            </div>
          ))}
        </Box>
        <Box color="#00D4FF" title="🎯 IDEAL SETUP — MISOL">
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "#FF6B35" }}>EURUSD H4:</strong> Narx 1.0850 da kuchli Support zona bor. <strong style={{ color: "#A8FF78" }}>Fibonacci 61.8%</strong> ham 1.0848 da. <strong style={{ color: "#FF9FF3" }}>OB</strong> 1.0845–1.0852 oralig'ida. Narx 1.0843 ga tushib SSL ni yeydi (Sweep). M15 da bullish engulfing paydo bo'ladi. → <strong style={{ color: "#FFD700" }}>KIRISH: 1.0850, SL: 1.0835, TP1: 1.0900, TP2: 1.0950</strong>
          </p>
        </Box>
      </div>
    ),

    6: (
      <div>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.8 }}>
          Eng yaxshi strategiya ham noto'g'ri risk menejment bilan pulni yo'qotadi. Bu bob sizni saqlab qoladi.
        </p>
        <Box color="#FF4757" title="🛡️ ASOSIY QOIDALAR">
          <Rule num="1" text="Har bir tradeda hisobning 1-2% dan ko'p risk qilmang" color="#FF4757"/>
          <Rule num="2" text="R:R (Risk to Reward) minimumi 1:2 bo'lsin. 1:3 ideal" color="#FF4757"/>
          <Rule num="3" text="Kuniga 3 ta yutqazishdan keyin trading to'xtating" color="#FF4757"/>
          <Rule num="4" text="Hech qachon SL qo'ymasdan kirmang" color="#FF4757"/>
          <Rule num="5" text="TP1 ga yetganda SL ni kirish nuqtasiga o'tkazing (Breakeven)" color="#FF4757"/>
        </Box>
        <Box color="#FFD700" title="🧮 POZITSIYA HAJMI FORMULA">
          <div style={{ background: "#0f1827", borderRadius: "8px", padding: "14px", fontFamily: "monospace" }}>
            <div style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>LOT HAJMI HISOBLASH:</div>
            <div style={{ color: "#FFD700", fontSize: "14px", lineHeight: 1.8 }}>
              Risk $ = Hisob × 0.01 (1%)<br/>
              Pip qiymati = Risk $ ÷ SL (pip)<br/>
              Lot = Pip qiymati ÷ 10 (standart)
            </div>
            <div style={{ marginTop: "12px", padding: "10px", background: "#1a2535", borderRadius: "6px" }}>
              <div style={{ color: "#888", fontSize: "11px", marginBottom: "6px" }}>MISOL ($1000 hisob):</div>
              <div style={{ color: "#A8FF78", fontSize: "13px", lineHeight: 1.7 }}>
                Risk: $1000 × 1% = <strong style={{ color: "#FFD700" }}>$10</strong><br/>
                SL: 15 pip → Pip qiymati: $10 ÷ 15 = $0.67<br/>
                Lot: $0.67 ÷ 10 = <strong style={{ color: "#00D4FF" }}>0.07 lot</strong>
              </div>
            </div>
          </div>
        </Box>
        <Box color="#A8FF78" title="📊 TRADE JURNALI">
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            Har bir tradeni yozing: <strong style={{ color: "#A8FF78" }}>Sana, Juft, Setup sababi, SL, TP, Natija, Xulosa</strong>. Oyiga bir marta ko'rib chiqing. Bu sizning eng muhim quroliz — statistikasiz rivojlanib bo'lmaydi.
          </p>
        </Box>
        <Box color="#00D4FF" title="🧠 PSIXOLOGIYA">
          <Rule num="→" text="Yutqazgandan keyin darhol qaytarishga urinmang (Revenge Trading)" color="#00D4FF"/>
          <Rule num="→" text="Setup yo'q bo'lsa — kirmang. Sabr ham strategiya" color="#00D4FF"/>
          <Rule num="→" text="Qo'rquv va ochko'zlik — 2 ta asosiy dushman" color="#00D4FF"/>
          <Rule num="→" text="Plan qiling, Planga amal qiling" color="#00D4FF"/>
        </Box>
      </div>
    ),

    7: (
      <div>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.8 }}>
          Ikkita real misol — Master Setup qoidalari qo'llanilgan holda.
        </p>

        <Box color="#A8FF78" title="📈 MISOL 1 — BULLISH SETUP (EURUSD)">
          <div style={{ background: "#0f1827", borderRadius: "8px", padding: "14px", marginBottom: "12px" }}>
            <svg viewBox="0 0 460 200" style={{ width: "100%", borderRadius: "8px", background: "#080d18" }}>
              <rect x="30" y="110" width="400" height="20" fill="#00D4FF" fillOpacity="0.1"/>
              <line x1="30" y1="110" x2="430" y2="110" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="5,3"/>
              <line x1="30" y1="130" x2="430" y2="130" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4,4"/>
              <text x="35" y="105" fill="#00D4FF" fontSize="9" fontFamily="monospace">SNR SUPPORT + FIBO 61.8%</text>
              <line x1="30" y1="50" x2="430" y2="50" stroke="#FFD700" strokeWidth="1" strokeDasharray="6,3"/>
              <text x="35" y="45" fill="#FFD700" fontSize="9" fontFamily="monospace">SSL SWEEP MAQSAD (TP ZONA)</text>
              <polyline points="40,50 80,60 120,80 160,95 200,135 220,120 250,100 290,75 330,55 380,40"
                fill="none" stroke="#A8FF78" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="200" cy="135" r="5" fill="none" stroke="#FFD700" strokeWidth="2"/>
              <text x="207" y="132" fill="#FFD700" fontSize="8" fontFamily="monospace">SWEEP</text>
              <circle cx="220" cy="120" r="6" fill="#00D4FF" fillOpacity="0.9"/>
              <text x="228" y="118" fill="#00D4FF" fontSize="8" fontFamily="monospace">ENTRY</text>
              <text x="35" y="20" fill="#A8FF78" fontSize="10" fontFamily="monospace" fontWeight="bold">EURUSD — BULLISH SETUP</text>
            </svg>
          </div>
          {[["Juft","EURUSD H4"],["SNR Zona","1.0845–1.0855"],["Fibo 61.8%","1.0848"],["ICT OB","1.0843–1.0852"],["Sweep","1.0840 (SSL)"],["Kirish","1.0852 (M15 Engulfing)"],["SL","1.0832 (−20 pip)"],["TP1","1.0900 (+48 pip)"],["TP2","1.0950 (+98 pip)"],["R:R","1:2.4 / 1:4.9"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #1a2535" }}>
              <span style={{ color:"#666", fontSize:"12px", fontFamily:"monospace" }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:"12px", fontFamily:"monospace" }}>{v}</span>
            </div>
          ))}
        </Box>

        <Box color="#FF4757" title="📉 MISOL 2 — BEARISH SETUP (XAUUSD)">
          <div style={{ background: "#0f1827", borderRadius: "8px", padding: "14px", marginBottom: "12px" }}>
            <svg viewBox="0 0 460 200" style={{ width: "100%", borderRadius: "8px", background: "#080d18" }}>
              <rect x="30" y="60" width="400" height="22" fill="#FF4757" fillOpacity="0.1"/>
              <line x1="30" y1="60" x2="430" y2="60" stroke="#FF4757" strokeWidth="1.5" strokeDasharray="5,3"/>
              <line x1="30" y1="82" x2="430" y2="82" stroke="#FF4757" strokeWidth="1" strokeDasharray="4,4"/>
              <text x="35" y="55" fill="#FF4757" fontSize="9" fontFamily="monospace">SNR RESISTANCE + FIBO 61.8%</text>
              <line x1="30" y1="160" x2="430" y2="160" stroke="#FFD700" strokeWidth="1" strokeDasharray="6,3"/>
              <text x="35" y="175" fill="#FFD700" fontSize="9" fontFamily="monospace">BSL SWEEP → TP ZONA</text>
              <polyline points="40,160 80,148 120,130 160,110 195,65 215,78 250,100 290,130 340,155 390,162"
                fill="none" stroke="#FF4757" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="195" cy="65" r="5" fill="none" stroke="#FFD700" strokeWidth="2"/>
              <text x="200" y="62" fill="#FFD700" fontSize="8" fontFamily="monospace">SWEEP BSL</text>
              <circle cx="215" cy="78" r="6" fill="#FF4757" fillOpacity="0.9"/>
              <text x="222" y="76" fill="#FF4757" fontSize="8" fontFamily="monospace">ENTRY</text>
              <text x="35" y="20" fill="#FF4757" fontSize="10" fontFamily="monospace" fontWeight="bold">XAUUSD — BEARISH SETUP</text>
            </svg>
          </div>
          {[["Juft","XAUUSD (Gold) H4"],["SNR Zona","2650–2660"],["Fibo 61.8%","2653"],["ICT Bearish OB","2648–2658"],["Sweep","2665 (BSL)"],["Kirish","2655 (M15 Pin Bar)"],["SL","2668 (−13$)"],["TP1","2620 (+35$)"],["TP2","2580 (+75$)"],["R:R","1:2.7 / 1:5.7"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #1a2535" }}>
              <span style={{ color:"#666", fontSize:"12px", fontFamily:"monospace" }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:"12px", fontFamily:"monospace" }}>{v}</span>
            </div>
          ))}
        </Box>

        <Box color="#FFD700" title="✅ XULOSA CHECKLIST">
          {["H4/Daily da SNR zona aniqlandimi?","Fibo 61.8% zona ichidami?","ICT OB yoki FVG bormi?","Likvidlik sweep bo'ldimi?","M15 da tasdiqlash sham bormi?","SL qo'ydingizmi?","R:R 1:2 dan kattami?","Lot hajmini hisoblangizmi?"].map((item,i) => (
            <div key={i} style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"8px" }}>
              <div style={{ width:"18px", height:"18px", border:"1px solid #FFD700", borderRadius:"3px", background:"#FFD70015", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#FFD700", fontSize:"12px" }}>□</span>
              </div>
              <p style={{ color:"#ccc", margin:0, fontSize:"13px" }}>{item}</p>
            </div>
          ))}
        </Box>
      </div>
    ),
  };

  return chapters[id] || <p style={{ color: "#666" }}>Tez orada...</p>;
}

// ─── Main App ───────────────────────────────────────────────────────────

export default function TradingBook() {
  const [active, setActive] = useState(0);
  const [animated, setAnimated] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 50);
    if (contentRef.current) contentRef.current.scrollTop = 0;
    return () => clearTimeout(t);
  }, [active]);

  const ch = CHAPTERS[active];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050810",
      color: "#e2e8f0",
      fontFamily: "'Georgia', serif",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0a0f1a 0%, #0d1525 100%)",
        borderBottom: "1px solid #1a2535",
        padding: "20px 24px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
          <div style={{ fontSize: "22px" }}>📚</div>
          <div>
            <div style={{ color: "#C9A84C", fontFamily: "monospace", fontSize: "10px", letterSpacing: "3px", marginBottom: "2px" }}>PROFESSIONAL TRADING MASTERBOOK</div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#fff" }}>Malaysian SNR + ICT + Fibonacci</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "12px" }}>
          {["SNR","ICT","FIBO","ROT.FIBO"].map(tag => (
            <span key={tag} style={{ background: "#1a2535", border: "1px solid #2a3a50", borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontFamily: "monospace", color: "#7ea8c9" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Chapter Nav */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        gap: "0",
        background: "#080d18",
        borderBottom: "1px solid #1a2535",
        scrollbarWidth: "none",
      }}>
        {CHAPTERS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              background: active === c.id ? `${c.color}15` : "transparent",
              border: "none",
              borderBottom: active === c.id ? `2px solid ${c.color}` : "2px solid transparent",
              padding: "10px 14px",
              cursor: "pointer",
              color: active === c.id ? c.color : "#555",
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: "bold",
              letterSpacing: "1px",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              minWidth: "fit-content",
            }}
          >
            <div style={{ fontSize: "16px", marginBottom: "2px" }}>{c.icon}</div>
            {c.tag}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px 40px",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.35s ease",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div style={{
              background: `${ch.color}20`,
              border: `1px solid ${ch.color}`,
              borderRadius: "8px",
              padding: "4px 10px",
              fontFamily: "monospace",
              fontSize: "10px",
              color: ch.color,
              fontWeight: "bold",
              letterSpacing: "2px",
            }}>{ch.tag}</div>
          </div>
          <div style={{ fontSize: "22px", fontWeight: "bold", color: "#fff", marginBottom: "4px" }}>
            {ch.icon} {ch.title}
          </div>
          <div style={{ width: "40px", height: "2px", background: ch.color, borderRadius: "2px" }} />
        </div>

        <ChapterContent id={active} />

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", gap: "10px" }}>
          {active > 0 ? (
            <button onClick={() => setActive(a => a - 1)} style={{
              flex: 1, background: "#0d1525", border: "1px solid #1e293b", color: "#888",
              padding: "12px", borderRadius: "8px", cursor: "pointer", fontFamily: "monospace",
              fontSize: "12px", transition: "all 0.2s",
            }}>← {CHAPTERS[active-1].title}</button>
          ) : <div style={{ flex: 1 }}/>}

          {active < CHAPTERS.length - 1 ? (
            <button onClick={() => setActive(a => a + 1)} style={{
              flex: 1, background: `${ch.color}15`, border: `1px solid ${ch.color}40`,
              color: ch.color, padding: "12px", borderRadius: "8px", cursor: "pointer",
              fontFamily: "monospace", fontSize: "12px", fontWeight: "bold", transition: "all 0.2s",
            }}>{CHAPTERS[active+1].title} →</button>
          ) : (
            <div style={{ flex:1, background:"#FFD70015", border:"1px solid #FFD70040", borderRadius:"8px", padding:"12px", textAlign:"center", fontFamily:"monospace", fontSize:"12px", color:"#FFD700" }}>
              🏆 Kitob tugadi. Muvaffaqiyatlar!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
