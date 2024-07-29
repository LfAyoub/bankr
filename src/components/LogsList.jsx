import { Button, Col } from "react-bootstrap";
import { useState } from "react";
import { useLogs } from "../contexts/LogsContext";

import styles from "./LogsList.module.css";

function LogsList() {
  const { logs } = useLogs();
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByType, setSortByType] = useState(false);
  const [sortByDescription, setSortByDescription] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState(logs);
  const [logsNumber, setLogsNumber] = useState(6);
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

  function showMore() {
    setLogsNumber(logsNumber + 6);
  }

  return (
    <div className={styles.logsList}>
      {displayedLogs.length > 0 ? (
        <>
          <table className="table table-dark table-striped table-bordered">
            <thead>
              <tr>
                <th onClick={handleSortByDate}>Date</th>
                <th onClick={handleSortByDescription}>Description</th>
                <th onClick={handleSortByType}>Type</th>
              </tr>
            </thead>
            <tbody>
              {displayedLogs.slice(0, logsNumber).map((log, index) => (
                <tr key={index}>
                  <td>{log.date}</td>
                  <td>{log.description}</td>
                  <td>{capitalizeFirstLetter(log.type)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Col className="mx-auto">
            {logsNumber <= displayedLogs.length ? (
              <Button variant="secondary" onClick={showMore}>
                Show more
              </Button>
            ) : null}
          </Col>
        </>
      ) : (
        <p>No logs available</p>
      )}
    </div>
  );
}

export default LogsList;
