import {BrowserRouter, Route, Routes} from "react-router-dom"
import List from "./component/board/List";
import Write from "./component/board/Write";
import LoginForm from "./component/member/LoginForm";
import Dashboard from "./component/common/Dashboard";
import ProtectedRoute from "./component/common/ProtectedRoute";
import {AuthProvider} from "./hooks/AuthContext"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/list" element={
            <ProtectedRoute>
              <List/>
            </ProtectedRoute>
            }/>
          <Route path="/write" element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
            }/>
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
