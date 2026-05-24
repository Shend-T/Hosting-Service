export const getStatusBadgeKlienti = (statusi) => {
  switch (statusi) {
    case "aktiv":
      return "badge bg-success text-white";
    case "jo-aktiv":
      return "badge bg-secondary text-white";
    case "suspenduar":
      return "badge bg-danger text-white";
    default:
      return "badge bg-secondary text-white";
  }
};

export const getStatusBadgePaketa = (statusi) => {
  switch (statusi) {
    case "aktiv":
      return "badge bg-success text-white";
    case "jo-aktiv":
      return "badge bg-secondary text-white";
    default:
      return "badge bg-secondary text-white";
  }
};
