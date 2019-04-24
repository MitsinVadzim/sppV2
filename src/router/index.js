import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import FlightsManager from '@/components/FlightsManager'
import TicketsManager from '@/components/TicketsManager'
import UsersManager from '@/components/UsersManager'
import FlightById from '@/components/FlightById'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/flights',
      name: 'FlightsManager',
      component: FlightsManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tickets',
      name: 'TicketsManager',
      component: TicketsManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/flights/:id',
      name: 'getFlightById',
      component: FlightById,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'UsersManager',
      component: UsersManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router
