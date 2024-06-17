const Product = require('../models/product');
const Wishlist = require('../models/wishlist');
const Cart = require('../models/cart');

const getProduct = async (req, res) => {
  
  const { proId } = req.params;

  try {
    const product = await Product.findById(proId); // Fetch the product using the provided proId
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const wishlistExists = await Wishlist.exists({ userId: '664db80748eeadcd76759a55', proId: proId });
    const cartExists = await Cart.exists({ userId: '664db80748eeadcd76759a55', proId: proId });

    const productWithExtras = {
      ...product._doc,
      inWishlist: wishlistExists,
      inCart: cartExists,
    };

    res.status(200).json({ product: productWithExtras }); // Send back the product with additional data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the product' });
  }
};


// const getProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, sortField, sortOrder, search, category,
//       priceGreaterThan, priceLessThan, priceMin, priceMax,sortDiscount,sortDiscountGreaterThan   } = req.query;

//     // Construct the base query
//     const query = {};

//     // Search functionality
//     if (search) {
//       const searchRegex = new RegExp(search, 'i');
//       query.$or = [
//         { name: searchRegex },
//         { brand: searchRegex }
//         // Add additional fields for search as needed
//       ];
//     }

//     // Category filter
//     if (category) {
//       query.category = category;
//     }

//     // Sorting
//     const sortOptions = {};
//     if (sortField && sortOrder) {
//       sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
//     }

//    // Price greater than functionality
//    if (priceGreaterThan) {
//     query.sale_rate = { $gt: parseInt(priceGreaterThan) };
//   }

//   // Price less than functionality
//   if (priceLessThan) {
//     query.sale_rate = { $lt: parseInt(priceLessThan) };
//   }

//   // Price range functionality
//   if (priceMin && priceMax) {
//     query.sale_rate = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
//   }

//   if (sortDiscount) {
//     query.discount = parseInt(sortDiscount);
//   }

//   // Sort by discount greater than functionality
//   if (sortDiscountGreaterThan) {
//     query.discount = { $gt: parseInt(sortDiscountGreaterThan) };
//   }

//     // Find products based on the constructed query
//     const products = await Product.find(query)
//       .collation({ locale: 'en' }) // Enable case-insensitive search
//       .sort(sortOptions)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     // Fetch wishlist and cart details for each product
//     const productsWithData = await Promise.all(products.map(async (product) => {
//       const wishlistExists = await Wishlist.exists({ userId: '664db80748eeadcd76759a55', proId: product._id });
//       const cartExists = await Cart.exists({ userId: '664db80748eeadcd76759a55', proId: product._id });

//       return {
//         ...product._doc,
//         inWishlist: wishlistExists,
//         inCart: cartExists,
//       };
//     }));


//     res.status(200).json({ products: productsWithData });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'An error occurred while fetching products' });
//   }
// };

const getProducts = async (req, res) => {

  console.log('get products reached ,')
  try {
    const { page = 1, limit = 3, sortField, sortOrder, search, category,
      priceGreaterThan, priceLessThan, priceMin, priceMax, sortDiscount, sortDiscountGreaterThan } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
// console.log('lim',limit)
console.log('lim n',limitNumber)

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

    if (sortDiscount) {
      query.discount = parseInt(sortDiscount);
    }

    // Sort by discount greater than functionality
    if (sortDiscountGreaterThan) {
      query.discount = { $gt: parseInt(sortDiscountGreaterThan) };
    }

    // Find products based on the constructed query
    const totalProducts = await Product.countDocuments(query);
    console.log('tpro',totalProducts)
    const products = await Product.find(query)
      .collation({ locale: 'en' }) // Enable case-insensitive search
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Fetch wishlist and cart details for each product
    const productsWithData = await Promise.all(products.map(async (product) => {
      const wishlistExists = await Wishlist.exists({ userId: '664db80748eeadcd76759a55', proId: product._id });
      const cartExists = await Cart.exists({ userId: '664db80748eeadcd76759a55', proId: product._id });

      return {
        ...product._doc,
        inWishlist: wishlistExists,
        inCart: cartExists,
      };
    }));

    res.status(200).json({ totalProducts, products: productsWithData, totalPages: Math.ceil(totalProducts / limitNumber) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};



const addProduct = async (req, res) => {
  try {
    console.log(req.files);
    console.log(req?.body);
    const { name, subheading, category, brand, price, stock, discount, sale_rate, description,specification,dimension,warranty } = req?.body
    if (req.files.length != 0) {
      const product =new Product({
        name, subheading, category, brand, price, stock, discount, sale_rate, description,specification,dimension,warranty,
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
    const  product = await Product.updateOne({ _id: req.query.id }, {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          specification:req.body.specification,
          dimension:req.body.dimension,
          warranty:req.body.warranty,
          stock: req.body.stock,
          category: req.body.category,
          image: images
        }
      })
    } else {
     const product = await Product.updateOne({ _id: req.query.id }, {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          specification:req.body.specification,
          dimension:req.body.dimension,
          warranty:req.body.warranty,
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
  getProduct,
  editProduct,
  updateImage,
  uploadImage,
  getProducts,
  addProduct,
  deleteProduct,
}