import Navbar from '@/components/Navbar';

const Layout = ({children}) => {
    return(
        <div className='h-screen flex flex-row justify-start'>
            <Navbar />
            <div className='flex-1 p-4'>
                <main>{children}</main>
            </div>
        </div>
    )
}

export default Layout;