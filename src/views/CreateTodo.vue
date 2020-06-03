<template>
  <div>
    <v-container
        id="input-usage"
        fluid
    >
      <v-row :justify="'center'">
        <v-col cols="12" lg="6" md="8" sm="8">
          <v-card
              :loading="todosLoading"
          >
            <v-card-text>
              <v-card-title class="pl-3">Create Todo</v-card-title>
              <v-form @submit.prevent="createTodo">

                <v-textarea
                    label="Description"
                    name="description"
                    type="text"
                    v-model="todoDescription"
                    outlined
                ></v-textarea>

                <v-select
                    :items="categories"
                    label="Choose category"
                    outlined
                    v-model="selectedCategory"
                ></v-select>

                <v-btn outlined color="primary" type="submit">Create</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { v4 } from 'uuid'
import { mapGetters } from 'vuex'

export default {
  name: 'CreateTodo',
  props: {
    name: {
      type: String
    }
  },
  data: () => ({
    todoDescription: '',
    selectedCategory: ''
  }),
  computed: {
    ...mapGetters(['todosLoading']),
    categories () {
      return this.$store.getters.categories.map(c => c.name)
    }
  },
  methods: {
    async createTodo () {
      this.$store.commit('SET_TODOS_LOADING', true)
      try {
        await this.$store.dispatch('createTodo', {
          description: this.todoDescription,
          category: this.selectedCategory.toLowerCase(),
          id: v4()
        })
        await this.$router.push('/')
      } catch (e) {
        this.$store.commit('setError', e)
        throw e
      }
      this.$store.commit('SET_TODOS_LOADING', false)
    }
  },
  mounted () {
    if (this.name) {
      this.selectedCategory = this.name
    }
  }
}
</script>
