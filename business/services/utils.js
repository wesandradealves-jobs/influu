import queries from '../graphql';

export const setQuery = async (apollo, queryName, input = {}) => {
  const path = queryName.split('/');
  apollo.vm.loading = true;
  try {
    const data = (await apollo.mutate({
      mutation: queries[path[0]][path[1]],
      variables: {
        input
      }
    })).data[path[1]];
    return data;
  } catch (error) {
    handleError(apollo, error);
  } finally {
    apollo.vm.loading = false;
  }
};

export const getQuery = async (
  apollo,
  queryName,
  input = {},
  altQuery = null
) => {
  const path = queryName.split('/');
  let refreshCache = false;
  apollo.vm.loading = true;
  if (!!input && input.refreshCache) {
    refreshCache = true;
    delete input.refreshCache;
  }
  try {
    const data = (await apollo.query({
      query: queries[path[0]][path[1]],
      variables: {
        input
      },
      fetchPolicy: refreshCache ? "network-only" : "cache-first"
    })).data[altQuery || path[1]];
    return data;
  } catch (error) {
    handleError(apollo, error);
  } finally {
    // apollo.vm.loading = false;
  }
};

const onExpiredLogin = (apollo) => {
  makeToast(apollo.vm, "danger", "Seu login expirou, por favor, digite seus dados novamente!");
  return setTimeout(() => {
    apollo.vm.$apolloHelpers.onLogout();
    apollo.vm.$router.push(apollo.vm.localePath('/login'));
  }, 2000);
};

export const makeToast = (app, variant, texto) => {
  app.$bvToast.toast(texto, {
    variant: variant,
    solid: true,
    toaster: "b-toaster-top-center",
    noCloseButton: true,
    toastClass: "text-center"
  });
};

export const subscribeQuery = (
  apollo,
  queryName,
  input = {}
) => {
  const path = queryName.split('/');

  try {
    const observer = (apollo.subscribe({
      query: queries[path[0]][path[1]],
      variables: {
        input
      }
    }));

    return observer;
  } catch (error) {
    handleError(apollo, error);
  }
};

const handleError = (apollo, error) => {
  let errorMessage = error.message.replace('GraphQL error: ', '');
  if (
    errorMessage === 'jwt expired' ||
    errorMessage === 'invalid token'
  ) {
    return onExpiredLogin(apollo);
  } else {
    if (errorMessage.includes(
      'duplicate key value violates unique constraint'
    )) {
      errorMessage = 'Conta já cadastrada por outro usuário!';
    } else if (errorMessage.includes('Network error')) {
      errorMessage = 'Problemas na conexão, tente mais tarde.'
    }
    makeToast(apollo.vm, 'danger', errorMessage);
    console.log(error);
    throw (error);
  }
};
