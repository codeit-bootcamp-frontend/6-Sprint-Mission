function NavigationBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', backgroundColor: '#f0f0f0' }}>
      <div>로고</div>
      <nav>
        <a href="#" style={{ margin: '0 10px' }}>홈</a>
        <a href="#" style={{ margin: '0 10px' }}>상품</a>
        <a href="#" style={{ margin: '0 10px' }}>소개</a>
        <a href="#" style={{ margin: '0 10px' }}>문의</a>
      </nav>
    </div>
  );
}

export default NavigationBar;