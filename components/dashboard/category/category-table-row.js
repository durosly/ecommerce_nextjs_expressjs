import { useState } from 'react'
import moment from 'moment'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'
import { updateCategory, removeFromCategories } from '../../../features/dashboard/dashboardSlice'
import Loader from 'react-loader-spinner'

function CategoryTableRow({ position, category }) {
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [isDoubleClicked, setIsDoubleClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const { name, createdAt, id } = category
    const [newName, setNewName] = useState(name)
    async function handleBlur() {
        if(isDeleting) {
            addToast("Processing. Please, wait", { appearance: "warning" })
            return
        }
        setIsDoubleClicked(false)
        setIsLoading(true)
        try {
            const response = await fetch("/admin/category", { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ name, newName, id }) })
            const data = await response.json()

            if(data.status) {
                addToast(data.message, { appearance: "success" })
                dispatch(updateCategory({ id, newName }))
                setIsLoading(false)
            } else {
                throw new Error("Something went wrong updating category")
            }

        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsLoading(false)
            setNewName(name)
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
            const response = await fetch("/admin/category", { method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id }) })
            const data = await response.json()

            if(data.status) {
                dispatch(removeFromCategories( id ))
                addToast(data.message, { appearance: "success" })
            } else {
                throw new Error("Something went wrong updating category")
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
                            name="name" 
                            value={newName} 
                            onChange={e => setNewName(e.target.value)} 
                        />
                    ) : (
                        <span>{ name }</span>
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

export default CategoryTableRow