<template>
    <div class="componente-colab py-5 px-4">
        <h3 class="titulo-componente text-left mb-4">Colab</h3>
        <b-row>
            <!-- <b-col cols="4" class=""> -->
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide>
                         <b-card title="MMMV" img-src="https://placeimg.com/200/94/any?2" img-alt="Image" img-top tag="article" class="colab-card text-center">
                            <b-card-text>
                                3.000.000
                                <br>
                                <small>Inscritos</small>
                            </b-card-text>
                            <b-button href="#" variant="primary">Convidar</b-button>
                        </b-card>
                    </swiper-slide>
                    <swiper-slide>
                         <b-card title="MMMV" img-src="https://placeimg.com/200/94/any?2" img-alt="Image" img-top tag="article" class="colab-card text-center">
                            <b-card-text>
                                3.000.000
                                <br>
                                <small>Inscritos</small>
                            </b-card-text>
                            <b-button href="#" variant="primary">Convidar</b-button>
                        </b-card>
                    </swiper-slide>
                    <swiper-slide>
                         <b-card title="MMMV" img-src="https://placeimg.com/200/94/any?2" img-alt="Image" img-top tag="article" class="colab-card text-center">
                            <b-card-text>
                                3.000.000
                                <br>
                                <small>Inscritos</small>
                            </b-card-text>
                            <b-button href="#" variant="primary">Convidar</b-button>
                        </b-card>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
               
            <!-- </b-col> -->
        </b-row>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import gql from 'graphql-tag'

export default {
    data() {
      return {
        swiperOption: {
            slidesPerView: 3,
            spaceBetween: 30
        }
      }
    },
    components: {
        Swiper,
        SwiperSlide
    }
}
</script>

<style scoped>
    /* componente colab */
    .card {
        border: none;
        background-color: transparent;
        width: 150px !important;
        margin: 0;
    }
    .swiper-slide {
        width: 150px !important;
    }
    .card-img, .card-img-top {
        border-radius: 20px 20px 0 0;
    }
    h4.card-title {
        font-family: 'nunitoregular';
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        color: #333332;
        margin-bottom: 0;
    }
    p.card-text {
        font-family: 'nunitoregular';
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
        color: #333332;
    }
    .btn-primary {
        font-family: 'nunitoregular';
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #FFFFFF;
        background: linear-gradient(90deg, #872F7F 0%, #701668 100%);
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        border: none;
    }
    .card-body {
        background: #F6F7FA;
        border-radius: 0 0 20px 20px;
    }
</style>
