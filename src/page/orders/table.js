import React from "react";
import { Table } from "@mantine/core";
import moment from "moment";
import { formatCurrencyUZS, TimeDifference } from "../../utils/helpers";

export default function TableComponent({ data }) {
  const rows = data?.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element?.room_name}</Table.Td>
      <Table.Td>{element?.afitsant_name}</Table.Td>
      <Table.Td>{formatCurrencyUZS(element?.total_price)}</Table.Td>
      <Table.Td>
        {moment(element?.created_at).format("DD-MM-YYYY HH:mm")}
        <br />
        <TimeDifference a={moment(element?.created_at)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table
      my={"lg"}
      pt={"lg"}
      w={"100%"}
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Xona/Stol raqami</Table.Th>
          <Table.Th>Ofitsiant ismi</Table.Th>
          <Table.Th>Umumiy summa</Table.Th>
          <Table.Th>Band qilingan vaqti</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.length ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Th ta="center" colSpan={4}>
              Ma'lumot yo'q
            </Table.Th>
          </Table.Tr>
        )}
      </Table.Tbody>

      {data?.length ? (
        <Table.Tfoot>
          <Table.Tr />
          <Table.Tr>
            <Table.Th>Umumiy summa</Table.Th>
            <Table.Th colSpan={4}>
              {formatCurrencyUZS(
                data?.reduce(
                  (accumulator, currentValue) =>
                    +accumulator + +currentValue?.total_price,
                  []
                )
              )}
            </Table.Th>
          </Table.Tr>
        </Table.Tfoot>
      ) : null}
    </Table>
  );
}
