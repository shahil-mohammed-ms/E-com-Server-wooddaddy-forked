const Category = require('../models/category')

const getCategory = async (req, res) => {
  try {
    const data = await Category.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addCategory = async (req, res) => {
  const { name, desc } = req?.body
  const image = req?.file?.filename
  try {
    let arr = []
    const categoryData = await Category.find()
    categoryData.map(x => {
      arr.push(x?.name?.toUpperCase())
    })
    const category = name.toUpperCase()
    const isExisting = arr.findIndex(x => x == category)
    if (isExisting === -1) {
      const cat = new Category({ name, desc, image })
      await cat.save()
      res.status(201).json({ data: cat, message: 'category created successfully' });
    } else {
      return res.status(400).json({ message: 'category already exists' })
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteCategory = async (req, res) => {
  try {
    const id = req.query.id
    const data = await Category.deleteOne({ _id: id });
    fs.unlink(`public/uploads/${data?.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return;
      }
      console.log('Image deleted successfully.');
    });
    res.status(200).json({ message: 'category deleted successfully' });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
  }