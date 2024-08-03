const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({

    Projectname2: {
        type: [String],
        default: undefined,
    },
    Issue2: {
        type: [String],
        default: undefined,
    },
    Description2: {
        type: [String],
        default: undefined,
    },
    Childissue2: {
        type: [String],
        default: undefined,
    },
    Priorety2: {
        type: [String],
        default: undefined,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Middleware to handle single strings or arrays
regSchema.pre('save', function(next) {

    if (typeof this.Projectname2 === 'string') {
        this.Projectname2 = [this.Projectname2];
    }
    if (typeof this.Issue2 === 'string') {
        this.Issue2 = [this.Issue2];
    }
    if (typeof this.Description2 === 'string') {
        this.Description2 = [this.Description2];
    }
    if (typeof this.Childissue2 === 'string') {
        this.Childissue2 = [this.Childissue2];
    }
    if (typeof this.Priorety2 === 'string') {
        this.Priorety2 = [this.Priorety2];
    }
    next();
});

const req2 = mongoose.model("req2", regSchema);
module.exports = { req2 };