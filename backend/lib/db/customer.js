const mongoose  =  require('mongoose');  
  
const customer = new mongoose.Schema({  
    user_id:{  
        type:String  
    },  
    login:{  
        type:String  
    },  
    password:{  
        type:String  
    },  
    name:{  
        type:String  
    },  
    company_id:{  
        type:Number  
    },  
    credit_cards:{  
        type:String  
    }
});  
  
module.exports = mongoose.model('customers',customer); 