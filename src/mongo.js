const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginFormPractice", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.error('Failed to connect to MongoDB:', e);
    });

const logInSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
