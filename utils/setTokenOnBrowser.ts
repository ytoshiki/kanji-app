export const setTokenOnBrowser = (token: string) => {
  localStorage.setItem("kanji-gql-token", token);
}