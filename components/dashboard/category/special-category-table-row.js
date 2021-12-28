import { useState } from 'react'
import moment from 'moment'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'
import { updateSpecialCategory, removeFromSpecialCategories } from '../../../features/dashboard/dashboardSlice'
import Loader from 'react-loader-spinner'

function SpecialCategoryTableRow({ position, category }) {
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [isDoubleClicked, setIsDoubleClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const { title, createdAt, id } = category
    const [newTitle, setNewTitle] = useState(title)
    async function handleBlur() {
        if(isDeleting) {
            addToast("Processing. Please, wait", { appearance: "warning" })
            return
        }
        setIsDoubleClicked(false)
        setIsLoading(true)
        try {
            const response = await fetch("/admin/special-category", { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ title, newTitle, id }) })
            const data = await response.json()

            if(data.status) {
                addToast(data.message, { appearance: "success" })
                dispatch(updateSpecialCategory({ id, newTitle }))
                setIsLoading(false)
            } else {
                throw new Error("Something went wrong updating category")
            }

        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsLoading(false)
            setNewTitle(title)
        }
    }

    async function handleDelete() {
        if(isLoading) {
            addToast("Processing. Please, wait", { appearance: "warning" })
            return
        }

        if(!confirm("Are you sure you want to delete categories?")) return

        setIsDeleting(true)

        try {
            const response = await fetch("/admin/special-category", { method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id }) })
            const data = await response.json()

            if(data.status) {
                dispatch(removeFromSpecialCategories( id ))
                addToast(data.message, { appearance: "success" })
            } else {
                throw new Error("Something went wrong deleting category")
            }

        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsDeleting(false)
        }

    }

    return (
        <tr>
            <th scope="row">{ position }</th>
            <td onDoubleClick={() => setIsDoubleClicked(true)}>{ 
                isLoading ? (
                    <span>updating...</span>
                ) : (
                    
                    isDoubleClicked ? (
                        <input 
                            onBlur={handleBlur} 
                            type="text" 
                            name="title" 
                            value={newTitle} 
                            onChange={e => setNewTitle(e.target.value)} 
                        />
                    ) : (
                        <span>{ title }</span>
                    )
                )
            }</td>
            <td>{ moment(createdAt).format("DD/MM/YYYY") }</td>
            <td onClick={handleDelete}>
                {
                    isDeleting ? (
                        <Loader type="Oval" color="#000" height={16} />
                    ) : (
                        <i className="ti-trash"></i>
                    )
                }
            </td>
        </tr>
    )
}

export default SpecialCategoryTableRow