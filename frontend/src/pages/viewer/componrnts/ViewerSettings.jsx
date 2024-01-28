import React, { useRef } from "react";

const ViewerSettings = ({
  intensity,
  setIntensity,
  isPointCloud,
  pointSize,
  setPointSize,
  setSpeed,
  speed,
}) => {

  const changePointSize = () => {
    const value = pointSizeRef.current.value
    setPointSize(value)
  }

  const pointSizeRef = useRef()
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl text-gray-400 font-bold">Настройки</h2>

      {isPointCloud ? (
        <div className="flex flex-row gap-2 items-center">
          <span className="text-gray-400 w-3/4 font-bold">Размер точек: </span>
          <input
            ref={pointSizeRef}
            type="number"
            step="0.01" // Добавляем атрибут step для поддержки чисел с плавающей точкой
            className="inline-block px-2 border-2 border-slate-700 rounded-full text-white bg-slate-500 w-full"
            placeholder="Введите число"
          />
          <button onClick={changePointSize} className="inline-block  px-2 rounded-full border-2 w-1/2 border-slate-700 text-gray-400 hover:bg-slate-500">
             Изменить
          </button>
        </div>
      ) : null}

      <div className="flex flex-row gap-2 items-center">
        <span className="text-gray-400 w-2/5 font-bold">Яркость: </span>
        <input
          value={intensity}
          type="number"
          step="0.1" // Добавляем атрибут step для поддержки чисел с плавающей точкой
          className="inline-block px-2 border-2 border-slate-700 rounded-full text-white bg-slate-500 w-full"
          placeholder="Введите число"
          onChange={(e) => setIntensity(e.target.value)}
        />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <span className="text-gray-400 w-2/5 font-bold">Скорость: </span>
        <input
          value = {speed}
          type="number"
          step="0.01" // Добавляем атрибут step для поддержки чисел с плавающей точкой
          className="inline-block px-2 border-2 border-slate-700 rounded-full text-white bg-slate-500 w-full"
          placeholder="X"
          onChange={(e) => setSpeed(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ViewerSettings;