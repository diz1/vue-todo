<template>
  <v-card
      class="blue darken-1 mx-auto"
      max-width="100%"
      :elevation="2"
      outlined
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 white--text">{{ category.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list class="ma-2 pa-0">

      <div v-if="!checkMatch(category)">
        <v-list-item
            class="text-center"
            dense
        >
          <v-list-item-subtitle>Nothing in category...</v-list-item-subtitle>
        </v-list-item>
      </div>

      <div
          v-for="todo in todos"
          :key="todo.id"
      >
        <Todo
            :todo="todo"
            :category="category"
        />
      </div>

      <div>
        <v-list-item link @click="createTodo(category.name)" dense>
          <v-list-item-action>
            <v-icon dense>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Create todo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

    </v-list>
  </v-card>
</template>

<script>
import Todo from './Todo.vue'

export default {
  props: {
    todos: {
      type: Array,
      default () {
        return []
      }
    },
    category: {
      type: Object,
      default () {
        return []
      }
    }
  },
  name: 'Card',
  methods: {
    checkMatch (category) {
      const check = this.todos.filter(todo => todo.category === category.name.toLowerCase())
      return !!check.length
    },
    createTodo (name) {
      this.$router.push({
        name: 'CreateTodo',
        params: { name }
      })
    }
  },
  components: { Todo }
}
</script>

<style scoped>

</style>
