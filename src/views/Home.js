import { Navbar } from "../components/Navbar"
import { Settings } from "./Settings";

import { getUserAddress } from '../utils';


export default function Home() {

    const userAddr = getUserAddress();

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