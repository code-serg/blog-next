import { User } from '@/models/user';
import { GetServerSideProps } from 'next';
import * as UsersApi from '@/network/api/users';
import { useState } from 'react';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';

// typescript interface for the props object
interface UserProfilePageProps {
  user: User;
}

export const getServerSideProps: GetServerSideProps<UserProfilePageProps> = async ({ params }) => {
  const username = params?.username?.toString();
  if (!username) throw Error('Missing username');

  console.log('username:', username);
  const user = await UsersApi.getUserByUsername(username);

  return { props: { user } };
};

export default function UserProfilePage({ user }: UserProfilePageProps) {
  const { user: loggedInUser, userMutate: mutateLoggedInUser } = useAuthenticatedUser();

  // use state to dinaically update the user profile - no need to re-fetch the user profile after updating it
  const [profileUser, setProfileUser] = useState(user);

  // ensure it's a boolean value (not null or undefined)
  const profileUserIsLoggedInUser = (loggedInUser && loggedInUser._id === profileUser._id) || false;

  return (
    <div>
      <h1>User Profile</h1>
      <h2>{profileUser.username}</h2>
    </div>
  );
}
