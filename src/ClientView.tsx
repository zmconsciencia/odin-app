import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";

const ClientView = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Headquarters Address is required"),
    industry: Yup.string().required("Industry is required"),
    pointName: Yup.string().required("Point of Contact Name is required"),
    pointEmail: Yup.string()
      .email("Invalid email address")
      .required("Point of Contact Email is required"),
  });

  interface LocalClientDto {
    name: string;
    location: string;
    industry: string;
    pointName: string;
    pointEmail: string;
  }

  const FormComponent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
      setIsSubmitting(true);

      // Simulate an API call (replace this with your actual logic)
      try {
        // Simulate a successful API response
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Client created successfully");
        formik.resetForm();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const formik = useFormik<LocalClientDto>({
      initialValues: {
        name: "",
        location: "",
        industry: "",
        pointName: "",
        pointEmail: "",
      },
      onSubmit: handleSubmit,
      validationSchema: validationSchema,
    });

    return (
      <>
        <Center>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  name="name"
                  type="text"
                />
              </FormControl>
              {formik.touched.name && formik.errors.name && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.name}</div>
              )}
              <FormControl>
                <FormLabel>Headquarters Address</FormLabel>
                <Input
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  name="location"
                  placeholder="Headquarters Address"
                />
              </FormControl>
              {formik.touched.location && formik.errors.location && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.location}</div>
              )}
              <FormControl>
                <FormLabel>Industry</FormLabel>
                <Input
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  name="industry"
                  placeholder="Industry"
                />
              </FormControl>
              {formik.touched.industry && formik.errors.industry && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.industry}</div>
              )}
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formik.values.pointName}
                  onChange={formik.handleChange}
                  name="pointName"
                  placeholder="Name"
                />
              </FormControl>
              {formik.touched.pointName && formik.errors.pointName && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.pointName}</div>
              )}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={formik.values.pointEmail}
                  onChange={formik.handleChange}
                  name="pointEmail"
                  type="email"
                  placeholder="Email"
                />
              </FormControl>
              {formik.touched.pointEmail && formik.errors.pointEmail && (
                <div className="error-message" style={{color: "red"}}>{formik.errors.pointEmail}</div>
              )}
              <Flex>
                <Box p={10}>
                  <Button colorScheme="gray" onClick={() => navigate("/")}>
                    Cancel
                  </Button>
                </Box>
                <Spacer />
                <Box p={10}>
                  <Button type="submit" colorScheme="blue" disabled={isSubmitting}>
                    Save
                  </Button>
                </Box>
              </Flex>
            </VStack>
          </form>
        </Center>
      </>
    );
  };

  return (
    <>
      {/*Page Header*/}
      <Center>{<FormComponent />}</Center>
    </>
  );
};

export default ClientView;
