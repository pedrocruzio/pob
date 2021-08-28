import { Navbar } from "../components/Navbar"
import { Settings } from "./Settings";

export default function Home() {
  return (
    <div>
    <Navbar />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Settings />
        </div>
      </main>
    </div>
  )
}

export { Home };