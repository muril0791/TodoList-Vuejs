<template>
  <div id="app">
    <NavBarComponent></NavBarComponent>
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";

// import NavBarComponent from "./components/NavBarComponent";

export default {
  components: {
    NavBarComponent,
  },
};
</script>

<style></style>
