<template>
  <div id="app">
    <header>
      <div>Other info...</div>
      <div>ThermoPi</div>
      <div>Date Time</div>
    </header>
    <main>
      <div class="target">
        <button>+</button>
        <p>{{ target }}</p>
        <button>-</button>
        </div>
      <div class="average">
        <p>{{ average }}</p>
      </div>
      <div class="controls">
        <button>Hold</button>
        <button>Set</button>
      </div>
    </main>
    <footer>
      <div v-for="sensor in sensors" v-bind:key="sensor.name">
        {{ sensor.name }}: {{ sensor.value }}°C
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      sensors: [],
      target: 0,
      average: 0
    };
  },
  mounted() {
    axios.get("http://localhost:3000/sensors").then(response => {
      this.sensors = response.data;
      let tot = 0;
      for (let i = 0; i < this.sensors.length; i++) {
        tot += this.sensors[i].value;
      }
      this.average = Math.round(tot / this.sensors.length);
    });
    axios.get("http://localhost:3000/target").then(response => {
      this.target = response.data.value;
    });
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0px;
}
#app {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #445963;
  min-height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-template-columns: 1fr 1fr 1fr;
  header {
    grid-row: 1;
    grid-column: 1 / span 3;
    display: grid;
    grid-template: subgrid;
    grid-auto-flow: column;
    background-color: #1b3039;
    color: white;
    div {
      justify-self: center;
      align-self: center;
      grid-column: auto;
      padding: 0px;
    }
  }
  main {
    grid-row: 2;
    display: grid;
    grid-column: 1 / span 3;
    grid-template: subgrid;
    grid-auto-flow: column;
    div {
      justify-self: center;
      align-self: center;
    }
    .target {
      grid-column: 1;
      button {
        display: block;
        background-color: #005ecb;
        border: none;
        color: white;
        padding: 5px 15px;
        margin: 50px 0px;
        font-size: 20pt;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4);
        border-radius: 50%;
      }
      p {
        display: block;
        font-size: 72pt;
      }
    }
    .average {
      grid-column: 2;
      font-size: 128pt;
    }
    .controls {
      grid-column: 3;
      button {
        display: block;
        background-color: #005ecb;
        border: none;
        color: white;
        padding: 5px 15px;
        margin: 50px 0px;
        font-size: 20pt;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4);
        border-radius: 4px;
      }
    }
  }
  footer {
    background-color: #708690;
    grid-row: 3;
    grid-column: 1 / span 3;
    display: grid;
    grid-template: subgrid;
    grid-auto-flow: column;
    div {
      justify-self: center;
      align-self: center;
      grid-column: auto;
      padding: 0px;
    }
  }
}
</style>
