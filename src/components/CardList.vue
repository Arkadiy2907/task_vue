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

<style lang="scss" scoped>
$green: rgb(0, 128, 128);
$white: rgb(255, 255, 255);

.wrap_card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  .card {
    position: relative;
    overflow: hidden;
    background: none;
    cursor: pointer;
    width: 21rem;
    height: 21rem;
    max-width: 21rem;
    max-height: 21rem;
    padding: 0;
    text-align: center;
    border-radius: 0.3rem;
    transition: 0.7s ease-in-out;

    .card_name {
      line-height: 1.7rem;
      font-size: 1.1rem;
    }

    .card__overlay {
      position: absolute;
      bottom: 0;
      left: 4%;
      right: 4%;
      padding: 2%;
      z-index: 1;
      text-align: left;
      background-color: rgb(0, 128, 128, 0.7);
      transform: translateY(100%);
      transition: all 0.7s ease-in-out;
      border-radius: 0.3rem;
      color: $white;
    }

    &:hover {
      border-radius: 0;
      box-shadow: 0 0 0.5rem 0.4rem rgba(0, 128, 128, 0.29);
      .card__overlay {
        transform: translateY(0);
      }
    }

    .pic {
      border-radius: 0.3rem;
      transition: all 0.5s ease-in-out;
      object-fit: cover;
      height: 100%;
      width: 100%;

      &:hover {
        transform: scale(1.009);
        border-radius: 0;
      }
    }
  }

  .selected {
    border: 2px solid red;
  }
}
</style>
