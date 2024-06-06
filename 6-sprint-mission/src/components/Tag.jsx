import { useState } from 'react'

function Tag({ tags, onAddTag, onRemoveTag }) {
  const [input, setInput] = useState('')

  const onPressEnter = (e) => {
    // 사용자가 입력을 완료하지 않았을 때 함수의 나머지 부분이 실행되지 않도록
    // 완성되지 않은 입력이 태그로 잘못 추가되는 것을 방지
    if (e.nativeEvent.isComposing) return

    const inputString = input.trim()
    if (inputString && e.key === 'Enter') {
      e.preventDefault()
      onAddTag(inputString)
      setInput('') // 태그 추가 후 input field 초기화
    }
  }

  return <></>
}

export default Tag
