import Image from 'next/image'
import logo from '../../public/assets/images/logo/logo-top-transparent.png'
import SubscribeFrom from './subscribe-form'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__dump"></div>
            <div className="footer__top">
                <div className="footer__top-left">
                    <Image className="footer__top-left-logo"  src={logo} alt="safe plaze" placeholder="blur" />
                </div>
                <div className="footer__top-right">
                    <SubscribeFrom />
                </div>
            </div>
            <div className="footer__mid">
                <div className="help">
                    <h4>Need help?</h4>
                    <a href="#">Contact us</a>
                    <a href="#">How to shop on safe plaze</a>
                    <a href="#">How to report a product</a>
                </div>
                <div className="about">
                    <h4>About Safe plaze</h4>
                    <a href="#" className="about-us">About us</a>
                    <a href="#" className="tandc">Terms and conditions</a>
                    <a href="#" className="privacy">privacy policy</a>
                </div>
                <div className="social">
                    <h4>Join us</h4>
                    <a href="#" className="fb"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="tw"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="fb"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="fb"><i className="fab fa-telegram"></i></a>
                </div>
            </div>
            <div className="footer__bottom">
                All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
