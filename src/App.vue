<template>
  <div class="app">
    <div class="header">
      <h1>Выбирай лучшие кафе города:</h1>
    </div>
    <navbar
      @onGetRundomCard="getRundomCard"
      @onFetchPosts="fetchPosts"
      @onSendSelectedObject="sendSelectedObject"
    />
    <card-list :posts="posts" @select="selectPost" />
  </div>
</template>

<script>
import axios from 'axios';
import CardList from '@/components/CardList.vue';
import Navbar from '@/components/Navbar.vue';
import MyButton from '@/components/UI/MyButton';
import { fakeDataApi } from '@/components/helper/FakeApi';
import { getTextCards, getRundomPost } from '@/components/helper/helpFunc';

export default {
  components: {
    Navbar,
    CardList,
    MyButton,
  },

  data() {
    return {
      posts: [],
      selectedPostId: '',
      rundomPost: [],
    };
  },

  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          'https://bandaumnikov.ru/api/test/site/get-index'
        );
        this.posts = response?.data?.data;
        getTextCards(this.posts);
      } catch (e) {
        console.log('error message:', e.message);
        this.posts = fakeDataApi;
      }
    },

    getRundomCard() {
      this.rundomPost = getRundomPost(this.posts);
      console.log(this.rundomPost);
    },

    selectPost(id = null) {
      this.selectedPostId = id;
    },

    sendSelectedObject() {
      const selectedPost = this.posts.find(
        (post) => post.id === this.selectedPostId
      );
      if (selectedPost === undefined) {
        console.log('карта не выбрана');
        return;
      }
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
@import '~@/components/scss/main.scss';
</style>
