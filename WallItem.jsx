import React from 'react';
import "../App.css"
const WallItem = (props) => {

    return (
        <a target="_blank" href={props.large} rel="noreferrer"  >

            <div className="card"  key={props.id} >
               <div className='card-body' style={{padding:"2px"}}>
               <img src={props.img} style={{ height: "400px", width: "100%" }} className="card-img-top" alt="..." />
               </div>
   
            </div>

        </a>
    )
}

export default WallItem