const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Mobile: { type: String, required: true, unique: true, },
    Email: { type: String, required: true, unique: true },
    NationalID: { type: String, required: true, unique: true, min:14, max:14,},
    Age: { type: Number, required: true }
});

module.exports = mongoose.model('studentModule', studentSchema);