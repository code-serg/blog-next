import { User } from '@/models/user';
import Image from 'next/image';
import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png';
import Link from 'next/link';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { format } from 'path';
import { formatDate } from '@/utils/utils';

interface UserProfileLinkProps {
  user: User;
}

export default function UserProfileLink({ user }: UserProfileLinkProps) {
  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          <UserTooltipContent user={user} />
        </Tooltip>
      }
      delay={{ show: 500, hide: 0 }}
    >
      <span>
        <Image
          src={user.profilePicUrl || profilePicPlaceholder}
          alt={'Profile Picture: ' + user.displayName}
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
    </OverlayTrigger>
  );
}

interface UserTooltipContentProps {
  user: User;
}

function UserTooltipContent({
  user: { username, profilePicUrl, about, createdAt },
}: UserTooltipContentProps) {
  return (
    <div className="p-2">
      {' '}
      <Image
        src={profilePicUrl || profilePicPlaceholder}
        alt={'Profile Picture: ' + username}
        width={100}
        height={100}
        className="rounded-circle mb-2"
      />
      <div className="text-start">
        <strong>{username}</strong> <br />
        User since: {formatDate(createdAt)}
        {about && <>About: {about}</>}
      </div>
    </div>
  );
}
