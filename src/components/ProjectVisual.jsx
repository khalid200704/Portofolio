/* Project card illustrations — one unique SVG per project */

const Wrap = ({ id, bg, children }) => (
  <svg viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg"
       style={{ width: '100%', height: '100%', display: 'block' }}>
    <defs>
      <pattern id={`d-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.2" fill={bg} opacity="0.35" />
      </pattern>
    </defs>
    <rect width="400" height="180" fill={bg} opacity="0.12" />
    <rect width="400" height="180" fill={`url(#d-${id})`} />
    {children}
  </svg>
)

/* ─── TI Toolkit ─────────────────────────────────────────── */
function TiToolkit() {
  const c = '#f97316'
  return (
    <Wrap id="ti" bg={c}>
      {/* browser frame */}
      <rect x="60" y="22" width="272" height="140" rx="8" fill="white" stroke={c} strokeWidth="1.5" opacity="0.9"/>
      <rect x="60" y="22" width="272" height="26" rx="8" fill={c} opacity="0.15"/>
      <rect x="60" y="36" width="272" height="12" fill={c} opacity="0.15"/>
      <circle cx="77" cy="35" r="4" fill={c} opacity="0.5"/>
      <circle cx="90" cy="35" r="4" fill={c} opacity="0.5"/>
      <circle cx="103" cy="35" r="4" fill={c} opacity="0.5"/>
      <rect x="118" y="27" width="170" height="14" rx="7" fill={c} opacity="0.1"/>
      {/* formula display */}
      <rect x="74" y="58" width="244" height="28" rx="4" fill={c} opacity="0.07"/>
      <text x="308" y="77" textAnchor="end" fill={c} fontSize="13" fontFamily="monospace" fontWeight="700">σ = √(Σ(xᵢ−μ)²/n)</text>
      {/* button grid */}
      {[0,1,2,3].map(col => [0,1,2].map(row => (
        <rect key={`${col}${row}`} x={74 + col*62} y={94 + row*20} width={54} height={15} rx="3"
              fill={c} opacity={0.05 + row * 0.04 + col * 0.02}/>
      )))}
      {/* math labels */}
      {['∫','σ','μ','n!'].map((sym, i) => (
        <text key={sym} x={101 + i*62} y={106} textAnchor="middle" fill={c}
              fontSize="10" fontFamily="monospace" opacity="0.6">{sym}</text>
      ))}
    </Wrap>
  )
}

/* ─── Ventilasi IoT ──────────────────────────────────────── */
function VensilasiIoT() {
  const c = '#4f8ef7'
  return (
    <Wrap id="vent" bg={c}>
      {/* room outline */}
      <rect x="30" y="30" width="200" height="130" rx="4" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      {/* ceiling mount sensors */}
      {[{x:70,label:'CO₂'},{x:130,label:'T°'},{x:190,label:'PM2.5'}].map(s=>(
        <g key={s.label}>
          <line x1={s.x} y1={30} x2={s.x} y2={52} stroke={c} strokeWidth="1.5" opacity="0.5"/>
          <rect x={s.x-18} y={52} width="36" height="20" rx="4" fill={c} opacity="0.15" stroke={c} strokeWidth="1"/>
          <text x={s.x} y={65} textAnchor="middle" fill={c} fontSize="8" fontWeight="700">{s.label}</text>
        </g>
      ))}
      {/* fan on wall */}
      <circle cx="215" cy="95" r="22" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <circle cx="215" cy="95" r="6" fill={c} opacity="0.4"/>
      {[0,60,120,180,240,300].map(a=>(
        <line key={a} x1={215+Math.cos(a*Math.PI/180)*8} y1={95+Math.sin(a*Math.PI/180)*8}
              x2={215+Math.cos(a*Math.PI/180)*20} y2={95+Math.sin(a*Math.PI/180)*20}
              stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      ))}
      {/* ESP32 chip */}
      <rect x="270" y="60" width="90" height="60" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      <rect x="280" y="70" width="70" height="40" rx="3" fill={c} opacity="0.1"/>
      <text x="315" y="88" textAnchor="middle" fill={c} fontSize="9" fontWeight="700">ESP32</text>
      <text x="315" y="100" textAnchor="middle" fill={c} fontSize="7" opacity="0.7">MQTT CLIENT</text>
      {/* WiFi waves */}
      {[10,18,26].map(r=>(
        <path key={r} d={`M${315-r},52 Q315,${52-r} ${315+r},52`}
              stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity={0.7 - r*0.02}/>
      ))}
      {/* data line */}
      <line x1="230" y1="95" x2="270" y2="90" stroke={c} strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
    </Wrap>
  )
}

/* ─── Monitoring EV ──────────────────────────────────────── */
function MonitoringEV() {
  const c = '#3dd68c'
  const arc = (cx, cy, r, start, end) => {
    const s = { x: cx + r*Math.cos(start*Math.PI/180), y: cy + r*Math.sin(start*Math.PI/180) }
    const e = { x: cx + r*Math.cos(end*Math.PI/180),   y: cy + r*Math.sin(end*Math.PI/180) }
    return `M${s.x},${s.y} A${r},${r} 0 0 1 ${e.x},${e.y}`
  }
  return (
    <Wrap id="ev" bg={c}>
      {/* speedometer */}
      <path d={arc(130,120,70,210,330)} stroke={c} strokeWidth="2" opacity="0.15"/>
      <path d={arc(130,120,70,210,285)} stroke={c} strokeWidth="8" strokeLinecap="round" opacity="0.6"/>
      <circle cx="130" cy="120" r="8" fill={c} opacity="0.8"/>
      <line x1="130" y1="120" x2="130" y2="55" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
      {['0','60','120'].map((v,i)=>(
        <text key={v} x={130+75*Math.cos((210+i*60)*Math.PI/180)} y={120+75*Math.sin((210+i*60)*Math.PI/180)}
              textAnchor="middle" fill={c} fontSize="9" opacity="0.6">{v}</text>
      ))}
      <text x="130" y="142" textAnchor="middle" fill={c} fontSize="8" opacity="0.5">km/h</text>
      {/* battery bars */}
      <rect x="230" y="30" width="40" height="80" rx="4" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <rect x="242" y="24" width="16" height="8" rx="2" fill={c} opacity="0.4"/>
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x="234" y={100-i*16} width="32" height="12" rx="2"
              fill={c} opacity={i < 3 ? 0.7 : 0.15}/>
      ))}
      <text x="250" y="126" textAnchor="middle" fill={c} fontSize="8" opacity="0.6">BATT</text>
      {/* temp */}
      <rect x="290" y="30" width="80" height="30" rx="6" fill="white" stroke={c} strokeWidth="1.2" opacity="0.9"/>
      <text x="330" y="44" textAnchor="middle" fill={c} fontSize="11" fontWeight="700">42.3°C</text>
      <text x="330" y="56" textAnchor="middle" fill={c} fontSize="8" opacity="0.6">BATTERY TEMP</text>
      {/* cloud */}
      <ellipse cx="330" cy="100" rx="30" ry="18" fill={c} opacity="0.1" stroke={c} strokeWidth="1.2"/>
      <ellipse cx="318" cy="104" rx="16" ry="12" fill={c} opacity="0.08"/>
      <ellipse cx="342" cy="104" rx="16" ry="12" fill={c} opacity="0.08"/>
      <text x="330" y="103" textAnchor="middle" fill={c} fontSize="8" fontWeight="600" opacity="0.7">CLOUD</text>
      {/* data line */}
      <line x1="250" y1="110" x2="250" y2="135" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
      <line x1="250" y1="135" x2="300" y2="135" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
      <line x1="300" y1="135" x2="300" y2="118" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
    </Wrap>
  )
}

