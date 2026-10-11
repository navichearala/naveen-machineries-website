const $ = s => document.querySelector(s);
const theme = document.documentElement;
theme.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
$('#theme').addEventListener('click', () => { theme.dataset.theme = theme.dataset.theme === 'dark' ? 'light' : 'dark'; });
$('#menu').addEventListener('click', () => {
  const open = $('#navigation').classList.toggle('open');
  $('#menu').setAttribute('aria-expanded', String(open));
  $('#menu').textContent = open ? '×' : '☰';
});
$('#navigation').addEventListener('click', e => {
  if(e.target.closest('a')) { $('#navigation').classList.remove('open'); $('#menu').setAttribute('aria-expanded','false'); $('#menu').textContent='☰'; }
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  document.querySelectorAll('.product-card').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; if(!card.hidden) count++; });
  $('.result-count').textContent = filter === 'all' ? 'Showing all 4 solution areas' : `Showing ${count} solution ${count === 1 ? 'area' : 'areas'}`;
}));
const products = {
  agriculture: {label:'AGRICULTURAL IMPLEMENTS',title:'Equipment for the work on your land.',description:'Tractor-connected implements and agricultural equipment for cultivation, transport, and corn milling applications.',items:['Agricultural rotavators','Indian tractor cultivators','Tractor trailers','Tractor-connected corn mills'],solution:'Agricultural implements'},
  construction: {label:'CONSTRUCTION MACHINERY',title:'Build from the ground up.',description:'Clay brick and earth block making equipment, with customised solutions discussed around your production requirements.',items:['Customised fully automatic hydraulic clay brick machines','Earth block making machinery','Application-specific machine configuration'],solution:'Brick & earth block machinery'},
  precision: {label:'PRECISION COMPONENTS',title:'Your geometry, carefully shaped.',description:'High-precision aluminium shape cutting for custom components, including blade profiles for fans and turbines.',items:['Custom aluminium profiles','Fan blade shapes','Turbine blade shapes','Drawing-based component enquiries'],solution:'Precision aluminium components'},
  hydraulics: {label:'HYDRAULIC SOLUTIONS',title:'Put hydraulic power to work.',description:'Hydraulic press machinery and hydraulic cylinder work for earth-moving equipment. Share the application and component details for a scope review.',items:['Hydraulic press machines','Earth-moving machinery hydraulic cylinder work','Application-specific hydraulic requirements'],solution:'Hydraulic solutions'}
};
let selectedSolution = 'Custom manufacturing';
document.querySelectorAll('[data-product]').forEach(card => card.addEventListener('click', () => {
  const p = products[card.dataset.product]; selectedSolution = p.solution;
  $('#detail-label').textContent=p.label; $('#detail-title').textContent=p.title; $('#detail-description').textContent=p.description;
  $('#detail-list').replaceChildren(...p.items.map(item => { const li=document.createElement('li'); li.textContent=item; return li; }));
  $('#product-dialog').showModal();
}));
function openQuote(solution='Custom manufacturing') {
  $('#quote-form').hidden=false; $('#quote-result').hidden=true;
  $('#quote-form').elements.solution.value=solution;
  $('#quote-dialog').showModal();
}
$('#open-quote').addEventListener('click',()=>openQuote());
$('#product-enquiry').addEventListener('click',()=>{ $('#product-dialog').close(); openQuote(selectedSolution); });
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{ if(e.target===dialog){ const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close(); } });
});
$('#quote-form').addEventListener('submit',e=>{
  e.preventDefault(); const data=new FormData(e.target);
  $('#enquiry-text').value=`Enquiry for Naveen Machineries\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nSolution: ${data.get('solution')}\n\nProject requirements:\n${data.get('requirements')}`;
  $('#quote-form').hidden=true; $('#quote-result').hidden=false; $('#copy-hint').textContent=''; $('#select-enquiry').focus();
});
$('#select-enquiry').addEventListener('click',()=>{
  $('#enquiry-text').focus(); $('#enquiry-text').select();
  $('#copy-hint').textContent='Text selected. Use Copy from your device’s menu, or press Ctrl+C / Command+C.';
});
$('#year').textContent=new Date().getFullYear();
