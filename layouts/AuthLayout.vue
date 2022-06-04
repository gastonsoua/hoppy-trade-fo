<template>
  <div :class="layoutClass" class="auth-layout">
    <base-nav
      v-model="showMenu"
      type="light"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main"
      expand="lg"
    >
      <div slot="brand" class="navbar-wrapper">
        <nuxt-link class="navbar-brand" to="/">
          <img src="/img/brand/hub.png" alt="Logo" />
        </nuxt-link>
      </div>

      <template>
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <nuxt-link to="/">
                <img src="/img/brand/hub.png" alt="Logo" />
              </nuxt-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                @click="showMenu = false"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link to="/login" class="nav-link">
              <span class="nav-link-inner--text">Login</span>
            </nuxt-link>
          </li>
<!--          <li class="nav-item">-->
<!--            <nuxt-link to="/register" class="nav-link">-->
<!--              <span class="nav-link-inner&#45;&#45;text">Register</span>-->
<!--            </nuxt-link>-->
<!--          </li>-->
        </ul>
        <hr class="d-lg-none" />
      </template>
    </base-nav>

    <div class="main-content">
      <nuxt></nuxt>
    </div>

    <footer class="py-5" id="footer-main">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6 pr-1">
            <div class="copyright text-center text-lg-right text-muted">
              © {{ year }}, made with <i class="fa fa-heart heart"></i> by<a
                href="https://www.linkedin.com/in/ghassen-soua-29527613a/"
                class="font-weight-bold ml-1"
                target="_blank"
                rel="noopener"
                >Ghassen</a
              >
              for a better web.
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import BaseNav from "~/components/argon-core/Navbar/BaseNav.vue";

export default {
  components: {
    BaseNav,
  },
  props: {
    backgroundColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      year: new Date().getFullYear(),
      pageClass: "login-page",
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    },
    layoutClass() {
      let exceptions = ["index", "home"];
      if (!exceptions.includes(this.$route.name)) {
        return "bg-default";
      } else {
        return "";
      }
    },
  },
  methods: {
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
  },
  watch: {
    "$route.path"() {
      if (this.showMenu) {
        this.closeMenu();
      }
    },
  },
};
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
