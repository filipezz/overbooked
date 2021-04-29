<template>
  <nav class="main-nav">
    <button>
      <img src="../assets/home.png" />
      <span>Home</span>
    </button>
    <button>
      <img src="../assets/book.png" />
      <span>Libraries</span>
    </button>
    <button>
      <img src="../assets/user.png" />
      <span>Profile</span>
    </button>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
.main-nav {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 59px;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;

  button {
    font-size: 10px;
    line-height: 12px;
    color: #bfbebf;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: 0;
    border: 0;

    img {
      margin-bottom: 10px;
    }
  }

  button:first-child {
    color: #313131;
  }
}
</style>
