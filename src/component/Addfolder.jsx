import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage, db } from '../Firebase';
import firebase from "firebase"
import { useAuth } from '../context/AuthContext';



function Addfolder() {
    const [show, setShow] = useState(false);
    const [folderName, setFolderName] = useState("");
    const {currentUser,PublicFolderName} = useAuth()
    // const [folders,setFolders] = useState(null)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e)=>{
        setFolderName(e.target.value)

    }
    // const handleChange1 = (e)=>{
    //     setFolders(e.target.folder[0])

    // }

    const handleCreate = (e)=>{
        e.preventDefault();
        setShow(false);
    
        storage.ref(`${folderName}/${folderName}`).put(folderName).then(snapshot => {
          storage.ref(`${folderName}`).child(folderName).getDownloadURL().then(url => {
            db.collection("myfolder").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              foldername: `${folderName}`,
              fURL:url,
              user: `${currentUser.displayName}`,
              // Folderpath:path,
              bigFiles:[]
            })
            // PublicFolderName();
            setFolderName(null);
    
          })
        })
        console.log('success')
    }



  return (
    <>
     <Button variant="success" onClick={handleShow}>
        <b>+</b>Add Folder
      </Button>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a folder</Modal.Title>
        </Modal.Header>
        <Modal.Body><input type='text' onChange={handleChange} value={folderName} required /></Modal.Body>
        {/* <Modal.Body><input type='file' onChange={handleChange1}/></Modal.Body> */}
        <Modal.Footer>
          <button className='btn' variant='success' onClick={handleCreate}>
            Create
          </button>
          <Button className='btn' variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Addfolder