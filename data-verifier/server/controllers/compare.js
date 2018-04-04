import mongoose from 'mongoose';
import DataSet from '../models/DataSet';
import { readFileSync } from 'fs';

Set.prototype.difference = (setB) => {
    const difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

const compare = (req, res) => {
    const readData = readFileSync('C:/Personal Projects/data-verifier/DataSet.json', 'utf8');
    const extractData = JSON.parse(readData);
    return DataSet
        .find()
        .sort({ _id: -1 })
        .select('data')
        .limit(1)
        .exec()
        .then((numbers) => {
            console.log('Numbers', numbers)
            if (numbers.length === 0) {
                const newData = new DataSet({ data: extractData[0].numbers });
                newData.save((error) => {
                    if (error) {
                        return res.status(500).json({
                            message: 'An error has occurred and new data set was no added to the verified list'
                        });
                    }
                    return res.status(200).json({
                        message: 'data set has been added to the verified list'
                    });
                });
            }
            const verified = new Set(numbers[0].data);
            const unVerified = new Set(extractData[0].numbers);
            const difference = verified.difference(unVerified);
            if (difference.length > 750) {
                return res.status(409).json({
                    message: 'Data sets are similar and cannot be added to a verified list'
                });
            }
            const newData = new DataSet({ data: extractData.numbers });
            newData.save((error) => {
                if (error) {
                    return res.status(500).json({
                        message: 'An error has occurred and new data set was no added to the verified list'
                    });
                }
                return res.status(200).json({
                    message: 'data set has been added to the verified list'
                });
            });
        })
        .catch((error) => {
            if (error) {
                return res.status(500).json({
                    message: 'An error has occurred and new data set was no added to the verified list'
                });
            }
        });  
 
}

export default compare;