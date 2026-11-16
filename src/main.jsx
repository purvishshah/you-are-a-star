import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Heart, Leaf, Mail, Menu, Sparkles, X } from 'lucide-react';
import './styles.css';

const chapters = [
  { id:'welcome', number:'00', label:'A little pause', title:'Before we begin, take a breath.', image:null },
  { id:'world', number:'01', label:'The changing world', title:'A world that can make almost anything.', image:null },
  { id:'notice', number:'02', label:'The human eye', title:'You notice.', image:null },
  { id:'impact', number:'03', label:'The invisible work', title:'Some of your best work is hard to show.', image:null },
  { id:'person', number:'04', label:'The person beyond the title', title:'You are more than the things you make.', image:null },
  { id:'future', number:'05', label:'What comes next', title:'The world will keep changing. Keep becoming.', image:null },
  { id:'note', number:'06', label:'A little note to keep', title:'Keep seeing. Keep wondering. Keep creating.', image:null },
];
const discoveries = [
  { icon:'🌱', title:'A little plant', text:'Someone noticed it needed sunlight. The difference between existing and thriving is sometimes just a little care.' },
  { icon:'🪟', title:'An open window', text:'Someone thought about the person inside. Not just the room, but the experience of being in it.' },
  { icon:'🪑', title:'An empty chair', text:'Someone remembered to leave room for another person. Good design makes space for people.' },
  { icon:'🧩', title:'A missing piece', text:'Someone asked a question nobody else had thought to ask.' },
  { icon:'💌', title:'A little letter', text:'Someone wanted another person to feel seen. Sometimes that is the most meaningful thing we can create.' },
];
const permissions = [
  ['📖','Read a book without turning it into a lesson.'],
  ['🌷','Make something just because.'],
  ['☁️','Take a break without earning it first.'],
  ['🪴','Be a beginner, whenever you like.'],
  ['✏️','Make something imperfect and keep it anyway.'],
  ['☀️','Leave a little room for doing nothing.'],
];

