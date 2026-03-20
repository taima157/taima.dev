import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen w-full items-center p-4 flex-col gap-5">
      <Header />

      <div className="bg-white/2 flex-1 justify-center border max-w-200 w-full border-white/2 rounded-sm p-4 sm:p-8 flex flex-col gap-12">
        <div className="w-full flex justify-center">
          <span>working in progress...</span>
        </div>
      </div>

      <Footer />
    </main>
  );
}
