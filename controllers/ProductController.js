const { Products, Categories, Photos, Sizes } = require("../models/models");

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const productsInfo = await Products.findAll({
        include: [
          {
            model: Photos,
            attributes: ["photo_path"],
            limit: 1,
          },
          {
            model: Sizes,
            attributes: ["size"],
          },
        ],
      });
      const modifiedProductInfo = productsInfo.map((product) => {
        const image = product.Photos.map((photo) => photo.photo_path).join();
        const sizes = product.Sizes.map((productSize) => productSize.size);
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          sizes: sizes,
          image: image,
        };
      });
      res.status(200).json(modifiedProductInfo);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;

    try {
      const product = await Products.findByPk(id, {
        include: [
          {
            model: Photos,
            attributes: ["photo_path"],
          },
          {
            model: Sizes,
            attributes: ["size"],
          },
        ],
      });

      const images = product.Photos.map((photo) => photo.photo_path);
      const sizes = product.Sizes.map((productSize) => productSize.size);
      const modifiedProductInfo = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        sizes: sizes,
        images: images,
      };
      if (!modifiedProductInfo) {
        return res.status(404).json({ error: `Product with ${id} not found` });
      }

      res.status(200).json(modifiedProductInfo);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve product" });
    }
  }

  static async getProductsByCategory(req, res) {
    const { categoryId } = req.params;

    try {
      const category = await Categories.findByPk(categoryId, {
        include: Products,
      });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json(category.Products);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }
}

module.exports = ProductController;
