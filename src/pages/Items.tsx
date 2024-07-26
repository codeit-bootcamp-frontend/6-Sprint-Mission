/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { BestProductList, ProductList, Pagination } from '../components'
import { getProducts, getBestProducts } from '../api/api'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import icon_search from '../assets/icon_search.png'
import icon_order from '../assets/icon_order.png'
import icon_dropdown from '../assets/icon_dropdown.png'

type Products = {
  id: string
  name: string
  images: string[]
  price: number
  favoriteCount: number
  createdAt: string
}

function Items() {
  const selectOptions = [
    { value: 'createdAt', label: '최신순' },
    { value: 'favoriteCount', label: '좋아요순' },
  ]

  const [order, setOrder] = useState(selectOptions[0].value)
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10)
  const [bestProductsPerPage, setBestProductsPerPage] = useState(4)
  const [isDropdownView, setDropdownView] = useState(false)

  const navigate = useNavigate()
  const goToAddItem = () => {
    navigate('/additem')
  }

  const sortProducts = (products: Products[], order: string) => {
    if (order === 'favoriteCount') {
      return products.sort((a, b) => b.favoriteCount - a.favoriteCount)
    } else {
      return products.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      )
    }
  }

  const { data: products = [], refetch: refetchProducts } = useQuery({
    queryKey: ['products', order, keyword], //order와 keyword가 변경될 때마다 쿼리가 다시 실행
    queryFn: async () => {
      const fetchedProducts = await getProducts({ keyword })
      return sortProducts(fetchedProducts, order)
    },
  })

  const { data: bestProducts = [] } = useQuery({
    queryKey: ['bestProducts'],
    queryFn: async () => {
      const response = await getBestProducts()
      const screenSize = handleMediaQueryChange()
      const bestProductsCount = getBestProductsPerPage(screenSize)
      return response.list.slice(0, bestProductsCount)
    },
  })

  // 반응형에 따라 보여지는 상품의 개수
  // 전체 상품
  function getProductsPerPage(screenSize: string) {
    switch (screenSize) {
      case 'desktop':
        return 10
      case 'tablet':
        return 6
      case 'mobile':
        return 4
      default:
        return 10
    }
  }

  // 베스트 상품
  function getBestProductsPerPage(screenSize: string) {
    switch (screenSize) {
      case 'desktop':
        return 4
      case 'tablet':
        return 2
      case 'mobile':
        return 1
      default:
        return 4
    }
  }

  // 미디어 쿼리 변경 감지를 위한 이벤트 리스너 추가
  const mqlDesktop = window.matchMedia('(min-width: 1200px)')
  const mqlTablet = window.matchMedia(
    '(min-width: 768px) and (max-width: 1199px)',
  )

  // 페이지당 아이템 개수를 설정하는 함수
  function handleMediaQueryChange() {
    const screenSize = mqlDesktop.matches
      ? 'desktop'
      : mqlTablet.matches
        ? 'tablet'
        : 'mobile'
    const productsPerPage = getProductsPerPage(screenSize)
    const bestProductsPerPage = getBestProductsPerPage(screenSize)
    setProductsPerPage(productsPerPage)
    setBestProductsPerPage(bestProductsPerPage)

    return screenSize
  }

  useEffect(() => {
    // 미디어 쿼리 변경 감지를 위한 이벤트 리스너 추가
    mqlDesktop.addListener(handleMediaQueryChange)
    mqlTablet.addListener(handleMediaQueryChange)

    // 컴포넌트가 마운트될 때 최초 실행
    handleMediaQueryChange()

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      mqlDesktop.removeListener(handleMediaQueryChange)
      mqlTablet.removeListener(handleMediaQueryChange)
    }
  }, [])

  useEffect(() => {
    refetchProducts()
  }, [order, keyword, refetchProducts])

  const handleKeywordSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setDropdownView(!isDropdownView)
  }

  // 선택된 옵션을 처리하는 함수
  const selectOption = (value: string) => {
    setOrder(value)
    setDropdownView(false) // 옵션 선택 후 드롭다운 닫기
  }

  // 처음과 끝 인덱스 번호를 구하고 slice로 분할하기
  const indexOfLast = currentPage * productsPerPage // 현재 페이지의 마지막 상품 인덱스
  const indexOfFirst = indexOfLast - productsPerPage // 현재 페이지의 첫 번째 상품 인덱스
  const currentProducts = products.slice(indexOfFirst, indexOfLast)

  return (
    <div className="container mx-auto my-16 px-8">
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold">베스트 상품</h3>
        <BestProductList products={bestProducts} />
      </div>

      <div>
        <div className="items-cente mb-4 flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex justify-between md:flex-1">
            <h3 className="text-xl font-bold">전체 상품</h3>
            <button
              className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white md:hidden"
              onClick={goToAddItem}
            >
              상품 등록하기
            </button>
          </div>
          <div className="flex items-center justify-between md:flex">
            <div className="relative">
              <input
                className="rounded-md border py-2 pl-8 pr-4 focus:outline-none"
                placeholder="검색할 상품을 입력해주세요"
                onChange={handleKeywordSearch}
              />
              <img
                src={icon_search}
                className="absolute left-2 top-2 h-6 w-6"
              />
            </div>
            <button
              className="hidden hover:bg-blue-600 md:ml-4 md:block md:rounded-md md:bg-blue-500 md:px-4 md:py-2 md:text-white"
              onClick={goToAddItem}
            >
              상품 등록하기
            </button>
            <div className="relative ml-4">
              <div
                className="flex cursor-pointer items-center rounded-lg border p-1 md:px-3 md:py-2"
                onClick={toggleDropdown}
              >
                <picture className="flex flex-row items-center justify-center">
                  <source
                    srcSet={icon_order}
                    media="all and (max-width: 768px)"
                  />
                  <span className="hidden md:block">
                    {
                      selectOptions.find((option) => option.value === order)
                        ?.label
                    }
                  </span>
                  <img src={icon_dropdown} className="h-8 w-8 md:h-6 md:w-6" />
                </picture>
              </div>
              {isDropdownView && (
                <ul className="absolute right-0 z-10 mt-2 w-40 rounded-md border bg-white text-center shadow-lg md:w-fit">
                  {selectOptions.map((option) => (
                    <li
                      key={option.value}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => selectOption(option.value)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <ProductList products={currentProducts} />
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={setCurrentPage}
      />
    </div>
  )
}

export default Items
