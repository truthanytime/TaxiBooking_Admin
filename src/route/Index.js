import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { RedirectAs404 } from "../utils/Utils";

import Setting from "../pages/pre-built/setting/Settings";
import Bookings from "../pages/pre-built/booking/Bookings";
import Jobs from "../pages/pre-built/jobhistory/JobHistory";
import WithdrawDetail from "../pages/pre-built/booking/WithdrawDetail";
import UserInfoPage from "../pages/pre-built/user";

import CreateDeposit from "../pages/pre-built/jobhistory/CreateDeposit";
import SystemLogs from "../pages/pre-built/systemlogs";
import AnalyticsHomePage from "../pages/pre-built/analytics";
import CustomerList from "../pages/pre-built/customers/CustomerList";
import DriversList from "../pages/pre-built/drivers/DriversList";
import AddDriverProfile from "../pages/pre-built/drivers/AddDriverProfile";
import AddCustomerProfile from "../pages/pre-built/customers/AddCustomerProfile";
import Administrator from "../pages/pre-built/administrator/Administrator";
const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/analytics`} component={AnalyticsHomePage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/administrator`} component={Administrator}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/drivers`} component={DriversList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/driver/add`} component={AddDriverProfile}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/customers`} component={CustomerList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/customer/add`} component={AddCustomerProfile}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/account/:id`} component={UserInfoPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/setting`} component={Setting}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/setting/main`} component={Setting}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/jobs`} component={Jobs}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/bookings`} component={Bookings}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/deposit/create/:tradingAccountUuid`} component={CreateDeposit}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/withdraw_detail/:id`} component={WithdrawDetail}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/system-logs`} component={SystemLogs}></Route>
        <Route // context api added 
          exact
          path={`${process.env.PUBLIC_URL}/product-card`}
          render={(props) => (
            <ProductContextProvider>
              <ProductCard />
            </ProductContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/product-details/:id`}
          render={(props) => (
            <ProductContextProvider>
              <ProductDetails {...props} />
            </ProductContextProvider>
          )}
        ></Route>
        <Route path="/" exact render={() => <Redirect to="/analytics" />} />
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
