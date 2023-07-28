<template>
  <div class="app">
    <div class="header">
      <h1>Выбирай лучшие кафе города:</h1>
      <my-button @click="getRundomPost">случайный выбор кафе</my-button>
      <my-button @click="fetchPosts">все варианты кафе</my-button>
      <my-button @click="sendSelectedObject">
        отправить выбранное на почту
      </my-button>
    </div>
    <card-list :posts="posts" @select="selectPost" />
  </div>
</template>

<script>
import axios from 'axios';
import CardList from '@/components/CardList.vue';
import MyButton from '@/components/UI/MyButton';

export default {
  components: {
    CardList,
    MyButton,
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
      // console.log(mailto_link);
      window.open(mailto_link, 'emailWindow');
    },
  },

  mounted() {
    this.fetchPosts();
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';
</style>
