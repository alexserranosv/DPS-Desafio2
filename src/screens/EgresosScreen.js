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

const tiposEgresos = [
  "Alquiler/Hipoteca",
  "Canasta Básica",
  "Financiamientos",
  "Transporte",
  "Servicios públicos",
  "Salud y Seguro",
  "Egresos Varios",
];

const EgresosSchema = Yup.object().shape({
  tipoEgreso: Yup.string().required("El tipo de egreso es requerido"),
  monto: Yup.number()
    .positive("El monto debe ser positivo")
    .required("El monto es requerido"),
});

const EgresosScreen = ({ navigation, route }) => {
  const { ingresos } = route.params;
  const [egresos, setEgresos] = useState([]);

  const agregarEgreso = (values, resetForm) => {
    setEgresos([...egresos, values]);
    resetForm();
  };

  const eliminarEgreso = (index) => {
    Alert.alert(
      "Eliminar Egreso",
      "¿Estás seguro de que deseas eliminar este egreso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            const nuevosEgresos = egresos.filter((_, i) => i !== index);
            setEgresos(nuevosEgresos);
          },
        },
      ]
    );
  };

  const editarEgreso = (index, values) => {
    const nuevosEgresos = egresos.map((egreso, i) =>
      i === index ? values : egreso
    );
    setEgresos(nuevosEgresos);
  };

  return (
    <View style={styles.container}>
      <Subheading style={styles.subheading}>
        Ingrese sus datos de egresos
      </Subheading>
      <Formik
        initialValues={{ tipoEgreso: "", monto: "" }}
        validationSchema={EgresosSchema}
        onSubmit={(values, { resetForm }) => {
          agregarEgreso(values, resetForm);
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
                selectedValue={values.tipoEgreso}
                onValueChange={handleChange("tipoEgreso")}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione tipo de egreso" value="" />
                {tiposEgresos.map((tipo) => (
                  <Picker.Item key={tipo} label={tipo} value={tipo} />
                ))}
              </Picker>
            </View>
            <HelperText
              type="error"
              visible={touched.tipoEgreso && errors.tipoEgreso}
            >
              {errors.tipoEgreso}
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
              Agregar Egreso
            </Button>
          </View>
        )}
      </Formik>

      <FlatList
        data={egresos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={`${item.tipoEgreso}: $${item.monto}`}
            right={() => (
              <View style={styles.iconContainer}>
                <IconButton
                  icon="delete"
                  onPress={() => eliminarEgreso(index)}
                />
              </View>
            )}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={() => {
          if (egresos.length == 0) {
            Alert.alert("Error", "Debe agregar al menos un egreso.");
          } else {
            navigation.navigate("Comparacion", { ingresos, egresos });
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

export default EgresosScreen;
