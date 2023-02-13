// Tercer Desafío Entregable - Servidor con Express
//Se instancia la dependencia de fs
import { promises as fs } from "fs";

class ProductManager {
    constructor() {
        this.path = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        ProductManager.id++;
        let newProduct = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct);
        
        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    readProducts = async () => {
        let contenido = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(contenido);
    }
    
   /*  writeProducts = async (data) => {
        await fs.writeFile(this.path, JSON.stringify(data))
    }
 */
    getProducts =  async () => {
        let contenidoArray = await this.readProducts();
        return console.log(contenidoArray);
    }

   getProductById = async (id) => {
        let contenidoArray = await this.readProducts();
        let filter = await contenidoArray.find(product => product.id === id);
        if(filter){
            console.log("El producto buscado es:", filter);
            return filter; 
        } else {
            console.error("ERROR! Producto no encontrado");
            return null
        }
    }

    deleteProductById = async (id) => {
        let respuesta = await this.readProducts();
        let productFilter = respuesta.filter(prod => prod.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto Eliminado!"); 
    }

    updateProduct = async ({id, ...producto}) => {
        await this.deleteProductById(id);
        let oldProducts = await this.readProducts();
        let prodModif = [{...producto, id}, ...oldProducts];
        await this.writeFile(this.path, JSON.stringify(prodModif));
    }
}


//const productos = new ProductManager;


/*console.log("-----------------------Proceso de Testing---------------------------\n")

console.log("A - Se llamará a “getProducts” recién creada la instancia, debe devolver un arreglo vacío");
productos.getProducts();

// *****************************************************************************************************************
console.log("\n B - Se llama a 'addProduct' y el objeto debe agregarse satisfactoriamente con un id generado automáticamente. Sin repetirse.\n");
productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25); 
productos.addProduct("producto prueba2", "Este es un producto prueba2", 2002, "Sin imagen2", "abc1232", 252); 
productos.addProduct("producto prueba3", "Este es un producto prueba3", 2003, "Sin imagen3", "abc1233", 253); 
productos.addProduct("producto prueba4", "Este es un producto prueba4", 2004, "Sin imagen4", "abc1234", 254); 
productos.addProduct("producto prueba5", "Este es un producto prueba5", 2005, "Sin imagen5", "abc1235", 255); 
productos.addProduct("producto prueba6", "Este es un producto prueba6", 2006, "Sin imagen6", "abc1236", 256); 
productos.addProduct("producto prueba7", "Este es un producto prueba7", 2007, "Sin imagen7", "abc1237", 257); 
productos.addProduct("producto prueba8", "Este es un producto prueba8", 2008, "Sin imagen8", "abc1238", 258); 
productos.addProduct("producto prueba9", "Este es un producto prueba9", 2009, "Sin imagen9", "abc1239", 259); 
productos.addProduct("producto pruebaN", "Este es un producto pruebaN", 2002, "Sin imagenN", "abc1232N", 252); 

// ******************************************************************************************************************* //
console.log("\n C - Se llama al método “getProducts” nuevamente, esta vez debe aparecer el/los producto/s recién agregado/s.\n");
productos.getProducts();

// ******************************************************************************************************************** /
console.log("\n D - Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado. En caso de enviar un ID inexistente devuelve error.\n");
productos.getProductById(6);
productos.getProductById(3);

// ******************************************************************************************************************** //
console.log("\n E - Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización. \n");
productos.updateProduct(2,
    {
        title: 'producto prueba ACTUALIZADO',
        description: 'Este es un producto prueba ACTUALIZADO',
        price: 400,
        thumbnail: 'Sin imagen ACTUALIZADO',
        code: 'abc123 ACTUALIZADO',
        stock: 15,
}
);

// Se evalúa que "getProductById" devuelva error si no encuentra el producto
console.log("\n*********** Se llama a “getProductById”, y al NO encontrar el producto devuelve NOT FOUND ***********\n");
productos.getProductById(1);


// ******************************************************************************************************************** //
console.log("\n E - Se muestra el nuevo array de productos con el producto ya actualizado sin que haya cambiado su número de ID. \n");
console.log("El array de productos actualizado es: \n");
productos.getProducts();

// ******************************************************************************************************************** //
console.log("\n F - Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir \n");
productos.deleteProductById(2);
*/

export default ProductManager;
