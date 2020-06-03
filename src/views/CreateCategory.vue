<template>
  <div>
    <v-container
        id="input-usage"
        fluid
    >
      <v-row :justify="'center'">
        <v-col cols="12" lg="6" md="8" sm="8">
          <v-card>
            <v-card-text>
              <v-card-title class="pl-3">Create category</v-card-title>
              <v-form @submit.prevent="createCategory">
                <v-text-field
                    label="Category name"
                    name="category-name"
                    type="text"
                    v-model="categoryName"
                    outlined
                ></v-text-field>
                <v-btn outlined color="primary" type="submit">Create</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'CreateCategory',
  data: () => ({
    categoryName: ''
  }),
  methods: {
    async createCategory () {
      const categoryName = this.categoryName
      await this.$store.dispatch('categoryCreate', categoryName)
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
