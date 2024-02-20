import React, { useState } from "react";
import { Button, Flex, Image, Menu, Table, Text } from "@mantine/core";
import moment from "moment";
import { formatCurrencyUZS } from "../../utils/helpers";
import { departments } from "../../utils/constants";
import ModalScreen from "../../components/modal";
import { Eye, Trash } from "../../components/icon";

export default function TableComponent({ data, handleDelete }) {
  const [image, setImage] = useState(null);
  const rows = data?.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element?.name}</Table.Td>
      <Table.Td>{formatCurrencyUZS(element?.price)}</Table.Td>
      <Table.Td>{element?.type}</Table.Td>
      <Table.Td>
        {departments?.find(({ value }) => value === element?.department)?.label}
      </Table.Td>
      <Table.Td>
        {moment(element?.created_at).format("DD-MM-YYYY HH:mm")}
      </Table.Td>
      <Table.Td onClick={() => setImage(element?.img)}>
        <ModalScreen
          title={"Product rasmi"}
          btn_title={
            <Flex align={"center"} gap={10}>
              <Eye /> <Text>Rasmni Ko'rish</Text>
            </Flex>
          }
          body={({ close }) => (
            <Image
              src={image}
              w={300}
              h={300}
              style={{
                objectFit: "contain",
                margin: "auto",
              }}
            />
          )}
        />
      </Table.Td>
      <Table.Td>
        <Menu
          shadow="md"
          width={200}
          transitionProps={{ transition: "pop", duration: 150 }}
          position="left-start"
        >
          <Menu.Target>
            <Button color="red" display={"flex"} align={"center"}>
              <Trash fill="#fff" /> <Text pl={10}>O'chirish</Text>
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>O'chirishga rozimisiz</Menu.Label>
            <Menu.Divider />
            <Menu.Item onClick={() => handleDelete(element?.id)} color="red">
              Ha , roziman
            </Menu.Item>
            <Menu.Item>Yo'q , keyinroq</Menu.Item>
          </Menu.Dropdown>
        </Menu>
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
          <Table.Th>Maxsulot nomi</Table.Th>
          <Table.Th>Maxsulot narxi</Table.Th>
          <Table.Th>Maxsulot turi</Table.Th>
          <Table.Th>Bo'limga tegishli</Table.Th>
          <Table.Th>Sanasi</Table.Th>
          <Table.Th>Rasmi</Table.Th>
          <Table.Th>O'chirish</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.length ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Th ta="center" colSpan={7}>
              Ma'lumot yo'q
            </Table.Th>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
}
