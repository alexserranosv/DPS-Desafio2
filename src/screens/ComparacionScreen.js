import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Title, Subheading, Card, Paragraph } from "react-native-paper";

const ComparacionScreen = ({ route, navigation }) => {
  const { ingresos, egresos } = route.params;

  const ingresosMontoTotal = ingresos.reduce(
    (acc, ingreso) => acc + parseFloat(ingreso.monto),
    0
  );
  const egresosMontoTotal = egresos.reduce(
    (acc, egreso) => acc + parseFloat(egreso.monto),
    0
  );

  const data = [
    {
      name: "Ingresos",
      population: ingresosMontoTotal,
      color: "#4CAF50",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Egresos",
      population: egresosMontoTotal,
      color: "#F44336",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Comparación de Ingresos vs Egresos</Title>
        <Card style={styles.card}>
          <Card.Content>
            <PieChart
              data={data}
              width={Dimensions.get("window").width - 60}
              height={220}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Subheading>Resumen Financiero</Subheading>
            {ingresos.map((ingreso, index) => (
              <Paragraph key={index} style={styles.ingresos}>
                {ingreso.tipoIngreso}: ${parseFloat(ingreso.monto).toFixed(2)}
              </Paragraph>
            ))}
            {egresos.map((egreso, index) => (
              <Paragraph key={index} style={styles.egresos}>
                {egreso.tipoEgreso}: ${parseFloat(egreso.monto).toFixed(2)}
              </Paragraph>
            ))}
            <Paragraph style={styles.balance}>
              Balance: ${(ingresosMontoTotal - egresosMontoTotal).toFixed(2)}
            </Paragraph>
          </Card.Content>
        </Card>
        <Button
          title="Ver Productos Financieros"
          onPress={() => navigation.navigate('Tab2', { ingresos, egresos })}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  ingresos: {
    color: "#4CAF50",
  },
  egresos: {
    color: "#F44336",
  },
  balance: {
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default ComparacionScreen;
