const ContentSection = require('../models/contentSection');

const getContentSection = async (req, res) => {
  try {
    const data = await ContentSection.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addContentSection = async (req, res) => {
  console.log('reached')
  console.log(req.body)
  const { title, desc } = req?.body;
 


  try {
    // Find the existing ContentSection (assuming there is only one)
    let contSec = await ContentSection.findOne();

    if (contSec) {
      // Update the existing ContentSection
      contSec.title = title;
      contSec.desc = desc;
      await contSec.save();
      res.status(200).json({ data: contSec, message: 'ContentSection updated successfully' });
    } else {
      // Create a new ContentSection
      contSec = new ContentSection({ title, desc });
      await contSec.save();
      res.status(201).json({ data: contSec, message: 'ContentSection created successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};



module.exports = {

  getContentSection,
  addContentSection,


}
