const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  note: { type: String, required: true },
  label: { type: String, required: true },
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = NoteModel;
