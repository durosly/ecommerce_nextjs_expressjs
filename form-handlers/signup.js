

async function signupHandler(data) {
    return fetch("/user/signup", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) })
}

export default signupHandler