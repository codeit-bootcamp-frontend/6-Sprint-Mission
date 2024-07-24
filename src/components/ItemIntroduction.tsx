import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../api/apiClient';
import { favoriteIcon } from '../images';
import formatNumber from '../utils/formatNumber';

export default function ItemIntroduction({
  postedItems,
}: {
  postedItems: any;
}) {
  // userId state
  const [userId, setUserId] = useState<number | null>(null);
  // 수정을 위한 state
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState(postedItems.name);
  const [editDescription, setEditDescription] = useState(
    postedItems.description,
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const response = await axiosInstance.get('/users/me');
      setUserId(response.data.id);
    };
    fetchUserId();
  }, []);

  const updateProduct = useMutation({
    mutationFn: (productId: number) =>
      axiosInstance.patch(`/products/${productId}`, {
        name: editName,
        description: editDescription,
      }),
    onSuccess: () => {
      setIsEdit(false);
      /*
       * TODO : 현재 useLocation을 이용해서 state를 관리하고 있었기에 refetch 하기 위해 product fetch로직을 수정해야 해당 페이지에서 업데이트가 가능
       *        따라서, 리팩토링시 useFetchItems 로직을 수정하고 해당 mutation 로직을 해당 페이지에서 refetch할 수 있도록 수정할 것
       *        지금은 임시로 items 페이지로 이동하도록 수정함
       */
      navigate('/items');
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (productId: number) =>
      axiosInstance.delete(`/products/${productId}`),
  });

  const handleDelete = (id: number) => {
    deleteProduct.mutate(id);
    navigate('/items');
  };

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      updateProduct.mutate(id, {
        onSuccess: () => {
          setIsEdit(false);
        },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center sm:flex-row">
      <img
        src={postedItems.images[0]}
        alt={postedItems.name}
        className="h-[340px] w-[340px] rounded-2xl object-fill lg:h-[486px] lg:w-[486px]"
      />
      <div className="ml-6 mt-4 flex flex-grow flex-col sm:mt-0">
        <div className="flex items-center justify-between">
          {isEdit ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => handleEdit(e, postedItems.id)}
              className="border bg-[var(--cool-gray100)]"
            />
          ) : (
            <h1 className="text-xl font-semibold lg:text-2xl">
              {postedItems.name} 팔아요
            </h1>
          )}
          {postedItems.ownerId === userId && (
            <div className="flex gap-x-2">
              <button onClick={() => setIsEdit(true)}>수정</button>
              <button onClick={() => handleDelete(postedItems.id)}>삭제</button>
            </div>
          )}
        </div>
        <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
          {formatNumber(postedItems.price)} 원
        </h1>
        <hr className="my-4" />
        <p className="text-sm font-semibold">상품 소개</p>
        {isEdit ? (
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={(e) => handleEdit(e, postedItems.id)}
            className="border bg-[var(--cool-gray100)]"
          />
        ) : (
          <p className="mt-2">{postedItems.description}</p>
        )}
        <p className="mt-6">상품 태그</p>
        <div className="mt-3 flex flex-wrap gap-x-3">
          {postedItems.tags.map((tag: any, idx: number) => {
            return (
              <p key={idx}>
                <span className="flex gap-x-2 rounded-3xl bg-[var(--cool-gray50)] px-4 py-3">
                  #{tag}
                </span>
              </p>
            );
          })}
        </div>
        <div className="mt-6 flex w-fit cursor-default items-center justify-center gap-x-1 rounded-[35px] border px-3 py-1 lg:mt-auto">
          <img src={favoriteIcon} alt="favoriteicon" className="h-6 w-6" />
          <p>{postedItems.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}
