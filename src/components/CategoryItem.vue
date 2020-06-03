<template>
  <div>
    <v-list-item
        link
        @click="clickHandler(category.name)"
    >
      <v-list-item-action>
        <v-icon>list</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ category.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: ['category'],
  name: 'CategoryItem',
  data: () => ({
  }),
  methods: {
    clickHandler (name) {
      this.$emit('clicked', name)
    }
  }
}
</script>

<style scoped>

</style>
