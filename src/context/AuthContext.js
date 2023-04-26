import React, { useContext, useEffect, useState, createContext } from 'react'
import { auth } from '../Firebase'
import firebase from "firebase"






const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState({})
    const [loading,setLoading] = useState(true)
    // const [FolderName,setFolderName] = useState('')
    // const [Folder, setFolder] = useState([]);






    useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged(user=>{
           setCurrentUser(user)
        setLoading(false)
        })

        return unsubscribe
    },[])

  console.log(currentUser.id)
    

    function signOut() {
        // Call the Firebase authentication API to sign out the user
        auth.signOut().then(() => {
        });
      }
      

    const value ={
        currentUser,
        signOut,
        // FolderName,
    }

  return (
  <>
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  </>
  )
}
