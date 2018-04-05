# data-verifier
Data Verifier keeps a list of verified data sets. Each data set has a unique Id. To add a new data set to the verified list it compares the incoming data set with all the verified sets to see if they are similar. The new data is rejected if is more than 50% similar to data in the verified list or added if it is less than 50% similar


### Installation
- Create a parent folder on your system
- Clone repo. `$https://github.com/GodwinEkuma/data-verifier.git`
- Install all dependencies
`$ npm install`
- Start the server
`$ npm start`

### Usage
## To generate new data set
- localhost:2018/verifier/generate

## To add data to the verified list
- localhost:2018/verifier/compare
   
