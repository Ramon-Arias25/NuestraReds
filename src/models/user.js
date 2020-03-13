const mongoose = require('mongoose');
const bcryt = require ('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String },
    password: { type: String},
    filename: { type: String},
    follows:{ type:Number, default: 0},
    timestamp: { type: Date, default: Date.now}
});

userSchema.methods.encryptPassword = (password) => {
    return bcryt.hashSync(password, bcryt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password){
    return bcryt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);