<template>
  <footer>
    <h2 class="subtitle">Sensor Readings</h2>
    <nav class="level">
      <p
        class="level-item box has-text-centered has-text-black-ter is-size-4"
        :class="`has-background-${sensor.name}`"
        v-for="sensor in sensors"
        v-bind:key="sensor.name"
      >
        {{ sensor.value }} °F
      </p>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "sensors",
  props: {
    sensors: Array
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.css";

footer {
  height: 25vh;
  background-color: #fafafa;
  padding: 5vh 5vw 2.5vh;
}
</style>
