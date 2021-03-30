import Image from 'next/image';

const Loader = () => {
  return (
    <>
      <div className='flex justify-center'>
        <small hidden>Loader is loading</small>
        <Image src='/gear-loader.svg' alt='Loading...' width={50} height={50} />
      </div>
    </>
  );
};

export default Loader;
