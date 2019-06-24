<template>
  <div>
    <div class="box">
      <h2 class="subtitle">
        Settings
      </h2>
      <div id="content">
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
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "settings",
  computed: mapState(["hold"]),
  methods: {
    ...mapActions(["toggleHold"])
  }
};
</script>

<style>
#content {
  margin: 32px 0;
  text-align: center;
}
</style>
