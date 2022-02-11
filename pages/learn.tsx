import Link from 'next/link';
import React from 'react'
import GradeSelect from '../components/GradeSelect';

interface Props {

}

const Learn: React.FC<Props> = ({}) => {



  return (
    <div>
      <div>
        <div>Select your kanji grade!</div>
        <GradeSelect />
      </div>
    </div>
  )
}

export default Learn
