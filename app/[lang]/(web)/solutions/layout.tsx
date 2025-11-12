export default async function SolutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="px-8">{children}</div>;
}
