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
  document.querySelectorAll('.product-card').forEach(card => { card.hidden = card.classList.contains('agriculture-specific') ? filter !== 'agriculture' : filter !== 'all' && card.dataset.category !== filter; if(!card.hidden) count++; });
  $('.product-grid').classList.toggle('agriculture-view', filter === 'agriculture');
  $('.result-count').textContent = filter === 'all' ? 'Showing all 4 solution areas' : filter === 'agriculture' ? 'Agricultural equipment overview + 2 featured products' : `Showing ${count} solution ${count === 1 ? 'area' : 'areas'}`;
}));
const products = {
  agriculture: {label:'AGRICULTURAL IMPLEMENTS',title:'Equipment for the work on your land.',description:'Tractor-connected implements and agricultural equipment for cultivation, transport, corn milling, and sweet corn processing. Explore the featured products below.',items:['Indian tractor ploughs','Agricultural rotavators and Indian tractor cultivators','Tractor trailers and tractor-connected corn mills','Sweet corn seed / kernel separating machines'],solution:'Agricultural implements'},
  plough: {label:'AGRICULTURE / SOIL PREPARATION',title:'Indian tractor plough',description:'Tractor-mounted ploughing equipment for preparing agricultural land before cultivation. Discuss the plough configuration that suits your tractor, soil conditions, and intended working depth.',items:['Application: primary soil preparation and ploughing','Share tractor horsepower and hitch details for compatibility review','Confirm working width, depth, and number of plough bodies when enquiring'],solution:'Agricultural implements',image:'./assets/tractor-plough.webp',alt:'Concept illustration of a red tractor-mounted mouldboard plough'},
  sweetcorn: {label:'AGRICULTURE / SWEET CORN PROCESSING',title:'Sweet corn separating machine',description:'A corn seed / kernel separating machine for removing kernels from fresh sweet corn cobs. Tell us about your sweet corn processing application so we can discuss a suitable machine configuration.',items:['Application: separating sweet corn kernels from the cob','Share the corn variety, cob sizes, and required output','Confirm food-contact materials, power supply, cleaning needs, and operating method before ordering'],solution:'Agricultural implements',image:'./assets/sweet-corn-separator.webp',alt:'Concept illustration of a stainless steel machine for separating sweet corn kernels'},
  construction: {label:'CONSTRUCTION MACHINERY',title:'Clay brick-making machine',description:'Clay brick-making equipment for your construction-material production needs. The photograph shows our clay brick-making machine; discuss your required brick dimensions, production process, and output with us to define a suitable configuration.',items:['Clay brick-making machinery','Customised hydraulic clay brick machine enquiries','Earth block making machinery','Machine configuration and specifications confirmed on enquiry'],solution:'Brick & earth block machinery',image:'./assets/clay-brick-machine.webp',alt:'Naveen Machineries orange clay brick-making machine',caption:'Clay brick-making machine. Company-supplied photograph.'},
  precision: {label:'PRECISION COMPONENTS',title:'Your geometry, carefully shaped.',description:'High-precision aluminium shape cutting for custom components, including blade profiles for fans and turbines.',items:['Custom aluminium profiles','Fan blade shapes','Turbine blade shapes','Drawing-based component enquiries'],solution:'Precision aluminium components'},
  hydraulics: {label:'HYDRAULIC SOLUTIONS',title:'Put hydraulic power to work.',description:'Hydraulic press machinery and hydraulic cylinder work for earth-moving equipment. Share the application and component details for a scope review.',items:['Hydraulic press machines','Earth-moving machinery hydraulic cylinder work','Application-specific hydraulic requirements'],solution:'Hydraulic solutions'}
};
let selectedSolution = 'Custom manufacturing';
let selectedProduct = '';
document.querySelectorAll('[data-product]').forEach(card => card.addEventListener('click', () => {
  const p = products[card.dataset.product]; selectedSolution = p.solution;
  selectedProduct = ['plough','sweetcorn'].includes(card.dataset.product) ? p.title : '';
  $('#detail-label').textContent=p.label; $('#detail-title').textContent=p.title; $('#detail-description').textContent=p.description;
  $('#detail-figure').hidden = !p.image;
  if (p.image) { $('#detail-image').src=p.image; $('#detail-image').alt=p.alt; $('#detail-figure figcaption').textContent=p.caption || 'Concept illustration. Actual product design and configuration may differ.'; }
  $('#agriculture-gallery').hidden = card.dataset.product !== 'agriculture';
  $('#detail-list').replaceChildren(...p.items.map(item => { const li=document.createElement('li'); li.textContent=item; return li; }));
  if(!$('#product-dialog').open) $('#product-dialog').showModal();
  $('#product-dialog').scrollTop = 0;
}));
function openQuote(solution='Custom manufacturing') {
  $('#quote-form').hidden=false; $('#quote-result').hidden=true;
  $('#quote-form').elements.solution.value=solution;
  $('#quote-dialog').showModal();
}
$('#open-quote').addEventListener('click',()=>openQuote());
$('#product-enquiry').addEventListener('click',()=>{
  $('#product-dialog').close(); openQuote(selectedSolution);
  if(selectedProduct) {
    const input=$('#quote-form').elements.requirements;
    const marker=`Product: ${selectedProduct}`;
    input.value=marker+'\n'+input.value.replace(/^Product: [^\n]*\n?/, '');
  }
});
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
