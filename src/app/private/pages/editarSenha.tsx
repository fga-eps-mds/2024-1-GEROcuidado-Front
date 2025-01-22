import React, { useState } from "react";
import { forgotPassword, resetPassword } from "../../services/user.service";
import { Image, Alert, Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import BackButton from "../../components/BackButton"

export default function ResetSenha() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleResetarSenha = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }
    else if(email && token && password){
        setShowLoading(true)
        await(10)
        Alert.alert("")
        router.push("/public/login")
      }
    else if(!token){
        Alert.alert("Erro", "Por favor, insira um token válido.");
    }
    else if(!password){
        Alert.alert("Erro", "Por favor, insira uma senha");
    try {
      const response = await resetPassword(email, token, password);
      console.log("Senha alterada! A Gero agradece!", response);
    } catch (error) {
      console.error("Erro ao alterar a senha", error.message);
    }
    };

  return (

    
    <View style={styles.container}>
    <BackButton color="#000" route="/" />

      <View style={styles.imagem}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={{ width: 220, height: 90 }}
        />
      </View>

      <Text style={styles.title}>Altere sua senha:</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="black" 
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Token"
          value={token}
          onChangeText={setToken}
          keyboardType="numeric"
          placeholderTextColor="black" 
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          value={password}
          onChangeText={setPassword}
          keyboardType="default"
          placeholderTextColor="black" 
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleResetarSenha}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
    },
  logo: {
    width: 280,
    height: 90,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 19,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    width: "90%",
    maxWidth: 400,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#333",
    width: "100%",
  },
  button: {
    width: "90%",
    maxWidth: 200,
    backgroundColor: "#2CCDB5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  imagem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
}