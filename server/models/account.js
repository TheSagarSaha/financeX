const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const accountSchema = new Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

accountSchema.statics.signup = async function(f_name, l_name, email, username, password) {
    console.log(f_name, password);
    const existsUsername = await this.findOne({ username })
    const existsEmail = await this.findOne({ email })
    if (existsUsername || existsEmail) {
        console.log("hererererererererereer");
        return {"msg": "email/username already in use"}
    }
    console.log("34324324234234")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    console.log(hash, salt, password)
    const newUser = await this.create({
        first_name : f_name,
        last_name  : l_name,
        email      : email,
        username   : username,
        password   : hash
    })

    return newUser
}

accountSchema.statics.login = async function(username, password) {
    console.log('here at account.js', username );
    const user = await this.findOne({username})
    console.log('here at account.js', user );
    if (!user){
        throw Error('invalid credentials')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match){
        console.log("here");
        throw Error("incorrect pass")
    }
    return user
}

module.exports = mongoose.model("Account", accountSchema)
