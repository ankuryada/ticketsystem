const mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({

    name: {
        type: String,
        uppercase: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    role:{
        type: String,
        enum:['admin','employee'],
        default:'employee',
    },
    token:{
        type: String,
    },

    });
    const SALT_WORK_FACTOR = 10;
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
});
userSchema.index({ location: "2dsphere" });

    module.exports = mongoose.model("user", userSchema);