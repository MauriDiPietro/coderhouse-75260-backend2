import { productDaoFS } from "./filesystem/product-dao.js";
import { productDaoMongo } from "./mongodb/product-dao.js";
import { initMongoDB } from "./mongodb/connection.js";

let productDao = null;
// let cartDao = null;
let persistence = process.argv[2];

switch (persistence) {
  case "fs":
    productDao = productDaoFS;
    // cartDao = cartDaoFS;
    break;
  case "mongo":
    initMongoDB()
      .then(() => console.log("Conectado a mongodb"))
      .catch((error) => console.log(error));
    productDao = productDaoMongo;
  default:
    break;
}

export default { productDao };
