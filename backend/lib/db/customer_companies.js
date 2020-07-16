const mongoose  =  require('mongoose');  
  
const customerCompany = new mongoose.Schema({  
    company_id:{  
        type:String  
    },  
    company_name:{  
        type:String  
    }
});  
  
module.exports = mongoose.model('customer_companies',customerCompany); 