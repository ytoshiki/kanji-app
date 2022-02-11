import React from 'react'
import axios from "axios";
import { string } from '../../../../../../Library/Caches/typescript/4.3/node_modules/@types/prop-types';
import Image from "next/image";

interface Example {
  audio: {
    mp3: string;
  }
  japanese: string;
  meaning: {
    english: string;
  }
}

interface Kanji {
  character: string;  
  kunyomi: {romaji: string, hiragana: string}
  meaning: {english: string}
  onyomi: {romaji: string, katakana: string}
  strokes: {count: 8, images: string[]}
  video: {
    mp4: string
  }
}

interface Radical {
  animation: string[];
  character: string;
  image: string;
  meaning: {english: string}
  name: {hiragana: string, romaji: string}
  strokes: number;
}
interface Props {
  result: {
    examples: Example[];
    kanji: Kanji;
    radical: Radical
  } | null;
}
const Kanji: React.FC<Props> = ({result}) => {
  
  if (!result) return <div>...Not Found</div>
  return (
    <div>
      <div>
        <div>
        {
          result.kanji.character
        }
        </div>
        <div>
        <span>音読み</span>
          {
            result.kanji.onyomi.katakana
          }
          {
            result.kanji.onyomi.romaji
          }
        </div>
        <div>
        <span>訓読み</span>
          {
            result.kanji.kunyomi.hiragana
          }
          {
            result.kanji.kunyomi.romaji
          }
        </div>
        <div>
          <span>意味</span>
          {
            result.kanji.meaning.english
          }
          
        </div>
      </div>
      <div>
        <ul>
        {
          result.examples.length && result.examples.map(example => {
            return <li key={example.japanese}>
              {
                example.japanese
              }
              {
                example.meaning.english
              }
              {
                example.audio.mp3
              }
            </li>
          })
        }
           </ul>
      </div>
      <div>
        {
          result.kanji.strokes.count
        }

        <ul>
        {
          result.kanji.strokes.images.map(image => <li key={image}>
              <Image src={image} width="100px" height="100px"/>
            </li>
          )
        }
        </ul>
      </div>
      <div>
        {
          <Image src={result.radical.image} width="100px" height="100px"/>
        }
        {
          result.radical.character
        }
        {
          result.radical.meaning.english
        }
        {
          result.radical.name.hiragana
        }
        {
          result.radical.name.romaji
        }
        {
          result.radical.strokes
        }
        <ul>
        {
          result.radical.animation.map(image => <li key={image}>
            <Image src={image} width="100px" height="100px"/>
          </li>)
        }
        </ul>

      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {

  const keyword = context.query.keyword;

  const requestEndPoint = encodeURI(`${process.env.KANJI_API_ROUTE}kanji/${keyword}`);

  const res = await axios.get(requestEndPoint, {
    headers: {
      'x-rapidapi-host': `${process.env.KANJI_API_HOST}`,
    'x-rapidapi-key': `${process.env.KANJI_API_KEY}`
    }
  });

  const result = await res.data;

  if (result.error) {
    return { props: { result: null, keyword } }
  }

  return { props: { result, keyword } }
}

export default Kanji
