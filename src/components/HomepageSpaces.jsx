import { useSpaces } from "../contexts/SpacesContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import styles from "./HomepageSection.module.css";

function HomepageSpaces() {
  const { spaces } = useSpaces();
  const displayedSpaces = spaces.slice(0, 3);

  function getRandomColor() {
    // Limiter les valeurs pour éviter les couleurs trop flashy
    const min = 150;
    const max = 200;

    // Générer une valeur aléatoire entre min et max pour chaque composante
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convertir les valeurs RGB en hexadécimal
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");

    // Combiner les valeurs en une seule chaîne hexadécimale
    return `#${hexR}${hexG}${hexB}`;
  }

  return (
    <div className={styles.homepageSection}>
      <Link to="/spaces" className={styles.sectionTitle}>
        <h3>
          Spaces{" "}
          <FontAwesomeIcon icon={faFolder} style={{ marginLeft: "10px" }} />
        </h3>
      </Link>
      <div className={styles.homepageSpaces}>
        {displayedSpaces.length > 0 ? (
          displayedSpaces.map((space) => (
            <Link key={space.name} to={`/spaces/${space.name}`}>
              <div
                className={styles.space}
                style={{ backgroundColor: getRandomColor() }}
              >
                <h4>{space.name}</h4>
                <p>{space.amount.toFixed(2)}€</p>
              </div>
            </Link>
          ))
        ) : (
          <h4 className={styles.emptySectionMessage}>No space</h4>
        )}
      </div>
    </div>
  );
}

export default HomepageSpaces;
