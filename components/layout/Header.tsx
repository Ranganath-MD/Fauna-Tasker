import { Avatar } from '@geist-ui/react';
import React from 'react'

export const Header = () => {
  return (
    <nav
      style={{
        padding: "1.5rem 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span role="img" aria-label="img">💻</span>
      <Avatar text="R" />
    </nav>
  );
}
