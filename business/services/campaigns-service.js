import { getQuery, setQuery } from './utils';

export const getInfluencerCampaignsPaginated = async (apollo, input) => {
  return (
    await getQuery(apollo, 'Campaigns/getInfluencerCampaignsPaginated', input)
  ).data;
};

export const associateInfluencerToCampaign = async (apollo, input) => {
  try {
    await setQuery(apollo, 'Campaigns/associateInfluencerToCampaign', input);
  } catch (error) {
    throw new Error(`${error}.
    Nome: ${influencer.name}`);
  }
};

export const createInfluencerAttachmentInCampaign = async (apollo, input) => {
  await setQuery(
    apollo,
    'Campaigns/createInfluencerAttachmentInCampaign',
    input
  );
};

export const updateInfluencerDeliveryFromBacklogToValidation = async (
  apollo,
  input
) => {
  await setQuery(
    apollo,
    'Campaigns/updateInfluencerDeliveryFromBacklogToValidation',
    input
  );
};