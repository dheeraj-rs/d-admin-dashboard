"use client";

interface Testimonial {
  author: string;
  text: string;
}

interface TestimonialsProps {
  title?: string;
  testimonials?: Testimonial[];
}

export function Testimonials({ 
  title = "What Our Customers Say",
  testimonials = []
}: TestimonialsProps) {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 rounded-lg border">
            <p className="text-lg mb-4">&ldquo;{testimonial.text}&rdquo;</p>
            <p className="font-semibold">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}