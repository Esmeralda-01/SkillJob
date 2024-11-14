import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import CreatePublicView from './views/offers/CreateOfferView'
import EditOfferView from './views/offers/EditOfferView'
import OfferDetailsView from './views/offers/OfferDetailsView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import ProfileLayout from './layouts/ProfileLayout'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import HomeView from './views/HomeView'
import OfferSearchView from './views/offers/OfferSearchView'
import SolicitudesView from './views/solicitudes/SolicitudesView'
import SendEmailView from './views/solicitudes/SendEmailView'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<HomeView />} index />
                    <Route path='/publications' element={<DashboardView />} index />
                    <Route path='/offers/create' element={<CreatePublicView />} />
                    <Route path='/offers/:offerId' element={<OfferDetailsView />} />
                    <Route path='/offers/:offerId/edit' element={<EditOfferView />} />
                    <Route path='/offersSearch' element={<OfferSearchView/>} index />
                    <Route path='/request' element={<SolicitudesView/>} index />
                    <Route path='/solicitudes/:solicitudId/send-email' element={<SendEmailView/>} index />
                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/password' element={<ChangePasswordView />} />
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} index />
                    <Route path='/auth/register' element={<RegisterView />} index />
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />} />
                    <Route path='/auth/request-code' element={<RequestNewCodeView />} />
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />} />
                    <Route path='/auth/new-password' element={<NewPasswordView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}