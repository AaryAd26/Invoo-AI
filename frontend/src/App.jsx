import React from 'react' 
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import AppShell from './components/AppShell'
import CreateInvoice from './pages/CreateInvoice'
import InvoicesPage from './pages/Invoices'
import InvoicePreview from './pages/InvoicePreview'
import BuisnessProfile from './pages/BuisnessProfile'  // ✅ ADD THIS
import NotFound from './pages/NotFound'

const ClerkProtected = ({ children }) => ( 
  <>
    <SignedIn>{children}</SignedIn> 
    <SignedOut>
      <RedirectToSignIn redirectUrl="/" />
    </SignedOut>
  </>
);

const App = () => {
  return (
    <div className="min-h-screen max-w-full overflow-x-hidden">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/app' element={
          <ClerkProtected>
            <AppShell />
          </ClerkProtected>
        }>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='invoices' element={<InvoicesPage />} />
          <Route path='invoices/:id/preview' element={<InvoicePreview />} />
          <Route path='invoices/:id/edit' element={<CreateInvoice />} />
          <Route path='invoices/:id' element={<div className="p-8"><h1 className="text-3xl font-bold text-gray-900">Invoice Detail</h1></div>} /> 
          <Route path='create-invoice' element={<CreateInvoice />} />  
          <Route path='business' element={<BuisnessProfile/>} />  
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}; 

export default App  