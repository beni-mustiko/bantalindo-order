"use client";
import { SubmitButton } from "@/components/buttons";
import { UpdateContact } from "@/lib/actions";
import type { Contact } from "@prisma/client";
import { useFormState } from "react-dom";

const UpdateForm = ({ contact }: { contact: Contact }) => {
  const updateContactWithId = UpdateContact.bind(null, contact.id);
  const [state, formAction] = useFormState(updateContactWithId, null);

  return (
    <form action={formAction}>
      <div className="mb-5">
        <label htmlFor="name" className="block text-sm font-medium to-gray-500">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          defaultValue={contact.name}
        />

        {/* <div id="name-error" aria-live="polite" aria-atomic="true">
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state &&
            state["0"]?.path["0"] === "name" &&
            state["0"]?.message ? (
              <p className="mt-3 text-sm text-red-500">{state["0"].message}</p>
            ) : null}
          </div>
        </div> */}
      </div>
      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block text-sm font-medium to-gray-500"
        >
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone Number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          defaultValue={contact.phone}
        />
        <div id="phone-error" aria-live="polite" aria-atomic="true">
          {/* {state &&
            state.length > 0 &&
            state.some((error) => error.path.includes("phone")) && (
              <p className="mb-5 text-sm text-red-500">
                {state.find((error) => error.path.includes("phone")).message}
              </p>
            )} */}
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor="order"
          className="block text-sm font-medium to-gray-500"
        >
          Order
        </label>
        <input
          type="text"
          name="order"
          id="order"
          placeholder="Order"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          defaultValue={contact.order}
        />
        <div id="phone-error" aria-live="polite" aria-atomic="true">
          {/* {state &&
            state.length > 0 &&
            state.some((error) => error.path.includes("order")) && (
              <p className="mb-5 text-sm text-red-500">
                {state.find((error) => error.path.includes("order")).message}
              </p>
            )} */}
        </div>
      </div>
      <SubmitButton label="update" />
    </form>
  );
};

export default UpdateForm;
