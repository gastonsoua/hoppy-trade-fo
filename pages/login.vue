<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <notifications></notifications>
        <div class="header-body text-center mb-7">
          <div class="text-center" style="margin-bottom: 5px">
            <h1 class="text-white">
              Se connecter au réseau Antidote Média
            </h1>
            <p class="text-lead text-white">
              Vous devez être connecté à l'Antidote mobile pour avoir accès à nos offres. Si vous avez un compte
              Antidote Mobile ou Facebook, connectez-vous ci-dessous.
            </p>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
            x="0"
            y="0"
            viewBox="0 0 2560 100"
            preserveAspectRatio="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
              class="fill-default"
              points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--9 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-body px-lg-5 py-lg-5">
              <form class="needs-validation" @submit.prevent="handleSubmit()">
                <base-input
                    alternative
                    class="mb-3"
                    name="Email"
                    prepend-icon="ni ni-email-83"
                    placeholder="Courriel"
                    v-model="form.email"
                >
                </base-input>
                <validation-error :errors="apiValidationErrors.email"/>

                <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Mot de passe"
                    v-model="form.password"
                >
                </base-input>
                <validation-error :errors="apiValidationErrors.password"/>

                <div class="text-center">
                  <base-button type="primary" native-type="submit" class="my-4"
                  >Se connecter
                  </base-button
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ValidationError from "~/components/ValidationError.vue";
import formMixin from "@/mixins/form-mixin";

export default {
  name:'login',
  layout: "AuthLayout",
  mixins: [formMixin],
  components: {ValidationError},
  middleware({store, redirect}) {
    // If the user is authenticated
    if (store.$auth.loggedIn) {
      return redirect("/");
    }
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$auth.loginWith("local", {
          data: this.form,
        });
        this.$axios.defaults.headers.common.Authorization = `${this.$auth.strategy.token.get()}`;
        // this.$router.push("/");
      } catch (error) {
        await this.$notify({
          type: "danger",
          message: "Invalid credentials!",
        });
        this.setApiValidation(error.response.data.errors);
      }
    },
  },
};
</script>
