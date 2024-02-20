import React from "react";
import { Button, Menu, Table } from "@mantine/core";
import { formatCurrencyUZS } from "../../utils/helpers";
import { patchRequest } from "../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../redux/selectors";

export default function TableComponent({
  data,
  setLoader,
  setWaiters,
  handleDelete,
}) {
  const user = useUser();
  const handleAktiveChange = (id) => {
    setLoader(true);
    patchRequest(`afitsant/activate/${id}`, {}, user?.token)
      .then(({ data: response }) => {
        toast.info(response?.message);
        setWaiters(
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
    <Table.Tr key={element?.id}>
      <Table.Td>
        <Button
          onClick={() => handleAktiveChange(element?.id)}
          bg={!element?.active ? "dimmed" : undefined}
        >
          {element?.active ? "Aktive" : "Aktiv emas"}
        </Button>
      </Table.Td>
      <Table.Td>{element?.fullname}</Table.Td>
      <Table.Td>{element?.phone}</Table.Td>
      <Table.Td>{formatCurrencyUZS(element?.balance)}</Table.Td>
      <Table.Td>
        <Menu
          shadow="md"
          transitionProps={{ transition: "pop", duration: 150 }}
          position="left-start"
        >
          <Menu.Target>
            <Button color={"red"}>Ishdan olish</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Ishdan olishga rozimisiz</Menu.Label>
            <Menu.Divider />
            <Menu.Item onClick={() => handleDelete(element?.id)} color="red">
              Ha , roziman
            </Menu.Item>
            <Menu.Item>Yo'q , shart emas</Menu.Item>
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
          <Table.Th>Status</Table.Th>
          <Table.Th>Ofitsiant ismi</Table.Th>
          <Table.Th>Ofitsiant Raqami</Table.Th>
          <Table.Th>Balansi</Table.Th>
          <Table.Th>Ishdan olish</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.length ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Th ta="center" colSpan={5}>
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
                    +accumulator + +currentValue?.balance,
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
