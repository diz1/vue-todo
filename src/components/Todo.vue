<template>
  <div>
    <v-list-item
        link
        v-if="todo.category === category.name.toLowerCase() && !todo.completed"
        dense
        @click="goToDetail(todo.id)"
    >
      <v-list-item-title>
        {{ todo.description }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    category: {
      type: Object,
      default: () => ({})
    },
    todo: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    async goToDetail (id) {
      this.$store.commit('SET_TODOS_LOADING', true)
      await setTimeout(() => {
        this.$router.push(`/todo/detail/${id}`)
        this.$store.commit('SET_TODOS_LOADING', false)
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
