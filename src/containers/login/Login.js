import React, { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Form, Button, Container, Row } from 'react-bootstrap';

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
      let isAuthenticated = localStorage.getItem('isAuthenticated');

      if(isAuthenticated) {
        navigate('/browse');
      }
    })

    useEffect(() => {
      if (!error.length) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [error]);
    useEffect(() => {
      if (email.length && password.length) {
        if (password.length < 5) {
          setError("Password > 5");
        } else {
          setError("");
        }
      } else {
        setError("all fields are required");
      }
    }, [email, password]);
    const handleChangeEmail = (e) => {
      setEmail(e.target.value);
    };
    const handleSubmit = async () => {
      
      // call api to check if user is logged in
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
        .then (response => {
          if (response.ok) {
            return response.json()
          }
          throw response;
        })
        .then(data => {
          let userData = {
            session_id: data.data.session.session_id,
            expires_at: data.data.session.expires_at,
            email: data.data.user.email,
            first_name: data.data.user.first_name,
            last_name: data.data.user.last_name
          };

          // set user data to local storage 
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('isAuthenticated', true);

          setTimeout(() => {
            navigate('/browse');
          }, 500)

        })  
        .catch(error => {
          console.log(error);
        })

      }

    return (
        <Container className="mt-5">
          <Row className="justify-content-md-center" md={3}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" disabled={buttonDisabled} onClick={handleSubmit}>
                Login
              </Button>
            </Form>
          </Row>
        </Container>
    );
}

export default Login