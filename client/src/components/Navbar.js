import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../aesthetics/Dropdown';
import SliderToggle from '../aesthetics/SliderToggle';


const Nav = ({user}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("light");
  const [selectedMenu,setSelectedMenu]=useState("Recipe");
  const navigate = useNavigate();
  const handleToggle = () => {
    setDropdownOpen((prev) => !prev);
  };
  const userData=user;
  console.log("UserData in Nav: ",userData);
  return (
   
    <nav className={`${
                    selected === "light" ? "bg-purple-900 "  : "bg-purple-900"
                }`}>
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <button onClick={()=>{navigate("/search-recipe")}} className="flex items-center space-x-3 rtl:space-x-reverse font-secondary">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">RecipeAlchemy</span>
        </button>
        <button data-collapse-toggle="mega-menu-full" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-purple-500 rounded-lg md:hidden hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:text-purple-400 dark:hover:bg-purple-700 dark:focus:ring-purple-600" aria-controls="mega-menu-full" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div id="mega-menu-full" className="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col  md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-4 md:border-0">
            <li>
                </li>
               
                <li>
                <div
                    onClick={() => {
                        setSelectedMenu("Recipe")
                        navigate('/search-recipe');
                    }}
                    className={`cursor-pointer ${selectedMenu == 'Recipe' ? 'text-yellow-500  rounded-xl' : 'text-white'} hover:text-yellow-500`}
                    aria-current="page"
                    >
                    Find Recipes
                </div>
                </li>
                <li>
                <div
                    onClick={() => {
                        setSelectedMenu('Feed')
                        navigate('/homefeed',{state:{user}});
                    }}
                    className={`cursor-pointer ${selectedMenu == 'Feed' ? 'text-yellow-500  rounded-xl' : 'text-white'} hover:text-yellow-500`}
                    aria-current="page"
                    >
                    Feed
                </div>
                </li>
                <li>
                <button
  id="mega-menu-full-dropdown-button"
  onClick={handleToggle}
  className="flex items-center justify-between w-full py-2 px-3 text-purple-900 rounded md:w-auto hover: md:hover:bg-transparent md:border-0 md:hover:text-pink-600 md:p-0 dark:text-white md:dark:hover:text-yellow-300 dark:hover:bg-purple-700 dark:hover:text-pink-500 md:dark:hover:bg-transparent dark:border-purple-700"
>                    
  Company <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg></button>
                </li>
                {/* <li>
                
                <SliderToggle selected={selected} setSelected={setSelected} />
                </li> */}
                
                <li> 
                    <Dropdown />
                </li>

            </ul>
        </div>
    </div>

    {isDropdownOpen&&(
    <div id="mega-menu-full-dropdown" className=" right-2 absolute z-50 rounded-lg mt-1 border-purple-200 shadow-sm  md:bg-white border-y dark:bg-slate-800 dark:border-purple-600">
        <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-purple-900 dark:text-white sm:grid-cols-2 md:px-6">
            <ul>
                <li>
                    <a href="#" className="block p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-700">
                        <div className="font-semibold">Online Stores</div>
                        <span className="text-sm text-purple-500 dark:text-purple-400">Connect with third-party tools that you're already using.</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="block p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-700">
                        <div className="font-semibold">Segmentation</div>
                        <span className="text-sm text-purple-500 dark:text-purple-400">Connect with third-party tools that you're already using.</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="block p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-700">
                        <div className="font-semibold">Marketing CRM</div>
                        <span className="text-sm text-purple-500 dark:text-purple-400">Connect with third-party tools that you're already using.</span>
                    </a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="#" className="block p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-700">
                        <div className="font-semibold">Online Stores</div>
                        <span className="text-sm text-purple-500 dark:text-purple-400">Connect with third-party tools that you're already using.</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="block p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-700">
                        <div className="font-semibold">Segmentation</div>
                        <span className="text-sm text-purple-500 dark:text-purple-400">Connect with third-party tools that you're already using.</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="block p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-700">
                        <div className="font-semibold">Marketing CRM</div>
                        <span className="text-sm text-purple-500 dark:text-purple-400">Connect with third-party tools that you're already using.</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>)
    }
</nav>

  );
};

export default Nav;
