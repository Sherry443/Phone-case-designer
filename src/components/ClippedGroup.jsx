import React from 'react';
import { Group } from 'react-konva';

const ClippedGroup = ({ children }) => {
  return (
    <Group
      clipFunc={(ctx) => {
        // Custom clipping area — match this with your mask shape
        ctx.rect(0, 0, 500, 500); // or your actual mask shape
      }}
    >
      {children}
    </Group>
  );
};

export default ClippedGroup;
