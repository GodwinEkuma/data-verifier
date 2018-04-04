import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    data: [Number]
});

const DataSet = mongoose.model('DataSet', dataSchema);

export default DataSet;