import React,{useEffect,useRef,useState}from'react';
import{createRoot}from'react-dom/client';
import'./styles.css';

const moments=[
{id:'hello',art:'art/garden.jpg',alt:'Moupiya in a flower-filled garden',className:'portrait',lines:<>The world keeps asking<br/>what comes next.<br/><em>As if the answer is always in a hurry.</em></>,note:<>New tools. New tricks. New ways to make a thing.<br/>I wanted to leave you something quieter.</>},
{id:'noticing',art:'art/hilltop.jpg',alt:'Moupiya by a sunlit window',className:'window',lines:<>You notice the things<br/>most people walk past.</>,note:<>The little detail that changes a room.<br/>The pause before someone says they're fine.<br/>The light finding its way through a window.</>},
{id:'invisible',art:'art/studio.jpg',alt:'Moupiya in her creative studio surrounded by sketches',className:'studio',lines:<>Some of the best things<br/>you do leave no evidence.</>,note:<>No screenshot for making someone feel heard.<br/>No portfolio piece for asking the kinder question.<br/>No applause for caring about the small stuff.</>},
{id:'mother-designer',art:'art/playtime.jpg',alt:'Moupiya sharing a warm moment with her child at home',className:'mother',lines:<>You are a mother,<br/>and a designer too.</>,note:<>Making little worlds feel warm and new.<br/>With thoughtful hands and a generous heart,<br/>you turn the ordinary into art.</>},
{id:'ending',art:'art/mother-designer.jpg',alt:'Moupiya beneath a soft evening sky',className:'night',lines:<>So, when everything<br/>changes again —</>,note:<>Keep your eye for the small things.<br/>Make what you love. Leave room for wonder.<br/>And please, don't let the world hurry you.</>,signoff:<>Your well wisher,<br/><span>Purvish</span></>}
];
function App(){
 const[active,setActive]=useState(0),[direction,setDirection]=useState(1),[spark,setSpark]=useState(0);
 const touch=useRef(null),busy=useRef(false);
 const go=(n)=>{
  const next=Math.max(0,Math.min(moments.length-1,n));if(next===active||busy.current)return;
  busy.current=true;setDirection(next>active?1:-1);setSpark(v=>v+1);
  const change=()=>setActive(next);
  if(document.startViewTransition){document.startViewTransition(change).finished.finally(()=>{busy.current=false})}
  else{change();window.setTimeout(()=>{busy.current=false},850)}
 };
 useEffect(()=>{const key=e=>{if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();go(active+1)}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(active-1)}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[active]);
 const onTouchEnd=e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x;const dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.2)go(active+(dx<0?1:-1));else if(Math.abs(dx)<12&&Math.abs(dy)<12)go(active+1);touch.current=null};
 const moment=moments[active];
 return <div className="poem" onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}}} onTouchEnd={onTouchEnd}>
  <main className="stage" key={moment.id} style={{'--direction':direction}}>
   <section className={`moment ${moment.className}`} aria-label={`Note for Moupiya, part ${active+1} of ${moments.length}`} onClick={e=>{if(e.target.closest("button"))return;go(active+1)}}>
    <div className="art"><img src={import.meta.env.BASE_URL + moment.art} alt={moment.alt}/><span className="paint-mark">✳</span><span className="art-grain"/></div>
    <div className="words">{active===0&&<p className="to">Moupiya,</p>}<h1>{moment.lines}</h1><p className="note">{moment.note}</p>{moment.signoff&&<p className="signoff">{moment.signoff}</p>}</div>
   </section>
  </main>
  <div key={spark} className="magic-bloom" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i}/>)}</div>
  <div className="progress-constellation" aria-label={`Page ${active+1} of ${moments.length}`}>{moments.map((m,i)=><button key={m.id} className={i===active?'lit':''} aria-label={`Go to page ${i+1}`} onClick={()=>go(i)}>✦</button>)}</div>
 </div>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
