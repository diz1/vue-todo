<template>
  <v-container
      fluid
  >
    <div
      v-if="todosLoading"
    >
      <v-row :justify="'center'" :align="'center'">
        <v-progress-circular
            class="text-center"
            :size="50"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </v-row>
    </div>

    <v-row
        v-else-if="!loading && !categories.length"
        :align="'center'"
        :justify="'center'"
    >
      <v-col cols="3">
        <v-input>Nothing here. Create your first category!</v-input>
      </v-col>
    </v-row>

    <v-row
        v-else
        :align="'start'"
        :justify="'start'"
    >
      <v-col lg="2" md="3" sm="6" xs="12" v-for="category in categories" :key="category.id" >
        <v-flex>
          <ListCard
              :todos="todos"
              :category="category"
          />
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListCard from '../components/ListCard'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['todos', 'categories', 'todosLoading', 'loading'])
  },
  components: { ListCard }
}
</script>
