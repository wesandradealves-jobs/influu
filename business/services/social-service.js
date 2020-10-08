import { getQuery, setQuery } from './utils';
import queries from '../graphql';

export const createTagUser = async (apollo, input) => {
  return setQuery(apollo, 'Social/createTagUser', {
    name: input
  });
};

export const deleteTagUser = async (apollo, id) => {
  const queryName = 'Social/deleteTagUser';
  const path = queryName.split('/');
  const data = (await apollo.mutate({
    mutation: queries[path[0]][path[1]],
    variables: {
      tagUserId: +id
    }
  })).data[path[1]];
  return data;
};

export const userSocialNetworks = async (apollo, input) => {
  return (await getQuery(apollo, 'Social/userSocialNetworks', input));
};

// Facebook
export const getFacebookOAuthUrl = async (apollo) => {
  return (await getQuery(apollo, 'Social/getFacebookOAuthUrl'));
};

export const authenticateAndCreateUserFacebookPages = async (apollo, input) => {
  return setQuery(apollo, 'Social/authenticateAndCreateUserFacebookPages', input);
};

export const updateUserFacebookPagesData = async (apollo) => {
  return setQuery(apollo, 'Social/updateUserFacebookPagesData', {});
};

export const deleteUserFacebookPage = async (apollo, id) => {
  const queryName = 'Social/deleteUserFacebookPage';
  const path = queryName.split('/');
  const data = (await apollo.mutate({
    mutation: queries[path[0]][path[1]],
    variables: {
      facebookPageId: id
    }
  })).data[path[1]];
  return data;
};

// Instagram
export const getInstagramOAuthUrl = async (apollo) => {
  return (await getQuery(apollo, 'Social/getInstagramOAuthUrl'));
};

export const authenticateAndCreateUserInstagramPages = async (apollo, input) => {
  return setQuery(apollo, 'Social/authenticateAndCreateUserInstagramPages', input);
};

export const updateUserInstagramPagesData = async (apollo) => {
  return setQuery(apollo, 'Social/updateUserInstagramPagesData', {});
};

export const deleteUserInstagramPage = async (apollo, id) => {
  const queryName = 'Social/deleteUserInstagramPage';
  const path = queryName.split('/');
  const data = (await apollo.mutate({
    mutation: queries[path[0]][path[1]],
    variables: {
      instagramPageId: id
    }
  })).data[path[1]];
  return data;
};

// Twitter
export const getTwitterOAuthUrl = async (apollo) => {
  return (await getQuery(apollo, 'Social/getTwitterOAuthUrl'));
};

export const authenticateAndCreateUserTwitter = async (apollo, input) => {
  return setQuery(apollo, 'Social/authenticateAndCreateUserTwitter', input);
};

export const updateUserTwitterPagesData = async (apollo) => {
  return setQuery(apollo, 'Social/updateUserTwitterPagesData', {});
};

export const deleteUserTwitterPage = async (apollo, id) => {
  const queryName = 'Social/deleteUserTwitterPage';
  const path = queryName.split('/');
  const data = (await apollo.mutate({
    mutation: queries[path[0]][path[1]],
    variables: {
      twitterPageId: id
    }
  })).data[path[1]];
  return data;
};

// Youtube
export const getYoutubeOAuthUrl = async (apollo) => {
  return (await getQuery(apollo, 'Social/getYoutubeOAuthUrl'));
};

export const authenticateAndCreateUserYoutubeChannels = async (apollo, input) => {
  return setQuery(apollo, 'Social/authenticateAndCreateUserYoutubeChannels', input);
};

export const updateUserYoutubeChannelsData = async (apollo) => {
  return setQuery(apollo, 'Social/updateUserYoutubeChannelsData', {});
};

export const deleteUserYoutubePage = async (apollo, id) => {
  const queryName = 'Social/deleteUserYoutubeChannel';
  const path = queryName.split('/');
  const data = (await apollo.mutate({
    mutation: queries[path[0]][path[1]],
    variables: {
      youtubeChannelId: id
    }
  })).data[path[1]];
  return data;
};

export const getAllOAuthUrl = async (apollo) => {
  const path = 'Social/getAllOAuthUrl'.split('/');
  const data = Object.values(
    (await apollo.query({
      query: queries[path[0]][path[1]]
    })).data
  );
  return data;
};

export const authCreate = {
  facebook: authenticateAndCreateUserFacebookPages,
  instagram: authenticateAndCreateUserInstagramPages,
  twitter: authenticateAndCreateUserTwitter,
  youtube: authenticateAndCreateUserYoutubeChannels
};

export const authDelete = [
  deleteUserFacebookPage,
  deleteUserInstagramPage,
  deleteUserTwitterPage,
  deleteUserYoutubePage
];
