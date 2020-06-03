import React from "react";
import logo from "../../images-local/logo-white.png";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";

import { AuthUserContext } from "../Session";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => (
    <div>
      <AuthUserContext.Consumer>
        {(authUser) => (authUser ? <FooterAuth /> : <FooterNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );

const FooterNonAuth =() => (
    <div className="footer">
          <div>
        <img src={logo} alt="logo" className="footer-logo" />
      </div>
      <div className="footer-links-div">
        <ul className="footer-navlinks">
        <li>
        <Link to={ROUTES.HOME}>HOME</Link>
      </li>
      <li>
        <Link to={ROUTES.ACTIVITIES}>ACTIVITIES</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>SIGN IN</Link>
      </li>
        </ul>
      </div>
      <FooterIcons/>
    </div>
);

const FooterAuth =() => (
    <div className="footer">
          <div>
        <img src={logo} alt="logo" className="footer-logo" />
      </div>
      <div className="footer-links-div">
        <ul className="footer-navlinks">
        <li>
        <Link to={ROUTES.HOME}>HOME</Link>
      </li>
      <li>
        <Link to={ROUTES.ACTIVITIES}>ACTIVITIES</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>ADMIN</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
        </ul>
      </div>
      <FooterIcons/>
    </div>
);

const FooterIcons = () => (
    <div className="footer-icons">
        <ul>
          <li>
            <FaFacebookF className="footer-icon" />
          </li>
          <li>
            <FaInstagram className="footer-icon" />
          </li>
          <li>
            <FaTwitter className="footer-icon" />
          </li>
          <li>
            <FaLinkedinIn className="footer-icon" />
          </li>
          <li>
            <FaYoutube className="footer-icon" />
          </li>
        </ul>
      </div>
);

export default Footer;
