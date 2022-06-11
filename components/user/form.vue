<template>
  <div>
    <v-card>
      <v-toolbar card prominent extended color="primary" dark="">
        <v-toolbar-title class="body-2">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex sm6 lg6>
              <v-text-field
                v-model="props_user.last_name"
                class="mr-4"
                label="Nom"
                required
                :error-messages="error.last_name"
              ></v-text-field>
              <v-text-field
                v-model="props_user.first_name"
                class="mr-4"
                label="Prénom"
                required
                :error-messages="error.first_name"
              ></v-text-field>
              <v-text-field
                v-model="props_user.email"
                class="mr-4"
                label="Email"
                required
                type="email"
                :error-messages="error.email"
              ></v-text-field>
              <v-text-field
                v-model="props_user.siret"
                class="mr-4"
                label="Siret"
                required
                :error-messages="error.siret"
              ></v-text-field>
              <v-select
                v-model="props_user.role"
                class="mr-4"
                :items="roles"
                label="Role"
                required
                :error-messages="error.role"
              ></v-select>
            </v-flex>
            <v-flex sm6 lg6>
              <v-text-field
                v-model="props_user.address.street"
                class="mr-4"
                label="Adresse"
                required
              ></v-text-field>
              <v-text-field
                v-model="props_user.address.city"
                class="mr-4"
                label="Ville"
                required
              ></v-text-field>
              <v-text-field
                v-model="props_user.address.country"
                class="mr-4"
                label="Pays"
                required
              ></v-text-field>
              <v-text-field
                v-model="props_user.address.post_code"
                class="mr-4"
                label="Code postal"
                required
              ></v-text-field>
              <v-checkbox
                v-model="props_user.verified"
                label="Vérfier"
                required
              ></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row wrap >
            <v-text-field
              v-model="props_user.password"
              class="mr-4"
              label="Password"
              type="password"
              :required="!update"
              :error-messages="error.password"
            ></v-text-field>  <v-text-field
            v-model="props_user.password_confirmation"
            class="mr-4"
            type="password"
            label="Confirme password"
            :required="!update"
            :error-messages="error.password"
          ></v-text-field>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn @click="cancel()">Cancel</v-btn>
        <v-btn color="primary" @click="save()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "userForm",
  props: {
    props_user: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    update: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    roles: [
      'admin',
      'client',
      'seller'
    ],
    error: {},
  }),
  methods: {
    save() {
      console.log( this.props_user);
      if (this.update) {
        this.$axios
          .$put('/users/' + this.props_user.id, this.props_user)
          .then(
            response => {
              this.error = {}
              this.$router.push('/users');
            },
            error => {
              console.log(this.error = error.response.data.errors)
            }
          );
      }else{
        this.$axios
          .$post('/users', this.props_user)
          .then(
            response => {
              this.error = {}
              this.$router.push('/users');
            },
            error => {
              console.log(this.error = error.response.data.errors)
            }
          );
      }

    },
    cancel() {
      this.$router.push('/users');
    }
  }
}
</script>
