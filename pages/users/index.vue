<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Utilisateurs</h3>
        </v-flex>
        <v-flex lg12>
          <v-card>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="headers"
                :items="users"
                class="elevation-1"
                hide-actions
                disable-initial-sort
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.last_name }}</td>
                  <td>{{ props.item.first_name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>
                    <v-checkbox
                      primary
                      hide-details
                      v-model="props.item.verified"
                    ></v-checkbox>
                  </td>
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small
                           :to="'/users/'+props.item.id" nuxt>
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
              <div class="text-xs-center pt-2">
                <v-pagination
                  circle
                  v-model="page"
                  :length="length"
                  @input="fetchUsers()"
                  @next="fetchUsers()"
                  @previous="fetchUsers()"
                ></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, error}) {
    try {
      const {data: users} = await $axios.get('/users');
      return {
        users: users.data,
        length: users.meta.last_page
      };
    } catch (err) {
      error({statusCode: 404, message: err.message});
    }
  },
  data() {
    return {
      search: '',
      page: 1,
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Nom',
          value: 'last_name'
        },
        {
          text: 'Prénom',
          value: 'first_name'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Vérfier',
          value: 'verified'
        },
        {
          text: 'Action',
          value: ''
        },
      ],
      users: {},
      length: ''
    };
  },
methods:{
  fetchUsers() {
    this.$axios
      .$get('/users?page=' + this.page)
      .then(
        response => {
          this.users = response.data;
        },
        error => {
          console.log(error);
        }
      );
  },
}
};
</script>
