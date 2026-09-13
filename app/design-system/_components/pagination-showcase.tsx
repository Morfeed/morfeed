import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Preview, Subsection } from "./section"

export function PaginationShowcase() {
  return (
    <Subsection>
      <Preview>
        <Pagination id="pagination-demo">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#pagination-demo" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination-demo">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination-demo" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination-demo">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#pagination-demo" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Preview>
    </Subsection>
  )
}
