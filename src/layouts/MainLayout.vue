<template>
  <v-app id="inspire">

    <v-app-bar
        app
        clipped-left
        class="primary white--text"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Todo List
      </v-toolbar-title>

      <v-breadcrumbs
          v-if="$route.path !== '/'"
      >
        <v-breadcrumbs-item
            to="'/'"
        >
          <span
              class="white--text"
          >
          Home
            </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>

    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        :touchless="true"
    >
      <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="list-item-avatar-two-line, list-item"
          :loading="loading"
      >
        <UserInfo />

      </v-skeleton-loader>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link :to="{name: 'CreateCategory'}">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Create category</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import UserInfo from '../components/UserInfo'

export default {
  components: { UserInfo },
  props: {},
  name: 'main-layout',
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters(['categories', 'todos', 'loading'])
  },
  async mounted () {
    try {
      this.$store.commit('SET_TODOS_LOADING', true)
      if (!Object.keys(this.$store.getters.categories).length) {
        await this.$store.dispatch('fetchCategories')
      }
      if (!Object.keys(this.$store.getters.todos).length) {
        await this.$store.dispatch('fetchTodos')
      }
      this.$store.commit('SET_LOADING', false)
      this.$store.commit('SET_TODOS_LOADING', false)
    } catch (e) {
      this.$store.commit('setError', e)
      throw e
    }
  },
  async created () {
    this.$vuetify.theme.dark = false
  },
  methods: {
    async fetchTodos () {
      this.todos = await this.$store.dispatch('fetchTodos')
    }
  }
}
</script>
