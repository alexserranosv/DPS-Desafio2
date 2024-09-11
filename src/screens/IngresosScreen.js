import React, { useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextInput,
  HelperText,
  Subheading,
  List,
  IconButton,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const tiposIngresos = [
  "Salario",
  "Negocio Propio",
  "Pensiones",
  "Remesas",
  "Ingresos Varios",
];

const IngresosSchema = Yup.object().shape({
  tipoIngreso: Yup.string().required("El tipo de ingreso es requerido"),
  monto: Yup.number()
    .positive("El monto debe ser positivo")
    .required("El monto es requerido"),
});

const IngresosScreen = ({ navigation }) => {
  const [ingresos, setIngresos] = useState([]);

  const agregarIngreso = (values, resetForm) => {
    setIngresos([...ingresos, values]);
    resetForm();
  };

  const eliminarIngreso = (index) => {
    Alert.alert(
      "Eliminar Ingreso",
      "¿Estás seguro de que deseas eliminar este ingreso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            const nuevosIngresos = ingresos.filter((_, i) => i !== index);
            setIngresos(nuevosIngresos);
          },
        },
      ]
    );
  };

  const editarIngreso = (index, values) => {
    const nuevosIngresos = ingresos.map((ingreso, i) =>
      i === index ? values : ingreso
    );
    setIngresos(nuevosIngresos);
  };

  return (
    <View style={styles.container}>
      <Subheading style={styles.subheading}>
        Ingrese sus datos de ingresos
      </Subheading>
      <Formik
        initialValues={{ tipoIngreso: "", monto: "" }}
        validationSchema={IngresosSchema}
        onSubmit={(values, { resetForm }) => {
          agregarIngreso(values, resetForm);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.tipoIngreso}
                onValueChange={handleChange("tipoIngreso")}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione tipo de ingreso" value="" />
                {tiposIngresos.map((tipo) => (
                  <Picker.Item key={tipo} label={tipo} value={tipo} />
                ))}
              </Picker>
            </View>
            <HelperText
              type="error"
              visible={touched.tipoIngreso && errors.tipoIngreso}
            >
              {errors.tipoIngreso}
            </HelperText>

            <TextInput
              label="Monto"
              onChangeText={handleChange("monto")}
              onBlur={handleBlur("monto")}
              value={values.monto}
              keyboardType="numeric"
              style={styles.input}
            />
            <HelperText type="error" visible={touched.monto && errors.monto}>
              {errors.monto}
            </HelperText>

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Agregar Ingreso
            </Button>
          </View>
        )}
      </Formik>

      <FlatList
        data={ingresos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={`${item.tipoIngreso}: $${item.monto}`}
            right={() => (
              <View style={styles.iconContainer}>
                <IconButton
                  icon="delete"
                  onPress={() => eliminarIngreso(index)}
                />
              </View>
            )}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={() => {
          if (ingresos.length === 0) {
            Alert.alert("Error", "Debe agregar al menos un ingreso.");
          } else {
            navigation.navigate("Egresos", { ingresos });
          }
        }}
        style={styles.button}
      >
        Siguiente
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  subheading: {
    marginBottom: 20,
    textAlign: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: "row",
  },
});

export default IngresosScreen;
