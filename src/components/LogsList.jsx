import { Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useLogs } from "../contexts/LogsContext";

import styles from "./LogsList.module.css";

function LogsList() {
  const { logs } = useLogs();
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByType, setSortByType] = useState(false);
  const [sortByDescription, setSortByDescription] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState(logs);
  function handleSortByDate(e) {
    e.preventDefault();
    const sortedLogs = [...logs].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortByDate ? dateA - dateB : dateB - dateA;
    });
    setSortByDate(!sortByDate);
    setDisplayedLogs(sortedLogs);
  }

  function handleSortByType(e) {
    e.preventDefault();
    const sortedLogs = [...logs].sort((a, b) => {
      const typeA = a.type;
      const typeB = b.type;
      return sortByType
        ? typeB.localeCompare(typeA)
        : typeA.localeCompare(typeB);
    });
    setSortByType(!sortByType);
    setDisplayedLogs(sortedLogs);
  }

  function handleSortByDescription(e) {
    e.preventDefault();
    const sortedLogs = [...logs].sort((a, b) => {
      const descriptionA = a.description;
      const descriptionB = b.description;
      return sortByDescription
        ? descriptionB.localeCompare(descriptionA)
        : descriptionA.localeCompare(descriptionB);
    });
    setSortByDescription(!sortByDescription);
    setDisplayedLogs(sortedLogs);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={styles.logsList}>
      <h1>Account logs</h1>
      {displayedLogs.length > 0 ? (
        <table className="table table-dark table-striped table-bordered">
          <thead>
            <tr>
              <th onClick={handleSortByDate}>Date</th>
              <th onClick={handleSortByDescription}>Description</th>
              <th onClick={handleSortByType}>Type</th>
            </tr>
          </thead>
          <tbody>
            {displayedLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.date}</td>
                <td>{log.description}</td>
                <td>{capitalizeFirstLetter(log.type)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No logs available</p>
      )}
    </div>
  );
}

export default LogsList;