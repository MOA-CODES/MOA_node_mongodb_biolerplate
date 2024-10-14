const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: [true, 'Please provide a name'],
    },
    email:{
        type: String,
        unique:true,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address'
        ],
    },
    role:{
        type: String,
        default:'Client',
        enum:{
            values:['SuperAdmin','Admin','Client'],
            message:'{VALUE} is not supported',
        },
    },
    phone:{
        type: String,
        unique: true,
        required: [true,'Please provide a valid phone number'],
        match: [
            /^(\+?\d{1,4}[-.\s]?)?((\d{10})|(\d{3}[-.\s]\d{3}[-.\s]\d{4}))$/,
            'Please provide a valid phone number'
        ],

    },
    password:{
        type: String,
        allowNull: false,
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
            'Password length should be >6 & have at least one lowercase, uppercase & special character'
        ],
    
    },
    },{timestamps:true});
    
User.pre('save',async function (){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
    
User.methods.createJWT = function(){
    return jwt.sign({email:this.email, role:this.role},process.env.AUTH_KEY,{expiresIn:process.env.TOKEN_TIME})
} 
    
User.methods.comparePSW = async function(userPSW){ 
    return await bcrypt.compare(userPSW, this.password)
    
}
    
User.methods.updatePSW = async function(userPSW){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(userPSW, salt)
}

module.exports = mongoose.model('User', User)