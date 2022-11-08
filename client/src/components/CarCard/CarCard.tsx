import { Box, Heading, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { IProps } from "../../interfaces";
import { ModalDelete } from "../ModalDelete";

export const CarCard = ({ car, getCars }: IProps) => {
  return (
    <Box
      w={["100%", "400px", "500px"]}
      bgColor="#c9c4c4"
      p="15px"
      borderRadius="12px"
      mt="12px"
    >
      <Box display="flex" justifyContent="space-between">
        <Heading fontSize="md">{`${car.brand} - ${car.model}`}</Heading>
        <Box display="flex" gap="12px">
          <Box p="4px" bgColor="#6083f7" borderRadius="3px" display="flex">
            <Icon as={AiOutlineEdit} />
          </Box>
          <ModalDelete id={car.id} getCars={getCars} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Text>Fabricação: {car.year_fabrication}</Text>
        <Text>Cor: {car.color}</Text>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Text>Modelo: {car.year_model}</Text>
        <Text>Câmbio: {car.shift}</Text>
      </Box>
    </Box>
  );
};
