// // File: components/CanvasStage.js
// import React from 'react';
// import { Stage, Layer, Rect, Transformer } from 'react-konva';
// import UploadedImages from './UploadedImages';
// import MaskLayer from './MaskLayer';
// import TextLayer from './TextLayer';
// import StickersLayer from './StickersLayer';

// const CanvasStage = ({
//   stageRef,
//   transformerRef,
//   selectedId,
//   handleStageClick,
//   images,
//   setImages,
//   texts,
//   setTexts,
//   stickers,
//   setStickers,
//   maskImage,
//   bgColor,
//   scale,
//   setSelectedId,
// }) => {
//   return (
//     <Stage
//       width={600}
//       height={600}
//       ref={stageRef}
//       scaleX={scale}
//       scaleY={scale}
//       style={{ border: '2px solid black', marginTop: '20px' }}
//       onMouseDown={handleStageClick}
//     >
//       <Layer>
//         <Rect width={600} height={600} fill={bgColor} />
//         <UploadedImages {...{ images, setImages, selectedId, setSelectedId }} />
//         <MaskLayer maskImage={maskImage} />
//         <TextLayer {...{ texts, setTexts, setSelectedId }} />
//         <StickersLayer {...{ stickers, setStickers, setSelectedId }} />
//         <Transformer
//           ref={transformerRef}
//           boundBoxFunc={(oldBox, newBox) => newBox}
//           rotateEnabled={false}
//         />
//       </Layer>
//     </Stage>
//   );
// };

// export default CanvasStage;


import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import MaskLayer from './MaskLayer';
import UploadedImages from './UploadedImages';
import StickersLayer from './StickersLayer';
import TextLayer from './TextLayer';

const CanvasStage = ({
  images, setImages, stickers, setStickers, texts, setTexts,
  selectedId, setSelectedId, bgColor, scale
}) => {
  const stageRef = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    if (transformerRef.current && selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else {
      transformerRef.current.nodes([]);
    }
  }, [selectedId, images, texts, stickers]);

useEffect(() => {
  const handleKeyDown = (e) => {
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
      setImages((prev) => prev.filter(img => img.id.toString() !== selectedId));
      setTexts((prev) => prev.filter(txt => txt.id.toString() !== selectedId));
      setStickers((prev) => prev.filter(stk => stk.id.toString() !== selectedId));
      setSelectedId(null);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedId]);


  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  return (
    <div className="canvas-container">
    <Stage
      width={600}
      height={600}
      scaleX={scale}
      scaleY={scale}
      ref={stageRef}
      style={{ border: '2px solid black', marginTop: '20px' }}
      onMouseDown={handleStageClick}
    >
      <Layer>
        <Rect width={600} height={600} fill={bgColor} />
        <UploadedImages
          images={images}
          setImages={setImages}
          setSelectedId={setSelectedId}
        />
        <MaskLayer />
        <TextLayer
          texts={texts}
          setTexts={setTexts}
          setSelectedId={setSelectedId}
        />
        <StickersLayer
          stickers={stickers}
          setStickers={setStickers}
          setSelectedId={setSelectedId}
        />
        <Transformer ref={transformerRef} rotateEnabled />
      </Layer>
    </Stage>
    </div>
  );
};

export default CanvasStage;
