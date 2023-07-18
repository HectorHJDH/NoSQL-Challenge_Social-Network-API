const { User } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const userData = await User.aggregate([
        // First stage: Lookup to get friends' data
        {
          $lookup: {
            from: "users",
            localField: "friends",
            foreignField: "_id",
            as: "friendsData",
          },
        },
        // Second stage: Project to include only required fields and friendCount
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            thoughts: 1,
            friends: 1,
            friendCount: { $size: "$friendsData" }, // Calculate the friendCount as the size of the friendsData array
          },
        },
      ]);

      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // get one user by generated id
  async getUserById(req, res) {
    try {
      const userData = await User.findById(req.params.userId).populate(
        "thoughts" // Populate the thoughts field
      );
      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // createUser
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // updateUser
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      if (userData) {
        return res.status(404).json({ message: "User info updated succesfully" });
      }
      return res.status(404).json({ message: "No user found with that Id" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // deleteUser
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      if (userData) {
        return res.status(404).json({ message: "User deleted succesfully" });
      }
      return res.status(404).json({ message: "No user found with that Id" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
