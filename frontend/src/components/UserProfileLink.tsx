import { User } from '@/models/user';
import Image from 'next/image';
import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png';
import Link from 'next/link';

interface UserProfileLinkProps {
  user: User;
}

export default function UserProfileLink({ user }: UserProfileLinkProps) {
  return (
    <span>
      <Image
        src={user.profilePicUrl || profilePicPlaceholder}
        alt={'Profile Picture' + user.displayName}
        width={30}
        height={30}
        className="rounded-circle"
      />
      <Link
        href={`/users/${user.username}`}
        className="ms-2"
      >
        {user.displayName}
      </Link>
    </span>
  );
}
