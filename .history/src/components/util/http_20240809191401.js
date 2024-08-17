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

export async function createNewEvent(eventData) {
  const response = await fetch('http://localhost:3000/events', {
    method: 'POST',
    body: JSON.stringify(eventData);
    headers: {
      'Content-Type':'application/json'
    }
  })

  if (!response.ok) {
    const error = new Error('')
  }


}