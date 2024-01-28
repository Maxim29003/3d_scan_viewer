import React, { useState } from "react";
import { HiOutlineCube } from "react-icons/hi2";
import { FaPersonWalking } from "react-icons/fa6";
import { GoIssueReopened } from "react-icons/go";
import ViewerScene from "./componrnts/ViewerScene";
import ViewerSettings from "./componrnts/ViewerSettings";
import ViewerCanvas from "./componrnts/ViewerCanvas";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewerPage = ({ urlData, setUrlData }) => {
  const [isPointControll, setIsPointControll] = useState(false);
  const [isOrbitControll, setIsOrbitControll] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({});
  const [isPointCloud, setIsPointCloud] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const [pointSize, setPointSize] = useState(0.01);
  const [data, setData] = useState({
    id: null,
    name: "",
    rooms: [{ id: null, name: "", model_file: "" }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlData);
        setData(response.data);
        if (response.data.rooms[0]) {
          console.log(response.data);
          setCurrentRoom(response.data.rooms[0]);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
      setUrlData("");
    };
    fetchData();
  }, []);

  const handleClickPoint = () => {
    setIsOrbitControll(false);
  };

  const handleClickOrbit = () => {
    console.log(isOrbitControll)
    if (!isOrbitControll) {
        setIsOrbitControll(true);
    } else {
        setIsOrbitControll(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex flex-col h-screen  bg-slate-900 ">
      <div className="absolute flex p-1 px-2 w-full h-12 justify-sart items-center border-b-2 gap-2  border-slate-700 ">
        <Link to="/">
          <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center hover:bg-slate-500 ">
            <HiOutlineCube color="white" size={30} />
          </div>
        </Link>
        
        <button onClick={handleClickPoint} className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center hover:bg-slate-500 ">
         <FaPersonWalking color="white" size={25} />
        </button>

        <button onClick={handleClickOrbit} className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center hover:bg-slate-500 ">
        <GoIssueReopened color="white" size={25}/>
        </button>
      </div>

      <div className="flex md:flex-nowrap flex-wrap h-full pt-12">
        <div className="md:grow h-1/2 md:h-full w-full flex p-1">
          <ViewerCanvas
            currentRoom={currentRoom}
            setIsPointCloud={setIsPointCloud}
            intensity={intensity}
            pointSize={pointSize}
            isOrbitControll={isOrbitControll}
            isPointControll={isPointControll}
          />
        </div>
        <div className="md:w-96 h-1/2 md:h-full md:border-l-2 md:border-t-0 border-t-2 border-slate-700 w-full ">
          <div className="flex flex-col p-2 gap-2 h-full w-full md:overflow-y-hidden overflow-auto">
            <div className="flex justify-center w-full gap-2">
              <button
                onClick={() => setIsSettings(false)}
                className=" w-1/2 py-1 px-2 rounded-full border-2  border-slate-700 text-white hover:bg-slate-500"
              >
                Сцена
              </button>
              <button
                onClick={() => setIsSettings(true)}
                className=" w-1/2 py-1 px-2 rounded-full border-2  border-slate-700 text-white hover:bg-slate-500"
              >
                Настройки
              </button>
            </div>
            {isSettings ? (
              <ViewerSettings
                isPointCloud={isPointCloud}
                intensity={intensity}
                setIntensity={setIntensity}
                pointSize={pointSize}
                setPointSize={setPointSize}
              />
            ) : (
              <ViewerScene
                rooms={data.rooms}
                nameProject={data.name}
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
