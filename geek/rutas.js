import {Router} from "./deps.js";
import funcionesProductos from "./funcionesProductos.js";
import funcionesUsuarios from "./funcionesUsuarios.js";
import funcionesCategorias from "./funcionesCategorias.js";
const router = new Router();
router.get("/productos",funcionesProductos.getAllProducts);
router.get("/productos/:id",funcionesProductos.getProductsById);
router.post("/productos",funcionesProductos.postProducts);
router.put("/productos/:id",funcionesProductos.putProducts);
router.delete("/productos/:id",funcionesProductos.deleteProducts);
//rutas para usuarios
router.get("/usuarios",funcionesUsuarios.getAllUsuarios);
router.get("/usuarios/:id",funcionesUsuarios.getUsuariosById);
router.post("/usuarios",funcionesUsuarios.postUsuarios);
router.put("/usuarios/:id",funcionesUsuarios.putUsuarios);
router.delete("/usuarios/:id",funcionesUsuarios.deleteUsuarios);
//rutas para categorias
router.get("/categorias",funcionesCategorias.getAllCategoria);
router.get("/categorias/:id",funcionesCategorias.getCategoriaById);
export default router;