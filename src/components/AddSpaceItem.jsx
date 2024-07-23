import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SpaceForm from "./SpaceForm";

import styles from "./AddSpaceItem.module.css";

function AddSpaceItem() {
  return (
    <Container>
      <Row>
        <Col sm={12} md={10} lg={8}>
          <div className={styles.spaceItem}>
            <h2>
              <span className={styles.icon}>+</span> New space
            </h2>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddSpaceItem;
