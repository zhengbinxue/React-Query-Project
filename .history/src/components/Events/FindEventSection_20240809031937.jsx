import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
export default function FindEventSection() {
  const searchElement = useRef();


  useQuery({queryKey:,queryFn:()=>{}})

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      <p>Please enter a search term and to find events.</p>
    </section>
  );
}
