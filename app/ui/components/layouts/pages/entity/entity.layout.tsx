/**
 * Page layout & common methods for a single entity
 */

import React, { useEffect, useState } from "react";
import { useEntity } from "../../../../../hooks/entity";
import { SingleEntityPageProps } from "../../../../../types/props/entity.props";
import { Footer } from "../../../modules/Footer";
import { FullScreenLoader } from "../../../modules/loader";
import { Nav } from "../../../modules/Navigation";

export function EntityPage<T>(props: SingleEntityPageProps<T>) {
  /**
   * Entity Data fetched from server based on the id and entity type.
   */
  const [entityData, setEntityData] = useState<T | null>(null);
  /**
   * Use this to check any errors thrown inside the entity hook
   * to handle appropriate redirection. Feedbacks are handled
   * within the hook. try not to show feedback components here.
   */
  const [error, setError] = useState<Error | null>(null);
  /**
   * Indicates whether fetching data from the server is still in
   * progress or not. Is set to true upon success or failure.
   */
  const [isLoading, setIsLoading] = useState(true);
  /**
   * forces reloading entity data
   */
  const [shouldForceRefresh, setShouldForceRefresh] = useState(false);
  const { checkEntityPerms, deleteEntity, updateEntity, fetchEntity } =
    useEntity(props.entity);

  /**
   * Loads entity data upon initial render & subsequent updates.
   */
  useEffect(() => {
    if (props.id) {
      setIsLoading(true);
      fetchEntity(props.entity + "-" + props.id)
        .then((d) => {
          if (d && d.data && d.data.data) {
            setEntityData(d.data.data as T);
          } else {
            setEntityData(null);
          }
        })
        .catch((error: Error) => setError(error))
        .finally(() => {
          setIsLoading(false)
        });
    }
  }, [props,shouldForceRefresh]);

  const forceRefresh = () => {
    setShouldForceRefresh(!shouldForceRefresh);
  }

  if (entityData && !isLoading) {
    return (
      /* Child components are responsible for showing entity data  */
      <>
        {props.children({data:entityData,forceRefresh})}
      </>
    );
  } else if (error && !isLoading) {
    return <p>Error</p>;
  } else {
    return <FullScreenLoader />;
  }
}
