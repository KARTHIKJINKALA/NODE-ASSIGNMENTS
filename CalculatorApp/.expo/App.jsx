import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

export default function App() {
  const [input, setInput] = useState('');

  // Handle input press
  const handlePress = (value) => {
    setInput(input + value);
  };

  // Handle evaluation
  const evaluate = () => {
    try {
      setInput(eval(input).toString());
    } catch (e) {
      setInput('Error');
    }
  };

  // Handle clearing the input
  const clearInput = () => {
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{input}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button mode="outlined" onPress={() => handlePress('1')} style={styles.button}>1</Button>
          <Button mode="outlined" onPress={() => handlePress('2')} style={styles.button}>2</Button>
          <Button mode="outlined" onPress={() => handlePress('3')} style={styles.button}>3</Button>
          <Button mode="outlined" onPress={() => handlePress('+')} style={styles.button}>+</Button>
        </View>
        <View style={styles.row}>
          <Button mode="outlined" onPress={() => handlePress('4')} style={styles.button}>4</Button>
          <Button mode="outlined" onPress={() => handlePress('5')} style={styles.button}>5</Button>
          <Button mode="outlined" onPress={() => handlePress('6')} style={styles.button}>6</Button>
          <Button mode="outlined" onPress={() => handlePress('-')} style={styles.button}>-</Button>
        </View>
        <View style={styles.row}>
          <Button mode="outlined" onPress={() => handlePress('7')} style={styles.button}>7</Button>
          <Button mode="outlined" onPress={() => handlePress('8')} style={styles.button}>8</Button>
          <Button mode="outlined" onPress={() => handlePress('9')} style={styles.button}>9</Button>
          <Button mode="outlined" onPress={() => handlePress('')} style={styles.button}></Button>
        </View>
        <View style={styles.row}>
          <Button mode="outlined" onPress={() => handlePress('0')} style={styles.button}>0</Button>
          <Button mode="outlined" onPress={clearInput} style={styles.button}>C</Button>
          <Button mode="outlined" onPress={evaluate} style={[styles.button, styles.equalsButton]}>=</Button>
          <Button mode="outlined" onPress={() => handlePress('/')} style={styles.button}>/</Button>
        </View>
      </View>
      <Text style={styles.footer}>Calc by Karthik</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  display: {
    width: '100%',
    padding: 20,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 40,
    color: '#fff',
  },
  buttonsContainer: {
    width: '100%',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '20%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  equalsButton: {
    backgroundColor: 'green',
    color: '#fff',
  },
  footer: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    fontWeight: 'bold',
  },
});