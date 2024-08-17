import { Link, Outlet } from "react-router-dom";

import Header from "../Header.jsx";
import EventsIntroSection from "./EventsIntroSection.jsx";
import FindEventSection from "./FindEventSection.jsx";
import NewEventsSection from "./NewEventsSection.jsx";

export default function Events() {
  console.log("events");
  return (
    <>
      <Header>
        <Link to="/events/new" className="button">
          New Event
        </Link>
      </Header>
      <main>
        <EventsIntroSection />
        <NewEventsSection />
        <FindEventSection />
      </main>
      <Outlet />
    </>
  );
}