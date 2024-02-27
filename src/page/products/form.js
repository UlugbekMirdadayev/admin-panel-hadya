import {
  TextInput,
  Button,
  Group,
  Box,
  Select,
  FileInput,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { departments, units } from "../../utils/constants";
import { useState } from "react";
import { toast } from "react-toastify";
import { postRequest } from "../../services/api";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { useUser } from "../../redux/selectors";

const inputs = [
  {
    name: "name",
    label: "Nomi",
  },
  {
    name: "price",
    label: "Narxi",
  },
  {
    name: "type",
    label: "Turi",
    typingChange: (e) => (e.target.value = e.target.value.toLowerCase()),
  },
];

function FormCreate({ handleOrders, close }) {
  const user = useUser();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const form = useForm({
    initialValues: {
      name: "",
      price: "",
      type: "",
      img: image,
      unit: units[0],
      department: departments[0].value,
    },
  });

  const onSubmit = (values) => {
    if (!values.img) return toast.info("Rasm yuklang !");
    const formData = new FormData();
    Object.keys(values).map((key) => formData.append(key, typeof values[key] === "string" ? values[key]?.trim() : values[key]));
    dispatch(setLoader(true));
    postRequest("product", formData, user?.token)
      .then(({ data }) => {
        dispatch(setLoader(false));
        toast.success(data?.message);
        handleOrders(true);
        close();
      })
      .catch((err) => {
        dispatch(setLoader(false));
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <FileInput
          required
          onChange={(object) => {
            const objectURL = URL.createObjectURL(object);
            setImage(objectURL);
          }}
          label={
            image ? (
              <Image
                src={image}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                }}
              />
            ) : (
              "Rasm"
            )
          }
          description="Rasm tanlang"
          placeholder="Rasm tanlang"
          accept="image/*"
          {...form.getInputProps("img")}
        />
        {inputs.map((input) => (
          <TextInput
            key={input.name}
            mt={"md"}
            required
            withAsterisk
            label={input.label}
            placeholder={input.label}
            onInput={input.typingChange}
            {...form.getInputProps(input.name)}
          />
        ))}
        <Select
          required
          mt={"md"}
          label="Birligi"
          data={units}
          defaultValue={units[0]}
          {...form.getInputProps("unit")}
        />
        <Select
          required
          mt={"md"}
          label="Bo'lim"
          data={departments}
          {...form.getInputProps("department")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Yuborish</Button>
        </Group>
      </form>
    </Box>
  );
}

export default FormCreate;
