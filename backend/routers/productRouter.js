import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { generateSKU } from '../utils/functions.js';
import StockHistory from '../models/stockHistory.js';
import sequelize from '../config/dbConfig.js';

const ProductRouter = express.Router();

// GET ALL PRODUCTS
ProductRouter.get(
  '/all',
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.findAll();
      res.send({ products: products });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  })
);

// GET SINGLE PRODUCT
ProductRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const productId = req.params.id;

      const isExist = await Product.count({
        where: {
          _id: productId,
        },
      });

      if (isExist === 1) {
        const product = await Product.findOne({
          where: { _id: productId },
        });
        console.log(productId);
        res.send({ product: product });
      } else if (isExist === 0) {
        res.status(500).send({ message: 'Product Not Found' });
      }
    } catch (err) {
      res.status(500).send({ message: err.name });
    }
  })
);

// ADD A PRODUCT
ProductRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const product = {
        sku: req.body.sku,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
      };
      const createdProduct = await Product.create(product, {
        transaction: t,
      });

      console.log(createdProduct);
      await StockHistory.create(
        {
          productId: createdProduct._id,
          quantity: createdProduct.quantity,
          changeType: 'IN',
        },
        { transaction: t }
      )
        .then(async (r) => {
          console.log(r);
          await t.commit();
          res
            .status(200)
            .send({ message: 'Product added successfully' });
        })
        .catch(async (e) => {
          await t.rollback();
          res.status(500).send({
            message: e,
          });
        });
    } catch (err) {
      await t.rollback();
      (err) => res.status(500).send({ message: err.name });
    }
  })
);

// UPDATE A PRODUCT
ProductRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const productId = req.params.id;

      const currentProduct = await Product.findOne({
        where: {
          _id: productId,
        },
      });
      if (currentProduct) {
        const product = {
          sku: req.body.sku,
          name: req.body.name,
          quantity: req.body.quantity,
          price: req.body.price,
        };

        const oldQuantity = currentProduct.quantity;
        const newQuantity = product.quantity || oldQuantity;
        const diff = newQuantity - oldQuantity;
        let changeType;
        if (diff > 0) {
          changeType = 'IN';
        } else if (diff < 0) {
          changeType = 'OUT';
        }

        const updatedProduct = await Product.update(product, {
          where: { _id: productId },
          transaction: t,
        });

        if (changeType) {
          const stockData = {
            productId: productId,
            quantity: Math.abs(diff),
            changeType: changeType,
          };
          console.log(stockData);
          await StockHistory.create(stockData, {
            transaction: t,
          })
            .then(async (r) => {
              await t.commit();
              res.send({
                message: 'Product updated successfully',
              });
            })
            .catch(async (err) => {
              await t.rollback();
              err.errors.forEach((e) => {
                res.status(400).send({ message: e.message });
              });
            });
        }
      } else {
        res.status(500).send({ message: 'Product Not Found' });
      }
    } catch (err) {
      await t.rollback();
      res.status(500).send({ message: err });
    }
  })
);

// DELETE A PRODUCT
ProductRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const productId = req.params.id;
      const isExist = await Product.count({
        where: {
          _id: productId,
        },
      });
      if (isExist === 1) {
        await Product.destroy({
          where: {
            _id: productId,
          },
        });
        res.send({
          message: 'Product deleted successfully',
        });
      } else if (isExist === 0) {
        res.status(500).send({ message: 'Product Not Found' });
      }
    } catch (err) {
      res.status(500).send({ message: err.name });
    }
  })
);

export default ProductRouter;
