const { Schema, model } = require("mongoose")
const Ajv = require("ajv")
const ajv = new Ajv

const PollSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
})

const PollModel = model("Poll", PollSchema)

const typeString = { type: "string" }

const OpStructure = {
    type: "object",
    properties: {
        value: typeString,
        votes: {
            type: "integer",
            default: 0
        },
    },
    required: ["value", "votes"]
}

const PollStructure = {
    type: "object",
    properties: {
        author: typeString,
        question: typeString,
        options: {
            type: "array",
            items: OpStructure
        }
    },
    required: ["question", "options"]
}

const PollValidation = ajv.compile(PollStructure)

module.exports = {
    PollModel,
    PollValidation
}