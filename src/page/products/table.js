import React, { useState } from "react";
import { Button, Flex, Image, Table, Text } from "@mantine/core";
import moment from "moment";
import { formatCurrencyUZS } from "../../utils/helpers";
import { departments } from "../../utils/constants";
import ModalScreen from "../../components/modal";

export default function TableComponent({ data, handleDelete }) {
  const [image, setImage] = useState(null);
  const rows = data?.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element?.name}</Table.Td>
      <Table.Td>{formatCurrencyUZS(element?.price)}</Table.Td>
      <Table.Td>{element?.type}</Table.Td>
      <Table.Td>
        {departments.find(({ value }) => value === element?.department).label}
        {element?.department}
      </Table.Td>
      <Table.Td>
        {moment(element?.created_at).format("DD-MM-YYYY/HH:MM")}
      </Table.Td>
      <Table.Td onClick={() => setImage(element?.img)}>
        <ModalScreen
          title={"Product rasmi"}
          btn_title={
            <Flex align={"center"} gap={20}>
              <Text>Rasmni Ko'rish</Text>
            </Flex>
          }
          body={({ close }) => (
            <Image
              src={image}
              maw={300}
              mah={300}
              style={{
                objectFit: "contain",
                margin: "auto",
              }}
            />
          )}
        />
      </Table.Td>
      <Table.Td>
        <Button onClick={() => handleDelete(element?.id)} bg={"#f45"}>
          O'chirish
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"lg"} pt={"lg"} w={"100%"}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Maxsulot nomi</Table.Th>
          <Table.Th>Maxsulot narxi</Table.Th>
          <Table.Th>Maxsulot turi</Table.Th>
          <Table.Th>Bo'limga tegishli</Table.Th>
          <Table.Th>Sanasi</Table.Th>
          <Table.Th>Rasmi</Table.Th>
          <Table.Th>O'chirish</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
