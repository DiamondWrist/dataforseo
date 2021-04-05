import React, { useState } from "react";
import { Form, Button, Container, Table } from "react-bootstrap";
import axios from "axios";

function SearchScreen() {
  const [searchSystem, setSearchSystem] = useState("Google");
  const [region, setRegion] = useState("United States");
  const [keyword, setKeyword] = useState([]);
  const [resp, setResp] = useState([]);

  const onSearchSystemChange = (e) => {
    setSearchSystem(e.target.value);
  };

  const onRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const onKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      search_system: searchSystem,
      region: region,
      keyword: keyword,
    };
    axios
      .post("http://127.0.0.1:8000/api/create_task/", data)
      .then((res) => setResp(JSON.parse(res.request.response)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="search-form">
      <h1>Create Task</h1>
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
          <Form.Group controlId="formRegion">
            <Form.Label>Select Region</Form.Label>
            <Form.Control
              as="select"
              value={region}
              required
              onChange={onRegionChange}
            >
              <option>United States</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formKeyword">
            <Form.Control
              type="text"
              placeholder="Enter your keyword"
              value={keyword}
              onChange={onKeywordChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {resp.length <= 0 ? null : (
          <div className="resp-div">
            <h1>Task created!</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>ID</th>
                  <th>SE</th>
                  <th>Language</th>
                  <th>Location</th>
                  <th>Keyword</th>
                  <th>Tag</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{resp.time}</td>
                  <td>{resp.tasks[0].id}</td>
                  <td>{resp.tasks[0].data.se}</td>
                  <td>{resp.tasks[0].data.language_name}</td>
                  <td>{resp.tasks[0].data.location_name}</td>
                  <td>{resp.tasks[0].data.keyword}</td>
                  <td>{resp.tasks[0].data.tag}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
}

export default SearchScreen;
