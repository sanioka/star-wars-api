import { FC } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { IBreadcrumb } from "./IBreadcrumb";
import { Link as ReactRouterLink } from "react-router-dom";

const Breadcrumbs: FC<Props> = ({items}) => {
  return (
    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500'/>} mt={2} mb={4}>
      {items.map((item, index) => {
        return (
          <BreadcrumbItem isCurrentPage={item.inactive} key={index + item.name}>
            {
              item.inactive
                ? <BreadcrumbLink>{item.name}</BreadcrumbLink>
                : <BreadcrumbLink as={ReactRouterLink} to={item.url || '/'}>{item.name}</BreadcrumbLink>
            }
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

type Props = {
  items: IBreadcrumb[]
}

export default Breadcrumbs

