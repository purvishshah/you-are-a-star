import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const base = import.meta.env.BASE_URL;
const moments = [
  {id:'hello',art:base+'art/garden.svg',alt:'A little garden gate opening into warm afternoon light',className:'garden',lines:<>The world keeps asking<br/>what comes next.<br/><em>As if the answer is always in a hurry.</em></>,note:<>New tools. New tricks. New ways to make a thing.<br/>I wanted to leave you something quieter.</>},
  {id:'noticing',art:base+'art/window.svg',alt:'An open window, flowers and the last of the afternoon sun',className:'window',lines:<>You notice the things<br/>most people walk past.</>,note:<>The little detail that changes a room.<br/>The pause before someone says they're fine.<br/>The light finding its way through a window.</>},
  {id:'invisible',art:base+'art/studio.svg',alt:'A journal, tea and wildflowers on a sunlit desk',className:'studio',lines:<>Some of the best things<br/>you do leave no evidence.</>,note:<>No screenshot for making someone feel heard.<br/>No portfolio piece for asking the kinder question.<br/>No applause for caring about the small stuff.</>},
  {id:'always',art:base+'art/night.svg',alt:'A quiet garden path under the first stars',className:'night',lines:<>So, when everything<br/>changes again —</>,note:<>Keep your eye for the small things.<br/>Make what you love. Leave room for wonder.<br/>And please, don't let the world hurry you.</>,signoff:<>Always in your corner,<br/><span>Purvish</span></>}
];

function App(){
 const [active,setActive]=useState(0);
 const [spark,setSpark]=useState(0);
 const scroller=useRef(null);
 const touch=useRef(null);
 const go=(index)=>{
  const next=Math.max(0,Math.min(moments.length-1,index));
  if(next===active)return;
  setActive(next);setSpark(v=>v+1);
  scroller.current?.children[next]?.scrollIntoView({behavior:'smooth',block:'start'});
 };
 useEffect(()=>{
  const root=scroller.current;if(!root)return;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting)setActive(Number(entry.target.dataset.index));
  }),{root,threshold:.65});
  Array.from(root.children).forEach(child=>observer.observe(child));
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  const key=e=>{if(['ArrowDown','ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(active+1)}if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(active-1)}};
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[active]);
 const advance=e=>{
  if(e.target.closest('a,button'))return;
  if(e.clientX>window.innerWidth*.82 && active<moments.length-1)go(active+1);
  else if(e.clientX<window.innerWidth*.18 && active>0)go(active-1);
  else if(active<moments.length-1)go(active+1);
 };
 return <div className="poem">
  <main className="moments" ref={scroller} aria-label="A little note for Moupiya"
   onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}}}
   onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x;const dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy))go(active+(dx<0?1:-1));touch.current=null}}>
   {moments.map((moment,index)=><section className={`moment ${moment.className}`} key={moment.id} data-index={index} onClick={advance}>
    <div className="art"><img src={moment.art} alt={moment.alt} onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('art-missing')}}/><span className="paint-mark">✳</span><span className="art-grain"/></div>
    <div className="words">
     {index===0&&<p className="to">Moupiya,</p>}
     <h1>{moment.lines}</h1><p className="note">{moment.note}</p>
     {moment.signoff&&<p className="signoff">{moment.signoff}</p>}
    </div>
    <span className="edge-hint" aria-hidden="true">{index===0?'✳':index===moments.length-1?'✧':'✳'}</span>
   </section>)}
  </main>
  <div key={spark} className="magic-bloom" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
  <div className="progress-constellation" aria-hidden="true">{moments.map((m,i)=><span key={m.id} className={i===active?'lit':''}>✦</span>)}</div>
 </div>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
