<template>
  <div class="componente-chat pt-5 pb-3 px-4">
    <h3 class="titulo-componente text-left pb-2">Chat</h3>
    <b-alert variant="dark" show v-for="chat in chats" :key="chat.id">
      <div class="row chamada">
        <div class="thumbnail col-2">
          <img
            v-if="chat.author.avatar"
            :src="chat.author.avatar"
            alt="Imagem de perfil"
          />
          <img
            v-else
            src="https://influu-nodejs.s3.amazonaws.com/stage/images/20200702-mazlo6-avatar-png"
            alt="Imagem de perfil"
          />
        </div>
        <div class="chamada-texto col-10">
          <span class="time">{{ chat.createdAt }}</span>
          <h4 class="">{{ chat.author.name }}</h4>
          <p>
            {{ chat.lastChatChannelMessage.content }}
          </p>
        </div>
      </div>
    </b-alert>
  </div>
</template>

<script>
import {
  getUserChatChannelsPaginated,
  getUserId
} from '~/business/services/dash-service';

export default {
  data: () => ({
    chats: {}
  }),
  async mounted() {
    try {
      const userId = await getUserId(this.$apollo);
      this.chats = await getUserChatChannelsPaginated(this.$apollo, {
        page: 1,
        pageRows: 3,
        userId
      });
    } catch (e) {}
  }
};
</script>

<style scoped>
/* componente slider */
.alert {
  background:none;
  border: none;
  box-shadow: none;
  border-radius: 4px;
  font-family: 'nunitoregular';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
  /* margin-bottom: 0; */
}
.thumbnail img {
  border-radius: 4px;
  width: 50px;
  height: 50px;
  position: relative;
  left: -19px;
}
.chamada-texto {
  position: relative;
  left: -10px;
}
.chamada-texto h4 {
  font-family: 'nunitoregular';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #302F4F;
}
.chamada-texto p {
  font-family: 'nunitoregular';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #555555;
}
.time {
  float: right;
  font-family: 'nunitoregular';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #999999;
}
</style>
