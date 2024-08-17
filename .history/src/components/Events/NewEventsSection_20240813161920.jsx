import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../util/http.js";

export default function NewEventsSection() {
  //use useQuery to get data from backend
  const { data, isPending, isError, error } = useQuery({
    //change of Key and Fn will cause useQuery to re-execute
    queryKey: ["events", { max: 4 }],
    //f one component changes the shared cached data, all components using the same queryKey will be immediately affected, and the data will be updated synchronously. The other component will re-render immediately due to the change in the cached data to reflect the latest data.

    queryFn: ({ signal, queryKey }) =>
      fetchEvents({
        signal,
        ...queryKey[1],
      }),
    //staleTime controls whether the queryFn should be called.
    //If the data is considered fresh within the staleTime period,
    //the queryFn will not be called; after staleTime expires,
    //the queryFn will be called to fetch the latest data.
    staleTime: 10000000,
    //default staleTime is 0,React Query will not cache the data at all.
    //Every time the component is rendered,
    //it will send a request to the server to fetch the latest data.
  });

  let content;
  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
