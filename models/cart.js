const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }; // Default cart structure

      if (!err && fileContent.length > 0) {
        try {
          cart = JSON.parse(fileContent);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products.push(updatedProduct);
      }

      cart.totalPrice += productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) console.log("Error writing file:", err);
      });
    });
  }
};
