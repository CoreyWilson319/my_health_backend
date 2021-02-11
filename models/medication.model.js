const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicationSchema = new Schema({
    prescribed_by: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
    prescribed_user: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
    trade_name: {
        type: String,
    },
    brand_name: {
        type: String,
    }
    // Add Dosage


})
const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;