
import WishlistAsideNav from '@/components/Page/wishlist/WishListAsideNav';
import React from 'react';

const layout = ({ children }: { children: React.ReactChild }) => {
    return (
        <div className='flex flex-col lg:flex-row items-start gap-3 bg-[#f2f4f7]'>
        <aside className='lg:w-[15%] w-full lg:min-h-[calc(100vh-72px)] bg-white'><WishlistAsideNav/></aside>
       <div className='lg:w-[85%] lg:min-h-[calc(100vh-72px)] mt-5'> {children}</div>
    </div>
    );
};

export default layout;