import React, { useEffect, useState } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";
import ServerAPI from "../../../../api";

const AccountOverView = () => {

  const [auOverview, setAuOverview] = useState("week");
  const [tradingAccountInfo, setTradingAccountInfo] = useState({
    total: {
      total: 0,
      real: 0,
      demo: 0
    },
    curWeek: {
      total: 0,
      real: 0,
      demo: 0
    },
    prevWeek: {
      total: 0,
      real: 0,
      demo: 0
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
    getAccountAnalytics();
  }, [auOverview])
  
  const getAccountAnalytics = () =>{
    ServerAPI.get(`${process.env.PUBLIC_URL}/api/admin/account-analytics/${auOverview}`).then(res => {
      if (res.data.success)
        setTradingAccountInfo(prev => ({
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
          <h6 className="title">Account Overview</h6>
        </div>
      <div className="analytic-data-group analytic-ov-group g-3">
        <div className="analytic-data analytic-av-data">
          <div className="title">Total Trading Accounts</div>
          <div className="amount">{tradingAccountInfo.total.total}</div>
        </div>
        <div className="analytic-data analytic-av-data">
          <div className="title">Real</div>
          <div className="amount">{tradingAccountInfo.total.real}</div>
        </div>
        <div className="analytic-data analytic-av-data">
          <div className="title">Demo</div>
          <div className="amount">{tradingAccountInfo.total.demo}</div>
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
          <div className="analytic-data analytic-av-data">
            <div className="title">Total Trading Accounts</div>
            <div className="amount">{tradingAccountInfo.curWeek.total}</div>
            { calcPercentAmount(tradingAccountInfo.prevWeek.total, tradingAccountInfo.curWeek.total)}
          </div>
          <div className="analytic-data analytic-av-data">
            <div className="title">Real</div>
            <div className="amount">{tradingAccountInfo.total.real}</div>
            { calcPercentAmount(tradingAccountInfo.prevWeek.real, tradingAccountInfo.curWeek.real)}
          </div>
          <div className="analytic-data analytic-av-data">
            <div className="title">Demo</div>
            <div className="amount">{tradingAccountInfo.curWeek.demo}</div>
            { calcPercentAmount(tradingAccountInfo.prevWeek.demo, tradingAccountInfo.curWeek.demo)}
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
export default AccountOverView;
