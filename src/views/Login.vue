<template>
  <v-app id="inspire">
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
            <div v-if="signingIn">
              <v-row :justify="'center'" :align="'center'">
                <v-progress-circular
                    class="text-center"
                    :size="50"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
              </v-row>
            </div>

            <v-card v-else class="elevation-12">

                <v-card-text>
                  <v-row :justify="'center'">
                    <v-card-title>TODO LIST</v-card-title>
                  </v-row>

                  <v-form @submit.prevent="submitHandler">
                    <v-text-field
                        label="Login"
                        name="login"
                        prepend-icon="person"
                        type="text"
                        v-model="email"
                    ></v-text-field>

                    <v-text-field
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
                        <v-btn color="primary" type="submit">Login</v-btn>
                      </v-card-actions>

                      <v-card-actions>
                        <v-btn color="secondary" link to="/register">Register</v-btn>
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
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    signingIn: false
  }),
  methods: {
    async submitHandler () {
      this.signingIn = true
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
