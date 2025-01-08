import {BrowserRouter, Route, Routes} from "react-router-dom"
import List from "./component/board/List";
import Write from "./component/board/Write";
import NotFound from "./component/common/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List/>}/>
        <Route path="/write" element={<Write/>}/>
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
