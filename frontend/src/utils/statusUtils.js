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

export const getStatusBadgeAbonimi = (statusi) => {
  switch (statusi) {
    case "pritje":
      return "badge bg-secondary text-white";
    case "aktiv":
      return "badge bg-success text-white";
    case "suspenduar":
      return "badge bg-danger text-white";
    case "skaduar":
      return "badge bg-warning text-white";
    case "ndalur":
      return "badge bg-info text-white";
    default:
      return "badge bg-secondary text-white";
  }
};
