import companies from './routes/companies'
import owners from './routes/owners'
import favorites from './routes/favorites'
//import auth from './routes/auth'

const BASE_API_PATH = "/api/v0";

export default app => {
    app.use(BASE_API_PATH+'/companies', companies)
    app.use(BASE_API_PATH+'/owners', owners)
    app.use(BASE_API_PATH+'/favorites', favorites)
    //app.use(BASE_API_PATH+'/auth', auth)
}