const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const ApiClass = require('./ApiClass');
const _api = new ApiClass()

app.use(express.static('Assets'));
nunjucks.configure("./templates",{
    autoescape:true,
    express:app,
    watch:true
});

// renders the login screen so that users can login
app.get('/',(req,res) => {
    res.render('index.njk')
})

app.get('/createnewpost',(req,res) => {
    res.render('editor.njk')
})

// Renders the editor for users to create or edit posts from
app.get('/editor/:id',async (req,res) => {
    if(req.params.id !== "style.css" || req.params.id !== 'scripts.js'){
        var data =  await _api.getPostById(req.params.id)
        console.log(data)
        res.render('editor.njk',{data:data})
    }
})  

// renders all the posts that are available to edit. controls for deletion be available on this screen
app.get('/posts',async (req,res) => {
    var data = await _api.getAllPosts()
    res.render('posts.njk',{data:data})
})


// allows the user to save a draft which they can then come back and edit it later
app.post('/savedraft',(req,res) => {

})

// takes a post from the reviewal file and added it to the live file for views to see
app.post('/publishpost',(req,res) => {

})

// Deletes a posts from the local file either in live file or reviewal file
app.post('/deletepost',(req,res) => {

})


app.listen(3030,() => {
    console.log("Blog editor launched on port 3030")
})