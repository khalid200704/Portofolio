/* System architecture diagrams — one per project */

const DIAGRAM_W = 760
const DIAGRAM_H = 220

/* ─── Shared primitives ─── */

function Box({ x, y, w = 110, h = 52, label, sub, color, dark }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8"
            fill={dark ? color : 'white'} stroke={color} strokeWidth="1.5" opacity="0.9"/>
      <rect x={x} y={y} width="4" height={h} rx="2" fill={color}/>
      <text x={x + 16} y={y + (sub ? 22 : 30)} fill={dark ? 'white' : color}
            fontSize="10" fontWeight="700" fontFamily="'Space Grotesk', sans-serif">{label}</text>
      {sub && (
        <text x={x + 16} y={y + 38} fill={dark ? 'rgba(255,255,255,0.6)' : '#93939f'}
              fontSize="8" fontFamily="monospace">{sub}</text>
      )}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, label, color, dashed }) {
  const id = `arr-${Math.round(x1)}-${Math.round(x2)}`
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill={color} opacity="0.6"/>
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5"
            strokeDasharray={dashed ? '5 4' : undefined} markerEnd={`url(#${id})`} opacity="0.55"/>
      {label && (
        <text x={mx} y={my - 6} textAnchor="middle" fill={color} fontSize="8"
              fontFamily="monospace" opacity="0.7">{label}</text>
      )}
    </g>
  )
}

