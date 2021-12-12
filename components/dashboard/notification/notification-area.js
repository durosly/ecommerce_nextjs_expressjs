
function NotificationArea() {
    return (
        <ul className="notification-area pull-right">
            <li id="full-view">
                <i className="ti-fullscreen"></i>
            </li>
            <li id="full-view-exit"><i className="ti-zoom-out"></i></li>
            <li className="dropdown">
                <i className="ti-bell dropdown-toggle" data-toggle="dropdown">
                    <span>2</span>
                </i>
                <div className="dropdown-menu bell-notify-box notify-box">
                    <span className="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                    <div className="nofity-list">
                        <a href="#" className="notify-item">
                            <div className="notify-thumb"><i className="ti-key btn-danger"></i></div>
                            <div className="notify-text">
                                <p>You have Changed Your Password</p>
                                <span>Just Now</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb"><i className="ti-comments-smiley btn-info"></i></div>
                            <div className="notify-text">
                                <p>New Commetns On Post</p>
                                <span>30 Seconds ago</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb"><i className="ti-key btn-primary"></i></div>
                            <div className="notify-text">
                                <p>Some special like you</p>
                                <span>Just Now</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb"><i className="ti-comments-smiley btn-info"></i></div>
                            <div className="notify-text">
                                <p>New Commetns On Post</p>
                                <span>30 Seconds ago</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb"><i className="ti-key btn-primary"></i></div>
                            <div className="notify-text">
                                <p>Some special like you</p>
                                <span>Just Now</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb"><i className="ti-key btn-danger"></i></div>
                            <div className="notify-text">
                                <p>You have Changed Your Password</p>
                                <span>Just Now</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb"><i className="ti-key btn-danger"></i></div>
                            <div className="notify-text">
                                <p>You have Changed Your Password</p>
                                <span>Just Now</span>
                            </div>
                        </a>
                    </div>
                </div>
            </li>
            <li className="dropdown">
                <i className="fa fa-envelope dropdown-toggle" data-toggle="dropdown"><span>3</span></i>
                <div className="dropdown-menu notify-box nt-enveloper-box">
                    <span className="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                    <div className="nofity-list">
                        <a href="#" className="notify-item">
                            <div className="notify-thumb">
                                <img src="/admin/assets/images/author/author-img1.jpg" alt="image" />
                            </div>
                            <div className="notify-text">
                                <p>Aglae Mayer</p>
                                <span className="msg">Hey I am waiting for you...</span>
                                <span>3:15 PM</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb">
                                <img src="/admin/assets/images/author/author-img2.jpg" alt="image" />
                            </div>
                            <div className="notify-text">
                                <p>Aglae Mayer</p>
                                <span className="msg">When you can connect with me...</span>
                                <span>3:15 PM</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb">
                                <img src="/admin/assets/images/author/author-img3.jpg" alt="image" />
                            </div>
                            <div className="notify-text">
                                <p>Aglae Mayer</p>
                                <span className="msg">I missed you so much...</span>
                                <span>3:15 PM</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb">
                                <img src="/admin/assets/images/author/author-img4.jpg" alt="image" />
                            </div>
                            <div className="notify-text">
                                <p>Aglae Mayer</p>
                                <span className="msg">Your product is completely Ready...</span>
                                <span>3:15 PM</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb">
                                <img src="/admin/assets/images/author/author-img2.jpg" alt="image" />
                            </div>
                            <div className="notify-text">
                                <p>Aglae Mayer</p>
                                <span className="msg">Hey I am waiting for you...</span>
                                <span>3:15 PM</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb">
                                <img src="/admin/assets/images/author/author-img1.jpg" alt="image" />
                            </div>
                            <div className="notify-text">
                                <p>Aglae Mayer</p>
                                <span className="msg">Hey I am waiting for you...</span>
                                <span>3:15 PM</span>
                            </div>
                        </a>
                        <a href="#" className="notify-item">
                            <div className="notify-thumb">
                                <img src="/admin/assets/images/author/author-img3.jpg" alt="image" />
                            </div>
                            <div className="notify-text">
                                <p>Aglae Mayer</p>
                                <span className="msg">Hey I am waiting for you...</span>
                                <span>3:15 PM</span>
                            </div>
                        </a>
                    </div>
                </div>
            </li>
            <li className="settings-btn">
                <i className="ti-settings"></i>
            </li>
        </ul>
    )
}

export default NotificationArea