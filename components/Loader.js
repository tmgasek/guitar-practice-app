import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="animate-ping">
        <Image src="/guitar-loader.svg" height={200} width={180} alt="Loader" />
      </div>

      <h1 className="text-lg tracking-widest my-20">
        Loading<span className="text-watermelon">...</span>
      </h1>
    </div>
  );
};

export default Loader;