/* ─── LSTM Prediction ────────────────────────────────────── */
function PrediksiLSTM() {
  const c = '#a78bfa'
  const nodes = [[60,40],[60,90],[60,140],[160,65],[160,115],[260,40],[260,90],[260,140]]
  const edges = [[0,3],[1,3],[1,4],[2,4],[3,5],[3,6],[4,6],[4,7]]
  return (
    <Wrap id="lstm" bg={c}>
      {/* sun */}
      <circle cx="30" cy="90" r="18" fill={c} opacity="0.2" stroke={c} strokeWidth="1.5"/>
      {[0,45,90,135,180,225,270,315].map(a=>(
        <line key={a} x1={30+20*Math.cos(a*Math.PI/180)} y1={90+20*Math.sin(a*Math.PI/180)}
              x2={30+28*Math.cos(a*Math.PI/180)} y2={90+28*Math.sin(a*Math.PI/180)}
              stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      ))}
      {/* network edges */}
      {edges.map(([a,b],i)=>(
        <line key={i} x1={nodes[a][0]+100} y1={nodes[a][1]} x2={nodes[b][0]+100} y2={nodes[b][1]}
              stroke={c} strokeWidth="1" opacity="0.25"/>
      ))}
      {/* network nodes */}
      {nodes.map(([x,y],i)=>(
        <circle key={i} cx={x+100} cy={y} r="10" fill="white" stroke={c} strokeWidth="1.5"
                opacity={i < 3 ? 0.9 : i < 5 ? 0.8 : 0.9}/>
      ))}
      {/* layer labels */}
      <text x="160" y="170" textAnchor="middle" fill={c} fontSize="8" opacity="0.5">Input</text>
      <text x="260" y="170" textAnchor="middle" fill={c} fontSize="8" opacity="0.5">Hidden</text>
      <text x="360" y="170" textAnchor="middle" fill={c} fontSize="8" opacity="0.5">Output</text>
      {/* prediction wave */}
      <polyline points="310,90 325,65 340,110 355,55 370,100 385,70 400,85"
                stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      <text x="355" y="44" textAnchor="middle" fill={c} fontSize="8" fontWeight="600" opacity="0.6">PREDICTION</text>
    </Wrap>
  )
}

