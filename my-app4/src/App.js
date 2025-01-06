import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./component/Header";
import Index from "./component/Index";
import Posts from "./component/Posts";
import PostDetail from "./component/PostDetail";

function App() {
  return (
   <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path="/posts" element={<Posts />}/>
      <Route path="/posts/:id" element={<PostDetail />}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
