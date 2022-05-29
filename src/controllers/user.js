import User from "../models/User";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find()

    if(users.length > 0) {
      const newUsers = []

      users.map(user => {
        const {password, ...info } = user._doc
        newUsers.push(user)
      })

      return res.status(200).json(newUsers)
    }

    return res.status(200).json(users)

  } catch (error) {
    res.status(500).json(error)
  }

}

export const updateInfoUser = async (req, res) => {

  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if(!user) return res.status(404).json("User not exist")

    if(user.id === req.user._id) {
      try {
        const updateUser = await User.findByIdAndUpdate(userId, {
          $set: req.body
        }, {new: true})

        res.status(200).json(updateUser)
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      return res.status(401).json("You are not authentication")
    }

  } catch (error) {
    res.status(500).json(error)
  }
}