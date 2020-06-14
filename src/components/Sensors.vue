<template>
  <footer>
    <h2 class="subtitle">Sensor Readings</h2>
    <div class="level">
      <p
        class="level-item box has-text-centered has-text-white is-size-4 sensor"
        :class="`has-background-${sensor.name}`"
        v-for="sensor in sensors"
        :key="sensor.name"
      >
        {{ sensor.value }} °F
      </p>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "sensors",
  computed: mapState(["sensors"]) // Imports sensors variable from Vuex
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.css";

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 37.5vh;
  background-color: #fafafa;
  padding: 5vh 5vw 2.5vh;
}

.sensor {
  margin: 0 1vw 0 1vw;
}
</style>
