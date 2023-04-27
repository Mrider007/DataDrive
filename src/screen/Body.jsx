import React from 'react'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Breadcrumb } from 'react-bootstrap';
import '../screen/body.css';
import Add from '../component/Add';
import '../component/card.css'
import { db, storage } from '../Firebase';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { auth } from '../Firebase';
import firebase from 'firebase';
// import { useFile } from '../context/fileContext';
// import Addfolder from '../component/Addfolder';



function Body() {
    const [files, setFiles] = useState([]);
    const Navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        // get the firestore reference for the Folder ID coming from URL
        const FolderRef = db.collection("myfolder").doc(location.search.substring(1));
        // read the doc and set the files details
        FolderRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setFiles(doc.data().bigFiles ? doc.data().bigFiles : []);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    }, [location.search])

    function signOut() {
        // Call the Firebase authentication API to sign out the user
        auth.signOut().then(() => {
            Navigate("/")
        })

    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i];
    }

    // const handleDelete = (id) => {
    //     const docRef = db.collection('myfolder').doc(id).delete()

    //     return docRef.update({
    //         [bigFiles]: firebase.firestore.FieldValue.delete()
    //     });
    // }

    function GoBack(e) {
        e.preventDefault();
        Navigate("/home")
    }


    return (
        <div className='main'>
            <div className='top'>
                <Button onClick={GoBack}>Back</Button>
                <Row className=''>
                    <Col className='back'>
                    </Col>
                    <Col className='Add p-4'>
                        <Add />
                    </Col>
                </Row>
                <div>
                    <Row className='' xs={2} md={4} lg={6}>
                        <Col className='px-4'>
                            <button className='rounded signout py-1 px-2 bg-danger' style={{ color: 'white' }} onClick={signOut}>
                                Signout
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
            <Container className='files'>
                <Row>

                    {files.map((files) => {
                        return <Col className='files' key={files.id}>
                            <Card key={files.data} className='file card hovertext' data-hover={files.user} bg='secondary' style={{ width: '15rem' }} >
                                <Card.Img variant="top" src={files.fileURL} style={{ height: '8rem', objectFit: 'contain' }} />
                                <Card.Body>
                                    <Card.Title>{files.filename}</Card.Title>
                                    <Card.Text>
                                        {/* {new Date(files.data.timestamp?.seconds * 1000).toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' })}<br></br> */}
                                        {formatBytes(`${files.size}`)}
                                    </Card.Text>
                                    <Button variant="success" className='btn1'><a download href={files.fileURL} target='_main' >Download</a></Button>
                                    {/* <Button variant="danger" className='btn2' onClick={() => { handleDelete(files.id) }}>Delete</Button> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>

        </div>
    )
}

export default Body