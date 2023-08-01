<template>
  <div class="app">
    <div class="header">
      <h1>Выбирай лучшие кафе города!</h1>
    </div>
    <navbar
      @onGetRandomCard="getRandomCard"
      @onFetchPosts="fetchPosts"
      @onSendSelectedObject="sendSelectedObject"
    />
    <card-list :posts="posts" @select="selectPost" @remove="removePost" />
  </div>
  <my-dialog v-model:show="dialogVisible">
    <card-item :post="randomPost"></card-item>
  </my-dialog>
</template>

<script>
import axios from "axios";
import CardList from "@/components/CardList.vue";
import CardItem from "@/components/CardItem.vue";
import Navbar from "@/components/Navbar.vue";
import { fakeDataApi } from "@/helper/FakeApi";
import {
  getTextCards,
  getRandomPost,
  sendSelectedCard,
  getTextOneCard,
} from "@/helper/helpFunc";

export default {
  components: {
    Navbar,
    CardList,
    CardItem,
  },

  data() {
    return {
      posts: [],
      selectedPostId: "",
      randomPost: [],
      dialogVisible: false,
    };
  },

  methods: {
    async fetchPosts() {
      const url = "https://bandaumnikov.ru/api/test/site/get-index";

      // fetch(url)
      //   .then((response) => response.json())
      //   .then((result) => {
      //     this.posts = result.data;
      //     // console.log(result.data);
      //     getTextCards(this.posts);
      //     this.selectedPostId = '';
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.posts = fakeDataApi;
      //     getTextCards(this.posts);
      //     this.selectedPostId = '';
      //   });

      axios
        .get(url)
        .then((response) => {
          this.posts = response?.data?.data;
          getTextCards(this.posts);
        })
        .catch((error) => {
          console.log(error);
          this.posts = fakeDataApi;
          getTextCards(this.posts);
        });
    },

    getRandomCard() {
      this.randomPost = getRandomPost(this.posts);
      getTextOneCard(this.randomPost);
      this.dialogVisible = true;
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
  },

  mounted() {
    this.fetchPosts();
  },
};
</script>

<style lang="scss">
@import "~@/components/scss/main.scss";
</style>
