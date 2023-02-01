import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
            <div className="container flex flex-wrap items-center justify-between">
                <div className="w-full md:w-auto my-4">
                    <ul className="flex flex-col border border-gray-500 md:border-0 rounded-lg md:flex-row md:font-medium">
                        <li className={"hover:scale-110"}>
                            <Link href="/" className={"my-2 mx-8 text-gray-600 hover:text-gray-900 text-lg"}>
                                Todos
                            </Link>
                        </li>
                        <li className={"hover:scale-110"}>
                            <Link href="/completed" className={"my-2 mx-8 text-gray-600 hover:text-gray-900 text-lg"}>
                                Completed
                            </Link>
                        </li>
                        <li className={"hover:scale-110"}>
                            <Link href="/deleted" className={"my-2 mx-8 text-gray-600 hover:text-gray-900 text-lg"}>
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