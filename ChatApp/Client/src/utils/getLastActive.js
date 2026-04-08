export function getLastActive(date) {
  if (!date) return;

  const inputDate = new Date(date);
  const now = new Date();

  const diffMs = now - inputDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) return 'Just now';
    else if (diffHours <= 24) return `${diffHours} hours ago`;
    return 'Today';
  }

  if (diffDays === 1) {
    return 'Yesterday';
  }

  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  const weeks = Math.floor(diffDays / 7);

  if (weeks === 1) {
    return 'A week ago';
  }

  if (weeks < 4) {
    return `${weeks} weeks ago`;
  }

  const months = Math.floor(diffDays / 30);

  if (months === 1) {
    return 'A month ago';
  }

  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(diffDays / 365);

  if (years === 1) {
    return 'A year ago';
  }

  return `${years} years ago`;
}
