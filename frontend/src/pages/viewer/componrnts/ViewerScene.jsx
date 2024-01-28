import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewerScene = ({nameProject, rooms, setCurrentRoom, currentRoom}) => {
  console.log(currentRoom.photo_file)
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {

    const fetchPhoto = async () => {
      try {
        const response = await axios.get(currentRoom.photo_file, {
          responseType: 'blob',
        });

        const blobUrl = URL.createObjectURL(response.data);
        setPhotoUrl(blobUrl);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Ошибка при получении фотографии:', error);
        }
      }
    };

    fetchPhoto();

    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [currentRoom]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-2xl text-gray-400 font-bold">{nameProject}</p>
        <img className="" src={photoUrl} />
      </div>

      <p className="text-2xl text-gray-400 font-bold">Список комнат</p>
      <div className="flex flex-col gap-2 md:overflow-auto ">
        {rooms.map(room => (
        <button key={room.id} onClick={()=>setCurrentRoom(room)} className=" w-full py-1 px-2 rounded-full border-2  border-slate-700 text-white hover:bg-slate-500">
          {room.name}
        </button>
        ))}
      </div>
    </>
  );
};

export default ViewerScene;
