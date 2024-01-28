import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'

const Loader = ({url, setIsPointCloud, pointSize}) => {
  const group = useRef()
  useEffect(() => {

    const ModelLoader = async (Loader, fileUrl) => {
          setIsPointCloud(false)
          const loader = new Loader();
          const data = await new Promise(resolve => loader.load(fileUrl, resolve))
          if (group.current) {
            group.current.clear()
          }
          if (data) {
            group.current.add(data.scene)
          }
    }
    
    const PointCloudLoader = async (size, fileUrl) => {
      setIsPointCloud(true)
      const loader = new PCDLoader();
      const data = await new Promise(resolve => loader.load(fileUrl, resolve))
      data.geometry.center()
      data.geometry.rotateX(-Math.PI / 2)

      if (data.material){
        data.material.size = size
      }
      
      if (group.current) {
        group.current.clear()
      }

      if (data) {
        group.current.add(data)
      }
}

    const fetchGltf = async () => {
      try {
        const response = await axios.get(url, {
          responseType: 'blob',
        });
        const fileExtension = url.split('.').pop();
        

        const fileUrl = URL.createObjectURL(response.data);

        if (fileExtension === 'glb/' || fileExtension === 'gltf/') {
          ModelLoader(GLTFLoader, fileUrl)
        } else if (fileExtension === 'pcd/') {
          PointCloudLoader(pointSize, fileUrl)
        } else if (fileExtension === 'obj/') {
          ModelLoader(OBJLoader, fileUrl)
        } else if (fileExtension === 'ply/') {
          ModelLoader(PLYLoader, fileUrl)
        } else {
          group.add(null)
          setIsPointCloud(false)
        }

        URL.revokeObjectURL(fileUrl);
      } catch (error) {
        console.error('Ошибка при получении файла:', error);
      }
    };

    fetchGltf();
  }, [url, pointSize]);

  return <group ref={group} />;
};

export default Loader;