import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchWorkouts } = useWorkoutsContext()
  
  const logout = () => {
    // remove token from local storage
    localStorage.removeItem('user')
    
    // update the auth context
    dispatch({ type: 'LOGOUT' })

    // update the workouts context
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}