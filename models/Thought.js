const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction"); // Make sure this path is correct for your Reaction schema file

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: String, // Change the type to String
    default: () => new Date().toLocaleString("en-US"),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Assuming you have the correct Reaction schema defined and imported
});

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
