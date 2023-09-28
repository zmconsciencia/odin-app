import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClientView = () => {
  const navigate = useNavigate();
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const inputWidth : number = 300;
  const marginWidth : string = "10%";

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && logoImage) {
      setLogoImage(event.target.files[0]);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    industry: Yup.string().required("Industry is required"),
    addressLine1: Yup.string().required("Address Line 1 is required"),
    addressLine2: Yup.string(),
    zipCode: Yup.string()
      .required("Zip Code is required"),
    city: Yup.string().required("City is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });

  interface LocalClientDto {
    name: string;
    industry: string;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    city: string;
    email: string;
    phoneNumber: string;
  }

  const FormComponent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
      setIsSubmitting(true);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/client",
          formik.values
        );

        if (response.status === 201) {
          alert("Client created successfully");
          formik.resetForm();
        } else {
          alert("Error creating client");
          console.error("Error creating client:", response.data);
        }
      } catch (error) {
        console.error("Error creating client:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const formik = useFormik<LocalClientDto>({
      initialValues: {
        name: "",
        industry: "",
        addressLine1: "",
        addressLine2: "",
        zipCode: "",
        city: "",
        email: "",
        phoneNumber: "",
      },
      onSubmit: handleSubmit,
      validationSchema: validationSchema,
    });

    return (
      <>
        <Center w={"100%"} >
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <VStack
              spacing={4}
              align="flex-start"
              padding={10}
              borderRadius={10}
              bg={"white"}
              marginTop={5}
              marginStart={marginWidth}
              marginEnd={marginWidth}
            >
              <Text fontWeight="bold" fontSize="lg" id="general-info">
                General Information
              </Text>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  name="name"
                  type="text"
                  placeholder="Name"
                  maxW={inputWidth}
                />
              </FormControl>
              {formik.touched.name && formik.errors.name && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.name}</div>)}
              <FormControl>
                <FormLabel>Industry</FormLabel>
                <Input
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  name="industry"
                  placeholder="Industry"
                  maxW={inputWidth}
                />
              </FormControl>
              {formik.touched.industry && formik.errors.industry && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.industry}</div>)}
            </VStack>
            <VStack
              spacing={4}
              align="flex-start"
              padding={10}
              borderRadius={10}
              bg={"white"}
              marginTop={5}
              marginStart={marginWidth}
              marginEnd={marginWidth}
            >
              <Text fontWeight="bold" fontSize="lg" id="address-contact">
                Address & Contact
              </Text>
              <FormControl>
                <FormLabel>Address Line 1</FormLabel>
                <Input
                  value={formik.values.addressLine1}
                  onChange={formik.handleChange}
                  name="addressLine1"
                  type="text"
                  placeholder="Address Line 1"
                  maxW={inputWidth}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address Line 2</FormLabel>
                <Input
                  value={formik.values.addressLine2}
                  onChange={formik.handleChange}
                  name="addressLine2"
                  type="text"
                  placeholder="Address Line 2"
                  maxW={inputWidth}
                />
              </FormControl>
              {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.addressLine1}</div>)}
              <FormControl>
                <FormLabel>Zip Code</FormLabel>
                <Input
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  name="zipCode"
                  type="text"
                  placeholder="Zip Code"
                  maxW={170}
                />
              </FormControl>
              {formik.touched.zipCode && formik.errors.zipCode && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.zipCode}</div>)}
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  name="city"
                  type="text"
                  placeholder="City"
                  maxW={inputWidth}
                />
              </FormControl>
              {formik.touched.city && formik.errors.city && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.city}</div>)}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  maxW={inputWidth}
                />
              </FormControl>
              {formik.touched.email && formik.errors.email && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.email}</div>)}
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  name="phoneNumber"
                  type="text"
                  placeholder="+351"
                  maxW={inputWidth}
                />
              </FormControl>
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.phoneNumber}</div>)}
            </VStack>
            <VStack
              spacing={4}
              align="flex-start"
              padding={10}
              borderRadius={10}
              bg={"white"}
              marginTop={5}
              marginStart={marginWidth}
              marginEnd={marginWidth}
            >
              <Text fontWeight="bold" fontSize="lg" id="client-logo">
                Client Logo
              </Text>
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleLogoFileChange}
                />
              </FormControl>
            </VStack>
            <Flex
              position="sticky"
              justify={"end"}
              bottom={0}
              bg="white"
              zIndex="sticky"
              borderTop={"1px solid gainsboro"}
            >
              <Box p={5}>
                <Button colorScheme="gray" onClick={() => navigate("/")}>
                  Cancel
                </Button>
              </Box>
              <Box p={5}>
                <Button type="submit" colorScheme="blue" disabled={isSubmitting}>
                  Save
                </Button>
              </Box>
            </Flex>
          </form>
        </Center>
      </>
    );
  };

  return (
    <>
      {/* Page Header */}
      <Flex justify={"center"} p={3} position={"sticky"} bg={"white"} zIndex={"sticky"} top={0}>
        Header
      </Flex>
      <Flex justify={"start"} position={"sticky"} bg={"white"} zIndex={"sticky"} top={0} flexDirection={"column"}>
        <Breadcrumb marginStart={marginWidth} marginEnd={marginWidth} marginTop={5}>
          <BreadcrumbItem>
            <ChevronLeftIcon color='gray.700' />
            <BreadcrumbLink href="/">Back to Clients</BreadcrumbLink>
          </BreadcrumbItem> 
        </Breadcrumb>
        <Text fontSize="2xl" marginStart={marginWidth}>New Client</Text>
      </Flex>
      <Center bg={"#EDF2F7"}>{<FormComponent />}</Center>
    </>
  );
};

export default ClientView;
