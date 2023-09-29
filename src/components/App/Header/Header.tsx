import { Heading, Spacer, Flex, LinkBox, LinkOverlay } from '@chakra-ui/react'
import ThemeButton from './ThemeButton'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import useSearchParams from '../../../hooks/use-search-params'

function Header() {
  const location = useLocation()
  const searchParams = useSearchParams()

  const Logo = () => {
    return (
      <Heading size="md" as="div">
        Star Wars Characters
      </Heading>
    )
  }

  const isHeaderPassive = location.pathname === '/' && ['1', null].includes(searchParams.get('page'))

  return (
    <Flex pt={4} pb={4} alignItems="center">
      {isHeaderPassive ? (
        <Logo />
      ) : (
        <LinkBox as="div">
          <LinkOverlay as={ReactRouterLink} to="/">
            <Logo />
          </LinkOverlay>
        </LinkBox>
      )}
      <Spacer />
      <ThemeButton />
      {/*<HStack spacing={4}>*/}
      {/*  <Link href="#">Home</Link>*/}
      {/*  <Link href="#">About</Link>*/}
      {/*  <Link href="#">Services</Link>*/}
      {/*  <Link href="#">Contact</Link>*/}
      {/*</HStack>*/}
    </Flex>
  )
}

export default Header
