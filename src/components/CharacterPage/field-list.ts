import { FormField } from './EditableField'

export const fieldList: FormField[] = [
  {
    header: 'Name:',
    id: 'name',
  },
  {
    header: 'Birth year:',
    id: 'birth_year',
  },
  {
    header: 'Gender:',
    id: 'gender',
  },
  {
    header: 'Mass:',
    id: 'mass',
    postfix: 'kg',
  },
  {
    header: 'Height:',
    id: 'height',
    postfix: 'cm',
  },
  {
    header: 'Hair color:',
    id: 'hair_color',
  },
  {
    header: 'Skin Color:',
    id: 'skin_color',
  },
  {
    header: 'Eye color:',
    id: 'eye_color',
  },
]
