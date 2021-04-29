<template>
  <div class="details-container">
    <header>
      <img class="ovals" src="../assets/Oval-1.svg" alt="" />
      <img class="ovals" src="../assets/Oval-2.svg" alt="" />
      <img class="ovals" src="../assets/Oval-3.svg" alt="" />
      <img class="ovals" src="../assets/Oval-4.svg" alt="" />
      <button @click="goBack">
        <img src="../assets/Back.png" alt="" />
      </button>
      <img :src="bookData.imageLinks?.small" alt="" />
    </header>
    <main>
      <h2>{{ bookData.title }}</h2>
      <p>{{ bookData?.subtitle }}</p>
      <span>{{ bookData.authors?.[0] }}</span>
      <p>{{ bookData.description }}</p>
    </main>
    <nav class="details-nav">
      <div>
        <img src="../assets/book-open.png" alt="" />
        <strong>Read</strong>
      </div>
      <div>
        <img src="../assets/headphones.png" alt="" />

        <strong>Listen</strong>
      </div>
      <div>
        <img src="../assets/share.png" alt="" />

        <strong>Share</strong>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookData: {},
    };
  },
  async mounted() {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${this.$route.params.id}`
    );
    this.bookData = response.data.volumeInfo;
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.details-container {
  display: flex;
  flex-direction: column;
  position: relative;

  header {
    background: url("../assets/details-header.png");
    display: flex;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -34px -41px;
    margin-bottom: 30px;
    padding-top: 80px;
    button {
      border: 0;
      position: absolute;
      left: 33px;
      background: 0;
      top: 55px;
      img {
        width: 16px;
        height: 16px;
      }
    }
    img {
      width: 151px;
      height: 234px;
      margin: 0 auto;
      z-index: 1;
    }
    .ovals {
      position: absolute;
      height: unset;
      width: unset;

      &:nth-child(1) {
        top: 0;
        right: 0;
      }
      &:nth-child(2) {
        top: 109px;
        right: 234px;
        z-index: 0;
      }
      &:nth-child(3) {
        top: 113px;
        right: 313px;
        z-index: 0;
      }
      &:nth-child(4) {
        top: 82px;
        right: 101px;
        z-index: 0;
      }
    }
  }
  h2 {
    margin-bottom: 7px;

    font-weight: 700;
  }

  a {
    color: #4abdf1;
    text-decoration: none;
  }
  main {
    padding: 0 20px;

    span {
      color: #fe6a79;
      font-weight: 500;
    }
    p {
      margin-top: 10px;
      line-height: 25px;
      color: rgba(49, 49, 49, 0.6);
      font-size: 14px;
    }
  }
  .details-nav {
    background: #fff;
    position: fixed;

    box-shadow: 3px 3px 23px 0px #6b674620;
    border-radius: 2px;
    bottom: 53px;
    padding: 20px 0;
    display: flex;
    left: 50%;
    transform: translate(-50%, 0);
    div {
      display: flex;
      padding: 0 20px;
      align-items: center;
      img {
        margin-right: 10px;
        width: 16px;
        height: 16px;
      }
      &:nth-child(2) {
        border-left: 1px solid #97979733;
        border-right: 1px solid #97979733;
      }
    }
  }
}
</style>
