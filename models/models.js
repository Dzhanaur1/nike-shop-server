const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Categories = sequelize.define(
  "Categories",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      collate: "utf8mb4_general_ci",
      defaultValue: null,
    },
  },
  {
    tableName: "Categories",
    timestamps: false,
  }
);

const Photos = sequelize.define(
  "Photos",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    photo_path: {
      type: DataTypes.STRING,
      collate: "utf8mb4_general_ci",
      defaultValue: null,
    },
  },
  {
    tableName: "Photos",
    timestamps: false,
  }
);

const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      collate: "utf8mb4_general_ci",
      defaultValue: null,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    description: {
      type: DataTypes.TEXT,
      collate: "utf8mb4_general_ci",
    },
  },
  {
    tableName: "Products",
    timestamps: false,
  }
);

const Product_Category = sequelize.define(
  "Product_Category",
  {
    product_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    category_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    tableName: "Product_Category",
    timestamps: false,
  }
);
const Sizes = sequelize.define("Sizes", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  size: {
    type: DataTypes.TEXT,
    defaultValue: null,
    allowNull: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

// Связи между моделями
Products.belongsToMany(Categories, {
  through: Product_Category,
  foreignKey: "product_id",
});
Categories.belongsToMany(Products, {
  through: Product_Category,
  foreignKey: "category_id",
});
Products.hasMany(Photos, { foreignKey: "product_id" });
Photos.belongsTo(Products, { foreignKey: "product_id" });

Products.hasMany(Sizes, { foreignKey: "product_id" });
Sizes.belongsTo(Products, { foreignKey: "product_id" });
// Экспортируем модели
module.exports = {
  Categories,
  Photos,
  Products,
  Product_Category,
  Sizes,
};
