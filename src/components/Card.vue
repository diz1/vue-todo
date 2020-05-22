<template>
        <v-hover
                v-slot:default="{ hover }"
        >
            <v-card
                    class="mx-auto"
                    max-width="344"
                    :elevation="(hover && !$vuetify.theme.dark) ? 5 : 0"
                    outlined
                    link
            >
                <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                ></v-img>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">Задача</div>
                        <v-list-item-title class="headline mb-1">{{ todo.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                    <v-btn outlined>Button</v-btn>
                    <v-btn outlined>Button</v-btn>
                </v-card-actions>
            </v-card>
        </v-hover>
</template>

<script>

export default {
  props: ['todo'],
  data: () => ({
  }),
  name: 'Card'
}
</script>

<style scoped>

</style>
