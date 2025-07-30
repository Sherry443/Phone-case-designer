// import React, { useEffect } from 'react';
// import { Image as KonvaImage } from 'react-konva';

// const UploadedImages = ({ images, setImages, selectedId, setSelectedId }) => {
//   // 🧠 Delete selected image on Backspace/Delete
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
//         setImages((prevImages) => prevImages.filter((img) => img.id.toString() !== selectedId));
//         setSelectedId(null);
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedId, setImages, setSelectedId]);

//   return images.map((imgObj) => (
//     <KonvaImage
//       key={imgObj.id}
//       id={imgObj.id.toString()}
//       image={imgObj.image}
//       x={imgObj.x}
//       y={imgObj.y}
//       scaleX={imgObj.scaleX}
//       scaleY={imgObj.scaleY}
//       draggable
//       onClick={() => setSelectedId(imgObj.id.toString())}
//       onTap={() => setSelectedId(imgObj.id.toString())}
//       onDragEnd={(e) => {
//         const newImages = images.map((i) =>
//           i.id === imgObj.id ? { ...i, x: e.target.x(), y: e.target.y() } : i
//         );
//         setImages(newImages);
//       }}
//       onTransformEnd={(e) => {
//         const node = e.target;
//         const newImages = images.map((i) =>
//           i.id === imgObj.id
//             ? {
//                 ...i,
//                 x: node.x(),
//                 y: node.y(),
//                 scaleX: node.scaleX(),
//                 scaleY: node.scaleY(),
//               }
//             : i
//         );
//         setImages(newImages);
//       }}
//     />
//   ));
// };

// export default UploadedImages;


import React from 'react';
import { Image as KonvaImage } from 'react-konva';

const UploadedImages = ({ images, setImages, setSelectedId }) => {
  const handleTransformEnd = (e, imgObj) => {
    const node = e.target;
    const updated = images.map((i) =>
      i.id === imgObj.id ? {
        ...i, x: node.x(), y: node.y(),
        scaleX: node.scaleX(), scaleY: node.scaleY()
      } : i
    );
    setImages(updated);
  };

  const handleDragEnd = (e, imgObj) => {
    const updated = images.map((i) =>
      i.id === imgObj.id ? { ...i, x: e.target.x(), y: e.target.y() } : i
    );
    setImages(updated);
  };

  return images.map(imgObj => (
    <KonvaImage
      key={imgObj.id}
      id={imgObj.id.toString()}
      image={imgObj.image}
      x={imgObj.x}
      y={imgObj.y}
      scaleX={imgObj.scaleX}
      scaleY={imgObj.scaleY}
      draggable
      onClick={() => setSelectedId(imgObj.id.toString())}
      onTap={() => setSelectedId(imgObj.id.toString())}
      onDragEnd={(e) => handleDragEnd(e, imgObj)}
      onTransformEnd={(e) => handleTransformEnd(e, imgObj)}
    />
  ));
};

export default UploadedImages;
