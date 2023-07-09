const Ajv = require("ajv")
const { Schema, model } = require("mongoose")
const ajv = new Ajv

const typeString = { type: "string" }
const UserStructure = {
    type: "object",
    properties: {
        name: typeString,
        password: typeString
    },
    required: ["name", "password"]
}

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String
})

const UserModel = model("User", UserSchema)
const UserValidation = ajv.compile(UserStructure)

module.exports = {
    UserModel,
    UserValidation
}