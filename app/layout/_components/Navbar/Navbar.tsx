import Logo from "@components/icons/Logo"
import UserIcon from "@components/icons/UserIcon"
import Link from "next/link"
import { Container, appName } from ".."

// import Nightwind from "@components/icons/Nightwind"

export default function Navbar() {
  // const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="shadow-sm">
      <Container>
        <nav className="relative mx-auto flex h-[4.25rem] items-center justify-between sm:px-6">
          <div className="flex items-center space-x-7 sm:space-x-10">
            <Link href="/" className="h-7 w-7" aria-label={`${appName} logo`}>
              <Logo />
            </Link>
          </div>

          <div className="xs:space-x-6 relative z-10 flex items-center space-x-6 sm:space-x-8">
            {/* <div className="hidden xs:block xs:mr-2">
              <Nightwind size="h-[24px]" />
            </div> */}
            <>
              <Link href="/profile">
                {/* <a
                        className="cursor-pointer"
                        onMouseDown={() => !showDropdown && setShowDropdown(true)}
                      > */}
                <UserIcon />
                {/* </a> */}
              </Link>
            </>
          </div>
          {/* {showDropdown && <DropdownMenu setShowDropdown={setShowDropdown} />} */}
        </nav>
      </Container>
      <hr className="w-full border-gray-200" />
    </header>
  )
}
