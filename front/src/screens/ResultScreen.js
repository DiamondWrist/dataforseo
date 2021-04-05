import React, { useState } from "react";
import { Form, Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

function ResultScreen() {
  const [searchSystem, setSearchSystem] = useState("Google");
  const [resp, setResp] = useState([]);

  const onSearchSystemChange = (e) => {
    setSearchSystem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://127.0.0.1:8000/api/tasks_ready?search_system=${searchSystem}`
      )
      .then((res) => setResp(JSON.parse(res.request.response)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="result-form">
      <h1>Tasks Result</h1>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSearchSystem">
            <Form.Label>Select Search System</Form.Label>
            <Form.Control
              as="select"
              value={searchSystem}
              required
              onChange={onSearchSystemChange}
            >
              <option>Google</option>
              <option>Bing</option>
              <option>Yahoo</option>
              <option>Yandex</option>
              <option>Baidu</option>
              <option>Naver</option>
            </Form.Control>
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {resp.length <= 0 ? null : (
          <div className="resp-div">
            <h1>Results for {searchSystem} Search</h1>
            {resp.tasks[0].result != null ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>SE</th>
                    <th>Date Posted</th>
                    <th>Tag</th>
                    <th>Endpoint Regular</th>
                  </tr>
                </thead>
                <tbody>
                  {resp.tasks[0].result.map((rslt) => (
                    <tr key={rslt.id}>
                      <LinkContainer
                        target="_blank"
                        to={`/result/${rslt.id}/${rslt.se}`}
                      >
                        <td className="td-link">{rslt.id}</td>
                      </LinkContainer>
                      <td>{rslt.se}</td>
                      <td>{rslt.date_posted}</td>
                      <td>{rslt.tag}</td>
                      <td>{rslt.endpoint_regular}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h1>Not found! Please create task!</h1>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default ResultScreen;
