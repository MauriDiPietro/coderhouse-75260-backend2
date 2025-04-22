import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductDaoFS {
  constructor(path) {
    this.path = path;
  }

  getAll = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      }
      return [];
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (obj) => {
    try {
      const product = {
        _id: uuidv4(),
        ...obj,
      };
      const products = await this.getAll();
      const productExist = await this.getById(product._id);
      if (productExist) throw new Error("Product already exists");
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      throw error;
    }
  };

  getById = async (id) => {
    try {
      const products = await this.getAll();
      const product = products.find((product) => product._id === id);
      if (!product) return null;
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (obj, id) => {
    try {
      const products = await this.getAll();
      let productExist = await this.getById(id);
      productExist = { ...productExist, ...obj };
      const newArray = products.filter((prod) => prod._id !== id);
      newArray.push(productExist);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return productExist;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      const products = await this.getAll();
      const productExist = await this.getById(id);
      const newArray = products.filter((prod) => prod._id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return productExist;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const productDaoFS = new ProductDaoFS("./src/products.json");
