<template>
  <div class="wrap_card" v-show="posts.length > 0">
    <card-item
      v-for="post in posts"
      :key="post.id"
      @click="selectPost(post.id)"
      :class="{ selected: selectedPost === post.id }"
      :post="post"
      @remove="$emit('remove', post)"
    >
    </card-item>
  </div>
  <h2 v-show="posts.length === 0" style="color: red">Вариантов больше нет</h2>
</template>

<script>
import CardItem from '@/components/CardItem.vue';

export default {
  components: { CardItem },

  data() {
    return {
      selectedPost: null,
    };
  },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },

  methods: {
    selectPost(id) {
      if (this.selectedPost === id) {
        this.$emit('select', null);
        this.selectedPost = null;
      } else {
        this.$emit('select', id);
        this.selectedPost = id;
        setTimeout(() => {
          this.selectedPost = null;
        }, 3000);
      }
    },
  },
};
</script>
