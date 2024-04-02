import React, { useEffect, useState } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";
import ServerAPI from "../../../../api";

const AudienceOverview = () => {

  const [auOverview, setAuOverview] = useState("month");
  const [userInfo, setUserInfo] = useState({
    total: {
      users: 0,
      ibUsers: 0,
      leads: 0
    },
    curWeek: {
      users: 0,
      ibUsers: 0,
      leads: 0
    },
    prevWeek: {
      users: 0,
      ibUsers: 0,
      leads: 0
    }

  });
  const [isLoading, setLoading] = useState(true);

  const calcPercentAmount = (from, to) => {
    let result = Math.floor((to - from) / from * 100 * 10) / 10
    if (result >= 0) {
      return (
        <div className="change up">
          <Icon name="arrow-long-up"></Icon> {result}%
        </div>
      )
    } else {
      return (
        <div className="change down">
          <Icon name="arrow-long-down"></Icon> {result}%
        </div>
      )
    }
  }
  useEffect(() => {
    getUserAnalytics()
  }, [auOverview])
  
  const getUserAnalytics = ()=>{
    ServerAPI.get(`${process.env.PUBLIC_URL}/api/admin/user-analytics/${auOverview}`).then(res => {
      if (res.data.success)
        setUserInfo(prev => ({
          ...res.data.body
        }))
      setLoading(false)
    }).catch(e => {
      setLoading(false);
    })
  }
  return (
    <React.Fragment>
       <div className="card-title card-title-sm">
          <h5 className="title">Account Overview</h5>
        </div>
      <div className="analytic-data-group analytic-ov-group g-3">
        <div className="analytic-data analytic-ov-data">
          <div className="title">Total Users</div>
          <div className="amount">{userInfo.total.users}</div>
        </div>
        <div className="analytic-data analytic-ov-data">
          <div className="title">Active Users</div>
          <div className="amount">{userInfo.total.users - userInfo.total.leads}</div>
        </div>
        <div className="analytic-data analytic-ov-data">
          <div className="title">IB Users</div>
          <div className="amount">{userInfo.total.ibUsers}</div>
        </div>
        <div className="analytic-data analytic-ov-data">
          <div className="title">Leads</div>
          <div className="amount">{userInfo.total.leads}</div>
        </div>
      </div>
      <div className="card-title-group pb-3 g-2">
       
        <div className="card-tools shrink-0 d-none d-sm-block">
          <ul className="nav nav-switch-s2 nav-tabs bg-white">
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "day-7" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("week");
                }}
              >
                7 D
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "month-1" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("month");
                }}
              >
                1 M
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="analytic-ov">

        <div className="analytic-data-group analytic-ov-group g-3">
          <div className="analytic-data analytic-ov-data">
            <div className="title">Total Users</div>
            <div className="amount">{userInfo.curWeek.users}</div>
            { calcPercentAmount(userInfo.prevWeek.users, userInfo.curWeek.users)}
            
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Active Users</div>
            <div className="amount">{userInfo.curWeek.users - userInfo.curWeek.leads}</div>
            { calcPercentAmount(userInfo.prevWeek.users-userInfo.prevWeek.leads, userInfo.curWeek.users-userInfo.curWeek.leads)}
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">IB Users</div>
            <div className="amount">{userInfo.total.ibUsers}</div>
            { calcPercentAmount(userInfo.prevWeek.ibUsers, userInfo.curWeek.ibUsers)}
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Leads</div>
            <div className="amount">{userInfo.curWeek.leads}</div>
            { calcPercentAmount(userInfo.prevWeek.leads, userInfo.curWeek.leads)}
          </div>
        </div>
        <div className="analytic-ov-ck">
          <AudienceLineChart state={auOverview} />
        </div>
        <div className="chart-label-group ml-5">
          <div className="chart-label">01 Jan, 2020</div>
          <div className="chart-label d-none d-sm-block">{auOverview === "month-1" ? "15" : "4"} Jan, 2020</div>
          <div className="chart-label"> {auOverview === "month-1" ? "30" : "7"} Jan, 2020</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AudienceOverview;
