import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
const Navbar = () => {
    return (
        <>
            <nav>
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className='text-3xl font-bold'>Tinyr</span>
                    </a>
                    <Button >
                        <Link href="/login" className="">Login</Link>
                    </Button>
                </div>
            </nav>
        </>
    )
}

export default Navbar