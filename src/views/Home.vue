<template>
  <v-container
      fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          :align="alignment"
          :justify="justify"
        >
          <v-col lg="4" md="4" sm="6" xs="12" v-for="todo in todos" :key="todo.id" >
            <Card :todo="todo"/>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from '../components/Card'
import { mapGetters } from 'vuex'

export default {

  data: () => ({
    categories: ['all', 'home', 'work'],
    alignment: 'center',
    justify: 'center'
  }),
  computed: {
    ...mapGetters(['todos'])
  },
  async mounted () {
    // await this.$store.dispatch('fetchTodos')
  },
  components: { Card }
}
</script>
