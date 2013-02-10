var mongoose = require('mongoose');

var settingsSchema = mongoose.Schema(
    {id: String,
        bgcolor: String,
        textcolor: String,
        textsize: String
      }
);

mongoose.model('Settings', settingsSchema);