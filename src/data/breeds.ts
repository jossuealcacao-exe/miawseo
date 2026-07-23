import type { Breed } from '@/lib/types';

/**
 * Fuente de verdad del contenido curatorial de Miawseo.
 * Datos de conocimiento general sobre razas felinas, redactados para el museo.
 */
export const BREEDS: Breed[] = [
  {
    slug: 'maine-coon',
    name: 'Maine Coon',
    origin: 'Estados Unidos (Maine)',
    tagline: 'El gigante gentil de Nueva Inglaterra.',
    seed: 11,
    palette: { base: '#2b2620', accent: '#c8a06a', ink: '#efe7d8' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/M%C3%A2le_Black_Silver_Blotched_Tabby.jpeg/330px-M%C3%A2le_Black_Silver_Blotched_Tabby.jpeg',
    quickFacts: [
      { label: 'Tamaño', value: 'Grande / muy grande' },
      { label: 'Pelaje', value: 'Semilargo, denso' },
      { label: 'Peso', value: '5.5 – 9 kg' },
      { label: 'Esperanza de vida', value: '12 – 15 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'El gigante gentil',
        body: 'El Maine Coon es una de las razas domésticas más grandes. Pese a su tamaño imponente, es conocido por un carácter tranquilo, sociable y notablemente paciente con niños y otras mascotas.',
        stats: [
          { label: 'Sociabilidad', value: 'Muy alta' },
          { label: 'Nivel de energía', value: 'Medio' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Nacido para el invierno',
        body: 'Originario del estado de Maine, evolucionó como gato de granja resistente al clima frío. Su pelaje impermeable, orejas con mechones de lince y cola tupida son adaptaciones al invierno riguroso del noreste de EE. UU.',
        stats: [
          { label: 'Clima de adaptación', value: 'Frío riguroso' },
          { label: 'Rol histórico', value: 'Gato de granja' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Ingeniería felina',
        body: 'Cuerpo rectangular y musculoso, patas robustas y almohadillas con pelo entre los dedos que funcionan como raquetas de nieve. Su desarrollo físico completo puede tardar de 3 a 5 años.',
        stats: [
          { label: 'Longitud récord', value: '> 1.2 m (hocico a cola)' },
          { label: 'Madurez', value: '3 – 5 años' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: '"Perro-gato"',
        body: 'Sociable y curioso, sigue a su familia por la casa y suele "conversar" con trinos y chirridos más que con maullidos. Muchos disfrutan del agua, algo inusual entre los felinos.',
        stats: [
          { label: 'Vocalización', value: 'Trinos y chirridos' },
          { label: 'Relación con el agua', value: 'Le atrae' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Pelaje y salud',
        body: 'Requiere cepillado varias veces por semana para evitar nudos. Es una raza a vigilar por miocardiopatía hipertrófica (HCM) y displasia de cadera; conviene control veterinario regular.',
        stats: [
          { label: 'Cepillado', value: '3 – 4 veces/semana' },
          { label: 'Vigilancia', value: 'HCM y cadera' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Récords y leyendas',
        body: 'Ejemplares de esta raza han figurado entre los gatos más largos del mundo según registros oficiales. El folclore que lo emparenta con mapaches es biológicamente imposible, pero explica el nombre "coon".',
        stats: [
          { label: 'Récord de longitud', value: '> 1.2 m' },
          { label: 'Origen del nombre', value: '"coon" (mapache)' },
        ],
      },
    ],
  },
  {
    slug: 'siames',
    name: 'Siamés',
    origin: 'Tailandia (antiguo Siam)',
    tagline: 'Voz de terciopelo, mirada de zafiro.',
    seed: 23,
    palette: { base: '#efe9df', accent: '#6b5b8f', ink: '#3a3630' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Siamese_cat_Vaillante.JPG/330px-Siamese_cat_Vaillante.JPG',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Corto, sedoso' },
      { label: 'Peso', value: '3 – 5 kg' },
      { label: 'Esperanza de vida', value: '15 – 20 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Elegancia parlanchina',
        body: 'El Siamés es esbelto, vocal y profundamente apegado a su familia. Es una de las razas más antiguas y reconocibles, con ojos azul intenso y patrón "point".',
        stats: [
          { label: 'Sociabilidad', value: 'Muy alta' },
          { label: 'Vocalización', value: 'Muy alta' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Gato de templos',
        body: 'Descrito en manuscritos tailandeses de siglos atrás, se asociaba a templos y familias nobles. Llegó a Occidente a finales del siglo XIX y causó sensación por su color.',
        stats: [
          { label: 'Primeros registros', value: 'Manuscritos tailandeses' },
          { label: 'Llegada a Occidente', value: 'Finales del s. XIX' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'El secreto del "point"',
        body: 'Su color depende de la temperatura: una enzima sensible al calor hace que el pigmento se exprese solo en las zonas más frías del cuerpo —orejas, cara, patas y cola—, creando el contraste característico.',
        stats: [
          { label: 'Ojos', value: 'Azul (siempre)' },
          { label: 'Patrón', value: 'Colorpoint termosensible' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Conversador incansable',
        body: 'Extremadamente sociable e inteligente, demanda atención y "responde" cuando le hablas. No lleva bien la soledad prolongada; prospera con compañía y estímulo.',
        stats: [
          { label: 'Inteligencia', value: 'Muy alta' },
          { label: 'Tolerancia a la soledad', value: 'Baja' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Mínimo pelo, máxima mente',
        body: 'Su pelaje corto casi no requiere cepillado. Lo esencial es el enriquecimiento mental: juegos, rutinas e interacción. El aburrimiento puede derivar en conductas destructivas.',
        stats: [
          { label: 'Cepillado', value: 'Mínimo' },
          { label: 'Estímulo mental', value: 'Imprescindible' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Longevidad notable',
        body: 'Es una de las razas más longevas; no es raro que superen los 18 años con buenos cuidados. Históricamente se creía que "protegían" los templos que habitaban.',
        stats: [
          { label: 'Longevidad', value: 'Hasta 20 años' },
          { label: 'Rol histórico', value: 'Guardián de templos' },
        ],
      },
    ],
  },
  {
    slug: 'persa',
    name: 'Persa',
    origin: 'Irán (antigua Persia)',
    tagline: 'La aristocracia del pelaje largo.',
    seed: 37,
    palette: { base: '#f2ece4', accent: '#b98a86', ink: '#4a4038' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Persialainen.jpg/330px-Persialainen.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Largo, muy denso' },
      { label: 'Peso', value: '3 – 5.5 kg' },
      { label: 'Esperanza de vida', value: '12 – 17 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Calma con corona',
        body: 'El Persa es sereno, hogareño y de belleza escultórica. Su rostro de mejillas llenas y ojos grandes lo convirtió en un ícono felino desde el siglo XIX.',
        stats: [
          { label: 'Nivel de actividad', value: 'Bajo' },
          { label: 'Ícono desde', value: 'Siglo XIX' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Rutas de seda',
        body: 'Sus ancestros de pelo largo llegaron a Europa desde Persia y Anatolia. La cría victoriana refinó el tipo hasta la raza de exhibición que conocemos hoy.',
        stats: [
          { label: 'Región ancestral', value: 'Persia y Anatolia' },
          { label: 'Refinamiento', value: 'Era victoriana' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Cara y pelaje',
        body: 'Existen dos tipos: el "peke-face" braquicéfalo de cara muy plana y el "doll-face" más tradicional. La cara plana puede implicar problemas respiratorios y de lagrimeo.',
        stats: [
          { label: 'Tipos de cara', value: 'Peke-face / Doll-face' },
          { label: 'Aseo diario', value: 'Recomendado' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Compañía tranquila',
        body: 'Dócil y poco activo, prefiere ambientes estables y silenciosos. Es un gato de regazo por excelencia, más observador que trepador.',
        stats: [
          { label: 'Nivel de energía', value: 'Bajo' },
          { label: 'Gato de regazo', value: 'Sí' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Mantenimiento alto',
        body: 'Necesita cepillado diario para evitar nudos y limpieza frecuente del área ocular. Predisposición a enfermedad renal poliquística (PKD), controlable con cría responsable y revisiones.',
        stats: [
          { label: 'Cepillado', value: 'Diario' },
          { label: 'Vigilancia', value: 'PKD (renal)' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Estrella de por vida',
        body: 'Ha sido de las razas más populares del mundo durante décadas y protagonista frecuente de publicidad y cine por su expresión inconfundible.',
        stats: [
          { label: 'Popularidad', value: 'Décadas en el top' },
          { label: 'Presencia', value: 'Cine y publicidad' },
        ],
      },
    ],
  },
  {
    slug: 'bengali',
    name: 'Bengalí',
    origin: 'Estados Unidos (híbrido)',
    tagline: 'Un leopardo en miniatura, doméstico de corazón.',
    seed: 51,
    palette: { base: '#241f18', accent: '#d98a2b', ink: '#f0dcae' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/330px-Paintedcats_Red_Star_standing.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano / grande' },
      { label: 'Pelaje', value: 'Corto, "glitter"' },
      { label: 'Peso', value: '4 – 7 kg' },
      { label: 'Esperanza de vida', value: '12 – 16 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Salvaje solo en apariencia',
        body: 'El Bengalí luce como un felino salvaje pero es una raza doméstica enérgica y atlética. Su manto con rosetas y su brillo "glitter" son inconfundibles.',
        stats: [
          { label: 'Nivel de energía', value: 'Muy alto' },
          { label: 'Manto', value: 'Rosetas + glitter' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Cruce con historia',
        body: 'Surge del cruce entre gato doméstico y el gato leopardo asiático (Prionailurus bengalensis). Solo los ejemplares de varias generaciones alejadas del ancestro salvaje se consideran domésticos.',
        stats: [
          { label: 'Generación doméstica', value: 'F4 en adelante' },
          { label: 'Manto', value: 'Rosetas / marbled' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Atleta de manto brillante',
        body: 'Musculoso y ágil, salta alto y trepa con facilidad. Muchos ejemplares presentan "glitter", un efecto iridiscente en la punta del pelo que atrapa la luz.',
        stats: [
          { label: 'Agilidad', value: 'Salta y trepa' },
          { label: 'Efecto glitter', value: 'Iridiscente' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Energía sin freno',
        body: 'Curioso, juguetón y muy inteligente; necesita muchísima actividad. Suele fascinarle el agua y aprende trucos con rapidez.',
        stats: [
          { label: 'Inteligencia', value: 'Muy alta' },
          { label: 'Relación con el agua', value: 'Le fascina' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Estímulo obligatorio',
        body: 'Requiere torres, juegos interactivos y tiempo de juego diario. Un Bengalí aburrido puede volverse destructivo. Su pelaje corto casi no necesita cepillado.',
        stats: [
          { label: 'Juego diario', value: 'Obligatorio' },
          { label: 'Cepillado', value: 'Mínimo' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Regulación legal',
        body: 'Por su origen híbrido, algunas jurisdicciones regulan la tenencia de las primeras generaciones (F1–F3). Conviene verificar la normativa local antes de adoptar.',
        stats: [
          { label: 'Regulación', value: 'F1–F3 restringidas' },
          { label: 'Recomendación', value: 'Verificar ley local' },
        ],
      },
    ],
  },
  {
    slug: 'sphynx',
    name: 'Sphynx',
    origin: 'Canadá',
    tagline: 'Piel desnuda, calidez desmedida.',
    seed: 64,
    palette: { base: '#f0e6e2', accent: '#c76a5a', ink: '#4a3a36' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Sphynx_-_cat._img_031.jpg/330px-Sphynx_-_cat._img_031.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Casi ausente' },
      { label: 'Peso', value: '3 – 5 kg' },
      { label: 'Esperanza de vida', value: '12 – 16 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'El abrazo sin pelo',
        body: 'El Sphynx es célebre por su aparente desnudez y su temperamento afectuoso y extrovertido. Busca activamente el calor y el contacto humano.',
        stats: [
          { label: 'Sociabilidad', value: 'Muy alta' },
          { label: 'Búsqueda de calor', value: 'Constante' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Una mutación afortunada',
        body: 'La raza moderna nace en los años 60 y 70 en Canadá a partir de gatitos con una mutación natural de ausencia de pelo, seleccionada cuidadosamente para preservar la salud.',
        stats: [
          { label: 'Década de origen', value: 'Años 60 – 70' },
          { label: 'Causa', value: 'Mutación natural' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'No tan desnudo',
        body: 'Su piel está cubierta por una fina pelusa aterciopelada y muestra arrugas, sobre todo en la cabeza. Al no tener manto que absorba la grasa, la piel necesita limpieza regular.',
        stats: [
          { label: 'Temperatura corporal', value: 'Se siente cálido al tacto' },
          { label: 'Piel', value: 'Pelusa fina + arrugas' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Payaso cariñoso',
        body: 'Sociable, demandante y juguetón; algunos lo describen como parte gato, parte perro, parte mono. Detesta estar solo y adora dormir bajo las mantas.',
        stats: [
          { label: 'Apego', value: 'Muy alto' },
          { label: 'Tolerancia a la soledad', value: 'Baja' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Baños y abrigo',
        body: 'Necesita baños periódicos para retirar la grasa cutánea y limpieza de orejas. Es sensible al frío y al sol: en invierno agradece ropa; en exteriores puede quemarse.',
        stats: [
          { label: 'Baños', value: 'Periódicos' },
          { label: 'Sensibilidad', value: 'Frío y sol' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'No es hipoalergénico',
        body: 'La falta de pelo no lo hace libre de alérgenos: la proteína responsable (Fel d 1) está en la saliva y la piel, no solo en el pelo.',
        stats: [
          { label: 'Alérgeno', value: 'Fel d 1' },
          { label: 'Hipoalergénico', value: 'No' },
        ],
      },
    ],
  },
  {
    slug: 'british-shorthair',
    name: 'British Shorthair',
    origin: 'Reino Unido',
    tagline: 'El osito de peluche de la corona.',
    seed: 78,
    palette: { base: '#e6eaee', accent: '#5f7d93', ink: '#38424a' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Mystica_from_British_Empire_Cattery.jpg/330px-Mystica_from_British_Empire_Cattery.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano / grande' },
      { label: 'Pelaje', value: 'Corto, denso, "felpa"' },
      { label: 'Peso', value: '4 – 8 kg' },
      { label: 'Esperanza de vida', value: '12 – 17 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Calma redonda',
        body: 'El British Shorthair es robusto, de cara redonda y expresión apacible. Su variante azul de ojos cobrizos es una de las imágenes felinas más reconocidas.',
        stats: [
          { label: 'Temperamento', value: 'Apacible' },
          { label: 'Color icónico', value: 'Azul, ojos cobre' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Del gato romano al salón',
        body: 'Desciende de gatos llevados a Britania en época romana. En el siglo XIX se estandarizó como una de las primeras razas de exhibición del mundo.',
        stats: [
          { label: 'Llegada a Britania', value: 'Época romana' },
          { label: 'Estandarización', value: 'Siglo XIX' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Manto de felpa',
        body: 'Cuerpo compacto y musculoso ("cobby") con un pelaje corto y denso que se siente como felpa. Madura lentamente, alcanzando su forma plena hacia los 3 años.',
        stats: [
          { label: 'Color icónico', value: 'British Blue' },
          { label: 'Textura', value: 'Densa, sin subpelo lanoso' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Independiente y sereno',
        body: 'Tranquilo y poco demandante; disfruta la compañía pero no suele ser un gato de regazo. Prefiere sentarse a tu lado antes que encima de ti.',
        stats: [
          { label: 'Independencia', value: 'Alta' },
          { label: 'Gato de regazo', value: 'Poco' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Peso y muda',
        body: 'Cepillado semanal (más en muda). Su tendencia a la calma lo hace propenso al sobrepeso: conviene controlar porciones y fomentar el juego.',
        stats: [
          { label: 'Cepillado', value: 'Semanal' },
          { label: 'Riesgo', value: 'Sobrepeso' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Sonrisa literaria',
        body: 'Se le suele señalar como inspiración del Gato de Cheshire de "Alicia en el país de las maravillas" por su rostro redondo y aire satisfecho.',
        stats: [
          { label: 'Inspiración literaria', value: 'Gato de Cheshire' },
          { label: 'Expresión', value: 'Rostro redondo' },
        ],
      },
    ],
  },
  {
    slug: 'ragdoll',
    name: 'Ragdoll',
    origin: 'Estados Unidos (California)',
    tagline: 'Se relaja en tus brazos como muñeco de trapo.',
    seed: 92,
    palette: { base: '#efe7ea', accent: '#8aa0b8', ink: '#43494f' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ragdoll_from_Gatil_Ragbelas.jpg/330px-Ragdoll_from_Gatil_Ragbelas.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Grande' },
      { label: 'Pelaje', value: 'Semilargo, sedoso' },
      { label: 'Peso', value: '4.5 – 9 kg' },
      { label: 'Esperanza de vida', value: '13 – 18 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Docilidad de muñeco',
        body: 'El Ragdoll es grande, de ojos azules y patrón point. Su nombre viene de la tendencia de muchos ejemplares a relajarse por completo al ser alzados.',
        stats: [
          { label: 'Ojos', value: 'Azules' },
          { label: 'Docilidad', value: 'Muy alta' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Programa de los años 60',
        body: 'Desarrollado en California por Ann Baker a partir de gatas de pelo semilargo, seleccionando temperamento dócil y tamaño grande.',
        stats: [
          { label: 'Década', value: 'Años 60' },
          { label: 'Criadora', value: 'Ann Baker' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Grande y de desarrollo lento',
        body: 'Uno de los gatos domésticos más pesados; los machos superan con holgura los 6 kg. Alcanza su tamaño y color definitivos hacia los 3–4 años.',
        stats: [
          { label: 'Ojos', value: 'Azules' },
          { label: 'Madurez', value: '3 – 4 años' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Sombra afectuosa',
        body: 'Tranquilo, apacible y muy apegado; sigue a su gente por la casa y recibe en la puerta. Su docilidad exige que viva como gato de interior.',
        stats: [
          { label: 'Apego', value: 'Muy alto' },
          { label: 'Hábitat', value: 'Interior' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Pelaje amable y corazón vigilado',
        body: 'Su pelo sedoso enreda menos que otros semilargos; basta cepillado un par de veces por semana. Es una raza a vigilar por miocardiopatía hipertrófica (HCM).',
        stats: [
          { label: 'Cepillado', value: '2 veces/semana' },
          { label: 'Vigilancia', value: 'HCM' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Todos nacen blancos',
        body: 'Como en otros gatos point, los Ragdoll nacen casi blancos y desarrollan su color gradualmente durante las primeras semanas y meses de vida.',
        stats: [
          { label: 'Color al nacer', value: 'Casi blancos' },
          { label: 'Desarrollo de color', value: 'Semanas y meses' },
        ],
      },
    ],
  },
  {
    slug: 'abisinio',
    name: 'Abisinio',
    origin: 'Discutido (sudeste asiático / costa del Índico)',
    tagline: 'El manto que brilla como arena al sol.',
    seed: 105,
    palette: { base: '#2a2118', accent: '#c67b3a', ink: '#ecd9b6' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/330px-Gustav_chocolate.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Corto, "ticked"' },
      { label: 'Peso', value: '3 – 5 kg' },
      { label: 'Esperanza de vida', value: '12 – 15 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Curiosidad en movimiento',
        body: 'El Abisinio es esbelto, atlético y perpetuamente curioso. Su manto "ticked" —cada pelo con varias bandas de color— le da un brillo cálido y vivo.',
        stats: [
          { label: 'Curiosidad', value: 'Muy alta' },
          { label: 'Manto', value: 'Ticked' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Un pasado brumoso',
        body: 'Aunque su nombre remite a Abisinia (actual Etiopía), estudios genéticos sitúan su origen más probable en la costa del océano Índico y el sudeste asiático. Es una de las razas más antiguas reconocidas.',
        stats: [
          { label: 'Origen genético', value: 'Costa del Índico' },
          { label: 'Antigüedad', value: 'De las más antiguas' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'El pelaje agutí',
        body: 'Su rasgo distintivo es el patrón agutí o "ticking": bandas alternas de color a lo largo de cada pelo, similar al del puma. El efecto recuerda a las liebres silvestres.',
        stats: [
          { label: 'Patrón', value: 'Ticked / agutí' },
          { label: 'Perfil', value: 'Atlético, elegante' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Explorador incansable',
        body: 'Activo, inteligente y sociable; le encanta trepar a lo más alto y participar en todo. Se aburre con facilidad y agradece compañía, incluso de otro gato.',
        stats: [
          { label: 'Nivel de energía', value: 'Muy alto' },
          { label: 'Sociabilidad', value: 'Alta' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Bajo aseo, alto juego',
        body: 'Su pelaje corto casi no requiere cepillado. Necesita altura, juego y estímulo mental. Se recomienda control por deficiencia de piruvato quinasa (PK) mediante cría responsable.',
        stats: [
          { label: 'Cepillado', value: 'Mínimo' },
          { label: 'Vigilancia', value: 'Piruvato quinasa (PK)' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Musa del arte antiguo',
        body: 'Su silueta estilizada se asocia popularmente con los gatos representados en el arte del antiguo Egipto, aunque no hay prueba de descendencia directa.',
        stats: [
          { label: 'Asociación artística', value: 'Antiguo Egipto' },
          { label: 'Descendencia directa', value: 'No probada' },
        ],
      },
    ],
  },
  {
    slug: 'scottish-fold',
    name: 'Scottish Fold',
    origin: 'Reino Unido (Escocia)',
    tagline: 'Orejas plegadas y mirada de peluche.',
    seed: 118,
    palette: { base: '#2c2b28', accent: '#7f8b93', ink: '#e8e6df' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Scottish_Fold_-_CFF_cat_show_Heinola_2008-05-03_IMG_7882.JPG/330px-Scottish_Fold_-_CFF_cat_show_Heinola_2008-05-03_IMG_7882.JPG',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Corto o largo, denso' },
      { label: 'Peso', value: '3 – 6 kg' },
      { label: 'Esperanza de vida', value: '11 – 15 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'La cara de búho',
        body: 'El Scottish Fold es famoso por sus orejas plegadas hacia adelante, que le dan un aire de búho o peluche. Es dulce, tranquilo y muy apegado a su familia.',
        stats: [
          { label: 'Rasgo distintivo', value: 'Orejas plegadas' },
          { label: 'Temperamento', value: 'Dulce y tranquilo' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Susie, la fundadora',
        body: 'La raza nació en 1961 en una granja escocesa a partir de una gata blanca llamada Susie, portadora de una mutación espontánea. Todos los Scottish Fold descienden de aquella línea.',
        stats: [
          { label: 'Año de origen', value: '1961' },
          { label: 'Ancestro común', value: 'La gata Susie' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Un pliegue en el cartílago',
        body: 'El pliegue de las orejas proviene de una mutación que afecta al cartílago de todo el cuerpo. Los gatitos nacen con las orejas rectas y estas se doblan hacia las 3 semanas.',
        stats: [
          { label: 'Orejas al nacer', value: 'Rectas' },
          { label: 'Se pliegan hacia', value: '3 semanas' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Compañero sereno',
        body: 'Cariñoso, adaptable y poco ruidoso, disfruta la compañía sin ser demandante. Suele adoptar la curiosa postura de "Buda", sentado con las patas estiradas.',
        stats: [
          { label: 'Sociabilidad', value: 'Alta' },
          { label: 'Nivel de energía', value: 'Medio-bajo' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Salud articular vigilada',
        body: 'La misma mutación puede causar osteocondrodisplasia, un trastorno articular doloroso. Cruzar dos Fold está desaconsejado; conviene revisar articulaciones y no forzar saltos.',
        stats: [
          { label: 'Cepillado', value: 'Semanal' },
          { label: 'Vigilancia', value: 'Osteocondrodisplasia' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'No todos se pliegan',
        body: 'De cada camada, solo una parte hereda las orejas dobladas; el resto crece con orejas rectas ("Scottish Straight"). Ambos comparten el mismo carácter apacible.',
        stats: [
          { label: 'Variante recta', value: 'Scottish Straight' },
          { label: 'Herencia del pliegue', value: 'Parcial en la camada' },
        ],
      },
    ],
  },
  {
    slug: 'azul-ruso',
    name: 'Azul Ruso',
    origin: 'Rusia',
    tagline: 'Plata azulada y ojos de esmeralda.',
    seed: 131,
    palette: { base: '#23282d', accent: '#7d97a5', ink: '#d6dde1' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Russian_blue_kitten_%28cropped%29.jpg/330px-Russian_blue_kitten_%28cropped%29.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Corto, doble capa plateada' },
      { label: 'Peso', value: '3 – 5.5 kg' },
      { label: 'Esperanza de vida', value: '15 – 20 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Elegancia discreta',
        body: 'El Azul Ruso combina un manto gris azulado con ojos de un verde intenso. Es reservado, silencioso y profundamente leal a las personas de confianza.',
        stats: [
          { label: 'Color de manto', value: 'Azul plateado' },
          { label: 'Ojos', value: 'Verde esmeralda' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'El gato de Arcángel',
        body: 'Se cree originario del puerto ruso de Arcángel, de donde marineros lo habrían llevado a Europa en el siglo XIX. Por eso también se le llamó "gato Arcángel".',
        stats: [
          { label: 'Puerto de origen', value: 'Arcángel (Rusia)' },
          { label: 'Llegada a Europa', value: 'Siglo XIX' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Doble capa de plata',
        body: 'Su pelaje denso de doble capa tiene las puntas plateadas, lo que crea un brillo característico. Una leve curvatura del hocico le da la apariencia de una sonrisa serena.',
        stats: [
          { label: 'Pelaje', value: 'Doble capa, puntas plateadas' },
          { label: 'Gesto', value: 'Sonrisa serena' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Reservado y fiel',
        body: 'Tímido con extraños pero muy cariñoso en la intimidad del hogar. Es tranquilo, rutinario y sensible a los cambios; valora los ambientes estables.',
        stats: [
          { label: 'Con extraños', value: 'Reservado' },
          { label: 'Vocalización', value: 'Baja' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Aseo sencillo',
        body: 'Su pelaje se mantiene con un cepillado semanal. Tiende a comer con ganas, así que conviene controlar la ración para evitar el sobrepeso.',
        stats: [
          { label: 'Cepillado', value: 'Semanal' },
          { label: 'Riesgo', value: 'Sobrepeso' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Menos alérgenos, no cero',
        body: 'Se le atribuye producir menos proteína Fel d 1, la asociada a las alergias, aunque ningún gato es realmente hipoalergénico. Los gatitos nacen con ojos amarillos que viran al verde.',
        stats: [
          { label: 'Fel d 1', value: 'Reputación de bajo' },
          { label: 'Ojos de gatito', value: 'Amarillos al inicio' },
        ],
      },
    ],
  },
  {
    slug: 'bosque-de-noruega',
    name: 'Bosque de Noruega',
    origin: 'Noruega',
    tagline: 'El gato de los bosques y las sagas nórdicas.',
    seed: 144,
    palette: { base: '#241f19', accent: '#b5843f', ink: '#e9d8b4' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Norwegian_Forest_Cat_%28Belgium%29.jpg/330px-Norwegian_Forest_Cat_%28Belgium%29.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Grande' },
      { label: 'Pelaje', value: 'Semilargo, doble capa impermeable' },
      { label: 'Peso', value: '4 – 9 kg' },
      { label: 'Esperanza de vida', value: '14 – 16 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'El gato de los bosques',
        body: 'El Bosque de Noruega, o "Skogkatt", es un felino grande y robusto de manto abundante. Bajo su porte imponente esconde un carácter afable y familiar.',
        stats: [
          { label: 'Nombre local', value: 'Skogkatt' },
          { label: 'Manto', value: 'Doble capa densa' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'De las sagas al trono',
        body: 'Aparece en la mitología nórdica tirando del carro de la diosa Freyja. Fue declarado gato nacional de Noruega por el rey Olav V y sobrevivió como raza rústica durante siglos.',
        stats: [
          { label: 'En la mitología', value: 'Carro de Freyja' },
          { label: 'Reconocimiento', value: 'Gato nacional noruego' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Armadura contra el frío',
        body: 'Su doble capa impermeable, la gorguera del cuello, los mechones en orejas y patas y la cola tupida lo aíslan del clima escandinavo. Madura lentamente, hasta cerca de los 5 años.',
        stats: [
          { label: 'Pelaje', value: 'Impermeable, doble capa' },
          { label: 'Madurez', value: 'Hasta 5 años' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Escalador tranquilo',
        body: 'Sociable, sereno y muy buen trepador; disfruta las alturas y puede bajar de los árboles de cabeza. Es independiente pero disfruta la compañía de su familia.',
        stats: [
          { label: 'Habilidad', value: 'Trepador experto' },
          { label: 'Sociabilidad', value: 'Alta' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Manto y muda',
        body: 'Requiere cepillado varias veces por semana, con especial atención durante la muda de primavera. Como línea a vigilar figuran la glucogenosis tipo IV y la HCM.',
        stats: [
          { label: 'Cepillado', value: '2 – 3 veces/semana' },
          { label: 'Vigilancia', value: 'Glucogenosis IV y HCM' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Primo, no gemelo',
        body: 'Se le confunde con el Maine Coon por tamaño y pelaje, pero son razas distintas de continentes distintos. El noruego tiene un perfil facial más recto y triangular.',
        stats: [
          { label: 'Suele confundirse con', value: 'Maine Coon' },
          { label: 'Perfil facial', value: 'Recto, triangular' },
        ],
      },
    ],
  },
  {
    slug: 'devon-rex',
    name: 'Devon Rex',
    origin: 'Reino Unido',
    tagline: 'Un duende rizado de orejas enormes.',
    seed: 157,
    palette: { base: '#2b2723', accent: '#b98a5e', ink: '#ecdfce' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Devon_Rex_Cassini.jpeg/330px-Devon_Rex_Cassini.jpeg',
    quickFacts: [
      { label: 'Tamaño', value: 'Pequeño / mediano' },
      { label: 'Pelaje', value: 'Corto, rizado, fino' },
      { label: 'Peso', value: '2.5 – 4 kg' },
      { label: 'Esperanza de vida', value: '12 – 16 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'El gato duende',
        body: 'El Devon Rex tiene un pelaje ondulado, orejas descomunales y una cara de rasgos élficos. Es juguetón, travieso y adora estar en compañía de su gente.',
        stats: [
          { label: 'Pelaje', value: 'Rizado y fino' },
          { label: 'Orejas', value: 'Muy grandes' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Un rizo en Devon',
        body: 'La raza surgió en 1960 en el condado de Devon, Inglaterra, a partir de un gatito rizado llamado Kirlee. Su mutación es distinta a la del Cornish Rex, de la región vecina.',
        stats: [
          { label: 'Año de origen', value: '1960' },
          { label: 'Gatito fundador', value: 'Kirlee' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Ondas y bigotes cortos',
        body: 'Su pelaje corto y ondulado proviene de una mutación recesiva; incluso los bigotes son cortos y quebradizos. La cabeza pequeña, los pómulos altos y los ojos grandes completan su aire de duende.',
        stats: [
          { label: 'Mutación', value: 'Recesiva' },
          { label: 'Bigotes', value: 'Cortos y ondulados' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Payaso de hombro',
        body: 'Extrovertido, ágil y muy apegado, suele encaramarse a los hombros de su dueño. Su energía y viveza le han valido apodos como "gato-perro" o "gato mono".',
        stats: [
          { label: 'Apego', value: 'Muy alto' },
          { label: 'Nivel de energía', value: 'Alto' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Poco pelo, mucho abrigo',
        body: 'Su pelaje ralo apenas necesita cepillado y suelta poco pelo, pero lo hace sensible al frío. Conviene mantenerlo abrigado y limpiar el exceso de grasa de la piel.',
        stats: [
          { label: 'Muda', value: 'Escasa' },
          { label: 'Sensibilidad', value: 'Al frío' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: '"Gato caniche"',
        body: 'Por su pelo ensortijado se le apoda "poodle cat" o gato caniche. Muchos disfrutan acurrucarse pegados a la piel de su dueño en busca de calor.',
        stats: [
          { label: 'Apodo', value: 'Gato caniche' },
          { label: 'Costumbre', value: 'Busca el calor humano' },
        ],
      },
    ],
  },
  {
    slug: 'birmano',
    name: 'Sagrado de Birmania',
    origin: 'Birmania / Francia',
    tagline: 'Guantes blancos y ojos de zafiro.',
    seed: 170,
    palette: { base: '#efe6d6', accent: '#7d8db0', ink: '#4a4136' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Birmanstrofe.jpg/330px-Birmanstrofe.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano / grande' },
      { label: 'Pelaje', value: 'Semilargo, sedoso sin subpelo' },
      { label: 'Peso', value: '4 – 6 kg' },
      { label: 'Esperanza de vida', value: '13 – 16 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Aristócrata de guantes',
        body: 'El Sagrado de Birmania es un gato colorpoint de ojos azul profundo y pelaje sedoso. Su sello inconfundible son los "guantes" blancos que calzan sus cuatro patas.',
        stats: [
          { label: 'Guantes blancos', value: 'En las 4 patas' },
          { label: 'Ojos', value: 'Azul profundo' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Leyenda de templo',
        body: 'La tradición lo vincula a los templos de Birmania y a los gatos de los sacerdotes. Como raza moderna se consolidó en Francia a principios del siglo XX.',
        stats: [
          { label: 'Leyenda', value: 'Templos birmanos' },
          { label: 'Consolidación', value: 'Francia, s. XX' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Seda sin nudos',
        body: 'Su pelaje semilargo carece de subpelo lanoso, por lo que enreda mucho menos que otros gatos de pelo largo. En las patas traseras los guantes se prolongan en punta, llamada "espuela".',
        stats: [
          { label: 'Subpelo', value: 'Ausente' },
          { label: 'Patas traseras', value: 'Guante con espuela' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Dulce y equilibrado',
        body: 'Tranquilo, cariñoso y sociable, se lleva bien con niños, perros y otros gatos. Es apegado pero no invasivo, con una voz suave y discreta.',
        stats: [
          { label: 'Sociabilidad', value: 'Alta' },
          { label: 'Vocalización', value: 'Suave' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Cepillado amable',
        body: 'Al no tener subpelo, basta un cepillado un par de veces por semana para mantener el manto. Como línea a vigilar se cita la miocardiopatía hipertrófica (HCM).',
        stats: [
          { label: 'Cepillado', value: '2 veces/semana' },
          { label: 'Vigilancia', value: 'HCM' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Blancos al nacer',
        body: 'Como todos los gatos colorpoint, nacen casi blancos y desarrollan su color con las semanas. Los guantes blancos, en cambio, deben ser lo más simétricos posible según el estándar.',
        stats: [
          { label: 'Color al nacer', value: 'Casi blancos' },
          { label: 'Guantes', value: 'Simétricos (estándar)' },
        ],
      },
    ],
  },
  {
    slug: 'oriental',
    name: 'Oriental de Pelo Corto',
    origin: 'Reino Unido / Tailandia',
    tagline: 'El arcoíris felino de las mil variantes.',
    seed: 183,
    palette: { base: '#24232a', accent: '#a97fb0', ink: '#e6e0e6' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Fatale_de_la_l%C3%A9gende_d%27ali.jpg/330px-Fatale_de_la_l%C3%A9gende_d%27ali.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Corto, brillante, pegado' },
      { label: 'Peso', value: '3.5 – 5.5 kg' },
      { label: 'Esperanza de vida', value: '12 – 15 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Líneas puras y voz alta',
        body: 'El Oriental de Pelo Corto comparte la silueta esbelta del Siamés, pero en cientos de colores y patrones. Es vocal, curioso y sumamente apegado a su gente.',
        stats: [
          { label: 'Silueta', value: 'Esbelta, tipo Siamés' },
          { label: 'Vocalización', value: 'Muy alta' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Del Siam a la paleta',
        body: 'Se desarrolló en el Reino Unido cruzando Siameses con otras razas para fijar colores sólidos y patrones. Sus raíces se remontan a los gatos tailandeses.',
        stats: [
          { label: 'Desarrollo', value: 'Reino Unido' },
          { label: 'Raíces', value: 'Gatos tailandeses' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Orejas de murciélago',
        body: 'Cuerpo largo y musculoso, cabeza en cuña y orejas enormes que continúan la línea del rostro. Su pelaje corto y pegado luce en más de 300 combinaciones de color y patrón.',
        stats: [
          { label: 'Orejas', value: 'Grandes, tipo murciélago' },
          { label: 'Variantes', value: '> 300 colores/patrones' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Sombra parlanchina',
        body: 'Extrovertido, inteligente y demandante, sigue a su dueño y "comenta" todo con maullidos. No tolera bien la soledad y prospera con estímulo constante.',
        stats: [
          { label: 'Inteligencia', value: 'Muy alta' },
          { label: 'Tolerancia a la soledad', value: 'Baja' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Poco pelo, mucha atención',
        body: 'Su manto corto casi no necesita cepillado. Lo esencial es la compañía y el enriquecimiento: juegos, escaladores y presencia diaria para evitar el estrés.',
        stats: [
          { label: 'Cepillado', value: 'Mínimo' },
          { label: 'Enriquecimiento', value: 'Imprescindible' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'El "gato arcoíris"',
        body: 'Por la enorme variedad de colores y dibujos que admite el estándar, se le apoda "gato arcoíris". Comparte carácter y salud básica con el Siamés.',
        stats: [
          { label: 'Apodo', value: 'Gato arcoíris' },
          { label: 'Pariente cercano', value: 'Siamés' },
        ],
      },
    ],
  },
  {
    slug: 'exotico',
    name: 'Exótico de Pelo Corto',
    origin: 'Estados Unidos',
    tagline: 'El Persa en pijama de felpa.',
    seed: 196,
    palette: { base: '#2a2420', accent: '#cf8a3d', ink: '#f0dcbb' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Ginger_Exotic_Shorthair.jpg/330px-Ginger_Exotic_Shorthair.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Corto, denso, "peluche"' },
      { label: 'Peso', value: '3 – 6.5 kg' },
      { label: 'Esperanza de vida', value: '12 – 15 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Cara de Persa, pelo fácil',
        body: 'El Exótico de Pelo Corto tiene el rostro redondo y la calma del Persa, pero con un manto corto y afelpado mucho más sencillo de cuidar. Es dulce, tranquilo y hogareño.',
        stats: [
          { label: 'Cara', value: 'Redonda, tipo Persa' },
          { label: 'Manto', value: 'Corto y afelpado' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Un Persa práctico',
        body: 'Se creó en Estados Unidos cruzando Persas con Americanos de Pelo Corto para obtener el aspecto del Persa sin su pelaje exigente. Por eso se le llama "el Persa del hombre perezoso".',
        stats: [
          { label: 'Cruce base', value: 'Persa x Americano P.C.' },
          { label: 'Apodo', value: 'Persa perezoso' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Cara plana de peluche',
        body: 'Comparte el rostro braquicéfalo del Persa, con nariz corta y mejillas llenas. Esa estructura implica lagrimeo y posibles dificultades respiratorias que conviene vigilar.',
        stats: [
          { label: 'Estructura facial', value: 'Braquicéfala' },
          { label: 'Atención', value: 'Lagrimeo, respiración' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Calma con chispa',
        body: 'Sereno, afectuoso y de voz suave como el Persa, pero algo más juguetón gracias a su herencia de pelo corto. Disfruta la compañía tranquila y los regazos.',
        stats: [
          { label: 'Nivel de energía', value: 'Bajo-medio' },
          { label: 'Gato de regazo', value: 'Sí' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Cepillado ligero, ojos limpios',
        body: 'Su pelaje denso solo pide cepillado semanal, a diferencia del diario del Persa. La cara plana exige limpieza frecuente del área ocular.',
        stats: [
          { label: 'Cepillado', value: 'Semanal' },
          { label: 'Limpieza ocular', value: 'Frecuente' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Sorpresas de pelo largo',
        body: 'Al llevar el gen del Persa, dos Exóticos pueden tener crías de pelo largo, a veces llamadas "Exotic Longhair". Comparten con el Persa las mismas líneas de salud a vigilar, como la PKD.',
        stats: [
          { label: 'Crías posibles', value: 'Exotic de pelo largo' },
          { label: 'Vigilancia', value: 'PKD (renal)' },
        ],
      },
    ],
  },
  {
    slug: 'americano-pelo-corto',
    name: 'Americano de Pelo Corto',
    origin: 'Estados Unidos',
    tagline: 'El cazador robusto que cruzó el Atlántico.',
    seed: 209,
    palette: { base: '#262a2d', accent: '#7d8a92', ink: '#dfe4e6' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Jewelkatz_Romeo_Of_Stalker-Bars.jpg/330px-Jewelkatz_Romeo_Of_Stalker-Bars.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano / grande' },
      { label: 'Pelaje', value: 'Corto, denso' },
      { label: 'Peso', value: '3.5 – 7 kg' },
      { label: 'Esperanza de vida', value: '15 – 20 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'El clásico todoterreno',
        body: 'El Americano de Pelo Corto es un gato equilibrado, sano y adaptable, considerado un "gato de trabajo" convertido en compañero. Su carácter fácil lo hace ideal para familias.',
        stats: [
          { label: 'Temperamento', value: 'Equilibrado' },
          { label: 'Adaptabilidad', value: 'Muy alta' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Ratoneros de barco',
        body: 'Desciende de gatos europeos llevados por los colonos a Norteamérica, valorados como cazadores de roedores en barcos y granjas. Con el tiempo se seleccionó como raza propia.',
        stats: [
          { label: 'Llegada', value: 'Con los colonos europeos' },
          { label: 'Función original', value: 'Ratonero' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Fuerza sin exageración',
        body: 'Cuerpo musculoso y proporcionado, pensado para resistencia y caza. El tabby clásico plateado, con su dibujo de "diana" en el flanco, es su patrón más emblemático.',
        stats: [
          { label: 'Complexión', value: 'Musculosa, resistente' },
          { label: 'Patrón icónico', value: 'Tabby plateado clásico' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Sociable y sensato',
        body: 'Cariñoso pero independiente, se lleva bien con niños y perros. Conserva buen instinto cazador y disfruta el juego, sin llegar a ser hiperactivo.',
        stats: [
          { label: 'Con niños y perros', value: 'Excelente' },
          { label: 'Nivel de energía', value: 'Medio' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Mantenimiento mínimo',
        body: 'Su pelaje corto y denso solo necesita cepillado semanal. Es una raza rústica y longeva, con pocos problemas hereditarios frente a otras razas.',
        stats: [
          { label: 'Cepillado', value: 'Semanal' },
          { label: 'Salud', value: 'Rústica, longeva' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'No es un simple mestizo',
        body: 'Aunque parece un gato común, es una raza registrada con estándar propio, distinta del doméstico de pelo corto sin pedigrí. Es uno de los gatos más populares en Estados Unidos.',
        stats: [
          { label: 'Estatus', value: 'Raza con estándar' },
          { label: 'Popularidad', value: 'Alta en EE. UU.' },
        ],
      },
    ],
  },
  {
    slug: 'savannah',
    name: 'Savannah',
    origin: 'Estados Unidos (híbrido)',
    tagline: 'La sabana africana en cuerpo de gato.',
    seed: 222,
    palette: { base: '#241f18', accent: '#cf9a33', ink: '#f0dca8' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Savannah_Cat_portrait.jpg/330px-Savannah_Cat_portrait.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Grande' },
      { label: 'Pelaje', value: 'Corto, moteado' },
      { label: 'Peso', value: '5.5 – 11 kg (F1)' },
      { label: 'Esperanza de vida', value: '12 – 20 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Elegancia de sabana',
        body: 'El Savannah es un gato alto, esbelto y moteado que evoca a un pequeño guepardo. Es enérgico, curioso y sorprendentemente apegado, casi como un perro.',
        stats: [
          { label: 'Silueta', value: 'Alta y esbelta' },
          { label: 'Manto', value: 'Moteado' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Cruce con el serval',
        body: 'Nació en los años 80 del cruce entre un gato doméstico y un serval africano. La raza fue reconocida oficialmente por TICA en 2001.',
        stats: [
          { label: 'Ancestro salvaje', value: 'Serval africano' },
          { label: 'Reconocimiento TICA', value: '2001' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Patas largas, saltos altos',
        body: 'Sus patas largas, orejas grandes y cuello estilizado provienen del serval. Ejemplares de primera generación figuran entre los gatos domésticos más altos registrados.',
        stats: [
          { label: 'Salto', value: 'Muy alto' },
          { label: 'Récords', value: 'Gato más alto (F1)' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Aventurero incansable',
        body: 'Muy activo, inteligente y sociable; se le puede pasear con arnés y aprende trucos. Suele fascinarle el agua y necesita muchísimo espacio y estímulo.',
        stats: [
          { label: 'Nivel de energía', value: 'Muy alto' },
          { label: 'Relación con el agua', value: 'Le fascina' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Espacio y regulación',
        body: 'Su pelaje corto es fácil de cuidar, pero requiere ejercicio intenso y enriquecimiento. Las primeras generaciones están reguladas o prohibidas en varias jurisdicciones.',
        stats: [
          { label: 'Ejercicio', value: 'Intenso, diario' },
          { label: 'Regulación', value: 'F1–F2 restringidas' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Generaciones que cuentan',
        body: 'Se clasifican de F1 a F5 según su cercanía al serval: cuanto menor el número, más grande y salvaje el ejemplar. Las generaciones altas son más manejables como mascota.',
        stats: [
          { label: 'Clasificación', value: 'F1 a F5' },
          { label: 'Más doméstico', value: 'Generaciones altas' },
        ],
      },
    ],
  },
  {
    slug: 'bombay',
    name: 'Bombay',
    origin: 'Estados Unidos',
    tagline: 'Una pantera de bolsillo con ojos de cobre.',
    seed: 235,
    palette: { base: '#1c1a18', accent: '#c8892f', ink: '#f0e6d8' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Bombay_femelle.JPG/330px-Bombay_femelle.JPG',
    quickFacts: [
      { label: 'Tamaño', value: 'Mediano' },
      { label: 'Pelaje', value: 'Corto, negro azabache, brillante' },
      { label: 'Peso', value: '3 – 5 kg' },
      { label: 'Esperanza de vida', value: '12 – 16 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'La mini pantera',
        body: 'El Bombay es un gato completamente negro, de pelaje lustroso y ojos de cobre, criado para parecer una pantera en miniatura. Bajo ese aire salvaje es cariñoso y hogareño.',
        stats: [
          { label: 'Manto', value: 'Negro azabache' },
          { label: 'Ojos', value: 'Cobre / dorado' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Diseñado como pantera',
        body: 'Fue creado en Estados Unidos en los años 50 por Nikki Horner, cruzando Americano de Pelo Corto negro con Burmés sable. Su nombre evoca al leopardo negro de la India.',
        stats: [
          { label: 'Década', value: 'Años 50' },
          { label: 'Cruce base', value: 'Americano negro x Burmés' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Negro de la nariz a las patas',
        body: 'Todo en él es negro, incluidas la trufa y las almohadillas. Es más musculoso y pesado de lo que aparenta, con un manto corto que brilla como charol.',
        stats: [
          { label: 'Trufa y almohadillas', value: 'Negras' },
          { label: 'Peso aparente', value: 'Mayor de lo que parece' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Cariño de pantera',
        body: 'Sociable, apegado y algo mandón, busca el regazo y el calor de su familia. Se lleva bien con niños y otros animales, y suele seguir a su dueño por la casa.',
        stats: [
          { label: 'Apego', value: 'Muy alto' },
          { label: 'Búsqueda de calor', value: 'Alta' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Brillo con poco esfuerzo',
        body: 'Su pelaje corto solo pide un cepillado semanal para mantener el brillo. Por su herencia Burmés conviene vigilar el peso y la salud dental.',
        stats: [
          { label: 'Cepillado', value: 'Semanal' },
          { label: 'Vigilancia', value: 'Peso y dientes' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Ojos que cambian con la luz',
        body: 'Sus ojos cobrizos parecen brillar sobre el manto negro y pueden verse casi dorados a plena luz. Es uno de los pocos gatos criados para ser exclusivamente de un solo color.',
        stats: [
          { label: 'Color único', value: 'Solo negro' },
          { label: 'Ojos a la luz', value: 'Casi dorados' },
        ],
      },
    ],
  },
  {
    slug: 'domestico-comun',
    name: 'Doméstico Común (Mestizo)',
    origin: 'Mundial',
    tagline: 'El gato más común y diverso del planeta.',
    seed: 248,
    palette: { base: '#26221c', accent: '#a5813f', ink: '#e6d6ba' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/330px-Cat_November_2010-1a.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Variable (mediano típico)' },
      { label: 'Pelaje', value: 'Corto, variable' },
      { label: 'Peso', value: '3.5 – 6 kg' },
      { label: 'Esperanza de vida', value: '12 – 18 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'El gato de todos',
        body: 'El doméstico común de pelo corto, o "mestizo", no es una raza sino la inmensa mayoría de los gatos del mundo. Es el felino más extendido y variado que existe.',
        stats: [
          { label: 'Estatus', value: 'No es una raza' },
          { label: 'Proporción mundial', value: 'La gran mayoría' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Diez mil años de compañía',
        body: 'Desciende del gato salvaje africano, domesticado hace unos 10 000 años junto a las primeras sociedades agrícolas. Desde entonces se ha extendido por todo el planeta.',
        stats: [
          { label: 'Ancestro', value: 'Gato salvaje africano' },
          { label: 'Domesticación', value: 'Hace ~10 000 años' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Un catálogo de colores',
        body: 'Al no seguir un estándar, presenta una enorme variedad de colores, patrones y estructuras: atigrados, bicolores, carey, negros o blancos. Cada individuo es prácticamente único.',
        stats: [
          { label: 'Colores y patrones', value: 'Enorme variedad' },
          { label: 'Estándar', value: 'Ninguno' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Personalidad a la carta',
        body: 'Su carácter varía muchísimo de un gato a otro, desde tímidos hasta muy sociables. Esa diversidad hace que casi cualquier familia pueda encontrar un mestizo que encaje con ella.',
        stats: [
          { label: 'Temperamento', value: 'Muy variable' },
          { label: 'Adaptabilidad', value: 'Alta' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Salud del vigor híbrido',
        body: 'Su gran diversidad genética suele traducirse en robustez y menos enfermedades hereditarias que las razas puras. El pelaje corto se mantiene con un cepillado semanal.',
        stats: [
          { label: 'Diversidad genética', value: 'Muy alta' },
          { label: 'Cepillado', value: 'Semanal' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'El rey de los refugios',
        body: 'Es el gato que más llena los refugios y el más adoptado del mundo. Su nombre técnico en registros es "doméstico de pelo corto" (DSH), no ligado a ningún pedigrí.',
        stats: [
          { label: 'En refugios', value: 'El más frecuente' },
          { label: 'Sigla', value: 'DSH' },
        ],
      },
    ],
  },
  {
    slug: 'domestico-pelo-largo',
    name: 'Doméstico de Pelo Largo (Mestizo)',
    origin: 'Mundial',
    tagline: 'Mestizos de manto largo, tan únicos como su pelaje.',
    seed: 261,
    palette: { base: '#2a2620', accent: '#b58a5a', ink: '#ecdcc4' },
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/CalicoCat.jpg/330px-CalicoCat.jpg',
    quickFacts: [
      { label: 'Tamaño', value: 'Variable (mediano típico)' },
      { label: 'Pelaje', value: 'Semilargo o largo, variable' },
      { label: 'Peso', value: '3.5 – 6.5 kg' },
      { label: 'Esperanza de vida', value: '12 – 18 años' },
    ],
    slides: [
      {
        kind: 'intro',
        room: 'Sala I — Presentación',
        title: 'Melenas sin pedigrí',
        body: 'El doméstico de pelo largo agrupa a todos los mestizos de manto semilargo o largo. No es una raza, sino una categoría llena de gatos únicos y de aspecto lujoso.',
        stats: [
          { label: 'Estatus', value: 'No es una raza' },
          { label: 'Manto', value: 'Semilargo o largo' },
        ],
      },
      {
        kind: 'origen',
        room: 'Sala II — Origen',
        title: 'Herencia de pelo largo',
        body: 'Su pelaje proviene de genes de pelo largo heredados de ancestros con razas como el Persa o el Angora. Aparece de forma natural en poblaciones de gatos de todo el mundo.',
        stats: [
          { label: 'Origen del manto', value: 'Genes de pelo largo' },
          { label: 'Distribución', value: 'Mundial' },
        ],
      },
      {
        kind: 'fisico',
        room: 'Sala III — Anatomía',
        title: 'Mantos para todos los gustos',
        body: 'La longitud, densidad y textura del pelo varían enormemente, igual que sus colores y patrones. Muchos lucen gorguera, "pantalones" y cola tupida sin responder a ningún estándar.',
        stats: [
          { label: 'Textura del pelo', value: 'Muy variable' },
          { label: 'Estándar', value: 'Ninguno' },
        ],
      },
      {
        kind: 'caracter',
        room: 'Sala IV — Temperamento',
        title: 'Carácter irrepetible',
        body: 'Como todo mestizo, su personalidad depende de cada individuo y no de una raza. Pueden ser plácidos, juguetones o independientes, con gran capacidad de adaptación.',
        stats: [
          { label: 'Temperamento', value: 'Muy variable' },
          { label: 'Adaptabilidad', value: 'Alta' },
        ],
      },
      {
        kind: 'cuidados',
        room: 'Sala V — Cuidados',
        title: 'Cepillado contra los nudos',
        body: 'El pelo largo exige cepillado frecuente para evitar nudos y reducir las bolas de pelo. En épocas de muda conviene aumentar la frecuencia y revisar zonas propensas a enredarse.',
        stats: [
          { label: 'Cepillado', value: 'Varias veces/semana' },
          { label: 'Atención', value: 'Nudos y bolas de pelo' },
        ],
      },
      {
        kind: 'curiosidad',
        room: 'Sala VI — Curiosidad',
        title: 'Lujo accesible',
        body: 'Ofrecen el aspecto de un gato de pelo largo de raza sin pedigrí ni precio elevado. En registros se les llama "doméstico de pelo largo" (DLH), sin ascendencia definida.',
        stats: [
          { label: 'Ventaja', value: 'Aspecto de raza sin pedigrí' },
          { label: 'Sigla', value: 'DLH' },
        ],
      },
    ],
  },
];

export function getBreed(slug: string): Breed | undefined {
  return BREEDS.find((b) => b.slug === slug);
}

export function breedSlugs(): string[] {
  return BREEDS.map((b) => b.slug);
}
