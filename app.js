
const http = require('http');

const VERSION = '2.1';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Andina Market | Tu tienda online</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#f7f8f4;color:#24352d}
header{background:#173b30;color:white;padding:20px 7%;
display:flex;justify-content:space-between;align-items:center}
.logo{font-size:24px;font-weight:bold;letter-spacing:1px}
.cart{background:#315c49;padding:12px 18px;border-radius:25px}
.hero{background:linear-gradient(120deg,#173b30,#527b51);
color:white;padding:75px 8%;text-align:center}
.hero h1{font-size:clamp(32px,6vw,55px);margin-bottom:18px}
.hero p{font-size:18px;color:#e4eee1;margin-bottom:25px}
.search{width:min(500px,100%);padding:15px;border:0;
border-radius:30px;font-size:16px;outline:none}
main{max-width:1150px;margin:auto;padding:45px 20px}
.section-title{text-align:center;margin-bottom:30px}
.section-title h2{font-size:30px;margin-bottom:10px}
.categories{display:flex;gap:12px;justify-content:center;
flex-wrap:wrap;margin-bottom:35px}
.categories button{padding:11px 20px;border:1px solid #d5dfd4;
background:white;border-radius:25px;cursor:pointer;color:#315c49}
.categories button.active,.categories button:hover{
background:#315c49;color:white}
.products{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:22px}
.product{background:white;border-radius:15px;overflow:hidden;
box-shadow:0 5px 20px #0000000c;transition:.2s}
.product:hover{transform:translateY(-5px)}
.product img{width:100%;height:190px;object-fit:cover}
.product-info{padding:19px}
.product-info h3{margin-bottom:9px}
.product-info p{color:#758078;font-size:14px;min-height:35px}
.price{font-size:21px;font-weight:bold;color:#39734b;margin:15px 0}
.buy{width:100%;border:0;background:#315c49;color:white;
padding:13px;border-radius:8px;cursor:pointer;font-size:15px}
.buy:hover{background:#173b30}
footer{background:#173b30;color:white;text-align:center;
padding:30px 15px;margin-top:35px}
footer p{margin:8px;color:#d4e2d7}
.empty{text-align:center;padding:30px;grid-column:1/-1}
@media(max-width:600px){
header{padding:17px 5%}
.logo{font-size:19px}
.hero{padding:55px 5%}
main{padding:35px 15px}
}
</style>
</head>
<body>

<header>
<div class="logo">🏔️ ANDINA MARKET</div>
<div class="cart">🛒 Carrito: <span id="count">0</span></div>
</header>

<section class="hero">
<h1>Lo mejor de nuestra tierra</h1>
<p>Descubre productos especiales y disfruta de la experiencia Andina.</p>
<input class="search" id="search" placeholder="🔎 Buscar productos...">
</section>

<main>
<div class="section-title">
<h2>Nuestros productos</h2>
<p>Calidad y tradición en cada producto.</p>
</div>

<div class="categories">
<button class="active" data-category="Todos">Todos</button>
<button data-category="Alimentos">Alimentos</button>
<button data-category="Bebidas">Bebidas</button>
<button data-category="Naturales">Naturales</button>
</div>

<div class="products" id="products"></div>
</main>

<footer>
<h2>🏔️ ANDINA MARKET</h2>
<p>Productos que conectan con nuestra tierra.</p>
<p>© 2026 Andina Market. Todos los derechos reservados.</p>
<p>Versión ${VERSION}</p>
</footer>

<script>
const items = [
{name:'Quinua Andina',category:'Alimentos',
description:'Quinua seleccionada de nuestra región.',
price:18,image:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'},
{name:'Café Andino',category:'Bebidas',
description:'Aroma y sabor para disfrutar cada día.',
price:25,image:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600'},
{name:'Miel Natural',category:'Naturales',
description:'Dulzura natural para tu hogar.',
price:22,image:'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600'},
{name:'Maíz Andino',category:'Alimentos',
description:'Producto tradicional de nuestra tierra.',
price:15,image:'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600'},
{name:'Infusión Natural',category:'Bebidas',
description:'Una bebida para disfrutar y compartir.',
price:12,image:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600'},
{name:'Frutos Naturales',category:'Naturales',
description:'Una selección de productos naturales.',
price:20,image:'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600'}
];

let cart = 0;
let category = 'Todos';

function render(){
const query = document.getElementById('search').value.toLowerCase();
const filtered = items.filter(item =>
(category === 'Todos' || item.category === category) &&
item.name.toLowerCase().includes(query)
);

document.getElementById('products').innerHTML =
filtered.length ? filtered.map((item,index) => `
<div class="product">
<img src="${item.image}" alt="${item.name}" loading="lazy">
<div class="product-info">
<h3>${item.name}</h3>
<p>${item.description}</p>
<div class="price">S/ ${item.price.toFixed(2)}</div>
<button class="buy" data-index="${items.indexOf(item)}">
Agregar al carrito 🛒
</button>
</div>
</div>`).join('') :
'<div class="empty">No encontramos productos.</div>';
}

document.getElementById('search').addEventListener('input',render);

document.querySelectorAll('.categories button').forEach(button=>{
button.addEventListener('click',()=>{
document.querySelector('.categories .active').classList.remove('active');
button.classList.add('active');
category=button.dataset.category;
render();
});
});

document.getElementById('products').addEventListener('click',event=>{
const button=event.target.closest('.buy');
if(!button)return;
cart++;
document.getElementById('count').textContent=cart;
button.textContent='¡Agregado! ✓';
setTimeout(()=>button.textContent='Agregar al carrito 🛒',1000);
});

render();
</script>
</body>
</html>`;

http.createServer((req,res)=>{
res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
res.end(html);
}).listen(3000,'0.0.0.0',()=>{
console.log('Andina Market '+VERSION+' funcionando en puerto 3000');
});
