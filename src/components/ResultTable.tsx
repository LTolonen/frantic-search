import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, RowData, ColumnMeta, getSortedRowModel } from "@tanstack/react-table";
import { VendorCard } from "../types/Cards";
import { Box, Table, Thead, Tr, Th, Td, Tbody, Center } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

declare module '@tanstack/table-core' {
    interface ColumnMeta<TData extends RowData, TValue> {
        isNumeric: boolean
    }
}

export type ResultTableProps = {
    results: VendorCard[]
}

const ResultTable: React.FC<ResultTableProps> = ({ results }) => {

    const colHelper = createColumnHelper<VendorCard>();

    const columns = [
        colHelper.accessor("name", {
            cell: info => info.getValue(),
            header: "Card Name"
        }),
        colHelper.accessor("price", {
            cell: info => `$${info.getValue().toFixed(2)}`,
            header: "Price",
            meta: {
                isNumeric: true
            }
        }),
        colHelper.accessor("availableQuantity", {
            cell: info => info.getValue(),
            header: "Quantity"
        }),
        colHelper.accessor("setName", {
            cell: info => info.getValue(),
            header: "Set Name"
        }),
        colHelper.accessor("priceRank", {
            cell: info => info.getValue(),
            header: "Price Rank"
        }),
        colHelper.accessor("foil", {
            cell: info => info.getValue() ? "Yes" : "No",
            header: "Foil"
        }),
        colHelper.accessor("vendorName", {
            cell: info => info.getValue(),
            header: "Vendor"
        }),
    ]

    const table = useReactTable({
        data: results,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <Table>
            <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                      const meta = header.column.columnDef.meta;
                      return (
                        <Th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          isNumeric={meta?.isNumeric}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
        
                          <Box as="span" pl="4">
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <TriangleDownIcon aria-label="sorted descending" />
                              ) : (
                                <TriangleUpIcon aria-label="sorted ascending" />
                              )
                            ) : null}
                          </Box>
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
            </Thead>
            <Tbody>
                {results.length > 0 ?
                table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                    const meta = cell.column.columnDef.meta;
                    return (
                        <Td key={cell.id} isNumeric={meta?.isNumeric}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                    );
                    })}
                </Tr>
                ))
                : 
                // again, why doesnt this work?
                <Tr key={"none"}>
                    <Center w="100%">
                    No results found... :\
                    </Center>
                </Tr>}
            </Tbody>
        </Table>
    )
}

export default ResultTable;