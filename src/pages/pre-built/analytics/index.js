import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Card } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
  BlockBetween,
} from "../../../components/Component";
import ServerAPI from "../../../api";
import "./index.scss"
import { useSelector } from "react-redux";
import FutureJob from "./FutureJob";
import PastJob from "./PastJob";
import ProcessJob from "./ProcessJob";

const AnalyticsHomePage = () => {

  const admin = useSelector(state => state?.user?.admin);

  const updateDateRange = (dateRange) => {
    
  }
  useEffect(() => {

    
  }, [admin])
  return (
    <React.Fragment>
      <Head title="Analytics Dashboard" />
      <Content>
        <Block>
          <FutureJob />
          <ProcessJob />
          <PastJob />
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AnalyticsHomePage;
