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
    const { path } = req.body;
    const jsonData = readFileSync(path, 'utf8');
    const extracted = JSON.parse(jsonData);
    DataSet
      .find()
      .select('data')
      .limit(3)
      .exec()
      .then((numbers) => {
          if (numbers.length === 0) {
              const newDataSet = new DataSet({ data: extracted[0].numbers});
              newDataSet.save()
              .then((result) => {
                  return res.status(200).json({
                      message: 'New dataset was successfully verified',
                      result
                  });
              });
          }
          for (let i = numbers.length - 1; i > 0; i--) {
            const verified = new Set(numbers[i].data);
           
            const unVerified = new Set(extracted[0].numbers);
            
            const difference = verified.difference(unVerified);
            
            console.log('Diffrence Size', difference.size);
            if (difference.size <  numbers[i].data.length / 2) {
                return res.status(409).json({
                  message: 'Data is similar to the verified list and cannot be added to the list'
                });
            }
          }
        const newDataSet = new DataSet({ data: extracted[0].numbers});
          newDataSet.save()
          .then((result) => {
              return res.status(200).json({
                  message: 'New dataset was successfully verified',
                  result
              });
          });                   
      })
      .catch((error) => {
          if (error) {
              return res.status(500).json({
                message: 'An error occured'
              });
          }
      });
}

export default compare;