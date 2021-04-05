import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

function DetailResultScreen({ match }) {
  const [resp, setResp] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/tasks_ready?id=${match.params.id}&search=${match.params.search}`
      );
      setResp(data);
      //   console.log(data);
    }

    fetchProduct();
  }, []);

  return (
    <div className="result-form">
      <h1>Task Detail</h1>
      <Container>
        {resp.length <= 0 ? (
          <h1>No data. Please try again later!</h1>
        ) : (
          <div className="resp-div">
            <h1>Detailed Results for {resp.tasks[0].id}</h1>
            {resp.tasks[0].result != null ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Status Code</th>
                    <th>Status Message</th>
                    <th>Keyword</th>
                    <th>Language Name</th>
                    <th>Location Name</th>
                    <th>SE</th>
                    <th>Datetime</th>
                    <th>Items Count</th>
                    <th>Check Url</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{resp.status_code}</td>
                    <td>{resp.status_message}</td>
                    <td>{resp.tasks[0].data.keyword}</td>
                    <td>{resp.tasks[0].data.language_name}</td>
                    <td>{resp.tasks[0].data.location_name}</td>
                    <td>{resp.tasks[0].data.se}</td>
                    <td>{resp.tasks[0].result[0].datetime}</td>
                    <td>{resp.tasks[0].result[0].items_count}</td>
                    <td>
                      <a href={resp.tasks[0].result[0].check_url}>Check URL</a>
                    </td>
                  </tr>
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

export default DetailResultScreen;
