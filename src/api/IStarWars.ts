// Based on https://github.com/amitmtrn/swapi-ts/blob/main/dist/SWApi.d.ts

export interface IFilm {
  characters: string[] | IPeople[]
  created: Date
  director: string
  edited: Date
  episode_id: string
  opening_crawl: string
  planets: string[] | IStarWars[]
  producer: string
  release_date: Date
  species: string[] | ISpecie[]
  starships: string[] | IStarship[]
  title: string
  url: string
  vehicles: string[] | IVehicle[]
}

export interface IPeopleBase {
  birth_year: string
  eye_color: string
  gender: string
  hair_color: string
  height: string
  mass: string
  name: string
  skin_color: string
  url: string
}

export interface IPeople extends IPeopleBase {
  films: string[] | IFilm[]
  homeworld: string | IStarWars
  created: Date
  edited: Date
  species: string[] | ISpecie[]
  starships: string[] | IStarship[]
  vehicles: string[] | IVehicle[]
}

export interface IStarWars {
  climate: string
  created: Date
  diameter: string
  edited: Date
  films: string[] | IFilm[]
  gravity: string
  name: string
  orbital_period: string
  population: string
  residents: string[] | IPeople[]
  rotation_period: string
  surface_water: string
  terrain: string
  url: string
}

export interface ISpecie {
  average_height: string
  average_lifespan: string
  classification: string
  created: Date
  designation: string
  edited: Date
  eye_colors: string
  hair_colors: string
  homeworld: string | IStarWars
  language: string
  name: string
  people: string[] | IPeople[]
  films: string[] | IFilm[]
  skin_colors: string
  url: string
}

export interface IStarship {
  MGLT: string
  cargo_capacity: string
  consumables: string
  cost_in_credits: string
  created: Date
  crew: string
  edited: Date
  hyperdrive_rating: string
  length: string
  manufacturer: string
  max_atmosphering_speed: string
  model: string
  name: string
  passengers: string
  films: string[] | IFilm[]
  pilots: string[] | IPeople[]
  starship_class: string
  url: string
}

export interface IVehicle {
  cargo_capacity: string
  consumables: string
  cost_in_credits: string
  created: Date
  crew: string
  edited: Date
  length: string
  manufacturer: string
  max_atmosphering_speed: string
  model: string
  name: string
  passengers: string
  pilots: string[] | IPeople[]
  films: string[] | IFilm[]
  url: string
  vehicle_class: string
}

export enum ResourcesType {
  Films = 'films',
  People = 'people',
  Planets = 'planets',
  Species = 'species',
  Starships = 'starships',
  Vehicles = 'vehicles',
}

export type ApiResponse = {
  count: number
  next: string
  previous: string
  results: IPeople[]
}
