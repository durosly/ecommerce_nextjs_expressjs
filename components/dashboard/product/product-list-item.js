import commaNumber from 'comma-number'

function ProductListItem({ product }) {
    const { id, name, quantity, discount, price } = product
    let displayName = name
    if(name.length > 20) {
        displayName = name.slice(0, 20) + "..."
    }
    console.log(product)
    return (
        <tr>
            <td>{ displayName }</td>
            <td>{ commaNumber(price) }</td>
            <td>{ commaNumber(quantity) }</td>
            <td>{ discount }</td>
            <td>
                <a href={`/admin/products/${id}`} className="btn btn-rounded btn-light">view product</a>
            </td>
        </tr>
    )
}

export default ProductListItem