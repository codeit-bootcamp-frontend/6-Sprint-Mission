import React from "react";
import { Link } from "react-router-dom";
import fb from "../../assets/icon/ic_facebook.svg";
import tw from "../../assets/icon/ic_twitter.svg";
import yt from "../../assets/icon/ic_youtube.svg";
import it from "../../assets/icon/ic_instagram.svg";

const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <p className="codeit">@codeit - 2024</p>
      </div>
      <div className="FAQ">
        <Link to="/privacy">Privacy Policy</Link>
        &emsp;
        <Link to="/faq">FAQ</Link>
      </div>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com"
        >
          <img src={fb} alt="facebook" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.twitter.com"
        >
          <img src={tw} alt="twitter" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com"
        >
          <img src={yt} alt="youtube" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/"
        >
          <img src={it} alt="instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
