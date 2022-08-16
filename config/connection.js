const mongoose = require('mongoose');

//local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/social-networkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;