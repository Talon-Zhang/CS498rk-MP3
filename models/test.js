var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-fn4k7.mongodb.net/mp3?retryWrites=true', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

var User = require('./userSchema');
var test = new User({ name: 'test', email: '2@test.com' });
test.save(function (err) {
    if (err) return console.error(err);
});

// var Task = require('./taskSchema');
// var test = new Task({ name: 'test', deadline: '2019-04-05' });
// test.save(function (err) {
//     if (err) return console.error(err);
// });
//
console.log('finished');