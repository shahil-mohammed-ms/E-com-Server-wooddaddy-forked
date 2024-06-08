const Banner = require('../models/banner');

const getBanners = async (req, res) => {
  try {
    const data = await Banner.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addBanner = async (req, res) => {
  console.log('banner det ',req.body)
  const { title, subtitle } = req?.body
  const imgUrl = req?.file?.filename
  try {
   
     
    
     
      const ban = new Banner({title, subtitle, imgUrl })
      await ban.save()
      res.status(201).json({ data: ban, message: 'banner created successfully' });
     
  } catch (error) {
    console.log(error);
  }
}

 const getBannerById = async(req,res) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json({ data: banner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }


}

const deleteBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const updateBannerById = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle } = req.body;
  const imgUrl = req.file?.filename;

  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    if (title) banner.title = title;
    if (subtitle) banner.subtitle = subtitle;
    if (imgUrl) banner.imgUrl = imgUrl;

    await banner.save();
    res.status(200).json({ data: banner, message: 'Banner updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};


module.exports = {
  getBanners,
  addBanner,
getBannerById,
deleteBannerById,
updateBannerById

}