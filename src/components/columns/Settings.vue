<template>
  <div>
    <div class="box">
      <h2 class="subtitle">
        Settings
      </h2>
      <div id="content">
        <b-button
          class="is-size-6"
          :type="
            hold ? 'is-primary' : ''
          "
          @click="toggleHold"
          >Hold</b-button
        >
        <!-- Adds slight spacing between buttons -->
        &nbsp;
        <b-button class="is-size-6">Set</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "settings",
  computed: mapState(["hold"]), // Imports hold variable from Vuex
  methods: {
    ...mapActions(["toggleHold"]) // Imports toggleHold action from Vuex
  }
};
</script>

<style>
#content {
  margin: 32px 0;
  text-align: center;
}
</style>
