import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getFlights () {
    console.log(this.resource)
    return this.execute('get', '/flights')
  },
  getFlight (id) {
    return this.execute('get', `/flights/${id}`)
  },
  createFlight (data) {
    return this.execute('post', '/flights', data)
  },
  updateFlight (id, data) {
    return this.execute('put', `/flights/${id}`, data)
  },
  deleteFlight (id) {
    return this.execute('delete', `/flights/${id}`)
  },

  getTickets () {
    return this.execute('get', '/tickets')
  },
  getTicket (id) {
    return this.execute('get', `/tickets/${id}`)
  },
  createTicket (data) {
    return this.execute('post', '/tickets', data)
  },
  updateTicket (id, data) {
    return this.execute('put', `/tickets/${id}`, data)
  },
  deleteTicket (id) {
    return this.execute('delete', `/tickets/${id}`)
  },

  getUsers () {
    return this.execute('get', '/users')
  },
  getUser (id) {
    return this.execute('get', `/users/${id}`)
  },
  createUser (data) {
    return this.execute('post', '/users', data)
  },
  updateUser (id, data) {
    return this.execute('put', `/users/${id}`, data)
  },
  deleteUser (id) {
    return this.execute('delete', `/users/${id}`)
  }
}
