import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../hooks/path'
import { Context } from '../../context/Context'

const Home = () => {
    const navigate = useNavigate()
    const {token} = useContext(Context)
    useEffect(() => {
        navigate(token ? paths.products : paths.login)
    }, [token])

    return ""
}

export default Home