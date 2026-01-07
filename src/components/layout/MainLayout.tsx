'use client';

import { ReactNode, useState, useEffect } from 'react';
import TopBar from './TopBar';
import TopBarMobile from './TopBarMobile';
import SideBar from './SideBar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
    
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Desktop Top Bar as fallback */}
        <TopBar />
        
        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Side Bar */}
          <SideBar />
          
          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Mobile Top Bar */}
        <TopBarMobile />
        
        {/* Page Content - Full width on mobile */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Desktop Top Bar */}
      <TopBar />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Side Bar - Hidden on mobile */}
        <SideBar />
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;