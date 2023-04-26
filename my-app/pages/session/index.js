import Link from "next/link";

export default function Page() {

    return (
        <div>
            <h1>Only logged in users can view this page</h1>
            <Link href="/">Return</Link>
        </div>
    );
}