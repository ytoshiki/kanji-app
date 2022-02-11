import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'


interface SearchResult {
  kanji: {
    character: string,
    stroke: number
  },
  radical: {
    character: string,
    stroke: number,
    order: number
  }
}

interface Props {
  result: SearchResult[] | null;
  keyword: string;
}

const Search: React.FC<Props> = ({result, keyword}) => {
  
  const router = useRouter();

  const clickHandler = (keyword: string) => {
    router.push({
      pathname: `/kanji/${keyword}`,
      query: {keyword :keyword} 
    })
  }
  return (
    <div>
      <h1>{keyword}</h1>
      <div>
        <ul>
        {
          result?.map(data => (
            <li key={data.kanji.character} >
              <div>
                <div>
                {data.kanji.character}
                </div>
                <div>
              </div>
                <div>
                  <span>
                    Stroke:
                  </span>
                  <span>
                  {data.kanji.stroke}
                    </span>
                  </div>
              </div>
              <button onClick={() => clickHandler(data.kanji.character)}>Learn More</button>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {

  const keyword = context.query.keyword;

  const requestEndPoint = encodeURI(`${process.env.KANJI_API_ROUTE}search/${keyword}`);

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

export default Search
