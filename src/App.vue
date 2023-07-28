<template>
  <div class="app">
    <div class="header">
      <h1>Выбирай лучшие кафе города:</h1>
      <button class="header_btn" @click="getRundomPost">
        случайный выбор кафе
      </button>
      <button class="header_btn" @click="fetchPosts">все варианты кафе</button>
      <button class="header_btn" @click="sendSelectedObject">
        отправить выбранное на почту
      </button>
    </div>
    <card-list :posts="posts" @select="selectPost" />
  </div>
</template>

<script>
import axios from 'axios';
import CardList from '@/components/CardList.vue';

export default {
  components: {
    CardList,
  },

  data() {
    return {
      posts: [],
      selectedPostId: '',
    };
  },

  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          'https://bandaumnikov.ru/api/test/site/get-index'
        );
        this.posts = response?.data?.data;
      } catch (e) {
        console.log('error message:', e.message);
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
        console.log('error message:', e.message);
      }
    },

    selectPost(id = null) {
      console.log(id);
      this.selectedPostId = id;
    },

    sendSelectedObject() {
      const selectedPost = this.posts.find(
        (post) => post.id === this.selectedPostId
      );
      if (selectedPost === undefined) return;
      const email = 'example@example.com';
      const subject = 'Выбранный объект';
      const body = `Название кафе: ${selectedPost?.name}; Адрес: ${selectedPost?.address};`;
      const mailto_link = `mailto:${email}?subject=${subject}&body=${body}`;
      console.log(mailto_link);
      // window.open(mailto_link, 'emailWindow');
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
}
</style>
