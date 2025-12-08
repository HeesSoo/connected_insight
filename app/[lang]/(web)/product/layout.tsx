export default async function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="px-8 max-md:px-0">{children}</div>;
}
