export function getLastActive(timestamp) {
  if (!timestamp) return "";

  const inputDate = new Date(timestamp);
  const now = new Date();

  const diffMs = now - inputDate;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Seconds
  if (seconds < 60) {
    return "Just now";
  }

  // Minutes
  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  }

  // Hours
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  // Days
  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  // Weeks
  if (weeks < 4) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  // Months
  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  // Years
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
