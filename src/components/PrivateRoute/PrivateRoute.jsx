import React, { Children, useEffect, useState } from 'react'
import {supabase} from "../../config/supabase.js"
import { Navigate } from 'react-router-dom'



const PrivateRoute = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkUser = async () => {
            const { data: {user} } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        checkUser()
    }, [])
    
    if (loading) return <div>Loading...</div>
    
    if (!user) return <Navigate to="/" replace></Navigate>
    
    return children
}

export default PrivateRoute