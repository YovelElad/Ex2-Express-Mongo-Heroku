const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.usersController = {
    searchUser(req,res) {
        // const query = {id: req.body.id};
        // User.find(query)
        // .then((result) => {
        //     console.log(result[0]["_id"])
        //     res.send(`Your key is: ${result[0]["_id"]}`);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

        console.log("login");
        const id = req.body.id;
        const user = { _id: id }
    
        const query = { id: req.body.id };
        User.find(query)
            .then((result) => {
                console.log(result);
                if(result[0]) {
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET , {
                        expiresIn: '60s'
                    });
                    res.json({ accessToken: accessToken });
                }
                else {
                    console.log("user not found");
                }
            })
    }
}

