<template>
  <div
    class="wrap"
    :style="dialogVisible ? 'overflow: hidden' : 'overflow: auto'"
  >
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
import { fetchPosts } from "@/helper/api.js";

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
    // fetchPosts() {
    //   const url = "https://bandaumnikov.ru/api/test/site/get-index";

    //   axios
    //     .get(url)
    //     .then((response) => {
    //       this.posts = response?.data?.data;
    //       getTextCards(this.posts);
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //       this.posts = fakeDataApi;
    //       getTextCards(this.posts);
    //     });
    // },
    fetchPosts() {
      fetchPosts()
        .then((posts) => {
          this.posts = posts;
        })
        .catch((error) => {
          console.log("error", error);
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
