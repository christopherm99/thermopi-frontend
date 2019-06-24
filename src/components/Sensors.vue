<template>
  <footer>
    <h2 class="subtitle">Sensor Readings</h2>
    <div class="level">
      <p
        class="level-item box has-text-centered has-text-black-ter is-size-4"
        :class="`has-background-${sensor.name}`"
        v-for="sensor in sensors"
        v-bind:key="sensor.name"
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
  computed: mapState(["sensors"])
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.css";

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35vh;
  background-color: #fafafa;
  padding: 3vh 5vw 2.5vh;
}
</style>
