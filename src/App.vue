<template>
  <div id="app">
    <navbar />
    <columns />
    <sensors />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Navbar from "./components/Navbar";
import Columns from "./components/Columns";
import Sensors from "./components/Sensors";

export default {
  name: "app",
  components: {
    Navbar,
    Columns,
    Sensors
  },
  methods: {
    ...mapActions(["refresh"]) // Imports refresh action from Vuex
  },
  // Sets up autorefresh
  mounted() {
    this.refresh();
    setInterval(this.refresh, 5000);
  }
};
</script>
