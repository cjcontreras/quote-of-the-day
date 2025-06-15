const Header = () => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '1px solid gray',
      justifyContent: 'center',
      gap: '1rem'
    }}>
      <img
        src="/shirepath-logo.png"
        alt="ShirePath Solutions"
        style={{ height: '40px' }}
      />
      <h1 style={{ fontSize: '1.5rem' }}>ShirePath Solutions</h1>
    </header>
  );
};

export default Header;