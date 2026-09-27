(function(){
"use strict";
const KEY="artyou_merch_orders_v1";
const names=["Mario Rossi","Laura Bianchi","Giulio Verdi","Marco Neri","Sara Conti","Davide Rinaldi","Elena Romano","Andrea De Luca","Francesca Greco","Luca Moretti","Valentina Costa","Stefano Ricci"];
const products=[
{id:"ts-classic",name:"T-shirt Artyou",model:"Classic",price:20,colors:["Nero","Bianco","Bordeaux"],sizes:["S","M","L","XL"]},
{id:"ts-oversize",name:"T-shirt Artyou",model:"Oversize",price:24,colors:["Nero","Bianco"],sizes:["S","M","L","XL"]},
{id:"felpa",name:"Felpa Artyou",model:"Hoodie",price:35,colors:["Nero","Grigio"],sizes:["S","M","L","XL"]},
{id:"pants",name:"Pantaloni Artyou",model:"Jogger",price:30,colors:["Nero"],sizes:["S","M","L","XL"]},
{id:"socks",name:"Calzini antiscivolo Artyou",model:"Grip",price:10,colors:["Bianco","Nero"],sizes:["36–39","40–43","44–46"]}
];
function seed(){
 const out=[],today=new Date();
 for(let i=0;i<27;i++){
  const n=27-i,customer=names[i%names.length],delivery=i%3===0?"Ritiro in sede":"Spedizione",payment=i%2?"Carta":"PayPal";
  const p1=products[i%products.length],p2=products[(i+2)%products.length],count=i%4===0?2:1;
  const items=[{productId:p1.id,name:p1.name,model:p1.model,color:p1.colors[i%p1.colors.length],size:p1.sizes[i%p1.sizes.length],qty:1,price:p1.price}];
  if(count===2)items.push({productId:p2.id,name:p2.name,model:p2.model,color:p2.colors[(i+1)%p2.colors.length],size:p2.sizes[(i+1)%p2.sizes.length],qty:1,price:p2.price});
  let status;if(i<8)status="Da preparare";else if(i<15)status=delivery==="Ritiro in sede"?"Pronto":"Spedito";else if(i<25)status="Consegnato";else status="Annullato";
  const d=new Date(today);d.setDate(today.getDate()-i);
  const slug=customer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z]+/g,".").replace(/^\.|\.$/g,"");
  out.push({id:"ART-"+String(n).padStart(4,"0"),createdAt:d.toISOString(),customer:{name:customer,email:slug+"@email.com",phone:"+39 3"+String(200000000+i).slice(0,9)},items,total:items.reduce((s,x)=>s+x.price*x.qty,0),payment,paymentStatus:status==="Annullato"?"Rimborsato":"Pagato",delivery,status,notes:"",tracking:""});
 }
 return out;
}
function clone(v){return JSON.parse(JSON.stringify(v))}
function getOrders(){try{const v=JSON.parse(localStorage.getItem(KEY));return Array.isArray(v)?v:seed()}catch(e){return seed()}}
function saveOrders(v){localStorage.setItem(KEY,JSON.stringify(v))}
function resetOrders(){localStorage.removeItem(KEY)}
function nextId(v){const all=v||getOrders(),settings=window.ArtyouSettings?window.ArtyouSettings.get():{orderPrefix:"ART"},prefix=settings.orderPrefix||"ART";const max=all.reduce((m,o)=>Math.max(m,parseInt(String(o.id).replace(/\D/g,""),10)||0),0);return prefix+"-"+String(max+1).padStart(4,"0")}
function flow(order){return order.delivery==="Ritiro in sede"?["Da preparare","Pronto","Consegnato"]:["Da preparare","Spedito","Consegnato"]}
window.ArtyouOrders={getOrders,saveOrders,resetOrders,nextId,flow,seed,clone};
})();