<template>
  <div>
    <v-list-item
        two-line
        :to="{name: 'Home'}"
        @click="fetchTodos"
    >
      <v-list-item-avatar>
        <img
            :src="info.avatar"
            :alt="info.avatar"
        >
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>Welcome back,</v-list-item-subtitle>
        <v-list-item-title>{{ info.name }} {{ info.surname }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item link @click.prevent="logout">
      <v-list-item-action>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  methods: {
    async fetchTodos () {
      this.todos = await this.$store.dispatch('fetchTodos')
    },
    async logout () {
      await this.$store.dispatch('logout')
      await this.$router.push('/login?message=logout')
    }
  }
}
</script>

<style scoped>

</style>
