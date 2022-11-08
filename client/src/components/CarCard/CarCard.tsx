import { Box, Heading, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { IProps } from "../../interfaces";



export const CarCard = ({ car }: IProps) => {
  return (
    <Box w="500px" bgColor="#c9c4c4" p="15px" borderRadius="12px" mt="12px">
      <Box display="flex" justifyContent="space-between">
        <Heading fontSize="md">{`${car.brand} - ${car.model}`}</Heading>
        <Box display="flex" gap="12px">
          <Box p="4px" bgColor="#6083f7" borderRadius="3px" display="flex">
            <Icon as={AiOutlineEdit} />
          </Box>
          <Box p="4px" bgColor="#ee3232" borderRadius="3px" display="flex">
            <Icon as={AiOutlineDelete} />
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Text>Ano Fabricação: {car.year_fabrication}</Text>
        <Text>Cor: {car.color}</Text>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Text>Ano Modelo: {car.year_model}</Text>
        <Text>Câmbio: {car.shift}</Text>
      </Box>
    </Box>
  );
};
