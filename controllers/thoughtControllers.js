const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // get one thought by generated id
  async getThoughtById(req, res) {
    try {
      const thoughtData = await Thought.findById(req.params.thoughtId);
      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // createThought
  createThought(req, res) {
    // Create a new thought using the data from the request body
    Thought.create(req.body)
      .then((dbThoughtData) => {
        // Find the user with the provided username and update their thoughts array
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true } // Return the updated user data
        );
      })
      .then((dbUserData) => {
        // Check if the user was found and updated successfully
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this id!" });
        }

        // If the user was found and updated, respond with a success message
        res.json({ message: "Thought successfully created!" });
      })
      .catch((err) => {
        // Handle any errors that occurred during the process
        console.log(err);
        res.status(500).json(err);
      });
  },

  // updateThought
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // deleteThought
  async deleteThought(req, res) {
    try {
      // Find and delete the thought
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      // If the thought is found and deleted, update the associated user
      if (thoughtData) {
        // Find the user with the deleted thought's ID in their thoughts array
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          // Use the $pull operator to remove the thought ID from the thoughts array
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true } // Set the `new` option to true to return the updated user data
        );

        // If the user is found and updated, return the user data
        if (user) {
          res.json(user);
        } else {
          // If the user is not found, return a 404 status with an error message
          res.status(404).json({ message: "User not found." });
        }
      } else {
        // If the thought is not found, return a 404 status with an error message
        res.status(404).json({ message: "Thought not found." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
