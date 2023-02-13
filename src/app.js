// Tercer desafio entregable - Servidor con Express

// Importo dependencias
import express from "express";

// Importo el archivo de Productos
import ProductManager from "./components/ProductManager.js";

// Instancio nuestra constante app
const app = express();

// Permito que el servidor pueda interpretar mejor datos complejos desde la url
app.use(express.urlencoded({extended: true}));

const productos = new ProductManager;
const contenido = productos.readProducts();

// Agrego endpoint para leer los productos y devolverlos en un objeto
app.get('/products', async (req, res) => {

    // Agrego el soporte para recibir por query param el valor limite de resultados
    let limit = parseInt(req.query.limit);

    if(!limit) return res.send(await contenido);
    let arrayProd = await contenido;
    let prodLimit = arrayProd.slice(0, limit);
    res.send(await prodLimit);
})

// Vamos a traer solo el producto solicitado por su Id
app.get('/products/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    let arrayProd = await contenido;
    let productById = arrayProd.find(prod => prod.id === pid);
    res.send(productById);
})

// Configuro nuestro servidor
const port = 8080;
const server = app.listen(port, () => {
    console.log('Servidor ejecutandose en el puerto: ', port);
})
server.on('error', error => console.log('Error en el servidor: ', error));