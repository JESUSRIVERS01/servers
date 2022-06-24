import db from "./db.json" assert {type:"json"};
import { v4 } from "./deps.js";
// import { crypto } from "./deps.js";

function getAllUsuarios( {response}){
    console.log("iniciando get");
    response.status=200;
    response.body=db.usuarios
}
function getUsuariosById( {params, response}) {
    let usuario=[];
    db.usuarios.forEach((e,p)=>{
        if(params.id==e.id){usuario=[e].concat(usuario)}    
        else if(params.id==e.id){usuario=e}
    })
        response.status=200;
        response.body=usuario;   
}
  
async function postUsuarios( {request, response}) {
    var body= await request.body();
    const valores= await body.value;
    var mensaje="";
    var cumple=true;
    if(!valores.hasOwnProperty("nombre")){ cumple=false;}
    if(!valores.hasOwnProperty("contraseña")){ cumple=false;}
    if(!valores.hasOwnProperty("correo")){ cumple=false;}
    if(cumple){
        let usuarioNuevo={
            "id":crypto.randomUUID(),
            "nombre":valores.nombre,
            "contraseña":valores.contraseña,
            "correo":valores.correo,
        }
        db.usuarios.push(usuarioNuevo);
        mensaje=`se agrego un usuario nuevo y su id es ${usuarioNuevo.id}`;
        response.status=200;
        response.body= {
            "respuesta":mensaje
        }
    }
    else{
        mensaje="este Usuario no cumple con los parametros requeridos"
        response.status=200;
        response.body= {
            "respuesta":mensaje
        }
    }
}
async function putUsuarios( {request, params, response}) {
    var body= await request.body();
    const valores= await body.value;
    var mensaje="";
    var cumple=true;
    if(!valores.hasOwnProperty("nombre")){ cumple=false;}
    if(!valores.hasOwnProperty("contraseña")){ cumple=false;}
    if(!valores.hasOwnProperty("correo")){ cumple=false;}
    if(cumple){
        db.usuarios.forEach((e,p)=>{
            if(e.id==params.id){
                e.contraseña=valores.contraseña,
                e.correo=valores.correo
            }
        })
        mensaje=`se modifico tu credencial `;
    }
    else{
        mensaje="No cumples con los parametros requeridos"
    }
    response.status=200;
    response.body= {
        "respuesta":mensaje
    }
}

async function deleteUsuarios( { params, response}) {
    var mensaje="";
    db.usuarios.forEach((e,p)=>{
        if (e.id==params.id){
           db.usuarios.splice(p,1)
        }
    })
    mensaje=`se borro el usuario`;
    response.status=200;
    response.body= {
        "respuesta":mensaje
    }   
}


export default{
    getAllUsuarios:getAllUsuarios,
    getUsuariosById:getUsuariosById,
    postUsuarios:postUsuarios,
    putUsuarios:putUsuarios,
    deleteUsuarios:deleteUsuarios
} 