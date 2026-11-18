const paintings = [
  {title:"Colour in motion",category:"abstract",type:"Abstract"},
  {title:"A quiet afternoon",category:"nature",type:"Nature & still life"},
  {title:"Earth & form",category:"abstract",type:"Abstract"},
  {title:"The little things",category:"nature",type:"Nature & still life"},
  {title:"Finding balance",category:"studies",type:"Studies"},
  {title:"A study in light",category:"studies",type:"Studies"}
];
const grid=document.getElementById("art-grid");
function renderGallery(filter="all"){
  const visible=paintings.filter(p=>filter==="all"||p.category===filter);
  grid.innerHTML=visible.map((p)=>`<article class="art-card" tabindex="0" role="button" aria-label="View ${p.title}">
    <div class="artwork"><span class="placeholder-label">Your painting here</span></div>
    <div class="art-meta"><h3>${p.title}</h3><span>${p.type}</span></div>
  </article>`).join("");
  grid.querySelectorAll(".art-card").forEach((card,i)=>{
    const open=()=>showPainting(visible[i]);
    card.addEventListener("click",open);
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  });
}
function showPainting(p){
  const lightbox=document.getElementById("lightbox");
  document.getElementById("lightbox-art").style.background=getComputedStyle([...grid.querySelectorAll(".art-card")].find(c=>c.querySelector("h3").textContent===p.title).querySelector(".artwork")).background;
  document.getElementById("lightbox-title").textContent=p.title+" — "+p.type;
  lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");
}
function closeLightbox(){const l=document.getElementById("lightbox");l.classList.remove("open");l.setAttribute("aria-hidden","true");}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelector(".filter.active").classList.remove("active");btn.classList.add("active");renderGallery(btn.dataset.filter);
}));
document.querySelector(".lightbox-close").addEventListener("click",closeLightbox);
document.getElementById("lightbox").addEventListener("click",e=>{if(e.target.id==="lightbox")closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();});
const menu=document.querySelector(".menu-toggle"),nav=document.querySelector("nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));
renderGallery();