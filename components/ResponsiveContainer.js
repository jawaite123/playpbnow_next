import React from 'react';
import DesktopContainer from './DesktopContainer'
import MobileContainer from './MobileContainer'

const ResponsiveContainer = ({ children }) => (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
    </div>
  )

  export default ResponsiveContainer