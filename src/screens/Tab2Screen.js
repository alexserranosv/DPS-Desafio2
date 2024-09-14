import React from 'react';
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import { Card, Title } from 'react-native-paper';

const Tab2Screen = ({ route }) => {
  const { ingresos = [], egresos = [] } = route.params || {};

  if (!ingresos.length || !egresos.length) {
    Alert.alert("Advertencia", "Debes registrar tus ingresos y egresos para acceder a los productos financieros.");
    return null;
  }

  const calcularMontoTotal = (items) => items.reduce((acc, item) => acc + parseFloat(item.monto), 0);

  const ingresosMontoTotal = calcularMontoTotal(ingresos);
  const egresosMontoTotal = calcularMontoTotal(egresos);
  const balance = ingresosMontoTotal - egresosMontoTotal;
  const disponibilidad = ingresosMontoTotal ? (balance / ingresosMontoTotal) * 100 : 0;

  const obtenerRecomendaciones = () => {
    if (egresosMontoTotal > ingresosMontoTotal) {
      return [
        "Te Ofrecemos financiamiento para consolidación de deudas.",
        "Contacta con un asesor financiero para más detalles."
      ];
    }

    if (ingresosMontoTotal < 360) {
      return ["Apertura de cuenta."];
    }

    if (ingresosMontoTotal < 700) {
      return disponibilidad > 40
        ? ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Crédito personal hasta $2,000.00."]
        : ["Apertura de cuenta."];
    }

    if (ingresosMontoTotal < 1200) {
      return disponibilidad <= 20
        ? ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Crédito personal hasta $2,000.00."]
        : disponibilidad <= 40
        ? ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Crédito personal hasta $2,000.00."]
        : ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Tarjeta de Crédito Oro.", "Crédito personal hasta $8,000.00."];
    }

    if (ingresosMontoTotal < 3000) {
      return disponibilidad <= 20
        ? ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Crédito personal hasta $2,000.00."]
        : disponibilidad <= 40
        ? ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Tarjeta de Crédito Oro.", "Crédito personal hasta $8,000.00."]
        : ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Tarjeta de Crédito Oro.", "Tarjeta de Crédito Platinum.", "Crédito personal hasta $25,000.00."];
    }

    return disponibilidad <= 20
      ? ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Tarjeta de Crédito Oro.", "Crédito personal hasta $8,000.00."]
      : disponibilidad < 30
      ? ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Tarjeta de Crédito Oro.", "Tarjeta de Crédito Platinum.", "Crédito personal hasta $25,000.00."]
      : ["Apertura de cuenta.", "Tarjeta de Crédito Clásica.", "Tarjeta de Crédito Oro.", "Tarjeta de Crédito Platinum.", "Tarjeta de Crédito Black.", "Crédito personal hasta $50,000.00."];
  };

  const recomendaciones = obtenerRecomendaciones();

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Calificación Financiera</Title>
      <Card style={styles.card}>
        <Card.Content>
          <FlatList
            data={recomendaciones}
            renderItem={({ item }) => (
              <Text style={styles.recommendationText}>- {item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Card.Content>
      </Card>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Balance Total: ${balance.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Disponibilidad: {disponibilidad.toFixed(1)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    padding: 10,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Tab2Screen;
