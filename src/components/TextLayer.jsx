// import React, { useEffect, useRef } from 'react';
// import { Text as KonvaText, Transformer } from 'react-konva';

// const TextLayer = ({ texts, setTexts, selectedId, setSelectedId }) => {
//   const transformerRef = useRef();

//   // 🔄 Delete selected text on Backspace/Delete
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
//         setTexts((prevTexts) =>
//           prevTexts.filter((txt) => txt.id.toString() !== selectedId)
//         );
//         setSelectedId(null);
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedId, setTexts, setSelectedId]);

//   // 🔗 Attach Transformer to selected text
//   useEffect(() => {
//     if (transformerRef.current && selectedId) {
//       const stage = transformerRef.current.getStage();
//       const selectedNode = stage.findOne(`#${selectedId}`);
//       if (selectedNode) {
//         transformerRef.current.nodes([selectedNode]);
//         transformerRef.current.getLayer().batchDraw();
//       }
//     }
//   }, [selectedId, texts]);

//   return (
//     <>
//       {texts.map((txt, i) => (
//         <KonvaText
//           key={txt.id}
//           id={txt.id.toString()}
//           text={txt.text}
//           x={txt.x}
//           y={txt.y}
//           rotation={txt.rotation || 0}
//           fontSize={20}
//           fontFamily={txt.fontFamily}
//           fill={txt.fill}
//           draggable
//           onClick={() => setSelectedId(txt.id.toString())}
//           onDblClick={() => {
//             const updated = prompt('Edit text:', txt.text);
//             if (updated !== null) {
//               const newTexts = [...texts];
//               newTexts[i].text = updated;
//               setTexts(newTexts);
//             }
//           }}
//           onDragEnd={(e) => {
//             const newTexts = [...texts];
//             newTexts[i].x = e.target.x();
//             newTexts[i].y = e.target.y();
//             setTexts(newTexts);
//           }}
//           onTransformEnd={(e) => {
//             const node = e.target;
//             const newTexts = [...texts];
//             newTexts[i].x = node.x();
//             newTexts[i].y = node.y();
//             newTexts[i].rotation = node.rotation();
//             setTexts(newTexts);
//           }}
//         />
//       ))}
//       {selectedId && (
//         <Transformer
//           ref={transformerRef}
//           rotateEnabled={true}
//           enabledAnchors={[]}
//           boundBoxFunc={(oldBox, newBox) => newBox} // Allow rotation only
//         />
//       )}
//     </>
//   );
// };

// export default TextLayer;

import React from 'react';
import { Text as KonvaText } from 'react-konva';

const TextLayer = ({ texts, setTexts, setSelectedId }) => {
  const handleTextUpdate = (i, e) => {
    const updated = [...texts];
    updated[i].x = e.target.x();
    updated[i].y = e.target.y();
    setTexts(updated);
  };

  const handleDoubleClick = (txt, i) => {
    const updatedText = prompt('Edit text:', txt.text);
    if (updatedText !== null) {
      const updated = [...texts];
      updated[i].text = updatedText;
      setTexts(updated);
    }
  };

  return texts.map((txt, i) => (
    <KonvaText
      key={txt.id}
      id={txt.id.toString()}
      text={txt.text}
      x={txt.x}
      y={txt.y}
      fontSize={txt.fontSize}
      fill={txt.fill}
      fontFamily={txt.fontFamily}
      fontStyle={txt.fontStyle}
      rotation={txt.rotation}
      draggable
      onClick={() => setSelectedId(txt.id.toString())}
      onDblClick={() => handleDoubleClick(txt, i)}
      onDragEnd={(e) => handleTextUpdate(i, e)}
    />
  ));
};

export default TextLayer;
