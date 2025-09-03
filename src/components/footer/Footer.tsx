import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaTelegram,
  FaTumblr,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import styles from "./Footer.module.css";
import React from "react";

const Footer = () => {
  console.log("RENDER-FOOTER");
  // STATE

  // SIDE-EFFECTS

  // UI
  return (
    <footer className={styles.footer}>
      {/* Social Media Section */}
      <div className={styles.socialMedia}>
        {/* <p>Get Connected with us on social networks</p> */}
        <div className={styles.icons}>
          <FaFacebook className={styles.icon} />
          <FaWhatsapp className={styles.icon} />
          <FaYoutube className={styles.icon} />
          <FaInstagram className={styles.icon} />
          <FaLinkedin className={styles.icon} />
          <FaTelegram className={styles.icon} />
          <FaPinterest className={styles.icon} />
          <FaTumblr className={styles.icon} />
          <FaSnapchat className={styles.icon} />
          <FaTwitter className={styles.icon} />
        </div>
      </div>
      {/* Footer Links Section */}
      <div className={styles.footerLinks}>
        <div>
          <h4>IRCTC Trains</h4>
        </div>
        <div>
          <h4>General Information</h4>
        </div>
        <div>
          <h4>Important Information</h4>
        </div>
        <div>
          <h4>Agents</h4>
        </div>
        <div>
          <h4>Enquiries</h4>
        </div>
        <div>
          <h4>How To</h4>
        </div>
        <div>
          <h4>IRCTC eWallet</h4>
        </div>
        <div>
          <h4>IRCTC Official App</h4>
        </div>
        <div>
          <h4>Advertise with us</h4>
        </div>
        <div>
          <h4>Refund Rules</h4>
        </div>
        <div>
          <h4>Person With Disability Facilities</h4>
        </div>
        <div>
          <h4>For Newly Migrated Agents</h4>
        </div>
        <div>
          <h4>Mobile Zone</h4>
        </div>
        <div>
          <h4>Policies</h4>
        </div>
        <div>
          <h4>Ask Disha ChatBot</h4>
        </div>
        <div>
          <h4>About us</h4>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
