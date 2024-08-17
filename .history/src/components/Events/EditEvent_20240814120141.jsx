import {
  Link,
  //redirect,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchEvent, updateEvent } from "../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../util/http.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const submit = useSubmit();

  const { data, isPending, isError, error } = useQuery({
    //waits until the component has finished rendering, and then it executes the queryFn function in the background.
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    staleTime: 1000000,
  });

  const { mutate } = useMutation({
    //The mutationFn function is not executed immediately when you call useMutation.
    //You need to provide a mutationFn function to useMutation in order to get the mutate property
    // The mutationFn function itself is not executed until you call the mutate function.
    mutationFn: updateEvent,
    //get the data from mutate automatically
    //onMutate is executed when the mutation is triggered,
    //which in this case is when the handleSubmit function is called.
    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      const prevEvent = queryClient.setQueryData(["events", id]);
      queryClient.setQueryData(["events", id], newEvent);
      return { prevEvent };
    },

    onError: (error, data, context) => {
      //context contains the data returned from onMutate
      queryClient.setQueryData(["events", id], context.prevEvent);
    },
    //get executed whenever the mutatioFn is done executing and no matter it succeed or failed
    onSettled: () => {
      queryClient.invalidateQueries(["events", id]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate("../");
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event."
          message={error.info?.message || "Failed to load event."}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export async function loader({ params }) {
  queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

//alternative useMutate method

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const updatedEventData = Object.fromEntries(formData);
//   await updateEvent({ id: params.id, event: updatedEventData });
//   await queryClient.invalidateQueries(["events"]);
//   return redirect("../");
// }
