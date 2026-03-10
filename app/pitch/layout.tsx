import { EB_Garamond, JetBrains_Mono } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Voice AI for Community Health Assessments",
  description:
    "What if your residents could take the CHA survey by just making a phone call?",
};

export default function PitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${ebGaramond.variable} ${jetbrainsMono.variable}`}
      style={{ background: "#0A1628" }}
    >
      {children}
    </div>
  );
}
