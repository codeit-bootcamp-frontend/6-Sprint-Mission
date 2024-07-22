"use client";

import {
  ItemDetailSection,
  ItemCommentSection,
} from "@/components/PageComponents/items";
import { getProductDetail } from "@/lib/api/product";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = encodeURIComponent(params.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const productData = data ?? {};

  return (
    <div className="h-auto p-24">
      <ItemDetailSection data={productData} />
      <ItemCommentSection />
    </div>
  );
};

export default Page;