/* ─── Deschain ────────────────────────────────────────────── */
function Deschain() {
  const c = '#f97316'
  const files = [{x:50,lang:'TS',ext:'.ts'},{x:170,lang:'JS',ext:'.js'},{x:290,lang:'PY',ext:'.py'}]
  return (
    <Wrap id="des" bg={c}>
      {/* branch lines from top */}
      <circle cx="200" cy="24" r="6" fill={c} opacity="0.6"/>
      {files.map(f=>(
        <g key={f.lang}>
          <line x1="200" y1="30" x2={f.x+35} y2="55" stroke={c} strokeWidth="1.5" opacity="0.35"/>
          {/* file card */}
          <rect x={f.x} y="55" width="70" height="90" rx="8" fill="white" stroke={c} strokeWidth="1.5" opacity="0.9"/>
          <rect x={f.x} y="55" width="70" height="24" rx="8" fill={c} opacity="0.15"/>
          <rect x={f.x+45} y="55" width="26" height="26" rx="4" fill={c} opacity="0.2"/>
          <text x={f.x+58} y="72" textAnchor="middle" fill={c} fontSize="8" fontWeight="700">{f.ext}</text>
          <text x={f.x+35} y="77" textAnchor="middle" fill={c} fontSize="11" fontWeight="700">{f.lang}</text>
          {/* code lines */}
          {[0,1,2,3].map(i=>(
            <rect key={i} x={f.x+10} y={90+i*14} width={30+Math.sin(i+f.x)*10} height="5" rx="2"
                  fill={c} opacity="0.12"/>
          ))}
        </g>
      ))}
      {/* fork badge on PY */}
      <circle cx="336" cy="60" r="12" fill={c} opacity="0.9"/>
      <text x="336" y="64" textAnchor="middle" fill="white" fontSize="10">★</text>
      <text x="336" y="158" textAnchor="middle" fill={c} fontSize="8" opacity="0.6">forked</text>
    </Wrap>
  )
}

