import { DeleteButton, EditButton } from "@/components/buttons";
import { getContacts } from "@/lib/data";
import { formatDate, isMoreThanSevenDays } from "@/lib/utils";

const ContactTable = async ({
  query,
  currentPage,
}: {
  query?: string;
  currentPage?: number;
}) => {
  const contacts = await getContacts(query, currentPage);

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Phone Number</th>
          <th className="py-3 px-6">Order</th>
          <th className="py-3 px-6">Created At</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(
          (
            contact: {
              createdAt: { toString: () => String };
              id: string;
              name: string;
              phone: string;
              order: string;
            },
            index: number
          ) => {
            return isMoreThanSevenDays(
              formatDate(contact.createdAt.toString())
            ) ? (
              <tr
                key={contact.id}
                className="bg-red-200 border-b text-slate-700"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{contact.name}</td>
                <td className="py-3 px-6">{contact.phone}</td>
                <td className="py-3 px-6">{contact.order}</td>
                <td className="py-3 px-6">
                  {formatDate(contact.createdAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <EditButton id={contact.id} />
                  <DeleteButton id={contact.id} />
                </td>
              </tr>
            ) : (
              <tr key={contact.id} className="bg-white border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{contact.name}</td>
                <td className="py-3 px-6">{contact.phone}</td>
                <td className="py-3 px-6">{contact.order}</td>
                <td className="py-3 px-6">
                  {formatDate(contact.createdAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <EditButton id={contact.id} />
                  <DeleteButton id={contact.id} />
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default ContactTable;
