import React from "react";
import { Button, Menu, Table, Text } from "@mantine/core";
import { Trash } from "../../components/icon";

export default function TableComponent({ data, handleDelete }) {
  const rows = data?.map((element) => (
    <Table.Tr
      key={element?.id}
      bg={element?.active ? "red" : undefined}
      c={element?.active ? "#fff" : undefined}
    >
      <Table.Td>{element?.name}</Table.Td>
      <Table.Td>{element?.active ? "Joy Band" : "Joy Band emas"}</Table.Td>
      <Table.Td>{element?.afitsant_name}</Table.Td>
      <Table.Td>{element?.places}</Table.Td>
      <Table.Td>
        <Menu
          shadow="md"
          width={200}
          transitionProps={{ transition: "pop", duration: 150 }}
          position="left-start"
        >
          <Menu.Target>
            <Button
              color={element?.active ? "#fff" : "red"}
              c={element?.active ? "red" : undefined}
            >
              <Trash fill={element?.active ? "red" : "#fff"} />{" "}
              <Text fw={600} pl={10}>
                O'chirish
              </Text>
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
          <Table.Th>Xona/Stol raqami</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Ofitsiant ismi</Table.Th>
          <Table.Th>Nechi kishilik</Table.Th>
          <Table.Th>O'chirish</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.length ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Th ta="center" colSpan={5}>Ma'lumot yo'q</Table.Th>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
}
