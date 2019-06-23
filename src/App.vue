<template>
  <div id="app">
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
    <div class="columns" style="margin: 10px;">
      <div class="column">
        <div class="box">
          <p class="subtitle">
            Target Temperature
          </p>
          <div class="center" style="margin: 8vh 0;">
            <b-button
              v-on:click="decrement"
              icon-right="minus"
              class="is-inline-block is-size-5"
            />
            <p class="is-inline-block is-size-4" style="padding: 6.5px 10px">
              {{ target }}
            </p>
            <b-button
              v-on:click="increment"
              icon-right="plus"
              class="is-inline-block is-size-5"
            />
          </div>
        </div>
      </div>
      <div class="column is-primary">
        <div class="box">
          <h2 class="subtitle">
            Current Temperature
          </h2>
          <div class="center" style="margin: 5vh 0;">
            <p class="is-size-1">{{ average }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <h2 class="subtitle">
            Settings
          </h2>
          <div class="center" style="margin: 9vh 0;">
            <b-button class="is-size-6">Hold</b-button>
            <b-button class="is-size-6">Set</b-button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <h2 class="subtitle">Sensor Readings</h2>
      <nav class="level">
        <div
          class="level-item has-text-centered"
          :class="`has-background-${sensor.name}`"
          v-for="sensor in sensors"
          v-bind:key="sensor.name"
        >
          {{ sensor.value }} °F
        </div>
      </nav>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

let server = "http://localhost:8080"; // Local testing server

export default {
  name: "app",
  data() {
    return {
      sensors: [],
      target: 0,
      average: 0,
      time: new Date()
    };
  },
  mounted() {
    this.refresh();
    setInterval(this.refresh, 5000);
    setInterval(this.refreshTime, 30000);
  },
  methods: {
    refreshTime() {
      this.time = new Date();
    },
    refresh() {
      axios.get(server + "/sensors").then(response => {
        this.sensors = response.data;
        let tot = 0;
        for (let i = 0; i < this.sensors.length; i++) {
          tot += this.sensors[i].value;
        }
        this.average = Math.round(tot / this.sensors.length);
      });
      axios.get(server + "/target").then(response => {
        this.target = response.data.value;
      });
    },
    increment() {
      this.target++;
      axios.post(server + "/target", {
        value: this.target,
        persistent: false
      });
      // this.refresh();
    },
    decrement() {
      this.target--;
      axios.post(server + "/target", {
        value: this.target,
        persistent: false
      });
      // this.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/colors.css";
footer {
  height: 25vh;
  background-color: #fafafa;
  padding: 5vh 5vw 2.5vh;
}
.level-item {
  height: 15vh;
  border-radius: 5px;
}
.center {
  margin: 10vh 0;
  text-align: center;
}
.box {
  height: 35vh;
}
</style>
