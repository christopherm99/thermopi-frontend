<template>
  <div class="navbar is-primary">
    <!-- Title -->
    <div class="navbar-brand">
      <div class="navbar-item">
        <h1 class="title has-text-light">
          thermopi
        </h1>
      </div>
    </div>
    <!-- Time -->
    <div class="navbar-end">
      <div class="navbar-item">
        <h2 class="subtitle has-text-light">
          <!-- Parses this.time to human readable string -->
          {{ time | moment("h:mm a") }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      time: new Date() // Initializes this.time with current time
    };
  },
  mounted() {
    // Ensures time is always current by constantly updating
    setInterval(this.refresh, 30000);
  },
  methods: {
    // Updates this.time to current time
    refresh() {
      this.time = new Date();
    }
  }
};
</script>
