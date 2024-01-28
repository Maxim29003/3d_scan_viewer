import { useLoader } from "@react-three/fiber";
import React, { useMemo } from "react";
import * as THREE from "three";

const Points = ({color, count}) => {
    const pointTexture = useLoader(THREE.TextureLoader, "/circle.png");
    
    let positions = useMemo(() => {
      let positions = [];
      for (let i = 0; i < count; i++) {
        let x = (Math.random() - 0.5) * 200; 
        let z = (Math.random() - 0.5) * 200;
        let y = (Math.random() - 0.5) * 200;
        positions.push(x, y, z);
      }
      return new Float32Array(positions);
    }, [count]);
  
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  
    return (
      <points>
        <primitive object={new THREE.Points(geometry)}>
          <pointsMaterial
            color={color}
            size={1}
            map={pointTexture}
            sizeAttenuation
            transparent={false}
            alphaTest={0.5}
            opacity={1.0}
          />
        </primitive>
      </points>
    );
  };

  export default Points