<template>
  <v-container grid-list-xl fluid>
    <div>
      <v-alert
        v-model="alert"
        dismissible
        type="success"
      >
       Produit ajouter aux panier avec succer !!!
      </v-alert>
    </div>
    <v-layout row wrap>
      <v-flex sm12>
        <h3>Les produits</h3>
      </v-flex>
      <v-flex lg4 sm12 v-for="product in products" :key="product.id">
        <v-card>
          <v-card-title class="pb-0">
            <h4>{{ product.name }}</h4>
            <v-spacer/>
            <p>{{ product.price }} $</p>
          </v-card-title>
          <v-card-text>
            {{ product.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn flat small color="blue" @click="addCart(product.id)">Ajouter au panier</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row text-xs-center v-if="length > page">
      <v-flex sm12>
        <v-btn color="red" dark fab @click="fetchProduct()">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async asyncData({$axios, error}) {
    try {
      const {data: products} = await $axios.get('/products');
      return {
        products: products.data,
        length: products.meta.last_page,
        page: products.meta.current_page
      };
    } catch (err) {
      error({statusCode: 404, message: err.message});
    }
  },
  data() {
    return {
      products: {},
      page: '',
      length: '',
      alert: false
    };
  },
  methods: {
    fetchProduct() {
      this.$axios
        .$get('/products?page=' + (this.page + 1))
        .then(
          response => {
            this.page = response.meta.current_page;
            this.length = response.meta.last_page;
            response.data.forEach((product) => {
              this.products.push(product);
            })
          },
          error => {
            console.log(error);
          }
        );
    },
    addCart(productId) {
      this.$axios
        .$post('/carts', {
          product_id : productId
        })
        .then(
          response => {
            this.alert=true
            setTimeout(()=>{
              this.alert=false
            },5000)
          },
          error => {
            console.log(error.response.data.errors);
          }
        );
    }
  }
};
</script>
