import { Fragment,useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import RecipeInput from './RecipeInput'
import Nav from './Navbar'
import { useNavigate } from 'react-router-dom'; 

import { useCookies } from "react-cookie";
import axios from 'axios';
import { useAuth } from './auth/AuthContext'
import BarLoader from '../aesthetics/Loader'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Enter your ingredients', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Homepage() {
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate(); 
  const {login} =useAuth();
  const [userData, setUserData] = useState([]);
  const [loggedIn,setLoggedIn]=useState(false);
  const [searchOption,setSearchOption]=useState("Ingredients");
  const handleInputChange = (newValue) => {
    setSearchOption(newValue);
  };
  useEffect(() => {
    const verifyCookie = async () => {
      console.log("I am in useEffect");
      if (!cookies.token) {
        console.log("I am in useEffect2");
        navigate("/signin");
      }
      try {
        const { data } = await axios.post(
          "http://localhost:8080/verify",  // Use the correct endpoint for verification
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        console.log("Status is:", status);
        setUserData(user); // Use setUserData to update the state
        setLoggedIn(true);
        console.log("Userdata: ",userData.firstName);
        return status
          ? login()
          : (removeCookie("token"), navigate("/signin"));
      } catch (error) {
        console.error("Error verifying cookie:", error);
        removeCookie("token");
        navigate("/signin");
      }
    };
  
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  


  return (
   <>
    {loggedIn?( 
      <>
        <Nav user={userData}/>
        <div className="min-h-full">
          <header className="bg-violet-300 shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Enter {searchOption}</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8"><RecipeInput onInputTypeChange={handleInputChange}/></div>
          </main>
        </div>
      </>
      ):(
        <div className="grid place-content-center bg-purple-800 h-screen	max-w-screen	">
        <BarLoader />
       </div>
      )}
      
   </>
  )
}
