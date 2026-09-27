const KEY="artyou_merch_catalog_v3";
const defaults=[
{id:"ts-classic",name:"T-shirt Artyou",model:"Classic",category:"T-shirt",price:20,active:true,image:"https://outlashwear.com/cdn/shop/files/Outlash_Wear_2001_Unisex_Short_Sleeve_T-Shirt_Black_front.png?v=1717617433",colors:["Nero","Bianco","Bordeaux"],sizes:["S","M","L","XL"],stock:{"Nero|S":3,"Nero|M":12,"Nero|L":7,"Nero|XL":2,"Bianco|S":4,"Bianco|M":5,"Bianco|L":3,"Bianco|XL":1,"Bordeaux|S":2,"Bordeaux|M":3,"Bordeaux|L":2,"Bordeaux|XL":0}},
{id:"ts-oversize",name:"T-shirt Artyou",model:"Oversize",category:"T-shirt",price:24,active:true,image:"https://outlashwear.com/cdn/shop/files/Outlash_Wear_2001_Unisex_Short_Sleeve_T-Shirt_Black_front.png?v=1717617433",colors:["Nero","Bianco"],sizes:["S","M","L","XL"],stock:{"Nero|S":2,"Nero|M":6,"Nero|L":5,"Nero|XL":2,"Bianco|S":2,"Bianco|M":4,"Bianco|L":3,"Bianco|XL":1}},
{id:"felpa",name:"Felpa Artyou",model:"Hoodie",category:"Felpe",price:35,active:true,image:"https://www.spreeprint.de/files/user/brands/as-colour/modelimages/5102/5102_STENCIL_HOOD_MAIN__95569.1755485936.1280.1280.jpg",colors:["Nero","Grigio"],sizes:["S","M","L","XL"],stock:{"Nero|S":2,"Nero|M":5,"Nero|L":2,"Nero|XL":1,"Grigio|S":1,"Grigio|M":2,"Grigio|L":1,"Grigio|XL":0}},
{id:"pants",name:"Pantaloni Artyou",model:"Jogger",category:"Pantaloni",price:30,active:true,image:"https://lovekrakow.pl/sites/default/files/styles/social/public/images/2026-01/cf823088519c858a6e0e1a2234da7bc8.jpeg.webp?itok=zvHrtQtg",colors:["Nero"],sizes:["S","M","L","XL"],stock:{"Nero|S":1,"Nero|M":8,"Nero|L":4,"Nero|XL":0}},
{id:"socks",name:"Calzini antiscivolo Artyou",model:"Grip",category:"Calzini",price:10,active:true,image:"https://www.athlegrip.com/cdn/shop/files/FullWhiteGripSocks.jpg?v=1710357585",colors:["Bianco","Nero"],sizes:["36–39","40–43","44–46"],stock:{"Bianco|36–39":11,"Bianco|40–43":9,"Bianco|44–46":3,"Nero|36–39":6,"Nero|40–43":4,"Nero|44–46":0}}
];
function getCatalog(){try{return JSON.parse(localStorage.getItem(KEY))||JSON.parse(JSON.stringify(defaults))}catch(e){return JSON.parse(JSON.stringify(defaults))}}
function saveCatalog(v){localStorage.setItem(KEY,JSON.stringify(v))}
function resetCatalog(){localStorage.removeItem(KEY)}
function slug(s){return (s||"prodotto").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+"-"+Date.now()}
function totalStock(p){return Object.values(p.stock||{}).reduce((a,b)=>a+(+b||0),0)}
window.ArtyouCatalog={getCatalog,saveCatalog,resetCatalog,slug,totalStock,defaults};