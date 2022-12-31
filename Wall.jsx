import React, { useEffect, useState } from 'react'
import WallItem from './WallItem';
import Loaders from './Loaders';
import "../App.css"
const Wall = () => {

    let [getData, setData] = useState([]);
    let [GetPage, SetPage] = useState(2);
    let [GetSpin, SetSpin] = useState(false);
    let [GetSearch, SetSearch] = useState('');
    let [GetNumber, SetNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]);
    let [GetMyChange, SetMyChange] = useState('')
   

         {/* API CALL DATA */}
    let apiCall = () => {
        fetch(`https://api.pexels.com/v1/search/?page=1&per_page=${!GetMyChange ? 6 : GetMyChange}&query=${!GetSearch ? 'car' : GetSearch}`, {
            headers: {
                Authorization: "563492ad6f917000010000016adecfa3c23946b29bdb5fa9cb894d8d"
            }
        })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
              //  console.log(data.photos)
                SetSpin(true);
                setTimeout(() => {
                    SetSpin(false)
                    setData(data.photos);
                }, 1000);
            })
    }
         {/* CHANGE IMAGE */}
    let MyChangeEvent = (e) => {
        SetSearch(e.target.value);

        fetch(`https://api.pexels.com/v1/search/?page=1&per_page=${!GetMyChange ? 6 : GetMyChange}&query=${!GetSearch ? 'car' : GetSearch}`, {
            headers: {
                Authorization: "563492ad6f917000010000016adecfa3c23946b29bdb5fa9cb894d8d"
            }
        })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
              //  console.log(data.photos)
                SetSpin(true);
                setTimeout(() => {
                    SetSpin(false)
                    setData(data.photos);
                }, 1000);
            })

    }
         {/* NEXT IMAGE */}
    let NextPage = (e) => {
        e.preventDefault();
        SetPage(GetPage + 1)
       // console.log(GetPage)
        fetch(`https://api.pexels.com/v1/search/?page=${GetPage}&per_page=${!GetMyChange ? 6 : GetMyChange}&query=${!GetSearch ? 'car' : GetSearch}`, {
            headers: {
                Authorization: "563492ad6f917000010000016adecfa3c23946b29bdb5fa9cb894d8d"
            }
        })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                // console.log(data.next_page)

                SetSpin(true);
                setTimeout(() => {
                    SetSpin(false)
                    setData(data.photos);
                }, 1000);
            })


    }
         {/* PREVIOUS IMAGE */}
    let PreviousPage = (e) => {
        e.preventDefault();
        if (GetPage <= 2) {

        } else {
            SetPage(GetPage - 1)
          //  console.log(GetPage)
            fetch(`https://api.pexels.com/v1/search/?page=${GetPage}&per_page=${!GetMyChange ? 6 : GetMyChange}&query=${!GetSearch ? 'car' : GetSearch}`, {
                headers: {
                    Authorization: "563492ad6f917000010000016adecfa3c23946b29bdb5fa9cb894d8d"
                }
            })
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    // console.log(data.next_page)
                    SetSpin(true);
                    setTimeout(() => {
                        SetSpin(false)
                        setData(data.photos);
                    }, 1000);
                })
        }

    }




    useEffect(() => {

    setTimeout(() => {
            apiCall()
        }, 1000)

        
    }, [GetSearch, GetMyChange])


    return (
        <div className='container'>
            <div className='row justify-content-center' style={{ margin: "40px 0px" }}>
                <h2 className='text-center' style={{ fontSize: "40px", fontWeight: "800" }}>My Walls Pie</h2>
         {/* MAP ALL DATA AND SHOW PAGE PER IMAGES */}
                <div className='col-md-6' style={{margin:"10px 0px"}}>
                    <label htmlFor="name">Page Per Show Images</label>
                    <select className="form-select form-select-sm" onChange={(e) => { SetMyChange(e.target.value) }} aria-label=".form-select-sm example">
                        <option  defaultValue="Please Select"  >Select Image Quantity</option>
                        {
                            GetNumber.map((elem, index) => {
                                return (
                                    <option value={elem} key={index}>{elem}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='col-md-6' style={{margin:"10px 0px"}}>
                    <label htmlFor="name">Search Image</label>
                    <input type="text" value={GetSearch} onChange={MyChangeEvent} className='form-control form-control-sm' placeholder='Search Image...' />
                    {/* <button type='button' className='btn btn-sm btn-info float-right' style={{ marginTop: "-32px" }}>Search</button> */}
                </div>
                {/* MAP ALL DATA WITH SPIN LOADER */}
                {
                    GetSpin === true ? <Loaders /> : getData.map((elem) => {
                        return (
                           <div className='col-md-4' style={{margin:"5px 0px"}}>
                             <WallItem key={elem.id}  large={elem.src.large2x} alt={elem.alt} photographer={elem.photographer} img={elem.src.large2x} />
                           </div>
                        )
                    })
                }
                <div className='container d-flex justify-content-between' style={{ marginTop: "20px" }} >
                    <button disabled={GetPage <= 2} className='btn btn-dark ' style={{ margin: "40px 0px", padding: "5px 40px" }} onClick={PreviousPage}   >Previous</button>
                    <button className='btn btn-dark ' style={{ margin: "40px 0px", padding: "5px 40px" }} onClick={NextPage} >Next</button>
                </div>
            </div>
        </div>
    )
}

export default Wall