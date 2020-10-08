<template>
  <div class="componente-slider mx-auto">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in getBannersPaginated" :key="item.id">
        <img :src="item.image.url" alt="" class="banner" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { getBannersPaginated } from '~/business/services/dash-service';

export default {
  data: () => ({
    swiperOption: {
      pagination: {
        el: ".swiper-pagination"
      }
    },
    getBannersPaginated: {}
  }),
  components: {
    Swiper,
    SwiperSlide
  },
  async mounted() {
    try {
      this.getBannersPaginated = await getBannersPaginated(this.$apollo, {
        page: 1,
        pageRows: 3,
        active: true
      });
    } catch (e) {}
  }
};
</script>

<style scoped>
/* componente slider */
.componente-slider {
  margin-top: -2em;
}
.swiper-container {
  border-radius: 5px;
}
.swiper-slide {
  height: 320px;
}
.banner {
  height: 115%;
}
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: #fff;
  opacity: 0.5;
}
.swiper-pagination {
  text-align: right;
  padding-right: 10px !important;
}
.swiper-pagination-bullet-active {
  background: #fff;
  opacity: 1;
  margin: 0 10px !important;
}
.swiper-pagination-bullet-active::after {
  content: "";
  background: rgba(255, 255, 255, 0.5);
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 10px;
  position: relative;
  z-index: -1;
  top: -5px;
  left: -5px;
}
</style>
