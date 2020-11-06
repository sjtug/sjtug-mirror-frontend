import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import rocket from "./assets/sjtug_rocket.svg";

export default function SJTUGNavBar() {
  return (
    <Navbar variant="dark" className="bg-sjtug">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-white">
            <img
              height="30"
              className="d-inline-block align-top"
              alt="SJTUG Logo"
              src={rocket}
            />{" "}
            SJTUG 软件源镜像服务
          </Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  );
}
