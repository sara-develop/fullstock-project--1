import './App.css'
import './index.css'
import './flags.css'
import { Routes, Route } from "react-router"
import Layout from './common/Layout'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import AllPosts from './components/posts/AllPosts'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 
import AllUsers from './components/users/AllUsers'
import AllTodo from './components/todos/AllTodo'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/todos" element={<AllTodo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
