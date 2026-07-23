const W = 'https://upload.wikimedia.org/wikipedia/commons/thumb';
const U = 'https://upload.wikimedia.org/wikipedia/commons';

// Pool de imágenes (Wikimedia Commons).
const WC_AF = `${W}/f/f6/Southern_African_Wildcat_%28Felis_sylvestris_cafra%29_female_..._%28captive_specimen%29_%2839789072173%29.jpg/330px-Southern_African_Wildcat_%28Felis_sylvestris_cafra%29_female_..._%28captive_specimen%29_%2839789072173%29.jpg`;
const WC_AF2 = `${W}/b/b4/African_Wild_Cat_%28Felis_lybica%29_%286549450873%29_%28cropped%29.jpg/330px-African_Wild_Cat_%28Felis_lybica%29_%286549450873%29_%28cropped%29.jpg`;
const WC_EU = `${W}/d/d0/Felis_silvestris_silvestris_Luc_Viatour.jpg/330px-Felis_silvestris_silvestris_Luc_Viatour.jpg`;
const EGY = `${W}/f/fc/British_Museum_Egypt_101-black.jpg/330px-British_Museum_Egypt_101-black.jpg`;
const BAS = `${W}/d/d9/Bastet.svg/330px-Bastet.svg.png`;
const NEB = `${W}/3/37/Nebamun-Detail.JPG/330px-Nebamun-Detail.JPG`;
const ROME = `${W}/3/31/Mosaic_depicting_a_cat_with_a_partridge_%28above%29_and_ducks%2C_fish_%26_shellfish_%28below%29%2C_from_the_House_of_the_Faun%2C_Pompeii%2C_Naples_Archaeological_Museum_%2815022043286%29.jpg/960px-thumbnail.jpg`;
const MEDIEVAL = `${U}/6/6e/Lynxurius_in_medieval_bestiary.jpg`;
const WEIR = `${W}/9/91/Harrison_Weir.JPG/330px-Harrison_Weir.JPG`;
const TABBY = `${W}/4/4d/Cat_November_2010-1a.jpg/330px-Cat_November_2010-1a.jpg`;
const NET = `${W}/a/aa/White_cat_watching_Wikipedia.jpg/330px-White_cat_watching_Wikipedia.jpg`;
const KIT = `${W}/b/bc/Juvenile_Ragdoll.jpg/330px-Juvenile_Ragdoll.jpg`;
const JP = `${W}/c/c3/%E7%8C%AB%E3%81%AB%E8%9C%98%E8%9B%9B%E5%9B%B3-Cat_Watching_a_Spider_MET_DP211861.jpg/330px-%E7%8C%AB%E3%81%AB%E8%9C%98%E8%9B%9B%E5%9B%B3-Cat_Watching_a_Spider_MET_DP211861.jpg`;
const CRYSTAL = `${U}/2/2a/Crystal_Palace_cat_show.jpg`;
const ABY_CP = `${W}/0/00/Abyssinian_Crystal-Palace.jpg/960px-Abyssinian_Crystal-Palace.jpg`;
const RUTLAND = `${U}/0/0c/Marginalia_Rutland_Psalter.jpg`;

export interface GallerySlide {
  /** Imagen (Wikimedia). Si falta, se muestra un panel ilustrado. */
  image?: string;
  title: string;
  body: string;
}

export interface HistoryStop {
  slug: string;
  /** Fecha o etiqueta temporal (orden cronológico ascendente). */
  date: string;
  title: string;
  body: string;
  /** Miniatura de la tarjeta en la línea M2. */
  image?: string;
  /** Galería de 3 imágenes del periodo. */
  gallery: GallerySlide[];
}

/**
 * Línea M2 — Historia entre michis y humanos.
 * Estaciones en orden cronológico ascendente (conocimiento general).
 * Imágenes: Wikimedia Commons; captions ajustados a cada imagen.
 */
