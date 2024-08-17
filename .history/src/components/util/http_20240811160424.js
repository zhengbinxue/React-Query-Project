export async function fetchEvents({ searchTerm, signal }) {
  console.log(searchTerm);
  console.log(signal);

  let url = "http://localhost:3000/events";
  if (searchTerm) {
    url += "?search=" + searchTerm;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });
  console.log(id);
  console.log(response);

  if (!response.ok) {
    const error = new Error();
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
}

export async function deleteEvent({ id }) {
  console.log(id);
  const response = fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error();
    error.code = error.status;
    error.info = await response.json();
    return error;
  }
  return await response.json();
}

export async function createNewEvent(eventData) {
  console.log(eventData);
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch("http://localhost:3000/events/images", {
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();
  return images;
}
