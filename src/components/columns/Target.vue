<template>
  <div>
    <div class="box">
      <p class="subtitle">
        Target Temperature
      </p>
      <div id="content">
        <b-button
          @click="decrement"
          icon-right="minus"
          class="is-inline-block is-size-5"
        />
        <p class="is-inline-block is-size-4">
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
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "target",
  computed: mapState(["target"]), // Imports target variable from Vuex
  methods: {
    ...mapActions({
      increment: "incrementTarget",
      decrement: "decrementTarget"
    }) // Imports increment and decrement actions from Vuex
  }
};
</script>

<style lang="scss" scoped>
#content {
  text-align: center;
  margin: 27.5px 0;
  p {
    padding: 4.5px 15px;
  }
}
</style>
