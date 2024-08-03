const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({

    Projectname: {
        type: [String],
        default: undefined,
    },
    Issue: {
        type: [String],
        default: undefined,
    },
    Description: {
        type: [String],
        default: undefined,
    },
    Childissue: {
        type: [String],
        default: undefined,
    },
    Priorety: {
        type: [String],
        default: undefined,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Middleware to handle single strings or arrays
regSchema.pre('save', function(next) {

    if (typeof this.Projectname === 'string') {
        this.Projectname = [this.Projectname];
    }
    if (typeof this.Issue === 'string') {
        this.Issue = [this.Issue];
    }
    if (typeof this.Description === 'string') {
        this.Description = [this.Description];
    }
    if (typeof this.Childissue === 'string') {
        this.Childissue = [this.Childissue];
    }
    if (typeof this.Priorety === 'string') {
        this.Priorety = [this.Priorety];
    }
    next();
});

const reqs = mongoose.model("reqs", regSchema);
module.exports = { reqs };