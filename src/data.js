/* Base de datos de los planes, extraída de:
  - Plan (1).docx
  - PDF-CHUY-ALMADA-RETO-45-DIAS-FULL_.pdf
*/
// Datos de: Plan (1).docx [cite: 8]
export const PLAN_PILAR_COMIDAS = [
  {
    dia: "Lunes",
    desayuno: "40g avena + 150ml leche descremada + ½ plátano + 1 huevo + 2 claras",
    almuerzo: "120g pollo + 100g arroz integral cocido + Ensalada verde (1 cda AO)",
    snack: "1 yogur griego (120g) + 1 fruta",
    cena: "100g pescado blanco + 200g verduras salteadas + 75g camote"
  },
  {
    dia: "Martes",
    desayuno: "60g pan integral + 2 huevos + 1 clara + 30g palta",
    almuerzo: "120g carne magra/tofu + 80g quinoa cocida + Verduras salteadas (1 cda AO)",
    snack: "15g frutos secos + 1 manzana",
    cena: "120g pollo + 100g puré de coliflor + 100g ensalada verde"
  },
  {
    dia: "Miércoles",
    desayuno: "Smoothie: 1 scoop prot (opc) + ½ plátano + 1 cda avena + 1 cdita mantequilla de maní",
    almuerzo: "100g atún natural + 2 cdas arroz integral + Verduras al vapor",
    snack: "1 yogur griego + 10 almendras",
    cena: "Tortilla (2h + 2cl) + 1 taza espinaca + 1 rebanada pan integral"
  },
  {
    dia: "Jueves",
    desayuno: "40g avena + 150ml leche + 1 cdita miel + 5 frutillas",
    almuerzo: "120g pollo/pavo + 100g batata + Ensalada verde",
    snack: "1 barra proteica (120–150 kcal)",
    cena: "120g pescado/tofu + 200g verduras + ½ taza arroz"
  },
  {
    dia: "Viernes",
    desayuno: "1 yogur nat + 30g granola + ½ plátano",
    almuerzo: "120g carne magra + 80g legumbres cocidas + verduras",
    snack: "1 fruta + 10 almendras",
    cena: "Tortilla (2h + 2cl) + 1 rebanada pan integral + 1 tomate"
  },
  {
    dia: "Sábado",
    desayuno: "2h + 2cl + 1 rebanada pan integral + ½ palta",
    almuerzo: "¡DÍA LIBRE (CHEAT MEAL)! (Máx 900 kcal. Prioriza Proteína. Evita azúcares.)",
    snack: "Yogur griego + fruta",
    cena: "Ensalada liviana con 100g proteína (pollo, atún o huevo)"
  },
  {
    dia: "Domingo",
    desayuno: "Smoothie verde (½ plátano + espinaca + prot + 1 cdita maní)",
    almuerzo: "120g pescado + 100g arroz integral + verduras al vapor",
    snack: "1 fruta + 10 almendras",
    cena: "Omelette con 2h + 2cl + verduras"
  }
];


