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
                      outlined
                      dense
                      label="Name"
                      name="name"
                      prepend-icon="person"
                      type="text"
                      v-model="name"
                  ></v-text-field>

                  <v-text-field
                      outlined
                      dense
                      label="Surname"
                      name="surname"
                      prepend-icon="person"
                      type="text"
                      v-model="surname"
                  ></v-text-field>

                  <v-text-field
                      outlined
                      dense
                      label="Link to avatar"
                      name="avatar"
                      prepend-icon="account_box"
                      type="text"
                      v-model="avatar"
                  ></v-text-field>

                  <v-text-field
                      outlined
                      dense
                      label="Email"
                      name="email"
                      prepend-icon="email"
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
                      <v-btn outlined color="secondary" to="/login">To login</v-btn>
                    </v-card-actions>

                    <v-card-actions>
                      <v-btn outlined color="primary" type="submit">Register</v-btn>
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
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    surname: '',
    avatar: '',
    avatarPlaceholder: 'https://randomuser.me/api/portraits/men/81.jpg'
  }),
  methods: {
    async submitHandler () {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname,
        avatar: this.avatar || this.avatarPlaceholder
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
