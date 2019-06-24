<template>
  <nav class="navbar is-primary">
    <div class="navbar-brand">
      <div class="navbar-item">
        <h1 class="title has-text-light">
          thermopi
        </h1>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <h2 class="subtitle has-text-light">
          {{ time | moment("h:mm a") }}
        </h2>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      time: new Date()
    };
  },
  mounted() {
    setInterval(this.refresh, 30000);
  },
  methods: {
    refresh() {
      this.time = new Date();
    }
  }
};
</script>
