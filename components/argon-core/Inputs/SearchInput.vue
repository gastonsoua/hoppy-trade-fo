<template>
  <div>
    <form
        class="navbar-search form-inline mr-sm-3"
        :class="{
                  'navbar-search-light': type === 'default',
                  'navbar-search-dark': type === 'light',
              }"
        id="navbar-search-main"
        @submit="(event)=> event.preventDefault()"
    >
      <div class="form-group mb-0">
        <div class="input-group input-group-alternative input-group-merge">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
          </div>
          <input class="form-control" :placeholder="placeholder" type="text" v-model="value"
                 @change="onSearch"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "search-input",
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
          "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
    placeholder:{
      type: String,
      default: "Search",
      description:
          "place holder for input",
    },
  },
  data() {
    return {
      value: ""
    };
  },
  methods:{
    onSearch(){
      this.$emit('onChange', this.value)
    }
  }
}
</script>

<style scoped>

</style>