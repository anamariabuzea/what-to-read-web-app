import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row } from 'react-bootstrap';

const Register = (props) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
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
          setError("Password must have at least 5 characters");
        } else {
          setError("");
        }
      } else {
        setError("All fields are required");
      }
    }, [email, password]);

    useEffect(() => {
      if (firstName.length && lastName.length) {
        if (firstName.length < 3) {
          setError("First name must have at least 3 characters");
        } else {
          setError("");
        }
      } else {
        setError("All fields are required");
      }
    }, [firstName, lastName]);

    useEffect(() => {
      if (password.value && passwordConfirmation.value) {
        if (password.value !== passwordConfirmation.value) {
          setError("Passwords don't match")
        }
      } 
    }, [password, passwordConfirmation]);
    
    const handleChangeFirstName = (e) => {
      setFirstName(e.target.value);
    };

    const handleChangeLastName = (e) => {
      setLastName(e.target.value);
    }

    const handleChangeEmail = (e) => {
      setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };

    const handleChangePasswordConfirmation = (e) => {
      setPasswordConfirmation(e.target.value);
    };

    const handleSubmit = async () => {

      // register api call
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
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
            first_name: data.data.user.first_name,
            last_name: data.data.user.last_name,
            email: data.data.user.email,
          };

          // set user data to local storage 
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("isAuthenticated", true);
          
          setTimeout(() => {
            navigate("/browse");
          }, 500)
        })
        .catch(error => {
          console.log(error.response);
        })
    };

    useEffect(() => {
      if (!error.length) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [error]);
    

  return (
    <Container className="mt-5">
          <Row className="justify-content-md-center" md={3}>
            <Form>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={handleChangeFirstName} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={handleChangeLastName} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="passwordConfirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" placeholder="Password confirmation" value={passwordConfirmation} onChange={handleChangePasswordConfirmation} />
              </Form.Group>

              <Button variant="primary" disabled={buttonDisabled} onClick={handleSubmit}>
                Register
              </Button>
            </Form>
          </Row>
        </Container>
  )
}

export default Register