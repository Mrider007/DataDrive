
import React from 'react'
import Addfolder from './Addfolder';
import { useAuth } from '../context/AuthContext';
// import { useState,useEffect } from 'react';
import { db,auth } from '../Firebase';
import { Row,Col,Card,Container,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDb } from '../context/dbContext';
import './css/createFolder.css'




function CreateFolder() {
    // const [folderData,setFolderData] = useState({})
    // const [folder, setFolder] = useState([]);
    const {currentUser} = useAuth()
    const {folder} = useDb()
    const navigate = useNavigate()

    // console.log(folder[0])



    // useEffect(() => {
    //     db.collection('myfolder').onSnapshot(snapshot => {
    //         setFolder(snapshot.docs.map(doc => ({
    //             id: doc.id,
    //             data: doc.data()
    //         })))
    //         for (let i = 0; i < folder.length; i++) {
    //             setFolderData(folder[i]);
    //           }
    //     })
    // }, [])

    const handleDelete = (id) => {
        db.collection("myfolder").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        
    }

    function GoToFile(e){
        e.preventDefault();
        navigate(`/data`)
    }

    function signOut() {
        // Call the Firebase authentication API to sign out the user
        auth.signOut().then(() => {
          navigate("/")
        })

      }



  return (
    <>
    {/* <Navbar1/> */}
    <div className='main'>
        <div className='top'>
            <Row xs={2} md={4} lg={6}>
                <Col className='Add1'>
                    <Addfolder/>
                </Col>
                <Col className='btnOut'>
                <button className='rounded signout1 py-1 bg-danger px-2' onClick={signOut}>
              Signout
            </button>
                </Col>
            </Row>
        </div>
            <Container className='files my-4' >
                <Row>

                    {folder.map((folder) => {
                        return <Col className='files' key={folder.id}>
                            <Card className='file card hovertext1' key={folder.id} data-hover={`${folder.data.user}`} bg='secondary' style={{ width: '15rem' }} >
                               {/* <i class="fa-solid fa-folder"></i> */}
                                <Card.Body onClick={GoToFile}>
                                    <Card.Title>{folder.data.foldername}</Card.Title>
                                    <Card.Text>
                                        {new Date(folder.data.timestamp?.seconds * 1000).toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' })}<br></br>
                                        {/* {formatBytes(file.data.size)} */}
                                    </Card.Text>
                                     {/* <Button variant="success" className='btn1'><a download href={file.data.fileURL} target='_main' >Rename</a></Button> */}
                                </Card.Body>
                                    <Button variant="danger" className='btn2' onClick={() => { handleDelete(folder.id) }}>Delete</Button> 
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>

        </div>
    </>
  )
}

export default CreateFolder


 