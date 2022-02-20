import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

interface KanjiDeletePayload {
  kanjiDelete: {
    kanji: {
      character: string;
    };
    kanjiErrors: { message: string }[];
  };
}

export const KANJI_DELETE = gql`
  mutation KanjiDelete($character: String!) {
    kanjiDelete(input: { character: $character }) {
      kanjiErrors {
        message
      }
      kanji {
        character
      }
    }
  }
`;

export default () => {
  return useMutation<KanjiDeletePayload>(KANJI_DELETE);
};
