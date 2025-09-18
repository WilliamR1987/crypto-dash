import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <App />
     </BrowserRouter>
  </StrictMode>,
)


/*
React Router v7 and higher versions consolidate imports significantly, 
primarily by merging react-router-dom and most @remix-run/* packages into a single react-router package.

Here's a summary of what's available for import:
From react-router:
Components:
BrowserRouter, HashRouter, MemoryRouter (for different routing modes)
Routes, Route (for defining route configurations)
Link, NavLink (for navigation)
Outlet (for rendering nested routes)
Form (for handling form submissions)
ScrollRestoration

Hooks:
useNavigate, useLocation, useParams, useSearchParams (for accessing routing information and navigation)
useLoaderData, useActionData (for accessing data loaded by loaders and actions)
useFetcher, useSubmit, useNavigation (for data mutations and navigation state)
usePrompt, useBeforeUnload (for handling user prompts and before-unload events)
useAsyncError, useAsyncValue (for error handling in async operations)
Utilities/Functions:

redirect (for programmatic redirects within loaders/actions)
json (for creating JSON responses in loaders/actions)
defer (for deferring data loading)
From runtime-specific packages (e.g., @remix-run/node, @remix-run/cloudflare): 
Only APIs specific to that runtime are imported from these packages. 
  Examples include createFileSessionStorage for Node.js and 
  createWorkersKVSessionStorage for Cloudflare Workers, used for session management.

  Key Changes and Simplifications:
Consolidated Imports:
.
The most significant change is the consolidation of most APIs into the react-router package, 
eliminating the need to import from react-router-dom for common components and hooks.

Data Loading and Mutations:
.
V7 emphasizes data loading and mutations through loaders and actions, 
accessed via hooks like useLoaderData and useActionData.

Type Safety:
.
New type generation features provide improved type safety for route parameters, loader data, and actions.

react router v7: what does data loading and mutation through loaders and actions mean
In React Router v7, loaders and actions are functions that handle data fetching and mutation directly within the route definition. This approach, known as "data mode," centralizes data logic for a more streamlined and efficient application, contrasting with previous versions that often used useEffect for data handling inside components. 
Loaders: Data loading
Loaders are asynchronous functions defined in your route configuration that run before a route component renders. 
How it works: When you navigate to a route with a defined loader, React Router calls that function and waits for the data to be fetched.
Accessing data: Once the data is loaded, you can access it inside your component using the useLoaderData hook.
Benefits: This ensures that your component only renders after its required data is available, eliminating "waterfalls" where multiple requests are triggered sequentially, and provides a better user experience.
Example: For a user profile page, the loader could fetch the user's details from an API, ensuring the component displays the correct data immediately upon rendering. 
Actions: Data mutation
Actions are functions that are triggered by form submissions or other data mutation events (like creating, updating, or deleting data). 
How it works: When a user submits a <Form> (from react-router-dom), React Router automatically calls the action function associated with that route.
Automatic revalidation: After an action successfully completes, React Router automatically revalidates all loader data on the current page, ensuring the UI reflects the latest changes without requiring a page refresh.
Example: A user submits a form to add a new post. The action function processes the form data and sends it to your database. After the database operation is complete, React Router re-runs the loader for the posts page, which automatically updates the list to include the new post. 
Client and server actions/loaders
React Router v7 also supports both client-side and server-side logic for data management. 
Server loader/action: Runs on the server during server-side rendering (SSR) or when a form is submitted.
Client clientLoader/clientAction: Runs exclusively in the browser and takes precedence over the server version if both are defined. This is useful for handling data interactions without involving a server round-trip. 
This consolidated approach simplifies data flow, improves performance, and integrates seamlessly with features like server-side rendering and optimistic UI updates. 
If you'd like, I can put together a basic example of a route configuration using both a loader for data display and an action for a form submission


*/