import { cartDaoMongo } from "../daos/mongodb/cart-dao.js";
import CustomError from "../utils/custom-error.js";
import { productRepository } from "./product-repository.js";

class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      if(!response) throw new CustomError('el carrito no existe', 404)
        return response
    } catch (error) {
      throw new Error(error);
    }
  };

  existProdInCart = async (cartId, prodId) => {
    try {
      const response = await this.dao.existProdInCart(cartId, prodId);
      if(!response) throw new CustomError('no se encuentra el producto en el carrito', 404)
        return response
    } catch (error) {
      throw new Error(error);
    }
  };

  addProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await this.getById(cartId);
      const existProd = await productRepository.getById(prodId);
      return await this.dao.addProdToCart(existCart._id, existProd._id);
    } catch (error) {
      throw new Error(error);
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await this.getById(cartId);
      const existProdInCart = await this.existProdInCart(cartId, prodId);
      return await this.dao.removeProdToCart(existCart._id, existProdInCart._id);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      const existCart = await this.getById(cartId);
      const existProdInCart = await this.existProdInCart(cartId, prodId);
      return await this.dao.updateProdQuantityToCart(existCart._id, existProdInCart._id, quantity);
    } catch (error) {
      throw new Error(error);
    }
  };

  clearCart = async (cartId) => {
    try {
      const existCart = await this.getById(cartId);
      return await this.dao.clearCart(existCart._id);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const cartRepository = new CartRepository(cartDaoMongo);
