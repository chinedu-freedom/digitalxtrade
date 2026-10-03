'use client';

import React from 'react';
import HeaderNav from './HeaderNav';
import SubNav from './SubNav';

export default function UserHeader({ activeTab = 'ACCOUNT', adminNote }) {
  return (
    <div className="sticky top-0 z-40 bg-white w-full">
      <HeaderNav isNested={true} />
      <SubNav activeTab={activeTab} adminNote={adminNote} isNested={true} />
    </div>
  );
}
