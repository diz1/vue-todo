<template>
  <v-app id="inspire">
    <SnackBar
        :message="message"
    />
    <v-content>
      <v-container
          class="fill-height"
          fluid
      >
        <v-row
            align="center"
            justify="center"
        >
          <v-col
              cols="12"
              sm="8"
              md="4"
          >
            <v-card :loading="loading" class="elevation-12">

                <v-card-text>
                  <v-row :justify="'center'">
                    <v-card-title>TODO LIST</v-card-title>
                  </v-row>

                  <v-form @submit.prevent="submitHandler">
                    <v-text-field
                        outlined
                        dense
                        label="Login"
                        name="login"
                        prepend-icon="person"
                        type="text"
                        v-model="email"
                    ></v-text-field>

                    <v-text-field
                        outlined
                        dense
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        v-model="password"
                    ></v-text-field>

                    <v-row>
                      <v-spacer></v-spacer>

                      <v-card-actions>
                        <v-btn
                            outlined
                            color="primary"
                            type="submit"
                            :disabled="loading"
                        >
                          Login</v-btn>
                      </v-card-actions>

                      <v-card-actions>
                        <v-btn
                            outlined
                            color="secondary"
                            link
                            to="/register"
                            :disabled="loading"
                        >
                          Register</v-btn>
                      </v-card-actions>
                    </v-row>

                  </v-form>
                </v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import messages from '../utils/snackbar.messages'
import SnackBar from '../components/SnackBar'

export default {
  name: 'Login',
  components: { SnackBar },
  data: () => ({
    email: '',
    password: '',
    message: ''
  }),
  computed: {
    ...mapGetters(['loading', 'snackbar', 'error'])
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.message = messages[this.$route.query.message]
      this.$store.commit('SET_SNACKBAR', { visible: true, message: this.message })
    }
  },
  methods: {
    async submitHandler () {
      this.$store.commit('SET_LOADING', true)
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/')
      } catch (e) {
        this.$store.commit('setError', e)
        this.checkErrorCode(e)
      }
    },
    checkErrorCode (e) {
      if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
        this.$store.commit('SET_SNACKBAR',
          { visible: true, message: 'The password or email is invalid' })
        this.$store.commit('SET_LOADING', false)
      } else if (e.code === 'auth/too-many-requests') {
        this.$store.commit('SET_SNACKBAR',
          { visible: true, message: 'Too many unsuccessful login attempts. Please try again later' })
        this.$store.commit('SET_LOADING', false)
      }
    }
  }
}
</script>
