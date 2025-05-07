import { productRepository } from "../repositories/product-repository.js";
import { createResponse } from "../utils.js";

class ProductController {
  constructor(repository) {
    this.repository = repository;
  }
  getAll = async (req, res, next) => {
    try {
      const data = await this.repository.getAll();
      createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.repository.getById(id);
      createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.repository.create(req.body);
      createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.repository.update(id, req.body);
      createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.repository.delete(id);
      createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController(productRepository);
