<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Flights Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>From Place</th>
              <th>To Place</th>
              <th>Rating</th>
              <th>Departure Date</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="flight in flights" :key="flight.id">
              <td>{{ flight.id }}</td>
              <td>{{ flight.fromPlace }}</td>
              <td>{{ flight.toPlace }}</td>
              <td>{{ flight.rating }}</td>
              <td>{{ flight.departureDate }}</td>
              <td>{{ flight.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateFlightToEdit(flight)">Edit</a> -
                <a href="#" @click.prevent="deleteFlight(flight.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Flight ID#' + model.id : 'New Flight')">
          <form @submit.prevent="saveFlight">
            <b-form-group label="From Place">
              <b-form-input type="text" v-model="model.fromPlace"></b-form-input>
            </b-form-group>
            <b-form-group label="To Place">
              <b-form-input type="text" v-model="model.toPlace"></b-form-input>
            </b-form-group>
            <b-form-group label="Rating">
              <b-form-input type="number" min="0" max="5" v-model="model.rating"></b-form-input>
            </b-form-group>
            <b-form-group label="Departure Date">
              <b-form-input type="date" v-model="model.departureDate"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Flight</b-btn>
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
      id: this.$route.params.id,
      loading: false,
      flights: [],
      model: {}
    }
  },
  async created () {
    this.refreshFlights()
  },
  methods: {
    async refreshFlights () {
      this.loading = true
      this.flights = await api.getFlights()
      this.loading = false
    },
    async populateFlightToEdit (flight) {
      this.model = Object.assign({}, flight)
    },
    async saveFlight () {
      if (this.model.id) {
        await api.updateFlight(this.model.id, this.model)
      } else {
        await api.createFlight(this.model)
      }
      this.model = {} // reset form
      await this.refreshFlights()
    },
    async deleteFlight (id) {
      if (confirm('Are you sure you want to delete this flight?')) {
        // if we are editing a flight we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteFlight(id)
        await this.refreshFlights()
      }
    }
  }
}
</script>
