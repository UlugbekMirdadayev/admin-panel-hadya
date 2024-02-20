import { Box, Button, Group, NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { postRequest } from "../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../redux/selectors";

const inputs = [
  {
    name: "name",
    label: "Xona/Stol raqami",
    as: NumberInput,
  },
  {
    name: "places",
    label: "Nechi kishilik",
    as: NumberInput,
  },
  {
    name: "type",
    label: "Joy turi",
    as: Select,
    data: [
      {
        value: "room",
        label: "Xona",
      },
      {
        value: "stol",
        label: "Stol",
      },
    ],
    disabled: true,
  },
];

function FormCreate({ handleUpdate, close, setLoader }) {
  const user = useUser();
  const form = useForm({
    initialValues: {
      name: "",
      places: "",
      type: "stol",
    },
  });

  const onSubmit = (values) => {
    delete values.type;
    setLoader(true);
    postRequest("room", values, user?.token)
      .then(({ data }) => {
        setLoader(false);
        toast.info(data?.message || "Success");
        handleUpdate(true);
        close();
      })
      .catch((err) => {
        setLoader(false);
        toast.error(err?.response?.data?.message || "Error");
      });
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        {inputs.map((input) => (
          <input.as
            key={input.name}
            mt={"md"}
            required
            withAsterisk
            label={input.label}
            placeholder={input.label}
            data={input.data}
            disabled={input.disabled}
            {...form.getInputProps(input.name)}
          />
        ))}
        <Group justify="flex-end" mt="md">
          <Button type="submit">Yuborish</Button>
        </Group>
      </form>
    </Box>
  );
}

export default FormCreate;
