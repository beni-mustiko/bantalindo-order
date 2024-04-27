import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

export const getContacts = async (query?: string, currentPage?: number) => {
  const offset = (((currentPage)?currentPage:1) - 1) * ITEMS_PER_PAGE;
  try {
    return await prisma.contact.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch contacts from database: ${error}`);
  }
};

export const getContactById = async ({ id }: { id: string }) => {
  try {
    return await prisma.contact.findUnique({ where: { id } });
  } catch (error) {
    throw new Error(`Failed to fetch contacts from database: ${error}`);
  }
};

export const getContactPages = async (query?: string) => {
  try {
    const contacs = await prisma.contact.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(Number(contacs) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    throw new Error(`Failed to fetch contacts from database: ${error}`);
  }
};
