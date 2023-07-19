<template>
  <div class="app">
    <div class="all-btn">
      <h4>рычаги воздействия на окружающую действительность</h4>
      <button class="btn" @click="getRundomPost">rundom</button>
      <button class="btn" @click="fetchPosts">get data</button>
    </div>
    <div class="post" v-for="post in posts" :key="post.id">
      <div><strong>Название</strong> {{ post.name }}</div>
      <div><strong>Адрес</strong> {{ post.address }}</div>
      <div><strong>Ориентир</strong> {{ post.landmark }}</div>
      <div><strong>Кухня</strong> {{ post.cuisine }}</div>
      <div><strong>Расстояние</strong> {{ post.distance }}</div>
      <div><strong>Время</strong> {{ post.time }}</div>
      <div>
        <strong>Фото</strong>
        <img v-if="post.photo" :src="post.photo" alt="photo" />
        <img v-else src="./assets/noPhoto.webp" alt="photo" />
      </div>
      <div><strong>Бизнес ланч</strong> {{ post.business_lunch }}</div>
      <div><strong>Цена</strong> {{ post.price }}</div>
    </div>
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

.app {
  padding: 20px;

  .post {
    padding: 15px;
    border: 3px solid blue;
    margin-top: 15px;
  }

  .all-btn {
    display: flex;
    flex-direction: column;

    .btn {
      width: 100%;
      margin-top: 15px;
      align-self: flex-end;
      padding: 10px 15px;
      background: none;
      color: teal;
      border: 1px solid teal;
    }
  }
}
</style>
