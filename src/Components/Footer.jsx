export default function Footer(){
    return(
        <div id="footerSection">
            <div id="footerLinkBox">
                <div className="footerColumns">
                    <p className="footerTitle">Company</p>
                    <p className="footerElement">About</p>
                    <p className="footerElement">Careers</p>
                    <p className="footerElement">Brand Center</p>
                    <p className="footerElement">Blog</p>
                </div>
                <div className="footerColumns">
                    <p className="footerTitle">Help Center</p>
                    <p className="footerElement">Discord Server</p>
                    <p className="footerElement">Twitter</p>
                    <p className="footerElement">Facebook</p>
                    <p className="footerElement">Contact Us</p>
                </div>
                <div className="footerColumns">
                    <p className="footerTitle">Legal</p>
                    <p className="footerElement">Privacy Policy</p>
                    <p className="footerElement">Licensing</p>
                    <p className="footerElement">Terms & Conditions</p>
                </div>
                <div className="footerColumns">
                    <p className="footerTitle">Download</p>
                    <p className="footerElement">iOS</p>
                    <p className="footerElement">Android</p>
                    <p className="footerElement">Windows</p>
                    <p className="footerElement">MacOS</p>
                </div>
            </div>
            <div id="footerBottom">
                <div id="Logo">
                    <p id="logoText">BookNest&#169;</p>
                </div>
                <div id="SocialBox">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-github"></i>
                </div>
            </div>
        </div>
    );
}