import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import RecipeDisplay from './components/RecipeDisplay';
import RecipeDetails from './components/RecipeDetails';
import FrontPage from './components/FrontPage';
import SignIn from './components/auth/Signin';
import Signup from './components/auth/Signup';
import { AuthProvider } from './components/auth/AuthContext'; // Import the AuthProvider
import PrivateRoute from './components/auth/PrivateRoute';
import Feed from './components/feed/Feed';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/search-recipe"
            element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            }
          />         
         <Route path="/recipe-display" element={             
           <PrivateRoute>
          <RecipeDisplay />
          </PrivateRoute>
          } />
          <Route path="/recipe-details" element={
          <PrivateRoute>
          <RecipeDetails />
          </PrivateRoute>
          } />
          <Route path="/homefeed" element={
          <PrivateRoute>
          <Feed />
          </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

