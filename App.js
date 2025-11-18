import React, { useRef, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from "@env";
import { StyleSheet, View, Dimensions, TextInput, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const mapRef = useRef(null);

  // CORRETO: estado do input
  const [search, setSearch] = useState("");

  // CORRETO: estado da região do mapa
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

async function buscarLocal() {
  try {
    if (!search.trim()) {
      alert("Digite um local para buscar");
      return;
    }

    const url =
      `https://maps.googleapis.com/maps/api/geocode/json?address=` +
      encodeURIComponent(search) +
      `&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("Resposta da API:", data);

    if (!data.results || data.results.length === 0) {
      alert("Nenhum resultado encontrado.");
      return;
    }

    const { lat, lng } = data.results[0].geometry.location;

    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 800);

  } catch (error) {
    console.log("Erro ao buscar:", error);
    alert("Erro ao buscar localização.");
  }
}

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>

        {/* Campo de pesquisa */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar local..."
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
          <Button title="OK" onPress={buscarLocal} />
        </View>

        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
        >
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
    top: "5%",
    width: "100%",
    paddingHorizontal: 10,
    zIndex: 999,
    flexDirection: "row",
    gap: 8
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    elevation: 3,
  },
});