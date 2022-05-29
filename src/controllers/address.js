import Address from "../models/Address";

export const getAllAddress = async (req, res) => {
  try {
    const user = req.user;

    const addresses = await Address.find({userId: user._id})

    res.status(200).json(addresses)

  } catch (error) {
    res.status(500).json(error)
  }
}

export const createAddress = async (req, res) => {
  try {
    const user = req.user;

    const newAddress = new Address({
      userId: user._id,
      address: req.body.address,
      nameReceivedUser: req.body.nameReceivedUser,
      numberPhone: req.body.numberPhone
    })

    const saveAddress = await newAddress.save();

    res.status(201).json(saveAddress)

  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

     
    const deletedAddress = await Address.findByIdAndDelete(addressId)

    if(!deletedAddress) return res.status(404).json("Not found address")

    res.status(200).json("Deleted address successfully")

  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const updatedAddress = await Address.findByIdAndUpdate(addressId,{
      $set: req.body
    }, {new: true})

    if(!updatedAddress) return res.status(404).json("Not found address")

    res.status(200).json(updatedAddress)
    
  } catch (error) {
    res.status(500).json(error)
  }
}