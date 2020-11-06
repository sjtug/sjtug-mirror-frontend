import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "./Navbar";
import { useMirrorHelp } from "./utils";
import { LinkContainer } from "react-router-bootstrap";
import sortBy from "lodash/sortBy";
import find from "lodash/find";
import "./Docs.scss";

import { useParams, Switch, Route } from "react-router-dom";

function DocsContent({ docs }) {
  const { title } = useParams();
  const doc = find(docs, (doc) => doc.title === title) || {};
  return (
    <div className="sjtug-docs">
      <h1>{title}</h1>
      <div
        className="mt-3"
        dangerouslySetInnerHTML={{ __html: doc.content || "" }}
      ></div>
    </div>
  );
}

function Docs() {
  const { data: docs_ } = useMirrorHelp();
  let docs = sortBy((docs_ || {}).items || [], "title");

  const navRows = docs.map((item) => (
    <LinkContainer to={`/docs/${item.title}`}>
      <Nav.Link>{item.title}</Nav.Link>
    </LinkContainer>
  ));

  return (
    <>
      <Navbar />

      <Container className="my-5">
        <Row>
          <div className="col-md-3 d-none d-md-block">
            <Nav className="flex-column docs-sjtug" variant="pills">
              {navRows}
            </Nav>
          </div>
          <div className="col-md-9">
            <Switch>
              <Route path="/docs/:title+">
                <DocsContent docs={docs} />
              </Route>
            </Switch>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Docs;
