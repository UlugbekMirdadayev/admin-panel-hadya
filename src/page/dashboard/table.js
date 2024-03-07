import React, { useRef, useState } from "react";
import { Button, NumberInput, Table } from "@mantine/core";
import moment from "moment";
import { calculatePercentage, formatCurrencyUZS } from "../../utils/helpers";
import { useReactToPrint } from "react-to-print";
import { getRequest } from "../../services/api";
import { toast } from "react-toastify";

export default function TableComponent({ data, user, setLoader }) {
  const [percent, setPercent] = useState(10);
  const TableCheck = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState({});
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => setOpen(false),
      onBeforePrint: () => setOpen(true),
    });
    const getById = () => {
      setLoader(true);
      getRequest(`/order/${data?.id}`, user?.token)
        .then(({ data }) => {
          setLoader(false);
          setOrder(data?.innerData);
          setOpen(true);
        })
        .catch((err) => {
          toast.info("Check chiqarishda xatolik, Keyinroq urinib ko'ring");
          setLoader(false);
          console.log(err, "err");
        });
    };
    return (
      <>
        <Button onClick={getById}>Check chiqarish</Button>
        <div
          className="modal-print"
          style={{ display: `${open ? "flex" : "none"}` }}
        >
          <div>
            <Button w={"100%"} mt={"lg"} onClick={() => setOpen(false)}>
              Orqaga
            </Button>
            <div className="cheque" ref={componentRef}>
              <div className="print-body">
                <p className="title-text">Sizning tartib raqamingiz</p>
                <h1>{order?.id}</h1>
                <p>
                  Ochilgan vaqti{" "}
                  {moment(order?.created_at).format("HH:mm  DD.MM.YYYY")}
                </p>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="left">Nomi</th>
                      <th>Soni</th>
                      <th className="right">Narxi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.products?.length
                      ? order?.products?.map((prod) => (
                          <tr key={prod?.id}>
                            <td className="left">{prod?.product_name}</td>
                            <td>{prod?.product_quantity}</td>
                            <td className="right">
                              {formatCurrencyUZS(prod?.product_price)}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>

                  <tfoot>
                    <tr>
                      <th colSpan={3}>
                        <hr />
                      </th>
                    </tr>
                    <tr>
                      <td className="left" colSpan={2}>
                        Umumiy summa
                      </td>
                      <td className="right">
                        {formatCurrencyUZS(
                          order?.products?.reduce(
                            (accumulator, currentValue) =>
                              +accumulator + +currentValue?.product_price,
                            []
                          )
                        )}
                      </td>
                    </tr>

                    <tr>
                      <th className="left" colSpan={2}>
                        Xizmat haqi ({percent}%)
                      </th>
                      <th className="right">
                        {formatCurrencyUZS(
                          calculatePercentage(
                            order?.products?.reduce(
                              (accumulator, currentValue) =>
                                +accumulator + +currentValue?.product_price,
                              []
                            ),
                            percent
                          )
                        )}
                      </th>
                    </tr>
                    <tr>
                      <th className="left" colSpan={2}>
                        Jami + ofitsant
                      </th>
                      <th className="right">
                        {formatCurrencyUZS(
                          order?.products?.reduce(
                            (accumulator, currentValue) =>
                              +accumulator + +currentValue?.product_price,
                            calculatePercentage(
                              order?.products?.reduce(
                                (accumulator, currentValue) =>
                                  +accumulator + +currentValue?.product_price,
                                []
                              ),
                              percent
                            )
                          )
                        )}
                      </th>
                    </tr>
                    <tr>
                      <td className="left" colSpan={3}>
                        Olib ketish xizmati
                      </td>
                    </tr>
                    <tr>
                      <td className="left" colSpan={3}>
                        Yetkazib berish ximati
                      </td>
                    </tr>
                    <tr>
                      <td className="left" colSpan={3}>
                        +998 91 184 30 04
                      </td>
                    </tr>
                    <tr>
                      <td className="left" colSpan={3}>
                        Bizni tanlaganingiz uchun raxmat!
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <Button w={"100%"} mt={"lg"} onClick={handlePrint}>
                  Check chiqarish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const rows = data?.orders?.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element?.room_name}</Table.Td>
      <Table.Td>{element?.afitsant_name}</Table.Td>
      <Table.Td>{formatCurrencyUZS(element?.total_price)}</Table.Td>
      <Table.Td>
        {moment(element?.created_at).format("DD-MM-YYYY HH:mm")}
      </Table.Td>
      <Table.Td>
        <TableCheck data={element} />
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
          <Table.Th>Check</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.orders?.length ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Th ta={"center"} colSpan={5}>
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
