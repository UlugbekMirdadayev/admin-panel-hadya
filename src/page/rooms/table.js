import React from "react";
import { Table } from "@mantine/core";

export default function TableComponent({ data }) {
  const rows = data?.map((element) => (
    <Table.Tr key={element?.id} bg={element?.active ? "red" : undefined}>
      <Table.Td>{element?.name}</Table.Td>
      <Table.Td>{element?.active ? "Joy Band" : "Joy Band emas"}</Table.Td>
      <Table.Td>{element?.afitsant_name}</Table.Td>
      <Table.Td>{element?.places}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"lg"} pt={"lg"} w={"100%"}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Xona/Stol raqami</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Ofitsiant ismi</Table.Th>
          <Table.Th>Nechi kishilik</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
