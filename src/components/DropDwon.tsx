import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Image from 'next/image';

type Props = {
  setIsLogoutOpen: (isLogoutOpen: boolean) => void;
};

type MenuItem = {
  label: JSX.Element;
  key: string;
  onClick?: () => void;
};

const Dropdowns: React.FC<Props> = ({ setIsLogoutOpen }) => {
  const items: MenuItem[] = [
    {
      label: <a className='drop-down-item' href="/profile">Profile</a>,
      key: '0',
    },
    {
      label: <a className='drop-down-item' href="/checkout">Checkout</a>,
      key: '1',
    },
    {
      label: <a className='drop-down-item' href="/order">Your Order</a>,
      key: '3',
    },
    {
      label: <a className='drop-down-item' href="/order">Order Invoice</a>,
      key: '4',
    },
    {
      label: <a className='drop-down-item' href="/terms&services">Terms and Services</a>,
      key: '5',
    },
    {
        label: <a className='drop-down-item' href="/terms&services">Privacy and Policy</a>,
        key: '6',
      },
    {
      label: <a className='drop-down-item' onClick={() => setIsLogoutOpen(true)}>Log Out</a>,
      key: '7',
    },
  ];

  return (
    <Dropdown className='py-4 px-4' menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Image className='profile-image cursor-pointer' src="/user.png" alt="user profile image" width={30} height={25} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Dropdowns;