/* ─── Auto Feeder Betta ──────────────────────────────────── */
function AutoFeeder() {
  const c = '#4f8ef7'
  return (
    <Wrap id="fish" bg={c}>
      {/* ESP32 + clock top left */}
      <rect x="20" y="20" width="80" height="44" rx="6" fill="white" stroke={c} strokeWidth="1.3"/>
      <text x="60" y="38" textAnchor="middle" fill={c} fontSize="9" fontWeight="700">ESP32</text>
      <text x="60" y="52" textAnchor="middle" fill={c} fontSize="7" opacity="0.6">SCHEDULER</text>
      {/* clock */}
      <circle cx="145" cy="42" r="22" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <line x1="145" y1="42" x2="145" y2="26" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      <line x1="145" y1="42" x2="158" y2="42" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      <circle cx="145" cy="42" r="3" fill={c} opacity="0.8"/>
      {/* servo arm */}
      <line x1="200" y1="20" x2="200" y2="75" stroke={c} strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
      <rect x="185" y="15" width="60" height="14" rx="4" fill={c} opacity="0.2" stroke={c} strokeWidth="1"/>
      <text x="215" y="25" textAnchor="middle" fill={c} fontSize="7" fontWeight="600">SERVO</text>
      {/* food pellets falling */}
      {[{x:196,y:82},{x:204,y:92},{x:199,y:102}].map((p,i)=>(
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={c} opacity={0.6-i*0.15}/>
      ))}
      {/* fish tank */}
      <rect x="140" y="100" width="230" height="65" rx="6" fill={c} opacity="0.08" stroke={c} strokeWidth="1.8"/>
      {/* water line */}
      <line x1="140" y1="118" x2="370" y2="118" stroke={c} strokeWidth="1" opacity="0.2"/>
      {/* fish silhouettes */}
      {[{x:190,y:135,s:1},{x:270,y:128,s:-1},{x:320,y:142,s:1}].map((f,i)=>(
        <g key={i} transform={`scale(${f.s},1) translate(${f.s>0?0:-2*f.x},0)`}>
          <ellipse cx={f.x} cy={f.y} rx="18" ry="9" fill={c} opacity="0.35"/>
          <path d={`M${f.x-18},${f.y} L${f.x-28},${f.y-8} L${f.x-28},${f.y+8} Z`}
                fill={c} opacity="0.3"/>
          <circle cx={f.x+8} cy={f.y-2} r="2.5" fill={c} opacity="0.6"/>
        </g>
      ))}
    </Wrap>
  )
}

/* ─── Plant Watering ─────────────────────────────────────── */
function PlantWatering() {
  const c = '#3dd68c'
  return (
    <Wrap id="plant" bg={c}>
      {/* ATmega chip top right */}
      <rect x="290" y="20" width="90" height="55" rx="6" fill="white" stroke={c} strokeWidth="1.3"/>
      {[0,1,2,3].map(i=>(
        <rect key={`l${i}`} x="282" y={28+i*11} width="10" height="5" rx="2" fill={c} opacity="0.4"/>
      ))}
      {[0,1,2,3].map(i=>(
        <rect key={`r${i}`} x="378" y={28+i*11} width="10" height="5" rx="2" fill={c} opacity="0.4"/>
      ))}
      <text x="335" y="43" textAnchor="middle" fill={c} fontSize="9" fontWeight="700">ATmega16</text>
      <text x="335" y="57" textAnchor="middle" fill={c} fontSize="7" opacity="0.6">AVR MCU</text>
      {/* pot */}
      <path d="M140,155 L110,110 L190,110 Z" fill={c} opacity="0.25"/>
      <rect x="108" y="108" width="84" height="8" rx="3" fill={c} opacity="0.35"/>
      {/* soil */}
      <ellipse cx="150" cy="110" rx="42" ry="8" fill={c} opacity="0.15"/>
      {/* plant stem + leaves */}
      <line x1="150" y1="110" x2="150" y2="50" stroke={c} strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      <ellipse cx="130" cy="75" rx="22" ry="12" fill={c} opacity="0.4" transform="rotate(-30 130 75)"/>
      <ellipse cx="170" cy="62" rx="22" ry="12" fill={c} opacity="0.4" transform="rotate(30 170 62)"/>
      <ellipse cx="150" cy="48" rx="16" ry="10" fill={c} opacity="0.5"/>
      {/* soil sensor probe */}
      <line x1="195" y1="80" x2="195" y2="125" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      <rect x="188" y="68" width="14" height="18" rx="3" fill="white" stroke={c} strokeWidth="1.3"/>
      <text x="195" y="80" textAnchor="middle" fill={c} fontSize="7" fontWeight="700">H₂O</text>
      {/* water drops */}
      {[{x:242,y:55},{x:258,y:70},{x:248,y:88}].map((d,i)=>(
        <path key={i} d={`M${d.x},${d.y} Q${d.x-4},${d.y+6} ${d.x},${d.y+12} Q${d.x+4},${d.y+6} ${d.x},${d.y}`}
              fill={c} opacity={0.6-i*0.15}/>
      ))}
      {/* relay + pump */}
      <rect x="260" y="100" width="50" height="28" rx="4" fill={c} opacity="0.12" stroke={c} strokeWidth="1"/>
      <text x="285" y="117" textAnchor="middle" fill={c} fontSize="8" fontWeight="600">PUMP</text>
    </Wrap>
  )
}

