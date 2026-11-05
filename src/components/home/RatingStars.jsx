import { Star } from "lucide-react";

export default function RatingStars({ count = 5, label }) {
  return (
    <span className="star-rating" aria-label={label}>
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
