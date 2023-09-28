export const IMAGE_DB_MOCK_DATA = [
  {
    id: 1,
    name: 'Luke Skywalker',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg',
  },
  {
    id: 2,
    name: 'C-3PO',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png',
  },
  {
    id: 3,
    name: 'R2-D2',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png',
  },
  {
    id: 4,
    name: 'Darth Vader',
    photo: 'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg',
  },
  {
    id: 5,
    name: 'Leia Organa',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/f/fc/Leia_Organa_TLJ.png',
  },
  {
    id: 6,
    name: 'Owen Lars',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png',
  },
  {
    id: 7,
    name: 'Beru Whitesun lars',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/c/cc/BeruCardTrader.png',
  },
  {
    id: 8,
    name: 'R5-D4',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/c/cb/R5-D4_Sideshow.png',
  },
  {
    id: 9,
    name: 'Biggs Darklighter',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/0/00/BiggsHS-ANH.png',
  },
  {
    id: 10,
    name: 'Obi-Wan Kenobi',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/4/4e/ObiWanHS-SWE.jpg',
  },
  {
    id: 11,
    name: 'Anakin Skywalker',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png',
  },
  {
    id: 12,
    name: 'Wilhuff Tarkin',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/c/c1/Tarkininfobox.jpg',
  },
  {
    id: 13,
    name: 'Chewbacca',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png',
  },
  {
    id: 14,
    name: 'Han Solo',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFAHanSolo.png',
  },
  {
    id: 15,
    name: 'Greedo',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/c/c6/Greedo.jpg',
  },
  {
    id: 16,
    name: 'Jabba Desilijic Tiure',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/7/7f/Jabba_SWSB.png',
  },
  {
    id: 18,
    name: 'Wedge Antilles',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/6/60/WedgeHelmetless-ROTJHD.jpg',
  },
  {
    id: 19,
    name: 'Jek Tono Porkins',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/JekPorkins-DB.png',
  },
  {
    id: 20,
    name: 'Yoda',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
  },
  {
    id: 21,
    name: 'Palpatine',
    photo: 'https://vignette.wikia.nocookie.net/starwars/images/d/d8/Emperor_Sidious.png',
  },
]

// key-value O(1) storage
const IMAGE_DB: any = {}
IMAGE_DB_MOCK_DATA.forEach((item: any) => {
  IMAGE_DB[item.name] = item.photo
})

export const getImageIfExist = (name = '') => {
  return name && IMAGE_DB[name] ? IMAGE_DB[name] : null
}
