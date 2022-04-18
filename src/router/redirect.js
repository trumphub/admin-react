import { Navigate, useLocation } from "react-router-dom"

export default function Redirect() {
    const location = useLocation()
    return <Navigate to="/login" replace state={{ from: location }} />
}
