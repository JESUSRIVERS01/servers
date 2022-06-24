import db from "./db.json" assert {type:"json"};
import { v4 } from "./deps.js";


function getAllProducts( {response}){
    console.log("iniciando get");
    response.status=200;
    response.body=db.productos
}
function getProductsById( {params, response}) {
    let articulo=[];
    db.productos.forEach((e,p)=>{
        if(params.id==e.categoria){articulo=[e].concat(articulo)}    
        else if(params.id==e.id){articulo=e}
    })
        response.status=200;
        response.body=articulo;   
}
async function postProducts( {request, response}) {
    var body= await request.body();
    const valores= await body.value;
    var mensaje="";
    var cumple=true;
    if(!valores.hasOwnProperty("categoria")){ cumple=false;}
    if(!valores.hasOwnProperty("nombreImagen")){ cumple=false;}
    if(!valores.hasOwnProperty("nombre")){ cumple=false;}
    if(!valores.hasOwnProperty("precio")){ cumple=false;}
    if(!valores.hasOwnProperty("descripcion")){ cumple=false;}
    if(cumple){
        var exitencia=false;
        db.productos.forEach((e,p)=>{
           console.log( e.nombre)
            if(e.nombre==valores.nombre){exitencia=true;}
        })
        console.log(valores.nombre)
       if(!exitencia){
            let productoNuevo={
                "id":crypto.randomUUID(),
                "categoria":valores.categoria,
                "nombreImagen":valores.nombreImagen,
                "nombre":valores.nombre,
                "precio":valores.precio,
                "descripcion":valores.descripcion
            }
            db.productos.push(productoNuevo);
            mensaje=`se agrego tu producto y tu id es ${productoNuevo.id}`;
        }
        else{
            mensaje="este producto ya existe "
        }
    }
    else{
        mensaje="este articulo no cumple con los parametros requeridos"
    }
    response.status=200;
    response.body= {
        "respuesta":mensaje
    }

}
async function putProducts( {request, params, response}) {
    var body= await request.body();
    const valores= await body.value;
    var mensaje="";
    var cumple=true;
    if(!valores.hasOwnProperty("categoria")){ cumple=false;}
    if(!valores.hasOwnProperty("nombreImagen")){ cumple=false;}
    if(!valores.hasOwnProperty("nombre")){ cumple=false;}
    if(!valores.hasOwnProperty("precio")){ cumple=false;}
    if(!valores.hasOwnProperty("descripcion")){ cumple=false;}
    if(cumple){
        db.productos.forEach((e,p)=>{
            if(e.id==params.id){
                console.log(e)
                    e.categoria=valores.categoria
                    e.nombreImagen=valores.nombreImagen
                    e.nombre=valores.nombre
                    e.precio=valores.precio
                    e.descripcion=valores.descripcion
            }
        })
        mensaje=`se modifico el producto `;
    }
    else{
        mensaje="este articulo no cumple con los parametros requeridos"
    }
    response.status=200;
    response.body= {
        "respuesta":mensaje
    }
}

async function deleteProducts( { params, response}) {
    var mensaje="";
    db.productos.forEach((e,p)=>{
        if (e.id==params.id){
           db.productos.splice(p,1)
        }
    })
    console.log(db.productos);
    mensaje=`se borro el producto`;
    response.status=200;
    response.body= {
        "respuesta":mensaje
    }   
}

export default{
    postProducts:postProducts,
    getProductsById:getProductsById,
    getAllProducts:getAllProducts,
    putProducts:putProducts,
    deleteProducts:deleteProducts
} 