const express= require('express');  // express is a framework for nodejs
const User = require('../models/Users');//
const router = express.Router(); // to use express router
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // to use bcryptjs
var  jwt = require('jsonwebtoken'); // to use jsonwebtoken
var fetchuser = require('../middleware/fetchuser'); // to use fetchuser middleware


const JWT_SECRET = 'sauravranjan';// to create a secret key for jsonwebtoken

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });  
    } 


    // Check whether the user with this email exists already 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10); // to generate salt
    const secPass = await bcrypt.hash(req.body.password, salt);// to hash the password  

    // Create a new user
     user= await User.create({
        name: req.body.name,// to get the name from the body
        email: req.body.email,  
        password: secPass,
    })
    const data={
        user:{
            id:user.id
        }
    } 
    const authToken = jwt.sign(data, JWT_SECRET);// to create a token
    res.json({authToken}); // to send the token to the user 
    
    
//route 2:
// Authenticate a user using: POST "/api/auth/login". No login required
//validate user
    router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });  
    } 

    const {email,password} = req.body;// to get the email and password from the body
    try {
        let user = await User.findOne({email});// to find the user by email
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);// to compare the password 
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);// to create a token
        res.json({authToken}); // to send the token to the user

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   
    }
});
})

// Route 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post('/getuser',fetchuser,async (req, res) => {
    try {
        userId = req.user.id;// to get the user id from the req.user
        const user = await User.findById(userId).select("-password");// to find the user by id and select all the details except password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   
    }
}
)
 



module.exports = router;// to export the router