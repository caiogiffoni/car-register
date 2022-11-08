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
  FormControl,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { ICar, IPost } from "../../interfaces";
import api from "../../services";
import { InputForm } from "../InputForm/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

interface IEdit {
  car: ICar;
  getCars: () => void;
}

export const ModalEdit = ({ car, getCars }: IEdit) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const schema = yup.object().shape({
    brand: yup.string().required("Campo obrigatório!"),
    model: yup.string().required("Campo obrigatório!"),
    color: yup.string().required("Campo obrigatório!"),
    year_fabrication: yup
      .number()
      .typeError("Ano deve ser um número")
      .required("Campo obrigatório!"),
    year_model: yup
      .number()
      .typeError("Ano deve ser um número")
      .required("Campo obrigatório!"),
    shift: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data: IPost) => {
    api
      .patch(`/car/${car.id}`, data)
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
        bgColor="#6083f7"
        borderRadius="3px"
        display="flex"
        _hover={{ cursor: "pointer" }}
        onClick={onOpen}
      >
        <Icon as={AiOutlineEdit} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Registro de carro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              w="100%"
              minH="320px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="8px"
              mt="15px"
            >
              <InputForm
                placeholder={"Insira a marca do carro"}
                defaultValue={car.brand}
                error={errors.brand}
                colorWordsDesc="black"
                {...register("brand")}
              />
              <InputForm
                placeholder="Insira a modelo do carro"
                defaultValue={car.model}
                error={errors.model}
                colorWordsDesc="black"
                {...register("model")}
              />
              <InputForm
                placeholder="Insira a cor do carro"
                defaultValue={car.color}
                error={errors.color}
                colorWordsDesc="black"
                {...register("color")}
              />
              <InputForm
                placeholder="Insira o ano de fabricação do carro"
                defaultValue={car.year_fabrication}
                error={errors.year_fabrication}
                colorWordsDesc="black"
                {...register("year_fabrication")}
              />
              <InputForm
                placeholder="Insira o ano do modelo carro"
                defaultValue={car.year_model}
                error={errors.year_model}
                colorWordsDesc="black"
                {...register("year_model")}
              />
              <FormControl>
                <Select
                  placeholder="Insira o tipo de câmbio do carro"
                  defaultValue={car.shift}
                  color="gray.500"
                  bgColor="gray.50"
                  {...register("shift")}
                >
                  <option value="Manual">Manual</option>
                  <option value="Automático">Automático</option>
                </Select>
                <FormErrorMessage>{errors.shift?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmit(onSubmitFunction)}
            >
              Editar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