// Datos de: PDF-CHUY-ALMADA-RETO-45-DIAS-FULL_.pdf [cite: 691, 710, 736, 764, 784, 812, 835, 862, 891, 913, 944, 962, 988, 1013, 1030, 1058, 1082, 1103, 1130, 1151, 1174, 1198, 1224, 1247, 1277, 1297, 1324, 1354, 1376, 1399, 1431, 1457, 1481, 1507, 1529, 1551, 1578, 1606, 1632, 1661, 1688, 1713, 1741, 1768, 1795]
export const PLAN_TORO_RUTINAS = [
  { dia: 2, titulo: "Abdomen y Core", ejercicios: "Crunches, Plancha con toque de hombros, Abdominales en bicicleta, Plancha, Caminata del gusano, Russian twist" },
  { dia: 3, titulo: "Cardio y Golpes", ejercicios: "Rodillas a la cintura, Golpes al aire, Plancha comando, Jumping Jacks, Burpees" },
  { dia: 4, titulo: "Fuerza de Piernas y Abdomen", ejercicios: "Sentadillas tocando tobillos, Elevación de piernas, Plancha jumping jacks, Saltos a la cuerda imaginaria" },
  { dia: 5, titulo: "Cardio y Glúteos", ejercicios: "Jumping Jacks, Puentes de glúteo, Desplantes alternados con salto, Saltos con cuerda, Golpes al aire, Caminata del gusano, Burpees" },
  { dia: 6, titulo: "Abdomen y Resistencia", ejercicios: "Abdominales tocar talones, Plank Toe Touch/Push ups, Abdominales en bicicleta, Plancha de 'spiderman', Mountain Climbers" },
  { dia: 7, titulo: "Cardio y Fuerza", ejercicios: "Rodillas al pecho, Golpes (rectos), Sentadillas sumo, Plancha con toque de hombros, Fondos Triceps" },
  { dia: 8, titulo: "Core y Cardio", ejercicios: "Crunch lateral, Plancha lateral con rotación, Abdominales estrella, Jumping jacks, Superman (espalda)" },
  { dia: 9, titulo: "Cardio y Glúteos", ejercicios: "Jumping Jacks, Sentadillas con salto, Desplantes alternados, Puentes de glúteo, Patada de glúteos" },
  { dia: 10, titulo: "Fuerza Total", ejercicios: "Sentadillas con salto, Plank jacks, Abdominales piernas elevadas, Jumping jacks, Push ups, Caminata del gusano, Burpees" },
  { dia: 11, titulo: "Cardio y Abdominales", ejercicios: "Jumping Jacks, Plancha comandos, Abdominales en bicicleta, Desplantes con salto, Burpees" },
  { dia: 12, titulo: "Fuerza y Resistencia", ejercicios: "Sentadillas profundas, Golpes (rectos), Plancha con toque de hombro, V ABS, Plank Toe Touch, Lagartijas Cerradas" },
  { dia: 13, titulo: "Cardio y Glúteos", ejercicios: "Saltos con cuerda, Puentes de glúteo una pierna, Desplantes laterales, Abdominales tijeras, Frog Pumps, Caminata del gusano, Silla eléctrica" },
  { dia: 14, titulo: "Fuerza Total y Cardio", ejercicios: "Sentadillas con salto, Plancha lateral pierna, Desplantes alternados con salto, Abdominales tocando puntas, Fondos en silla" },
  { dia: 15, titulo: "Cardio y Fuerza", ejercicios: "Jumping Jacks, Abdominales tipo 'V', Desplantes caminando, Plank jacks, Burpees, Mountain Climbers" },
  { dia: 16, titulo: "Fuerza y Resistencia", ejercicios: "Sentadillas piernas juntas, Plancha elevando piernas, Abdominales en bicicleta, Desplantes de princesa, Golpes (rectos), Puentes de glúteo, Caminata del gusano, Burpees" },
  { dia: 17, titulo: "Cardio Intenso y Fuerza", ejercicios: "Saltos con cuerda, Jumping Jacks, Crunches laterales, Abdominales mariposas, Desplantes alternados, Sentadillas búlgaras" },
  { dia: 18, titulo: "Cardio y Glúteos", ejercicios: "Burpees, Desplantes estáticos, Abdominales de tijera, Sentadillas de prisionero, Elevaciones de pantorrillas, Mountain Climbers" },
  { dia: 19, titulo: "Fuerza Total y Cardio", ejercicios: "Lagartijas (Push-ups), Side to side squat, Superman con pausa, Abdominales tocando tobillos, Sentadillas de prisionero, Golpes al aire" },
  { dia: 20, titulo: "Fuerza y Cardio Combinado", ejercicios: "Saltos con cuerda, Burpees, Sentadillas búlgaras, Push-ups (lagartijas), FONDOS, Elevaciones de pantorrillas, High Knees" },
  { dia: 21, titulo: "Cardio y Fuerza Avanzados", ejercicios: "Burpees laterales, Plank knee to elbow, Mountain Climbers, Sentadillas de prisionero con salto, Abdominales patadas al cielo, Sentadillas búlgaras" },
  { dia: 22, titulo: "Abdominales y Resistencia", ejercicios: "Desplantes de princesa, Plank Toe Touch, Abdominales tocando tobillos, Correr en tu lugar, Saltos a la cuerda, Elevaciones de pantorrillas con un pie" },
  { dia: 23, titulo: "Total Body y Cardio Combinado", ejercicios: "Sentadillas con patadas, Butt kicks, Abdominales de mariposa, Push-ups, Silla eléctrica, Mountain Climbers rápidos" },
  { dia: 24, titulo: "Fuerza y Resistencia Explosiva", ejercicios: "Burpees, Sentadillas con salto, Abdominales de tijera, Push-ups, Sentadillas de prisionero con salto, Elevaciones de pantorrillas, Fondos" },
  { dia: 25, titulo: "Cardio y Glúteos", ejercicios: "Desplantes laterales, Patadas de glúteos, Abdominales en bicicleta lentas, Superman back extension, Saltos con cuerda, Desplantes de princesa" },
  { dia: 26, titulo: "Fuerza y Cardio", ejercicios: "Burpees, High knees, Mountain Climbers, Star Jacks, Butt kicks, Elevaciones de pantorrillas, Plank comandos" },
  { dia: 27, titulo: "Resistencia y Glúteos", ejercicios: "Frog Pumps, Sumo squats, Sentadillas búlgaras, Abdominales tocando tobillos, Saltos a la cuerda, Wall sit silla eléctrica, Caminata del gusano" },
  { dia: 28, titulo: "Cardio y Core", ejercicios: "Lateral skater jump, Sentadillas con salto, Mountain Climbers, Abdominales Russian twist, Push-ups con rodillazo, Sentadillas tocando talones, Plank Toe Touch" },
  { dia: 29, titulo: "Full Body", ejercicios: "Desplantes con giro de torso, Sentadillas de prisionero con salto, Hollow rocks, Abdominales de mariposa, Lagartijas con toque de hombro, Elevaciones de pantorrillas con saltos, Medio burpee" },
  { dia: 30, titulo: "Glúteos y Cardio", ejercicios: "Desplantes de princesa, Puentes, Sentadillas búlgaras, Abdominales tocando tobillos, Saltos a la cuerda con sentadillas, Wall sits, Desplante Isometrico" },
  { dia: 31, titulo: "Fuerza y Cardio", ejercicios: "Burpees con salto al techo, Sentadillas con patadas, Mountain Climbers cruzados, Abdominales en V, Desplantes con salto, Elevaciones de pantorrillas abiertas, Golpes uppercuts" },
  { dia: 32, titulo: "Glúteos y Core", ejercicios: "Desplantes de princesa, Push-ups en diamante, Sentadillas sumo, Abdominales cruzados, Saltos de rana, Desplante isometrico, Patadas de gluteo" },
  { dia: 33, titulo: "Cardio y Fuerza", ejercicios: "Burpees lado a lado, High Knees with punches, Mountain Climbers, Russian twist, Lagartijas cerradas, Saltos a la cuerda, Fondos en silla, Caminata del gusano" },
  { dia: 34, titulo: "Cardio y Glúteos", ejercicios: "Desplantes con giro de torso, Sentadillas con salto y toque de suelo, Abdominales de tijera, Push-ups, Elevaciones de pantorrillas, Superman back extension, Puente de gluteo isometrico" },
  { dia: 35, titulo: "Full Body y Core", ejercicios: "High knee punches, Jumping jacks, Butt kicks, Abdominales patadas al cielo, Push-ups con rodillazo al pecho, Saltos a la cuerda con abdominales, Lateral skater jumps" },
  { dia: 36, titulo: "Full Body y Fuerza", ejercicios: "Golpes al aire, Sentadillas, Push-ups diamantés, Abdominales con elevación de pierna, Desplantes, Mountain Climbers cruzados, Fondos en silla, Abdominales de mariposa" },
  { dia: 37, titulo: "Cardio y Core", ejercicios: "High knees punches, Sentadillas sumo, Star Jumps, Push-ups cerrados, Desplantes de princesa, Saltos a la cuerda, Russian Twist, Plank Toe Touch" },
  { dia: 38, titulo: "Glúteos, Piernas y Core", ejercicios: "Desplantes laterales, Sentadillas búlgaras, Patadas de gluteo lateral, Push-ups, Step ups, Elevaciones de pantorrillas en una pierna, Golpes al aire" },
  { dia: 39, titulo: "Fuerza, Core y Cardio", ejercicios: "Burpees con salto lateral, Sentadillas de lado a lado, Abdominales tocando talones, Hollow rocks, Sentadillas de prisionero, Plank, Golpes al aire (uppercuts), Caminata del gusano" },
  { dia: 40, titulo: "Full Body", ejercicios: "Russian Twist, Sentadillas con salto, Fondos en silla, Abdominales de mariposas, Desplantes caminando, Elevaciones de pantorrillas abiertas, Shoulder taps" },
  { dia: 41, titulo: "Core, Piernas y Glúteos", ejercicios: "Desplantes de princesa, Sentadillas búlgaras, Plank jacks, Abdominales elevaciones piernas, Step ups, Jumping Jacks, Golpes al aire, Plank Toe Touch" },
  { dia: 42, titulo: "Fuerza y Cardio", ejercicios: "Burpees con salto alto, Sentadillas sumo, High knees punches, Abdominales Russian twist, Desplantes de princesa, Saltos a la cuerda, Froggers" },
  { dia: 43, titulo: "Piernas y Core", ejercicios: "Sentadilla con salto sobre silla, Desplantes laterales, Push-ups de diamante, Abdominales de estrella, Plank jacks, Caminata del gusano, Puente de glúteos a una pierna" },
  { dia: 44, titulo: "Fuerza Total", ejercicios: "Burpees, Shoulder taps, Push-ups (piernas elevadas), Abdominales tocando talones, Desplantes con salto, Step ups, Correr en tu lugar, Plank Comandos" },
  { dia: 45, titulo: "Cardio y Resistencia", ejercicios: "Burpees laterales, Sentadillas con salto, Push-ups cerrados, Abdominales de mariposa, Desplantes, Golpes rectos, Lateral skaters jump, Caminata del gusano, Plank, Wall Sit" }
];