import userSocialNetworks from './userSocialNetworks.gql';
import getAllOAuthUrl from './getAllOAuthUrl.gql';
import { createTagUser, deleteTagUser } from './Tags';
import {
  getFacebookOAuthUrl,
  authenticateAndCreateUserFacebookPages,
  updateUserFacebookPagesData,
  deleteUserFacebookPage
} from './Facebook';

import {
  getInstagramOAuthUrl,
  authenticateAndCreateUserInstagramPages,
  updateUserInstagramPagesData,
  deleteUserInstagramPage
} from './Instagram';

import {
  getYoutubeOAuthUrl,
  authenticateAndCreateUserYoutubeChannels,
  updateUserYoutubeChannelsData,
  deleteUserYoutubeChannel
} from './Youtube';

import {
  getTwitterOAuthUrl,
  authenticateAndCreateUserTwitter,
  updateUserTwitterPagesData,
  deleteUserTwitterPage
} from './Twitter';

export {
  userSocialNetworks,
  createTagUser,
  deleteTagUser,
  getFacebookOAuthUrl,
  authenticateAndCreateUserFacebookPages,
  updateUserFacebookPagesData,
  deleteUserFacebookPage,
  // Instagram
  getInstagramOAuthUrl,
  authenticateAndCreateUserInstagramPages,
  updateUserInstagramPagesData,
  deleteUserInstagramPage,
  // Youtube
  getYoutubeOAuthUrl,
  authenticateAndCreateUserYoutubeChannels,
  updateUserYoutubeChannelsData,
  deleteUserYoutubeChannel,
  // Twitter
  getTwitterOAuthUrl,
  authenticateAndCreateUserTwitter,
  updateUserTwitterPagesData,
  deleteUserTwitterPage,
  getAllOAuthUrl
};
