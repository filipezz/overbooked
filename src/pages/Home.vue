<template>
  <div class="home-container">
    <div class="input">
      <img src="../assets/search.svg" alt="" />
      <input
        v-debounce:500="getBook"
        v-model="search"
        type="text"
        placeholder="Search book"
      />
    </div>

    <main v-if="!search">
      <h1>Hi, <strong>Megmed AI Faith</strong></h1>
      <section>
        <div>
          <h3>Discover new book</h3>
          <a href="">More</a>
        </div>
        <div class="carousel">
          <img src="../assets/Banner.png" alt="" />
          <img src="../assets/Banner2.png" alt="" />
        </div>
      </section>
      <section>
        <div>
          <h3>Currently Reading</h3>
          <a href="">All</a>
        </div>
        <div class="currently-reading">
          <img class="currently-img" src="../assets/reading-book.png" alt="" />
          <div>
            <strong>Originals</strong>

            <p>by Adam Grant</p>

            <span
              ><img src="../assets/chapter.svg" alt="" /> Chapter <b>2</b> From
              9</span
            >
          </div>
        </div>
      </section>

      <section>
        <div>
          <h3>Reviews of The Days</h3>
          <a href="">All Video</a>
        </div>
        <img class="reviews-img" src="../assets/Bitmap.png" alt="" />
      </section>
    </main>
    <div class="search-results" v-else>
      <div>
        <Skeleton
          v-if="loading"
          v-for="item in 12"
          :key="item"
          width="101px"
          height="153px"
        />

        <div v-for="book in books" :key="book.id">
          <div @click="navigate(book.id)">
            <img
              :src="book.volumeInfo.imageLinks?.thumbnail || defaultImage"
              alt="Thumbnail not provided"
            />
            <strong>{{ book.volumeInfo.title }}</strong>
            <p>by {{ book.volumeInfo.authors?.[0] }}</p>
          </div>
        </div>
      </div>
      <button
        v-if="books.length"
        @click="loadMore"
        :disabled="loadingButton"
        class="load-more"
      >
        Load More
      </button>
    </div>

    <Nav />
  </div>
</template>

<script>
import axios from "axios";
import Skeleton from "../components/Skeleton";
import Nav from "../components/Nav.vue";

export default {
  components: {
    Nav,
    Skeleton,
  },
  data() {
    return {
      search: "",
      books: [],
      loading: false,
      totalItems: "",
      currentPage: 0,
      loadingButton: false,
      defaultImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png",
    };
  },
  methods: {
    async loadMore() {
      this.loadingButton = true;
      this.currentPage += 1;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${this.search}&maxResults=12&startIndex=${this.currentPage}`
      );
      this.books = [...this.books, ...response.data.items];
      this.loadingButton = false;
    },
    navigate(id) {
      this.$router.push(`/book/${id}`);
    },
    async getBook(query) {
      this.currentPage = 0;
      this.loading = true;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`
      );
      const { items, totalItems } = response.data;
      this.totalItems = totalItems;
      this.books = items;

      this.loading = false;
    },
  },
  computed: {
    totalPages() {
      return Math.floor(this.totalItems / 12);
    },
  },
};
</script>

<style lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 30px;
  }
  strong {
    color: #fe6a79;
  }

  a {
    color: #4abdf1;
    text-decoration: none;
  }
  .input {
    margin: 50px 20px 30px;
    padding: 15px 10px;
    border: 0;
    background: #fdfcfc;
    box-shadow: 5px 5px 80px 0px #d4ad861f;
    display: flex;

    input {
      width: 100%;
      border: 0;
      outline: 0;
      margin-left: 12px;
      color: #000;
      font-weight: bold;
      line-height: 18px;
      &::placeholder {
        color: #54565a;
        font-weight: normal;
      }
    }
  }
  main {
    padding: 0 20px 60px;
    section {
      margin-bottom: 30px;
      h3 {
        color: #3f4043;
        margin-bottom: 15px;
      }
      .carousel {
        display: flex;
        overflow-x: auto;
        margin-right: -20px;
        img {
          border-radius: 5px;
          margin-right: 10px;
        }
      }
      div {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      }
      .currently-reading {
        background: url("../assets/reading.png");
        margin-left: -20px;
        display: flex;
        background-size: cover;
        background-position: center;
        align-items: center;
        justify-content: flex-start;
        > div {
          display: block;
          margin-left: 8px;

          p {
            font-size: 10px;
            margin-top: 5px;
            font-family: "Roboto";
            color: #74776d;
          }
          span {
            font-size: 10px;
            margin-top: 22px;
            color: #2a2b26;
            display: flex;
            margin-bottom: 10px;
            img {
              margin-right: 5px;
            }
            b {
              color: #ec6374;
            }
          }
        }
        .currently-img {
          height: 136px;
          width: 91px;
          margin-left: 20px;
        }
        strong {
          font-family: "Playfair Display", serif;
          font-size: 20px;
          color: #2a2b26;
          margin-top: 10px;

          display: inline-block;
          letter-spacing: 2px;
        }
      }
      .reviews-img {
        width: 100%;
        height: 181px;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }

  .search-results {
    padding: 0 20px 80px;
    display: flex;
    flex-direction: column;

    > div {
      display: grid;
      margin-bottom: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 17px;
      img {
        border-radius: 5px;
        width: 101.33px;
        object-fit: cover;
        height: 153px;
        box-shadow: 0px 2px 4px 0px #e5e5e580;
      }
      strong,
      p {
        font-weight: 700;

        font-size: 12px;
        line-height: 14px;
        color: rgba(49, 49, 49, 0.8);
      }
      p {
        font-size: 10px;
        font-family: "Roboto";
        font-weight: 900;
      }
    }

    .load-more {
      background: #4abdf1;
      color: #fff;
      border-radius: 5px;
      border: 0;
      font-weight: bold;
      padding: 15px;
      font-size: 18px;
      transition: 0.1s;

      &:disabled {
        background: #abcddd;
        cursor: default;
      }
    }
  }
}
</style>
