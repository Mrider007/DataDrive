import { createContext,useContext,useEffect,useState } from "react";
import { db } from "../Firebase";
import firebase from "firebase";




export const dbContext = createContext();

export function useDb(){
    return useContext(dbContext)
}

// Create a Firestore context provider
export const FirestoreProvider = ({ children }) => {
  const db = firebase.firestore();
  const [folders, setFolders] = useState([]);
  // const [files, setFiles] = useState([]);
    // const [folderData,setFolderData] = useState({})



  //for folder 
  useEffect(() => {
    const aFolders = [];
    db.collection('myfolder').onSnapshot(snapshot => {
        snapshot.docs.map(doc => (
          aFolders.push({
            id: doc.id,
            data: doc.data()
          })
        ))
        setFolders(aFolders);
      })
    
    //for files
    // const collectionRef = db.collection('myfolder');
    //     collectionRef.get().then((querySnapshot) => {
    //         // console.log(querySnapshot)
    //         const mapValues = [];
    //         querySnapshot.forEach((doc) => {
    //             const data = doc.data();
    //             const bigFiles = data.bigFiles;
    //             const mapValue = [...bigFiles]; // sab files add karna hai
    //             mapValues.push(mapValue);
    //         });
    //         // console.log('Map values:', mapValues);
    //         setFiles(...mapValues)
    //     }).catch((error) => {
    //         console.log('Error getting documents:', error);
    //     });

  }, [db])





// console.log(files)
  const value ={
    db,
    folders,
    // folderData,
    // files
  }

  return (
    <dbContext.Provider value={value}>
      {children}
    </dbContext.Provider>
  );
};