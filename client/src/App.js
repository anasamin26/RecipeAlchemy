import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDisplay from './components/RecipeDisplay';
import RecipeDetails from "./components/RecipeDetails";
import Nav from "./components/Navbar";
function App() {
  return (
    <>
    <Nav/>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe-display" element={<RecipeDisplay />} />
        <Route path="/recipe-details" element={<RecipeDetails />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

