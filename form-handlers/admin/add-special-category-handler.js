
async function addSpecialCategoryHandler(data) {
    return fetch("/admin/special-category", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) })
}

export default addSpecialCategoryHandler