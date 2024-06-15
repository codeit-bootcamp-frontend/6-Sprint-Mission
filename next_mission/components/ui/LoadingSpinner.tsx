import SpinnerIcon from '@/public/spinner.png';
import Image from 'next/image';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative">
      <Image
        width={300}
        height={300}
        src={SpinnerIcon}
        alt="loadingSpinner"
        className="absolute"
      />
    </div>
  );
};

export default LoadingSpinner;
