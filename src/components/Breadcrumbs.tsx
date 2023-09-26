import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Breadcrumbs = () => {
  return (
    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500'/>} mt={4} mb={4}>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Characters</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default Breadcrumbs
