(function(){
"use strict";
const KEY="artyou_merch_settings_v1";
const defaults={storeName:"Artyou Roma",storeEmail:"",storePhone:"",pickupEnabled:true,pickupLabel:"Ritiro in sede",pickupAddress:"",shippingEnabled:true,shippingCost:0,freeShippingEnabled:false,freeShippingThreshold:60,lowStockThreshold:3,orderPrefix:"ART",cardEnabled:true,paypalEnabled:true,testMode:true};
function clean(v){let x=Object.assign({},defaults,v||{});x.shippingCost=Math.max(0,Number(x.shippingCost)||0);x.freeShippingThreshold=Math.max(0,Number(x.freeShippingThreshold)||0);x.lowStockThreshold=Math.max(1,Math.round(Number(x.lowStockThreshold)||3));x.orderPrefix=String(x.orderPrefix||"ART").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"ART";return x}
function get(){try{return clean(JSON.parse(localStorage.getItem(KEY)))}catch(e){return clean()}}
function save(v){let x=clean(v);localStorage.setItem(KEY,JSON.stringify(x));return x}
function reset(){localStorage.removeItem(KEY);return get()}
function shippingFor(subtotal,s){s=s||get();if(!s.shippingEnabled)return 0;if(s.freeShippingEnabled&&Number(subtotal)>=s.freeShippingThreshold)return 0;return s.shippingCost}
window.ArtyouSettings={KEY,defaults:Object.freeze(Object.assign({},defaults)),get,save,reset,shippingFor};
})();