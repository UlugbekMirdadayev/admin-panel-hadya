import React, { useState } from "react";
import { NumberInput, Table } from "@mantine/core";
import moment from "moment";
import { calculatePercentage, formatCurrencyUZS } from "../../utils/helpers";

export default function TableComponent({ data }) {
  const [percent, setPercent] = useState(10);
  const rows = data?.orders?.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element?.room_name}</Table.Td>
      <Table.Td>{element?.afitsant_name}</Table.Td>
      <Table.Td>{formatCurrencyUZS(element?.total_price)}</Table.Td>
      <Table.Td>
        {moment(element?.created_at).format("DD-MM-YYYY HH:mm")}
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
          <Table.Th>Sanasi</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.orders?.length ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Th ta={"center"} colSpan={4}>
              Malumotlar mavjud emas
            </Table.Th>
          </Table.Tr>
        )}
      </Table.Tbody>
      {data?.orders?.length ? (
        <Table.Tfoot>
          <Table.Tr />
          <Table.Tr>
            <Table.Th colSpan={5}></Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Umumiy summa</Table.Th>
            <Table.Th>
              {formatCurrencyUZS(
                data?.orders?.reduce(
                  (accumulator, currentValue) =>
                    +accumulator + +currentValue?.total_price,
                  []
                )
              )}
            </Table.Th>
            <Table.Th>
              <NumberInput
                value={percent}
                onChange={setPercent}
                min={1}
                max={100}
                suffix="% ish haqi"
              />
            </Table.Th>
            <Table.Th>
              {formatCurrencyUZS(
                calculatePercentage(
                  data?.orders?.reduce(
                    (accumulator, currentValue) =>
                      +accumulator + +currentValue?.total_price,
                    []
                  ),
                  percent
                )
              )}
            </Table.Th>
          </Table.Tr>
        </Table.Tfoot>
      ) : null}
    </Table>
  );
}
