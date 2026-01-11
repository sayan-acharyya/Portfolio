import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

const Account = () => {
    const [selectedComponent, setSelectedComponent] = useState("profile");

    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 sm:pl-20">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Settings</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav className="grid gap-4 text-sm text-muted-foreground">
                            <Link
                                href="#"
                                className={
                                    selectedComponent === "Profile"
                                        ? "font-semibold text-blue-500"
                                        : ""
                                }
                                onClick={() => setSelectedComponent("Profile")}
                            >
                                Profile
                            </Link>
                            <Link
                                href="#"
                                className={
                                    selectedComponent === "Update Profile"
                                        ? "font-semibold text-blue-500"
                                        : ""
                                }
                                onClick={() => setSelectedComponent("Update Profile")}
                            >
                                Update Profile
                            </Link>
                            <Link
                                href="#"
                                className={
                                    selectedComponent === "Update Password"
                                        ? "font-semibold text-blue-500"
                                        : ""
                                }
                                onClick={() => setSelectedComponent("Update Password")}
                            >
                                Update Password
                            </Link>
                        </nav>
                        <div className="grid gap-6">
                            {(() => {
                                switch (selectedComponent) {
                                    case "Profile":
                                        return <Profile />;
                                        break;
                                    case "Update Profile":
                                        return <UpdateProfile />;
                                        break;
                                    case "Update Password":
                                        return <UpdatePassword />;
                                        break;
                                    default:
                                        return <Profile />;
                                        break;
                                }
                            })()}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Account



//  import React, { useState } from "react";
// import Profile from "./Profile";
// import UpdateProfile from "./UpdateProfile";
// import UpdatePassword from "./UpdatePassword";

// const Account = () => {
//   const [selectedComponent, setSelectedComponent] = useState("Profile");

//   const menuItems = [
//     { key: "Profile", label: "Profile" },
//     { key: "UpdateProfile", label: "Update Profile" },
//     { key: "UpdatePassword", label: "Update Password" },
//   ];

//   const renderComponent = () => {
//     switch (selectedComponent) {
//       case "Profile":
//         return <Profile />;
//       case "UpdateProfile":
//         return <UpdateProfile />;
//       case "UpdatePassword":
//         return <UpdatePassword />;
//       default:
//         return <Profile />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-muted/40 sm:pl-20 p-6">
//       <div className="mx-auto max-w-6xl space-y-6">

//         {/* Header */}
//         <h1 className="text-3xl font-bold">Account Settings</h1>

//         {/* Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">

//           {/* Sidebar */}
//           <aside className="rounded-xl border bg-background p-4 shadow-sm">
//             <nav className="space-y-1">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.key}
//                   onClick={() => setSelectedComponent(item.key)}
//                   className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition
//                     ${
//                       selectedComponent === item.key
//                         ? "bg-primary text-primary-foreground"
//                         : "text-muted-foreground hover:bg-muted"
//                     }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </nav>
//           </aside>

//           {/* Content */}
//           <section className="rounded-xl border bg-background p-6 shadow-sm">
//             {renderComponent()}
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;
