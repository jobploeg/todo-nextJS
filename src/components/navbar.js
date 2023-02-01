import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="px-2 sm:px-4 py-2.5 bg-gradient-to-l from-white via-blue-50 to-blue-300">
            <div className="container flex flex-wrap items-center justify-between">
                <div className="w-full md:w-auto my-4">
                    <ul className="flex md:flex-row md:border-0 rounded-lg md:flex-row">
                        <li className={"hover:scale-110"}>
                            <Link href="/" className={"my-2 mx-8 hover:text-gray-900 text-xl md:text-lg"}>
                                Todos
                            </Link>
                        </li>
                        <li className={"hover:scale-110"}>
                            <Link href="/completed" className={"my-2 mx-8 hover:text-gray-900 text-xl md:text-lg"}>
                                Completed
                            </Link>
                        </li>
                        <li className={"hover:scale-110"}>
                            <Link href="/deleted" className={"my-2 mx-8 hover:text-gray-900 text-xl md:text-lg"}>
                                Deleted
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;