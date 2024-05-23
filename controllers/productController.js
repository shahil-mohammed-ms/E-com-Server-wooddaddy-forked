const Product = require('../models/product');

// const getProducts = async (req, res) => {
//   try {
//     const data = await Product.find()
//     res.status(200).json({ data })
//   } catch (error) {
//     console.log(error);
//   }
// };

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortField, sortOrder, search, category,priceGreaterThan, priceLessThan, priceMin, priceMax } = req.query;

    // Construct the base query
    const query = {};

    // Search functionality
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex }
        // Add additional fields for search as needed
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Sorting
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

   // Price greater than functionality
   if (priceGreaterThan) {
    query.sale_rate = { $gt: parseInt(priceGreaterThan) };
  }

  // Price less than functionality
  if (priceLessThan) {
    query.sale_rate = { $lt: parseInt(priceLessThan) };
  }

  // Price range functionality
  if (priceMin && priceMax) {
    query.sale_rate = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
  }



    // Find products based on the constructed query
    const products = await Product.find(query)
      .collation({ locale: 'en' }) // Enable case-insensitive search
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
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