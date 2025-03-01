import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./Home/Welcome";
import HomeScreen from "./Home/HomeScreen";
import AgendaScreen from "./Agenda/AgendaScreen";
import HorarioCultosScreen from "./Agenda/HorarioCultosScreen";
import HorarioActividadesScreen from "./Agenda/HorarioActividadesScreen";
import HorarioOtrosScreen from "./Agenda/HorarioOtrosSreen";
import LoginScreen from "./IniciarSesion/IniciarSesion";
import ChangePasswordScreen from "./Cambio/CambioC";
import CarnetScreen from "./Carnet/CarnetScreen";
import MenuScreen from "./MenuLogin/MenuScreen";
import DoctrinaScreen from "./Doctrina/DoctrinaScreen";
import QuienesSomosScreen from "./QuienesSomos/QuienesSomosScreen";
import RedesSocialesScreen from "./RedesSociales/RedesSocialesScreen";
import RutasScreen from "./Rutas/RutasScreen";
import CertificadoBautismo from "./Carnet/CertificadoBautismo";
import CertificadoMatrimonio from "./Carnet/CertificadoMatrimonio";
import VerMasNoticias from "./Home/VerMasNoticias";
import VerMasSermones from "./Home/VerMasSermones";
import ValidarCertificados from "./Certificados/ValidarCertificados";

export type RootStackParamList = {
  index: undefined;
  "Home/HomeScreen": undefined;
  "Agenda/AgendaScreen": undefined;
  "Agenda/HorarioCultosScreen": undefined;
  "Agenda/HorarioActividadesScreen": undefined;
  "Rutas/RutasScreen": undefined;
  "Agenda/HorarioOtrosScreen": undefined;
  "IniciarSesion/IniciarSesion": undefined;
  "Carnet/CarnetScreen": { Nombres: string, Apellidos: string, Cedula: string, Photo: string, IglesiaActual: string, CargoIglesia: string };
  "Carnet/CertificadoBautismo": { Nombres: string, Apellidos: string, Cedula: string, IglesiaBautismo: string, PastorBautismo: string, FechaBaustismo: string };
  "Carnet/CertificadoMatrimonio": { Nombres: string, Apellidos: string, EstadoCivil: string, NombreCoyuge: string, IglesiaMatrimonio: string, Ministro: string, Cedula: string, FechaMatrimonio: string };
  "Cambio/CambioC": { Password: string, Cedula: string };
  "QuienesSomos/QuienesSomosScreen": undefined;
  "Doctrina/DoctrinaScreen": undefined;
  "MenuLogin/MenuScreen": {
    Nombres: string;
    Apellidos: string;
    Cedula: string;
    FechaNacimiento: string;
    Activo: string;
    BautizadoAgua: string;
    BautizadoEspirutoSanto: string;
    CargoIglesia: string;
    CasadoEclesiaticamnete: string;
    CiudadResidencia: string;
    ContactoEmergencia: string;
    ContactoPersonal: string;
    Correo: string;
    DireccionDomicilio: string;
    EstadoCivil: string;
    FechaBaustismo: string;
    FechaMatrimonio: string;
    Funcion: string;
    IglesiaActual: string;
    IglesiaBautismo: string;
    IglesiaMatrimonio: string;
    Ministro: string;
    NombreCoyuge: string;
    Password: string;
    Pastor: string;
    PastorBautismo: string;
    País: string;
    Photo: string;
    Sexo: string;
  };
  "RedesSociales/RedesSocialesScreen": undefined;
  "Noticias/VerMasNoticias": undefined;
  "Home/VerMasSermones": undefined;
  "Certificados/ValidarCertificados": undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Pantallas de Inicio */}
      <Stack.Screen name="index" component={WelcomeScreen} />
      <Stack.Screen name="Home/HomeScreen" component={HomeScreen} />

      {/* Pantallas de Agenda */}
      <Stack.Screen name="Agenda/AgendaScreen" component={AgendaScreen} />
      <Stack.Screen name="Agenda/HorarioCultosScreen" component={HorarioCultosScreen} />
      <Stack.Screen name="Agenda/HorarioActividadesScreen" component={HorarioActividadesScreen} />
      <Stack.Screen name="Agenda/HorarioOtrosScreen" component={HorarioOtrosScreen} />

      {/* Pantallas de Inicio de Sesión */}
      <Stack.Screen name="IniciarSesion/IniciarSesion" component={LoginScreen} />
      <Stack.Screen name="Cambio/CambioC" component={ChangePasswordScreen} />

      {/* Pantallas de Carnet */}
      <Stack.Screen name="Carnet/CarnetScreen" component={CarnetScreen} />
      <Stack.Screen name="Carnet/CertificadoBautismo" component={CertificadoBautismo} />
      <Stack.Screen name="Carnet/CertificadoMatrimonio" component={CertificadoMatrimonio} />
      <Stack.Screen name="Certificados/ValidarCertificados" component={ValidarCertificados} />

      {/* Otras Pantallas */}
      <Stack.Screen name="Rutas/RutasScreen" component={RutasScreen} />
      <Stack.Screen name="Doctrina/DoctrinaScreen" component={DoctrinaScreen} />
      <Stack.Screen name="MenuLogin/MenuScreen" component={MenuScreen} />
      <Stack.Screen name="QuienesSomos/QuienesSomosScreen" component={QuienesSomosScreen} />
      <Stack.Screen name="RedesSociales/RedesSocialesScreen" component={RedesSocialesScreen} />

      {/* Pantalla de Ver Más Noticias */}
      <Stack.Screen name="Noticias/VerMasNoticias" component={VerMasNoticias} />
      <Stack.Screen name="Home/VerMasSermones" component={VerMasSermones} />
    </Stack.Navigator>
  );
};

export default MainStack;