/* ─── Irigasi AVR ────────────────────────────────────────── */
function IrigasiAVR() {
  const c = '#3dd68c'
  return (
    <Wrap id="irr" bg={c}>
      {/* field rows */}
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x="20" y={40+i*24} width="200" height="14" rx="3" fill={c} opacity={0.08+i*0.02}/>
      ))}
      {/* sprinkler heads */}
      {[0,1,2].map(i=>(
        <g key={i}>
          <line x1={60+i*60} y1="38" x2={60+i*60} y2="28" stroke={c} strokeWidth="2" opacity="0.5"/>
          <circle cx={60+i*60} cy="26" r="4" fill={c} opacity="0.5"/>
          {[-20,-10,0,10,20].map(a=>(
            <line key={a} x1={60+i*60} y1="26"
                  x2={60+i*60+Math.sin(a*Math.PI/180)*18}
                  y2={26-Math.cos(a*Math.PI/180)*18}
                  stroke={c} strokeWidth="1" opacity="0.35"/>
          ))}
        </g>
      ))}
      {/* AVR chip */}
      <rect x="250" y="25" width="90" height="55" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x="242" y={30+i*10} width="10" height="6" rx="2" fill={c} opacity="0.4"/>
          <rect x="338" y={30+i*10} width="10" height="6" rx="2" fill={c} opacity="0.4"/>
        </g>
      ))}
      <text x="295" y="47" textAnchor="middle" fill={c} fontSize="9" fontWeight="700">AVR</text>
      <text x="295" y="60" textAnchor="middle" fill={c} fontSize="7" opacity="0.6">TIMER ISR · PWM</text>
      {/* OLED display */}
      <rect x="250" y="95" width="90" height="55" rx="6" fill="#111" stroke={c} strokeWidth="1.3"/>
      <rect x="258" y="103" width="74" height="38" rx="3" fill="#1a1a1a"/>
      {/* bar graph on OLED */}
      {[28,42,18,35,48].map((h,i)=>(
        <rect key={i} x={263+i*14} y={141-h*0.5} width="10" height={h*0.5} rx="1" fill={c} opacity="0.8"/>
      ))}
      <text x="295" y="160" textAnchor="middle" fill={c} fontSize="7" opacity="0.5">OLED DISPLAY</text>
      {/* wire */}
      <line x1="230" y1="100" x2="250" y2="122" stroke={c} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.45"/>
    </Wrap>
  )
}

/* ─── Web Pengadaan ──────────────────────────────────────── */
function WebPengadaan() {
  const c = '#f97316'
  return (
    <Wrap id="web" bg={c}>
      {/* browser */}
      <rect x="30" y="20" width="340" height="145" rx="8" fill="white" stroke={c} strokeWidth="1.5" opacity="0.9"/>
      <rect x="30" y="20" width="340" height="28" rx="8" fill={c} opacity="0.12"/>
      <rect x="30" y="36" width="340" height="12" fill={c} opacity="0.12"/>
      <circle cx="48" cy="34" r="4" fill={c} opacity="0.5"/>
      <circle cx="62" cy="34" r="4" fill={c} opacity="0.5"/>
      <circle cx="76" cy="34" r="4" fill={c} opacity="0.5"/>
      <rect x="90" y="26" width="220" height="14" rx="7" fill={c} opacity="0.1"/>
      {/* sidebar */}
      <rect x="30" y="48" width="70" height="117" fill={c} opacity="0.06"/>
      {['Dashboard','Pengadaan','Stok','Laporan'].map((item,i)=>(
        <g key={item}>
          <rect x="35" y={58+i*24} width="55" height="16" rx="3"
                fill={c} opacity={i===1 ? 0.2 : 0.05}/>
          <text x="62" y={70+i*24} textAnchor="middle" fill={c} fontSize="7"
                fontWeight={i===1?'700':'400'} opacity="0.8">{item}</text>
        </g>
      ))}
      {/* table */}
      <rect x="108" y="52" width="254" height="18" rx="2" fill={c} opacity="0.1"/>
      {['No','Item','Qty','Status'].map((h,i)=>(
        <text key={h} x={115+i*62} y={64} fill={c} fontSize="7" fontWeight="700" opacity="0.7">{h}</text>
      ))}
      {[['001','Kayu Jati','50','✓'],['002','Baut M8','200','✓'],['003','Cat','30','⏳'],['004','Paku','500','✓']].map((row,i)=>(
        <g key={i}>
          <rect x="108" y={72+i*22} width="254" height="20" rx="2"
                fill={c} opacity={i%2===0 ? 0.04 : 0}/>
          {row.map((cell,j)=>(
            <text key={j} x={115+j*62} y={86+i*22} fill={c} fontSize="7" opacity="0.7">{cell}</text>
          ))}
        </g>
      ))}
    </Wrap>
  )
}

