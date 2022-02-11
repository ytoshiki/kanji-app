import React from 'react';
import Image from 'next/image';
import Logo from "../public/logo.svg";


const MainVisual = () => {
  return (
    <div>
      <div>
        <Image
          src={Logo}
          alt="Picture of the author"
        />
      </div>
    </div>
  )
}

export default MainVisual
