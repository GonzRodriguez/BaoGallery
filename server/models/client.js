const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: String,
    email: String,
    keywords: String,
    notes: String,
    creatorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})


const Client = mongoose.model('Client', clientSchema);

module.exports = Client;