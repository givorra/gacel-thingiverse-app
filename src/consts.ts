/* Thingiverse Oauth Variables */
export const THINGIVERSE_OAUTH_URL: string = "https://www.thingiverse.com/login/oauth";
export const THINGIVERSE_OAUTH_AUTHORIZE_URL: string = `${THINGIVERSE_OAUTH_URL}/authorize`;
export const THINGIVERSE_OAUTH_ACCESS_TOKEN_URL: string = `${THINGIVERSE_OAUTH_URL}/access_token`;
export const THINGIVERSE_OAUTH_VALIDATE_TOKEN_URL: string = `${THINGIVERSE_OAUTH_URL}/tokeninfo`;

/* Thingiverse API */
export const THINGIVERSE_API_URL: string = "https://api.thingiverse.com";
export const THINGIVERSE_API_SEARCH_URL: string = `${THINGIVERSE_API_URL}/search`;
export const THINGIVERSE_API_THINGS_URL: string = `${THINGIVERSE_API_URL}/things`;
export const THINGIVERSE_API_THING_LIKE_URL: string = `${THINGIVERSE_API_THINGS_URL}/:id/likes`;
