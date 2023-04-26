import { createContext,useContext,useEffect,useState } from "react";
import { db } from "../Firebase";
import firebase from "firebase";


export const fileContext = createContext();

export function useFile(){
return useContext(fileContext)
}

export const FileProvider = ({children}) =>{
    const db = firebase.firestore();
    const [files, setFiles] = useState([]);


// console.log(files)
    
useEffect(() => {
    // db.collection('myfolder').onSnapshot(snapshot => {
    //     setFolder(snapshot.docs.map(doc => ({
    //         id: doc.id,
    //         data: doc.data()
    //     })))
    // })
  
  
  
    //for files
    const collectionRef = db.collection('myfolder');
        collectionRef.get().then((querySnapshot) => {
            // console.log(querySnapshot)
            const mapValues = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const bigFiles = data.bigFiles;
                const mapValue = [...bigFiles]; // sab files add karna hai
                mapValues.push(...mapValue);
            });
            // console.log('Map values:', mapValues);
            setFiles(mapValues)
        }).catch((error) => {
            console.log('Error getting documents:', error);
        });
  
  }, [])
  

const value = {
db,
files

}


    return 
    <fileContext.Provider value={value}>
        {children}
    </fileContext.Provider>
}