/* ─── SMBD ───────────────────────────────────────────────── */
function SMBD() {
  const c = '#fbbf24'
  return (
    <Wrap id="smbd" bg={c}>
      {/* database cylinder */}
      <ellipse cx="130" cy="55" rx="55" ry="15" fill={c} opacity="0.2" stroke={c} strokeWidth="1.5"/>
      <rect x="75" y="55" width="110" height="80" fill={c} opacity="0.1"/>
      <rect x="75" y="55" width="110" height="80" fill="none" stroke={c} strokeWidth="1.5"
            strokeDasharray="0 0 0 0"/>
      <line x1="75" y1="55" x2="75" y2="135" stroke={c} strokeWidth="1.5" opacity="0.8"/>
      <line x1="185" y1="55" x2="185" y2="135" stroke={c} strokeWidth="1.5" opacity="0.8"/>
      <ellipse cx="130" cy="135" rx="55" ry="15" fill={c} opacity="0.15" stroke={c} strokeWidth="1.5"/>
      {/* db stripes */}
      {[75,95,115].map(y=>(
        <ellipse key={y} cx="130" cy={y} rx="55" ry="14" fill="none" stroke={c} strokeWidth="1" opacity="0.25"/>
      ))}
      <text x="130" y="98" textAnchor="middle" fill={c} fontSize="11" fontWeight="700" opacity="0.8">DATABASE</text>
      {/* SQL snippet */}
      <rect x="215" y="20" width="165" height="80" rx="6" fill="#1a1a1a" opacity="0.9"/>
      {[
        {t:'SELECT * FROM', y:40},
        {t:'  barang', y:54, op:0.6},
        {t:'WHERE stok > 0', y:68},
        {t:'ORDER BY id;', y:82},
      ].map(l=>(
        <text key={l.t} x="225" y={l.y} fill={c} fontSize="8.5" fontFamily="monospace" opacity={l.op||0.85}>{l.t}</text>
      ))}
      {/* Python icon */}
      <rect x="215" y="115" width="70" height="38" rx="6" fill="white" stroke={c} strokeWidth="1.3"/>
      <text x="250" y="133" textAnchor="middle" fill={c} fontSize="9" fontWeight="700">Python</text>
      <text x="250" y="145" textAnchor="middle" fill={c} fontSize="7" opacity="0.6">+ sqlite3</text>
      {/* arrow */}
      <line x1="285" y1="115" x2="285" y2="102" stroke={c} strokeWidth="1.5" markerEnd="url(#arr-smbd)" opacity="0.6"/>
      <defs>
        <marker id="arr-smbd" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill={c} opacity="0.6"/>
        </marker>
      </defs>
    </Wrap>
  )
}

/* ─── Default fallback ───────────────────────────────────── */
function DefaultVisual({ color }) {
  const c = color || '#93939f'
  return (
    <Wrap id="default" bg={c}>
      <circle cx="200" cy="90" r="45" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <circle cx="200" cy="90" r="25" fill={c} opacity="0.1"/>
      {[0,60,120,180,240,300].map(a=>(
        <circle key={a} cx={200+50*Math.cos(a*Math.PI/180)} cy={90+50*Math.sin(a*Math.PI/180)}
                r="8" fill={c} opacity="0.2"/>
      ))}
    </Wrap>
  )
}

/* ─── Main export ────────────────────────────────────────── */
const VISUALS = {
  'ti-toolkit':            TiToolkit,
  'ventilasi-iot':         VensilasiIoT,
  'monitoring-ev':         MonitoringEV,
  'prediksi-radiasi-lstm': PrediksiLSTM,
  'deschain':              Deschain,
  'automatic-feeder-betta':AutoFeeder,
  'plant-watering':        PlantWatering,
  'irigasi-avr':           IrigasiAVR,
  'web-pengadaan-barang':  WebPengadaan,
  'smbd':                  SMBD,
}

export default function ProjectVisual({ projectId, color }) {
  const Visual = VISUALS[projectId]
  if (!Visual) return <DefaultVisual color={color} />
  return <Visual color={color} />
}
