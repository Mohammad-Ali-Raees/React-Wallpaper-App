import React, { Component } from 'react'
import Navbar from "./Partials/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./ClassBasedComponents/News";
import LoadingBar from 'react-top-loading-bar'
import Slects from './ClassBasedComponents/Slects';
import Form from './ClassBasedComponents_2/Form';
import Wall from './Wallpaper/Wall';
import WallFullImg from './Wallpaper/WallFullImg';
import Home from './Home';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      progress: 0
    }
  }



  render() {
    let My_Progress = (progress) => {
      this.setState({ progress: progress })
    }
    return (
      <>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          height={3}

        />
     

        <Router>
        <Navbar />
        <Routes>
          <Route exact path="/walls" element={ <Wall />}/>
       
        
    
          {/* <Route exact path="/walls/wallsfull/:id" component={WallFullImg}  /> */}
          <Route exact path="/forms" element={<Form/>}/>
           
          <Route exact path="/select" element={ <Slects />} />
           
      
          <Route exact path="/" element={ <News My_Progress={My_Progress} key="general" category="general" />} />
           
         

          <Route exact path="/entertainment" element= {  <News My_Progress={My_Progress} key="entertainment" category="entertainment" />} />
          
         
          <Route exact path="/science" element={<News My_Progress={My_Progress} key="science" category="science" />} />
      
         
          <Route exact path="/sports" element={ <News My_Progress={My_Progress} key="sports" category="sports" />}/>

         
          <Route exact path="/technology" element={<News My_Progress={My_Progress} key="technology" category="technology" />} />

         
          <Route exact path="/business" element={<News My_Progress={My_Progress} key="business" category="business" />} />

         
          <Route exact path="/health" element={<News My_Progress={My_Progress} key="health" category="health" />} />
           
         
          

        </Routes>
        </Router>
      </>

    )
  }
}
