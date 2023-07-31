<template>
  <div class="wrap_card">
    <card-item
      v-for="post in posts"
      :key="post.id"
      @click="selectPost(post.id)"
      :class="{ selected: selectedPost === post.id }"
      :post="post"
    >
    </card-item>
  </div>
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
      }
    },
  },
};
</script>
