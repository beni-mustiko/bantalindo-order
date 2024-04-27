function DeleteConfirmationPopup({ isOpen, onCancel, onDelete, id }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="absolute inset-0 bg-gray-900 opacity-50 "></div>
      <div className="relative bg-white p-10 rounded-lg shadow-lg">
        <p className="text-lg mb-4">
          Yakin ingin menghapus data dengan id {id}?
        </p>
        <div className="flex justify-center">
          <button
            onClick={onCancel}
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
