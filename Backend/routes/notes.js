 const express= require('express');
const router = express.Router(); 
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator'); 


//ROUTE 1: get all the notes using : GET "/api/auth/getuser".Login required\

router.get('/fetchallnotes',fetchuser,async (req, res) => {
    const notes = await Notes.find({user: req.user.id});//req.user.id is the id of the user who is logged in    
    res.json(notes);
   
})

//ROUTE 2: add a new note using : POST "/api/auth/addnote".Login required\

router.post('/addnote',fetchuser,[//array is used to add multiple middlewares
     body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
    

    try {
        const {title, description, tag} = req.body;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note= new Notes ({
        title, description, tag, user: req.user.id//req.user.id is the id of the user who is logged in
    })
    const savedNote = await note.save();//saving the note in the database
    res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }   
})



//ROUTE 3: update an existing note using : PUT "/api/auth/updatenote".Login required\

router.put('/updatenote/:id',fetchuser,async (req, res) => {
    const {title, description, tag} = req.body;//destructure the req.body
    //create a newNote object
    const newNote = {};//empty object to store the updated values
    if(title){newNote.title = title};//if title is present in the req.body, then store it in the newNote object
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);//params is used to get the id from the url
    if(!note){return res.status(404).send("Not Found")};
    if(note.user.toString() !== req.user.id){//req.user.id is the id of the user who is logged in
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});//new:true is used to return the updated note , $set is used to set the newNote object
    res.json({note});
})




//ROUTE 4: delete an existing note using : DELETE "/api/auth/deletenote".Login required\
router.delete('/deletenote/:id',fetchuser,async (req, res) => {
    const {title, description, tag} = req.body;//destructure the req.body
    //find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);//params is used to get the id from the url
    if(!note){return res.status(404).send("Not Found")};
    //Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){//req.user.id is the id of the user who is logged in
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);//new:true is used to return the updated note , $set is used to set the newNote object
    res.json({"Success": "Note has been deleted", note: note});//node:node is same as node means node is the key and node is the value of the key
}
)



module.exports = router; 