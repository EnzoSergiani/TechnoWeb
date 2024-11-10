'use client'

import { Avatar } from '@/components/avatar'
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from '@/components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { BookProviders } from '@/providers/useBookProviders'
import { ArrowRightStartOnRectangleIcon, ChevronDownIcon, CodeBracketIcon, PencilIcon } from '@heroicons/react/16/solid'
import { BookmarkIcon, BookOpenIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()

  return (
    <BookProviders>
      <SidebarLayout
        navbar={
          <Navbar>
            <NavbarSpacer />
            <NavbarSection>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar src="" alt="Profile picture" square />
                </DropdownButton>
                <AccountDropdownMenu anchor="bottom end" />
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <Dropdown>
                <DropdownButton as={SidebarItem}>
                  <BookmarkIcon />
                  <SidebarLabel>Library</SidebarLabel>
                  <ChevronDownIcon />
                </DropdownButton>
                <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                  <DropdownItem
                    onClick={() => {
                      window.location.href = 'https://www.junia.com'
                    }}
                  >
                    <CodeBracketIcon />
                    <DropdownLabel>ISEN Production</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </SidebarHeader>

            <SidebarBody>
              <SidebarSection>
                <SidebarItem href="/books" current={pathname.startsWith('/books')}>
                  <BookOpenIcon />
                  <SidebarLabel>Books</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/authors" current={pathname.startsWith('/authors')}>
                  <PencilIcon />
                  <SidebarLabel>Authors</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
      >
        {children}
      </SidebarLayout>
    </BookProviders>
  )
}
