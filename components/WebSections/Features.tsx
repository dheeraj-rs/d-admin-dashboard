"use client";

interface Feature {
  title: string;
  description: string;
}

interface FeaturesProps {
  title?: string;
  features?: Feature[];
}

export function Features({ title = "Our Features", features = [] }: FeaturesProps) {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}