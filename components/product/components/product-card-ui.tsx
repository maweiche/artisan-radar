// components/ProductCard.tsx

import Link from "next/link";

type ProductCardProps = {
  name: string;
  price: string;
  imageUrl: string;
};

const ProductCard = ({ name, price, imageUrl }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-3.5 flex border-gray flex-col justify-between">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-auto object-contain mb-4 rounded-2xl bg-gray"
      />
      <div className="flex justify-between items-center">
        <div>
          <Link href={"/product"}>
            <h3 className="text-md text-black font-semibold font-urban">
              {name}
            </h3>
          </Link>
          <p className="text-gray-500 flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="0.53125"
                width="7.88045"
                height="7.88045"
                rx="1.12578"
                fill="#D9D9D9"
              />
              <rect
                x="9.00641"
                y="0.53125"
                width="7.88045"
                height="7.88045"
                rx="1.12578"
                fill="black"
              />
              <rect
                x="0.000183105"
                y="9.53906"
                width="7.88045"
                height="7.88045"
                rx="1.12578"
                fill="#D9D9D9"
              />
              <rect
                x="9.00641"
                y="9.53906"
                width="7.88045"
                height="7.88045"
                rx="1.12578"
                fill="#D9D9D9"
              />
            </svg>
            Starting from {price}
          </p>
        </div>
        <Link href={"/product"} className="bg-black text-white px-4 py-2 rounded-2xl">
          Collect
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
