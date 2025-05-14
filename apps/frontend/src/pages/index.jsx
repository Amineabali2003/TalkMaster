// import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react"

// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command"

// export default function CommandDemo() {
//   return (
//     <Command className="rounded-lg border shadow-md md:min-w-[450px]">
//       <CommandInput placeholder="Type a command or search..." />
//       <CommandList>
//         <CommandEmpty>No results found.</CommandEmpty>
//         <CommandGroup heading="Suggestions">
//           <CommandItem>
//             <Calendar />
//             <span>Calendar</span>
//           </CommandItem>
//           <CommandItem>
//             <Smile />
//             <span>Search Emoji</span>
//           </CommandItem>
//           <CommandItem disabled>
//             <Calculator />
//             <span>Calculator</span>
//           </CommandItem>
//         </CommandGroup>
//         <CommandSeparator />
//         <CommandGroup heading="Settings">
//           <CommandItem>
//             <User />
//             <span>Profile</span>
//             <CommandShortcut>⌘P</CommandShortcut>
//           </CommandItem>
//           <CommandItem>
//             <CreditCard />
//             <span>Billing</span>
//             <CommandShortcut>⌘B</CommandShortcut>
//           </CommandItem>
//           <CommandItem>
//             <Settings />
//             <span>Settings</span>
//             <CommandShortcut>⌘S</CommandShortcut>
//           </CommandItem>
//         </CommandGroup>
//       </CommandList>
//     </Command>
//   )
// }


// src/pages/index.jsx
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import { CommandDemo } from "@/components/CommandDemo"; // adapte le chemin si besoin

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome to TalkMaster</h2>
        <CommandDemo />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
