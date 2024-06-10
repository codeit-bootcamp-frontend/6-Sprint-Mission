import styled from "styled-components";

export default function HorizonLine() {
  return (
    <Horizon></Horizon>
  )
}

const Horizon = styled.div`
border-bottom: 1px solid ${({ theme }) => theme.colorPalette.tertiary};
`