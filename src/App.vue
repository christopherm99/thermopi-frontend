<template>
  <div id="app">
    <navbar />
    <columns :server="server" :average="average" />
    <sensors :sensors="sensors" />
  </div>
</template>

<script>
import axios from "axios";

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
  data() {
    return {
      sensors: [],
      average: 0,
      server: "http://localhost:8080"
    };
  },
  mounted() {
    this.refresh();
    setInterval(this.refresh, 5000);
  },
  methods: {
    refresh() {
      axios.get(this.server + "/sensors").then(response => {
        this.sensors = response.data;
        let tot = 0;
        for (let i = 0; i < this.sensors.length; i++) {
          tot += this.sensors[i].value;
        }
        this.average = Math.round(tot / this.sensors.length);
      });
    }
  }
};
</script>
