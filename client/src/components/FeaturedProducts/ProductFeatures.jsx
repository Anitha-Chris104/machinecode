import { CheckCircle2 } from "lucide-react";

const ProductFeatures = ({ features }) => {
  return (
    <div className="mt-8 space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <CheckCircle2 size={20} className="text-orange-500 shrink-0" />

          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductFeatures;
