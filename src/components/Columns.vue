<template>
  <div class="columns" style="margin: 10px;">
    <target class="column" />
    <average class="column" />
    <settings class="column" />
  </div>
</template>

<script>
import Target from "./columns/Target";
import Average from "./columns/Average";
import Settings from "./columns/Settings";

export default {
  name: "Columns",
  components: {
    Target,
    Average,
    Settings
  }
};
</script>
