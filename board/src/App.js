import {BrowserRouter, Route, Routes} from "react-router-dom"
import List from "./component/board/List";
import Write from "./component/board/Write";
import NotFound from "./component/common/NotFound";
import LoginForm from "./component/member/LoginForm";
import Dashboard from "./component/common/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/write" element={<Write/>}/>
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
