const root=document.documentElement, body=document.body;
const saved=localStorage.getItem("adan-theme");
root.dataset.theme=saved==="light"?"light":"dark";

const themeBtn=document.querySelector(".theme-toggle");
function updateThemeIcon(){themeBtn.textContent=root.dataset.theme==="dark"?"☼":"◐"}
updateThemeIcon();
themeBtn.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("adan-theme",root.dataset.theme);updateThemeIcon()});

const menu=document.querySelector(".mobile-menu"), menuBtn=document.querySelector(".menu-toggle");
function closeMenu(){menu.classList.remove("open");menu.setAttribute("aria-hidden","true");menuBtn.setAttribute("aria-expanded","false")}
menuBtn.addEventListener("click",()=>{const open=!menu.classList.contains("open");menu.classList.toggle("open",open);menu.setAttribute("aria-hidden",String(!open));menuBtn.setAttribute("aria-expanded",String(open))});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));

const name=document.querySelector(".interactive-name");
"SYED ADAN".split("").forEach((char,i)=>{
 const s=document.createElement("span"); s.className="name-letter"; s.textContent=char===" "?"\u00a0":char; s.dataset.i=i; name.appendChild(s);
});
const letters=[...document.querySelectorAll(".name-letter")];
name.addEventListener("pointermove",e=>{
 const r=name.getBoundingClientRect(), x=e.clientX;
 letters.forEach(l=>{
   const lr=l.getBoundingClientRect(), center=lr.left+lr.width/2;
   const d=Math.abs(x-center), influence=Math.max(0,1-d/170);
   l.style.transform=`translateY(${-influence*7}px) scale(${1+influence*.035})`;
   l.style.color=influence>.12?"var(--accent-2)":"var(--text)";
 });
});
name.addEventListener("pointerleave",()=>letters.forEach(l=>{l.style.transform="";l.style.color=""}));

const glow=document.querySelector(".cursor-glow");
let gx=0,gy=0,hasPointer=false;
window.addEventListener("pointermove",e=>{
 if(e.pointerType==="touch")return;
 gx=e.clientX;gy=e.clientY;hasPointer=true;
 glow.style.left=gx+"px";glow.style.top=gy+"px";glow.style.opacity=".9";
},{passive:true});
window.addEventListener("mouseout",e=>{if(!e.relatedTarget){glow.style.opacity="0";hasPointer=false}});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

const sections=[...document.querySelectorAll("main section")], nav=[...document.querySelectorAll(".desktop-nav a")];
const sectionObs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>sectionObs.observe(s));

const backdrop=document.getElementById("modalBackdrop"), title=document.getElementById("modalTitle"), text=document.getElementById("modalText"), eyebrow=document.getElementById("modalEyebrow");
const serviceCopy={
frontend:["Frontend Development","Clean, responsive interfaces using HTML, CSS and JavaScript, with attention to structure, interaction and maintainability."],
responsive:["Responsive Web Design","Layouts deliberately adapted for phones, tablets, laptops and large screens rather than simply shrinking a desktop layout."],
uiux:["UI / UX Design","Clear hierarchy, thoughtful interaction states and practical interface decisions focused on usability and visual consistency."],
ai:["AI-Assisted Solutions","Practical AI-tool integration and AI-assisted workflows where they genuinely improve ideation, productivity or selected product features."]
};
function openModal(kind="hire",value=""){
 if(kind==="service"){eyebrow.textContent="SERVICE";title.innerHTML=serviceCopy[value][0];text.textContent=serviceCopy[value][1]}
 else if(kind==="project"){eyebrow.textContent="SELECTED WORK";const p=value==="commonly"?"Commonly":"Showroom";title.innerHTML=p;text.textContent=value==="commonly"?"A community-focused marketplace concept exploring profiles, services, discovery and user interaction.":"A visual product showcase concept exploring presentation, browsing and responsive interaction."; }
 else {eyebrow.textContent="LET'S WORK TOGETHER";title.innerHTML="Hire <em>Syed Adan.</em>";text.textContent="Tell me what you're building and I'll help turn the idea into a clean, responsive web experience."}
 backdrop.classList.add("open");backdrop.setAttribute("aria-hidden","false");body.classList.add("modal-open");
}
function closeModal(){backdrop.classList.remove("open");backdrop.setAttribute("aria-hidden","true");body.classList.remove("modal-open")}
document.querySelectorAll("[data-open-hire]").forEach(b=>b.addEventListener("click",()=>openModal()));
document.querySelectorAll("[data-service]").forEach(b=>b.addEventListener("click",()=>openModal("service",b.dataset.service)));
document.querySelectorAll("[data-project]").forEach(b=>b.addEventListener("click",()=>openModal("project",b.dataset.project)));
document.querySelector(".modal-close").addEventListener("click",closeModal);
backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
