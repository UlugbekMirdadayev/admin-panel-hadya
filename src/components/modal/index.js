import React from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const ModalScreen = ({ btn_title, title, body, color }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title={title}>
        {body({ close })}
      </Modal>
      <Button bg={color} onClick={open}>
        {btn_title}
      </Button>
    </>
  );
};

export default ModalScreen;
