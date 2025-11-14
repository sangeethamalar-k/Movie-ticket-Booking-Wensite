import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faXTwitter, faInstagram, faPinterestP, faYoutube } from '@fortawesome/free-brands-svg-icons'
import playstore from "./assets/playstore.avif"
import applelogo from "./assets/playstorecontact.avif"
import logo from "./assets/theatrelogo.png"
import { Link, useNavigate } from "react-router-dom";

function Footer() {
    return (
        <Fragment>
            <div className='footer '>
                <div className='d-flex' id='listfooter' >
                    <div className='footer1'>
                        <div className='logos'>
                            <Link to="/home" >
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{ height: "50px", width: "160px", backgroundColor: "black" }}
                                />
                            </Link>
                            <div className='listplaystore'>
                                <img src={playstore} className='image' onClick={() =>
                                    window.open(
                                        "https://play.google.com/store/games?hl=en_IN", "_blank"
                                    )} />
                                <img src={applelogo} className='image' onClick={() =>
                                    window.open(
                                        "https://www.apple.com/in/app-store/", "_blank"
                                    )} />
                            </div>
                        </div>
                        <div className='footcontent'>
                        
                        
                        <h6 className='pt-3'>HELP | About Us | Contact Us | Current Opening |  FAQ |  Terms and Conditions | Privacy Policy  </h6>
                        <h6>Copyright 2025 © seatmate Entertainment Pvt. Ltd. All Rights Reserved.</h6>
                        </div>
                        <div className='mediaicon'>
                            <h3><FontAwesomeIcon icon={faFacebookF} onClick={() => window.open("https://www.facebook.com", "_blank")} /></h3>
                            <h3><FontAwesomeIcon icon={faXTwitter} onClick={() => window.open("https://x.com", "_blank")} /></h3>
                            <h3><FontAwesomeIcon icon={faInstagram} onClick={() => window.open("https://www.instagram.com", "_blank")} /></h3>
                            <h3><FontAwesomeIcon icon={faPinterestP} onClick={() => window.open("https://in.pinterest.com", "_blank")} /></h3>
                            <h3><FontAwesomeIcon icon={faYoutube} onClick={() => window.open("https://www.youtube.com", "_blank")} /></h3>
                        </div>
                        
                    </div>

                </div>


            </div>

        </Fragment >
    )
}
export default Footer