import React from 'react';
import { Link } from "react-router-dom";

import './footer.styles.css';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-navigation">
                    <div className="row">
                        <div className="col-md-3">
                            <h3>Product</h3>
                            <p>
                                <Link to="/domain-search">Domain Search</Link>
                            </p>
                            <p>
                                <Link to="/email-finder">Email Finder</Link>
                            </p>
                            <p>
                                <Link to="/author-finder">
                                    Author Finder
                                    <span className="new-label">New</span>
                                </Link>
                            </p>
                            <p>
                                <Link to="/email-verifier">Email Verifier</Link>
                            </p>
                            <p>
                                <Link to="/bulks">Bulk tasks</Link>
                            </p>
                            <p>
                                <Link to="/cold-email-campaigns">Campaigns</Link>
                            </p>
                            <p>
                                <Link to="/api">API</Link>
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h3>Add-ons</h3>
                            <p>
                                <Link to="/chrome">Chrome extension</Link>
                            </p>
                            <p>
                                <Link to="/firefox">Firefox add-on</Link>
                            </p>
                            <p>
                                <Link to="/sheets">Google Sheets add-on</Link>
                            </p>
                            <p>
                                <Link to="/integrations">CRM integrations</Link>
                            </p>
                            <p>
                                <Link to="/mailtracker">MailTracker</Link>
                            </p>
                            <p>
                                <Link to="/techlookup">TechLookup</Link>
                            </p>
                            <p>
                                <Link to="/templates">Templates</Link>
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h3>Company</h3>
                            <p>
                                <Link to="/about">About</Link>
                            </p>
                            <p>
                                <Link to="/our-data">Our data</Link>
                            </p>
                            <p>
                                <Link to="/blog">Blog</Link>
                            </p>
                            <p>
                                <Link to="/engineering">Engineering Blog</Link>
                            </p>
                            <p>
                                <Link to="/affiliate-program">Affiliate Program</Link>
                            </p>
                            <p>
                                <Link to="/press">Press resources</Link>
                            </p>
                        </div>
                        <div className="col-md-3">
                            <div className="phones-footer">
                                <h3>Support</h3>
                                <p>
                                    <Link to="/contact">Contact us</Link>
                                </p>
                                <p>
                                    <Link to="https://help.hunter.io">Help Center</Link>
                                </p>
                                <p>
                                    <Link to="/claim">Claim</Link>
                                </p>
                                <p>
                                    <Link to="/security-bounty-program">Bug Bounty</Link>
                                </p>
                                <p>
                                    <Link data-controller="uptime-status" data-uptime-status-connected-value="false" to="https://status.hunter.io" target="_blank">
                                        <span className="status-color-dot up" data-uptime-status-target="dot"></span>
                                        <span className="status-color-description" data-uptime-status-target="description">All Systems Operational</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="social-icons">
                    <Link className="fab fa-twitter" to="#" target="_blank"></Link>
                    <Link className="fab fa-facebook-square" to="#" target="_blank"></Link>
                    <Link className="fab fa-linkedin" to="#" target="_blank"></Link>
                    <Link className="fab fa-youtube" to="#" target="_blank"></Link>
                    <Link className="fab fa-github" to="#" target="_blank"></Link>
                </div>
                <div className="legal-mentions">
                    <hr />
                    © 2020-2021 All Rights Reserved. IntelligenSe is a registered trademark of IntelligenSe.
                    <div className="visible-x visible-sm"></div>
                    <div className="legal-links">
                        <Link to="/terms-of-service">Terms</Link>
                        <span className="separator hidden-xs">•</span>
                        <div className="visible-xs"></div>
                        <Link to="/privacy-policy">Privacy</Link>
                        <span className="separator hidden-xs">•</span>
                        <div className="visible-xs"></div>
                        <Link to="/security-policy">Security</Link>
                        <div className="visible-xs"></div>
                        <span className="separator hidden-xs">•</span>
                        <Link to="/claim?ref=donotsell">Do Not Sell My Info</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
