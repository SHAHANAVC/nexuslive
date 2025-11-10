// import { useState } from "react";
// import "./App.css";
// import Login from "./components/Login";
// import Admin from "./components/admin/Admin";
// import { Route, Routes } from "react-router-dom";
// import Superadmin from "./components/superadmin/Superadmin";
// import Dashboard from "./components/superadmin/Dashboard";
// import Settings from "./components/admin/Settings";
// import Admindash from "./components/admin/Admindash";
// import Staff from "./components/staffs/Staff";
// import Staffdash from "./components/staffs/Staffdash";
// import Adminstudent from "./components/admin/Adminstudent";
// import StudentDetails from "./components/admin/StudentDetails";
// import StaffRegistration from "./components/StaffRegistration";
// import ViewStaff from "./components/superadmin/ViewStaff";


// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path={"/"} element={<Login />}></Route>
//         <Route path={"/superadmin"} element={<Superadmin />}></Route>
//         <Route path={"/dashboard"} element={<Dashboard />}></Route>
//         <Route path={"/admin"} element={<Admin />}></Route>
//         <Route path={"/admindash"} element={<Admindash/>}></Route>
//         <Route path={"/adminstudent"} element={<Adminstudent/>}></Route>
//         <Route path="/student-details" element={<StudentDetails />} />  
//         <Route path={"/settings"} element={<Settings />}></Route>
//         <Route path={"/staff"} element={<Staff />}></Route>
//         <Route path={"/staffdash"} element={<Staffdash/>}></Route>
//         <Route path={"/superadminviewstaff"} element={<ViewStaff/>}></Route>
//         <Route path={"/admin/staff/staffreg"} element={<StaffRegistration/>}></Route>


//       </Routes>
//     </>
//   );
// }

// export default App;
import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Admin from "./components/admin/Admin";
import { Route, Routes } from "react-router-dom";
import Superadmin from "./components/superadmin/Superadmin";
import Dashboard from "./components/superadmin/Dashboard";
import Settings from "./components/admin/Settings";
import Admindash from "./components/admin/Admindash";
import Staff from "./components/staffs/Staff";
import Staffdash from "./components/staffs/Staffdash";
import Adminstudent from "./components/admin/Adminstudent";
import StudentDetails from "./components/admin/StudentDetails";
import StaffRegistration from "./components/StaffRegistration";
import ViewStaff from "./components/superadmin/ViewStaff";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import TLhomePage from "./components/TeamLead/TLhomePage";


function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route
          path="/superadmin"
          element={
            <PrivateRoute roles={["superAdmin"]}>
              <Superadmin />
            </PrivateRoute>
          }
        />
        {/* <Route path={"/superadmin"} element={<Superadmin />}></Route> */}
        <Route path={"/dashboard"} element={<Dashboard />}></Route>
                <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <Admin />
            </PrivateRoute>
          }
        />
       
        {/* <Route path={"/admin"} element={<Admin />}></Route> */}
        <Route
          path="/admindash"
          element={
            <PrivateRoute roles={["admin"]}>
              <Admindash />
            </PrivateRoute>
          }
        />
        {/* <Route path={"/admindash"} element={<Admindash/>}></Route> */}
        <Route path={"/adminstudent"} element={<Adminstudent/>}></Route>
        <Route path="/student-details" element={<StudentDetails />} />  
        <Route path={"/settings"} element={<Settings />}></Route>
        <Route path={"/staff"} element={  <PrivateRoute roles={["staff"]}><Staff /></PrivateRoute>}></Route>
         <Route
          path="/staffdash"
          element={
            <PrivateRoute roles={["staff"]}>
              <Staffdash />
            </PrivateRoute>
          }
        />
        {/* <Route path={"/staffdash"} element={<Staffdash/>}></Route> */}
        <Route path={"/superadminviewstaff"} element={
            <PrivateRoute roles={["superAdmin"]}>
          <ViewStaff/></PrivateRoute>}></Route>
        <Route path={"/admin/staff/staffreg"} element={<StaffRegistration/>}></Route>

          <Route path={'/teamlead'} element={<PrivateRoute roles={["teamlead"]}><TLhomePage/></PrivateRoute>}></Route>
      </Routes>
          </AuthProvider>
    </>
  );
}

export default App;
