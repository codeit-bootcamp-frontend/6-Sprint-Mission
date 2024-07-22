import { deleteFavorite, favorite, getFavoriteStatus } from "@/lib/api/product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useFavoriteButton = (path: string, id: string) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["favoriteStatus", path, id],
    queryFn: () => getFavoriteStatus(path, id),
  });

  const favoriteCount = data?.favoriteCount ?? 0;
  const isFavorite = data?.isFavorite ?? false;

  const likesMutation = useMutation({
    mutationFn: async ({ userAction }: { userAction: "LIKE" | "UNLIKE" }) => {
      if (userAction === "LIKE") {
        await favorite(path, id);
      } else {
        await deleteFavorite(path, id);
      }
    },
    onMutate: async ({ userAction }: { userAction: "LIKE" | "UNLIKE" }) => {
      await queryClient.cancelQueries({
        queryKey: ["favoriteStatus", path, id],
      });

      const prevLikeStatus = queryClient.getQueryData<{
        favoriteCount: number;
        isFavorite: boolean;
      }>(["favoriteStatus", path, id]);

      queryClient.setQueryData(
        ["favoriteStatus", path, id],
        (prev: { favoriteCount: number; isFavorite: boolean } | undefined) => {
          if (!prev) return prevLikeStatus;
          return userAction === "LIKE"
            ? {
                ...prev,
                favoriteCount: prev.favoriteCount + 1,
                isFavorite: true,
              }
            : {
                ...prev,
                favoriteCount: prev.favoriteCount - 1,
                isFavorite: false,
              };
        },
      );

      return { prevLikeStatus };
    },
    onError: (
      err,
      { userAction }: { userAction: "LIKE" | "UNLIKE" },
      context: any,
    ) => {
      if (context?.prevLikeStatus) {
        queryClient.setQueryData(
          ["favoriteStatus", path, id],
          context.prevLikeStatus,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteStatus", path, id],
      });
    },
  });

  const handleLikeButtonClick = (userAction: "LIKE" | "UNLIKE") => {
    likesMutation.mutate({
      userAction,
    });
  };

  return { favoriteCount, isFavorite, handleLikeButtonClick };
};

export default useFavoriteButton;
