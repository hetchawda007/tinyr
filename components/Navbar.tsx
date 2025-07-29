"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Button } from './ui/button'
import { Karla } from 'next/font/google'
import { poppinsregular } from '@/fonts/fonts'
import { useTheme } from './Contextprovider'
import { useSession, signOut } from 'next-auth/react'
import { WiDaySunny } from "react-icons/wi";
import { MdNightlight } from "react-icons/md";

const karla = Karla({
    subsets: ['latin']
})

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const { data: session, status } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <nav>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link href="/" className={`${karla.className} font-bold flex items-center space-x-3 rtl:space-x-reverse`}>
                    <span className='text-3xl font-bold'>Sujo</span>
                </Link>
                <div className='flex items-center space-x-4'>
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="mx-4 p-2 cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {theme === 'dark' ? <MdNightlight className='size-8' /> : <WiDaySunny className='size-8' />}
                        </button>
                    )}

                    {/* Show Login button if not authenticated */}
                    {status !== 'loading' && !session && (
                        <Button className="cursor-pointer">
                            <Link href="/login" className={`${poppinsregular.className} font-semibold cursor-pointer`}>Login</Link>
                        </Button>
                    )}

                    {/* Show Dashboard and Logout buttons if authenticated */}
                    {status !== 'loading' && session && (
                        <>
                            <Button variant="outline" className="cursor-pointer">
                                <Link href="/dashboard" className={`${poppinsregular.className} font-semibold cursor-pointer`}>Dashboard</Link>
                            </Button>
                            <Button variant="destructive" onClick={handleLogout} className="cursor-pointer">
                                <span className={`${poppinsregular.className} font-semibold`}>Logout</span>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;