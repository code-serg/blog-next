import { User } from '@/models/user';
import Image from 'next/image';
import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png';

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
    </span>
  );
}
