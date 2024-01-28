import { Center, Text3D } from "@react-three/drei";
import React from "react";

const Text = ({color, text, position, rotation, size}) => {
  return (
      <Center rotation={rotation} position={position}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={size}
          font="/Inter_Bold.json"
        >
          {text}
          <meshBasicMaterial color={color} />
        </Text3D>
      </Center>
  );
};

export default Text