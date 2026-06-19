import { AppProvider } from "@/context/AppContext";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang === "id" ? "id" : "en") as "en" | "id";
  
  return (
    <AppProvider initialLang={lang}>
      {children}
    </AppProvider>
  );
}