export const HISTORY: HistoryStop[] = [
  {
    slug: 'primer-amigo',
    date: 'c. 7500 a.C.',
    title: 'El primer amigo',
    body: 'En Chipre se halló un gato enterrado junto a una persona: la evidencia más antigua de convivencia entre humanos y felinos.',
    image: WC_AF,
    gallery: [
      {
        image: WC_AF,
        title: 'El gato montés africano',
        body: 'Felis lybica, el ancestro salvaje del que desciende todo gato doméstico actual.',
      },
      {
        image: WC_AF2,
        title: 'Del desierto al hogar',
        body: 'Estos felinos del norte de África y Oriente Próximo se acercaron a los primeros humanos hace miles de años.',
      },
      {
        image: WC_EU,
        title: 'Primos silvestres',
        body: 'El gato montés europeo (Felis silvestris) muestra cómo eran los felinos antes de convivir con nosotros.',
      },
    ],
  },
  {
    slug: 'guardianes-del-grano',
    date: 'c. 4000 a.C.',
    title: 'Guardianes del grano',
    body: 'En el Creciente Fértil los gatos monteses se acercan a los graneros a cazar roedores. Empieza una domesticación de mutuo acuerdo.',
    image: WC_AF2,
    gallery: [
      {
        image: WC_AF2,
        title: 'De la caza al acuerdo',
        body: 'El gato montés se acercó a los graneros del Creciente Fértil; humanos y felinos formaron una alianza natural.',
      },
      {
        image: WC_AF,
        title: 'Control de plagas',
        body: 'Al cazar los roedores que atacaban las reservas de grano, el gato se volvió indispensable para las primeras aldeas.',
      },
      {
        image: WC_EU,
        title: 'Domesticación suave',
        body: 'Nadie "domó" al gato: se autodomesticó al elegir vivir cerca de nosotros, conservando su independencia.',
      },
    ],
  },
  {
    slug: 'dioses-egipcios',
    date: 'c. 3000–1000 a.C.',
    title: 'Dioses con bigotes',
    body: 'En el Antiguo Egipto el gato es sagrado: se le asocia a la diosa Bastet y se momifican miles de ejemplares como ofrenda.',
    image: EGY,
    gallery: [
      {
        image: EGY,
        title: 'El gato de Gayer-Anderson',
        body: 'Célebre estatua egipcia de bronce que idealiza al gato sagrado, hoy en el Museo Británico.',
      },
      {
        image: BAS,
        title: 'La diosa Bastet',
        body: 'Diosa felina protectora del hogar y la fertilidad; el gato era su animal sagrado.',
      },
      {
        image: NEB,
        title: 'Cazador en los marjales',
        body: 'En pinturas como la tumba de Nebamun, un gato acompaña la caza entre los juncos del Nilo.',
      },
    ],
  },
  {
    slug: 'rumbo-a-europa',
    date: 'c. 500 a.C.–400 d.C.',
    title: 'Rumbo a Europa',
    body: 'Fenicios y romanos llevan gatos en sus barcos por todo el Mediterráneo, difundiendo al felino doméstico por Europa.',
    image: ROME,
    gallery: [
      {
        image: ROME,
        title: 'Mosaico de Pompeya',
        body: 'En la Casa del Fauno, un mosaico romano muestra a un gato cazando un ave: ya vivía entre los romanos.',
      },
      {
        image: WC_EU,
        title: 'Rumbo al norte',
        body: 'Con las rutas comerciales romanas, el gato doméstico se extendió por toda Europa continental.',
      },
      {
        image: WC_AF2,
        title: 'Ratonero de a bordo',
        body: 'Fenicios y romanos llevaban gatos en sus barcos para proteger la carga de los roedores.',
      },
    ],
  },
  {
    slug: 'edad-media',
    date: 'Edad Media',
    title: 'Tiempos oscuros',
    body: 'La superstición europea vincula al gato con lo maligno y lo persigue en varias épocas, justo cuando más se le necesitaba.',
    image: MEDIEVAL,
    gallery: [
      {
        image: MEDIEVAL,
        title: 'Felinos de pergamino',
        body: 'En los bestiarios medievales, los felinos poblaban los márgenes de los manuscritos, entre símbolo y superstición.',
      },
      {
        image: RUTLAND,
        title: 'Criaturas en los márgenes',
        body: 'Marginalia del Salterio de Rutland (c. 1260): en los bordes de los manuscritos convivían animales reales y fantásticos.',
      },
      {
        title: 'Aliado imprescindible',
        body: 'Aun perseguido por la superstición, en molinos, monasterios y barcos el gato seguía frenando las plagas de ratas.',
      },
    ],
  },
  {
    slug: 'primera-exposicion',
    date: '1871',
    title: 'La primera exposición',
    body: 'El Crystal Palace de Londres alberga la primera gran exhibición felina. Nace la cría moderna y el concepto de "raza".',
    image: WEIR,
    gallery: [
      {
        image: WEIR,
        title: 'Harrison Weir',
        body: 'Artista y amante de los gatos, organizó en 1871 la primera gran exposición felina y redactó sus primeros estándares.',
      },
      {
        image: CRYSTAL,
        title: 'Juzgando en el Crystal Palace',
        body: 'La muestra de Londres de 1871 convirtió al gato en objeto de admiración pública y coleccionismo.',
      },
      {
        image: ABY_CP,
        title: 'Nace la "raza"',
        body: 'De aquellas exposiciones surge la cría moderna y el concepto de raza felina, como este Abisinio de época.',
      },
    ],
  },
  {
    slug: 'gato-de-casa',
    date: 'Siglo XX',
    title: 'El gato de casa',
    body: 'La arena sanitaria y el alimento comercial hacen del gato una de las mascotas de interior más populares del mundo.',
    image: TABBY,
    gallery: [
      {
        image: TABBY,
        title: 'El gato de casa',
        body: 'El felino doméstico se consolida como mascota de interior en hogares de todo el mundo.',
      },
      {
        image: KIT,
        title: 'Fácil de tener',
        body: 'La arena sanitaria y el alimento comercial hicieron sencillo y limpio criar un gato en casa.',
      },
      {
        image: JP,
        title: 'Musa del arte',
        body: 'De Oriente a Occidente el gato inspira a artistas; aquí una estampa japonesa del siglo XIX.',
      },
    ],
  },
  {
    slug: 'estrella-de-internet',
    date: 'Hoy',
    title: 'Estrella de internet',
    body: 'De los templos a los memes: los michis se vuelven un fenómeno cultural global y reyes indiscutibles de la red.',
    image: NET,
    gallery: [
      {
        image: NET,
        title: 'Rey de internet',
        body: 'El famoso "gato que mira Wikipedia": hoy los michis reinan en la cultura de la red.',
      },
      {
        image: TABBY,
        title: 'Fenómeno global',
        body: 'Memes, videos y cuentas dedicadas: una comunidad mundial unida por el amor a los gatos.',
      },
      {
        image: KIT,
        title: 'Tu michi, aquí',
        body: 'Y en Miawseo, tu gato también puede formar parte de esta larga historia.',
      },
    ],
  },
];

export function getHistoryStop(slug: string): HistoryStop | undefined {
  return HISTORY.find((h) => h.slug === slug);
}

export function historySlugs(): string[] {
  return HISTORY.map((h) => h.slug);
}
