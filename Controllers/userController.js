const User = require('../models/users');
exports.usersController = {
    searchUser(req,res) {
        const query = {id: req.body.id};
        User.find(query)
        .then((result) => {
            console.log(result[0]["_id"])
            res.send(`Your key is: ${result[0]["_id"]}`);
        })
        .catch((err) => {
            console.log(err);
        });
        

    }
}

