const Address = require('../models/address');

// Create a new address
const createAddress = async (req, res) => {
  try {
    const {userId} = req.params
    const {  firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile, primary } = req.body;

    if (primary) {
      // If the new address is marked as primary, make sure to update the existing primary address to non-primary
      await Address.updateMany({ userId, primary: true }, { primary: false });
    }

    const newAddress = new Address({
      userId,
      firstname,
      lastname,
      country,
      address_line_1,
      address_line_2,
      city,
      state,
      zip,
      mobile,
      primary
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Error creating address', error });
  }
};

// Update an existing address
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile, primary } = req.body;

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    if (primary) {
      // If the updated address is marked as primary, make sure to update the existing primary address to non-primary
      await Address.updateMany({ userId: address.userId, primary: true }, { primary: false });
    }

    address.firstname = firstname;
    address.lastname = lastname;
    address.country = country;
    address.address_line_1 = address_line_1;
    address.address_line_2 = address_line_2;
    address.city = city;
    address.state = state;
    address.zip = zip;
    address.mobile = mobile;
    address.primary = primary;

    const updatedAddress = await address.save();
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address', error });
  }
};

// Get all addresses for a user
const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    const addresses = await Address.find({ userId });
    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ message: 'Addresses not found' });
    }

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching addresses', error });
  }
};

// Get a single address by ID
const getAddressById = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching address', error });
  }
};

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  getAddressById
};
