// import './App.css';
import SignUp from './Components/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './Components/LogIn';
import { Home } from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
