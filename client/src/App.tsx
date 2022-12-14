import { useForm } from "react-hook-form";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputForm } from "./components/InputForm/Input";
import api from "./services";
import { useEffect, useState } from "react";
import { CarCard } from "./components/CarCard/CarCard";
import { FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { ICar, IPost } from "./interfaces";
import { useToast } from "@chakra-ui/react";

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

  const [cars, setCars] = useState<ICar[]>([]);
  const [filteredCars, setfilteredCars] = useState<ICar[]>([]);
  const toast = useToast();

  const onSubmitFunction = async (data: IPost) => {
    api
      .post("/car", data)
      .then((_) => {
        getCars();
        toast({
          title: "Registro criado.",
          description: "Seu registro de carro foi criado.",
          status: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "This car already exists") {
          toast({
            title: "Esse carro já existe.",
            description: "Esse carro já foi cadastrado.",
            status: "error",
          });
        }
        toast({
          title: err.response.data.message,
          description: err.response.data.message,
          status: "error",
        });
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
      .then((res) => {
        setCars(res.data);
        setfilteredCars(res.data);
      })
      .catch((e) => console.log(e));
  };

  const changeFilter = async (filter: string) => {
    const filterCars = cars.filter((car) => car.shift === filter);
    setfilteredCars(filterCars);
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
        w={["80%", "60%", "600px"]}
        display="flex"
        flexDirection="column"
      >
        <Heading textAlign="center" fontSize={["lg", "xl", "2xl"]}>
          Cadastro de Carros
        </Heading>
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
      {cars.length > 0 ? (
        <Box
          m="40px 0px"
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading textAlign="center" fontSize={["lg", "xl", "2xl"]}>
            Carros Cadastrados
          </Heading>
          <Box
            display="flex"
            justifyContent="space-around"
            mt="15px"
            w={["80%", "70%", "600px"]}
          >
            <Button
              autoFocus
              colorScheme="blue"
              size={["sm", "md"]}
              onClick={() => getCars()}
              _focus={{
                bgColor: "green",
              }}
            >
              Todos
            </Button>
            <Button
              colorScheme="blue"
              size={["sm", "md"]}
              onClick={() => changeFilter("Manual")}
              _focus={{
                bgColor: "green",
              }}
            >
              Manual
            </Button>
            <Button
              colorScheme="blue"
              size={["sm", "md"]}
              onClick={() => changeFilter("Automático")}
              _focus={{
                bgColor: "green",
              }}
            >
              Automático
            </Button>
          </Box>
          <Box
            w={["80%", "70%", "100%"]}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {filteredCars &&
              filteredCars.map((car, index) => (
                <CarCard car={car} key={index} getCars={getCars} />
              ))}
          </Box>
        </Box>
      ) : (
        <Box
          m="40px 0px"
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="space-around"
            mt="15px"
            w={["80%", "70%", "600px"]}
          >
            <Heading textAlign="center" fontSize={["lg", "xl", "2xl"]}>
              Você ainda não tem nenhum carro cadastrado! Cadastre um carro
              acima
            </Heading>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
