const Wishlist = require('../models/wishlist');
const Cart = require('../models/cart');
const { ObjectId } = require('mongoose').Types;

// const getWishlist = async (req, res) => {

//   try {
//     const { userId,folderName } = req.params;
//     const { page = 1, limit = 10, sortField, sortOrder, search, category,
//       priceGreaterThan, priceLessThan, priceMin, priceMax,sortDiscount,sortDiscountGreaterThan   } = req.query;

//     // Construct the base query
//     const query = {};


//     // Category filter

//     // Sorting
//     const sortOptions = {};
//     if (sortField && sortOrder) {
//       sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
//     }



//     // Find wishlist items with the provided userId and populate the product details
//     const wishlistItems = await Wishlist.find({ userId,folderName })
//     .populate('proId')
//     .collation({ locale: 'en' }) // Enable case-insensitive search
//       .sort(sortOptions)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//       console.log('wishlistItems:', wishlistItems);
//       const productsWithData = await Promise.all(wishlistItems.map(async (product) => {
//         console.log('product:', product);
         
//         const wishlistExists = await Wishlist.exists({ userId:new  ObjectId('664db80748eeadcd76759a55'), proId: product.proId._id });
//         const cartExists = await Cart.exists({ userId:new  ObjectId('664db80748eeadcd76759a55'), proId: product.proId._id });
  
//         return {
//            ...product.proId._doc,
//           inWishlist: wishlistExists,
//           inCart: cartExists,
//         };
//       }));
//       console.log('productsWithData:', productsWithData);
//       res.status(200).json({ products: productsWithData });

 
// //     res.json({ products: wishlistItems });
//   } catch (error) {
//     console.log('errrr',error)
//     res.status(500).json({ error: 'Could not retrieve wishlist items' });
//   }
// };

const getWishlist = async (req, res) => {
  try {
    const { userId, folderName } = req.params;
    let { page = 1, limit = 10, sortField, sortOrder, search, category,
      priceGreaterThan, priceLessThan, priceMin, priceMax, sortDiscount, sortDiscountGreaterThan } = req.query;

    // Convert page and limit to integers
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    // Construct the base query
    const query = { userId, folderName };

    console.log('usr id',userId)

    // Sorting
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    // Find total count of wishlist items
    const totalCount = await Wishlist.countDocuments(query);

    // Find wishlist items with the provided userId and populate the product details
    const wishlistItems = await Wishlist.find(query)
      .populate('proId')
      .collation({ locale: 'en' }) // Enable case-insensitive search
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Fetch wishlist and cart details for each product
    const productsWithData = await Promise.all(wishlistItems.map(async (product) => {
      const wishlistExists = await Wishlist.exists({ userId: new ObjectId(userId), proId: product.proId._id });
      const cartExists = await Cart.exists({ userId: new ObjectId(userId), proId: product.proId._id });

      return {
        ...product.proId._doc,
        inWishlist: wishlistExists,
        inCart: cartExists,
      };
    }));

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limitNumber);
console.log(productsWithData)
    res.status(200).json({ products: productsWithData, totalPages });
  } catch (error) {
    console.log('errrr', error);
    res.status(500).json({ error: 'Could not retrieve wishlist items' });
  }
};


const addWishlistItem = async (req, res) => {
  const { userId, proId,folderName } = req.params;

  try {
    // Create a new wishlist item
    const newWishlistItem = await Wishlist.create({
      userId,
      proId,
      folderName
    });

    res.status(201).json({ message: 'Wishlist item added successfully', wishlistItem: newWishlistItem,added:true });
  } catch (error) {
    res.status(500).json({ error: 'Could not add wishlist item' });
  }
};

const removeWishlistItem = async (req, res) => {
  const { proId, userId,folderName } = req.params;
 
  try {
    // Find and remove the wishlist item by proId and userId
    const removedWishlistItem = await Wishlist.findOneAndDelete({ proId, userId,folderName });


    console.log('rem',removeWishlistItem)
    if (!removedWishlistItem) {
      return res.status(404).json({ error: 'Wishlist item with the specified proId not found' });
    }

    res.json({ message: 'Wishlist item removed successfully', removedWishlistItem ,added:false });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Could not remove wishlist item' });
  }
};

module.exports = {
  getWishlist,
  addWishlistItem,
  removeWishlistItem
};
