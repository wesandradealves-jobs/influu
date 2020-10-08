export default ({ graphQLErrors, networkError, operation, forward }, {app, redirect}, nuxtContext) => {
    //console.log('Global error handler')
    //console.log(graphQLErrors, networkError, operation, forward)

    const gqlError = graphQLErrors[0].extensions.code

    console.info("gqlError ", gqlError)

    if(gqlError == 'EXPIRED_TOKEN' || gqlError == 'INVALID_TOKEN' || gqlError == 'NO_TOKEN_PROVIDED')
    {
        redirect('/login')
        app.$apolloHelpers.onLogout()
    }
}