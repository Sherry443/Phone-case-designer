import React from 'react';
import starIcon from '../assets/star.png';

const Sidebar = ({
  fileInputRef, handleFileChange, setTexts, setStickers,
  bgColor, setBgColor, scale, setScale,
  selectedId, texts, setTexts: updateTexts
}) => {
  const addText = () => {
    setTexts(prev => [...prev, {
      id: Date.now(),
      text: 'Edit me',
      x: 50, y: 50,
      fontSize: 20,
      fill: '#000000',
      fontFamily: 'Arial',
      fontStyle: 'normal',
      rotation: 0
    }]);
  };

  const addSticker = () => {
    const img = new window.Image();
    img.src = starIcon;
    img.onload = () => setStickers(prev => [...prev, {
      id: Date.now(), image: img, x: 100, y: 100
    }]);
  };

  const downloadImage = () => {
    const stage = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'design.png';
    link.href = stage.toDataURL('image/png');
    link.click();
  };

  const selectedText = texts.find(txt => txt.id.toString() === selectedId);
  const updateSelectedText = (key, value) => {
    updateTexts(texts.map(txt =>
      txt.id.toString() === selectedId ? { ...txt, [key]: value } : txt
    ));
  };

  return (
    <div className="sidebar">
      <h2>Controls</h2>

      <label className="label">Upload Image</label>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />

      <button onClick={addText}>Add Text</button>
      <button onClick={addSticker}>Add Sticker</button>
       <div className="combo">
      <label className="label">Base Color:</label>
      <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
       </div>
      <button onClick={downloadImage}>Download</button>

      {selectedText && (
        <>
          <select value={selectedText.fontFamily} onChange={(e) => updateSelectedText('fontFamily', e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
          </select>
   <div className="combo">
          <label className="label">Text Color:</label>
          <input type="color" value={selectedText.fill} onChange={(e) => updateSelectedText('fill', e.target.value)} />
</div>
          <button onClick={() => updateSelectedText('fontStyle',
            selectedText.fontStyle.includes('bold') ? selectedText.fontStyle.replace('bold', '').trim() : `${selectedText.fontStyle} bold`.trim()
          )}>Bold</button>

          <button onClick={() => updateSelectedText('fontStyle',
            selectedText.fontStyle.includes('italic') ? selectedText.fontStyle.replace('italic', '').trim() : `${selectedText.fontStyle} italic`.trim()
          )}>Italic</button>

     
        </>
      )}
    </div>
  );
};

export default Sidebar;
