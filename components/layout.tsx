import Link from "next/link";

export default function Layout({children}) {
    return (
        <>
            <style jsx>{`
                header h1 {
                    margin-top: 0;
                }`
            }
            </style>
            <header  className="border-b border-gray-300">
                <h1 className="container  text-5xl">
                    <Link href='/'>Mayed</Link>
                </h1>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}