"use client";

import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import { useRouter } from "next/navigation";
import ItemDetailCard from "@/components/Item/ItemDetailCard";
import { userAtom } from "@/recoil/atoms/UserAtom";
import { deleteProduct } from "@/lib/api/product";
import { useRecoilValue } from "recoil";

const ItemDetailSection = ({ data }: { data: Item }) => {
  const { id: productId, ownerId } = data;
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useRecoilValue(userAtom);

  const router = useRouter();

  const deleteItem = async () => {
    await deleteProduct(productId.toString());
    router.replace("/items");
  };

  // 본인 게시글인지 판단하는 useEffect
  useEffect(() => {
    if (user && ownerId.toString() == user.id) {
      setIsOwner(true);
    } else setIsOwner(false);
  }, [user]);

  return (
    <div className="mb-40">
      <ItemDetailCard data={data} />
      {isOwner && <Button onClick={deleteItem}>삭제</Button>}
    </div>
  );
};

export default ItemDetailSection;
