export default async function SolutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="px-8 max-md:px-4">{children}</div>;
}
