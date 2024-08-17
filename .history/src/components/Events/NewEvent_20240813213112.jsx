import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";

import { createNewEvent } from "../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
export default function NewEvent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //use useMutation to change/delete data at the backend
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      navigate("/events");
      queryClient.invalidateQueries({
        queryKey: ["events", { max: 4 }],
        refetchType: "none",
      }); //all query include 'events' key will be invalid and get re-executed
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={error.info?.message || "Error occurred. Try again later. "}
        />
      )}
    </Modal>
  );
}
