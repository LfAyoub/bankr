import SpaceItem from "./SpaceItem";
import AddSpaceItem from "./AddSpaceItem";
import { SpacesProvider, useSpaces } from "../contexts/SpacesContext";
import { Link } from "react-router-dom";

import styles from "./SpacesList.module.css";

function SpacesList() {
  const { spaces } = useSpaces();

  return (
    <div className={styles.spacesList}>
      <SpacesProvider>
        {spaces.map((space) => (
          <SpaceItem key={space.name} space={space} />
        ))}
        <Link to="new">
          <AddSpaceItem />
        </Link>
      </SpacesProvider>
    </div>
  );
}

export default SpacesList;