function App(){
  const [active,setActive]=useState(0);
  const [found,setFound]=useState([]);
  const [generated,setGenerated]=useState(0);
  const [collected,setCollected]=useState([]);
  const [letterOpen,setLetterOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const current=chapters[active];
  const progress=Math.round((active/(chapters.length-1))*100);
  const next=()=>setActive(v=>Math.min(v+1,chapters.length-1));
  const prev=()=>setActive(v=>Math.max(v-1,0));
  const go=(i)=>{setActive(i);setMenuOpen(false);window.scrollTo({top:0,behavior:'smooth'});};
  useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});},[active]);
  useEffect(()=>{const onKey=e=>{if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();if(e.key==='Escape'){setMenuOpen(false);setLetterOpen(false)}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[]);
  const bloomCount=Math.max(0,active);
  const toggleFound=i=>setFound(old=>old.includes(i)?old.filter(x=>x!==i):[...old,i]);
  const togglePermission=i=>setCollected(old=>old.includes(i)?old.filter(x=>x!==i):[...old,i]);
  const reset=()=>{setFound([]);setCollected([]);setGenerated(0);go(0);};

  return <div className="site-shell">
    <header className="topbar">
      <button className="wordmark" onClick={()=>go(0)} aria-label="Back to beginning"><span className="wordmark-flower">✳</span><span>A little reminder</span></button>
      <div className="topbar-center">A STORY FOR YOU</div>
      <button className="menu-button" onClick={()=>setMenuOpen(v=>!v)} aria-label="Open chapter menu">{menuOpen?<X size={19}/>:<Menu size={19}/>}<span>Chapters</span></button>
    </header>
    {menuOpen&&<nav className="chapter-menu" aria-label="Chapters">{chapters.map((c,i)=><button key={c.id} onClick={()=>go(i)} className={i===active?'selected':''}><span>{c.number}</span>{c.label}{i<active&&<Check size={14}/>}</button>)}</nav>}
    <main className="page-wrap">
      <div className="progress-row"><div className="progress-track"><span style={{width:`${progress}%`}}/></div><span>{String(active).padStart(2,'0')} / 06</span></div>
      {active===0&&<section className="scene welcome-scene">
        <div className="welcome-copy"><span className="eyebrow">A LITTLE PLACE FOR YOU</span><h1>The world is moving<br/><em>rather fast,</em> isn't it?</h1><p>New tools. New possibilities. New definitions of what it means to create.</p><p>So, you, I made you a little place to pause.</p><p className="quiet-line">No deadlines here. Nothing to prove. Just a little walk through the things that make you, you.</p><button className="primary-button" onClick={next}>Let's wander <ArrowRight size={17}/></button><span className="hand-note">take your time <span>↗</span></span></div>
        <div className="welcome-art art-frame"><img src="/art/garden-door.jpg" alt="A flower-covered doorway opening onto a sunlit garden path"/><span className="art-caption">somewhere quiet, just for a little while</span><span className="art-stamp">✿</span></div><div className="scroll-cue"><ArrowDown size={15}/> A small journey awaits</div>
      </section>}
      {active===1&&<section className="scene split-scene">
        <div className="chapter-copy"><span className="eyebrow">CHAPTER 01 · THE CHANGING WORLD</span><h1>A world that can make <em>almost anything.</em></h1><p className="lead">A picture. A pattern. A thousand possibilities. All with a little prompt.</p><p>Quite extraordinary. And perhaps a little overwhelming.</p><p className="question">But if we can make almost anything…<br/><em>who decides what is worth making?</em></p><button className="primary-button" onClick={next}>I have a thought <ArrowRight size={17}/></button></div>
        <div className="interactive-art collage-art"><img src="/art/paper-collage.jpg" alt="Layered paper and abstract watercolor forms"/><div className="generate-card"><span className="tiny-label">THE POSSIBILITY MACHINE</span><div className="generated-shapes" key={generated}><i/><i/><i/><i/><i/></div><button className="text-button" onClick={()=>setGenerated(v=>v+1)}>Make another <Sparkles size={14}/></button><span className="generated-count">{generated===0?'Endless possibilities':`${generated+1} little variations`}</span></div><span className="floating-note">so many ways<br/>to begin…</span></div>
      </section>}
      {active===2&&<section className="scene notice-scene">
        <div className="chapter-heading"><span className="eyebrow">CHAPTER 02 · THE HUMAN EYE</span><h1>You <em>notice.</em></h1><p>When something feels a little off. When a journey could be kinder. When a detail changes everything.</p><p>You look beyond what is there. You imagine what could be.</p></div>
        <div className="notice-layout"><div className="notice-art art-frame"><img src="/art/window.jpg" alt="An open window looking onto a flower-filled garden"/><span className="art-caption">look a little closer</span></div><div className="discovery-panel"><span className="tiny-label">FIVE LITTLE THINGS</span><p className="discovery-intro">A small exercise in noticing. Tap the things that catch your eye.</p><div className="discovery-list">{discoveries.map((d,i)=><button key={d.title} className={`discovery-item ${found.includes(i)?'found':''}`} onClick={()=>toggleFound(i)} aria-expanded={found.includes(i)}><span className="discovery-icon">{d.icon}</span><span className="discovery-name">{d.title}</span><span className="discovery-check">{found.includes(i)?<Check size={15}/>:<ArrowUpRight size={15}/>}</span>{found.includes(i)&&<span className="discovery-text">{d.text}</span>}</button>)}</div><div className="discovery-progress"><span>{found.length} of 5 discovered</span><div><i style={{width:`${found.length*20}%`}}/></div></div>{found.length===5&&<p className="all-found">Perhaps design is about helping people experience the world a little differently. ✿</p>}</div></div><button className="primary-button chapter-next" onClick={next}>Keep wandering <ArrowRight size={17}/></button>
      </section>}
      {active===3&&<section className="scene impact-scene">
        <div className="impact-intro"><span className="eyebrow">CHAPTER 03 · THE INVISIBLE WORK</span><h1>Some of your best work<br/>is <em>hard to show.</em></h1><p>The confidence you helped someone find. The question that changed a team's direction. The person who felt heard.</p></div>
        <div className="impact-body"><div className="impact-art art-frame"><img src="/art/books-studio.jpg" alt="Books, a warm cup and a creative studio still life"/></div><div className="impact-note"><span className="hand-note">the work between the lines</span><div className="impact-words"><p>Not every meaningful thing leaves a screenshot.</p><p>Not every contribution fits inside a case study.</p><h2>Some of your best work lives <em>in other people.</em></h2></div><div className="milestones"><span>Making</span><span>Simplifying</span><span>Collaborating</span><span>Mentoring</span><span>Leading</span></div></div></div><button className="primary-button chapter-next" onClick={next}>A little further <ArrowRight size={17}/></button>
      </section>}
      {active===4&&<section className="scene person-scene">
        <div className="person-copy"><span className="eyebrow">CHAPTER 04 · THE PERSON BEYOND THE TITLE</span><h1>You are more than<br/>the things you <em>make.</em></h1><p>You don't have to turn every curiosity into a project, or every quiet moment into progress.</p><p>You are allowed to simply be.</p><span className="hand-note">a few permissions, just in case…</span></div>
        <div className="keepsake-board"><div className="keepsake-top"><span className="tiny-label">A LITTLE PERMISSION SLIP</span><span className="stamp">FOR YOU · WITH CARE</span></div><div className="permission-grid">{permissions.map((p,i)=><button key={p[1]} onClick={()=>togglePermission(i)} className={`permission ${collected.includes(i)?'collected':''}`} aria-pressed={collected.includes(i)}><span className="permission-icon">{p[0]}</span><span>{p[1]}</span><i>{collected.includes(i)?<Check size={14}/>:<span>＋</span>}</i></button>)}</div><div className="keepsake-footer">{collected.length?`${collected.length} little reminder${collected.length>1?'s':''} tucked away`:'Tap a note to tuck it into your envelope'} <Mail size={15}/></div></div><button className="primary-button chapter-next" onClick={next}>I'll keep that close <ArrowRight size={17}/></button>
      </section>}
      {active===5&&<section className="scene future-scene">
        <div className="future-art art-frame"><img src="/art/sunset-flight.jpg" alt="A paper airplane crossing a pastel sunset landscape"/><span className="flight-path">· · · · · · · · · · ✈</span></div>
        <div className="future-copy"><span className="eyebrow">CHAPTER 05 · WHAT COMES NEXT</span><h1>The world will keep changing.<br/><em>Keep becoming.</em></h1><p>There will be new tools, new questions and new ways to create. You get to learn from them. Play with them. Make them your own.</p><div className="keep-list"><span><Leaf size={15}/> Keep your curiosity.</span><span><Heart size={15}/> Keep your empathy.</span><span><Sparkles size={15}/> Keep asking why.</span></div><p className="future-final">The world doesn't just need people who make things. It needs people who care about what they make.</p><button className="primary-button" onClick={next}>Carry this with you <ArrowRight size={17}/></button></div>
      </section>}
      {active===6&&<section className="scene note-scene">
        <div className="note-art art-frame"><img src="/art/garden-path.jpg" alt="A winding flower-filled garden path in the evening light"/><div className="note-seed">✿</div></div>
        <div className="final-letter"><span className="eyebrow">FOR THE DAYS YOU NEED A REMINDER</span><h1>Keep seeing. Keep wondering.<br/><em>Keep creating.</em></h1><p>You don't have to outrun the future. You get to help imagine it.</p><button className="letter-button" onClick={()=>setLetterOpen(true)}><Mail size={17}/> Open your little note</button><span className="final-signoff">With a little faith in all that you are,<br/><em>A friend</em></span><button className="replay-button" onClick={reset}>Take the little walk again ↗</button></div>
      </section>}
      <footer className="page-footer"><div className="garden-progress" aria-label={`${bloomCount} flowers have bloomed`}>{Array.from({length:6},(_,i)=><span key={i} className={i<bloomCount?'bloomed':''}>✿</span>)}</div><span className="footer-caption">a little garden grows as you wander</span><div className="page-controls"><button onClick={prev} disabled={active===0} aria-label="Previous chapter"><ArrowLeft size={16}/></button><button onClick={next} disabled={active===6} aria-label="Next chapter"><ArrowRight size={16}/></button></div></footer>
    </main>
    {letterOpen&&<div className="modal-backdrop" onClick={()=>setLetterOpen(false)}><div className="letter-modal" role="dialog" aria-modal="true" aria-labelledby="letter-title" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setLetterOpen(false)} aria-label="Close letter"><X size={18}/></button><span className="eyebrow">A LITTLE NOTE, JUST FOR YOU</span><div className="letter-flower">✿</div><h2 id="letter-title">Dear you,</h2><p>I don't know what the future of design will look like. But I hope you keep bringing your curiosity, your care and your particular way of seeing into whatever comes next.</p><p>You don't have to prove that you're still relevant. You get to keep growing, changing, learning and making things that matter to you.</p><p className="letter-last">The world still needs your kind of human.</p><span className="final-signoff">With a little faith in all that you are,<br/><em>A friend</em></span></div></div>}
  </div>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);