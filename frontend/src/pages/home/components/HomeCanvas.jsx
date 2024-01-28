import { Canvas } from "@react-three/fiber";
import Points from "./Points";
import { OrbitControls } from "@react-three/drei";
import Text from "./Text";


const HomeCanvas = () => {
    return(
        <Canvas camera={{ position: [90, 30, 0], fov: 85 }}>
            <Points color={0x808080} count={500}/>
            <Text
            color={0x808080}
            size={10}
            rotation={[0, Math.PI / 2, 0]}
            position={[0, 0, 0]}
            text={'3D Scan Viewer'}
            />
            <OrbitControls/>
        </Canvas>
    )
}

export default HomeCanvas;