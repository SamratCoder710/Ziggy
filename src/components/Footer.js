import React from "react";
import styleClass from "./Footer.module.css";
import { GrInstagram, GrFacebook, GrLinkedin, GrYoutube } from "react-icons/gr";

const Footer = () => {
  const countries = [
    "India",
    "USA",
    "China",
    "Brazil",
    "Greece",
    "Poland",
    "Indonesia",
    "Canada",
  ];
  const languages = ["English", "Spanish", "Dutch", "Mandarin", "Portugese"];
  return (
    <div className={styleClass.foot}>
      <div className={styleClass.footer}>
        <div className={styleClass.footerHeading}>ziggy</div>
        <div>
          <select id="country" className={styleClass.countryOption}>
            {countries.map((el) => (
              <option key={el} value={el} alt={el}>
                {el}
              </option>
            ))}
          </select>
          <select id="language" className={styleClass.countryOption}>
            {languages.map((el) => (
              <option key={el} value={el} alt={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styleClass.socialContainer}>
        <div className={styleClass.about}>
          ABOUT ZIGGY
          <ul>
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Work With Us</li>
            <li>Investor Relation</li>
            <li>Report Fraud</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className={styleClass.zomaverse}>
          ZIGGYVERSE
          <ul>
            <li>Ziggy</li>
            <li>Clickit</li>
            <li>Feeding India</li>
            <li>Superpure</li>
            <li>Comaland</li>
          </ul>
        </div>
        <div className={styleClass.restaurants}>
          FOR RESTAURANTS
          <ul>
            <li>Partner With Us</li>
            <li>App For You</li>
          </ul>
        </div>
        <div className={styleClass.enterprises}>
          FOR ENTERPRISES
          <ul>
            <li>Ziggy For Work</li>
          </ul>
        </div>
        <div className={styleClass.learnMore}>
          LEARN MORE
          <ul>
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div className={styleClass.socialLinks}>
          SOCIAL LINKS
          <ul>
            <li>
              <GrInstagram size={12} />
            </li>
            <li>
              <GrFacebook size={12} />
            </li>
            <li>
              <GrLinkedin size={12} />
            </li>
            <li>
              <GrYoutube size={12} />
            </li>
          </ul>
        </div>
      </div>
      <hr style={{ width: "95%", color: "rgb(182,182,182)" }}></hr>
      <div className={styleClass.copyRight}>
        By continuing past this page, you agree to our Terms of Service, Cookie
        Policy, Privacy Policy and Content Policies.© GoFood 2023
      </div>
    </div>
  );
};

export default Footer;
