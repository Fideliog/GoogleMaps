import React, { useRef, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from "@env"; // importa a chave do .env
import { StyleSheet, View, Dimensions, TextInput, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {

  const mapRef = useRef(null); // referência do mapa para animar a câmera

  const [search, setSearch] = useState(""); // guarda o texto digitado
  const [region, setRegion] = useState({
    // região inicial do mapa (São Paulo)
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Função que chama a API do Google para buscar um local digitado
  async function buscarLocal() {
    try {
      if (!search.trim()) {
        alert("Digite um local para buscar");
        return;
      }

      // URL da API Geocoding para converter nome/CEP/endereço em coordenadas
      const url =
        `https://maps.googleapis.com/maps/api/geocode/json?address=` +
        encodeURIComponent(search) +
        `&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url); // faz a requisição
      const data = await response.json();

      console.log("Resposta da API:", data);

      // se não encontrar nenhum local
      if (!data.results || data.results.length === 0) {
        alert("Nenhum resultado encontrado.");
        return;
      }

      // pega latitude e longitude do primeiro resultado
      const { lat, lng } = data.results[0].geometry.location;

      // define a nova região para centralizar o mapa
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion); // atualiza a região
      mapRef.current?.animateToRegion(newRegion, 800); // move a câmera suavemente

    } catch (error) {
      console.log("Erro ao buscar:", error);
      alert("Erro ao buscar localização.");
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>

        {/* Caixa de busca por cima do mapa */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar local..."
            style={styles.input}
            value={search}
            onChangeText={setSearch} // atualiza o texto digitado
          />
          <Button title="OK" onPress={buscarLocal} /> {/* botão para buscar */}
        </View>

        {/* Mapa */}
        <MapView
          ref={mapRef} // referência para animar o mapa
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region} // região atual exibida
        >
          {/* Marca o ponto buscado */}
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude
            }}
            title={"Local buscado"}
          />
        </MapView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchBox: {
    position: "absolute",
    top: "5%", // evita overlay com a status bar
    width: "100%",
    paddingHorizontal: 10,
    zIndex: 999, // fica por cima do mapa
    flexDirection: "row",
    gap: 8
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    elevation: 3, // leve sombra
  },
});
