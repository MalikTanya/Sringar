import React from "react";
import { BsInstagram, BsTwitter, BsFacebook, BsYoutube } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="flex justify-center flex-col items-center bg-black mt-8  h-[100px] text-white  bottom:0 right:0 left :0 position:absolute">
      <div className="flex my-4 ">
        <BsInstagram className="mx-4 text-3xl" />
        <BsTwitter className="mx-4 text-3xl" />
        <BsFacebook className="mx-4 text-3xl" />
        <BsYoutube className="mx-4 text-3xl" />
      </div>
      <p className="flex items-center mb-4">
        All rights reserved. Copyright <BiCopyright /> Shringar
      </p>
    </footer>
  );
};

export default Footer;
