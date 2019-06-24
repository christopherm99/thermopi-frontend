<template>
  <div>
    <div class="box">
      <h2 class="subtitle">
        Current Temperature
      </h2>
      <div id="content">
        <p class="is-size-3">
          {{ average }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "average",
  computed: mapGetters(["average"]) // Imports average getter from Vuex
};
</script>

<style lang="scss" scoped>
#content {
  text-align: center;
  margin: 26px 0;
}
</style>
