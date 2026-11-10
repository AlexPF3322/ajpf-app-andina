
const http = require('http');

const VERSION = '2.1';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Andina Market</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#f6f8f4;color:#26382e}
header{background:#173b30;color:white;padding:22px;text-align:center}
header h1{margin:0}
.hero{background:linear-gradient(120deg,#173b30,#56805b);color:white;text-align:center;padding:65px 15px}
.hero h2{font-size:38px}
.search{padding:14px;width:min(90%,450px);border:0;border-radius:25px;font-size:16px}
main{max-width:1100px;margin:35px auto;padding:15px}
h2{text-align:center}
.categories{text-align:center;margin:25px}
.categories button{padding:11px 18px;margin:5px;border:0;border-radius:20px;background:#dce9dc;cursor:pointer}
.products{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
.product{background:white;border-radius:14px;overflow:hidden;box-shadow:0 4px 15px #0001}
.product img{width:100%;height:180px;object-fit:cover}
.info{padding:18px}
.price{color:#32804c;font-size:22px;font-weight:bold}
.buy{background:#285d40;color:white;padding:12px;border:0;border-radius:8px;width:100%;cursor:pointer}
footer{background:#173b30;color:white;text-align:center;padding:25px;margin-top:40px}
</style>
</head>
<body>
<header>
<h1>🏔️ ANDINA MARKET</h1>
<p>Tu tienda de productos andinos</p>
</header>
<section class="hero">
<h2>Lo mejor de nuestra tierra</h2>
<p>Descubre productos especiales y disfruta de nuestra tradición.</p>
<input class="search" id="search" placeholder="Buscar productos...">
</section>
<main>
<h2>Nuestros productos</h2>
<div class="categories">
<button data-cat="Todos">Todos</button>
<button data-cat="Alimentos">Alimentos</button>
<button data-cat="Bebidas">Bebidas</button>
<button data-cat="Naturales">Naturales</button>
</div>
<div id="products" class="products"></div>
</main>
<footer>
<h2>ANDINA MARKET</h2>
<p>Productos que conectan con nuestra tierra.</p>
<p>Carrito: <span id="count">0</span> productos</p>
<p>Versión ${VERSION}</p>
</footer>
<script>
var items = [
{name:'Quinua Andina',cat:'Alimentos',price:18,desc:'Quinua seleccionada.',img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'},
{name:'Café Andino',cat:'Bebidas',price:25,desc:'Aroma y sabor especial.',img:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600'},
{name:'Miel Natural',cat:'Naturales',price:22,desc:'Dulzura natural.',img:'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600'},
{name:'Maíz Andino',cat:'Alimentos',price:15,desc:'Tradición de nuestra tierra.',img:'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600'},
{name:'Infusión Natural',cat:'Bebidas',price:12,desc:'Para disfrutar y compartir.',img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600'},
{name:'Frutos Naturales',cat:'Naturales',price:20,desc:'Una selección especial.',img:'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600'}
];

var selected = 'Todos';
var cart = 0;

function render(){
var query = document.getElementById('search').value.toLowerCase();
var filtered = items.filter(function(item){
return (selected === 'Todos' || item.cat === selected) &&
item.name.toLowerCase().includes(query);
});

var output = '';
filtered.forEach(function(item){
output += '<article class="product">' +
'<img src="' + item.img + '" alt="' + item.name + '">' +
'<div class="info"><h3>' + item.name + '</h3>' +
'<p>' + item.desc + '</p>' +
'<p class="price">S/ ' + item.price.toFixed(2) + '</p>' +
'<button class="buy" data-name="' + item.name + '">Agregar al carrito</button>' +
'</div></article>';
});

document.getElementById('products').innerHTML =
output || '<p>No encontramos productos.</p>';
}

document.getElementById('search').addEventListener('input',render);

document.querySelector('.categories').addEventListener('click',function(e){
if(e.target.dataset.cat){
selected = e.target.dataset.cat;
render();
}
});

document.getElementById('products').addEventListener('click',function(e){
if(e.target.classList.contains('buy')){
cart++;
document.getElementById('count').textContent = cart;
e.target.textContent = '¡Agregado!';
}
});

render();
</script>
</body>
</html>`;

http.createServer(function(req, res) {
res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
res.end(html);
}).listen(3000, '0.0.0.0', function() {
console.log('Andina Market ' + VERSION + ' funcionando en puerto 3000');
});
