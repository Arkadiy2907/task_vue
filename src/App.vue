<template>
  <div class="app">
    <div class="header">
      <h1>Выбирай лучшие кафе города!</h1>
    </div>
    <navbar
      @onGetRundomCard="getRundomCard"
      @onFetchPosts="fetchPosts"
      @onSendSelectedObject="sendSelectedObject"
    />
    <card-list :posts="posts" @select="selectPost" @remove="removePost" />
  </div>
  <my-dialog v-model:show="dialogVisible">
    <h4>pppppp</h4>
    <!-- <card-item :post="rundomPost"></card-item> -->
  </my-dialog>
</template>

<script>
import axios from 'axios';
import CardList from '@/components/CardList.vue';
import CardItem from '@/components/CardItem.vue';
import Navbar from '@/components/Navbar.vue';
// import MyButton from '@/components/UI/MyButton';
import { fakeDataApi } from '@/components/helper/FakeApi';
import {
  getTextCards,
  getRundomPost,
  sendSelectedCard,
} from '@/components/helper/helpFunc';
import { isProxy, toRaw } from 'vue';
// let rawData = someData;

export default {
  components: {
    Navbar,
    CardList,
    CardItem,
    // MyButton,
  },

  data() {
    return {
      posts: [],
      selectedPostId: '',
      rundomPost: [],
      dialogVisible: false,
    };
  },

  methods: {
    async fetchPosts() {
      // try {
      //   const response = await axios.get(
      //     'https://bandaumnikov.ru/api/test/site/get-index'
      //   );
      //   this.posts = response?.data?.data;
      //   getTextCards(this.posts);
      //   // console.log(this.posts);
      //   this.selectedPostId = '';
      //   // console.log(this.selectedPostId);
      // } catch (e) {
      //   console.log('error message:', e.message);
      //   this.posts = fakeDataApi;
      // }
      fetch('https://bandaumnikov.ru/api/test/site/get-index')
        .then((response) => response.json())
        .then((result) => {
          this.posts = JSON.parse(result);
          console.log(this.posts);
        })
        .catch((error) => {
          console.error(error);
          this.posts = fakeDataApi;
        });
    },

    getRundomCard() {
      this.rundomPost = getRundomPost(this.posts);
      let arr = [JSON.parse(JSON.stringify(this.rundomPost))];

      // let rawData = arr;

      // if (isProxy(arr)) {
      //   rawData = toRaw(arr);
      // }

      this.rundomPost = getTextCards(arr);
      // showDialog();
      // this.dialogVisible = true;

      console.log(arr);
    },

    selectPost(id = null) {
      this.selectedPostId = id;
    },

    sendSelectedObject() {
      sendSelectedCard(this.posts, this.selectedPostId);
    },

    removePost(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id);
    },

    // showDialog() {
    //   this.dialogVisible = true;
    // },
  },

  mounted() {
    this.fetchPosts();
  },
};
</script>

<style lang="scss">
@import '~@/components/scss/main.scss';
</style>
