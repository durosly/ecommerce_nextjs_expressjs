
async function loginHandler(data) {
    return fetch("/admin/login", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) })
}

export default loginHandler