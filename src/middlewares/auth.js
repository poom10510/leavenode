import { resolveClinicFromToken } from '../utils/token'
import { respondResult, respondSuccess, respondErrors } from '../utils'

export const auth = async (req, res, next) => {
  try {
    if (req.body.token) {
      req.clinic = await resolveClinicFromToken(req.body.token)
      next()
    } else {
      // req.body._id
      next()
    }
  } catch (e) {
    respondErrors(res)(e)
  }
}

export default auth