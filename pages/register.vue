<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm6 md6 lg6>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../static/m.png" alt="Vue Material Admin" width="100" height="100">
                  <h1 class="flex my-4 primary--text">Material Admin Template</h1>
                </div>
                <v-form>
                  <v-layout row wrap>
                    <v-flex sm6 lg6>
                      <v-text-field append-icon="person" class="mr-4" name="last_name" label="Nom" type="text"
                                    v-model="model.last_name" :error-messages="error.last_name"></v-text-field>
                      <v-text-field append-icon="person" class="mr-4" name="first_name" label="Prénom" type="text"
                                    v-model="model.first_name" :error-messages="error.first_name"></v-text-field>
                      <v-text-field append-icon="email" class="mr-4" name="email" label="Email" type="text"
                                    v-model="model.email" :error-messages="error.email"></v-text-field>
                      <v-text-field append-icon="lock" class="mr-4" name="password" label="Mot de passe" id="password"
                                    type="password"
                                    v-model="model.password" :error-messages="error.password"></v-text-field>
                      <v-text-field append-icon="lock" class="mr-4" name="password_confirmation"
                                    label="Confirmation mot de passe" id="password_confirmation" type="password"
                                    v-model="model.password_confirmation"
                                    :error-messages="error.password"></v-text-field>
                    </v-flex>
                    <v-flex sm6 lg6>
                      <v-text-field append-icon="home" class="mr-4" name="street" label="Adresse" type="text"
                                    v-model="model.street"></v-text-field>
                      <v-text-field append-icon="home" class="mr-4" name="post_code" label="Code postal" type="text"
                                    v-model="model.post_code"></v-text-field>
                      <v-text-field append-icon="home" class="mr-4" name="city" label="Ville" type="text"
                                    v-model="model.city"></v-text-field>
                      <v-text-field append-icon="flag" class="mr-4" name="country" label="pays" type="text"
                                    v-model="model.country"></v-text-field>
                    </v-flex>

                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" :to="'/login'" :loading="loading">Déja inscrit</v-btn>
                <v-btn block color="primary" @click="register" :loading="loading">Inscrire</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    model: {},
    error: {},
  }),

  methods: {
    register() {
      this.loading = true;
      console.log( this.model)
      this.$axios
        .$post('/register', this.model)
        .then(
          response => {
            this.error = {}
            // this.$router.push('/');
          },
          error => {
            this.loading = false;
            console.log(this.error = error.response.data.errors)
          }
        );
    }
  }

};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
