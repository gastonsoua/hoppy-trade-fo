<template>
  <footer class="footer px-4 mx-2">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
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
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
