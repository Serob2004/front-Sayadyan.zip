import { lazy, Suspense } from "react";
import Header from "./Components/Header";
import "antd/dist/reset.css"; 

const Page = lazy(() => import("./Components/Page"));

function App() {
  return (
    <>
      <Header  />
      <Suspense fallback={<div>Loading...</div>}>
        <Page />
      </Suspense>
    </>
  );
}

export default App;
