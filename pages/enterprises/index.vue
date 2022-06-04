<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Tables</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <!-- Search form -->
        <div class="col-lg-4 col-6 ">
          <search-input @onChange="onSearch"/>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="border-0 card-header">
              <h3 class="mb-0">Liste des entreprises</h3>
            </div>
            <el-table class="table-responsive table-flush"
                      header-row-class-name="thead-light"
                      stripe
                      :data="enterprises">
              <el-table-column label="Nom de l'entreprise"
                               min-width="310px"
                               prop="name">
              </el-table-column>
              <el-table-column label="Membres"
                               prop="users_count"
                               min-width="140px">
              </el-table-column>

              <el-table-column label="Emplacements"
                               min-width="170px"
                               prop="locations_count">
              </el-table-column>

              <el-table-column label="Campagnes"
                               prop="campaigns_count"
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
import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb'
import {Table, TableColumn} from "element-ui";
import SearchInput from "@/components/argon-core/Inputs/SearchInput";

export default {
  middleware: ['auth'],
  layout: "DashboardLayout",
  components: {
    RouteBreadCrumb,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    SearchInput
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
          "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  data() {
    return {
      currentPage: 1,
      enterprises: null,
      totalPage: null,
      per_page: 10,
      search: null
    };
  },
  async asyncData({$axios, error}) {
    try {
      const {data} = await $axios.get('/enterprises');
      return {
        enterprises: data.enterprises.data,
        totalPage: data.enterprises.total,
        per_page: data.enterprises.per_page
      };
    } catch (err) {
      error({statusCode: 404, message: err.message});
    }
  },
  methods: {
    fetchMoreResults() {
      let query = 'page=' + this.currentPage + (this.search ? '&name=' + this.search : '');
      this.$axios
          .$get('/enterprises?' + query)
          .then(
              response => {
                this.enterprises = response.enterprises.data;
              },
              error => {
                console.log(error);
              }
          );
    },
    onSearch(value) {
      this.search= value
      this.$axios
          .$get('/enterprises' + (this.search ? '?name=' + this.search : ''))
          .then(
              response => {
                this.enterprises = response.enterprises.data
                this.totalPage = response.enterprises.total;
                this.per_page = response.enterprises.per_page;
              },
              error => {
                console.log(error);
              }
          );
    }
  }
}
</script>

<style scoped>

</style>