// import React from 'react';
// import { Image as KonvaImage } from 'react-konva';

// const MaskLayer = ({ maskImage }) => {
//   return (
//     maskImage && (
//       <KonvaImage
//         image={maskImage}
//         width={600}
//         height={600}
//         globalCompositeOperation="destination-in"
//         listening={false}
//       />
//     )
//   );
// };

// export default MaskLayer;


import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import maskSrc from '../assets/simple.png';

const MaskLayer = () => {
  const [maskImage] = useImage(maskSrc);

  return maskImage ? (
    <KonvaImage
      image={maskImage}
      width={600}
      height={600}
      globalCompositeOperation="destination-in"
      listening={false}
    />
  ) : null;
};

export default MaskLayer;
