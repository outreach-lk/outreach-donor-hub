/**
 * Page layout & common methods for paginated entity lists.
 */

import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Wrap,
} from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { useEntity } from "../../../../../hooks/entity";
import { Pagable, Page } from "../../../../../types/pagable";
import { EntityListPageProps } from "../../../../../types/props/entity.props";
import { NoItemsCallForAction } from "../../../elements/no-items";
import { Footer } from "../../../modules/Footer";
import { FullScreenLoader } from "../../../modules/loader";
import { Nav } from "../../../modules/Navigation";

export function EntityListPage<T>(props: EntityListPageProps) {
  const initPage: Page = {
    limit: 3,
    start: 0,
  };
  const [page, setPage] = useState<Page>(props.page || initPage);
  const [queryChanged, setQueryChanged] = useState(false);
  const [next, setNext] = useState<Page | null>(null);
  const [prev, setPrev] = useState<Page | null>(null);
  const [pageData, setPageData] = useState<T[]>([]);
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
  const { fetchEntityPage, createEntity } = useEntity(props.entity);

  /**
   * Fetches page (list) data when the current page changes.
   */
  useEffect(() => {
    setIsLoading(true);
    fetchEntityPage(page, props.query)
      .then((data) => {
        if (data.data?.data.length) {
          if (props.replace || queryChanged) {
            setPageData([...(data.data?.data as T[])]);
          } else {
            setPageData([...pageData, ...(data.data?.data as T[])]);
          }
        } else if (queryChanged) {
          setPageData([]);
        } else {
          setPageData([...pageData]);
        }
      })
      .catch((error: Error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
        setQueryChanged(false);
      });
  }, [page]);

  useEffect(() => {
    if (props.page) {
      setPage(props.page);
    }
  }, [props.page]);

  useEffect(() => {
    setQueryChanged(true);
  }, [props.query]);

  /**
   * sets page to load next page
   */
  const loadNextPage = () => {
    const _nxtPg: Page = {
      limit: page.limit,
      start: (pageData[pageData.length - 1] as any)._id as string,
    };
    console.log(_nxtPg);
    setPage(_nxtPg);
  };
  if (props.raw) {
    return (
      <>
        {pageData.map((item, i) => {
          return props.children(item);
        })}
      </>
    );
  }
  return (
    <>
      {!props.isEmbedded && <Nav />}
      <Container alignItems="flex-start" minW={props.width || "auto"}>
        {/* Show full screen loader */}
        {(isLoading && !pageData.length) && <FullScreenLoader/>}
        {pageData.length && 
          <>
          <Flex direction={"column"}>
            {pageData.map((item, i) => {
              return <div key={i}>{props.children(item)}</div>;
            })}
          </Flex>
          {isLoading && props.showFullScreenLoader && <FullScreenLoader/>}
          <Center p="12">
            {/* Pagination Controls Go here */}
            <Button isLoading={isLoading} onClick={loadNextPage}>
              Load More
            </Button>
          </Center>
        </>
        }
      </Container>
      {!props.isEmbedded && <Footer />}
    </>
  );
}
