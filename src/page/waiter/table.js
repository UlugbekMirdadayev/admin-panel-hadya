import React from "react";
import { Table } from "@mantine/core";
import { formatCurrencyUZS } from "../../utils/helpers";

export default function TableComponent({ data }) {
  const rows = data?.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element?.active ? "Aktive" : "Aktiv emas"}</Table.Td>
      <Table.Td>{element?.fullname}</Table.Td>
      <Table.Td>{element?.phone}</Table.Td>
      <Table.Td>{formatCurrencyUZS(element?.balance)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"lg"} pt={"lg"} w={"100%"}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Status</Table.Th>
          <Table.Th>Ofitsiant ismi</Table.Th>
          <Table.Th>Ofitsiant Raqami</Table.Th>
          <Table.Th>Balansi</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
