"use client";

import { deleteContact } from "@/lib/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { IoAddSharp, IoPencil, IoTrashOutline } from "react-icons/io5";
import DeleteConfirmationPopup from "./deleteConfirmaitionPopup";

export const CreateButton = () => {
  return (
    <Link
      href="/create"
      className="inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 px-5 py-[9] rounded-sm text-sm"
    >
      <IoAddSharp size={20} />
      Tambah Order
    </Link>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/edit/${id}`} className="rounded-sm p-1 hover:bg-gray-100">
      <IoPencil size={20} />
    </Link>
  );
};

// export const DeleteButton = ({ id }: { id: string }) => {
//   const deleteContactWithId = deleteContact.bind(null, id);
//   return (
//     <form action={deleteContactWithId}>
//       <button className="rounded-sm border p-1 hover:bg-gray-100">
//         <IoTrashOutline size={20} />
//       </button>
//     </form>
//   );
// };

export const DeleteButton = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteContactWithId = deleteContact.bind(null, id);

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteContact.bind(null, id)();
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        className="rounded-sm p-1 hover:bg-gray-100"
      >
        <IoTrashOutline size={20} />
      </button>
      <DeleteConfirmationPopup
        isOpen={isOpen}
        onCancel={handleCancel}
        onDelete={handleDeleteConfirm}
        id={id}
      />
    </div>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  const className = clsx(
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
    {
      "opacity-50 cursor-progress": pending,
    }
  );
  return (
    <button type="submit" className={className} disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
