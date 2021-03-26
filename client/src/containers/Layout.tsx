import Navbar from '../components/Navbar';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '20px' }}>
        <div className='container'>{children}</div>
      </main>
    </>
  );
};

export default Layout;
