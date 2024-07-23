import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./SpaceItem.module.css";

function SpaceItem({ space }) {
  return (
    <Container>
      <Row>
        <Col sm={12} md={10} lg={8}>
          <Link to={`${space.name}`}>
            <div
              className={styles.spaceItem}
              style={{
                backgroundImage: `url(${space.name.toLowerCase()}.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundFilter: "brightness(0.0)",
              }}
            >
              <div className={styles.spaceText}>
                <h2>{space.name}</h2>
                <p>{space.amount.toFixed(2)}€</p>
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default SpaceItem;
