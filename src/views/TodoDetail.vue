<template>
  <div>
    <v-container
        id="input-usage"
        fluid
    >
      <v-row :justify="'center'">
        <v-col cols="12" lg="6" md="8" sm="8">

          <v-card :loading="todosLoading">
            <v-card-text>

              <v-row justify="space-between">
                <v-card-title class="pl-3">Detail view / edit</v-card-title>
                <v-switch class="mx-4" v-model="allowEdit" :label="`Allow edit`"></v-switch>
              </v-row>
              <v-form @submit.prevent="updateTodo(todo.id)">

                <v-textarea
                    label="Description"
                    name="description"
                    type="text"
                    v-model="description"
                    outlined
                    :disabled="!allowEdit"
                    no-resize
                ></v-textarea>

                <v-select
                    :items="categories"
                    label="Choose category"
                    outlined
                    v-model="category"
                    :disabled="!allowEdit"
                ></v-select>

                <v-checkbox
                    label="completed"
                    class="ma-0"
                    :disabled="!allowEdit"
                    v-model="completed"
                />

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                      outlined
                      color="primary"
                      type="submit"
                      :disabled="!allowEdit"
                  >
                    Update
                  </v-btn>
                  <v-btn
                      outlined
                      color="red"
                      :disabled="!allowEdit"
                      @click="removeTodo(todo.uid)"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TodoDetail',
  data: () => ({
    todo: {},
    category: '',
    description: '',
    allowEdit: false,
    completed: false
  }),
  computed: {
    ...mapGetters(['todosLoading', 'todos']),
    categories () {
      return this.$store.getters.categories.map(c => c.name)
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.categories).length) {
      await this.$store.dispatch('fetchCategories')
    }
    if (!Object.keys(this.$store.getters.todos).length) {
      await this.$store.dispatch('fetchTodos')
    }
    this.todo = this.todos.find(todo => todo.id === this.$route.params.id)
    this.category = this.categories.find(c => c.toLowerCase() === this.todo.category)
    this.description = this.todo.description
  },
  methods: {
    updateTodo (id) {
      const todo = {
        ...this.todo,
        description: this.description,
        category: this.category.toLowerCase(),
        id
      }
      if (this.completed) {
        todo.completed = this.completed
      }
      this.$store.dispatch('updateTodo', todo)
      this.$router.push('/')
    },
    async removeTodo (id) {
      this.$store.commit('SET_TODOS_LOADING', true)
      await this.$store.dispatch('deleteTodo', { id })
      await this.$router.push('/')
      this.$store.commit('SET_TODOS_LOADING', false)
    }
  }
}
</script>
