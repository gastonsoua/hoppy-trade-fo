export default async function ({ $auth }) {
    if ($auth.loggedIn) {
        try {
            await $auth.refreshTokens();
        } catch (err) {
            console.log('global.js: ', err);
        }
    }
}
