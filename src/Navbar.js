import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

export default function SJTUGNavBar() {
  return (
    <Navbar variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>SJTUG 软件源镜像服务</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <LinkContainer to="/docs">
            <Nav.Link>帮助文档</Nav.Link>
          </LinkContainer>
          <Nav.Link href="https://sjtug.org">SJTUG 主页</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
