const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')

const app = express()

app.use(cors())
app.use(express.json())

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '132',
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ],
}

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  bcrypt.compare(
    'apples',
    '$2a$10$/Wxwlg4NkabTOBCJNYdSl.NPjiilqzpGLDFXlFYbXLIUqyMKKfSk.',
    function (err, res) {
      console.log('first guess', res)
    }
  )

  bcrypt.compare(
    'veggies',
    '$2a$10$/Wxwlg4NkabTOBCJNYdSl.NPjiilqzpGLDFXlFYbXLIUqyMKKfSk.',
    function (err, res) {
      console.log('second guess', res)
    }
  )
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('signing')
  } else {
    res.status(400).json('error logging in')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash)
  })
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  })
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true
      res.json(user)
    }
  })
  if (!found) {
    res.status(404).json('no such user')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(404).json('no such user')
  }
})

// bcrypt.compare('bacon', hash, function (err, res) {})

// bcrypt.compare('veggies', hash, function (err, res) {})

app.listen(3000, () => {
  console.log('listening on port 3000')
})

/* 
/ --> res = this is working 
/ signIn --> POST = success/fail 
/register --> POST = user 
/profile/:userId --> GET = user
/image --> PUT --> user 

*/
