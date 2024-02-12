import React from "react";
import { Table } from "@mantine/core";
import moment from "moment";
import { formatCurrencyUZS } from "../../utils/helpers";

export default function TableComponent({ data }) {
  const rows = data?.orders?.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element?.room_name}</Table.Td>
      <Table.Td>{element?.afitsant_name}</Table.Td>
      <Table.Td>{formatCurrencyUZS(element?.total_price)}</Table.Td>
      <Table.Td>
        {moment(element?.created_at).format("DD-MM-YYYY/HH:MM")}
      </Table.Td>
    
      
    </Table.Tr>
  ));

  return (
    <Table mt={"lg"} pt={"lg"} w={"100%"}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Xona/Stol raqami</Table.Th>
          <Table.Th>Ofitsiant ismi</Table.Th>
          <Table.Th>Umumiy summa</Table.Th>
          <Table.Th>Sanasi</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
