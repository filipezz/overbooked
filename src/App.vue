<template>
  <router-view />
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
html,
body {
  height: 100%;
  color: #3f4043;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  color: #54565a;
}
#app {
  background: #f2f2f2;

  min-height: 100vh;
}
</style>
