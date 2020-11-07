import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import rocket from "./assets/sjtug_rocket.svg";
import logoText from "./assets/sjtug_text.svg";

export default function SJTUGNavBar() {
  return (
    <Navbar variant="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <span className="bg-sjtug d-block-inline py-1 pl-1 pr-2 rounded">
              <img
                height="30"
                className="d-inline-block align-top"
                alt="SJTUG Logo"
                src={rocket}
              />
              <img
                height="25"
                className="d-inline-block align-middle"
                alt="SJTUG"
                src={logoText}
              />
            </span>{" "}
            软件源镜像服务
          </Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  );
}
