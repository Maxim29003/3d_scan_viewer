import { OrbitControls, PointerLockControls, Sky} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import Loader from './Loader'
import {useKeyboard} from '../../../hooks/useKeyboard'

const Controls = ({controlsData, speed}) => {
  const { camera } = useThree()

  useFrame(()=>{
    camera.translateZ(
      (controlsData.moveForward ? -speed : 0) +
        (controlsData.moveBackward ? speed : 0)
    );
    camera.translateX(
      (controlsData.moveRight ? speed : 0) + (controlsData.moveLeft ? -speed : 0))
  })                                    
  return <PointerLockControls selector='#root > div > div.absolute.flex.p-1.px-2.w-full.h-12.justify-sart.items-center.border-b-2.gap-2.border-slate-700 > button:nth-child(2)' controls={controlsData}  />
}



const ViewerCanvas = ({currentRoom, setIsPointCloud, intensity, pointSize, isOrbitControll, isPointControll}) => { 
  const action = useKeyboard()
  return (
    <Canvas>
      <Sky/>
      <ambientLight intensity={intensity}/>
      <Loader url={currentRoom.model_file} setIsPointCloud={setIsPointCloud} pointSize={pointSize}/>
      {isOrbitControll ? <OrbitControls/> : <Controls controlsData={action} speed={0.01} />}
    </Canvas>
  )
}

export default ViewerCanvas
