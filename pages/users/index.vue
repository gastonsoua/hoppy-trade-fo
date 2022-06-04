<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-5 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Tables</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <!-- Search form -->
        <div class="col-7">
          <div class="row">
            <div class="col-6">
              <search-input @onChange="onSearchId" :placeholder="'ID'"/>
            </div>
            <div class="col-6">
              <search-input @onChange="onSearchFirstName" :placeholder="'Prénom'"/>
            </div>
          </div>
          <div class="row py-4">
            <div class="col-6">
              <search-input @onChange="onSearchLastName" :placeholder="'Nom de famille'"/>
            </div>
            <div class="col-6">
              <search-input @onChange="onSearchEmail" :placeholder="'Courriel'"/>
            </div>
          </div>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="border-0 card-header">
              <h3 class="mb-0">Liste des utilisateurs</h3>
            </div>
            <el-table class="table-responsive table-flush"
                      header-row-class-name="thead-light"
                      stripe
                      :data="users">
              <el-table-column label="ID"
                               min-width="70px"
                               prop="user_id">
              </el-table-column>
              <el-table-column label="Prénom"
                               prop="user_first_name"
                               min-width="140px">
              </el-table-column>

              <el-table-column label="Nom de famille"
                               min-width="170px"
                               prop="user_last_name">
              </el-table-column>

              <el-table-column label="Courrielle"
                               prop="user_email"
                               min-width="200px">
              </el-table-column>

              <el-table-column label="Rôle"
                               prop="role"
                               min-width="140px">
              </el-table-column>

              <el-table-column min-width="180px" align="center">
                <template v-slot="{row}">
                  <el-tooltip content="Modifier" placement="top">
                    <a
                        type="text"
                        @click=""
                        class="table-action"
                        data-toggle="tooltip"
                        style="cursor: pointer"
                    >
                      <i class="fas fa-edit"></i>
                    </a>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <div class="card-footer py-4 d-flex justify-content-end">
              <base-pagination
                  v-model="currentPage"
                  :total="totalPage"
                  :perPage="per_page"
                  @currentPage="fetchMoreResults"
              ></base-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import {Table, TableColumn} from "element-ui";
import usersService from "~/services/users-service";
import SearchInput from "@/components/argon-core/Inputs/SearchInput";

export default {
  name: "test",
  middleware: ['auth'],
  layout: "DashboardLayout",
  components: {
    RouteBreadCrumb,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    SearchInput
  },
  data() {
    return {
      type: "default",
      currentPage: 1,
      users: null,
      totalPage: 0,
      per_page: 10,
      searchId: '',
      searchFirstName: '',
      searchLastName: '',
      searchEmail: ''
    };
  },
  async asyncData({$axios, error}) {
    try {
      const users = await usersService.list($axios);
      return {
        users: users.list,
        totalPage: users.meta.total,
        per_page: users.meta.per_page
      };
    } catch (err) {
      error({statusCode: 404, message: err.message});
    }
  },
  methods: {
    fetchMoreResults() {
      usersService.list(this.$axios, {
        page: this.currentPage,
        user_id: this.searchId,
        user_first_name: this.searchFirstName,
        user_last_name: this.searchLastName,
        user_email: this.searchEmail,
      }).then(users => {
        this.users = users.list
        this.totalPage = users.meta.total
        this.per_page = users.meta.per_page
      });
    },
    onSearchId(value) {
      this.searchId = value;
      this.currentPage=1;
      this.fetchMoreResults()
    },
    onSearchFirstName(value) {
      this.searchFirstName = value;
      this.currentPage=1;
      this.fetchMoreResults()
    },
    onSearchLastName(value) {
      this.searchLastName = value;
      this.currentPage=1;
      this.fetchMoreResults()
    },
    onSearchEmail(value) {
      this.searchEmail = value;
      this.currentPage=1;
      this.fetchMoreResults()
    }
  }
}
</script>

<style scoped>

</style>