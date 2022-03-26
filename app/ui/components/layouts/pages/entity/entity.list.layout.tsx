/**
 * Page layout & common methods for paginated entity lists.
 */

import { PropsWithChildren, useEffect, useState } from "react";
import { useEntity } from "../../../../../hooks/entity";
import { Pagable, Page } from "../../../../../types/pagable";
import { EntityListPageProps } from "../../../../../types/props/entity.props";

export function EntityListPage<T>(props: EntityListPageProps){
    const [page,setPage] = useState<Page>(props.page);
    const [next,setNext] = useState<Page|null>(null);
    const [prev,setPrev] = useState<Page|null>(null)
    const [pageData,setPageData] = useState<T[]>([]);
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
    const {
        fetchEntityPage,
        createEntity
    } = useEntity(props.entity);

    /**
     * Fetches page (list) data when the current page changes.
     */
    useEffect(()=>{
        setIsLoading(true);
        fetchEntityPage(page)
        .then(data=>{
            if(data.data){
                setPageData(data.data?.data as T[])
            }else{
                setPageData([]);
            }
        })
        .catch((error:Error) => {
            setError(error)
        })
        .finally(()=>setIsLoading(false))
    },[page])
    return (
        <>
            {/* Create Entity Control goes here */}
            {/* Child components are responsible for showing the entity items */}
            {pageData.map(item => {
                return props.children(item);
            })}
            {/* Pagination Controls Go here */}
        </>
    )
}