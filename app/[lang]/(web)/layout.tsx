import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { navigationConfig } from "@/data/navigation";
import axios from "axios";

interface WebLayoutProps {
    children: React.ReactNode;
    params: {
        lang: string;
    };
}

async function getGnbData() {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis`
        );

        if (response.status === 200) {
            const fetched = response.data.data;

            // deep copy base navigation and inject lingchen & tokk externals from backend
            const newNav = JSON.parse(JSON.stringify(navigationConfig));
            const productsItem = newNav.items?.find(
                (i: any) => i.id === "products"
            );
            if (productsItem && Array.isArray(productsItem.children)) {
                const cisChildren = productsItem.children.find(
                    (c: any) => c.id === "cis-camera"
                );
                if (cisChildren) {
                    cisChildren.href = "/product?t=cis";
                }

                const lingchenChild = productsItem.children.find(
                    (c: any) => c.id === "lingchen"
                );
                if (lingchenChild) {
                    lingchenChild.external = (fetched.lingchen || []).map(
                        (p: any) => ({
                            id: p.uuid,
                            label: p.name,
                            href: p.url,
                            isExternal: true,
                        })
                    );

                    lingchenChild.href = "/product?t=lingchen";
                }

                const tokkChild = productsItem.children.find(
                    (c: any) => c.id === "tokk"
                );
                if (tokkChild) {
                    tokkChild.external = (fetched.tokk || []).map((p: any) => ({
                        id: p.uuid,
                        label: p.name,
                        href: p.url,
                        isExternal: true,
                    }));

                    tokkChild.href = "/product?t=tokk";
                }
            }

            return newNav;
        }
    } catch (error) {
        console.error("Error fetching GNB data:", error);
    }
    return navigationConfig;
}

export default async function WebLayout({ children, params }: WebLayoutProps) {
    const { lang } = params;
    const gnbData = await getGnbData();

    return (
        <>
            <Header lang={lang} gnbData={gnbData} />
            <main>{children}</main>
            <Footer />
        </>
    );
}
