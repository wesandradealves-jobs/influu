import { getQuery, setQuery, subscribeQuery } from './utils';
import moment from 'moment';

export const getBannersPaginated = async (apollo, input) => {
  return (await getQuery(apollo, 'Dash/getBannersPaginated', input)).data;
};

export const myNotificationsPaginated = async (apollo, input) => {
  return (
    await getQuery(apollo, 'Notificacoes/myNotificationsPaginated', input)
  ).data.filter(v => !v.deletedAt);
};

export const removeNotification = async (apollo, id) => {
  return (await setQuery(apollo, 'Notificacoes/removeNotification', {
    notificationId: +id
  })).data;
};

export const countMyNotificationsNotRead = (apollo) => {
  return getQuery(apollo, 'Notificacoes/countMyNotificationsNotRead');
};

export const getMyWalletBallance = (apollo) => {
  return getQuery(apollo, 'Dash/getMyWalletBallance');
};

export const getCampaignsPaginated = async (apollo, input) => {
  return (await getQuery(apollo, 'Dash/getCampaignsPaginated', input)).data;
};

export const getUserChatChannelsPaginated = async (apollo, input) => {
  let chats = (
    await getQuery(apollo, 'Dash/getUserChatChannelsPaginated', input)
  ).data;
  return chats.map(v => ({
    ...v,
    createdAt: moment(v.lastChatChannelMessage.createdAt)
      .format('DD/MM/YY - MM:SS')
  }));
};

export const getName = async (apollo) => {
  return (await getQuery(apollo, 'Dash/getName', null, 'me')).name.split(' ')[0];
};

export const getUserId = async (apollo) => {
  return (await getQuery(apollo, 'Dash/getName', null, 'me')).id;
};

export const subscribeToChatChannel = (apollo, chatChannelId) => {
  return (subscribeQuery(apollo, 'Dash/subscribeToChatChannelMessages', { chatChannelId }));
};

