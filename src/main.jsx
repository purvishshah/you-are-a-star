import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './styles.css';

const moments = [
  {
    id: 'hello',
    art: '/art/garden.svg',
    alt: 'A little garden gate opening into warm afternoon light',
    className: 'garden',
    lines: <>The world keeps asking<br/>what comes next.<br/><em>As if the answer is always in a hurry.</em></>,
    note: <>New tools. New tricks. New ways to make a thing.<br/>I wanted to leave you something quieter.</>,
  },
  {
    id: 'noticing',
    art: '/art/window.svg',
    alt: 'An open window, flowers and the last of the afternoon sun',
    className: 'window',
    lines: <>You notice the things<br/>most people walk past.</>,
    note: <>The little detail that changes a room.<br/>The pause before someone says they're fine.<br/>The light finding its way through a window.</>,
  },
  {
    id: 'invisible',
    art: '/art/studio.svg',
    alt: 'A journal, tea and wildflowers on a sunlit desk',
    className: 'studio',
    lines: <>Some of the best things<br/>you do leave no evidence.</>,
    note: <>No screenshot for making someone feel heard.<br/>No portfolio piece for asking the kinder question.<br/>No applause for caring about the small stuff.</>,
  },
  {
    id: 'always',
    art: '/art/night.svg',
    alt: 'A quiet garden path under the first stars',
    className: 'night',
    lines: <>So, when everything<br/>changes again —</>,
    note: <>Keep your eye for the small things.<br/>Make what you love. Leave room for wonder.<br/>And please, don't let the world hurry you.</>,
    signoff: <>Always in your corner,<br/><span>Purvish</span></>,
  },
];

function App() {
  const [active, setActive] = useState(0);
  const scroller = useRef(null);
  const go = (index) => {
    const next = Math.max(0, Math.min(moments.length - 1, index));
    setActive(next);
    scroller.current?.children[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
      });
    }, { root, threshold: 0.62 });
    Array.from(root.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') go(active + 1);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') go(active - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return <div className="poem">
    <main className="moments" ref={scroller} aria-label="A little note for Moupiya">
      {moments.map((moment, index) => <section className={`moment ${moment.className}`} key={moment.id} data-index={index}>
        <div className="art">
          <img src={moment.art} alt={moment.alt} />
          <span className="paint-mark">✳</span>
        </div>
        <div className="words">
          {index === 0 && <p className="to">Moupiya,</p>}
          <h1>{moment.lines}</h1>
          <p className="note">{moment.note}</p>
          {moment.signoff && <p className="signoff">{moment.signoff}</p>}
        </div>
      </section>)}
    </main>
    <nav className="wayfinding" aria-label="Move through the note">
      <button className="arrow" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous"><ArrowLeft size={17}/></button>
      <div className="dots">{moments.map((moment, index) => <button key={moment.id} onClick={() => go(index)} className={active === index ? 'dot active' : 'dot'} aria-label={`Go to moment ${index + 1}`} aria-current={active === index ? 'step' : undefined}/>)}</div>
      <button className="arrow" onClick={() => go(active + 1)} disabled={active === moments.length - 1} aria-label="Next"><ArrowRight size={17}/></button>
    </nav>
    <span className="margin-flower" aria-hidden="true">✿</span>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
