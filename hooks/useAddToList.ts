import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

interface KanjiCreatePayload {
  kanjiCreate: {
    kanji: {
      character: string;
    };
    kanjiErrors: { message: string }[];
  };
}

export const KANJI_CREATE = gql`
  mutation KanjiCreate($character: String!) {
    kanjiCreate(input: { character: $character }) {
      kanji {
        character
      }
      kanjiErrors {
        message
      }
    }
  }
`;

export default () => {
  return useMutation<KanjiCreatePayload>(KANJI_CREATE);
};
