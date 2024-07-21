import React from 'react';
import { Link } from "react-router-dom";
const MobileHeader = () => {
    return (
        <div className='w-full bg-black fixed top-0 nav'>
            <h1 className="ml-3 text-3xl py-2 my-2 font-[Lobster]">
            <Link to="/feed">BlogShare</Link>
          </h1>
        </div>
    )
}


export default MobileHeader;