import React, {useEffect, useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import "./Books.css";

function Books () {
    let userData = localStorage.getItem("userData");
    userData = JSON.parse(userData);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/api/books', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            }).then( response => {
              if (response.ok) {
                return response.json()
              }
              throw response;
            }).then( data => {
                setBooks(data.data.books);
            }).catch( error => {
              console.log(error.response);
            })
        }

        fetchData();
    }, []);

    let navigate = useNavigate();
    const handleOnClick = (link) => {
        // open link in a new tab
        window.open(link, '_blank');
    }
    return (
        <div className="container mt-5">
            {books.length ? (
                <div className="row mb-3">
                    {books.map((book, index) => {
                        return (
                            <div key={index} className="col-md-3 mr-3">
                                <Card className="mb-3">
                                    <Card.Img className="book-cover" variant="top" src={book.cover_url} />
                                    <Card.Body>
                                        <Card.Title>{book.title.slice(0,20).trim()}{book.title.length > 20 ? '...' : ''}</Card.Title>
                                        <Card.Text className="description">
                                            {book && book.description && book.description.length ? book.description.slice(0,150).trim() : ''}{book && book.description && book.description.length > 150 ? '...' : ''}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleOnClick(book.info_link)}>Read more</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
    




export default Books