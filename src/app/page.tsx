import UserInput from "@/components/ui/Maverix/UserInput";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start gap-8 py-16">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-7xl font-bold font-orbitron bg-gradient-to-r from-blue-400 via-pink-400 to-gray-500 bg-clip-text text-transparent tracking-wider">
          Maverix
        </h1>
        <p className="font-space-grotesk text-lg text-gray-600 max-w-md text-center leading-relaxed">
          Enter a topic and find a detailed comprehensive research report
        </p>
      </div>
      <UserInput />
    </main>
  );
}
