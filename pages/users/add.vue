<template>
  <v-container fluid>
    <userForm :props_user="user"
              :title="'Ajouter'"
              :update="false"
    />
  </v-container>
</template>

<script>
import UserForm from "~/components/user/form";

export default {
  components: {
    UserForm
  },
  name: "add",
  data: () => ({
    user: {
      first_name: "",
      last_name: '',
      email: '',
      siret: '',
      role: '',
      verified: '',
      address: {
        street: '',
        city: '',
        country: '',
        post_code: '',
      }
    },
  }),
}
</script>
