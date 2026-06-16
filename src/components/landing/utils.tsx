import type { Testimonial } from "@/components/landing/data";

export const D = ({ text }: { text: string }) => <>{text}</>;

export function groupTestimonialsByColumns(testimonials: Testimonial[]) {
  const columns: Testimonial[][] = [[], [], []];
  testimonials.forEach((item, index) => columns[index % 3].push(item));
  return columns;
}
