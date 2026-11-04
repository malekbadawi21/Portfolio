// Renders a body from `columns` exactly as written: paragraphs split on blank
// lines, and names of tools that already appear in the text set in mono.
const TECH = [
  'Microsoft Fabric', 'Power BI', 'Azure Logic Apps', 'Azure Table Storage', 'Unreal Engine',
  'BRISQUE', 'MRIQC', 'FreeSurfer', 'Twilio', 'React', 'FastAPI', 'PostgreSQL', 'Blueprints',
  'UMG', 'JSON', 'MR-ART', 'Python', 'OpenCV', 'MediaPipe', 'GitHub', 'CSC 4700',
]
const pattern = new RegExp(`(${TECH.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')

function Line({ text }) {
  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? <span key={i} className="tech">{part}</span> : part,
  )
}

export default function Rich({ text }) {
  if (!text) return null
  return text.split('\n\n').map((para, i) => (
    <p key={i} className="body"><Line text={para} /></p>
  ))
}
