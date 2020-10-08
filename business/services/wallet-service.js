import { getQuery, setQuery } from './utils';

export const getMyWalletFinancialStatement = async (apollo) => {
  const { credits, debits } = await getQuery(apollo, 'Dash/getMyWalletFinancialStatement');

  // Unindo créditos e débitos em apenas uma lista e ordenando por criação decrescente
  const financialStatement = [...credits, ...debits]

  return financialStatement.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}; 

export const updateInfluencerCampaignInvoice = async (apollo, input) => {
  return setQuery(apollo, 'Dash/updateInfluencerCampaignInvoice', {
    campaignInfluencerId: input.campaignInfluencerId,
    invoice: input.invoice
  });
};