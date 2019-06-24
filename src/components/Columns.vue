<template>
  <div class="columns" style="margin: 10px;">
    <div class="column">
      <div class="box">
        <p class="subtitle">
          Target Temperature
        </p>
        <div class="center" style="margin: 8vh 0;">
          <b-button
            @click="decrement"
            icon-right="minus"
            class="is-inline-block is-size-5"
          />
          <p class="is-inline-block is-size-4" style="padding: 4.5px 15px">
            {{ target }}
          </p>
          <b-button
            @click="increment"
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
          <b-button
            class="is-size-6"
            :type="hold ? 'is-primary' : ''"
            @click="toggleHold"
            >Hold</b-button
          >
          &nbsp;
          <b-button class="is-size-6">Set</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Columns",
  props: {
    average: Number,
    server: String
  },
  data() {
    return {
      target: Number,
      hold: Boolean
    };
  },
  mounted() {
    this.refresh();
    setInterval(this.refresh, 5000);
  },
  methods: {
    refresh() {
      axios.get(this.server + "/target").then(response => {
        this.target = response.data.value;
      });
      axios.get(this.server + "/settings/hold").then(response => {
        this.hold = response.data.hold;
      });
    },

    increment() {
      this.target++;
      axios.post(this.server + "/target", {
        value: this.target,
        persistent: false
      });
      // this.refresh();
    },
    decrement() {
      this.target--;
      axios.post(this.server + "/target", {
        value: this.target,
        persistent: false
      });
      // this.refresh();
    },
    toggleHold() {
      this.hold = !this.hold;
      axios.post(this.server + "/settings/hold", {
        hold: this.hold
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.level-item {
  height: 15vh;
}

.center {
  margin: 10vh 0;
  text-align: center;
}

.box {
  height: 35vh;
}
</style>
