import MongoDao from "./mongo-dao.js";
import { CartModel } from "./models/cart-model.js";

export default class CartDaoMongo extends MongoDao {
  constructor(model) {
    super(model);
  }
  create = async () => {
    try {
      return await this.model.create({
        products: [],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  };

  addProdToCart = async (cartId, prodId) => {
    try {
      const existProdInCart = await this.existProdInCart(cartId, prodId);
      if (existProdInCart) {
        return await this.model.findOneAndUpdate(
          { _id: cartId, "products.product": prodId },
          {
            $set: {
              "products.$.quantity": existProdInCart.products[0].quantity + 1,
            },
          },
          { new: true }
        );
      } else {
        return await this.model.findByIdAndUpdate(
          cartId,
          { $push: { products: { product: prodId } } },
          { new: true }
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  existProdInCart = async (cartId, prodId) => {
    try {
      return await this.model.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, obj) => {
    try {
      const response = await this.model.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId, "products.product": prodId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  clearCart = async (cartId) => {
    try {
      return await this.model.findByIdAndUpdate(
        cartId,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const cartDaoMongo = new CartDaoMongo(CartModel);
