import React from "react";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import "./Styles/Contactus.css";

export default function Contactus() {
  return (
    <div className="text-center backgr">
      <div className="text-center">
        <div className="img-container">
          <img
            className="text-center contact-img"
            src="https://www.naipunnyacollege.ac.in/NAIPUPLOADS/innerbanner_thumb/1705912361_Common_Banner01.jpg"
            alt="img"
          />
        </div>
      </div>
      <h1 className="text-center color-black high-text">CONTACT US</h1>
      <div className="con-items">
        <div className="simple">
          <div className="ad">
            <FaPhoneAlt style={{ color: "orangered", fontSize: "23px" }} />
            <h4 className="ad-head text-center po">Phone Number</h4>
          </div>
          <p className="con-add text-center">+91 8606802255</p>
        </div>
        <div className="text-center simple">
          <div className="ad">
            <IoLocation style={{ color: "orangered", fontSize: "23px" }} />
            <h4 className="ad-head text-center po">Address</h4>
          </div>
          <p className="con-add text-center">
            Near Manorama Junction, Cherthala
            <br />
            Affiliated to the University of Kerala,
            <br />
            A Project of the Archdiocese of Ernakulam-Angamaly
            <br />
          </p>
        </div>
        <div className="simple">
          <div className="ad">
            <IoMailOutline style={{ color: "orangered", fontSize: "23px" }} />
            <h4 className="ad-head text-center po">Email</h4>
          </div>
          <p className="con-add text-center">info@naipunnyacollege.ac.in</p>
        </div>
      </div>
    </div>
  );
}
