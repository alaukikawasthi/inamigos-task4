const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
menuToggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open)});

document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const modal=document.getElementById("volunteerModal");
const openModal=()=>{modal.classList.add("open");modal.setAttribute("aria-hidden","false")};
const closeModal=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true")};
document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",openModal));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",closeModal));
modal?.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const campaignInfo={
  BachpanShala:"Project BachpanShala focuses on quality education and learning support for underprivileged children.",
  Prakriti:"Project Prakriti focuses on environmental conservation, tree planting and sustainability.",
  Udaan:"Project Udaan supports women through skill development and pathways toward financial independence.",
  Seva:"Project Seva provides food and clothing support to underprivileged communities.",
  Jeev:"Project Jeev supports animal welfare through feeding, protection, care and shelter.",
  Vikas:"Project Vikas develops employability through internships, skill-building and career opportunities."
};
const toast=document.getElementById("toast");
function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),3200)}
document.querySelectorAll("[data-campaign]").forEach(btn=>btn.addEventListener("click",()=>showToast(campaignInfo[btn.dataset.campaign])));

const form=document.getElementById("volunteerForm"), success=document.getElementById("formSuccess");
form?.addEventListener("submit",e=>{e.preventDefault();form.style.display="none";success.classList.add("show");setTimeout(()=>{success.classList.remove("show");form.reset();form.style.display="grid";closeModal()},2200)});

// Count-up effect when impact section enters the viewport.
const counters=document.querySelectorAll("[data-count]");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting || entry.target.dataset.done)return;
    entry.target.dataset.done="1";
    const target=Number(entry.target.dataset.count), suffix=target===28?"":"+", duration=1100, start=performance.now();
    const tick=now=>{
      const p=Math.min((now-start)/duration,1);
      const value=Math.floor(target*(1-Math.pow(1-p,3)));
      entry.target.textContent=value.toLocaleString("en-IN")+(p===1?suffix:"");
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  })
},{threshold:.35});
counters.forEach(c=>observer.observe(c));