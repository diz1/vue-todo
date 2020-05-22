<template>
  <v-app id="inspire">
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
        <v-list-item two-line to="/">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
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
      </v-skeleton-loader>

      <v-divider></v-divider>

      <v-list dense nav>

<!--        <v-list-item-title class="subtitle-2 text-center">Nothing here</v-list-item-title>-->

        <div v-if="!loading">
          <v-list-item-group v-model="group">

            <v-list-item link v-if="categories.length">
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>All</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <div>
              <v-list-item link v-for="category in categories" :key="category.id">
                <v-list-item-action>
                  <v-icon>list</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ category.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>

          </v-list-item-group>
        </div>

        <v-skeleton-loader
            v-else
            class="mx-auto"
            max-width="300"
            type="list-item@4"
            :loading="loading"
        ></v-skeleton-loader>

        <v-list-item link to="/category/create">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Create category</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Todo Home Page
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {},
  name: 'main-layout',
  data: () => ({
    exact: 0,
    group: 0,
    drawer: null,
    loading: true
  }),
  computed: {
    info () {
      return this.$store.getters.info
    },
    categories: {
      get () {
        return this.$store.getters.categories
      },
      set (categories) {
        return categories
      }
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    if (!Object.keys(this.$store.getters.categories).length) {
      await this.$store.dispatch('fetchCategories')
    }
    this.loading = false
  },
  async created () {
    this.$vuetify.theme.dark = false
  },
  watch: {
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      await this.$router.push('/login?message=logout')
    }
  }
}
</script>
