export default async function SupportLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="px-8">{children}</div>;
}
