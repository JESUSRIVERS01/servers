import { Application } from "./deps.js";
import { oakCors } from "./deps.js";
import rutas from "./rutas.js";


const app = new Application();
app.use(oakCors());
app.use(rutas.routes());
app.use(rutas.allowedMethods());
app.addEventListener("listen",({secure, hostname, port})=>{
    console.log(`servidor listo escuchando en http://${hostname}:${port}`)
})
await app.listen({hostname:"localhost" , port:8000});