const mongoose=require('mongoose')

const uschema= new mongoose.Schema(
    {
        username: {
            type: 'string',
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        phone : {
            type : Number,
            required : true
        }

        
        
            
    
})

module.exports=mongoose.model('userdata',uschema);

