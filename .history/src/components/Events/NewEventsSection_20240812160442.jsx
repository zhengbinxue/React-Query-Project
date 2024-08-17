import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../util/http.js";

export default function NewEventsSection() {
  //use useQuery to get data from backend
  const { data, isPending, isError, error } = useQuery({
    //change of Key and Fn will cause useQuery to re-execute
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 10000000,
    //default staleTime is 0,React Query will not cache the data at all.
    //Every time the component is rendered,
    //it will send a request to the server to fetch the latest data.
  });

  let content;
  console.log("hello");
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
