import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <div className="footer">
            <div className="top">
                <div className="top-left">
                    <h1 className="title">Intermediary</h1>
                    <p className="subtitle">Intermediary is a platform that allows users to make and receive offers.</p>
                </div>
                <div className="top-right">
                    <a className="icons-footer" href="/">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a className="icons-footer" href="/">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a className="icons-footer" href="/">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a className="icons-footer" href="/">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </div>
            <div className="bottom">
                <div>
                    <h4 className="bottom-title">Project</h4>
                    <a className="bottom-subtitle" href="/">Home</a>
                    <a className="bottom-subtitle" href="/info">About Us</a>
                    <a className="bottom-subtitle" href="/contact">Contact Us</a>
                </div>
                <div>
                    <h4 className="bottom-title">Help</h4>
                    <a className="bottom-subtitle" href="/">Support</a>
                    <a className="bottom-subtitle" href="/">FAQ</a>
                    <a className="bottom-subtitle" href="/">Help Center</a>
                </div>
                <div>
                    <h4 className="bottom-title">Others</h4>
                    <a className="bottom-subtitle" href="/">Terms of Service</a>
                    <a className="bottom-subtitle" href="/">Privacy Policy</a>
                    <a className="bottom-subtitle" href="/">Cookie Policy</a>
                </div>

            </div>
        </div>
    )
}

export default Footer;