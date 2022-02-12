export const getTokenFromBrowser = (): string | null => {
  return localStorage.getItem("kanji-gql-token");
}