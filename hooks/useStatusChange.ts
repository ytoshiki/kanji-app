import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

interface KanjiStatusChangePayload {
  kanjiStatusUpdate: {
    kanji: {
      character: string;
    };
    kanjiErrors: { message: string }[];
  };
}

export const KANJI_STATUS_UPDATE = gql`
  mutation kanjiStatusUpdate($character: String!, $status: String!) {
    kanjiStatusUpdate(input: { character: $character, status: $status }) {
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
  return useMutation<KanjiStatusChangePayload>(KANJI_STATUS_UPDATE);
};
