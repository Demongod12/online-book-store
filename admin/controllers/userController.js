const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//user registration
exports.registerUser = (req,res) =>{
    const {email, password, name} = req.body;

    //check if email already exists
    const emailCheckQuery = "SELECT * FROM Users WHERE email = ?";
    db.query(emailCheckQuery, [email], (err, results) =>{
        if (err) throw err;
        if (resourceLimits.length > 0) {
            return res.status(400).json({message: 'Email already exists'});
        };

        //hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) =>{
            if (err) throw err;

            //Insert new user
            const query = "INSERT INTO Users (email, password, name) VALUES (?,?,?,)";
            db.query(query, [email,hashedPassword, name], (err, result) =>{
                if (err) throw err;
                res.status(201).json({message: 'User registered successfully'});
            });
        });
    });
};


//User login
exports.loginUser = (req,res) =>{
    const {email, password} = req.body;

    const query = "SELECT * FROM Users WHERE email = ?";
    db.query(query, [email], (err, results) =>{
        if (err) throw err;
        if(results.length === 0){
            return res.status(400).json({message: "User not found"});
        };

        const user = results[0];
        bcrypt.compare(password, user.password, (err,isMatch) =>{
            if (err) throw err;
            if(!isMatch){
                return res.status(400).json({message: "Invalid credentials"});
            };

            res.json({message: "Login successfull", user});
        });
    });
};

//Update user profile
exports.updateProfile = (req, res) =>{
    const {user_id, name, email} = req.body;
    const query = 'UPDATE Users SET name = ?, email = ? WHERE user_id =?';
    db.query(query, [name, email, user_id], (err,result) =>{
        if (err) throw err;
        res.json({message: "Profile updated successfully"});
    });
};