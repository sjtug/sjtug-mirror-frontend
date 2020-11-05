import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "./Navbar";
import { useRSSData } from "./utils";
import { LinkContainer } from "react-router-bootstrap";
import sortBy from "lodash/sortBy";
import find from "lodash/find";

import { useParams, Switch, Route } from "react-router-dom";

function DocsContent({ docs }) {
  const { title } = useParams();
  console.log(docs, title);
  const doc = find(docs, (doc) => doc.title === title) || {};
  return (
    <div>
      <h1>{title}</h1>
      <hr />
      <div
        className="mt-3"
        dangerouslySetInnerHTML={{ __html: doc.content || "" }}
      ></div>
    </div>
  );
}

function Docs() {
  const { data: docs_ } = useRSSData(
    "https://sjtug-portal-1251836446.file.myqcloud.com/tags/mirror-help/index.xml"
  );

  let docs = sortBy((docs_ || {}).items || [], "title");

  const navRows = docs.map((item) => (
    <LinkContainer to={`/docs/${item.title}`}>
      <Nav.Link>{item.title}</Nav.Link>
    </LinkContainer>
  ));

  return (
    <>
      <div className="bg-sjtug">
        <Navbar />
      </div>
      <Container className="my-3">
        <Row>
          <div className="col-3">
            <Nav className="flex-column" variant="pills">
              {navRows}
            </Nav>
          </div>
          <div className="col-9">
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
