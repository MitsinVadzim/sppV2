const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

let app = express()
app.use(cors())
app.use(bodyParser.json())

const database = new Sequelize('postgres://postgres:1234@localhost:5432/spp')

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// Define our Flight model
// id, createdAt, and updatedAt are added by sequelize automatically
let Flight = database.define('flights', {
  fromPlace: Sequelize.STRING,
  toPlace: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  departureDate: Sequelize.DATE
})

let User = database.define('users', {
  login: Sequelize.STRING,
  password: Sequelize.STRING
})

let Ticket = database.define('tickets', {
  price: Sequelize.DOUBLE
})

User.hasMany(Ticket)
Flight.hasMany(Ticket, {onDelete: 'cascade'})
Ticket.belongsTo(User)
Ticket.belongsTo(Flight)

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for our Post model
let flightResource = epilogue.resource({
  model: Flight,
  endpoints: ['/flights', '/flights/:id']
})

let ticketResource = epilogue.resource({
  model: Ticket,
  endpoints: ['/tickets', '/tickets/:id'],
  include: [{
    model: Flight
  }, {
    model: User
  }]
})

// ticketResource.use(tickerMiddleware)

let userResource = epilogue.resource({
  model: User,
  endpoints: ['/users', '/users/:id']
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  })
