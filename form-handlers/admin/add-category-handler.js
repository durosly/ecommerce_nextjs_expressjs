
async function addCategoryHandler(data) {
    return fetch("/admin/category", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) })
}

export default addCategoryHandler