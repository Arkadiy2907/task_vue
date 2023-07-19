<template>
  <div class="app">
    <div class="header">
      <h1>Выбирай лучшие кафе города:</h1>
      <button class="header_btn" @click="getRundomPost">
        случайный выбор кафе
      </button>
      <button class="header_btn" @click="fetchPosts">все варианты кафе</button>
    </div>
    <ul class="wrap_card">
      <li class="card" v-for="post in posts" :key="post.id">
        <h3 class="card_name">{{ post.name }}</h3>
        <img class="pic" v-if="post.photo" :src="post.photo" alt="photo" />
        <img class="pic" v-else src="./assets/noPhoto.webp" alt="photo" />
        <div class="card__overlay">
          <div v-if="post.address">
            <strong>Адрес:&ensp;</strong> {{ post.address }}
          </div>
          <div v-else>
            <strong>Адрес:&ensp;</strong><span>10-й проезд 7-го выезда</span>
          </div>
          <div v-if="post.landmark">
            <strong>Ориентир:&ensp;</strong> {{ post.landmark }}
          </div>
          <div v-else>
            <strong>Ориентир:&ensp;</strong
            ><span>дерево такое и памятник мужик сидячий</span>
          </div>
          <div v-if="post.cuisine">
            <strong>Кухня:&ensp;</strong> {{ post.cuisine }}
          </div>
          <div v-else>
            <strong>Кухня:&ensp;</strong
            ><span>мишленовская от Ашота Мишленованяна</span>
          </div>
          <div v-if="post.distance">
            <strong>Расстояние:&ensp;</strong>{{ post.distance
            }}<span>метров</span>
            <div>
              <strong>Время:&ensp;</strong> {{ post.time }}<span>минут</span>
            </div>
          </div>
          <div v-else>
            <strong>Расстояние:&ensp;</strong><span>тут не далеко</span>
          </div>
          <div v-if="post.business_lunch">
            <strong>Бизнес ланч:&ensp;</strong><span>да есть</span>
            <div><strong>Цена:</strong> {{ post.price }}<span>руб</span></div>
          </div>
          <div v-else>
            <strong>Бизнес ланч:&ensp;</strong><span>пока нет</span>
          </div>
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
$white: rgb(255, 255, 255);

ul {
  padding: 0;
  list-style-type: none;
}

.app {
  padding: 1rem;
  color: $green;
  font-family: sans-serif;
  transition: all ease 0.8s;

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;

    &:first-child {
      color: red;
    }

    .header_btn {
      margin: 1rem 1.5rem;
      padding: 0.7rem 1.2rem;
      background: none;
      color: $green;
      border: 1px solid $green;
      transition: all ease 0.8s;
      cursor: pointer;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: bold;

      &:hover {
        box-shadow: 0 0 0.5rem 0.4rem rgba(0, 128, 128, 0.29);
        background-color: $green;
        color: $white;
      }
    }
  }

  .wrap_card {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;

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
      border-radius: 0.3rem;
      transition: 0.7s ease-in-out;

      .card_name {
        line-height: 1.7rem;
      }

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
        transition: all 0.7s ease-in-out;
        border-radius: 0.3rem;
        color: $white;
      }

      &:hover {
        border-radius: 0;
        box-shadow: 0 0 0.5rem 0.4rem rgba(0, 128, 128, 0.29);
        .card__overlay {
          transform: translateY(0);
        }
      }

      .pic {
        border-radius: 0.3rem;
        transition: all 0.5s ease-in-out;
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
}
</style>
