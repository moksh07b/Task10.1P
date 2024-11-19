import { Route, Routes } from 'react-router-dom';
import NavBar from './routes/NavBar';
import AllFile from './routes/MainFile';
import Login from './routes/Login';
import SignUp from './routes/Sign-up';
import Post from './routes/Post';
import { SearchProvider } from './context/SearchContext';
import { SignInProvider } from './context/SignInContext';
import { FindPost } from './routes/FindPost';
import { Plans } from './routes/Plan';
import { Payments } from './routes/Payments';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PlanProvider } from './context/PlanContext';

const stripePromise = loadStripe('pk_test_51QFsx3EJAsUd94etIA3sulJzXD0NyOEZlvASbkabjtDg51jvzdB3LH20A4uDqRLXqRwEuCWpc8NmUvRadHNA6rDL00g2MjXXnc');

export default function App() {
  return (
    <SearchProvider>
      <SignInProvider>
        <PlanProvider>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path='/' element={<NavBar />}>
                <Route index element={<AllFile />} />
                <Route path='post' element={<Post />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
                <Route path="find-question" element={<FindPost />} />
                <Route path='plans' element={<Plans/>} />
                <Route path='payment' element={<Payments/>} />
              </Route>
            </Routes>
          </Elements>
       </PlanProvider>
      </SignInProvider>
    </SearchProvider>
  );
}
