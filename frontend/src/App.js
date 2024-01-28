import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/page";
import { useState } from "react";
import ViewerPage from "./pages/viewer/page";
function App() {
 const [urlData, setUrlData] = useState('')
 console.log(urlData)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage urlData={urlData} setUrlData={setUrlData}/>}/>
        <Route path="/viewer/" element={<ViewerPage urlData={urlData} setUrlData={setUrlData} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
