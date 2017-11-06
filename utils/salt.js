var bcrypt = require('bcrypt');
const saltRounds = 10;
//var myPlaintextPassword = 's0/\/\P4$$w0rD';
//var someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});