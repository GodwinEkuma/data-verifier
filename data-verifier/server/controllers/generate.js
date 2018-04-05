import fs from 'fs';

const generate = (req, res) => {
    const { quantity } = req.body;
    if (quantity < 700 || quantity > 1500){
        return res.status(400).json({
            message: 'Quantiy of numbers to be generated must be between 700 and 1500'
        });
    }
    const dataSet = [];
    const numbers = [];
    for (let i = quantity; i > 0; i--){
        const data = Math.floor(Math.random() * 9000000000) + 100000000000000;
        numbers.push(data);
    }
    dataSet.push({ numbers });
   const json = JSON.stringify(dataSet);
   fs.writeFile('DataSet.json', json, 'utf8', (error) => {
       if (error) {
           return res.status(500).json({
               message: 'An error occured and Data set could not generated',
               error: error.name
           });
       }
       return res.status(201).json({
        message: 'Data set generated succesfully'
    });
   });
};

export default generate;