import { IPeopleBase } from '../../api/IStarWars'

export type FormField = {
  header: string
  id: keyof IPeopleBase
  postfix?: string
}
