<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Tickets Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Price</th>
            <th>User</th>
            <th>Flight</th>
            <th>Updated At</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ticket in displayedTickets" :key="ticket.id">
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.price }}</td>
            <td>{{ ticket.user.login}}</td>
            <router-link :to="{name: 'getFlightById', params: {id: ticket.flightId}}"><td>{{ ticket.flight.fromPlace}}</td></router-link>
            <td>{{ ticket.updatedAt }}</td>
            <td class="text-right">
              <a href="#" @click.prevent="populateTicketToEdit(ticket)">Edit</a> -
              <a href="#" @click.prevent="deleteTicket(ticket.id)">Delete</a>
            </td>
          </tr>
          </tbody>
          <div class="btn-group col-md-2 offset-md-5">
            <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page !== 1" @click="page--"> << </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"> {{pageNumber}} </button>
            <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> >> </button>
          </div>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Ticket ID#' + model.id : 'New Ticket')">
          <form @submit.prevent="saveTicket">
            <b-form-group label="Price">
              <b-form-input type="text" v-model="model.price"></b-form-input>
            </b-form-group>
            <b-form-group label="User Id">
              <b-form-input type="text" v-model="model.userId"></b-form-input>
            </b-form-group>
            <b-form-group label="Flight Id">
              <b-form-input type="text" v-model="model.flightId"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Ticket</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        loading: false,
        tickets: [],
        model: {},
        page: 1,
        perPage: 2,
        pages: []
      }
    },
    async created () {
      console.log(this.$router)
      this.refreshTickets()
    },
    computed: {
      displayedTickets () {
        return this.paginate(this.tickets)
      }
    },
    watch: {
      tickets () {
        this.setPages()
      }
    },
    methods: {
      async refreshTickets () {
        this.loading = true
        this.tickets = await api.getTickets()
        this.loading = false
      },
      async populateTicketToEdit (ticket) {
        this.model = Object.assign({}, ticket)
      },
      async saveTicket () {
        if (this.model.id) {
          await api.updateTicket(this.model.id, this.model)
        } else {
          await api.createTicket(this.model)
        }
        this.model = {} // reset form
        await this.refreshTickets()
      },
      async deleteTicket (id) {
        if (confirm('Are you sure you want to delete this ticket?')) {
          // if we are editing a ticket we deleted, remove it from the form
          if (this.model.id === id) {
            this.model = {}
          }
          await api.deleteTicket(id)
          await this.refreshTickets()
        }
      },
      setPages () {
        let numberOfPages = Math.ceil(this.tickets.length / this.perPage)
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index)
        }
      },
      paginate (tickets) {
        let page = this.page
        let perPage = this.perPage
        let from = (page * perPage) - perPage
        let to = (page * perPage)
        return tickets.slice(from, to)
      }
    }
  }
</script>
