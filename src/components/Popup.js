import React, { useState } from 'react';

const Popup = ({detail}) => {

    let hidden = 'hidden'
    let flex = 'flex'
    let [display, setDisplay] = useState(flex)

    const toggle = () => {
        if(display === flex){
            setDisplay(hidden)
        }
        else{
            setDisplay(flex)
        }
    }

    return (<div className={`bg-[#F2ECFF] text-black 
    absolute left-[50%] translate-x-[-50%] rounded my-2
    lg:w-1/3 w-1/2 ${display} items-center justify-center flex-col border border-[#00C897]`}>
        <h1 className='my-3'>{detail ? detail: "Title"}</h1>
        <button className='bg-[#00C897] rounded my-2 px-4 py-2 text-[#F2ECFF]'
        onClick={toggle}
        >OK</button>
    </div>)
}



export default Popup;