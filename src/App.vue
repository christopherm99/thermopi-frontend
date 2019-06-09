<template>
  <div id="app">
    <V-toolbar flat color="#1b3039" dark>
      <v-toolbar-title>ThermoPi</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ time | moment("dddd, MMMM Do YYYY, h:m a") }}</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-flex class="target">
        <div>
          <v-btn v-on:click="increment"><i class="fas fa-plus"></i></v-btn>
        </div>
        <p>{{ target }}</p>
        <div>
          <v-btn v-on:click="decrement"><i class="fas fa-minus"></i></v-btn>
        </div>
      </v-flex>
      <v-flex class="average">
        <p>{{ average }}</p>
      </v-flex>
      <v-flex class="controls">
        <div>
          <v-btn>Hold</v-btn>
        </div>
        <div>
          <v-btn>Set</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-footer>
      <v-flex v-for="sensor in sensors" v-bind:key="sensor.name">
        {{ sensor.name }}: {{ sensor.value }}°C
      </v-flex>
    </v-footer>
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
    setInterval(this.refreshTime, 30000)
  },
  methods: {
    refreshTime() {
      this.time = new Date()
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
      this.refresh();
      axios.post(server + "/target", {
        value: this.target + 1,
        persistent: false
      });
      this.refresh();
    },
    decrement() {
      this.refresh();
      axios.post(server + "/target", {
        value: this.target - 1,
        persistent: false
      });
      this.refresh();
    }
  }
};
</script>

<style lang="scss">
/*
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
    height: 400px;
    div {
      justify-self: center;
      align-self: center;
    }
    .target {
      grid-column: 1;
      div {
        display: block;
        text-align: center;
        button {
          display: inline-block;
          background-color: #005ecb;
          border: none;
          color: white;
          padding: 5px;
          margin: 25px 0px;
          font-size: 20pt;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          width: 60px;
          height: 60px;
        }
        button:active {
          box-shadow: none;
        }
        button:focus {
          outline: 0;
        }
      }
      p {
        display: block;
        font-size: 72pt;
        margin: 0px;
      }
    }
    .average {
      grid-column: 2;
      font-size: 128pt;
      p {
        margin: 50px 0px;
      }
    }
    .controls {
      grid-column: 3;
      div {
        display: block;
        text-align: center;
        button {
          display: inline-block;
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
*/
</style>
