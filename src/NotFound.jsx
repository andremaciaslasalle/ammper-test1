import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Página No Encontrada</h2>
          <p className="mb-4">Lo sentimos, la página que estás buscando no existe.</p>
          <Button variant="primary" onClick={handleGoBack}>Volver a Home</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;