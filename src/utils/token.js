import { Token } from '../models'

export const generateClinicToken = async (id) => {
  const t = new Token({ clinic: id })
  await t.save()
  return t
}

export const resolveClinicFromToken = async (token) => {
  const found = await Token.findOne({ token }).deepPopulate('clinic')

  if (!found) throw new Error('token not found')
  return found.clinic
}