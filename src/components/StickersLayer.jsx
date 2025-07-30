// import React from 'react';
// import { Image as KonvaImage } from 'react-konva';

// const StickersLayer = ({ stickers, setStickers, setSelectedId }) => {
//   return stickers.map((s, i) => (
//     <KonvaImage
//       key={s.id}
//       id={s.id.toString()}
//       image={s.image}
//       x={s.x}
//       y={s.y}
//       draggable
//       onClick={() => setSelectedId(s.id.toString())}
//       onDragEnd={(e) => {
//         const newStickers = [...stickers];
//         newStickers[i].x = e.target.x();
//         newStickers[i].y = e.target.y();
//         setStickers(newStickers);
//       }}
//     />
//   ));
// };

// export default StickersLayer;


import React from 'react';
import { Image as KonvaImage } from 'react-konva';

const StickersLayer = ({ stickers, setStickers, setSelectedId }) => {
  const handleDragEnd = (e, i) => {
    const updated = [...stickers];
    updated[i].x = e.target.x();
    updated[i].y = e.target.y();
    setStickers(updated);
  };

  return stickers.map((s, i) => (
    <KonvaImage
      key={s.id}
      id={s.id.toString()}
      image={s.image}
      x={s.x}
      y={s.y}
      draggable
      onClick={() => setSelectedId(s.id.toString())}
      onDragEnd={(e) => handleDragEnd(e, i)}
    />
  ));
};

export default StickersLayer;
