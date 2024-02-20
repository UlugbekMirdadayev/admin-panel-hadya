import React from "react";
import { Button, Table, Text } from "@mantine/core";
import moment from "moment";
import { patchRequest } from "../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../redux/selectors";

export default function TableComponent({ data, setLoader, setAdmins }) {
  const user = useUser();
  const handleAktiveChange = (id) => {
    setLoader(true);
    patchRequest(`admin/activate/${id}`, {}, user?.token)
      .then(({ data: response }) => {
        toast.info(response?.message);
        setAdmins(
          data?.map((item) => {
            if (item?.id === id) {
              return { ...item, active: item?.active === 0 ? 1 : 0 };
            }
            return item;
          })
        );
        setLoader(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoader(false);
      });
  };

  const rows = data?.map((element) => (
    <Table.Tr
      key={element?.id}
      bg={element?.role === "owner" ? "green" : undefined}
      c={element?.role === "owner" ? "#fff" : undefined}
    >
      <Table.Td>
        {element?.role === "owner" ? null : (
          user.role === "owner" ? <Button
            disabled={element?.role === "owner"}
            onClick={() => handleAktiveChange(element?.id)}
            bg={!element?.active ? "dimmed" : undefined}
          >
            {element?.active ? "Aktive" : "Aktiv emas"}
          </Button> : null
        )}
      </Table.Td>
      <Table.Td>{element?.fullname}</Table.Td>
      <Table.Td>{element?.phone}</Table.Td>
      <Table.Td>
        {moment(element?.created_at).format("DD-MM-YYYY HH:mm")}
      </Table.Td>
      <Table.Td>
        <Text tt={"capitalize"}>
          {element?.role === "owner" ? "SuperAdmin" : element?.role}
        </Text>
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
          <Table.Th>Statusi</Table.Th>
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
