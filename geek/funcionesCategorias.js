import db from "./db.json" assert {type:"json"};



function getAllCategoria( {response}){
    response.status=200;
    response.body=db.categorias
}
function getCategoriaById( {params, response}) {
    let articulo=[];
    db.productos.forEach((e,p)=>{
        if(params.id==e.categoria){articulo=[e].concat(articulo)}    
    })
        response.status=200;
        response.body=articulo;   
}

export default{
    getAllCategoria:getAllCategoria,
    getCategoriaById:getCategoriaById
} 