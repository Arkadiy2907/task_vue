<template>
  <div class="app">
    <div class="all-btn">
      <button class="btn" @click="getRundomPost">случайный выбор кафе</button>
      <button class="btn" @click="fetchPosts">все варианты кафе</button>
    </div>
    <ul class="wrap_card">
      <li class="card" v-for="post in posts" :key="post.id">
        <div><strong>Кафе:</strong> {{ post.name }}</div>
        <img v-if="post.photo" :src="post.photo" alt="photo" />
        <img v-else src="./assets/noPhoto.webp" alt="photo" />
        <div class="card__overlay">
          <div><strong>Адрес:</strong> {{ post.address }}</div>
          <div><strong>Ориентир:</strong> {{ post.landmark }}</div>
          <div><strong>Кухня:</strong> {{ post.cuisine }}</div>
          <div><strong>Расстояние:</strong> {{ post.distance }}</div>
          <div><strong>Время:</strong> {{ post.time }}</div>
          <div><strong>Бизнес ланч:</strong> {{ post.business_lunch }}</div>
          <div><strong>Цена:</strong> {{ post.price }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      name: "",
      address: "",
      landmark: "",
      cuisine: "",
      distance: "",
      time: "",
      photo: "",
      business_lunch: "",
      price: "",
    };
  },

  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          "https://bandaumnikov.ru/api/test/site/get-index"
        );
        this.posts = response?.data?.data;
      } catch (e) {
        console.log("error message:", e.message);
      }
    },

    async getRundomPost() {
      try {
        const id = Math.floor(Math.random() * this.posts.length);
        const response = await axios.get(
          `https://bandaumnikov.ru/api/test/site/get-view?id=${id}`
        );
        this.posts = [];
        const post = response?.data?.data;
        this.posts.push(post);
      } catch (e) {
        console.log("error message:", e.message);
      }
    },
  },

  mounted() {
    this.fetchPosts();
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

$green: rgb(0, 128, 128);

ul {
  padding: 0;
  list-style-type: none;
}

.app {
  padding: 20px;
  color: $green;

  .wrap_card {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;

    .card {
      position: relative;
      overflow: hidden;
      background: none;
      cursor: pointer;
      width: 21rem;
      height: 21rem;
      max-width: 21rem;
      max-height: 21rem;
      padding: 0;
      text-align: center;

      .card__overlay {
        position: absolute;
        bottom: 0;
        left: 4%;
        right: 4%;
        padding: 2%;
        z-index: 1;
        text-align: left;
        background-color: rgb(0, 128, 128, 0.7);
        transform: translateY(100%);
        transition: 0.7s ease-in-out;
        border-radius: 0.3rem;
        color: white;
      }

      &:hover {
        .card__overlay {
          transform: translateY(0);
        }
      }

      img {
        border-radius: 1rem;
        transition: 0.5s ease-in-out;
        object-fit: cover;
        height: 100%;
        width: 100%;

        &:hover {
          transform: scale(1.009);
          border-radius: 0;
        }
      }
    }
  }

  .all-btn {
    display: flex;
    flex-wrap: wrap;

    .btn {
      margin: 15px 10px;
      padding: 10px 15px;
      background: none;
      color: $green;
      border: 1px solid $green;
      transition: all ease 0.8s;
      cursor: pointer;
      border-radius: 10px;

      &:hover {
        background-color: $green;
        color: white;
      }
    }
  }
}
</style>
