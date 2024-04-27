export const formatDate = (dateStr: String) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const isMoreThanSevenDays = (createdDate: string) => {
  // Parse the created date
  var parts = createdDate.split(" ");
  var day = parseInt(parts[0], 10);
  var monthStr = parts[1];
  var year = parseInt(parts[2], 10);

  // Map month names to month numbers
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var month = monthNames.indexOf(monthStr);

  // Create a Date object with the created date
  var createdDateObj = new Date(year, month, day);

  // Get today's date
  var today = new Date();

  // Calculate the difference in milliseconds between today and the created date
  var timeDiff = today.getTime() - createdDateObj.getTime();

  // Calculate the difference in days
  var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Check if the difference is more than 7 days
  var isMoreThanSevenDays = daysDiff > 7;

  return isMoreThanSevenDays;
};
