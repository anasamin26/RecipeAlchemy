// Feed.jsx
import React,{useEffect} from "react";
import Nav from "../Navbar";
import SquishyCard from "../../aesthetics/SquishyCard";
import Posts from "./Posts";
import BestRatedRecipes from "./BestRatedRecipes";
import Chefs from "./Chefs";
import { useLocation } from 'react-router-dom';

export default function Feed() {
  const location = useLocation();


  const { state } = location;
  const userData = state?.user;    
  console.log("UserData from state: ", userData);
  return (
    <>
      <section>
        <Nav user={userData} />
        <SquishyCard />
        <div className="container px-6 m-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-3 h-screen overflow-y-auto ">
              <BestRatedRecipes />
            </div>
            <div className="col-span-4 lg:col-span-6 h-screen ">
              <Posts user={userData}/>
            </div>
            <div className="col-span-4 lg:col-span-3 h-screen overflow-y-auto ">
              <Chefs />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
