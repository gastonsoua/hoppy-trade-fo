<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card prominent extended color="primary" dark="">
        <v-toolbar-title class="body-2">Editer</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex sm6 lg6>
              <v-text-field
                v-model="user.last_name"
                class="mr-4"
                label="Nom"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.first_name"
                class="mr-4"
                label="Prénom"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                class="mr-4"
                label="Email"
                required
                type="email"
                :error-messages="errors.email?errors.email:null"
              ></v-text-field>
              <v-text-field
                v-model="user.siret"
                class="mr-4"
                label="Siret"
                required
                :error-messages="errors.siret"
              ></v-text-field>
              <v-select
                v-model="user.role"
                class="mr-4"
                :items="roles"
                label="Role"
                required
              ></v-select>
            </v-flex>
            <v-flex sm6 lg6>
              <v-text-field
                v-model="user.address.street"
                class="mr-4"
                label="Adresse"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.address.city"
                class="mr-4"
                label="Ville"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.address.country"
                class="mr-4"
                label="Pays"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.address.post_code"
                class="mr-4"
                label="Code postal"
                required
              ></v-text-field>
              <v-checkbox
                v-model="user.verified"
                label="Vérfier"
                required
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn>Cancel</v-btn>
        <v-btn color="primary" @click="update()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "index",
  async asyncData({$axios, error, route}) {
    try {
      const {data: {data: user}} = await $axios.get('/users/' + route.params.userId);
      return {
        user: user
      };
    } catch (err) {
      error({statusCode: 404, message: err.message});
    }
  },
  data: () => ({
    roles: [
      'admin',
      'client',
      'seller'
    ],
    user: {},
    errors:{}
  }),

  methods: {
    update() {
      console.log(this.user)
      this.$axios
        .$put('/users/' + this.user.id, this.user)
        .then(
          response => {
            console.log(response.data)
          },
          error => {
            this.errors=error.response.data.errors;
            console.log(error.response.data.errors);
            console.log(this.errors)
          }
        );
    }
  }
}
</script>
