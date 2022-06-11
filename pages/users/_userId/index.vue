<template>
  <v-container fluid>
    <userForm :props_user="user"
              :title="'Edité'"
              :update="true"
    />
  </v-container>
</template>

<script>
import UserForm from "~/components/user/form";
export default {
  components: {
    UserForm
  },
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
    user: {}
  }),


}
</script>
