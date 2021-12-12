import { useState } from 'react'

function SubscribeFrom () {
    const [email, setEmail] = useState("")

    return (
        <>
            <h4 className="footer__top-right--title">new to safe plaze</h4>
            <span className="footer__top-right--desc">Subscribe to our newsletter to get market updates.</span>
            <form action="/subscribe" className="subscribe-form">
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Enter E-mail address" 
                    className="subscribe-form__input" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="subscribe-form__submit-btn">Subscribe</button>
            </form>
        </>
    )
}

export default SubscribeFrom