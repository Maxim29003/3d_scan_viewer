import React from "react";
import { Link } from "react-router-dom";
import HomeCanvas from "./components/HomeCanvas";

const HomePage = ({ urlData, setUrlData }) => {
  return (
    <div className="h-screen bg-slate-900 flex flex-col  justify-center  ">
      <div className="p-2 h-auto w-ful flex flex-wrap  sm:justify-between gap-2">
        <a
          href="http://127.0.0.1:8000/admin/"
          className="inline-block py-1 px-2 rounded-full border-2  border-slate-700 text-white hover:bg-slate-500"
        >
          Загрузка
        </a>
        <div className="flex gap-2">
          <input
            type="text"
            className="inline-block px-2 border-2 border-slate-700 rounded-full  text-white bg-slate-500"
            placeholder="Ссылка на модель"
            value={urlData}
            onChange={(e) => setUrlData(e.target.value)}
          />

          <Link to="/viewer/">
            <button className="inline-block py-1 px-2 rounded-full border-2  border-slate-700 text-white hover:bg-slate-500">
              Просмотр
            </button>
          </Link>
        </div>
      </div>
      <div className="h-full w-ful">
        <HomeCanvas />
      </div>
    </div>
  );
};

export default HomePage;
