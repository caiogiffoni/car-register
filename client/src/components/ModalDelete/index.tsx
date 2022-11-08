import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import api from "../../services";

interface IDelete {
  id: string;
  getCars: () => void;
}

export const ModalDelete = ({ id, getCars }: IDelete) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteCar = (id: string) => {
    api
      .delete(`/car/${id}`)
      .then((res) => {
        getCars();
      })
      .catch((e) => console.log(e));
    onClose();
  };
  return (
    <>
      <Box
        p="4px"
        bgColor="#ee3232"
        borderRadius="3px"
        display="flex"
        _hover={{ cursor: "pointer" }}
        onClick={onOpen}
      >
        <Icon as={AiOutlineDelete} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar Registro de carro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Tem certeza que deseja deletar esse registro?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="red" onClick={() => deleteCar(id)}>
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
