import { User } from '@/models/user';
import { GetServerSideProps } from 'next';
import * as UsersApi from '@/network/api/users';
import { useState } from 'react';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import Head from 'next/head';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png';
import styles from '@/styles/UserProfilePage.module.css';

// typescript interface for the props object
interface UserProfilePageProps {
  user: User;
}

export const getServerSideProps: GetServerSideProps<UserProfilePageProps> = async ({ params }) => {
  const username = params?.username?.toString();
  if (!username) throw Error('Missing username');

  const user = await UsersApi.getUserByUsername(username);

  return { props: { user } };
};

interface UserInfoSectionProps {
  user: User;
}

function UserInfoSection({
  user: { username, displayName, profilePicUrl, about, createdAt },
}: UserInfoSectionProps) {
  return (
    <Row>
      <Col sm="auto">
        <Image
          src={profilePicUrl || profilePicPlaceholder}
          alt={'Profile picture for: ' + username}
          width={200}
          height={200}
          priority
          className={styles.profileImage}
        />
      </Col>
      <Col className="mt-2 mt-sm-0">
        <h1>{displayName || username}</h1>
        <div>
          User: <strong>{username} </strong>
        </div>
        <div>
          Joined: <strong>{new Date(createdAt).toDateString()}</strong>
        </div>
        <div>{about}</div>
      </Col>
    </Row>
  );
}

export default function UserProfilePage({ user }: UserProfilePageProps) {
  const { user: loggedInUser, userMutate: mutateLoggedInUser } = useAuthenticatedUser();

  // use state to dinaically update the user profile - no need to re-fetch the user profile after updating it
  const [profileUser, setProfileUser] = useState(user);

  // ensure it's a boolean value (not null or undefined)
  const profileUserIsLoggedInUser = (loggedInUser && loggedInUser._id === profileUser._id) || false;

  return (
    <>
      <Head>
        <title>{`${profileUser.username} - Next Blog`}</title>
      </Head>
      <div>
        <UserInfoSection user={profileUser} />
      </div>
    </>
  );
}
