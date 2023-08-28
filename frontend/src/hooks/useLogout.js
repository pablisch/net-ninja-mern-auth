import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  
  const logout = () => {
    // remove token from local storage
    localStorage.removeItem('user')
    
    // update the auth context
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}