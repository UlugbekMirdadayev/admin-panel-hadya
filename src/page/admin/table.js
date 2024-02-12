import React from "react";
import { Table, Text } from "@mantine/core";
import moment from "moment";

export default function TableComponent({ data }) {
  const rows = data?.map((element) => (
    <Table.Tr
      key={element?.id}
      bg={element?.role === "owner" ? "green" : undefined}
    >
      <Table.Td>{element?.fullname}</Table.Td>
      <Table.Td>{element?.phone}</Table.Td>
      <Table.Td>
        {moment(element?.created_at).format("DD-MM-YYYY/HH:MM")}
      </Table.Td>
      <Table.Td>
        <Text tt={"capitalize"}>
          {element?.role === "owner" ? "SuperAdmin" : element?.role}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"lg"} pt={"lg"} w={"100%"}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Ismi</Table.Th>
          <Table.Th>Telefon raqami</Table.Th>
          <Table.Th>Ishga olingan Sanasi</Table.Th>
          <Table.Th>Role</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
