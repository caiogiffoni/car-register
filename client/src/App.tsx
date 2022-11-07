import { useForm } from "react-hook-form";

import "./App.css";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputForm } from "./components/InputForm/Input";
import api from "./services";

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

  const onSubmitFunction = async (data: IPost) => {
    console.log("envieou");
    api
      .post("/car", data)
      .then((res) => {
        console.log("ok");
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

  return (
    <Box bgColor="#c9c4c4" p="15px" borderRadius="15px">
      <Heading>Cadastro de Carros</Heading>
      <Box
        w="600px"
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
        <InputForm
          placeholder="Insira o tipo de câmbio do carro"
          error={errors.shift}
          colorWordsDesc="black"
          {...register("shift")}
        />
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
  );
}

export default App;
