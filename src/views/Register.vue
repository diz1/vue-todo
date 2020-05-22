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
            <v-card class="elevation-12">
              <v-card-text>
                <v-form @submit.prevent="submitHandler">
                  <v-text-field
                      label="Name"
                      name="name"
                      prepend-icon="person"
                      type="text"
                      v-model="name"
                  ></v-text-field>

                  <v-text-field
                      label="Surname"
                      name="surname"
                      prepend-icon="person"
                      type="text"
                      v-model="surname"
                  ></v-text-field>

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

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Register</v-btn>
                  </v-card-actions>
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
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    surname: ''
  }),
  methods: {
    async submitHandler () {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname
      }
      try {
        await this.$store.dispatch('register', formData)
        await this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
