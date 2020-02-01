import React, { useState } from 'react';

import './DraggableArea.scss';

const DraggableArea = (props) => {
  const MAX_HEIGHT = 240;
  const [slideHeight, setSlideHeight] = useState(42);

  const handleTouchStart = (e) => {
    e.persist();
    const body = e.nativeEvent.path.find(el => el.localName === 'body');
    const dateArea = e.nativeEvent.path.find(el => el.id === 'dateArea');
    if (dateArea.style) {
      dateArea.style.transition = "none";
    }
    if (body.style && body.style.overflowY !== 'hidden') {
      body.style.overflowY = 'hidden';
    }
  }

  const handleTouchMove = (e) => {
    e.persist();
    if (e.nativeEvent && e.nativeEvent.touches[0].pageY > 42 && e.nativeEvent.touches[0].pageY < 240) {
      setSlideHeight(() => e.nativeEvent.touches[0].pageY);
    }
  }

  const handleTouchEnd = (e) => {
    e.persist();
    const body = e.nativeEvent.path.find(el => el.localName === 'body');
    const dateArea = e.nativeEvent.path.find(el => el.id === 'dateArea');
    if (dateArea.style) {
      dateArea.style.transition = "all 0.2s ease";
    }
    if (body.style && body.style.overflowY === 'hidden') {
      body.style.overflowY = 'scroll';
    }
    if (slideHeight >= 150) {
      setSlideHeight(() => MAX_HEIGHT);
    } else if (slideHeight < 150) {
      setSlideHeight(() => 42);
    }
  }

  const handleClick = (e) => {
    e.persist();
    const dateArea = e.nativeEvent.path.find(el => el.id === 'dateArea');
    if (dateArea.style) {
      dateArea.style.transition = "all 0.2s ease";
      if (slideHeight === 42) {
        setSlideHeight(() => MAX_HEIGHT);
      } else if (slideHeight === MAX_HEIGHT) {
        setSlideHeight(() => 42);;
      }
    }
  }

  return (
    <div
      className='draggable-area'
      id="dateArea"
      style={{ height: slideHeight + 'px' }}
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e) => handleTouchMove(e)}
      onTouchEnd={(e) => handleTouchEnd(e)}
    >
      <div
        className="head"
        onClick={(e) => handleClick(e)}
        style={{
          borderBottom: `1px solid rgba(208, 208, 208, ${(slideHeight - 75) / (MAX_HEIGHT - 75)})`
        }}
      >
        {props.head}
      </div>
      <div
        className={`hidden-body ${slideHeight > 75 && 'isShowing'}`}
        style={{
          opacity: (slideHeight - 75) / (MAX_HEIGHT - 75)
        }}
      >
        {props.body}
      </div>
      <div className="down" />
    </div>
  );
}

export default DraggableArea;
