// Settings.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'My Admin Panel',
    theme: 'dark',
    notifications: true,
    language: 'en'
  });

  const handleSave = () => {
    // Save settings logic
    alert('Settings saved successfully!');
  };

  return (
    <Container fluid>
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h2 className="mb-1 text-white" style={{ fontWeight: '600' }}>System Settings</h2>
              <p className="text-light mb-0">Manage your application settings and preferences</p>
            </div>
            <button className="d-flex p-2 button align-items-center gap-2" onClick={handleSave}>
              <i className="bi bi-check-circle"></i>
              Save Changes
            </button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="custom-card">
            <Card.Body className="p-4">
              <h5 className="text-white mb-4">General Settings</h5>
              
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-white">Site Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-white">Theme</Form.Label>
                      <Form.Select
                        value={settings.theme}
                        onChange={(e) => setSettings({...settings, theme: e.target.value})}
                        className="custom-input"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="auto">Auto</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-white">Language</Form.Label>
                      <Form.Select
                        value={settings.language}
                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                        className="custom-input"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Check
                  type="switch"
                  id="notifications-switch"
                  label="Enable Notifications"
                  checked={settings.notifications}
                  onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                  className="text-white mb-3"
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="custom-card">
            <Card.Body className="p-4">
              <h5 className="text-white mb-4">Account Settings</h5>
              <div className="d-grid gap-2">
                <button className="p-2 button">Change Password</button>
                <button className="p-2 button">Privacy Settings</button>
                <button className="p-2 button">Export Data</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;