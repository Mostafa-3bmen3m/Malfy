import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css"

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable : "--font-poppins",
})

export const metadata: Metadata = {
	title: "Malfy",
	description: "Store It , The only storgae solution You need",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${poppins.className} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
