const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

// signup method
userSchema.statics.signup = async function(email, password){
    
    // validation
    if (!email || !password){
        throw Error('Please fill fields')
    }
    if (!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({email})
    if (exists) {
        throw Error("Email already used!")
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({email, password: hash})
    
    return user
}

// login method
userSchema.statics.login = async function(email, password){
    if (!email || !password){
        throw Error('Please fill fields')
    }

    const user = await this.findOne({email})
    if (!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}


module.exports = mongoose.model('User', userSchema)
