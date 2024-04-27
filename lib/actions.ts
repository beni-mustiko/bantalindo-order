// "use server";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, { message: "Cannot be empty" }),
  phone: z.string().min(11, { message: "Must be 11 or more characters long" }),
  order: z.string().min(1, { message: "Cannot be empty" }),
});

export const saveContact = async (_prevState: any, params: FormData) => {
  const validation = ContactSchema.safeParse({
    name: params.get("name"),
    phone: params.get("phone"),
    order: params.get("order"),
  });

  if (validation.success) {
    try {
      await prisma?.contact.create({
        data: {
          name: validation.data.name,
          phone: validation.data.phone,
          order: validation.data.order,
        },
      });
    } catch (error) {
      return { message: `Failed to save contact to database: ${error}` };
    }

    revalidatePath("/");
    redirect("/");
  } else {
    return validation.error.errors;
  }
};

export const UpdateContact = async (
  id: string,
  _prevState: any,
  params: FormData
) => {
  const validation = ContactSchema.safeParse({
    name: params.get("name"),
    phone: params.get("phone"),
    order: params.get("order"),
  });

  if (validation.success) {
    try {
      await prisma?.contact.update({
        data: {
          name: validation.data.name,
          phone: validation.data.phone,
          order: validation.data.order,
        },
        where: { id },
      });
    } catch (error) {
      return { message: `Failed to update contact to database: ${error}` };
    }

    revalidatePath("/");
    redirect("/");
  } else {
    return validation.error.errors;
  }
};

export const deleteContact = async (id: string) => {
  try {
    await prisma?.contact.delete({
      where: { id },
    });
  } catch (error) {
    return { message: `Failed to delete contact to database: ${error}` };
  }

  revalidatePath("/contacts");
};
