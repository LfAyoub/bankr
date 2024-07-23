import ExpensesGraph from "./ExpensesGraph";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import styles from "./HomepageSection.module.css";

function HomepageGraph() {
  return (
    <div className={styles.homepageSection}>
      <Link to="/graph" className={styles.sectionTitle}>
        <h3>
          Account analysis
          <FontAwesomeIcon icon={faChartLine} style={{ marginLeft: "10px" }} />
        </h3>
      </Link>
      <ExpensesGraph page="homepage" />
    </div>
  );
}

export default HomepageGraph;
