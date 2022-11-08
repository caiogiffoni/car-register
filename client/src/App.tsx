import { useForm } from "react-hook-form";

import { Box, Heading, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputForm } from "./components/InputForm/Input";
import api from "./services";
import { useEffect, useState } from "react";
import { CarCard } from "./components/CarCard/CarCard";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Tag,
} from "@chakra-ui/react";

function App() {
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

  interface IPost {
    brand: string;
    model: string;
    color: string;
    year_fabrication: number;
    year_model: number;
    shift: string;
  }

  const [cars, setCars] = useState([]);

  const onSubmitFunction = async (data: IPost) => {
    api
      .post("/car", data)
      .then((_) => {
        getCars();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    api
      .get(`/car`)
      .then((res) => setCars(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgColor="#c9c4c4"
        p="40px"
        mt="40px"
        borderRadius="15px"
        w="600px"
        display="flex"
        flexDirection="column"
      >
        <Heading textAlign="center">Cadastro de Carros</Heading>
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
            placeholder="Insira a marca do carro"
            error={errors.brand}
            colorWordsDesc="black"
            {...register("brand")}
          />
          <InputForm
            placeholder="Insira a modelo do carro"
            error={errors.model}
            colorWordsDesc="black"
            {...register("model")}
          />
          <InputForm
            placeholder="Insira a cor do carro"
            error={errors.color}
            colorWordsDesc="black"
            {...register("color")}
          />
          <InputForm
            placeholder="Insira o ano de fabricação do carro"
            error={errors.year_fabrication}
            colorWordsDesc="black"
            {...register("year_fabrication")}
          />
          <InputForm
            placeholder="Insira o ano do modelo carro"
            error={errors.year_model}
            colorWordsDesc="black"
            {...register("year_model")}
          />
          <FormControl>
            <Select
              placeholder="Insira o tipo de câmbio do carro"
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
        <Button
          bgColor="#365fe6"
          mt="15px"
          color="white"
          onClick={handleSubmit(onSubmitFunction)}
        >
          Enviar
        </Button>
      </Box>
      <Box m="40px 0px">
        <Heading textAlign="center">Carros Cadastrados</Heading>
        <Box display="flex" justifyContent="space-around" mt="15px">
          <Tag size="lg" variant="solid" colorScheme="teal">
            Manual
          </Tag>
          <Tag size="lg" variant="solid" colorScheme="teal">
            Automático
          </Tag>
        </Box>
        {cars && cars.map((car) => <CarCard car={car} />)}
      </Box>
    </Box>
  );
}

export default App;
