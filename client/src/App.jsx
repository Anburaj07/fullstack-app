import styled from 'styled-components';
import './App.css';
import Navbar from './components/Navbar';
import AllRoutes from './components/AllRoutes';

function App() {
  return (
    <DIV className="App">
      <Navbar/>
      <AllRoutes/>
    </DIV>
  );
}

export default App;

const DIV=styled.div`
height: 750px;
color: whitesmoke;
background-image: linear-gradient( 109.6deg,  rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% );
`