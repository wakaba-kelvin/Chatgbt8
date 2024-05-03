import React from "react";
import ai from '../../assets/ai.jpg'
import "./Mainbody.scss";
import Middle from "../Middle/Middle";
import Future from "../Future/Future";
import Register from "../Register/Register";
import Footer from "../Footr/Footer";

function Mainbody() {
  return (
    <div className="mainBody">
      <div className="build">
        <div className="intro">
        <h1>Let's Build Something</h1>
        <h1>amazing with GPT8</h1>
        <h1>OpenAI</h1>
        </div>
        <div className="explanation">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iste ratione molestiae vero illum hic modi! Deleniti, odio dicta itaque dolor at quisquam distinctio, vitae perferendis error nisi suscipit necessitatibus.</p>
      </div>
      <div className="email">
        <input className="mail" type="email" placeholder="Enter your Email Address"/>
        
        <button>Get Started</button>
      </div>
      </div>
      <Middle/>
      <Future/>
      <Register/>
      <Footer/>
      
    </div>
  );
}

export default Mainbody;
