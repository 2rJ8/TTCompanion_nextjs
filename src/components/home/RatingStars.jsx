import { Star } from "lucide-react";

export default function RatingStars({ count = 5, label }) {
  const accessibleLabel = label || `${count} estrellas de ${count}`;

  return (
    <span className="star-rating" role="img" aria-label={accessibleLabel}>
      {Array.from({ length: count }, (_, index) => (
        <Star
          key={index}
          className="icon--sm"
          fill="currentColor"
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
