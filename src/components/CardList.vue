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
