// import React, { useRef, useState, useEffect } from "react";
// import useImage from "use-image";
// import CanvasStage from "./components/CanvasStage";
// import maskSrc from "./assets/simple.png";
// import starIcon from "./assets/star.png";
// import "./app.css";

// function App() {
//   const [images, setImages] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [maskImage] = useImage(maskSrc);
//   const [stickers, setStickers] = useState([]);
//   const [texts, setTexts] = useState([]);
//   const [bgColor, setBgColor] = useState("#171717ff");
//   const [scale, setScale] = useState(1);

//   const fileInputRef = useRef(null);
//   const stageRef = useRef(null);
//   const transformerRef = useRef(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const img = new window.Image();
//       img.src = event.target.result;
//       img.onload = () => {
//         setImages((prev) => [
//           ...prev,
//           {
//             id: Date.now(),
//             image: img,
//             x: 50,
//             y: 50,
//             scaleX: 1,
//             scaleY: 1,
//           },
//         ]);
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   const addText = () => {
//     setTexts([
//       ...texts,
//       {
//         id: Date.now(),
//         text: "Edit me",
//         x: 200,
//         y: 200,
//         fontFamily: "Arial",
//         fill: "#000000",
//       },
//     ]);
//   };

//   const addSticker = () => {
//     const img = new window.Image();
//     img.src = starIcon;
//     img.onload = () =>
//       setStickers([
//         ...stickers,
//         { id: Date.now(), image: img, x: 100, y: 100 },
//       ]);
//   };

//   const downloadImage = () => {
//     const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
//     const link = document.createElement("a");
//     link.download = "masked-image.png";
//     link.href = uri;
//     link.click();
//   };

// const handleStageClick = (e) => {
//   const clickedId = e.target.id();

//   const isImage = images.some((img) => img.id.toString() === clickedId);
//   const isText = texts.some((txt) => txt.id.toString() === clickedId);
//   const isSticker = stickers.some((stk) => stk.id.toString() === clickedId);

//   if (isImage || isText || isSticker) {
//     setSelectedId(clickedId);
//   }
// };


//   useEffect(() => {
//     if (transformerRef.current && selectedId) {
//       const selectedNode = stageRef.current.findOne(`#${selectedId}`);
//       if (selectedNode) {
//         transformerRef.current.nodes([selectedNode]);
//         transformerRef.current.getLayer().batchDraw();
//       }
//     } else {
//       transformerRef.current.nodes([]);
//     }
//   }, [selectedId, images, texts, stickers]);

//   return (
//     <div className="app-layout">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>Controls</h2>
     
// <label className="custom-upload" htmlFor="fileInput">
//   Upload Image
// </label>
// <input
//   id="fileInput"
//   type="file"
//   accept="image/*"
//   ref={fileInputRef}
//   onChange={handleFileChange}
//   className="hidden-input"
// />
     
//         <button onClick={addText}>Add Text</button>
//         <div className="base"> 
//         <label>Base Color:</label>
//         <input
//           type="color"
//           value={bgColor}
//           onChange={(e) => setBgColor(e.target.value)}
//         />
//         </div>
//          <button onClick={downloadImage}>Download</button>
//         {selectedId && texts.find((t) => t.id.toString() === selectedId) && (
//           <div className="text-controls">
//             <select
//               onChange={(e) => {
//                 const updated = texts.map((t) =>
//                   t.id.toString() === selectedId
//                     ? { ...t, fontFamily: e.target.value }
//                     : t
//                 );
//                 setTexts(updated);
//               }}
//             >
//              <option value="Arial">Arial</option>
//   <option value="Courier New">Courier New</option>
//   <option value="Georgia">Georgia</option>
//   <option value="Comic Sans MS">Comic Sans MS</option>
//   <option value="Times New Roman">Times New Roman</option>
//   <option value="Verdana">Verdana</option>
//   <option value="Tahoma">Tahoma</option>
//   <option value="Trebuchet MS">Trebuchet MS</option>
//   <option value="Impact">Impact</option>
//   <option value="Lucida Console">Lucida Console</option>
//   <option value="Palatino Linotype">Palatino Linotype</option>
//   <option value="Segoe UI">Segoe UI</option>
//   <option value="Garamond">Garamond</option>
//   <option value="Brush Script MT">Brush Script MT (Italic)</option>
//   <option value="Courier New Bold">Courier New (Bold)</option>
//   <option value="Georgia Italic">Georgia (Italic)</option>
//   <option value="Arial Black">Arial Black (Bold)</option>
//   <option value="Times New Roman Italic">Times New Roman (Italic)</option>
//   <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
//   <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
//             </select>

//             <input
//               type="color"
//               onChange={(e) => {
//                 const updated = texts.map((t) =>
//                   t.id.toString() === selectedId
//                     ? { ...t, fill: e.target.value }
//                     : t
//                 );
//                 setTexts(updated);
//               }}
//             />
//           </div>
//         )}
//       </aside>

//       {/* Main Canvas Area */}
//       <main className="canvas-area">
//         <CanvasStage
//           {...{
//             stageRef,
//             transformerRef,
//             selectedId,
//             handleStageClick,
//             images,
//             setImages,
//             texts,
//             setTexts,
//             stickers,
//             setStickers,
//             maskImage,
//             bgColor,
//             scale,
//             setSelectedId,
//           }}
//         />
//       </main>
//     </div>
//   );
// }

// export default App;

import React, { useState, useRef } from 'react';
import CanvasStage from './components/CanvasStage';
import Sidebar from './components/Sidebar';
import './app.css';

function App() {
  const [images, setImages] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [texts, setTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [bgColor, setBgColor] = useState('#2a2929ff');
  const [scale, setScale] = useState(1);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        setImages((prev) => [
          ...prev,
          { id: Date.now(), image: img, x: 50, y: 50, scaleX: 1, scaleY: 1 },
        ]);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="app-wrapper">
      <div className="sidebar-wrapper">
        <Sidebar
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          setTexts={setTexts}
          setStickers={setStickers}
          bgColor={bgColor}
          setBgColor={setBgColor}
          scale={scale}
          setScale={setScale}
          selectedId={selectedId}
          texts={texts}
        />
      </div>
      <div className="canvas-wrapper">
        <CanvasStage
          images={images}
          setImages={setImages}
          stickers={stickers}
          setStickers={setStickers}
          texts={texts}
          setTexts={setTexts}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          bgColor={bgColor}
          scale={scale}
        />
      </div>
    </div>
  );
}

export default App;
