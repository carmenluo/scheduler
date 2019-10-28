import React from "react";
import "./Footer.scss";

export default function Footer(props) {
  return <footer>
    <div className="footer" >
      <div id="button"></div>
        <div id="container">
          <div id="cont">
            <div className="footer_center">
              <h3> CONTACT ME</h3>
              <ul>
                <li>
                  <a href="mailto:sdluojm@gmail.com">Email</a>
                </li>
                <li>
                  <a href="https://github.com/carmenluo">Github</a>
                </li>
                <li><a href="https://github.com/carmenluo">Linkedin</a>
                </li>
                <li>
                  <p>👋</p>
                </li>
              </ul>
            </div>
          </div>
        </div> 
    </div>
  </footer>
}