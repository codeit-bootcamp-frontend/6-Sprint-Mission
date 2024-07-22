"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // 보통 SSR에서는 staleTime을 0 이상으로 해줌으로써
          // 클라이언트 사이드에서 바로 다시 데이터를 refetch 하는 것을 피한다.
          refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 refetch
          refetchOnMount: false, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
          retry: 1, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// 'use client'를 추가.
// Next.JS App router는 기본적으로 서버 컴포넌트지만, 리액트쿼리는 QueryClientProvider를 비롯해 서버 컴포넌트에서는 작동하지 않음.

// useState로 new QueryClient 생성
// 참조 동일성을 유지하고 React에서 예상대로 상태를 관리하는 데 도움돼 useState로 생성. 자세한 설명은 아래 참고 글에

// defaultOptions 설정
// 서버 비용을 줄이기 위해 refetch 설정을 건들여줌

// 만든 queryClient를 QueryClientProvider 컴포넌트의 client에 넣어줌

// 만든 QueryClientProvider를 작성 후 children도 작성

// (선택) Devtool인 ReactQueryDevtools도 작성해줌

// 참고: 왜 queryClient 설정에 useState를?
// useState를 활용하는 것은 React Query의 QueryClientProvider 설정에서 특별한 경우의 선택이라 할 수 있다. useState를 적용하면 참조 동일성을 유지하며, 또한 React Query와 React가 예상하는 상태 관리를 조절하고, 컴포넌트 렌더링과 상태 업데이트를 조절하기 위함이다.
// 이에 대한 몇 가지 이유는 다음과 같다.

// 초기 렌더링 중 설정: React Query는 초기 렌더링 동안에 QueryClient를 설정하고 사용하기 위한 상태를 필요로 한다.
// 초기 렌더링 동안에만 실행되는 함수를 제공하면 Lazy 초기 상태(Lazy initial state)를 활용해 초기 렌더링 동안에만 QueryClient를 생성하고, 이후에는 참조 동일성을 유지한다. 이것은 초기 설정을 효율적으로 관리하는 방법 중 하나다.

// 동적 설정 관리: QueryClientProvider의 설정을 동적으로 변경해야 할 때, useState를 활용해 QueryClient를 상태로 관리하는 것이 유용하다.
// 동적으로 설정을 변경하려면 상태를 업데이트하고 그 변경을 QueryClientProvider에 적용하면 된다.

// 컴포넌트 렌더링과 분리: QueryClientProvider의 설정을 컴포넌트 수명주기와 연관해서 관리하고자 할 때 useState를 사용할 수 있다.
// 이렇게 하면 컴포넌트가 마운트되거나 언마운트될 때 설정을 업데이트하고 관리할 수 있다.

// 최적화와 관련해, React Query는 참조 동일성을 유지하게 하는 초기 설정을 처리하려 한다. 이렇게 하면 초기 설정을 최적화하고 상태를 효율적으로 관리할 수 있다. 또한, React Query는 렌더링 성능과 데이터 캐싱에 대한 다양한 최적화를 제공하므로, 이러한 최적화를 활용해 웹 애플리케이션의 성능을 향상시킬 수 있다.
