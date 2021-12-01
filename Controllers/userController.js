const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.usersController = {
    searchUser(req,res) {
        const id = req.body.id;
        const user = { _id: id }   
        const query = { id: req.body.id };
        User.find(query)
            .then((result) => {
                if(result[0]) {
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET , {
                        expiresIn: '10m'
                    });
                    res.send(   `Your access approved and will be expire in 10 minutes.
                                Your KEY: ${accessToken}`);
                }
                else {
                    res.send("User Not Found.");
                }
            })
    }
}