function BentArrow({ points, label, color }) {
  const d = points.map((p,i) => `${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ')
  const [mx, my] = points[Math.floor(points.length/2)]
  const id = `arr-bent-${Math.round(mx)}-${Math.round(my)}`
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill={color} opacity="0.6"/>
        </marker>
      </defs>
      <polyline points={points.map(p=>p.join(',')).join(' ')} fill="none"
                stroke={color} strokeWidth="1.5" opacity="0.55" markerEnd={`url(#${id})`}/>
      {label && <text x={mx} y={my - 6} textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" opacity="0.7">{label}</text>}
    </g>
  )
}

function Bg({ color }) {
  return (
    <>
      <defs>
        <pattern id={`bgp-${color.slice(1)}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill={color} opacity="0.2"/>
        </pattern>
      </defs>
      <rect width={DIAGRAM_W} height={DIAGRAM_H} fill={color} opacity="0.04"/>
      <rect width={DIAGRAM_W} height={DIAGRAM_H} fill={`url(#bgp-${color.slice(1)})`}/>
    </>
  )
}

const Wrap = ({ children }) => (
  <svg viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`} fill="none"
       xmlns="http://www.w3.org/2000/svg"
       style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 280 }}>
    {children}
  </svg>
)

/* ─── TI Toolkit ─────────────────────────────────────────── */
function TiToolkitDiagram() {
  const c = '#f97316'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="User" sub="Browser" color={c}/>
      <Arrow x1={134} y1={y+26} x2={168} y2={y+26} color={c} label="HTTP"/>
      <Box x={170} y={y} label="HTML / CSS / JS" sub="Static Site" color={c} w={130}/>
      <Arrow x1={304} y1={y+26} x2={338} y2={y+26} color={c} label="renders"/>
      <Box x={340} y={y} label="Calculator" sub="13 tools" color={c}/>
      <Arrow x1={454} y1={y+26} x2={488} y2={y+26} color={c} label="indexed"/>
      <Box x={490} y={y} label="Google SEO" sub="Organic traffic" color={c} w={120}/>
      <Arrow x1={614} y1={y+26} x2={648} y2={y+26} color={c} label="AdSense"/>
      <Box x={650} y={y} label="Revenue" sub="Monetization" color={c} dark/>
      {/* labels top */}
      {['Input','Frontend','Logic','SEO','Output'].map((l,i)=>(
        <text key={l} x={75+i*158} y={72} textAnchor="middle" fill={c} fontSize="8"
              fontFamily="monospace" opacity="0.5" style={{ textTransform: 'uppercase' }}>{l}</text>
      ))}
    </Wrap>
  )
}

/* ─── Ventilasi IoT ──────────────────────────────────────── */
function VensilasiIoTDiagram() {
  const c = '#4f8ef7'
  return (
    <Wrap>
      <Bg color={c}/>
      {/* sensor column */}
      {[{l:'MH-Z19B',s:'CO₂ Sensor',y:24},{l:'DHT22',s:'Temp & Hum',y:84},{l:'SDS011',s:'PM2.5 Dust',y:144}].map(b=>(
        <Box key={b.l} x={20} y={b.y} label={b.l} sub={b.s} color={c} w={105}/>
      ))}
      {/* arrows to ESP32 */}
      {[50,110,170].map(sy=>(
        <BentArrow key={sy} points={[[125,sy],[150,sy],[150,110],[175,110]]} color={c} label="UART"/>
      ))}
      <Box x={177} y={84} label="ESP32" sub="MQTT Client" color={c} dark w={105}/>
      <Arrow x1={285} y1={110} x2={320} y2={110} color={c} label="WiFi MQTT"/>
      <Box x={322} y={84} label="MQTT Broker" sub="Cloud Server" color={c} w={115}/>
      <Arrow x1={440} y1={110} x2={475} y2={110} color={c} label="subscribe"/>
      <Box x={477} y={84} label="Dashboard" sub="Monitoring UI" color={c} w={110}/>
      <Arrow x1={590} y1={110} x2={625} y2={110} color={c} label="trigger"/>
      <Box x={627} y={84} label="Ventilator" sub="Auto Control" color={c} dark w={110}/>
    </Wrap>
  )
}

/* ─── Monitoring EV ──────────────────────────────────────── */
function MonitoringEVDiagram() {
  const c = '#3dd68c'
  return (
    <Wrap>
      <Bg color={c}/>
      {[{l:'Rotary Encoder',s:'Speed ISR',y:24},{l:'Temp Sensor',s:'ADC Reading',y:84},{l:'Volt Sensor',s:'Batt Level',y:144}].map(b=>(
        <Box key={b.l} x={20} y={b.y} label={b.l} sub={b.s} color={c} w={115}/>
      ))}
      {[50,110,170].map(sy=>(
        <BentArrow key={sy} points={[[135,sy],[162,sy],[162,110],[177,110]]} color={c}/>
      ))}
      <Box x={179} y={84} label="ESP32" sub="ISR + Timer" color={c} dark w={105}/>
      <Arrow x1={287} y1={110} x2={322} y2={110} color={c} label="MQTT"/>
      <Box x={324} y={84} label="Cloud Server" sub="Data Store" color={c} w={115}/>
      <Arrow x1={442} y1={110} x2={477} y2={110} color={c} label="analyze"/>
      <Box x={479} y={84} label="Anomaly" sub="Detection" color={c} w={105}/>
      <Arrow x1={587} y1={110} x2={622} y2={110} color={c} label="alert"/>
      <Box x={624} y={84} label="Alert" sub="Early Warning" color={c} dark w={115}/>
    </Wrap>
  )
}

/* ─── LSTM ───────────────────────────────────────────────── */
function LSTMDiagram() {
  const c = '#a78bfa'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="Pyranometer" sub="Solar Sensor" color={c} w={115}/>
      <Arrow x1={138} y1={y+26} x2={173} y2={y+26} color={c} label="MQTT"/>
      <Box x={175} y={y} label="Preprocessing" sub="Clean + Normalize" color={c} w={130}/>
      <Arrow x1={308} y1={y+26} x2={343} y2={y+26} color={c} label="sequences"/>
      <Box x={345} y={y} label="LSTM Model" sub="TensorFlow/Keras" color={c} dark w={120}/>
      <Arrow x1={468} y1={y+26} x2={503} y2={y+26} color={c} label="predict"/>
      <Box x={505} y={y} label="Prediction" sub="Next-hour GHI" color={c} w={110}/>
      <Arrow x1={618} y1={y+26} x2={653} y2={y+26} color={c} label="score"/>
      <Box x={655} y={y} label="Evaluation" sub="RMSE · MAE · R²" color={c} w={90}/>
    </Wrap>
  )
}

/* ─── Deschain ────────────────────────────────────────────── */
function DeschainDiagram() {
  const c = '#f97316'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="UMKM" sub="Kebutuhan Pengadaan" color={c} w={110}/>
      <Arrow x1={133} y1={y+26} x2={168} y2={y+26} color={c} label="match"/>
      <Box x={170} y={y} label="AI Group Matching" sub="Jaccard Similarity" color={c} w={135}/>
      <Arrow x1={308} y1={y+26} x2={343} y2={y+26} color={c} label="consult"/>
      <Box x={345} y={y} label="RAG Consultation" sub="4-layer fallback" color={c} dark w={130}/>
      <Arrow x1={478} y1={y+26} x2={513} y2={y+26} color={c} label="advise"/>
      <Box x={515} y={y} label="Fine-tuned LLM" sub="Mistral-7B QLoRA" color={c} w={110}/>
      <Arrow x1={628} y1={y+26} x2={663} y2={y+26} color={c} label="export"/>
      <Box x={665} y={y} label="Credit Trail" sub="POJK 29/2024" color={c} dark w={90}/>
    </Wrap>
  )
}

/* ─── Auto Feeder ────────────────────────────────────────── */
function AutoFeederDiagram() {
  const c = '#4f8ef7'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="RTC DS3231" sub="Real Time Clock" color={c}/>
      <Arrow x1={134} y1={y+26} x2={169} y2={y+26} color={c} label="I²C time"/>
      <Box x={171} y={y} label="ESP32" sub="Scheduler Logic" color={c} dark w={115}/>
      <Arrow x1={289} y1={y+26} x2={324} y2={y+26} color={c} label="PWM signal"/>
      <Box x={326} y={y} label="Servo Motor" sub="Dispenser Arm" color={c}/>
      <Arrow x1={440} y1={y+26} x2={475} y2={y+26} color={c} label="rotates"/>
      <Box x={477} y={y} label="Food Gate" sub="Portion Control" color={c}/>
      <Arrow x1={591} y1={y+26} x2={626} y2={y+26} color={c} label="drops"/>
      <Box x={628} y={y} label="Betta Tank" sub="Fish Aquarium" color={c} dark/>
    </Wrap>
  )
}

/* ─── Plant Watering ─────────────────────────────────────── */
function PlantWateringDiagram() {
  const c = '#3dd68c'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="Soil Sensor" sub="Resistive probe" color={c}/>
      <Arrow x1={134} y1={y+26} x2={169} y2={y+26} color={c} label="analog V"/>
      <Box x={171} y={y} label="ADC" sub="ATmega16 ADC" color={c}/>
      <Arrow x1={285} y1={y+26} x2={320} y2={y+26} color={c} label="digital val"/>
      <Box x={322} y={y} label="ATmega16" sub="AVR MCU logic" color={c} dark w={115}/>
      <Arrow x1={440} y1={y+26} x2={475} y2={y+26} color={c} label="GPIO relay"/>
      <Box x={477} y={y} label="Relay" sub="5V switching" color={c}/>
      <Arrow x1={591} y1={y+26} x2={626} y2={y+26} color={c} label="powers"/>
      <Box x={628} y={y} label="Water Pump" sub="→ Plant soil" color={c} dark w={110}/>
    </Wrap>
  )
}

/* ─── Irigasi AVR ────────────────────────────────────────── */
function IrigasiAVRDiagram() {
  const c = '#3dd68c'
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20} y={84} label="Soil Sensor" sub="Analog moisture" color={c}/>
      <Arrow x1={134} y1={110} x2={169} y2={110} color={c} label="ADC"/>
      <Box x={171} y={84} label="AVR MCU" sub="Timer ISR" color={c} dark w={105}/>
      {/* two outputs */}
      <BentArrow points={[[279,95],[310,95],[310,52],[325,52]]} color={c} label="PWM"/>
      <BentArrow points={[[279,125],[310,125],[310,168],[325,168]]} color={c} label="I²C"/>
      <Box x={327} y={26} label="Water Pump" sub="PWM speed ctrl" color={c} w={120}/>
      <Box x={327} y={144} label="OLED Display" sub="Real-time data" color={c} w={120}/>
      <Arrow x1={450} y1={52} x2={485} y2={52} color={c} label="irrigates"/>
      <Box x={487} y={26} label="Irrigation" sub="Field rows" color={c} dark w={110}/>
      <Arrow x1={450} y1={170} x2={485} y2={170} color={c} label="shows"/>
      <Box x={487} y={144} label="Status UI" sub="Moisture + pump" color={c} w={110}/>
    </Wrap>
  )
}

/* ─── Web Pengadaan ──────────────────────────────────────── */
function WebPengadaanDiagram() {
  const c = '#f97316'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="Admin User" sub="Browser client" color={c}/>
      <Arrow x1={134} y1={y+26} x2={169} y2={y+26} color={c} label="HTTP req"/>
      <Box x={171} y={y} label="Laravel MVC" sub="PHP Backend" color={c} dark w={115}/>
      <Arrow x1={289} y1={y+26} x2={324} y2={y+26} color={c} label="Eloquent ORM"/>
      <Box x={326} y={y} label="MySQL DB" sub="Relational data" color={c} w={110}/>
      <Arrow x1={440} y1={y+26} x2={475} y2={y+26} color={c} label="REST API"/>
      <Box x={477} y={y} label="Reports" sub="PDF + Filter" color={c} w={100}/>
      <Arrow x1={580} y1={y+26} x2={615} y2={y+26} color={c} label="export"/>
      <Box x={617} y={y} label="Management" sub="Decision making" color={c} dark w={120}/>
    </Wrap>
  )
}

/* ─── SMBD ───────────────────────────────────────────────── */
function SMBDDiagram() {
  const c = '#fbbf24'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="Dataset" sub="Raw data source" color={c}/>
      <Arrow x1={134} y1={y+26} x2={169} y2={y+26} color={c} label="load"/>
      <Box x={171} y={y} label="Python Script" sub="sqlite3 / psycopg2" color={c} dark w={120}/>
      <Arrow x1={294} y1={y+26} x2={329} y2={y+26} color={c} label="DDL / DML"/>
      <Box x={331} y={y} label="SQL Database" sub="Tables + Schema" color={c} w={115}/>
      <Arrow x1={449} y1={y+26} x2={484} y2={y+26} color={c} label="SELECT"/>
      <Box x={486} y={y} label="Query Engine" sub="JOIN · GROUP BY" color={c} w={120}/>
      <Arrow x1={609} y1={y+26} x2={644} y2={y+26} color={c} label="output"/>
      <Box x={646} y={y} label="Analysis" sub="Results + Docs" color={c} dark w={100}/>
    </Wrap>
  )
}

/* ─── YOLO Human Detection ───────────────────────────────── */
function YoloDiagram() {
  const c = '#a78bfa'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="ESP32-CAM" sub="MJPEG Stream" color={c} w={115}/>
      <Arrow x1={138} y1={y+26} x2={173} y2={y+26} color={c} label="stream"/>
      <Box x={175} y={y} label="Flask Server" sub="Pull Frames" color={c} w={120}/>
      <Arrow x1={300} y1={y+26} x2={335} y2={y+26} color={c} label="infer"/>
      <Box x={337} y={y} label="YOLOv8n" sub="Human Detection" color={c} dark w={130}/>
      <Arrow x1={472} y1={y+26} x2={507} y2={y+26} color={c} label="annotate"/>
      <Box x={509} y={y} label="OpenCV" sub="Draw Boxes" color={c} w={115}/>
      <Arrow x1={629} y1={y+26} x2={664} y2={y+26} color={c} label="stream"/>
      <Box x={666} y={y} label="Browser" sub="Live View" color={c} dark w={90}/>
    </Wrap>
  )
}

/* ─── Default fallback ───────────────────────────────────── */
function DefaultDiagram({ color }) {
  const c = color || '#93939f'
  const y = 84
  return (
    <Wrap>
      <Bg color={c}/>
      <Box x={20}  y={y} label="Input" sub="Data source" color={c}/>
      <Arrow x1={134} y1={y+26} x2={169} y2={y+26} color={c}/>
      <Box x={171} y={y} label="Processing" sub="Core logic" color={c} dark w={120}/>
      <Arrow x1={294} y1={y+26} x2={329} y2={y+26} color={c}/>
      <Box x={331} y={y} label="Output" sub="Result" color={c}/>
    </Wrap>
  )
}

/* ─── Main export ────────────────────────────────────────── */
const DIAGRAMS = {
  'ti-toolkit':            TiToolkitDiagram,
  'ventilasi-iot':         VensilasiIoTDiagram,
  'monitoring-ev':         MonitoringEVDiagram,
  'prediksi-radiasi-lstm': LSTMDiagram,
  'deschain':              DeschainDiagram,
  'yolo-human-detection':  YoloDiagram,
  'automatic-feeder-betta':AutoFeederDiagram,
  'plant-watering':        PlantWateringDiagram,
  'irigasi-avr':           IrigasiAVRDiagram,
  'web-pengadaan-barang':  WebPengadaanDiagram,
  'smbd':                  SMBDDiagram,
}

export default function ProjectDiagram({ projectId, color }) {
  const Diagram = DIAGRAMS[projectId]
  if (!Diagram) return <DefaultDiagram color={color} />
  return <Diagram color={color} />
}
