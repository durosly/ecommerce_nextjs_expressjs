import Loader from 'react-loader-spinner'
import useToggleCartStatus from "../../hooks/useToggleCartStatus"

function ProductDetailsAction({ id }) {
    const { inCart, isLoading, handleCartSubmit } = useToggleCartStatus(id)

    return (
        <form onSubmit={handleCartSubmit} className="product-action">
            <button disabled={isLoading} className="product-action__btn--cart" type="submit">
                {
                    isLoading ? (
                        <>
                            <Loader type='TailSpin' height={10} />
                            <span>Loading...</span>
                        </>
                        
                    ) : (

                        inCart ? (
                            <>
                                <i className="fas fa-trash"></i>
                                &nbsp;
                                Remove
                            </>
                        ) : (
                            <>
                                <i className="fas fa-cart-plus"></i>
                                &nbsp;
                                Add
                            </>
                        )
                    )
                }
            </button>
        </form>
    )
}

export default ProductDetailsAction