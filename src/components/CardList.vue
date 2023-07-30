<template>
  <ul class="wrap_card">
    <li
      class="card"
      v-for="post in posts"
      :key="post.id"
      @click="selectPost(post.id)"
      :class="{ selected: selectedPost === post.id }"
    >
      <h2 class="card_name">{{ post.name }}</h2>
      <img class="pic" v-if="post.photo" :src="post.photo" alt="photo" />
      <img class="pic" v-else src="@/assets/noPhoto.webp" alt="photo" />
      <div class="card__overlay">
        <div><strong>Адрес:&ensp;</strong> {{ post.address }}</div>
        <div><strong>Ориентир:&ensp;</strong> {{ post.landmark }}</div>
        <div><strong>Кухня:&ensp;</strong> {{ post.cuisine }}</div>
        <div>
          <strong>Расстояние:&ensp;</strong>{{ post.distance
          }}<span>метров</span>
        </div>
        <div>
          <strong>Время:&ensp;</strong> {{ post.time }}<span>&ensp;минут</span>
        </div>
        <div>
          <strong>Бизнес ланч:&ensp;</strong
          ><span>{{ post.business_lunch }}</span>
        </div>
        <div><strong>Цена:</strong> {{ post.price }}<span>руб</span></div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
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
