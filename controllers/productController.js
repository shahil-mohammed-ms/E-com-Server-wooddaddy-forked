const Product = require('../models/product');

const getProducts = async (req, res) => {
  try {
    const data = await Product.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  try {
    console.log(req.files);
    const { name, subheading, category, brand, price, stock, discount, sale_rate, description } = req?.body
    if (req.files.length != 0) {
      const product =new Product({
        name, subheading, category, brand, price, stock, discount, sale_rate, description,
        image: req.files.map((x) => x.filename)
      });
      console.log(product);
      await product.save();
      if (product) {
        res.status(200).json({ message: "Product added successfully !"});
      } else {
        res.status(400).json({ message: "failed only jpg ,jpeg, webp & png file supported !"});
      }
    } else {
      res.status(400).json({ message: "failed only jpg ,jpeg, webp & png file supported !"});
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateImage = async (req, res) => {
  try {
    let { pId, img } = req.body
    console.log(pId, img);
    await Product.updateOne({ _id: pId }, { $pull: { image: img } })
    const productData = Product.findOne({ _id: pId })
    console.log(productData);
    res.send({ newImage: productData.image });
  } catch (error) {
    console.log(error.message);
  }
};
const uploadImage = async (req, res) => {
  try {
    console.log(req.files);
    const productDetails = await Product.findOne({ _id: req.body.pId })
    const oldImg = productDetails.image
    const newImg = req.files.map((x) => x.filename)
    const images = oldImg.concat(newImg)
    console.log(images);
    await Product.updateOne({ _id: req.body.pId }, { $set: { image: images } })
    const productData = await Product.findOne({ _id: req.body.pId })
    console.log(productData.image);
    res.json({ newImage: productData.image });
  } catch (error) {
    console.log(error.message);
  }
};

const editProduct = async (req, res) => {
  try {
    console.log(req.files);
    if (req.files.length != 0) {
      const productDetails = await Product.findOne({ _id: req.query.id })
      const oldImg = productDetails.image
      const newImg = req.files.map((x) => x.filename)
      const images = oldImg.concat(newImg)
      console.log(images);
      product = await Product.updateOne({ _id: req.query.id }, {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          stock: req.body.stock,
          category: req.body.category,
          image: images
        }
      })
    } else {
      product = await Product.updateOne({ _id: req.query.id }, {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          stock: req.body.stock,
          category: req.body.category,
        }
      })
    } console.log(product);
    const productData = await Product.find()
    if (productData) {
      res.render("admin/product", {
        message: "registration successfull.",
        products: productData, active: 4
      })
    } else {
      res.render("admin/product", { message: "registration failed", products: productData, active: 4 })
    }
  } catch (error) {
    console.log(error.message)
  }
}
const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.query.id })
    res.status(200).json({ message: 'product deleted successfully' });
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  editProduct,
  updateImage,
  uploadImage,
  getProducts,
  addProduct,
  deleteProduct,
}