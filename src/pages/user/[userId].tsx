import * as React from 'react';
import Link from 'next/link';

interface IUserMainProps {
}

const UserMain: React.FunctionComponent<IUserMainProps> = (props) => {
  return (
    <>
      <div>Zalogowany</div>
      <Link href='/login'>Back</Link>
    </>
  );
};

export default UserMain;

export async function getStaticPath() {
  return {
    paths: '1',
    fallback: 'blocking'
  }
}

