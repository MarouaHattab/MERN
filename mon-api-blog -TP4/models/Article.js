const mongoose = require('mongoose');
const articleSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'Le titre est obligatoire'],
            trim:true
        },
        content:{
            type:String,
            required:[true,'Le contenu est obligatoire']
        },
        author:{
            type:String,
            default:'Anonyme'
        },
        CreatedAt:{
            type:Date,
            default:Date.now
        }
    }
);
module.exports=mongoose.model('Article',articleSchema);