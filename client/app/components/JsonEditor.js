"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, notification, Spin, Collapse } from "antd";

const { Panel } = Collapse;

const JsonEditor = () => {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJsonData();
  }, []);

  const fetchJsonData = async () => {
    try {
      const response = await axios.get("/api/get-json");
      setJsonData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setJsonData({
      ...jsonData,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/update-json", jsonData);
      notification.success({
        message: "Success",
        description: "JSON data updated successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error updating JSON data",
      });
    }
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formatBody = (body) => {
    try {
      return JSON.stringify(JSON.parse(body), null, 2);
    } catch (e) {
      return body;
    }
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Collapse accordion>
        {jsonData.resources
          .filter(
            (resource) => resource.type === "MockRoute" && resource.method
          )
          .map((resource, index) => (
            <Panel
              header={`${resource.method.toUpperCase()} ${resource.name}`}
              key={index}
            >
              <Form.Item label="Data Type" key={`dataType-${index}`}>
                <Input value={resource.type} readOnly />
              </Form.Item>
              <Form.Item
                label="Example Response"
                key={`exampleResponse-${index}`}
              >
                <Input.TextArea
                  value={formatBody(resource.body)}
                  readOnly
                  autoSize
                />
              </Form.Item>
              {resource.headers.map((header) => (
                <Form.Item
                  label={`Header: ${header.name}`}
                  key={`header-${header.id}-${index}`}
                >
                  <Input value={header.value} readOnly />
                </Form.Item>
              ))}
            </Panel>
          ))}
      </Collapse>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JsonEditor;
