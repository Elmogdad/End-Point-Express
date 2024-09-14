const express = require('express');
const app = express();

app.use(express.json())

const users = [] ; 

// Http Methods
// GET = retrive data
app.get('/' , (req, res) => {
res.send('Welcome To Home Page')
});
app.get('/users', (req, res) => {
    if(users.length == 0) {
        res.status(404).send('No user found!');
        return
    }
  res.status(200).send(users);
})
// POST to create data
app.post('/users' , (req, res) => {
    const user = req.body;
    const findUser = users.find((x) => x.id === user.id)
    if (findUser) {
        res.status(404).send('user already exist');
        return
    }
    users.push(user);
    res.status(201).send('Created!')
})
// PUT
// DELETE remove

app.delete('/users/:id', (req, res) => {
    const { id } = req.params
    const findUserIndex = users.findIndex((x) => x.id === id);
    if(findUserIndex == -1){
        res.status(400).send("User not found")
        return
    }
    users.splice(findUserIndex, 1)
    res.status(404).send("User deleted successfully");
})




app.listen(3000, () => {
console.log("started on port 3000");
});