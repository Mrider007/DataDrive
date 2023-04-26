import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage, db } from '../Firebase';
import firebase from "firebase"
import { useAuth } from '../context/AuthContext';
import { useDb } from '../context/dbContext';



function Add() {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState([]);

  const {currentUser} = useAuth()
  // const {folder} = useDb()

  // const folders = []
  // const value = [...folder]
  // folders.push(value)
 
  // console.log(folderData)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{

    db.collection('myfolder').onSnapshot(snapshot => {
      setFolder(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
      })))
  });

  },[])

  
  
  
  
  
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
  const handleUpload = (event) => {
    event.preventDefault();
    setShow(false);
    
    folder.forEach((item)=>{
      // console.log(item.data.foldername)
      const folderName = item.data.foldername
      // console.log(item.id)
      const folderId = item.id

      storage.ref(`${folderName}/${file.name}`).put(file).then(snapshot => {
        storage.ref(`${folderName}`).child(file.name).getDownloadURL().then(url => {
  
  
          const docRef = db.collection('myfolder').doc(`${folderId}`);
           docRef.update({
            bigFiles: firebase.firestore.FieldValue.arrayUnion({
              filename: file.name,
              fileURL: url,
              size: snapshot._delegate.bytesTransferred,
              user: `${currentUser.displayName}`,
              id:db.collection("myfolder").doc().id
            })
          }).then(() => {
            console.log('file uploaded')
          }).catch((error) => {
            console.error('Error updating document: ', error);
          });
  
          setFile(null);
  
        })
      })
  
    })


  }


  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <b>+</b>Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload a file</Modal.Title>
        </Modal.Header>
        <Modal.Body><input type='file' multiple onChange={handleChange} /></Modal.Body>
        <Modal.Footer>
          <button className='btn' variant='success' onClick={handleUpload}>
            Upload
          </button>
          <Button className='btn' variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add