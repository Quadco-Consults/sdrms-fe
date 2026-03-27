import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <div className='relative'>
        <div className='flex items-center gap-2'>
          <Image
            src='/images/NNPC_Logo.png'
            alt='Industrial background'
            width={86}
            height={48}
            className='object-cover'
            priority
          />
        </div>
      </div>
    </Link>
  );
}
