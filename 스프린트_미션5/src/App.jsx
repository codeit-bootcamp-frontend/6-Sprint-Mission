import './App.css'
import styled from 'styled-components'; 
import logo from './assets/logo.svg'
import Items from './items';


const MainHeader = styled.header`
  border-bottom: 1px solid #DFDFDF;
  width: 1920px;
  height: 70px;
  display: flex;
  gap: 32px;
`

const PandaLogo = styled.img `
  width: 153px;
  height: 51px;
  margin-left: 200px;
  margin-top: 10px;
`

const Navigation = styled.nav `
  width: 218px;
  height: 69px;
`

const NavUl = styled.ul `
  list-style: none;
  display: flex;
  gap: 23px;
  text-align: center;
  padding: 20px;
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 18px;
`

const NavMenuFirst = styled.li `
  color: #4B5563;
`
const NavMenuSecond = styled.li `
  color: #4B5563;
  
`

const NavLink = styled.a `
  color: inherit;

  &:hover {
    color: inherit;
  }
`

function App() {

  return (
    <>
     <MainHeader>
       <PandaLogo src={logo} alt='판다마켓 로고' />
       <Navigation>
          <NavUl>
            <NavMenuFirst><NavLink href="">자유게시판</NavLink></NavMenuFirst>
            <NavMenuSecond><NavLink href="/items">중고마켓</NavLink></NavMenuSecond>
          </NavUl>
       </Navigation>
     </MainHeader>
    <Items></Items>
    </>
  )
}

export default App
