const Advertisement = require('../models/advertisement');

const getAdvertisement = async (req, res) => {
  try {
    const data = await Advertisement.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addAdvertisement = async (req, res) => {
   
  const {offer, title, subtitle } = req?.body
  const imgUrl = req?.file?.filename
  try {
     
      const adv = new Advertisement({offer,title, subtitle, imgUrl })
      await adv.save()
      res.status(201).json({ data: adv, message: 'advertisement created successfully' });
     
  } catch (error) {
    console.log(error);
  }
}

 const getAdvertisementById = async(req,res) => {
  const { id } = req.params;
  try {
    const advertisement = await Advertisement.findById(id);
    if (!advertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    res.status(200).json({ data: advertisement });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }


}

const deleteAdvertisementById = async (req, res) => {
  const { id } = req.params;
  try {
    const advertisement = await Advertisement.findByIdAndDelete(id);
    if (!advertisement) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const updateAdvertisementById = async (req, res) => {
  const { id } = req.params;
  const { offer,title, subtitle } = req.body;
  const imgUrl = req.file?.filename;

  try {
    const advertisement = await Advertisement.findById(id);
    if (!advertisement) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    if (offer) advertisement.offer = offer;
    if (title) advertisement.title = title;
    if (subtitle) advertisement.subtitle = subtitle;
    if (imgUrl) advertisement.imgUrl = imgUrl;

    await advertisement.save();
    res.status(200).json({ data: advertisement, message: 'Banner updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};


module.exports = {
  getAdvertisement,
  addAdvertisement,
getAdvertisementById,
deleteAdvertisementById,
updateAdvertisementById

}